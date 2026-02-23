export function getInitials(fullName?: string): string {
  if (!fullName) return "";

  const names = fullName
    .trim()
    .split(/\s+/) // handle multiple spaces
    .filter(Boolean); // remove empty strings

  if (names.length === 0) return "";

  // Always use first and last name for initials
  const [first, ...rest] = names;
  const last = rest.at(-1);

  if (!first) return "";

  // Return single initial if only one name is given
  if (!last) return first.charAt(0).toUpperCase();

  // Combine first and last initials
  return `${first[0]}${last[0]}`.toUpperCase();
}
