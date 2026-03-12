# Архитектура микрофронтендов Pizza App

## 1. Общая архитектура системы

```mermaid
graph TB
    subgraph Browser["Браузер"]
        Shell["Shell (Host) :5010"]
    end

    subgraph MFEs["Микрофронтенды (Remote)"]
        Auth["Auth MFE :5001"]
        PB["Pizza-Builder MFE :5002"]
        Cart["Cart MFE :5003"]
        Profile["Profile MFE :5004"]
        Order["Order MFE :5005"]
    end

    subgraph Shared["Общие ресурсы"]
        SharedPkg["@pizza/shared<br/>(Verdaccio :4873)"]
        VueShared["vue (singleton)"]
        PiniaShared["pinia (singleton)"]
    end

    subgraph Backend["Backend"]
        API["NestJS API :3000"]
        DB[(PostgreSQL)]
    end

    Shell -->|"loadRemote()"| Auth
    Shell -->|"loadRemote()"| PB
    Shell -->|"loadRemote()"| Cart
    Shell -->|"loadRemote()"| Profile
    Shell -->|"loadRemote()"| Order

    Auth --> API
    PB --> API
    Cart --> API
    Profile --> API
    Order --> API
    API --> DB

    SharedPkg -.->|npm install| Auth
    SharedPkg -.->|npm install| PB
    SharedPkg -.->|npm install| Cart
    SharedPkg -.->|npm install| Profile
    SharedPkg -.->|npm install| Order

    VueShared -.->|singleton| Shell
    PiniaShared -.->|singleton| Shell
```

---

## 2. Схема маунта MFE (жизненный цикл)

```mermaid
sequenceDiagram
    participant User as Пользователь
    participant Router as Shell Router
    participant MfeView as MfeView.vue
    participant MfeLoader as MfeLoader.vue
    participant MF as Module Federation Runtime
    participant Remote as Remote Server (MFE)
    participant MFE as MFE App (Vue instance)

    User->>Router: Переход на /cart
    Router->>MfeView: route.meta.mfe = "cart"
    MfeView->>MfeLoader: moduleName = "cart"

    Note over MfeLoader: Показывает спиннер

    alt Предыдущий MFE был загружен
        MfeLoader->>MFE: currentModule.unmount()
        Note over MFE: app.unmount()<br/>app = null
    end

    MfeLoader->>MF: loadRemote("cart/entry")
    MF->>Remote: GET http://localhost:5003/remoteEntry.js
    Remote-->>MF: remoteEntry.js (манифест)
    MF->>Remote: GET JS-чанки модуля
    Remote-->>MF: entry.ts chunk
    MF-->>MfeLoader: { mount, unmount, init }

    MfeLoader->>MFE: module.mount(div.mfe-root)
    Note over MFE: createApp(App)<br/>app.use(createPinia())<br/>app.use(router)<br/>app.mount(container)

    Note over MfeLoader: Убирает спиннер

    User->>Router: Уходит со страницы
    Router->>MfeView: другой route.meta.mfe
    MfeView->>MfeLoader: moduleName изменился
    MfeLoader->>MFE: currentModule.unmount()
    Note over MFE: Полная очистка Vue-инстанса
```

---

## 3. Eager vs Lazy загрузка (инициализация Shell)

```mermaid
flowchart TB
    Start["Shell main.ts запуск"] --> CreateApp["createApp(App)"]
    CreateApp --> Plugin["app.use(federationPlugin)"]
    Plugin --> Pinia["app.use(createPinia())"]

    Pinia --> Eager["EAGER LOADING<br/>(сразу при старте)"]

    Eager --> InitAuth["initAuth()<br/>import from 'auth/entry'"]
    Eager --> InitCart["initCart()<br/>import from 'cart/entry'"]

    InitAuth --> CheckToken["authStore.checkAuth()<br/>GET /whoAmI"]
    CheckToken -->|"токен валиден"| EmitLogin["dispatch 'auth:login-success'"]
    CheckToken -->|"токен невалиден"| ClearToken["clearToken()"]

    InitCart --> CartListener["addEventListener<br/>'pizza:add-to-cart'"]

    Pinia --> UseRouter["app.use(router)"]
    UseRouter --> Mount["app.mount('#app')"]

    Mount --> Lazy["LAZY LOADING<br/>(при навигации)"]
    Lazy --> PB["Pizza-Builder<br/>при переходе на /"]
    Lazy --> Profile["Profile<br/>при переходе на /profile"]
    Lazy --> OrderMFE["Order<br/>при переходе на /orders"]
    Lazy --> CartMFE["Cart (UI)<br/>при переходе на /cart"]

    style Eager fill:#ff9800,color:#000
    style Lazy fill:#4caf50,color:#fff
    style InitAuth fill:#ffcc80
    style InitCart fill:#ffcc80
```

