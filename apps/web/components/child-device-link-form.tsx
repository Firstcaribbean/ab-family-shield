"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api-client";
import type { RedeemLinkInviteResult } from "../lib/shared-types";

type InvitePreview = {
  valid: boolean;
  expired?: boolean;
  redeemed?: boolean;
  message: string;
  child: {
    id: string;
    name: string;
    avatarLabel: string;
  } | null;
};

export function ChildDeviceLinkForm({ code }: { code: string }) {
  const [preview, setPreview] = useState<InvitePreview | null>(null);
  const [status, setStatus] = useState("Checking invite link...");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const result = await apiRequest<InvitePreview>(`/v1/link-invites/${code}`);
        setPreview(result);
        setStatus(result.message);
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Invite lookup failed.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [code]);

  async function handleSubmit(formData: FormData) {
    try {
      setIsSubmitting(true);
      const result = await apiRequest<RedeemLinkInviteResult>(`/v1/link-invites/${code}/redeem`, {
        method: "POST",
        body: {
          childName: String(formData.get("childName") ?? ""),
          deviceId: String(formData.get("deviceId") ?? ""),
          osName: String(formData.get("osName") ?? ""),
          osVersion: String(formData.get("osVersion") ?? ""),
          appVersion: String(formData.get("appVersion") ?? ""),
          batteryLevel: Number(formData.get("batteryLevel") ?? 100),
          network: String(formData.get("network") ?? "wifi")
        }
      });

      setStatus(result.message);
      setPreview((current) => (current ? { ...current, valid: false, redeemed: true } : current));
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Device linking failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inferredDeviceId =
    typeof navigator === "undefined"
      ? ""
      : `${navigator.platform || "device"}-${navigator.userAgent.length}`;

  return (
    <div className="featureScreen">
      <div className="profileAvatarLarge">{preview?.child?.avatarLabel ?? "FS"}</div>
      <h2>Link Child Device</h2>
      <p className="smallMuted centerText">{status}</p>

      {isLoading ? null : preview?.valid ? (
        <form
          className="mobileForm"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            void handleSubmit(formData);
          }}
        >
          <input
            className="mobileTextInput"
            name="childName"
            type="text"
            defaultValue={preview.child?.name ?? ""}
            placeholder="Child name on this device"
            required
          />
          <input
            className="mobileTextInput"
            name="deviceId"
            type="text"
            defaultValue={inferredDeviceId}
            placeholder="Device ID"
            required
          />
          <input
            className="mobileTextInput"
            name="osName"
            type="text"
            defaultValue={typeof navigator === "undefined" ? "Unknown" : navigator.platform || "Unknown"}
            placeholder="Operating system"
            required
          />
          <input
            className="mobileTextInput"
            name="osVersion"
            type="text"
            defaultValue="1.0"
            placeholder="OS version"
            required
          />
          <input
            className="mobileTextInput"
            name="appVersion"
            type="text"
            defaultValue="1.0.0"
            placeholder="App version"
            required
          />
          <input
            className="mobileTextInput"
            name="batteryLevel"
            type="number"
            min="1"
            max="100"
            defaultValue="100"
            placeholder="Battery level"
            required
          />
          <select className="mobileTextInput" name="network" defaultValue="wifi">
            <option value="wifi">Wi-Fi</option>
            <option value="cellular">Cellular</option>
            <option value="offline">Offline</option>
          </select>

          <button className="primaryMobileButton" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Linking..." : "Link This Device"}
          </button>
        </form>
      ) : (
        <div className="inviteCard">
          <strong>{preview?.redeemed ? "Device linked" : "Invite unavailable"}</strong>
          <div className="smallMuted">
            {preview?.redeemed
              ? "This invite link has already been used successfully on this device."
              : "Ask the parent to generate a new child-device invitation link."}
          </div>
        </div>
      )}
    </div>
  );
}
