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
  id: number;
  pattern: Pattern;
}
