export type TokenSliceParams = {
  token?: string | null;
};

export interface JwtPayload {
  exp: number;
}

export interface BlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog?: Blog;
  onSave?: () => Promise<void>;
}
export interface Blog {
  slug: string;
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  category: string;
  tags?: string[];   
  featured?: boolean;
  image?: string;
  createdAt: string;
}

export interface MediaItem {
  _id?: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  title: string;
  category: string;
}
interface Campaign {
  _id: string;
  title: string;
  description: string;
  amount: number;
  startDate: string;
  endDate: string;
  imageUrl: string;
  createdAt: string;
  category: string;
  volunteers: number;
  status: "inprogress" | "completed" | "suspended"
  donatedAmount?: number; // optional for progress tracking
}
export type MediaItem = {
  id: number;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  title: string;
  category: string;
};