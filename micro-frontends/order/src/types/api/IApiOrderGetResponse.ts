export interface IApiOrderGetResponse {
  id: number;
  userId: string;
  phone: string;
  addressId: number;
  orderPizzas: IApiOrderPizza[];
  orderMisc: IApiOrderMisc[];
  orderAddress: IApiOrderAddress;
}

export interface IApiOrderPizza {
  id: number;
  name: string;
  sauceId: number;
  doughId: number;
  sizeId: number;
  quantity: number;
  orderId: number;
  ingredients: IApiOrderPizzaIngredient[];
}

export interface IApiOrderPizzaIngredient {
  id: number;
  pizzaId: number;
  ingredientId: number;
  quantity: number;
}

export interface IApiOrderMisc {
  id: number;
  orderId: number;
  miscId: number;
  quantity: number;
}

export interface IApiOrderAddress {
  id: number;
  name: string;
  street: string;
  building: string;
  flat?: string;
  comment?: string;
  userId: string;
}
