import { IdNvidaService } from "../identity/idnvida.service";
import { EconomyService } from "../economy/economy.service";
import { InternalLedger } from "../economy/ledger.internal";
import { SocialService } from "../social/social.service";
import { ApiResponse } from "./api.contracts";

export class ApiSimulation {
  private readonly identity = new IdNvidaService();
  private readonly economy = new EconomyService(new InternalLedger());
  private readonly social = new SocialService();

  authSignup(email: string, password: string): ApiResponse<{ userId: string }> {
    const user = this.identity.signup(email, password);
    return { ok: true, data: { userId: user.id } };
  }

  authLogin(email: string, password: string): ApiResponse<{ token: string }> {
    const session = this.identity.login(email, password);
    if (!session) return { ok: false, error: "Credenciales inválidas" };
    return { ok: true, data: { token: session.token } };
  }

  socialCreatePost(userId: string, content: string): ApiResponse<{ postId: string }> {
    const post = this.social.createPost(userId, content);
    return { ok: true, data: { postId: post.id } };
  }

  economyAllocate(userId: string): ApiResponse<{ amount: number }> {
    const entry = this.economy.allocateMonthlyCredits(userId, "free");
    return { ok: true, data: { amount: entry.amount } };
  }
}
