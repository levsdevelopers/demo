import { describe, it, expect } from 'vitest';
import { generateCSV } from '../utils/csv';

describe('CSV util', () => {
  it('generates CSV with header and rows', () => {
    const rows = [{ id: 'ORD1', date: '2025-08-01', total: 100 }, { id: 'ORD2', date: '2025-08-02', total: 200 }];
    const csv = generateCSV(rows);
    expect(csv).toContain('date');
    expect(csv).toContain('revenue');
    expect(csv).toContain('ORD1');
  });
});
