"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface GameMapProps {
  onGuess: (lat: number, lng: number) => void;
  guessPosition: { lat: number; lng: number } | null;
  showResult: boolean;
  answerLat?: number;
  answerLng?: number;
}

export default function GameMap({
  onGuess,
  guessPosition,
  showResult,
  answerLat,
  answerLng,
}: GameMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const guessMarkerRef = useRef<L.Marker | null>(null);
  const answerMarkerRef = useRef<L.Marker | null>(null);
  const lineRef = useRef<L.Polyline | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const maxBounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

    const map = L.map(mapContainerRef.current, {
      center: [20, 0],
      zoom: 3,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: true,
      attributionControl: false,
      maxBounds: maxBounds,
      maxBoundsViscosity: 1.0,
      worldCopyJump: false,
    });

    // Bright, colorful map without labels
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
      {
        subdomains: "abcd",
        maxZoom: 19,
        noWrap: true,
        bounds: [
          [-90, -180],
          [90, 180],
        ],
      }
    ).addTo(map);

    map.zoomControl.setPosition("bottomright");

    mapRef.current = map;
    setMapReady(true);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    const map = mapRef.current;

    const handleClick = (e: L.LeafletMouseEvent) => {
      if (showResult) return;
      onGuess(e.latlng.lat, e.latlng.lng);
    };

    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [mapReady, onGuess, showResult]);

  useEffect(() => {
    if (!mapRef.current || !mapReady) return;

    if (guessMarkerRef.current) {
      guessMarkerRef.current.remove();
      guessMarkerRef.current = null;
    }

    if (guessPosition) {
      const guessIcon = L.divIcon({
        className: "bg-transparent border-none",
        html: `
          <div style="animation: bounceIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-origin: bottom center;">
            <svg viewBox="0 0 24 24" fill="#f43f5e" stroke="white" stroke-width="2" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3)); width: 50px; height: 50px;">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3" fill="white"></circle>
            </svg>
          </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
      });

      guessMarkerRef.current = L.marker(
        [guessPosition.lat, guessPosition.lng],
        { icon: guessIcon }
      ).addTo(mapRef.current);
    }
  }, [guessPosition, mapReady]);

  useEffect(() => {
    if (!mapRef.current || !mapReady) return;

    if (answerMarkerRef.current) {
      answerMarkerRef.current.remove();
      answerMarkerRef.current = null;
    }
    if (lineRef.current) {
      lineRef.current.remove();
      lineRef.current = null;
    }

    if (showResult && answerLat !== undefined && answerLng !== undefined) {
      const map = mapRef.current;

      const answerIcon = L.divIcon({
        className: "bg-transparent border-none",
        html: `
          <div style="animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-origin: bottom center;">
            <svg viewBox="0 0 24 24" fill="#10b981" stroke="white" stroke-width="2" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3)); width: 50px; height: 50px;">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <path d="M12 7l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z" fill="white" stroke="none"></path>
            </svg>
          </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
      });

      answerMarkerRef.current = L.marker([answerLat, answerLng], {
        icon: answerIcon,
      }).addTo(map);

      if (guessPosition) {
        lineRef.current = L.polyline(
          [
            [guessPosition.lat, guessPosition.lng],
            [answerLat, answerLng],
          ],
          { className: "distance-line-fun" }
        ).addTo(map);

        const bounds = L.latLngBounds(
          [guessPosition.lat, guessPosition.lng],
          [answerLat, answerLng]
        );
        map.fitBounds(bounds, { padding: [100, 100], maxZoom: 6 });
      } else {
        map.flyTo([answerLat, answerLng], 5, { duration: 1.5 });
      }
    }
  }, [showResult, answerLat, answerLng, guessPosition, mapReady]);

  useEffect(() => {
    if (!showResult && mapRef.current && mapReady) {
      if (answerMarkerRef.current) {
        answerMarkerRef.current.remove();
        answerMarkerRef.current = null;
      }
      if (lineRef.current) {
        lineRef.current.remove();
        lineRef.current = null;
      }
      if (guessMarkerRef.current) {
        guessMarkerRef.current.remove();
        guessMarkerRef.current = null;
      }
      mapRef.current.flyTo([20, 0], 3, { duration: 0.8 });
    }
  }, [showResult, mapReady]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full"
      style={{ cursor: showResult ? "default" : "crosshair" }}
    />
  );
}
