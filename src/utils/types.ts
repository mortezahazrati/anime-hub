export type Anime = {
  id: number;
  title: { english: string };
  status: string;
  coverImage: {
    large: string;
  };
  description: string;
  averageScore: number;
  episodes: number;
  season: string;
};
