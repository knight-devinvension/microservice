export interface Post {
    id?: number;
    user_id?: number;
    title: string;
    content: string;
    created_at?: string;
    updated_at?: string;
    user?: {
      id: number;
      name: string;
      email: string;
    };
  }
  