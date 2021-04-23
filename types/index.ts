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
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  primaryColor: string;
  files: File[];
  images: CloudImage[];
  videos: CloudVideo[];
}

export interface Featured {
  id: number;
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
