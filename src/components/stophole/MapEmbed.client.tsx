import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import type { CaseFile } from "@/data/seed";
import type { Verdict } from "@/components/stophole";
import { verdictFor } from "@/data/seed";

function markerIcon(verdict: Verdict): L.DivIcon {
  const color =
    verdict === "green"
      ? "var(--status-verified)"
      : verdict === "amber"
        ? "var(--accent)"
        : "var(--status-flagged)";
  return L.divIcon({
    className: "",
    html: `
      <svg class="sh-marker sh-marker--${verdict}" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0a12 12 0 0 0-12 12c0 9 12 20 12 20s12-11 12-20A12 12 0 0 0 12 0z" style="fill:${color}"/>
        <circle cx="12" cy="12" r="4.5" fill="#fff"/>
      </svg>
    `,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
  });
}

function FlyTo({ lat, lng, zoom = 14 }: { lat: number; lng: number; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], zoom, { duration: 0.6 });
  }, [lat, lng, zoom, map]);
  return null;
}

export interface MapEmbedProps {
  cases: CaseFile[];
  center: { lat: number; lng: number };
  zoom?: number;
  onSelect?: (caseFile: CaseFile) => void;
  selectedId?: string | null;
  interactive?: boolean;
}

export default function MapEmbed({
  cases,
  center,
  zoom = 12,
  onSelect,
  selectedId,
  interactive = true,
}: MapEmbedProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  const selected = cases.find((c) => c.id === selectedId);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      scrollWheelZoom={interactive}
      zoomControl={false}
      dragging={interactive}
      doubleClickZoom={interactive}
      touchZoom={interactive}
      attributionControl={true}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selected && <FlyTo lat={selected.lat} lng={selected.lng} zoom={15} />}
      {cases.map((c) => {
        const v: Verdict =
          c.daysOpen > 60 ? "red" : c.daysOpen > 14 ? "amber" : "green";
        return (
          <Marker
            key={c.id}
            position={[c.lat, c.lng]}
            icon={markerIcon(v)}
            eventHandlers={{
              click: () => onSelect?.(c),
            }}
          />
        );
      })}
    </MapContainer>
  );
}

export { verdictFor };