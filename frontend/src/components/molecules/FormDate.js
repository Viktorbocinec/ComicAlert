export default function formatDate(date) {
    if (!date || isNaN(date)) return ''; // Return empty string if date is undefined or not a valid Date object
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
  
    return `${day}.${month}.${year}`;
  }