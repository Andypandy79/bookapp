// Format date

export function formatDate(dateString) {
  const date = new Date(dateString);

  // Get year
  const year = date.getFullYear();

  // Get month
  const options = { month: 'short' };
  const month = date.toLocaleString('en-GB', options, { timeZone: 'UTC' });

  // Get full day name (e.g., "Friday")
  // const fullDay = date.toLocaleDateString('en-US', { weekday: 'short' });

  // Get day
  const day = date.getUTCDate();

  const time = date.toLocaleString('en-GB');

  // Final formatted string
  return `${month} ${day} ${year}`;
}

// Format price
export function formatPrice(amount) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Shorten ID
export function formatId(id) {
  return `...${id.substring(id.length - 6)}`;
}

export function splitString(commaSeparatedText = '') {
  if (!commaSeparatedText.trim()) return [];
  return commaSeparatedText.split(/,\s*/);
  [commaSeparatedText];
}
