"use client";

import { startTransition, useState } from "react";
import { apiRequest } from "../lib/api-client";

type CreateChildResult = {
  message: string;
  child: {
    name: string;
    grade: string;
    deviceId: string;
  };
};

export function ChildOnboarding() {
  const [status, setStatus] = useState<string>("");

  async function handleCreateChild(formData: FormData) {
    try {
      const payload = {
        name: String(formData.get("name") ?? ""),
        age: Number(formData.get("age") ?? 0),
        grade: String(formData.get("grade") ?? ""),
        deviceId: String(formData.get("deviceId") ?? "")
      };

      const result = await apiRequest<CreateChildResult>("/v1/children", {
        method: "POST",
        body: payload
      });

      setStatus(`${result.child.name} profile created with device ${result.child.deviceId}`);
    } catch {
      setStatus("Child creation failed. Confirm the API is running.");
    }
  }

  return (
    <section className="pageSection">
      <div className="sectionHeader">
        <div>
          <span className="eyebrow">Family Setup</span>
          <h1>Add a Child</h1>
        </div>
        <p className="muted">
          Create a child profile and prepare device linking from the parent dashboard.
        </p>
      </div>

      <article className="card full">
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            startTransition(() => {
              void handleCreateChild(formData);
            });
          }}
        >
          <div className="formGrid triple">
            <label className="field">
              <span>Name</span>
              <input name="name" type="text" placeholder="Ava Rivera" required />
            </label>
            <label className="field">
              <span>Age</span>
              <input name="age" type="number" min="1" max="18" placeholder="12" required />
            </label>
            <label className="field">
              <span>Grade</span>
              <input name="grade" type="text" placeholder="7th Grade" required />
            </label>
          </div>

          <label className="field">
            <span>Device ID</span>
            <input name="deviceId" type="text" placeholder="ios-ava-01" required />
          </label>

          <button className="button" type="submit">
            Create Child Profile
          </button>

          {status ? <p className="muted">{status}</p> : null}
        </form>
      </article>
    </section>
  );
}
