import { useEffect, useRef } from "react";
import type { DnsResult, DnsServer } from "@shared/schema";

interface PropagationMapProps {
  results: (DnsResult & { server: DnsServer })[];
}

export function PropagationMap({ results }: PropagationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainer.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      if (mapRef.current) {
        mapRef.current.remove();
      }

      // Initialize map
      const map = L.map(mapContainer.current!).setView([30, 0], 2);
      mapRef.current = map;

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Add markers for each DNS server
      results.forEach(result => {
        const { server } = result;
        const lat = parseFloat(server.latitude);
        const lng = parseFloat(server.longitude);

        if (isNaN(lat) || isNaN(lng)) return;

        // Create custom marker based on status
        const isResolved = result.status === 'resolved';
        const markerColor = isResolved ? '#22c55e' : '#ef4444'; // green for resolved, red for failed
        const responseTime = result.responseTime || 0;

        const customIcon = L.divIcon({
          className: 'custom-dns-marker',
          html: `
            <div style="
              width: 16px;
              height: 16px;
              background-color: ${markerColor};
              border: 2px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              position: relative;
            ">
              ${responseTime < 50 ? '<div style="position: absolute; top: -2px; right: -2px; width: 6px; height: 6px; background-color: #10b981; border-radius: 50%; border: 1px solid white;"></div>' : ''}
            </div>
          `,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

        // Create popup content
        const popupContent = `
          <div class="dns-marker-popup">
            <div style="font-weight: bold; margin-bottom: 4px;">${server.location}</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 8px;">${server.name} (${server.ip})</div>
            <div style="margin-bottom: 4px;">
              <span style="display: inline-block; width: 8px; height: 8px; background-color: ${markerColor}; border-radius: 50%; margin-right: 4px;"></span>
              <strong>Status:</strong> ${isResolved ? 'Resolved' : 'Failed'}
            </div>
            ${isResolved ? `
              <div style="margin-bottom: 4px;">
                <strong>Response:</strong> <code style="font-size: 11px;">${result.response}</code>
              </div>
            ` : ''}
            <div>
              <strong>Response Time:</strong> ${responseTime}ms
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 250,
          className: 'dns-marker-popup-container'
        });
      });

      // Add legend
      const legend = L.control({ position: 'bottomright' });
      legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'dns-legend');
        div.innerHTML = `
          <div style="background: white; padding: 10px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); font-size: 12px;">
            <div style="margin-bottom: 4px; font-weight: bold;">DNS Status</div>
            <div style="margin-bottom: 2px;">
              <span style="display: inline-block; width: 8px; height: 8px; background-color: #22c55e; border-radius: 50%; margin-right: 6px;"></span>
              Resolved
            </div>
            <div>
              <span style="display: inline-block; width: 8px; height: 8px; background-color: #ef4444; border-radius: 50%; margin-right: 6px;"></span>
              Failed
            </div>
          </div>
        `;
        return div;
      };
      legend.addTo(map);
    }).catch((error) => {
      console.error('Failed to load Leaflet:', error);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [results]);

  return (
    <div className="relative">
      <div 
        ref={mapContainer} 
        className="h-96 w-full rounded-md border border-gray-200"
        style={{ minHeight: '384px' }}
      />
      {results.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md">
          <div className="text-center">
            <div className="text-gray-400 text-lg mb-2">🗺️</div>
            <p className="text-sm text-gray-500">DNS propagation map will appear here after lookup</p>
          </div>
        </div>
      )}
    </div>
  );
}
