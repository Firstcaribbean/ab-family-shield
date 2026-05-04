"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { apiRequest } from "../lib/api-client";

export function SosButton({
  childId,
  childName
}: {
  childId: string;
  childName: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState("SOS");

  return (
    <button
      className="sosPulseButton buttonReset"
      type="button"
      onClick={() => {
        startTransition(() => {
          void apiRequest("/v1/alerts/sos", {
            method: "POST",
            body: {
              childId,
              message: `${childName} sent an SOS alert.`
            }
          })
            .then(() => {
              setStatus("SENT");
              router.refresh();
            })
            .catch(() => {
              setStatus("RETRY");
            });
        });
      }}
    >
      {status}
    </button>
  );
}
