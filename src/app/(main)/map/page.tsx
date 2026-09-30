"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { ArrowRight, BadgeCheck, CalendarDays, MapPin, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useTheme } from "@/components/ThemeProvider";
import { serviceBySlug, suppliers } from "@/lib/catalog";
import { cityCoords, events } from "@/lib/events";

type Pin =
  | { kind: "event"; id: string; name: string; sub: string; lat: number; lng: number; href: string; detail: string }
  | { kind: "supplier"; id: string; name: string; sub: string; lat: number; lng: number; href: string; detail: string; verified: boolean };

// Suppliers share a city centre, so fan them out slightly to keep pins tappable.
const jitter = (i: number) => ({ dLat: ((i % 3) - 1) * 0.018, dLng: ((Math.floor(i / 3) % 3) - 1) * 0.018 });

const pins: Pin[] = [
  ...events.map((e) => ({
    kind: "event" as const, id: `e${e.id}`, name: e.name, sub: `${e.city} · ${e.month}`, lat: e.lat, lng: e.lng,
    href: "/events", detail: `Typical needs: ${e.need.join(", ")}. Crowd ${e.size}.`,
  })),
  ...suppliers.map((s, i) => {
    const c = cityCoords[s.city];
    const { dLat, dLng } = jitter(i);
    return {
      kind: "supplier" as const, id: s.id, name: s.name, sub: `${serviceBySlug(s.service)?.name} · ${s.city}`,
      lat: c.lat + dLat, lng: c.lng + dLng, href: `/supplier/${s.id}`, detail: s.bio, verified: s.verified,
    };
  }),
];

const kenya = { lat: 0.2, lng: 37.9 };
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";
const HAS_KEY = !!API_KEY && API_KEY !== "YOUR_GOOGLE_MAPS_API_KEY_HERE";

const mapStyle = (night: boolean) => [
  { elementType: "geometry", stylers: [{ color: night ? "#1b1b1a" : "#e9e6e1" }] },
  { elementType: "labels.text.fill", stylers: [{ color: night ? "#b3afa8" : "#494744" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: night ? "#121212" : "#f5f3ef" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: night ? "#262624" : "#c7c2ba" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: night ? "#34332f" : "#f5f3ef" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: night ? "#d8d4cd" : "#141414" }] },
];

