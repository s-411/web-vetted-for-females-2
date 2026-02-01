// Generate a unique ID
export function generateId() {
  return 'p' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// Get initials from name
export function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// Avatar color - matches sidebar/plum color
const AVATAR_COLOR = '#2a173b';

export function getAvatarColor(id) {
  return AVATAR_COLOR;
}

// Format relative time
export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

// Format date for display
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Escape HTML to prevent XSS
export function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Get profile ID from URL query params
export function getProfileIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Show toast notification
export function showToast(message, type = 'info') {
  const colors = {
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    warning: 'bg-warning text-white',
    info: 'bg-primary text-white',
  };

  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg ${colors[type]} z-50 animate-fade-in`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Debounce function
export function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}