---

## 4. Схема общения между MFE (Custom Events)

```mermaid
flowchart LR
    subgraph PizzaBuilder["Pizza-Builder MFE"]
        PB_Store["pizzaStore.addToCart()"]
        PB_UI["Кнопка 'В корзину'"]
    end

    subgraph CartMFE["Cart MFE"]
        Cart_Entry["entry.ts<br/>(eager listener)"]
        Cart_Store["cartStore"]
    end

    subgraph AuthMFE["Auth MFE"]
        Auth_Store["authStore"]
        Auth_Login["login()"]
        Auth_Logout["logout()"]
    end

    subgraph ShellApp["Shell"]
        Shell_App["App.vue"]
        Shell_Header["HeaderComponent"]
        Shell_Router["Router"]
    end

    subgraph Storage["localStorage"]
        LS_Cart["pizza_cart"]
        LS_Token["auth_token"]
    end

    PB_UI -->|"клик"| PB_Store
    PB_Store -->|"🔥 pizza:add-to-cart<br/>{detail: pizza}"| Cart_Entry
    Cart_Entry -->|"write"| LS_Cart
    Cart_Entry -->|"🔥 cart:total-updated<br/>{detail: {total}}"| Shell_Header

    Cart_Store -->|"🔥 cart:total-updated"| Shell_Header
    Cart_Store -->|"🔥 cart:order-complete"| Shell_App
    Shell_App -->|"router.push('/')"| Shell_Router

    PB_Store -->|"🔥 pizza:go-to-cart"| Shell_App
    Shell_App -->|"router.push('/cart')"| Shell_Router

    Auth_Login -->|"🔥 auth:login-success<br/>{detail: userData}"| Shell_App
    Shell_App -->|"router.push('/')"| Shell_Router

    Auth_Logout -->|"🔥 auth:close"| Shell_App
    Shell_App -->|"router.push('/')"| Shell_Router

    Auth_Store -->|"write/read"| LS_Token
    Cart_Store -->|"read/write"| LS_Cart

    style PizzaBuilder fill:#fff3e0
    style CartMFE fill:#e3f2fd
    style AuthMFE fill:#e8f5e9
    style ShellApp fill:#f3e5f5
    style Storage fill:#fce4ec
```

---

## 5. Схема роутинга (двухуровневый)

```mermaid
flowchart TB
    subgraph Level1["Уровень 1: Shell Router (createWebHistory)"]
        URL["URL в браузере"]
        URL -->|"/"| R1["meta.mfe = 'pizzaBuilder'"]
        URL -->|"/login"| R2["meta.mfe = 'auth'<br/>noHeader: true"]
        URL -->|"/cart"| R3["meta.mfe = 'cart'"]
        URL -->|"/order"| R4["meta.mfe = 'order'"]
        URL -->|"/orders"| R5["meta.mfe = 'order'"]
        URL -->|"/profile"| R6["meta.mfe = 'profile'"]
    end

    R1 --> MfeView1["MfeView → MfeLoader"]
    R2 --> MfeView2["MfeView → MfeLoader"]
    R3 --> MfeView3["MfeView → MfeLoader"]
    R4 --> MfeView4["MfeView → MfeLoader"]
    R5 --> MfeView5["MfeView → MfeLoader"]
    R6 --> MfeView6["MfeView → MfeLoader"]

    subgraph Level2["Уровень 2: Внутренние роутеры MFE"]
        MfeView1 --> PB_App["PizzaBuilder<br/>❌ нет роутера<br/>один компонент"]
        MfeView2 --> Auth_App["Auth<br/>❌ нет роутера<br/>один компонент"]
        MfeView3 --> Cart_Router["Cart Router<br/>/cart → CartContainer"]
        MfeView4 --> Order_App["Order<br/>❌ нет роутера<br/>один компонент"]
        MfeView5 --> Order_App
        MfeView6 --> Profile_Router["Profile Router<br/>/profile → ProfileContainer"]
    end

    subgraph Header["Header (Shell)"]
        H["HeaderComponent"]
        H --> Logo["HeaderLogo"]
        H --> HCart["HeaderCart<br/>(сумма корзины)"]
        H --> HUser["HeaderUser<br/>(имя/логин)"]
    end

    Note1["noHeader: true → хедер скрыт"]
    R2 -.-> Note1

    style Level1 fill:#e8eaf6
    style Level2 fill:#fff8e1
    style Header fill:#e0f2f1
```

