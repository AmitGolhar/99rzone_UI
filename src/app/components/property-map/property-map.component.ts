import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { properties } from 'src/assets/pune-properties';

export interface Property {
  id: number;
  name: string;
  postedBy: string;
  propertyType: string;
  propertyAdsType: string;
  apartmentName: string;
  bhkType: string;
  city: string;
  locality: string;
  builtUpArea: string;
  expectedPrice: number;
  availableFrom: string;
  bathroom: number;
  balcony: number;
  availableAmenities: string[];
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-property-map',
  templateUrl: './property-map.component.html',
  styleUrls: ['./property-map.component.css'],
})
export class PropertyMapComponent implements AfterViewInit, OnDestroy {
  private map!: L.Map;
  private markersLayer!: L.LayerGroup;
  filterAds: 'All' | 'Rent' | 'Sell' = 'All';
  searchText = '';
  filtered: Property[] = [];

  properties = properties;

  isMobileView = false;
  showList = true;

  ngAfterViewInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
    setTimeout(() => {
      this.initMap();
      this.applyFilters();
    });
  }

  checkScreenSize(): void {
    this.isMobileView = window.innerWidth <= 768;
    if (!this.isMobileView) {
      this.showList = true; // always show list on desktop
    }
  }

  toggleList(): void {
    this.showList = !this.showList;
  }
  private initMap(): void {
    const container = L.DomUtil.get('property-map');
    if (container != null) {
      (container as any)._leaflet_id = null;
    }

    this.map = L.map('property-map', {
      center: [18.5204, 73.8567],
      zoom: 15,
      zoomControl: true,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.map);

    this.markersLayer = L.layerGroup().addTo(this.map);
  }

  private renderMarkers(): void {
    if (!this.markersLayer) return;
    this.markersLayer.clearLayers();

    for (const p of this.filtered) {
      if (!p.latitude || !p.longitude) continue;

      const iconHtml =
        p.propertyAdsType === 'Rent'
          ? `<div class="custom-marker rent">🏠</div>`
          : `<div class="custom-marker sell">💰</div>`;

      const icon = L.divIcon({
        html: iconHtml,
        className: 'marker-wrapper', // Leaflet outer wrapper
        iconSize: [25, 25],
        iconAnchor: [25, 50],
      });

      const marker = L.marker([p.latitude, p.longitude], { icon });
      marker.bindPopup(this.buildPopupHtml(p));
      this.markersLayer.addLayer(marker);
    }

    if (this.filtered.length > 0) {
      const bounds = L.latLngBounds(
        this.filtered.map((p) => [p.latitude, p.longitude] as [number, number])
      );
      this.map.fitBounds(bounds.pad(0.2));
      this.map.invalidateSize();
    }
  }

  private buildPopupHtml(p: Property): string {
    return `
      <div class="popup-card">
        <h6 class="mb-1">${this.escapeHtml(p.apartmentName)}</h6>
        <div class="text-muted small">${this.escapeHtml(
          p.locality
        )}, ${this.escapeHtml(p.city)}</div>
        <div class="fw-bold mt-1">₹${p.expectedPrice.toLocaleString()}</div>
        <div class="text-muted small">${p.bhkType}</div>
        <button class="btn btn-sm btn-primary mt-2" onclick="window.open('/property/${
          p.id
        }', '_blank')">View</button>
      </div>`;
  }

  private escapeHtml(text?: string): string {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  applyFilters(): void {
    const term = this.searchText.toLowerCase();
    this.filtered = this.properties.filter((p) => {
      const matchesType =
        this.filterAds === 'All' ||
        p.propertyAdsType.toLowerCase() === this.filterAds.toLowerCase();
      const matchesSearch =
        !term ||
        p.city.toLowerCase().includes(term) ||
        p.locality.toLowerCase().includes(term) ||
        p.apartmentName.toLowerCase().includes(term);
      return matchesType && matchesSearch;
    });
    this.renderMarkers();
  }

  onFilterChange(mode: 'All' | 'Rent' | 'Sell') {
    this.filterAds = mode;
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  zoomToProperty(p: Property) {
    if (!this.map || !p.latitude || !p.longitude) return;

    console.log('Zooming to property:', p.latitude, p.longitude);

    // Center map but add an offset to avoid sidebar overlap
    const targetLatLng = L.latLng(p.latitude, p.longitude);
    const zoomLevel = 20;

    // Convert LatLng to container point (pixels)
    const point = this.map.latLngToContainerPoint(targetLatLng);
    const mapSize = this.map.getSize();

    // 🧭 Offset horizontally by ~25% of map width to center marker in visible area
    const offsetX = -mapSize.x * 0.25;
    const offsetY = 0;

    // Convert back to LatLng after applying offset
    const adjustedPoint = L.point(point.x + offsetX, point.y + offsetY);
    const adjustedLatLng = this.map.containerPointToLatLng(adjustedPoint);

    this.map.setView(adjustedLatLng, zoomLevel, { animate: true });

    // Find and open popup of clicked property
    let foundMarker: any = null;
    this.markersLayer.eachLayer((layer: any) => {
      if (layer.getLatLng) {
        const latlng = layer.getLatLng();
        if (
          Math.abs(latlng.lat - p.latitude) < 0.0001 &&
          Math.abs(latlng.lng - p.longitude) < 0.0001
        ) {
          foundMarker = layer;
        }
      }
    });

    if (foundMarker) {
      foundMarker.openPopup();

      // 🔹 Add bounce animation
      const iconEl = (foundMarker as any)._icon;
      if (iconEl) {
        iconEl.classList.add('bounce-marker');
        setTimeout(() => iconEl.classList.remove('bounce-marker'), 1200);
      }
    } else {
      // fallback marker if not found
      const temp = L.marker(targetLatLng).addTo(this.map);
      temp.bindPopup(`${p.apartmentName}<br>${p.locality}`).openPopup();
      setTimeout(() => this.map.removeLayer(temp), 3000);
    }
  }

  ngOnDestroy(): void {
    if (this.map) this.map.remove();
  }
}
