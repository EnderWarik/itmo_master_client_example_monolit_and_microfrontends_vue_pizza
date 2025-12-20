#!/usr/bin/env node

/**
 * Bundle Metrics Analyzer
 * Сравнение метрик бандлов монолитного фронтенда и микрофронтендов
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Конфигурация путей
const CONFIG = {
    monolithDir: '/tmp/bundle-analysis/monolith',
    mfeDir: '/tmp/bundle-analysis/mfe',
    outputFile: path.join(__dirname, '..', 'bundle-report.md'),
};

// Типы файлов для анализа
const FILE_TYPES = {
    js: { extensions: ['.js'], label: 'JavaScript' },
    css: { extensions: ['.css'], label: 'CSS' },
    images: { extensions: ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico'], label: 'Images' },
    fonts: { extensions: ['.woff', '.woff2', '.ttf', '.eot', '.otf'], label: 'Fonts' },
    html: { extensions: ['.html'], label: 'HTML' },
    other: { extensions: [], label: 'Other' },
};

// Паттерны для определения shared-зависимостей (которые загружаются только 1 раз в runtime)
const SHARED_PATTERNS = [
    { pattern: 'vue.runtime', label: 'Vue Runtime' },
    { pattern: 'pinia', label: 'Pinia' },
    { pattern: 'index.cjs', label: 'MF SDK' },
];

/**
 * Рекурсивно получить все файлы в директории
 */
function getAllFiles(dir, files = []) {
    if (!fs.existsSync(dir)) return files;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            getAllFiles(fullPath, files);
        } else {
            files.push(fullPath);
        }
    }
    return files;
}

/**
 * Определить тип файла
 */
function getFileType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    for (const [type, config] of Object.entries(FILE_TYPES)) {
        if (config.extensions.includes(ext)) {
            return type;
        }
    }
    return 'other';
}

/**
 * Получить размер файла в gzip
 */
function getGzipSize(filePath) {
    try {
        const content = fs.readFileSync(filePath);
        return zlib.gzipSync(content).length;
    } catch {
        return 0;
    }
}

/**
 * Получить размер файла в brotli
 */
function getBrotliSize(filePath) {
    try {
        const content = fs.readFileSync(filePath);
        return zlib.brotliCompressSync(content).length;
    } catch {
        return 0;
    }
}

/**
 * Анализ директории бандла
 */
function analyzeBundleDir(dir, name = 'bundle') {
    const files = getAllFiles(dir);

    const result = {
        name,
        totalSize: 0,
        totalGzip: 0,
        totalBrotli: 0,
        fileCount: files.length,
        byType: {},
        chunks: [],
        topFiles: [],
    };

    // Инициализация типов
    for (const type of Object.keys(FILE_TYPES)) {
        result.byType[type] = { count: 0, size: 0, gzip: 0, brotli: 0 };
    }

    for (const filePath of files) {
        const stat = fs.statSync(filePath);
        const size = stat.size;
        const gzip = getGzipSize(filePath);
        const brotli = getBrotliSize(filePath);
        const type = getFileType(filePath);
        const relativePath = path.relative(dir, filePath);

        result.totalSize += size;
        result.totalGzip += gzip;
        result.totalBrotli += brotli;

        result.byType[type].count++;
        result.byType[type].size += size;
        result.byType[type].gzip += gzip;
        result.byType[type].brotli += brotli;

        // JS файлы как чанки
        if (type === 'js') {
            result.chunks.push({
                name: relativePath,
                size,
                gzip,
                brotli,
            });
        }

        // Все файлы для топ-файлов
        result.topFiles.push({
            name: relativePath,
            size,
            gzip,
            type,
        });
    }

    // Сортировка
    result.chunks.sort((a, b) => b.size - a.size);
    result.topFiles.sort((a, b) => b.size - a.size);
    result.topFiles = result.topFiles.slice(0, 10);

    return result;
}

/**
 * Форматирование размера
 */
function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Рассчитать реальный runtime-размер (без дублирования shared-зависимостей)
 * В runtime каждая shared-зависимость загружается только 1 раз благодаря Module Federation
 */
