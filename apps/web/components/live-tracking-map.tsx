"use client";

import { useEffect, useRef, useState } from "react";
import type { SafeZone } from "../lib/shared-types";

declare global {
  interface Window {
    L?: {
      map: (element: HTMLElement) => {
        setView: (coords: [number, number], zoom: number) => void;
        remove: () => void;
      };
      tileLayer: (
        url: string,
        options: { attribution: string; maxZoom: number }
      ) => { addTo: (map: unknown) => void };
      marker: (coords: [number, number]) => {
        addTo: (map: unknown) => {
          bindPopup: (content: string) => void;
          setLatLng: (coords: [number, number]) => void;
          openPopup: () => void;
        };
      };
      circle: (
        coords: [number, number],
        options: { radius: number; color: string; fillColor: string; fillOpacity: number }
      ) => { addTo: (map: unknown) => void };
      polyline: (
        coords: Array<[number, number]>,
        options: { color: string; weight: number }
      ) => {
        addTo: (map: unknown) => void;
        setLatLngs: (coords: Array<[number, number]>) => void;
      };
    };
  }
}

type LeafletMapInstance = {
  setView: (coords: [number, number], zoom: number) => void;
  remove: () => void;
};

type LeafletMarkerInstance = {
  bindPopup: (content: string) => void;
  setLatLng: (coords: [number, number]) => void;
  openPopup: () => void;
};

type LeafletPolylineInstance = {
  addTo: (map: unknown) => void;
  setLatLngs: (coords: Array<[number, number]>) => void;
};

function loadLeafletAssets() {
  if (document.querySelector('link[data-leaflet="true"]')) {
    return;
  }

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  css.dataset.leaflet = "true";
  document.head.appendChild(css);
}

function loadLeafletScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.L) {
      resolve();
      return;
    }

    const existing = document.querySelector('script[data-leaflet="true"]');

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Leaflet failed to load.")), {
        once: true
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.dataset.leaflet = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Leaflet failed to load."));
    document.body.appendChild(script);
  });
}

export function LiveTrackingMap({
  childName,
  avatarLabel,
  safeZones,
  initialLatitude,
  initialLongitude
}: {
  childName: string;
  avatarLabel: string;
  safeZones: SafeZone[];
  initialLatitude: number;
  initialLongitude: number;
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletMapInstance | null>(null);
  const markerRef = useRef<LeafletMarkerInstance | null>(null);
  const polylineRef = useRef<LeafletPolylineInstance | null>(null);
  const pathRef = useRef<Array<[number, number]>>([[initialLatitude, initialLongitude]]);
  const [status, setStatus] = useState("Loading map...");
  const [coords, setCoords] = useState(`${initialLatitude.toFixed(5)}, ${initialLongitude.toFixed(5)}`);

  useEffect(() => {
    let cancelled = false;

    async function setupMap() {
      if (!mapRef.current) {
        return;
      }

      loadLeafletAssets();
      await loadLeafletScript();

      if (cancelled || !mapRef.current || !window.L) {
        return;
      }

      const L = window.L;
      const map = L.map(mapRef.current);
      map.setView([initialLatitude, initialLongitude], 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19
      }).addTo(map);

      const marker = L.marker([initialLatitude, initialLongitude]).addTo(map);
      marker.bindPopup(`${childName} (${avatarLabel})`);

      safeZones.forEach((zone) => {
        L.circle([zone.latitude, zone.longitude], {
          radius: zone.radiusMeters,
          color: "#20b15a",
          fillColor: "#7ddf9e",
          fillOpacity: 0.18
        }).addTo(map);
      });

      const polyline = L.polyline(pathRef.current, {
        color: "#1f6fff",
        weight: 4
      });
      polyline.addTo(map);

      mapInstanceRef.current = map;
      markerRef.current = marker;
      polylineRef.current = polyline;
      setStatus("Map ready. Tracking will start when location permission is allowed.");
    }

    void setupMap().catch(() => {
      setStatus("Map could not load. Check your internet connection.");
    });

    return () => {
      cancelled = true;
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [avatarLabel, childName, initialLatitude, initialLongitude, safeZones]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported on this device.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const nextCoords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude
        ];

        pathRef.current = [...pathRef.current, nextCoords].slice(-20);
        setCoords(`${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`);
        setStatus(`Tracking live. Accuracy ${Math.round(position.coords.accuracy)}m`);

        markerRef.current?.setLatLng(nextCoords);
        polylineRef.current?.setLatLngs(pathRef.current);
        mapInstanceRef.current?.setView(nextCoords, 16);
      },
      (error) => {
        setStatus(
          error.code === error.PERMISSION_DENIED
            ? "Location permission denied. Enable location access to track live movement."
            : "Live tracking failed. Try again with stronger location signal."
        );
      },
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 10000
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="trackingMapBlock">
      <div ref={mapRef} className="leafletMap" />
      <div className="trackingStatusCard">
        <strong>{status}</strong>
        <div className="smallText">Coordinates: {coords}</div>
      </div>
    </div>
  );
}
