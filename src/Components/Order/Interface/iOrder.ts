// Order.ts
export interface iOrder {
    eppIdProduct: string;
    eppIdOrder: string;
    store: string;
    nameClient: string;
    deliveryStore: string;
    fone: string | null;
    dateOrder: string;
    deliveryDate: string;
    deliveryHour: string;
    description: string;
    measure: string;
    quantity: string;
    observation: string | null;
    delivered: string | number;
  }
  