export default function MapPage() {
  const { resolvedTheme } = useTheme();
  const night = resolvedTheme === "dark";
  const [show, setShow] = useState<"all" | "event" | "supplier">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const [mapState, setMapState] = useState<"none" | "loading" | "ready" | "error">(HAS_KEY ? "loading" : "none");

  const visible = useMemo(() => pins.filter((p) => show === "all" || p.kind === show), [show]);
  const selected = pins.find((p) => p.id === selectedId) ?? null;

  const select = useCallback((p: Pin) => {
    setSelectedId(p.id);
    mapRef.current?.panTo({ lat: p.lat, lng: p.lng });
    if ((mapRef.current?.getZoom() ?? 6) < 9) mapRef.current?.setZoom(10);
  }, []);


  return (
    <div>
      <PageHeader
        title="Events map"
        parent={{ href: "/events", label: "Events" }}
        description="Where suppliers and events are across Kenya. Events are illustrative; suppliers are sample listings."
      >
        <div role="radiogroup" aria-label="Show" className="flex flex-wrap border-[1.5px] border-rod">
          {(["all", "event", "supplier"] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={show === k}
              onClick={() => setShow(k)}
              className={`min-h-10 px-4 text-sm font-semibold ${show === k ? "bg-cord text-cord-ink" : "hover:bg-surface"}`}
            >
              {k === "all" ? "Everything" : k === "event" ? "Events" : "Suppliers"}
            </button>
          ))}
        </div>
      </PageHeader>

      <div className="wrap pb-16 grid grid-cols-12 gap-y-6 lg:gap-x-[2.5vw]">
        <div className="col-span-12 lg:col-span-8">
          <div className="relative h-[55svh] min-h-[320px] lg:h-[calc(100svh-15rem)] border-[1.5px] border-rod bg-surface overflow-hidden">
            {HAS_KEY && <LiveMap pins={visible} night={night} selectedId={selectedId} onSelect={select} mapRef={mapRef} onState={setMapState} />}
            {mapState !== "ready" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                <MapPin size={28} className="text-ink-3" />
                <p className="mt-3 font-semibold">{mapState === "loading" ? "Loading map…" : "The map isn't available right now"}</p>
                <p className="mt-1 text-sm text-ink-2 max-w-[40ch]">Everything on the map is also in the list.</p>
              </div>
            )}
            <div className="absolute left-3 bottom-3 max-w-[calc(100%-1.5rem)] bg-ground border-[1.5px] border-rod px-3 py-2 text-xs flex flex-wrap gap-x-4 gap-y-1">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cord" /> Events</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-ink" /> Suppliers</span>
            </div>
          </div>

          {selected && (
            <div className="mt-4 border-[1.5px] border-rod p-4 flex flex-wrap items-start justify-between gap-4" aria-live="polite">
              <div className="min-w-0">
                <p className="font-display text-2xl flex items-center gap-2">
                  {selected.name}
                  {selected.kind === "supplier" && selected.verified && <BadgeCheck size={18} className="text-ok" aria-label="Verified" />}
                </p>
                <p className="text-sm text-ink-2">{selected.sub}</p>
                <p className="mt-2 text-sm max-w-[60ch]">{selected.detail}</p>
              </div>
              <Link href={selected.href} className="inline-flex min-h-11 items-center gap-2 px-5 bg-ink text-ground font-bold hover:bg-cord hover:text-cord-ink transition-colors">
                {selected.kind === "supplier" ? "View profile" : "See events"} <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>

        <ol className="col-span-12 lg:col-span-4 rod-top lg:max-h-[calc(100svh-15rem)] lg:overflow-y-auto" aria-label="Places on the map">
          {visible.map((p) => (
            <li key={p.id} className="border-b border-rod-soft">
              <button
                type="button"
                onClick={() => select(p)}
                aria-pressed={selectedId === p.id}
                className={`w-full text-left flex items-start gap-3 py-3 px-2 hover:bg-surface ${selectedId === p.id ? "bg-surface" : ""}`}
              >
                <span aria-hidden className={`mt-1.5 shrink-0 w-2.5 h-2.5 ${p.kind === "event" ? "rounded-full bg-cord" : "bg-ink"}`} />
                <span className="min-w-0">
                  <span className="block font-semibold truncate">{p.name}</span>
                  <span className="block text-sm text-ink-2 flex items-center gap-1.5">
                    {p.kind === "event" ? <CalendarDays size={13} /> : <Users size={13} />} {p.sub}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// Only mounted when a Maps key exists, so no Google script loads otherwise.
function LiveMap({
  pins: shown, night, selectedId, onSelect, mapRef, onState,
}: {
  pins: Pin[];
  night: boolean;
  selectedId: string | null;
  onSelect: (p: Pin) => void;
  mapRef: React.RefObject<google.maps.Map | null>;
  onState: (s: "ready" | "error") => void;
}) {
  const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: API_KEY, preventGoogleFontsLoading: true });
  useEffect(() => {
    if (loadError) onState("error");
    else if (isLoaded) onState("ready");
  }, [isLoaded, loadError, onState]);
  if (!isLoaded || loadError) return null;
  const ink = night ? "#ece9e4" : "#141414";
  const cord = night ? "#ff3355" : "#d9143a";
  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={kenya}
      zoom={6}
      onLoad={(m) => { mapRef.current = m; }}
      options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyle(night), clickableIcons: false }}
    >
      {shown.map((p) => (
        <Marker
          key={p.id}
          position={{ lat: p.lat, lng: p.lng }}
          title={p.name}
          onClick={() => onSelect(p)}
          icon={{
            path: p.kind === "event" ? google.maps.SymbolPath.CIRCLE : "M -6 -6 L 6 -6 L 6 6 L -6 6 Z",
            scale: p.kind === "event" ? 8 : 1,
            fillColor: p.kind === "event" ? cord : ink,
            fillOpacity: 1,
            strokeColor: night ? "#121212" : "#ffffff",
            strokeWeight: selectedId === p.id ? 3 : 1.5,
          }}
        />
      ))}
    </GoogleMap>
  );
}
