"use client";

import { startTransition, useState } from "react";
import { apiRequest } from "../lib/api-client";
import type { CreateLinkInviteResult } from "../lib/shared-types";

type CreateChildResult = {
  message: string;
  child: {
    id: string;
    name: string;
    grade: string;
    deviceId: string;
  };
};

export function MobileAddChildForm({
  defaults
}: {
  defaults: {
    name: string;
    age: number;
    grade: string;
    deviceId: string;
    avatarLabel: string;
  };
}) {
  const [status, setStatus] = useState("");
  const [createdChildId, setCreatedChildId] = useState<string | null>(null);
  const [inviteLink, setInviteLink] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingInvite, setIsGeneratingInvite] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      setIsSubmitting(true);
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

      setCreatedChildId(result.child.id);
      setStatus(`${result.child.name} profile created. Now generate and share the child-device link.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Child creation failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCreateInvite() {
    if (!createdChildId) {
      setStatus("Create the child profile first so we know which device to link.");
      return;
    }

    try {
      setIsGeneratingInvite(true);
      const result = await apiRequest<{ message: string; invite: CreateLinkInviteResult | null }>(
        `/v1/children/${createdChildId}/link-invite`,
        {
          method: "POST"
        }
      );

      if (!result.invite) {
        setStatus("Could not create the invite link.");
        return;
      }

      setInviteCode(result.invite.invite.code);
      setInviteLink(result.invite.linkUrl);
      setStatus("Invite link created. Share it with the child's device.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Invite link generation failed.");
    } finally {
      setIsGeneratingInvite(false);
    }
  }

  return (
    <div className="addChildScreen">
      <h2>Add Your Child</h2>
      <p className="smallMuted">Add your child device to start keeping them safe.</p>
      <div className="profileAvatarLarge">{defaults.avatarLabel}</div>

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
        <input
          className="mobileTextInput"
          name="name"
          type="text"
          defaultValue={defaults.name}
          placeholder="Child name"
          required
        />
        <input
          className="mobileTextInput"
          name="age"
          type="number"
          min="1"
          max="18"
          defaultValue={defaults.age}
          placeholder="Age"
          required
        />
        <input
          className="mobileTextInput"
          name="grade"
          type="text"
          defaultValue={defaults.grade}
          placeholder="Grade"
          required
        />
        <input
          className="mobileTextInput"
          name="deviceId"
          type="text"
          defaultValue={defaults.deviceId}
          placeholder="Optional device label"
        />

        <button className="primaryMobileButton" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Child Profile"}
        </button>
        <button
          className="outlineMobileButton"
          type="button"
          disabled={isGeneratingInvite}
          onClick={() => {
            startTransition(() => {
              void handleCreateInvite();
            });
          }}
        >
          {isGeneratingInvite ? "Creating link..." : "Send Invite Link"}
        </button>
      </form>

      {inviteLink ? (
        <div className="inviteCard">
          <strong>Child device link ready</strong>
          <div className="smallMuted">Code: {inviteCode}</div>
          <a className="inviteLinkText" href={inviteLink} target="_blank" rel="noreferrer">
            {inviteLink}
          </a>
          <button
            className="softWideButton buttonReset clickableButton"
            type="button"
            onClick={() => {
              void navigator.clipboard.writeText(inviteLink);
              setStatus("Invite link copied.");
            }}
          >
            Copy Invite Link
          </button>
        </div>
      ) : null}

      {status ? <p className="authFooter">{status}</p> : null}
    </div>
  );
}
