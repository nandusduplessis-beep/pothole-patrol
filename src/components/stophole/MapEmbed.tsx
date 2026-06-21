import { useEffect, useState, type ComponentType } from "react";
import type { MapEmbedProps } from "./MapEmbed.client";

export type { MapEmbedProps } from "./MapEmbed.client";

const loadClient = (): Promise<{ default: ComponentType<MapEmbedProps> }> =>
  import(/* @vite-ignore */ `./MapEmbed.client.tsx`);

export function MapEmbed(props: MapEmbedProps) {
  const [Comp, setComp] = useState<ComponentType<MapEmbedProps> | null>(null);
  useEffect(() => {
    let cancelled = false;
    loadClient().then((mod) => {
      if (!cancelled) setComp(() => mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  if (!Comp) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "var(--surface-sunken)",
        }}
      />
    );
  }
  return <Comp {...props} />;
}