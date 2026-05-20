import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { createTamvServer } from "@/backend/server";

const app = createTamvServer(4091);

beforeAll(async () => { await app.start(); });
afterAll(async () => { await app.stop(); });

describe("TAMV backend server", () => {
  it("responds health and auth flow", async () => {
    const health = await fetch("http://localhost:4091/health");
    expect(health.status).toBe(200);

    const signup = await fetch("http://localhost:4091/auth/signup", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "u@tamv.org", password: "123456" }),
    });
    expect(signup.status).toBe(201);

    const login = await fetch("http://localhost:4091/auth/login", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "u@tamv.org", password: "123456" }),
    });
    expect(login.status).toBe(200);
  });
});
