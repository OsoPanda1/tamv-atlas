import { describe, expect, it } from "vitest";
import { SocialService } from "@/core/social/social.service";
import { DreamspacesService } from "@/core/xr/dreamspaces.service";
import { XrGateway } from "@/core/xr/xr.gateway";
import { toRendererInstruction } from "@/core/xr/xr.renderer.adapter";
import { ApiSimulation } from "@/core/api/routes.simulation";

describe("Extended TAMV services", () => {
  it("creates social posts, channels and direct messages", () => {
    const social = new SocialService();
    const post = social.createPost("u1", "Hola TAMV");
    const channel = social.createChannel("General", "u1");
    const dm = social.sendDirectMessage("u1", "u2", "Mensaje simple");
    expect(post.id).toContain("post_");
    expect(channel.memberIds).toContain("u1");
    expect(dm.id).toContain("dm_");
  });

  it("manages dreamspace access", () => {
    const dream = new DreamspacesService();
    const s = dream.create("Nodo Cero", "u1", false);
    expect(dream.canEnter(s.id, "u2")).toBe(false);
    dream.grantAccess(s.id, "u2");
    expect(dream.canEnter(s.id, "u2")).toBe(true);
  });

  it("publishes gateway events and maps renderer instructions", () => {
    const gateway = new XrGateway();
    let observed = "";
    gateway.subscribe((e) => { observed = e.type; });
    gateway.publish({ type: "guardian.alert", payload: { level: "orange" } });
    const out = toRendererInstruction({ sceneId: "1", atmosphere: "attention", color: "#ff9500", annotation: "Atención" });
    expect(observed).toBe("guardian.alert");
    expect(out.lightingMode).toBe("dusk");
  });

  it("simulates API routes for auth, social and economy", () => {
    const api = new ApiSimulation();
    const signup = api.authSignup("a@b.com", "123456");
    const login = api.authLogin("a@b.com", "123456");
    const post = api.socialCreatePost(signup.data!.userId, "Post base");
    const alloc = api.economyAllocate(signup.data!.userId);
    expect(signup.ok).toBe(true);
    expect(login.ok).toBe(true);
    expect(post.ok).toBe(true);
    expect(alloc.data?.amount).toBeGreaterThan(0);
  });
});
