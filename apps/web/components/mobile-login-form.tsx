"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { apiRequest } from "../lib/api-client";
import { saveAuthSession } from "../lib/auth-session";
import type { AuthResult, OAuthProvider, OAuthStartResult } from "../lib/shared-types";

export function MobileLoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      setIsSubmitting(true);
      const isRegister = mode === "register";
      const payload = isRegister
        ? {
            name: String(formData.get("name") ?? ""),
            email: String(formData.get("email") ?? ""),
            phone: String(formData.get("phone") ?? ""),
            password: String(formData.get("password") ?? "")
          }
        : {
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? "")
          };

      const result = await apiRequest<AuthResult>(isRegister ? "/v1/auth/register" : "/v1/auth/login", {
        method: "POST",
        body: payload
      });

      saveAuthSession(result);
      setStatus(isRegister ? `Account created for ${result.user.email}` : `Signed in as ${result.user.email}`);
      router.push("/add-child");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleOAuth(provider: OAuthProvider) {
    try {
      setIsSubmitting(true);
      const result = await apiRequest<OAuthStartResult>("/v1/auth/oauth", {
        method: "POST",
        body: { provider }
      });

      if (result.authUrl) {
        window.location.href = result.authUrl;
        return;
      }

      setStatus(result.message);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : `${provider} sign-in failed.`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="authScreen">
      <div className="authBrand">
        <div className="brandBadge">FS</div>
        <div>
          <strong>AB FAMILY SHIELD</strong>
          <div className="smallText">{mode === "login" ? "Welcome Back!" : "Create your parent account"}</div>
        </div>
      </div>

      <div className="authModeSwitch">
        <button
          className={mode === "login" ? "modeChip activeChip" : "modeChip"}
          type="button"
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          className={mode === "register" ? "modeChip activeChip" : "modeChip"}
          type="button"
          onClick={() => setMode("register")}
        >
          Register
        </button>
      </div>

      <form
        className="mobileForm"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          startTransition(() => {
            void handleSubmit(formData);
          });
        }}
      >
        {mode === "register" ? (
          <>
            <input
              className="mobileTextInput"
              name="name"
              type="text"
              placeholder="Parent name"
              required
            />
            <input
              className="mobileTextInput"
              name="phone"
              type="tel"
              placeholder="Phone number"
            />
          </>
        ) : null}
        <input
          className="mobileTextInput"
          name="email"
          type="email"
          placeholder="Email or Phone"
          required
        />
        <input
          className="mobileTextInput"
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <button className="primaryMobileButton" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>

      <div className="dividerText">or continue with</div>
      <button
        className="socialButton clickableButton"
        type="button"
        disabled={isSubmitting}
        onClick={() => {
          startTransition(() => {
            void handleOAuth("google");
          });
        }}
      >
        Continue with Google
      </button>
      <button
        className="socialButton clickableButton"
        type="button"
        disabled={isSubmitting}
        onClick={() => {
          startTransition(() => {
            void handleOAuth("apple");
          });
        }}
      >
        Continue with Apple
      </button>

      {status ? <p className="authFooter">{status}</p> : null}

      <p className="authFooter">
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/login" onClick={() => setMode("register")}>
              Create Account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" onClick={() => setMode("login")}>
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
