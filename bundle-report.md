# Bundle Metrics Report 📊

> Generated: 2026-03-12T11:53:47.250Z

## Summary Comparison

| Metric | Monolith | Micro-frontends | Difference |
|--------|----------|-----------------|------------|
| **Total Size (raw)** | 1.18 MB | 3.11 MB | +163.6% |
| **Total Size (gzip)** | 621.92 KB | 1.26 MB | +107.9% |
| **🔹 Runtime Size (gzip)** | 621.92 KB | 998.08 KB | +60.5% |
| **File Count** | 91 | 217 | +138.5% |
| **JS Chunks** | 13 | 72 | +453.8% |

> [!TIP]
> **Runtime Size** — реальный размер загрузки с учётом Module Federation shared dependencies. 
> Vue, Pinia и MF SDK загружаются только 1 раз, даже если присутствуют в каждом MFE.

---

## Size by Asset Type

### Monolith

| Type | Files | Size (raw) | Size (gzip) |
|------|-------|------------|-------------|
| JavaScript | 13 | 200.41 KB | 78.68 KB |
| CSS | 11 | 51.32 KB | 17.85 KB |
| Images | 60 | 698.43 KB | 270.29 KB |
| Fonts | 6 | 255.59 KB | 254.71 KB |
| HTML | 1 | 1.08 KB | 396 B |

### Micro-frontends (Combined)

| Type | Files | Size (raw) | Size (gzip) |
|------|-------|------------|-------------|
| JavaScript | 72 | 1.71 MB | 581.97 KB |
| CSS | 7 | 81.69 KB | 25.42 KB |
| Images | 98 | 1.06 MB | 423.00 KB |
| Fonts | 6 | 255.59 KB | 254.71 KB |
| HTML | 6 | 5.48 KB | 2.49 KB |
| Other | 28 | 9.86 KB | 5.39 KB |

---

## JS Chunks Analysis

### Monolith (13 chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
| `assets/index-BBXFlLSa.js` | 151.29 KB | 59.07 KB |
| `assets/CartView-DkEUn5ih.js` | 13.46 KB | 5.09 KB |
| `assets/HomeView-Dwo3N1Us.js` | 12.30 KB | 4.09 KB |
| `assets/ProfileView-DrOhAU29.js` | 7.63 KB | 2.96 KB |
| `assets/OrdersView-3HFYbSIj.js` | 7.56 KB | 3.09 KB |
| `assets/LoginView-DUgVvomw.js` | 2.83 KB | 1.41 KB |
| `assets/TextInput-DBzTdrJQ.js` | 1.40 KB | 649 B |
| `assets/CounterComponent-CDQCIaP6.js` | 1.38 KB | 741 B |
| `assets/ButtonComponent-Cj4Ne7yo.js` | 1.12 KB | 636 B |
| `assets/SheetComponent-BIWRd_i-.js` | 789 B | 458 B |
| `assets/CloseButton-D2w59q_z.js` | 550 B | 376 B |
| `assets/concatAddress-CUiMFAF-.js` | 91 B | 104 B |
| `assets/product-BXOnNp6-.js` | 55 B | 75 B |

### Micro-frontends Breakdown

#### auth (13 chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
| `assets/vue.runtime.esm-bundler-Dd2uPGwZ.js` | 106.63 KB | 41.55 KB |
| `assets/index.cjs-qNTcCtpj.js` | 55.86 KB | 18.12 KB |
| `assets/App.vue_vue_type_style_index_0_lang-DQ7U4LZ0.js` | 42.56 KB | 17.30 KB |
| `assets/pinia-DNEbwMdp.js` | 5.57 KB | 2.54 KB |
| `assets/auth__loadShare__vue__loadShare__.mjs-B8UAhsTH.js` | 3.19 KB | 1.59 KB |
| `remoteEntry.js` | 1.69 KB | 853 B |
| `assets/preload-helper-CmsKOCeN.js` | 1.08 KB | 668 B |
| `assets/index-DBkScut0.js` | 1.01 KB | 566 B |

#### cart (12 chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
| `assets/vue.runtime.esm-bundler-Dd2uPGwZ.js` | 106.63 KB | 41.55 KB |
| `assets/entry-COjRzln1.js` | 82.15 KB | 31.54 KB |
| `assets/index.cjs-qNTcCtpj.js` | 55.86 KB | 18.12 KB |
| `assets/pinia-Nq1Z_wTP.js` | 5.57 KB | 2.54 KB |
| `assets/cart__loadShare__vue__loadShare__.mjs-MyXp1NQD.js` | 3.24 KB | 1.61 KB |
| `remoteEntry.js` | 1.69 KB | 854 B |
| `assets/preload-helper-Ct5FWWRu.js` | 1.21 KB | 716 B |
| `assets/index-Dav3egBu.js` | 990 B | 543 B |

#### order (12 chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
| `assets/vue.runtime.esm-bundler-Dd2uPGwZ.js` | 106.63 KB | 41.55 KB |
| `assets/index.cjs-qNTcCtpj.js` | 55.86 KB | 18.12 KB |
| `assets/entry-BAiQdZug.js` | 46.65 KB | 18.83 KB |
| `assets/pinia-pzYpfL6P.js` | 5.57 KB | 2.54 KB |
| `assets/order__loadShare__vue__loadShare__.mjs-BuLMdZLi.js` | 3.18 KB | 1.58 KB |
| `remoteEntry.js` | 1.69 KB | 855 B |
| `assets/preload-helper-Ct5FWWRu.js` | 1.21 KB | 716 B |
| `assets/index-CGzpwp6O.js` | 992 B | 541 B |

