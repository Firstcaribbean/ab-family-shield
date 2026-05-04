"use client";

import { startTransition, useState } from "react";
import { apiRequest } from "../lib/api-client";

type AuthResult = {
  token: string;
  user: {
    name: string;
    email: string;
  };
};

export function AuthPanels() {
  const [loginStatus, setLoginStatus] = useState<string>("");
  const [registerStatus, setRegisterStatus] = useState<string>("");

  async function handleLogin(formData: FormData) {
    try {
      const payload = {
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? "")
      };

      const result = await apiRequest<AuthResult>("/v1/auth/login", {
        method: "POST",
        body: payload
      });

      setLoginStatus(`Signed in as ${result.user.email}`);
    } catch {
      setLoginStatus("Login request failed. Confirm the API is running.");
    }
  }

  async function handleRegister(formData: FormData) {
    try {
      const payload = {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        password: String(formData.get("password") ?? "")
      };

      const result = await apiRequest<AuthResult>("/v1/auth/register", {
        method: "POST",
        body: payload
      });

      setRegisterStatus(`Account ready for ${result.user.name}`);
    } catch {
      setRegisterStatus("Registration request failed. Confirm the API is running.");
    }
  }

  return (
    <section className="pageSection">
      <div className="sectionHeader">
        <div>
          <span className="eyebrow">Onboarding</span>
          <h1>Authentication</h1>
        </div>
        <p className="muted">
          Parent sign-in and account creation flows wired to the backend API surface.
        </p>
      </div>

      <div className="grid">
        <article className="card">
          <div className="label">Login</div>
          <form
            className="form"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              startTransition(() => {
                void handleLogin(formData);
              });
            }}
          >
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" placeholder="parent@example.com" required />
            </label>
            <label className="field">
              <span>Password</span>
              <input name="password" type="password" placeholder="********" required />
            </label>
            <button className="button" type="submit">
              Sign In
            </button>
            {loginStatus ? <p className="muted">{loginStatus}</p> : null}
          </form>
        </article>

        <article className="card wide">
          <div className="label">Register Parent</div>
          <form
            className="form"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              startTransition(() => {
                void handleRegister(formData);
              });
            }}
          >
            <div className="formGrid">
              <label className="field">
                <span>Name</span>
                <input name="name" type="text" placeholder="Jordan Rivera" required />
              </label>
              <label className="field">
                <span>Email</span>
                <input name="email" type="email" placeholder="jordan@example.com" required />
              </label>
            </div>
            <div className="formGrid">
              <label className="field">
                <span>Phone</span>
                <input name="phone" type="tel" placeholder="+1 555 555 5555" />
              </label>
              <label className="field">
                <span>Password</span>
                <input name="password" type="password" placeholder="Create a password" required />
              </label>
            </div>
            <button className="button" type="submit">
              Create Account
            </button>
            {registerStatus ? <p className="muted">{registerStatus}</p> : null}
          </form>
        </article>
      </div>
    </section>
  );
}
