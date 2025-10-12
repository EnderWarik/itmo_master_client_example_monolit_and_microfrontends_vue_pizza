export interface IApiOrderCreateRequest {
  userId: string;
  phone: string;
  address: {
    street: string;
    building: string;
    flat?: string;
    comment?: string;
  } | null;
  pizzas: Array<{
    name: string;
    sauceId: number;
    doughId: number;
    sizeId: number;
    quantity: number;
    ingredients: Array<{
      ingredientId: number;
      quantity: number;
    }>;
  }>;
  misc: Array<{
    miscId: number;
    quantity: number;
  }>;
}