function calculateRuntimeSize(mfeCombined) {
    const sharedDeps = {};
    let duplicatedSize = 0;
    let duplicatedGzip = 0;

    for (const chunk of mfeCombined.chunks) {
        for (const { pattern, label } of SHARED_PATTERNS) {
            if (chunk.name.includes(pattern)) {
                if (!sharedDeps[label]) {
                    // Первое вхождение — оставляем
                    sharedDeps[label] = {
                        count: 1,
                        size: chunk.size,
                        gzip: chunk.gzip,
                        files: [chunk.name],
                    };
                } else {
                    // Дубликат — считаем как лишний
                    sharedDeps[label].count++;
                    sharedDeps[label].files.push(chunk.name);
                    duplicatedSize += chunk.size;
                    duplicatedGzip += chunk.gzip;
                }
                break;
            }
        }
    }

    return {
        runtimeSize: mfeCombined.totalSize - duplicatedSize,
        runtimeGzip: mfeCombined.totalGzip - duplicatedGzip,
        duplicatedSize,
        duplicatedGzip,
        sharedDeps,
    };
}

/**
 * Генерация Markdown отчёта
 */
function generateReport(monolith, mfeCombined, mfeModules, runtimeMetrics) {
    const diff = (a, b) => {
        if (b === 0) return 'N/A';
        const pct = ((a - b) / b * 100).toFixed(1);
        return pct > 0 ? `+${pct}%` : `${pct}%`;
    };

    let md = `# Bundle Metrics Report 📊

> Generated: ${new Date().toISOString()}

## Summary Comparison

| Metric | Monolith | Micro-frontends | Difference |
|--------|----------|-----------------|------------|
| **Total Size (raw)** | ${formatSize(monolith.totalSize)} | ${formatSize(mfeCombined.totalSize)} | ${diff(mfeCombined.totalSize, monolith.totalSize)} |
| **Total Size (gzip)** | ${formatSize(monolith.totalGzip)} | ${formatSize(mfeCombined.totalGzip)} | ${diff(mfeCombined.totalGzip, monolith.totalGzip)} |
| **🔹 Runtime Size (gzip)** | ${formatSize(monolith.totalGzip)} | ${formatSize(runtimeMetrics.runtimeGzip)} | ${diff(runtimeMetrics.runtimeGzip, monolith.totalGzip)} |
| **File Count** | ${monolith.fileCount} | ${mfeCombined.fileCount} | ${diff(mfeCombined.fileCount, monolith.fileCount)} |
| **JS Chunks** | ${monolith.chunks.length} | ${mfeCombined.chunks.length} | ${diff(mfeCombined.chunks.length, monolith.chunks.length)} |

> [!TIP]
> **Runtime Size** — реальный размер загрузки с учётом Module Federation shared dependencies. 
> Vue, Pinia и MF SDK загружаются только 1 раз, даже если присутствуют в каждом MFE.

---

## Size by Asset Type

### Monolith

| Type | Files | Size (raw) | Size (gzip) |
|------|-------|------------|-------------|
`;

    for (const [type, data] of Object.entries(monolith.byType)) {
        if (data.count > 0) {
            md += `| ${FILE_TYPES[type].label} | ${data.count} | ${formatSize(data.size)} | ${formatSize(data.gzip)} |\n`;
        }
    }

    md += `
### Micro-frontends (Combined)

| Type | Files | Size (raw) | Size (gzip) |
|------|-------|------------|-------------|
`;

    for (const [type, data] of Object.entries(mfeCombined.byType)) {
        if (data.count > 0) {
            md += `| ${FILE_TYPES[type].label} | ${data.count} | ${formatSize(data.size)} | ${formatSize(data.gzip)} |\n`;
        }
    }

    md += `
---

## JS Chunks Analysis

### Monolith (${monolith.chunks.length} chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
`;

    for (const chunk of monolith.chunks.slice(0, 15)) {
        md += `| \`${chunk.name}\` | ${formatSize(chunk.size)} | ${formatSize(chunk.gzip)} |\n`;
    }

    md += `
### Micro-frontends Breakdown

`;

    for (const module of mfeModules) {
        md += `#### ${module.name} (${module.chunks.length} chunks)\n\n`;
        md += `| Chunk | Size (raw) | Size (gzip) |\n`;
        md += `|-------|------------|-------------|\n`;
        for (const chunk of module.chunks.slice(0, 8)) {
            md += `| \`${chunk.name}\` | ${formatSize(chunk.size)} | ${formatSize(chunk.gzip)} |\n`;
        }
        md += '\n';
    }

    md += `---

## Top 10 Largest Files

### Monolith

| File | Type | Size (raw) | Size (gzip) |
|------|------|------------|-------------|
`;

    for (const file of monolith.topFiles) {
        md += `| \`${file.name}\` | ${FILE_TYPES[file.type].label} | ${formatSize(file.size)} | ${formatSize(file.gzip)} |\n`;
    }

    md += `
### Micro-frontends

| File | Type | Size (raw) | Size (gzip) |
|------|------|------------|-------------|
`;

    for (const file of mfeCombined.topFiles) {
        md += `| \`${file.name}\` | ${FILE_TYPES[file.type].label} | ${formatSize(file.size)} | ${formatSize(file.gzip)} |\n`;
    }

    md += `
---

## Key Insights

`;

    // Анализ дублирования в MFE
    const vueBundles = mfeCombined.chunks.filter(c => c.name.includes('vue.runtime'));
    const pinaBundles = mfeCombined.chunks.filter(c => c.name.includes('pinia'));
    const mfRuntimeBundles = mfeCombined.chunks.filter(c => c.name.includes('index.cjs') || c.name.includes('mf_v__runtime'));

    if (vueBundles.length > 1) {
        md += `> [!WARNING]\n> **Vue Runtime дублируется ${vueBundles.length} раз** — это ожидаемо для независимых MFE, но увеличивает общий размер.\n\n`;
    }

    if (pinaBundles.length > 1) {
        md += `> [!NOTE]\n> **Pinia дублируется ${pinaBundles.length} раз** — shared dependencies загружаются при первом использовании.\n\n`;
    }

    if (mfRuntimeBundles.length > 0) {
        const totalMfRuntime = mfRuntimeBundles.reduce((sum, b) => sum + b.size, 0);
        md += `> [!IMPORTANT]\n> **Module Federation Runtime**: ${mfRuntimeBundles.length} файлов, суммарно ${formatSize(totalMfRuntime)}\n\n`;
    }

    // Сравнение initial load
    const monolithEntry = monolith.chunks.find(c => c.name.includes('index-') && !c.name.includes('View'));
    const shellEntry = mfeModules.find(m => m.name === 'shell')?.chunks.find(c => c.name.includes('index-'));

    if (monolithEntry && shellEntry) {
        md += `### Initial Load Comparison\n\n`;
        md += `| | Monolith | Shell (MFE entry) |\n`;
        md += `|---|----------|-------------------|\n`;
        md += `| Entry JS | ${formatSize(monolithEntry.gzip)} (gzip) | ${formatSize(shellEntry.gzip)} (gzip) |\n\n`;
    }

    return md;
}

