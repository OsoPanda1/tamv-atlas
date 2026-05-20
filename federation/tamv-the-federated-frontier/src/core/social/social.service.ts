import { Channel, DirectMessage, MediaType, Post } from "./social.types";

export class SocialService {
  private posts: Post[] = [];
  private channels: Channel[] = [];
  private messages: DirectMessage[] = [];

  createPost(authorId: string, content: string, mediaType: MediaType = "text"): Post {
    const post: Post = {
      id: `post_${this.posts.length + 1}`,
      authorId,
      content,
      mediaType,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
    };
    this.posts.push(post);
    return post;
  }

  createChannel(name: string, ownerId: string): Channel {
    const channel: Channel = { id: `chn_${this.channels.length + 1}`, name, ownerId, memberIds: [ownerId] };
    this.channels.push(channel);
    return channel;
  }

  sendDirectMessage(fromUserId: string, toUserId: string, text: string): DirectMessage {
    const message: DirectMessage = {
      id: `dm_${this.messages.length + 1}`,
      fromUserId,
      toUserId,
      text,
      createdAt: new Date().toISOString(),
    };
    this.messages.push(message);
    return message;
  }

  listPosts(): Post[] { return [...this.posts]; }
  listChannels(): Channel[] { return [...this.channels]; }
  listMessages(userId: string): DirectMessage[] { return this.messages.filter(m => m.fromUserId===userId || m.toUserId===userId); }
}
