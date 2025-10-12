import { IPizzaSize } from "@/modules/pizza/types/IPizzaSize";
import { IPizzaDough } from "@/modules/pizza/types/IPizzaDough";
import { IPizzaSauce } from "@/modules/pizza/types/IPizzaSauce";
import { IPizzaIngredient } from "@/modules/pizza/types/IPizzaIngredient";
import { IAdditionalCartItem } from "@/modules/cart/types/IAdditionalCartItem";
import {
  IApiOrderAddress,
  IApiOrderGetResponse,
  IApiOrderMisc,
  IApiOrderPizza,
  IApiOrderPizzaIngredient,
} from "@/modules/order/types/api/IApiOrderGetResponse";
import { IUserAddress } from "@/modules/profile/types/IUserAddress";
import { IPizzaItem } from "@/modules/pizza/types/IPizzaItem";
import { IOrder } from "@/modules/order/types/IOrder";

export type Catalogs = {
  sizes: IPizzaSize[];
  doughs: IPizzaDough[];
  sauces: IPizzaSauce[];
  ingredients: IPizzaIngredient[];
  extras: IAdditionalCartItem[];
};

export type MapOptions = {
  deliveryType?: string;
  phone?: string;
};

function indexById<T extends { id: number }>(arr: T[]): Record<number, T> {
  return arr.reduce<Record<number, T>>((acc, x) => {
    acc[x.id] = x;
    return acc;
  }, {});
}

function mapAddress(
  api: IApiOrderAddress | undefined | null,
): IUserAddress | null {
  if (!api) return null;
  return {
    id: api.id,
    name: api.name,
    street: api.street,
    building: api.building,
    flat: api.flat ?? "",
    comment: api.comment ?? "",
    userId: api.userId,
  };
}
function calcPizzaUnitPrice(
  dough: IPizzaDough | null,
  sauce: IPizzaSauce | null,
  fillings: IPizzaIngredient[],
  size: IPizzaSize | null,
): number {
  const base =
    (dough?.price ?? 0) +
    (sauce?.price ?? 0) +
    fillings.reduce((sum, f) => sum + (f.price ?? 0) * (f.count ?? 0), 0);

  const mult = size?.multiplier ?? 1;
  return Math.max(0, Math.round(base * mult));
}

function mapPizzaFillings(
  apiIngrs: IApiOrderPizzaIngredient[],
  ingrById: Record<number, IPizzaIngredient>,
): IPizzaIngredient[] {
  return apiIngrs.map((apiItem) => {
    const base = ingrById[apiItem.ingredientId];
    if (base) {
      return { ...base, count: apiItem.quantity };
    }
    return {
      id: apiItem.ingredientId,
      name: "",
      image: "",
      price: 0,
      count: apiItem.quantity,
    };
  });
}

function mapPizza(
  apiPizza: IApiOrderPizza,
  by: {
    sizeById: Record<number, IPizzaSize>;
    doughById: Record<number, IPizzaDough>;
    sauceById: Record<number, IPizzaSauce>;
    ingrById: Record<number, IPizzaIngredient>;
  },
): IPizzaItem {
  const size = by.sizeById[apiPizza.sizeId] ?? null;
  const dough = by.doughById[apiPizza.doughId] ?? null;
  const sauce = by.sauceById[apiPizza.sauceId] ?? null;

  const fillings = mapPizzaFillings(apiPizza.ingredients ?? [], by.ingrById);
  const unitPrice = calcPizzaUnitPrice(dough, sauce, fillings, size);

  return {
    id: String(apiPizza.id),
    name: apiPizza.name,
    size,
    dough,
    sauce,
    fillings,
    count: apiPizza.quantity,
    price: unitPrice,
  };
}
function mapExtras(
  apiMisc: IApiOrderMisc[],
  extraById: Record<number, IAdditionalCartItem>,
): IAdditionalCartItem[] {
  return apiMisc.map((m) => {
    const base = extraById[m.miscId];
    if (base) return { ...base, count: m.quantity };
    return {
      id: m.miscId,
      image: "",
      name: "",
      price: 0,
      count: m.quantity,
    };
  });
}

function calcOrderTotal(
  pizzas: IPizzaItem[],
  extras: IAdditionalCartItem[],
): number {
  const pizzasSum = pizzas.reduce((s, p) => s + p.price * p.count, 0);
  const extrasSum = extras.reduce((s, e) => s + e.price * e.count, 0);
  return pizzasSum + extrasSum;
}

export function mapApiOrderToOrder(
  api: IApiOrderGetResponse,
  catalogs: Catalogs,
  opts: MapOptions = {},
): IOrder {
  const { sizes, doughs, sauces, ingredients, extras } = catalogs;

  const sizeById = indexById(sizes);
  const doughById = indexById(doughs);
  const sauceById = indexById(sauces);
  const ingrById = indexById(ingredients);
  const extraById = indexById(extras);

  const pizzas = (api.orderPizzas ?? []).map((p: IApiOrderPizza) =>
    mapPizza(p, { sizeById, doughById, sauceById, ingrById }),
  );

  const extrasMapped = mapExtras(api.orderMisc ?? [], extraById);

  const address = mapAddress(api.orderAddress);

  const total = calcOrderTotal(pizzas, extrasMapped);

  return {
    id: api.id,
    pizzas,
    extras: extrasMapped,
    address,
    deliveryType: opts.deliveryType ?? "delivery",
    phone: api.phone,
    total,
  };
}

export function mapApiOrdersToOrders(
  apiOrders: IApiOrderGetResponse[],
  catalogs: Catalogs,
  opts?: MapOptions,
): IOrder[] {
  return apiOrders.map((o) => mapApiOrderToOrder(o, catalogs, opts));
}
