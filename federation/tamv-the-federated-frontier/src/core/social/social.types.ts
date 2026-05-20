export type MediaType = "text" | "image" | "audio" | "video";

export interface Post {
  id: string;
  authorId: string;
  content: string;
  mediaType: MediaType;
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface Channel {
  id: string;
  name: string;
  ownerId: string;
  memberIds: string[];
}

export interface DirectMessage {
  id: string;
  fromUserId: string;
  toUserId: string;
  text: string;
  createdAt: string;
}
