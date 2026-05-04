"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { apiRequest } from "../lib/api-client";

export function CheckInButton({ childId }: { childId: string }) {
  const router = useRouter();
  const [label, setLabel] = useState("Check In");

  return (
    <button
      className="miniBlueButton"
      type="button"
      onClick={() => {
        startTransition(() => {
          void apiRequest(`/v1/children/${childId}/check-in`, {
            method: "POST",
            body: { childId }
          })
            .then(() => {
              setLabel("Checked In");
              router.refresh();
            })
            .catch(() => {
              setLabel("Try Again");
            });
        });
      }}
    >
      {label}
    </button>
  );
}
