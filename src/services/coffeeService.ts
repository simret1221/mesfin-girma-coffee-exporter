/**
 * Coffee Service
 *
 * PostgreSQL / Express API is the single source of truth.
 * The old localStorage catalog is no longer used for public coffee data.
 */

import { CoffeeProduct, CoffeeAvailability } from '../types';
import { api } from './api';

interface ApiCoffee {
  id: number;
  name: string;
  originId: number | null;
  processingMethod: string | null;
  grade: string | null;
  cupScore: number | null;
  altitude: string | null;
  variety: string | null;
  description: string | null;
  imageUrl: string | null;
  available: boolean;
  origin?: {
    id: number;
    name: string;
    region: string | null;
  } | null;
}

interface CoffeesResponse {
  success: boolean;
  data: ApiCoffee[];
}

interface CoffeeResponse {
  success: boolean;
  data: ApiCoffee;
}

function mapAvailability(available: boolean): CoffeeAvailability {
  return available ? 'Available for Export' : 'Upon Request';
}

function mapApiCoffeeToProduct(coffee: ApiCoffee): CoffeeProduct {
  const originName = coffee.origin?.name ?? 'Ethiopia';
  const region = coffee.origin?.region ?? 'Ethiopia';

  let processingMethod: 'Washed' | 'Sun-Dried / Natural';

  if (coffee.processingMethod === 'Washed') {
    processingMethod = 'Washed';
  } else {
    processingMethod = 'Sun-Dried / Natural';
  }

  return {
    id: String(coffee.id),
    name: coffee.name,
    origin: originName,
    region,
    grade: coffee.grade === 'Grade 2' ? 'Grade 2' : 'Grade 1',

    cupScoreBaseline:
      coffee.cupScore !== null
        ? String(coffee.cupScore)
        : 'Above 85',

    processingMethod,

    altitude:
      coffee.altitude ??
      'Available upon request',

    altitudeType: 'verified_lot',

    variety:
      coffee.variety ??
      'Available upon request',

    varietyType: 'verified_lot',

    flavorProfile:
      'Lot-specific profile available upon request',

    flavorProfileType: 'verified_lot',

    availability: mapAvailability(coffee.available),

    harvest: 'Details upon request',

    description:
      coffee.description ??
      `Coffee from the ${originName} area.`,

    image:
      coffee.imageUrl ??
      '/images/hero/hero-ethiopia.jpg',

    isFeatured: coffee.id <= 3
  };
}

export async function getAllCoffees(): Promise<CoffeeProduct[]> {
  const response = await api.get<CoffeesResponse>('/coffees');

  if (!response.success || !Array.isArray(response.data)) {
    throw new Error('Failed to load coffee catalog.');
  }

  return response.data.map(mapApiCoffeeToProduct);
}

export async function getCoffeeById(
  id: string
): Promise<CoffeeProduct | null> {
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return null;
  }

  try {
    const response = await api.get<CoffeeResponse>(
      `/coffees/${numericId}`
    );

    if (!response.success || !response.data) {
      return null;
    }

    return mapApiCoffeeToProduct(response.data);
  } catch {
    return null;
  }
}

export async function getCoffeesByOrigin(
  originName: string
): Promise<CoffeeProduct[]> {
  const coffees = await getAllCoffees();

  if (!originName || originName === 'All') {
    return coffees;
  }

  return coffees.filter(
    (coffee) =>
      coffee.origin.toLowerCase() === originName.toLowerCase()
  );
}

export async function saveCoffee(
  coffee: CoffeeProduct
): Promise<CoffeeProduct> {
  console.warn(
    'saveCoffee is not implemented in the public catalog service.'
  );

  return coffee;
}

export async function updateCoffeeAvailability(
  id: string,
  availability: CoffeeAvailability
): Promise<void> {
  console.warn(
    `updateCoffeeAvailability(${id}, ${availability}) requires an authenticated admin API endpoint.`
  );
}

export async function deleteCoffee(id: string): Promise<void> {
  console.warn(
    `deleteCoffee(${id}) requires an authenticated admin API endpoint.`
  );
}

export function resetCatalogToDefaults(): CoffeeProduct[] {
  console.warn(
    'resetCatalogToDefaults is no longer used. PostgreSQL is the source of truth.'
  );

  return [];
}

export const coffeeService = {
  getCoffees: getAllCoffees,
  getAllCoffees,
  getCoffeeById,
  getCoffeesByOrigin,
  saveCoffee,
  updateAvailability: updateCoffeeAvailability,
  deleteCoffee,
  resetToDefaults: resetCatalogToDefaults
};