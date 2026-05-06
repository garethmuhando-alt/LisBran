"use client";

import { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Circle } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Users, Briefcase, X, Phone, Filter, Zap } from "lucide-react";
import Link from "next/link";

// ─── Kenya-wide seeded events ─────────────────────────────────────────────────
const EVENTS = [
  { id: 1, name: "Nairobi Fashion Week", category: "events", lat: -1.2864, lng: 36.8172, city: "Nairobi", date: "15 Jun 2026", attendees: "2,000+", description: "East Africa's premier fashion showcase. Ideal for graphic designers, photographers, and influencers.", contact: "+254711000001", type: "Fashion" },
  { id: 2, name: "Blankets & Wine", category: "events", lat: -1.3000, lng: 36.7900, city: "Nairobi", date: "20 Jun 2026", attendees: "3,500+", description: "Monthly outdoor music & lifestyle festival. Huge opportunity for event branding and photography.", contact: "+254711000002", type: "Music" },
  { id: 3, name: "Mombasa Trade Expo", category: "events", lat: -4.0435, lng: 39.6682, city: "Mombasa", date: "5 Jul 2026", attendees: "5,000+", description: "Coastal trade and SME expo. Perfect for printing, branding and marketing service providers.", contact: "+254711000003", type: "Trade" },
  { id: 4, name: "Kisumu Biz Summit", category: "events", lat: -0.1022, lng: 34.7617, city: "Kisumu", date: "12 Jul 2026", attendees: "1,200+", description: "Lake region business growth summit. Needs influencers, graphic designers, and event activators.", contact: "+254711000004", type: "Business" },
  { id: 5, name: "Nakuru Agri-Expo", category: "events", lat: -0.3031, lng: 36.0800, city: "Nakuru", date: "18 Jul 2026", attendees: "4,000+", description: "Kenya's biggest agri-business exhibition. Branding and printing services in high demand.", contact: "+254711000005", type: "Agriculture" },
  { id: 6, name: "Eldoret Sports Day", category: "events", lat: 0.5200, lng: 35.2698, city: "Eldoret", date: "25 Jul 2026", attendees: "8,000+", description: "Annual sports gala and sponsorship fair. Great for event activation and influencer services.", contact: "+254711000006", type: "Sports" },
  { id: 7, name: "Nairobi Tech Week", category: "events", lat: -1.2411, lng: 36.8897, city: "Nairobi", date: "2 Aug 2026", attendees: "10,000+", description: "East Africa's largest tech conference. Web design, branding, and digital marketing services needed.", contact: "+254711000007", type: "Tech" },
  { id: 8, name: "Malindi Cultural Fest", category: "events", lat: -3.2138, lng: 40.1169, city: "Malindi", date: "10 Aug 2026", attendees: "1,500+", description: "Coastal heritage festival. Photography, event decor and promotion services welcome.", contact: "+254711000008", type: "Culture" },
  { id: 9, name: "Thika Road Business Park Activation", category: "events", lat: -1.0333, lng: 37.0833, city: "Thika", date: "14 Aug 2026", attendees: "900+", description: "SME activation and pop-up market. Printing and design vendors needed.", contact: "+254711000009", type: "Business" },
  { id: 10, name: "Nyeri County Agri Fair", category: "events", lat: -0.4200, lng: 36.9500, city: "Nyeri", date: "22 Aug 2026", attendees: "2,200+", description: "Highland agricultural fair. Branding stalls, photography, and event setup services needed.", contact: "+254711000010", type: "Agriculture" },
];

// ─── Mock vendor pins ─────────────────────────────────────────────────────────
const VENDORS = [
  { id: "personal-designs", name: "Neon Gravity Co.", category: "Influencer Marketing", lat: -1.2680, lng: 36.8050, city: "Westlands, NBI" },
  { id: "ht-marketing",    name: "H&T Marketing",   category: "Influencer Services",   lat: -1.3080, lng: 36.8200, city: "South B, NBI" },
  { id: "linqia",          name: "LINQIA",           category: "Consulting",             lat: -4.0500, lng: 39.6600, city: "Mombasa" },
  { id: "sp-studio",       name: "SP Studio",        category: "Web & App Design",       lat: -0.1000, lng: 34.7700, city: "Kisumu" },
  { id: "pete-barret",     name: "Pete & Barret Designs", category: "Graphic Design",   lat: -1.2900, lng: 36.8200, city: "CBD, NBI" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Fashion: "#ec4899", Music: "#a855f7", Trade: "#3b82f6",
  Business: "#f59e0b", Agriculture: "#10b981", Sports: "#ef4444",
  Tech: "#6366f1", Culture: "#f97316", Default: "#14b8a6",
};

const mapContainerStyle = { width: "100%", height: "100%" };
const kenyaCenter = { lat: -0.0236, lng: 37.9062 };
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#a1a1aa" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#2d2d4e" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3d3d6e" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d1b2a" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#1e1e3e" }] },
    { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2d2d4e" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#2d2d4e" }] },
    { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9089fa" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#c8c8e0" }] },
  ],
};

