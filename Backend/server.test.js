const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { validateItem, countItems, findItem, sortItemsByName } = require('./utils');

// ── validateItem ─────────────────────────────────────────────────────────────

describe('validateItem', () => {
  test('returns invalid when body is null', () => {
    const result = validateItem(null);
    assert.strictEqual(result.valid, false);
    assert.ok(result.error);
  });

  test('returns invalid when name is empty string', () => {
    const result = validateItem({ name: '   ' });
    assert.strictEqual(result.valid, false);
    assert.ok(result.error);
  });

  test('returns invalid when name is missing', () => {
    const result = validateItem({});
    assert.strictEqual(result.valid, false);
  });

  test('returns valid for correct name', () => {
    const result = validateItem({ name: 'Laptop' });
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.error, undefined);
  });

  test('returns invalid when name is a number', () => {
    const result = validateItem({ name: 42 });
    assert.strictEqual(result.valid, false);
  });
});

// ── countItems ────────────────────────────────────────────────────────────────

describe('countItems', () => {
  test('returns 0 for empty array', () => {
    assert.strictEqual(countItems([]), 0);
  });

  test('returns correct count', () => {
    const items = [
      { id: '1', name: 'Apple' },
      { id: '2', name: 'Banana' },
      { id: '3', name: 'Cherry' },
    ];
    assert.strictEqual(countItems(items), 3);
  });

  test('returns 0 for non-array input', () => {
    assert.strictEqual(countItems(null), 0);
    assert.strictEqual(countItems(undefined), 0);
  });
});

// ── findItem ──────────────────────────────────────────────────────────────────

describe('findItem', () => {
  const items = [
    { id: 'abc-1', name: 'Monitor' },
    { id: 'abc-2', name: 'Keyboard' },
  ];

  test('finds existing item by id', () => {
    const result = findItem(items, 'abc-1');
    assert.deepStrictEqual(result, { id: 'abc-1', name: 'Monitor' });
  });

  test('returns null for non-existing id', () => {
    const result = findItem(items, 'does-not-exist');
    assert.strictEqual(result, null);
  });

  test('returns null for empty array', () => {
    const result = findItem([], 'abc-1');
    assert.strictEqual(result, null);
  });
});

// ── sortItemsByName ───────────────────────────────────────────────────────────

describe('sortItemsByName', () => {
  test('sorts items alphabetically', () => {
    const items = [
      { id: '1', name: 'Zebra' },
      { id: '2', name: 'Apple' },
      { id: '3', name: 'Mango' },
    ];
    const sorted = sortItemsByName(items);
    assert.strictEqual(sorted[0].name, 'Apple');
    assert.strictEqual(sorted[1].name, 'Mango');
    assert.strictEqual(sorted[2].name, 'Zebra');
  });

  test('does not mutate original array', () => {
    const items = [{ id: '1', name: 'B' }, { id: '2', name: 'A' }];
    sortItemsByName(items);
    assert.strictEqual(items[0].name, 'B'); // unchanged
  });
});
