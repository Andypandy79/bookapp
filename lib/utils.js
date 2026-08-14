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

export function isSafeRedirect(url) {
  if (!url || typeof url !== 'string') return false;

  const cleanedUrl = url.trim();

  if (/[\s\x00-\x1f]/.test(cleanedUrl)) return false;

  if (!cleanedUrl.startsWith('/')) return false;

  if (cleanedUrl.startsWith('//')) return false;
  if (cleanedUrl.startsWith('\\') || cleanedUrl.startsWith('/\\')) return false;

  try {
    const base = 'http://internal.local';
    const resolved = new URL(cleanedUrl, base);
    if (resolved.origin !== base) return false;
  } catch {
    return false;
  }

  return true;
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
