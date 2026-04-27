# Bundle Metrics Report 📊

> Generated: 2026-04-27T17:21:11.410Z

## Summary Comparison

| Metric | Monolith | Micro-frontends | Difference |
|--------|----------|-----------------|------------|
| **Total Size (raw)** | 1.18 MB | 2.36 MB | +100.4% |
| **Total Size (gzip)** | 621.40 KB | 1.05 MB | +73.6% |
| **🔹 Runtime Size (gzip)** | 621.40 KB | 783.65 KB | +26.1% |
| **File Count** | 91 | 182 | +100.0% |
| **JS Chunks** | 13 | 76 | +484.6% |

> [!TIP]
> **Runtime Size** — реальный размер загрузки с учётом Module Federation shared dependencies. 
> Vue, Pinia и MF SDK загружаются только 1 раз, даже если присутствуют в каждом MFE.

---

## Size by Asset Type

### Monolith

| Type | Files | Size (raw) | Size (gzip) |
|------|-------|------------|-------------|
| JavaScript | 13 | 199.09 KB | 78.20 KB |
| CSS | 11 | 51.15 KB | 17.82 KB |
| Images | 60 | 698.43 KB | 270.29 KB |
| Fonts | 6 | 255.59 KB | 254.71 KB |
| HTML | 1 | 1.08 KB | 397 B |

### Micro-frontends (Combined)

| Type | Files | Size (raw) | Size (gzip) |
|------|-------|------------|-------------|
| JavaScript | 76 | 1.39 MB | 539.78 KB |
| CSS | 7 | 80.79 KB | 25.41 KB |
| Images | 59 | 644.55 KB | 251.14 KB |
| Fonts | 6 | 255.59 KB | 254.71 KB |
| HTML | 6 | 5.74 KB | 2.56 KB |
| Other | 28 | 9.86 KB | 5.39 KB |

---

## JS Chunks Analysis

### Monolith (13 chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
| `assets/index-BOLw-3xe.js` | 150.33 KB | 58.79 KB |
| `assets/CartView-2cizEhcs.js` | 13.31 KB | 5.02 KB |
| `assets/HomeView-BUgKonrm.js` | 12.27 KB | 4.06 KB |
| `assets/ProfileView-Z3BVqTKp.js` | 7.56 KB | 2.92 KB |
| `assets/OrdersView-BoxX4PKI.js` | 7.44 KB | 3.03 KB |
| `assets/LoginView-CHLTanwR.js` | 2.83 KB | 1.41 KB |
| `assets/TextInput-GsycvN54.js` | 1.40 KB | 649 B |
| `assets/CounterComponent-LNiKEXq8.js` | 1.38 KB | 739 B |
| `assets/ButtonComponent-Dd7rdLk2.js` | 1.12 KB | 635 B |
| `assets/SheetComponent-BoQkiKKE.js` | 789 B | 457 B |
| `assets/CloseButton-CUXGDR9j.js` | 550 B | 375 B |
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

#### shell (14 chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
| `assets/vue.runtime.esm-bundler-Dd2uPGwZ.js` | 106.63 KB | 41.55 KB |
| `assets/virtual_mf-REMOTE_ENTRY_ID___mfe_internal__shell__remoteEntry_js-43IP29n6.js` | 74.73 KB | 23.08 KB |
| `assets/index-C-uSXZdh.js` | 33.08 KB | 12.77 KB |
| `assets/pinia-B3XqtjJQ.js` | 5.55 KB | 2.53 KB |
| `assets/__mfe_internal__shell__loadShare__vue__loadShare__.js-Dw1AVxDF.js` | 3.52 KB | 1.74 KB |
| `assets/MfeView-CESUrJUQ.js` | 1.99 KB | 1.04 KB |
| `assets/localSharedImportMap-4wVRSjY4.js` | 1.44 KB | 550 B |
| `assets/preload-helper-Ct5FWWRu.js` | 1.21 KB | 716 B |

---

## Top 10 Largest Files

### Monolith

| File | Type | Size (raw) | Size (gzip) |
|------|------|------------|-------------|
| `assets/index-BOLw-3xe.js` | JavaScript | 150.33 KB | 58.79 KB |
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
| `pizza-builder/img/filling/parmesan.svg` | Images | 120.76 KB | 46.16 KB |
| `pizza-builder/assets/vue.runtime.esm-bundler-ElFYw5cl.js` | JavaScript | 106.85 KB | 41.62 KB |
| `auth/assets/vue.runtime.esm-bundler-Dd2uPGwZ.js` | JavaScript | 106.63 KB | 41.55 KB |
| `cart/assets/vue.runtime.esm-bundler-Dd2uPGwZ.js` | JavaScript | 106.63 KB | 41.55 KB |
| `order/assets/vue.runtime.esm-bundler-Dd2uPGwZ.js` | JavaScript | 106.63 KB | 41.55 KB |
| `profile/assets/vue.runtime.esm-bundler-Dd2uPGwZ.js` | JavaScript | 106.63 KB | 41.55 KB |
| `shell/assets/vue.runtime.esm-bundler-Dd2uPGwZ.js` | JavaScript | 106.63 KB | 41.55 KB |
| `shell/assets/roboto-regular-BsN8iP2n.woff` | Fonts | 91.20 KB | 90.29 KB |
| `cart/assets/entry-COjRzln1.js` | JavaScript | 82.15 KB | 31.54 KB |
| `profile/assets/entry-ClE5TE9S.js` | JavaScript | 74.91 KB | 29.00 KB |

---

## Key Insights

> [!WARNING]
> **Vue Runtime дублируется 6 раз** — это ожидаемо для независимых MFE, но увеличивает общий размер.

> [!NOTE]
> **Pinia дублируется 12 раз** — shared dependencies загружаются при первом использовании.

> [!IMPORTANT]
> **Module Federation Runtime**: 5 файлов, суммарно 279.30 KB

### Initial Load Comparison

| | Monolith | Shell (MFE entry) |
|---|----------|-------------------|
| Entry JS | 58.79 KB (gzip) | 12.77 KB (gzip) |

