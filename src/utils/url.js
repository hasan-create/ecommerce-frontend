const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export function buildImageUrl(image) {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;

  const normalizedImagePath = String(image).replace(/^\/+/, "");
  return `${API_BASE_URL}/${normalizedImagePath}`;
}
