export function generateReference(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "JKR-";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function whatsappLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

import { WHATSAPP_NUMBER } from "./constants";

export function getWhatsAppLink(message: string): string {
  return whatsappLink(WHATSAPP_NUMBER, message);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatSurface(surface: number): string {
  return `${surface} m²`;
}

export interface PropertyData {
  id: string;
  title: string;
  description: string;
  price: number;
  surface: number;
  rooms: number;
  city: string;
  district: string | null;
  address: string | null;
  type: string;
  dpe: string | null;
  status: string;
  images: string[];
  mapLink: string | null;
  latitude: number | null;
  longitude: number | null;
  reference: string;
  offreDuMoment: boolean;
  premium: boolean;
  createdAt: Date;
  updatedAt: Date;
}
