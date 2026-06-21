import { useEffect, useState, type ComponentType } from "react";
import type { MapEmbedProps } from "./MapEmbedImpl";

export type { MapEmbedProps } from "./MapEmbedImpl";

const loadClient = (): Promise<{ default: ComponentType<MapEmbedProps> }> =>
  import("./MapEmbedImpl");

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