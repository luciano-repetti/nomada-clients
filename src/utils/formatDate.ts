export function formatDate(dateString: string): string {
  if (!dateString) {
      return "Fecha no válida";
  }

  try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
          return "Fecha no válida";
      }

      // Convertir a hora local
      const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));

      const day = String(localDate.getDate()).padStart(2, '0');
      const month = String(localDate.getMonth() + 1).padStart(2, '0');
      const year = String(localDate.getFullYear()).slice(-2);
      const hours = String(localDate.getHours()).padStart(2, '0');
      const minutes = String(localDate.getMinutes()).padStart(2, '0');

      return `${day}/${month}/${year} - ${hours}:${minutes}hs`;
  } catch (error) {
    console.error(error)
      return "Fecha no válida";
  }
}