---

## 6. Файловая архитектура

```mermaid
graph TB
    subgraph Root["micro-vue-third-pizza-start-source/"]
        subgraph MF["micro-frontends/"]
            subgraph ShellDir["shell/ (Host :5010)"]
                S1["vite.config.ts — remotes + shared"]
                S2["src/main.ts — bootstrap + eager init"]
                S3["src/App.vue — layout + event listeners"]
                S4["src/router/index.ts — route→MFE mapping"]
                S5["src/views/MfeView.vue — route.meta.mfe"]
                S6["src/components/MfeLoader.vue — mount/unmount"]
                S7["src/plugins/federationPlugin.ts — loadRemote()"]
                S8["src/config/remotes.ts — URL config"]
                S9["src/components/Header*.vue — хедер"]
            end

            subgraph AuthDir["auth/ (Remote :5001)"]
                A1["vite.config.ts — exposes: ./entry"]
                A2["src/entry.ts — mount/unmount/initAuth"]
                A3["src/stores/authStore.ts — login/logout/events"]
                A4["src/api/authApi.ts — HTTP client"]
                A5["src/utils/TokenStorage.ts — localStorage"]
            end

            subgraph PBDir["pizza-builder/ (Remote :5002)"]
                P1["vite.config.ts — exposes: ./entry"]
                P2["src/entry.ts — mount/unmount"]
                P3["src/stores/pizzaStore.ts — конструктор + events"]
                P4["src/api/pizzaApi.ts — HTTP client"]
            end

            subgraph CartDir["cart/ (Remote :5003)"]
                C1["vite.config.ts — exposes: ./entry"]
                C2["src/entry.ts — mount/unmount/init(listener)"]
                C3["src/stores/cartStore.ts — localStorage + events"]
                C4["src/router/index.ts — внутренний роутер"]
            end

            subgraph ProfileDir["profile/ (Remote :5004)"]
                PR1["src/entry.ts — mount/unmount"]
                PR2["src/stores/profileStore.ts"]
                PR3["src/router/index.ts — внутренний роутер"]
            end

            subgraph OrderDir["order/ (Remote :5005)"]
                O1["src/entry.ts — mount/unmount"]
                O2["src/stores/orderStore.ts"]
            end

            subgraph SharedDir["packages/shared/"]
                SH1["package.json — @pizza/shared"]
                SH2["src/index.ts — экспорт компонентов"]
                SH3["src/common/components/ — UI kit"]
                SH4["src/common/types/ — TypeScript типы"]
                SH5["src/common/data/ — справочники"]
            end
        end

        subgraph BackendDir["backend/"]
            B1["NestJS API :3000"]
        end

        subgraph Infra["Инфраструктура"]
            N1["nginx/ — reverse proxy"]
            D1["docker-compose.yml"]
            DS["deploy.sh"]
        end
    end

    style ShellDir fill:#e8eaf6
    style AuthDir fill:#e8f5e9
    style PBDir fill:#fff3e0
    style CartDir fill:#e3f2fd
    style ProfileDir fill:#fce4ec
    style OrderDir fill:#f3e5f5
    style SharedDir fill:#fffde7
```

---

## 7. Module Federation — схема взаимодействия в рантайме

