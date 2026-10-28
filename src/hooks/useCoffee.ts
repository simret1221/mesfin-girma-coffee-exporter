import { useCallback, useEffect, useState } from 'react';
import { CoffeeProduct } from '../types';
import {
  getAllCoffees,
  getCoffeeById,
  getCoffeesByOrigin
} from '../services/coffeeService';

export function useCoffee() {
  const [coffees, setCoffees] = useState<CoffeeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCoffees = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllCoffees();
      setCoffees(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to fetch coffees'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshCoffees();
  }, [refreshCoffees]);

  const getById = useCallback(async (id: string) => {
    return getCoffeeById(id);
  }, []);

  const getByOrigin = useCallback(async (origin: string) => {
    return getCoffeesByOrigin(origin);
  }, []);

  return {
    coffees,
    loading,
    error,
    refreshCoffees,
    getById,
    getByOrigin
  };
}