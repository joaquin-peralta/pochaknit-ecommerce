export interface Pattern {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  titleColor: string;
  images: any;
}

export interface FtPattern {
  id: number;
  pattern: Pattern;
}

export interface Video {
  id: number;
  title: string;
  url: string;
}
export interface Purchase {
  id: number;
  pattern: Pattern;
  pdf: string;
  videos: Video[];
}
