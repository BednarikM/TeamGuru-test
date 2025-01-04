export function formatPathName(path) {
  const trimmedPath = path.startsWith("/") ? path.slice(1) : path;
  const formattedPath = trimmedPath.replace(/-/g, " ");
  return formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1);
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}
