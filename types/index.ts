export interface TableDataType {
  user_name: string;
  avatar_url: string;
  user_url: string;
  total_points: number;
  pr_urls: PRDataType[];
  full_name: string;
  college: string;
  rank: number;
}

interface PRDataType {
  url: string;
  difficulty: string;
}