```mermaid
flowchart TB
    subgraph Build["Этап сборки (vite build)"]
        Auth_Build["Auth MFE build"] -->|"generates"| Auth_RE["remoteEntry.js<br/>+ JS chunks"]
        PB_Build["PizzaBuilder build"] -->|"generates"| PB_RE["remoteEntry.js<br/>+ JS chunks"]
        Cart_Build["Cart build"] -->|"generates"| Cart_RE["remoteEntry.js<br/>+ JS chunks"]
        Profile_Build["Profile build"] -->|"generates"| Profile_RE["remoteEntry.js<br/>+ JS chunks"]
        Order_Build["Order build"] -->|"generates"| Order_RE["remoteEntry.js<br/>+ JS chunks"]
    end

    subgraph Runtime["Этап рантайма (браузер)"]
        Shell_Start["Shell загрузился"]

        Shell_Start -->|"eager import"| MF_Auth["MF Runtime:<br/>fetch auth/remoteEntry.js"]
        Shell_Start -->|"eager import"| MF_Cart["MF Runtime:<br/>fetch cart/remoteEntry.js"]

        MF_Auth --> Auth_RE
        MF_Cart --> Cart_RE

        Auth_RE -->|"скачивает чанки"| Auth_Module["{ initAuth }"]
        Cart_RE -->|"скачивает чанки"| Cart_Module["{ init }"]

        Shell_Start -->|"навигация на /"| MF_PB["MF Runtime:<br/>fetch pizzaBuilder/remoteEntry.js"]
        MF_PB --> PB_RE
        PB_RE -->|"скачивает чанки"| PB_Module["{ mount, unmount }"]

        Shell_Start -->|"навигация на /profile"| MF_Prof["MF Runtime:<br/>fetch profile/remoteEntry.js"]
        MF_Prof --> Profile_RE
        Profile_RE -->|"скачивает чанки"| Prof_Module["{ mount, unmount }"]

        Shell_Start -->|"навигация на /orders"| MF_Order["MF Runtime:<br/>fetch order/remoteEntry.js"]
        MF_Order --> Order_RE
        Order_RE -->|"скачивает чанки"| Order_Module["{ mount, unmount }"]
    end

    subgraph SharedNegotiation["Shared-модули (дедупликация)"]
        Vue_S["vue (singleton)"]
        Pinia_S["pinia (singleton)"]
        Note_S["Shell предоставляет vue и pinia.<br/>MFE НЕ загружают свои копии.<br/>Все используют один инстанс."]
    end

    Auth_Module -.-> Vue_S
    Cart_Module -.-> Vue_S
    PB_Module -.-> Vue_S
    Prof_Module -.-> Vue_S
    Order_Module -.-> Vue_S

    style Build fill:#e0e0e0
    style Runtime fill:#e8f5e9
    style SharedNegotiation fill:#fff9c4
```

---

## 8. Полный цикл добавления пиццы в корзину (Data Flow)

```mermaid
sequenceDiagram
    participant User as Пользователь
    participant PB as PizzaBuilder
    participant PBStore as pizzaStore
    participant Window as window (Event Bus)
    participant CartEntry as Cart entry.ts (eager)
    participant LS as localStorage
    participant Header as Shell HeaderComponent

    User->>PB: Собирает пиццу, жмёт "Добавить"
    PB->>PBStore: addToCart()

    Note over PBStore: Формирует объект pizza:<br/>{id, name, size, dough,<br/>sauce, fillings, count, price}

    PBStore->>Window: dispatchEvent('pizza:add-to-cart', {detail: pizza})
    PBStore->>PBStore: resetCurrentPizza()

    Window->>CartEntry: handleAddToCart(event)
    CartEntry->>LS: getItem('pizza_cart')
    LS-->>CartEntry: [...existing items]
    CartEntry->>CartEntry: cart.push(pizza)
    CartEntry->>LS: setItem('pizza_cart', cart)

    Note over CartEntry: Считает total =<br/>sum(price * count)

    CartEntry->>Window: dispatchEvent('cart:total-updated', {detail: {total}})
    Window->>Header: handleCartUpdate(event)
    Header->>Header: cartTotal.value = total

    Note over Header: Обновляется счётчик<br/>в хедере
```

---

## 9. Схема деплоя (Docker)

```mermaid
graph TB
    subgraph Docker["docker-compose"]
        subgraph Proxy["Nginx Reverse Proxy"]
            NGX["nginx:80/443"]
        end

        subgraph Apps["Приложения"]
            S["Shell :5010"]
            A["Auth :5001"]
            PB["Pizza-Builder :5002"]
            C["Cart :5003"]
            P["Profile :5004"]
            O["Order :5005"]
        end

        subgraph Services["Сервисы"]
            API["Backend :3000"]
            DB[(PostgreSQL)]
            V["Verdaccio :4873<br/>(npm registry)"]
        end
    end

    Client["Клиент"] -->|"HTTPS"| NGX
    NGX -->|"/"| S
    NGX -->|"/api"| API
    API --> DB

    S -->|"remoteEntry.js"| A
    S -->|"remoteEntry.js"| PB
    S -->|"remoteEntry.js"| C
    S -->|"remoteEntry.js"| P
    S -->|"remoteEntry.js"| O

    V -.->|"@pizza/shared"| A
    V -.->|"@pizza/shared"| PB
    V -.->|"@pizza/shared"| C
    V -.->|"@pizza/shared"| P
    V -.->|"@pizza/shared"| O

    style Proxy fill:#ffcc80
    style Apps fill:#c8e6c9
    style Services fill:#bbdefb
```

---

## Легенда

| Символ | Значение |
|--------|----------|
| `→` сплошная | Прямой вызов / загрузка |
| `-.->` пунктир | Зависимость / npm-пакет |
| `🔥 event:name` | Custom Event через window |
| `singleton` | Один экземпляр на всё приложение |
| `:5010` | Порт сервера |
