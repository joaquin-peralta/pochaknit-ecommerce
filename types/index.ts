export interface Pattern {
  _id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  priceExt: number;
  discount: number;
  creationDate: string;
  primaryColor: string;
  images: any;
  files: { urls: string[] };
  videos: any;
}

export interface Profile {
  _id: string;
  userID: string;
  username: string;
  email: string;
  emailVerified: Boolean;
  purchases: [string];
  mercadopago: [string];
  paypal: [string];
  tempPurchase: [string];
  pendingPurchases: [{ purchase: string[]; payment: string }];
}
export interface Purchase {
  categoryId: string;
  currencyId: string;
  description: string;
  id: string;
  pictureUrl: string;
  quantity: number;
  title: string;
  unitPrice: number;
}