#### pizza-builder (13 chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
| `assets/vue.runtime.esm-bundler-ElFYw5cl.js` | 106.85 KB | 41.62 KB |
| `assets/index.cjs-qNTcCtpj.js` | 55.86 KB | 18.12 KB |
| `assets/App-BCYa1fdR.js` | 54.22 KB | 20.74 KB |
| `assets/pinia-DUopebTn.js` | 5.57 KB | 2.55 KB |
| `assets/pizzaBuilder__loadShare__vue__loadShare__.mjs-BNt1llOQ.js` | 3.21 KB | 1.60 KB |
| `remoteEntry.js` | 1.72 KB | 858 B |
| `assets/preload-helper-Ct5FWWRu.js` | 1.21 KB | 716 B |
| `assets/index-DR9PFSfj.js` | 1017 B | 551 B |

#### profile (12 chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
| `assets/vue.runtime.esm-bundler-Dd2uPGwZ.js` | 106.63 KB | 41.55 KB |
| `assets/entry-ClE5TE9S.js` | 74.91 KB | 29.00 KB |
| `assets/index.cjs-qNTcCtpj.js` | 55.86 KB | 18.12 KB |
| `assets/pinia-BWgYeYzl.js` | 5.57 KB | 2.55 KB |
| `assets/profile__loadShare__vue__loadShare__.mjs-64cn05Z7.js` | 3.24 KB | 1.61 KB |
| `remoteEntry.js` | 1.70 KB | 855 B |
| `assets/preload-helper-Ct5FWWRu.js` | 1.21 KB | 716 B |
| `assets/index-ClG8aba5.js` | 983 B | 543 B |

#### shell (10 chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
| `assets/vue.runtime.esm-bundler-9RLT-tG7.js` | 295.31 KB | 68.34 KB |
| `assets/shell__mf_v__runtimeInit__mf_v__-m019-Tvv.js` | 160.01 KB | 32.80 KB |
| `assets/index-BqCCsHtR.js` | 76.48 KB | 18.63 KB |
| `assets/pinia-DTBhrspY.js` | 15.10 KB | 3.87 KB |
| `assets/MfeView-Bogv4k2N.js` | 4.52 KB | 1.29 KB |
| `remoteEntry.js` | 4.34 KB | 1.27 KB |
| `assets/preload-helper-CKlQz3_F.js` | 2.54 KB | 1022 B |
| `assets/hostInit-B_3NnjvT.js` | 694 B | 382 B |

---

## Top 10 Largest Files

### Monolith

| File | Type | Size (raw) | Size (gzip) |
|------|------|------------|-------------|
| `assets/index-BBXFlLSa.js` | JavaScript | 151.29 KB | 59.07 KB |
| `img/filling/parmesan.svg` | Images | 120.76 KB | 46.16 KB |
| `assets/roboto-regular-BsN8iP2n.woff` | Fonts | 91.20 KB | 90.29 KB |
| `assets/roboto-regular-56L6iL-I.woff2` | Fonts | 64.37 KB | 64.35 KB |
| `assets/product-DAd-wvy3.svg` | Images | 53.88 KB | 19.15 KB |
| `assets/diameter-BUSiQDYK.svg` | Images | 32.35 KB | 12.10 KB |
| `assets/roboto-bold-DKAZFU91.woff` | Fonts | 28.18 KB | 28.17 KB |
| `assets/roboto-light-BU4NLvAn.woff` | Fonts | 27.98 KB | 27.99 KB |
| `assets/mozzarella-DKpWSLaj.svg` | Images | 25.33 KB | 9.57 KB |
| `img/filling-big/mozzarella.svg` | Images | 25.33 KB | 9.57 KB |

### Micro-frontends

| File | Type | Size (raw) | Size (gzip) |
|------|------|------------|-------------|
| `shell/assets/vue.runtime.esm-bundler-9RLT-tG7.js` | JavaScript | 295.31 KB | 68.34 KB |
| `shell/assets/shell__mf_v__runtimeInit__mf_v__-m019-Tvv.js` | JavaScript | 160.01 KB | 32.80 KB |
| `pizza-builder/img/filling/parmesan.svg` | Images | 120.76 KB | 46.16 KB |
| `shell/img/filling/parmesan.svg` | Images | 120.76 KB | 46.16 KB |
| `pizza-builder/assets/vue.runtime.esm-bundler-ElFYw5cl.js` | JavaScript | 106.85 KB | 41.62 KB |
| `auth/assets/vue.runtime.esm-bundler-Dd2uPGwZ.js` | JavaScript | 106.63 KB | 41.55 KB |
| `cart/assets/vue.runtime.esm-bundler-Dd2uPGwZ.js` | JavaScript | 106.63 KB | 41.55 KB |
| `order/assets/vue.runtime.esm-bundler-Dd2uPGwZ.js` | JavaScript | 106.63 KB | 41.55 KB |
| `profile/assets/vue.runtime.esm-bundler-Dd2uPGwZ.js` | JavaScript | 106.63 KB | 41.55 KB |
| `shell/assets/roboto-regular-BsN8iP2n.woff` | Fonts | 91.20 KB | 90.29 KB |

---

## Key Insights

> [!WARNING]
> **Vue Runtime дублируется 6 раз** — это ожидаемо для независимых MFE, но увеличивает общий размер.

> [!NOTE]
> **Pinia дублируется 11 раз** — shared dependencies загружаются при первом использовании.

> [!IMPORTANT]
> **Module Federation Runtime**: 6 файлов, суммарно 439.32 KB

### Initial Load Comparison

| | Monolith | Shell (MFE entry) |
|---|----------|-------------------|
| Entry JS | 59.07 KB (gzip) | 18.63 KB (gzip) |

