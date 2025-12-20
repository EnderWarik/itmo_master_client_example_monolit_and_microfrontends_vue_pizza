# Bundle Metrics Report 📊

> Generated: 2025-12-20T11:59:14.260Z

## Summary Comparison

| Metric | Monolith | Micro-frontends | Difference |
|--------|----------|-----------------|------------|
| **Total Size (raw)** | 1.18 MB | 5.10 MB | +332.8% |
| **Total Size (gzip)** | 621.92 KB | 1.55 MB | +155.0% |
| **Total Size (brotli)** | 568.73 KB | 1.35 MB | +142.6% |
| **File Count** | 91 | 190 | +108.8% |
| **JS Chunks** | 13 | 67 | +415.4% |

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
| JavaScript | 67 | 3.69 MB | 877.48 KB |
| CSS | 7 | 97.02 KB | 26.53 KB |
| Images | 98 | 1.06 MB | 423.00 KB |
| Fonts | 6 | 255.59 KB | 254.71 KB |
| HTML | 12 | 7.95 KB | 4.45 KB |

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

#### auth (12 chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
| `assets/vue.runtime.esm-bundler-9RLT-tG7.js` | 295.31 KB | 68.34 KB |
| `assets/index.cjs-DfOq2DoA.js` | 158.77 KB | 32.53 KB |
| `assets/App.vue_vue_type_style_index_0_lang-BfeQ09dh.js` | 117.87 KB | 31.80 KB |
| `assets/pinia-Dryfu15J.js` | 15.07 KB | 3.87 KB |
| `remoteEntry.js` | 3.87 KB | 1.19 KB |
| `assets/preload-helper-CKlQz3_F.js` | 2.54 KB | 1022 B |
| `assets/index-Cy6Cgjvt.js` | 1.71 KB | 720 B |
| `assets/entry-xHFYTZ5L.js` | 1.29 KB | 545 B |

#### cart (11 chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
| `assets/vue.runtime.esm-bundler-9RLT-tG7.js` | 295.31 KB | 68.34 KB |
| `assets/entry-CZ37tuFV.js` | 216.05 KB | 52.43 KB |
| `assets/index.cjs-DfOq2DoA.js` | 158.77 KB | 32.53 KB |
| `assets/pinia-BS9i5Y3s.js` | 15.07 KB | 3.87 KB |
| `remoteEntry.js` | 3.87 KB | 1.19 KB |
| `assets/preload-helper-CKlQz3_F.js` | 2.54 KB | 1022 B |
| `assets/index-CvcZH8qe.js` | 1.53 KB | 673 B |
| `assets/virtualExposes-C0kQgcih.js` | 836 B | 439 B |

#### order (11 chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
| `assets/vue.runtime.esm-bundler-9RLT-tG7.js` | 295.31 KB | 68.34 KB |
| `assets/index.cjs-DfOq2DoA.js` | 158.77 KB | 32.53 KB |
| `assets/entry-iO_aifTy.js` | 131.53 KB | 33.82 KB |
| `assets/pinia-CKrZD1Z-.js` | 15.10 KB | 3.87 KB |
| `remoteEntry.js` | 3.88 KB | 1.19 KB |
| `assets/preload-helper-CKlQz3_F.js` | 2.54 KB | 1022 B |
| `assets/index-av4Q5-mj.js` | 1.53 KB | 671 B |
| `assets/virtualExposes-BR5YtPOi.js` | 838 B | 439 B |

#### pizza-builder (12 chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
| `assets/vue.runtime.esm-bundler-BjP-WZdr.js` | 296.23 KB | 68.46 KB |
| `assets/index.cjs-DfOq2DoA.js` | 158.77 KB | 32.53 KB |
| `assets/App-fKCV-Dwl.js` | 153.86 KB | 36.45 KB |
| `assets/pinia-Cm7pEyEH.js` | 15.32 KB | 3.88 KB |
| `remoteEntry.js` | 3.93 KB | 1.20 KB |
| `assets/preload-helper-CKlQz3_F.js` | 2.54 KB | 1022 B |
| `assets/index-DdwjzA_h.js` | 1.71 KB | 707 B |
| `assets/virtualExposes-bT7jtfW7.js` | 878 B | 458 B |

#### profile (11 chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
| `assets/vue.runtime.esm-bundler-9RLT-tG7.js` | 295.31 KB | 68.34 KB |
| `assets/entry-D2i3vQxF.js` | 198.52 KB | 48.85 KB |
| `assets/index.cjs-DfOq2DoA.js` | 158.77 KB | 32.53 KB |
| `assets/pinia-BH2VxMUH.js` | 15.16 KB | 3.88 KB |
| `remoteEntry.js` | 3.89 KB | 1.19 KB |
| `assets/preload-helper-CKlQz3_F.js` | 2.54 KB | 1022 B |
| `assets/index-DD3y1Vp8.js` | 1.49 KB | 656 B |
| `assets/virtualExposes-Btk5qKv0.js` | 842 B | 440 B |

#### shell (10 chunks)

| Chunk | Size (raw) | Size (gzip) |
|-------|------------|-------------|
| `assets/vue.runtime.esm-bundler-9RLT-tG7.js` | 295.31 KB | 68.34 KB |
| `assets/shell__mf_v__runtimeInit__mf_v__-m019-Tvv.js` | 160.01 KB | 32.80 KB |
| `assets/index-BADmEnid.js` | 77.88 KB | 18.98 KB |
| `assets/pinia-DTBhrspY.js` | 15.10 KB | 3.87 KB |
| `assets/MfeView-DjYJ_9ec.js` | 4.52 KB | 1.29 KB |
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
| `pizza-builder/assets/vue.runtime.esm-bundler-BjP-WZdr.js` | JavaScript | 296.23 KB | 68.46 KB |
| `auth/assets/vue.runtime.esm-bundler-9RLT-tG7.js` | JavaScript | 295.31 KB | 68.34 KB |
| `cart/assets/vue.runtime.esm-bundler-9RLT-tG7.js` | JavaScript | 295.31 KB | 68.34 KB |
| `order/assets/vue.runtime.esm-bundler-9RLT-tG7.js` | JavaScript | 295.31 KB | 68.34 KB |
| `profile/assets/vue.runtime.esm-bundler-9RLT-tG7.js` | JavaScript | 295.31 KB | 68.34 KB |
| `shell/assets/vue.runtime.esm-bundler-9RLT-tG7.js` | JavaScript | 295.31 KB | 68.34 KB |
| `cart/assets/entry-CZ37tuFV.js` | JavaScript | 216.05 KB | 52.43 KB |
| `profile/assets/entry-D2i3vQxF.js` | JavaScript | 198.52 KB | 48.85 KB |
| `shell/assets/shell__mf_v__runtimeInit__mf_v__-m019-Tvv.js` | JavaScript | 160.01 KB | 32.80 KB |
| `auth/assets/index.cjs-DfOq2DoA.js` | JavaScript | 158.77 KB | 32.53 KB |

---

## Key Insights

> [!WARNING]
> **Vue Runtime дублируется 6 раз** — это ожидаемо для независимых MFE, но увеличивает общий размер.

> [!NOTE]
> **Pinia дублируется 6 раз** — shared dependencies загружаются при первом использовании.

> [!IMPORTANT]
> **Module Federation Runtime**: 11 файлов, суммарно 956.27 KB

### Initial Load Comparison

| | Monolith | Shell (MFE entry) |
|---|----------|-------------------|
| Entry JS | 59.07 KB (gzip) | 18.98 KB (gzip) |

