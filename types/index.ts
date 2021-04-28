export interface File {
  id: string;
  url: string;
}

export interface CloudImage {
  id: string;
  alternativeText: string;
  url: string;
}

export interface CloudVideo {
  id: string;
  url: string;
}
export interface Pattern {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  primaryColor: string;
  files: File[];
  images: CloudImage[];
  videos: CloudVideo[];
}

export interface Profile {
  _id: string;
  sub: string;
  username: string;
  email: string;
  emailVerified: Boolean;
  purchases: [string];
  mercadopago: [string];
  paypal: [string];
}

export interface Featured {
  id: string;
  pattern: Pattern;
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
