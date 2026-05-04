"use client";

type RequestOptions = {
  method?: "GET" | "POST";
  body?: unknown;
};

function getApiBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

  if (envUrl) {
    return envUrl;
  }

  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.hostname}:4000`;
  }

  return "http://localhost:4000";
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;

    try {
      const errorPayload = (await response.json()) as { message?: string };
      if (errorPayload.message) {
        message = errorPayload.message;
      }
    } catch {
      // Fall back to status text when the body isn't JSON.
      if (response.statusText) {
        message = response.statusText;
      }
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
}
