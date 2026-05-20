export interface IdentityUser {
  id: string;
  email: string;
  role: "free" | "creator" | "guardian" | "institutional";
}

export class IdNvidaService {
  private users = new Map<string, { user: IdentityUser; password: string }>();

  signup(email: string, password: string, role: IdentityUser["role"] = "free"): IdentityUser {
    const id = `usr_${this.users.size + 1}`;
    const user: IdentityUser = { id, email, role };
    this.users.set(email, { user, password });
    return user;
  }

  login(email: string, password: string): { token: string; user: IdentityUser } | null {
    const found = this.users.get(email);
    if (!found || found.password !== password) return null;
    return { token: `tamv_${found.user.id}_token`, user: found.user };
  }
}
