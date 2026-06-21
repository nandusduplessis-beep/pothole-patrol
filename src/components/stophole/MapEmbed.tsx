import { lazy, Suspense } from "react";
import type { MapEmbedProps } from "./MapEmbed.client";

const Lazy = lazy(() => import("./MapEmbed.client"));

export function MapEmbed(props: MapEmbedProps) {
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "var(--surface-sunken)",
          }}
        />
      }
    >
      <Lazy {...props} />
    </Suspense>
  );
}

export type { MapEmbedProps } from "./MapEmbed.client";