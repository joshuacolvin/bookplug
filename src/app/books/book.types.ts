export interface IBook {
  id: string;
  title: string;
  author: string;
  recommendations: IRecommendation[];
}

export interface IRecommendation {
  source: string;
  url: string;
}
