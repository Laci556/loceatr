export type Recommendation = {
  name: string;
  date: string;
  location: { lat: number; lon: number };
  address: string;
  id: number;
  image_updated: string;
  image: string;
  desc: string;
  tel?: string;
  web?: string;
};

export type DBRecommendation = {
  user_id?: string;
  created_at: string;
  places: {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
    image_updated: string;
    desc: string;
    tel?: string;
    web?: string;
  };
};
