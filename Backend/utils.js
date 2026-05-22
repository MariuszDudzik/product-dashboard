/**
 * Validates item request body.
 * Returns { valid: true } or { valid: false, error: string }
 */
function validateItem(body) {
  if (!body || typeof body.name !== 'string' || body.name.trim() === '') {
    return { valid: false, error: 'Name is required and must be a non-empty string' };
  }
  return { valid: true };
}

/**
 * Returns number of items in array.
 */
function countItems(items) {
  return Array.isArray(items) ? items.length : 0;
}

/**
 * Finds item by id. Returns item or null.
 */
function findItem(items, id) {
  return items.find(item => item.id === id) || null;
}

/**
 * Returns items sorted alphabetically by name.
 */
function sortItemsByName(items) {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

module.exports = { validateItem, countItems, findItem, sortItemsByName };
