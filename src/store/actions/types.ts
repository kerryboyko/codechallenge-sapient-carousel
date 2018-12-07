export interface IReduxAction {
  type: string;
  payload?: any;
}

export interface ISearchResult {
  totalHits: number;
  hits: IPixabayImage[];
  total: number;
}

export interface IPixabayImage {
  largeImageURL: string;
  webformatHeight: number;
  webformatWidth: number;
  likes: number;
  imageWidth: number;
  id: number;
  user_id: number;
  views: number;
  comments: number;
  pageURL: string;
  imageHeight: number;
  webformatURL: string;
  type: string;
  previewHeight: number;
  tags: string;
  downloads: number;
  user: string;
  favorites: number;
  imageSize: number;
  previewWidth: number;
  userImageURL: string;
  previewURL: string;
}