export default function MapPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<unknown>(null);
  const [selectedType, setSelectedType] = useState<"event" | "vendor" | null>(null);
  const [showEvents, setShowEvents] = useState(true);
  const [showVendors, setShowVendors] = useState(true);
  const [filterType, setFilterType] = useState<string>("All");
  const mapRef = useRef<google.maps.Map | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const eventTypes = ["All", ...Array.from(new Set(EVENTS.map(e => e.type)))];
  const filteredEvents = EVENTS.filter(e => filterType === "All" || e.type === filterType);

  const handleWhatsApp = (contact: string, name: string) => {
    const msg = `Hi! I found the ${name} event on LisBran and I'd like to offer my services. Could we discuss?`;
    window.open(`https://wa.me/${contact.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // ─── No API key state ─────────────────────────────────────────────────────
  if (!apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY_HERE") {
    return (
      <div className="min-h-screen bg-[#0d0d1a] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
          <MapPin size={36} className="text-purple-400" />
        </div>
        <h1 className="text-2xl font-black text-white mb-2">Maps Not Configured</h1>
        <p className="text-zinc-400 text-sm max-w-sm mb-6">
          To enable the Kenya Events Map, add your Google Maps API key to <code className="text-purple-300 bg-purple-500/10 px-1 rounded">.env.local</code>
        </p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left text-sm font-mono text-zinc-300 mb-6 w-full max-w-sm">
          NEXT_PUBLIC_GOOGLE_MAPS_KEY=<span className="text-green-400">AIza…your_key</span>
        </div>
        <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer"
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-6 py-3 rounded-2xl text-sm mb-4 block">
          Get a Free API Key →
        </a>
        <button onClick={() => { router.back(); }} className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">
          ← Go back
        </button>

        {/* Preview: event list without map */}
        <div className="mt-10 w-full max-w-sm space-y-3">
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-4">Upcoming Events Preview</p>
          {EVENTS.slice(0, 5).map(ev => (
            <div key={ev.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left flex gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${CATEGORY_COLORS[ev.type] || CATEGORY_COLORS.Default}22`, border: `1px solid ${CATEGORY_COLORS[ev.type] || CATEGORY_COLORS.Default}55` }}>
                <Calendar size={16} style={{ color: CATEGORY_COLORS[ev.type] || CATEGORY_COLORS.Default }} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{ev.name}</p>
                <p className="text-zinc-500 text-xs">{ev.city} · {ev.date} · {ev.attendees}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (loadError) return (
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
      <p className="text-red-400 font-bold">Failed to load Google Maps. Check your API key.</p>
    </div>
  );

  if (!isLoaded) return (
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="relative w-full h-screen bg-[#0d0d1a] overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-3 px-4 pt-5 pb-3 bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={() => { router.back(); }} className="p-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/15 text-white hover:bg-white/20 transition-colors flex-shrink-0">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <h1 className="text-white font-black text-base leading-tight">Kenya Events & Vendors</h1>
          <p className="text-zinc-400 text-xs">{filteredEvents.length} events · {VENDORS.length} vendors</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setShowEvents(v => !v); }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${showEvents ? 'bg-purple-500/30 border-purple-500/60 text-purple-300' : 'bg-white/5 border-white/10 text-zinc-500'}`}>
            <Calendar size={11} className="inline mr-1" />Events
          </button>
          <button onClick={() => { setShowVendors(v => !v); }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${showVendors ? 'bg-pink-500/30 border-pink-500/60 text-pink-300' : 'bg-white/5 border-white/10 text-zinc-500'}`}>
            <Briefcase size={11} className="inline mr-1" />Vendors
          </button>
        </div>
      </div>

      {/* ── Filter chips ─────────────────────────────────────────────────────── */}
      <div className="absolute top-20 left-0 right-0 z-20 flex gap-2 px-4 overflow-x-auto scrollbar-hide pb-1">
        {eventTypes.map(type => (
          <button key={type} onClick={() => { setFilterType(type); }}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
              filterType === type ? 'bg-white text-black border-transparent' : 'bg-black/40 backdrop-blur-md border-white/10 text-zinc-400'
            }`}>
            {type}
          </button>
        ))}
      </div>

      {/* ── Map ─────────────────────────────────────────────────────────────── */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={kenyaCenter}
        zoom={6}
        options={mapOptions}
        onLoad={onLoad}
        onClick={() => { setSelected(null); }}
      >
        {/* Event markers */}
        {showEvents && filteredEvents.map(ev => (
          <Marker
            key={`ev-${ev.id}`}
            position={{ lat: ev.lat, lng: ev.lng }}
            onClick={() => { setSelected(ev); setSelectedType("event"); }}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: CATEGORY_COLORS[ev.type] || CATEGORY_COLORS.Default,
              fillOpacity: 0.9,
              strokeColor: "#fff",
              strokeWeight: 2,
            }}
          />
        ))}

        {/* Vendor markers */}
        {showVendors && VENDORS.map(v => (
          <Marker
            key={`vd-${v.id}`}
            position={{ lat: v.lat, lng: v.lng }}
            onClick={() => { setSelected(v); setSelectedType("vendor"); }}
            icon={{
              path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              scale: 7,
              fillColor: "#e879f9",
              fillOpacity: 0.9,
              strokeColor: "#fff",
              strokeWeight: 2,
            }}
          />
        ))}
      </GoogleMap>

      {/* ── Legend ──────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-6 left-4 z-20 flex flex-col gap-1.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-zinc-300">
          <div className="w-3 h-3 rounded-full bg-purple-400 border border-white/30" />
          Events
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-300">
          <div className="w-3 h-3 bg-pink-400 border border-white/30" style={{ clipPath: "polygon(50% 0%,0% 100%,100% 100%)" }} />
          Vendors
        </div>
      </div>

      {/* ── Detail bottom sheet ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 z-30 bg-[#0f0f1e]/95 backdrop-blur-2xl border-t border-white/10 rounded-t-3xl p-5 pb-8"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={selectedType === "event"
                    ? { background: `${CATEGORY_COLORS[(selected as any).type] || CATEGORY_COLORS.Default}22`, border: `1px solid ${CATEGORY_COLORS[(selected as any).type] || CATEGORY_COLORS.Default}55` }
                    : { background: "#e879f922", border: "1px solid #e879f955" }}>
                  {selectedType === "event"
                    ? <Calendar size={20} style={{ color: CATEGORY_COLORS[(selected as any).type] || CATEGORY_COLORS.Default }} />
                    : <Briefcase size={20} className="text-pink-400" />}
                </div>
                <div>
                  <h2 className="text-white font-black text-base leading-tight">{selected.name}</h2>
                  <p className="text-zinc-500 text-xs">
                    {selectedType === "event"
                      ? `${selected.city} · ${selected.date} · ${selected.attendees} attendees`
                      : `${selected.city} · ${selected.category}`}
                  </p>
                </div>
              </div>
              <button onClick={() => { setSelected(null); }} className="p-2 bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {selectedType === "event" && (
              <>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">{selected.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => { handleWhatsApp((selected as {contact: string; name: string}).contact, (selected as {contact: string; name: string}).name); }}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <Phone size={15} /> Offer Services via WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      mapRef.current?.panTo({ lat: selected.lat, lng: selected.lng });
                      mapRef.current?.setZoom(13);
                    }}
                    className="px-4 bg-white/5 border border-white/10 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-sm">
                    <MapPin size={15} />
                  </button>
                </div>
              </>
            )}

            {selectedType === "vendor" && (
              <>
                <p className="text-zinc-400 text-sm mb-4">Specialises in <span className="text-white font-semibold">{selected.category}</span> · Based in {selected.city}</p>
                <Link href={`/supplier/${selected.id}`}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <Briefcase size={15} /> View Full Profile
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
