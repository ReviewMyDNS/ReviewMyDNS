import { useEffect, useRef } from "react";
import type { DnsResult, DnsServer } from "@shared/schema";

interface PropagationMapProps {
  results: (DnsResult & { server: DnsServer })[];
}

export function PropagationMap({ results }: PropagationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainer.current || results.length === 0) return;

    console.log('PropagationMap: Initializing map with', results.length, 'results');

    // Dynamically import Leaflet to avoid SSR issues
    import('leaflet').then(async (L) => {
      if (mapRef.current) {
        mapRef.current.remove();
      }

      // Fix for default markers
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      // Initialize map
      const map = L.map(mapContainer.current!).setView([30, 0], 2);
      mapRef.current = map;

      // Add tile layer - try multiple sources for reliability
      try {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
          crossOrigin: true
        }).addTo(map);
        console.log('PropagationMap: Tile layer added successfully');
      } catch (error) {
        console.error('PropagationMap: Error adding tile layer', error);
        // Try alternative tile source
        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors, © CartoDB',
          maxZoom: 18
        }).addTo(map);
      }

      // Add markers for each DNS server
      console.log('PropagationMap: Adding markers for', results.length, 'servers');
      results.forEach(result => {
        const { server } = result;
        const lat = parseFloat(server.latitude);
        const lng = parseFloat(server.longitude);

        console.log('PropagationMap: Processing server', server.name, 'at', lat, lng);

        if (isNaN(lat) || isNaN(lng)) {
          console.warn('PropagationMap: Invalid coordinates for', server.name);
          return;
        }

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
      const legend = (L as any).control({ position: 'bottomright' });
      legend.onAdd = function() {
        const div = (L as any).DomUtil.create('div', 'dns-legend');
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
      // Show fallback static map if Leaflet fails
      if (mapContainer.current) {
        mapContainer.current.innerHTML = `
          <div class="flex items-center justify-center h-full bg-gradient-to-b from-blue-100 to-green-100 rounded-md">
            <div class="text-center p-4">
              <div class="text-2xl mb-2">🌍</div>
              <h3 class="font-semibold text-gray-800 mb-2">Global DNS Servers</h3>
              <div class="space-y-1 text-sm">
                ${results.map(result => `
                  <div class="flex items-center justify-between px-3 py-1 ${result.status === 'resolved' ? 'bg-green-200' : 'bg-red-200'} rounded">
                    <span>${result.server.location}</span>
                    <span class="w-3 h-3 rounded-full ${result.status === 'resolved' ? 'bg-green-500' : 'bg-red-500'}"></span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }
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
        className="h-96 w-full rounded-md border border-gray-200 bg-gray-50"
        style={{ minHeight: '384px', height: '384px' }}
      >
        {results.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 text-lg mb-2">🗺️</div>
              <p className="text-sm text-gray-500">DNS propagation map will appear here after lookup</p>
            </div>
          </div>
        )}
        {results.length > 0 && !mapRef.current && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-blue-500 text-lg mb-2">🔄</div>
              <p className="text-sm text-gray-500">Loading interactive map...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
