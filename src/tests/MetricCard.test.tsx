import { render, screen } from '@testing-library/react';
import MetricCard from '../components/MetricCard';

test('MetricCard shows title and value', () => {
  render(<MetricCard title="Revenue" value={123} subtitle="KZT" />);
  expect(screen.getByText(/Revenue/i)).toBeInTheDocument();
  expect(screen.getByText(/123/)).toBeInTheDocument();
  expect(screen.getByText(/KZT/)).toBeInTheDocument();
});
