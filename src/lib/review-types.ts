export interface ReviewRecord {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ReviewPayload {
  name: string;
  rating: number;
  comment: string;
}

export const REVIEW_NAME_MAX = 60;
export const REVIEW_COMMENT_MIN = 10;
export const REVIEW_COMMENT_MAX = 800;