/**
 * Объединить метрики нескольких MFE-модулей
 */
function combineMfeMetrics(modules) {
    const combined = {
        name: 'All MFE Combined',
        totalSize: 0,
        totalGzip: 0,
        totalBrotli: 0,
        fileCount: 0,
        byType: {},
        chunks: [],
        topFiles: [],
    };

    for (const type of Object.keys(FILE_TYPES)) {
        combined.byType[type] = { count: 0, size: 0, gzip: 0, brotli: 0 };
    }

    for (const module of modules) {
        combined.totalSize += module.totalSize;
        combined.totalGzip += module.totalGzip;
        combined.totalBrotli += module.totalBrotli;
        combined.fileCount += module.fileCount;

        for (const [type, data] of Object.entries(module.byType)) {
            combined.byType[type].count += data.count;
            combined.byType[type].size += data.size;
            combined.byType[type].gzip += data.gzip;
            combined.byType[type].brotli += data.brotli;
        }

        for (const chunk of module.chunks) {
            combined.chunks.push({
                ...chunk,
                name: `${module.name}/${chunk.name}`,
            });
        }

        for (const file of module.topFiles) {
            combined.topFiles.push({
                ...file,
                name: `${module.name}/${file.name}`,
            });
        }
    }

    combined.chunks.sort((a, b) => b.size - a.size);
    combined.topFiles.sort((a, b) => b.size - a.size);
    combined.topFiles = combined.topFiles.slice(0, 10);

    return combined;
}

