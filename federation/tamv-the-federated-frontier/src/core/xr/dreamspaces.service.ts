export interface DreamSpace {
  id: string;
  name: string;
  ownerId: string;
  allowedUserIds: string[];
  isPublic: boolean;
  createdAt: string;
}

export class DreamspacesService {
  private spaces: DreamSpace[] = [];

  create(name: string, ownerId: string, isPublic = false): DreamSpace {
    const space: DreamSpace = {
      id: `ds_${this.spaces.length + 1}`,
      name,
      ownerId,
      allowedUserIds: [ownerId],
      isPublic,
      createdAt: new Date().toISOString(),
    };
    this.spaces.push(space);
    return space;
  }

  grantAccess(spaceId: string, userId: string): DreamSpace | null {
    const found = this.spaces.find((s) => s.id === spaceId);
    if (!found) return null;
    if (!found.allowedUserIds.includes(userId)) found.allowedUserIds.push(userId);
    return found;
  }

  canEnter(spaceId: string, userId: string): boolean {
    const found = this.spaces.find((s) => s.id === spaceId);
    if (!found) return false;
    return found.isPublic || found.allowedUserIds.includes(userId);
  }
}
