import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {

  if (!dateString) {
    return "Fecha no válida";
  }

  const date = new Date(dateString);


  if (isNaN(date.getTime())) {
    return "Fecha no válida";
  }


  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = String(date.getUTCFullYear()).slice(-2);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');


  return `${day}/${month}/${year} - ${hours}:${minutes}hs`;
}