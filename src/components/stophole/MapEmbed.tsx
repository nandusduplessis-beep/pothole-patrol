import { useEffect, useState, type ComponentType } from "react";

export type MapEmbedProps = {
  center: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string;
    position: [number, number];
    color?: string;
    onClick?: () => void;
  }>;
  onMapClick?: (lat: number, lng: number) => void;
  droppedPin?: [number, number] | null;
};

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