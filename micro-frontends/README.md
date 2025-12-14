# Микрофронтенды Pizza App

## Структура микрофронтендов

```
micro-frontends/
├── auth/           # Авторизация (Login)
├── pizza-builder/  # Составление пиццы (конструктор)
├── cart/           # Корзина
├── order/          # Оформление заказа
├── profile/        # Профиль + история заказов
└── shared/         # Общие компоненты и утилиты
```

## Анализ текущего монолита (frontend/)

### Существующие модули
| Микрофронтенд | Исходный модуль | Компоненты | Store | API |
|---------------|-----------------|------------|-------|-----|
| **auth** | `modules/auth/` | LoginContainer, LoginForm | authStore.ts | authApi.ts |
| **pizza-builder** | `modules/pizza/` | PizzaContainer, content/, dough/, ingredient/, size/ | pizzaStore.ts | pizzaApi.ts |
| **cart** | `modules/cart/` | CartContainer, 9 компонентов | cartStore.ts | cartApi.ts |
| **order** | `modules/order/` | OrderContainer, 7 компонентов | orderStore.ts | orderApi.ts |
| **profile** | `modules/profile/` | ProfileContainer, 4 компонента | profileStore.ts | profileApi.ts |
| **shared** | `common/`, `layouts/` | 13 UI компонентов, 2 layout | - | - |

### Общие зависимости (shared)

**UI компоненты** (`common/components/`):
- ButtonComponent, CloseButton, CounterComponent
- DragComponent, DropComponent, DropdownComponent
- InputComponent, RadioComponent, SheetComponent
- SidebarComponent, SidebarNav, TextInput, TitleComponent

**Layouts** (`layouts/`):
- HeaderLayout.vue
- SidebarHeaderLayout.vue

**Другое**:
- `http/` - axios instance и interceptors
- `helpers/` - утилиты
- `types/` - общие типы
- `assets/` - стили и изображения

### Маршруты
| Path | Module | Layout | Public |
|------|--------|--------|--------|
| `/` | pizza-builder | HeaderLayout | ✅ |
| `/login` | auth | none | ✅ |
| `/cart` | cart | HeaderLayout | ✅ |
| `/orders` | profile | SidebarHeaderLayout | ❌ |
| `/profile` | profile | SidebarHeaderLayout | ❌ |

### Стек технологий
- Vue 3.3.x + Composition API
- Pinia 2.x (state management)
- Vue Router 4.x
- TypeScript 5.x
- Vite 6.x
- Axios

## Следующие шаги

1. Выбрать технологию для Module Federation (Vite/Webpack)
2. Создать shell-приложение (host)
3. Разделить shared компоненты в отдельный пакет
4. Поочередно вынести каждый микрофронтенд
5. Настроить роутинг между микрофронтендами
6. Настроить общее состояние (auth/cart)