/**
 * Main
 */
function main() {
    console.log('🔍 Analyzing bundles...\n');

    // Проверка директорий
    if (!fs.existsSync(CONFIG.monolithDir)) {
        console.error(`❌ Monolith directory not found: ${CONFIG.monolithDir}`);
        process.exit(1);
    }
    if (!fs.existsSync(CONFIG.mfeDir)) {
        console.error(`❌ MFE directory not found: ${CONFIG.mfeDir}`);
        process.exit(1);
    }

    // Анализ монолита
    console.log('📦 Analyzing monolith...');
    const monolith = analyzeBundleDir(CONFIG.monolithDir, 'Monolith');
    console.log(`   Total: ${formatSize(monolith.totalSize)} (${formatSize(monolith.totalGzip)} gzip)`);

    // Анализ каждого MFE
    console.log('\n📦 Analyzing micro-frontends...');
    const mfeModules = [];
    const mfeDirs = fs.readdirSync(CONFIG.mfeDir);

    for (const mfeName of mfeDirs) {
        const mfePath = path.join(CONFIG.mfeDir, mfeName);
        if (fs.statSync(mfePath).isDirectory()) {
            const mfeMetrics = analyzeBundleDir(mfePath, mfeName);
            mfeModules.push(mfeMetrics);
            console.log(`   ${mfeName}: ${formatSize(mfeMetrics.totalSize)} (${formatSize(mfeMetrics.totalGzip)} gzip)`);
        }
    }

    // Объединённые метрики MFE
    const mfeCombined = combineMfeMetrics(mfeModules);
    console.log(`\n📊 Combined MFE: ${formatSize(mfeCombined.totalSize)} (${formatSize(mfeCombined.totalGzip)} gzip)`);

    // Расчёт runtime-размера (без дублирования shared-зависимостей)
    const runtimeMetrics = calculateRuntimeSize(mfeCombined);
    console.log(`🔹 Runtime MFE:  ${formatSize(runtimeMetrics.runtimeSize)} (${formatSize(runtimeMetrics.runtimeGzip)} gzip)`);
    console.log(`   (saved ${formatSize(runtimeMetrics.duplicatedGzip)} gzip from shared deps)`);

    // Генерация отчёта
    console.log('\n📝 Generating report...');
    const report = generateReport(monolith, mfeCombined, mfeModules, runtimeMetrics);
    fs.writeFileSync(CONFIG.outputFile, report);
    console.log(`✅ Report saved to: ${CONFIG.outputFile}`);

    // Краткий вывод
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Monolith:        ${formatSize(monolith.totalGzip)} gzip`);
    console.log(`MFE (static):    ${formatSize(mfeCombined.totalGzip)} gzip (+${((mfeCombined.totalGzip - monolith.totalGzip) / monolith.totalGzip * 100).toFixed(0)}%)`);
    console.log(`MFE (runtime):   ${formatSize(runtimeMetrics.runtimeGzip)} gzip (${runtimeMetrics.runtimeGzip < monolith.totalGzip ? '-' : '+'}${Math.abs((runtimeMetrics.runtimeGzip - monolith.totalGzip) / monolith.totalGzip * 100).toFixed(0)}%)`);

    // Детали shared-зависимостей
    console.log('\n📦 Shared Dependencies (deduplicated in runtime):');
    for (const [label, data] of Object.entries(runtimeMetrics.sharedDeps)) {
        console.log(`   ${label}: ${data.count}x in bundles, saved ${formatSize(data.gzip * (data.count - 1))} gzip`);
    }
}

main();
