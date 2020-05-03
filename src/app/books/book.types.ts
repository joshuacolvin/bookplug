export interface IBook {
  id?: string;
  googleId?: string;
  title: string;
  authors: string;
  uid: string;
  thumbnailUrl: string;
  recommendationCount?: any;
  createdAt?: any;
  recommendations: IRecommendation[];
}

export interface IBookPreview {
  googleId: string;
  title: string;
  authors: string[];
  thumbnailUrl: string;
  description: string;
}

export interface IRecommendation {
  id: string;
  recommendedBy: string;
  url: string;
  uid: string;
  notes: string;
  createdAt: any;
  source: string;
}
