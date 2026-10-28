import { CoffeeProduct, CoffeeAvailability } from '../types';
import { INITIAL_COFFEE_CATALOG } from '../constants/catalog';

const CATALOG_STORAGE_KEY = 'mgg_catalog_v2';


export function getAllCoffees(): CoffeeProduct[] {
  try {
    const raw = localStorage.getItem(CATALOG_STORAGE_KEY);

    if (!raw) {
      localStorage.setItem(
        CATALOG_STORAGE_KEY,
        JSON.stringify(INITIAL_COFFEE_CATALOG)
      );
      return INITIAL_COFFEE_CATALOG;
    }

    const parsed: CoffeeProduct[] = JSON.parse(raw);

    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(
        CATALOG_STORAGE_KEY,
        JSON.stringify(INITIAL_COFFEE_CATALOG)
      );
      return INITIAL_COFFEE_CATALOG;
    }

    // Migrate legacy cached entries to the correct company image assets
    let updated = false;

    const migrated = parsed.map((item: CoffeeProduct) => {
      const match = INITIAL_COFFEE_CATALOG.find(
        (init) => init.id === item.id
      );

      if (
        match &&
        (
          !item.image ||
          item.image.includes('unsplash.com') ||
          item.image.includes('actual-cofee-image') ||
          item.image.startsWith('/images/coffee/')
                  )
      ) {
        updated = true;
        return { ...item, image: match.image };
      }

      return item;
    });

    if (updated) {
      localStorage.setItem(
        CATALOG_STORAGE_KEY,
        JSON.stringify(migrated)
      );
    }

    return migrated;
  } catch (err) {
    console.error('Error reading coffee catalog from localStorage:', err);
    return INITIAL_COFFEE_CATALOG;
  }
}


export function getCoffeeById(id: string): CoffeeProduct | null {
  const all = getAllCoffees();
  return all.find((c) => c.id === id) || null;
}

export function saveCoffee(coffee: CoffeeProduct): CoffeeProduct {
  const all = getAllCoffees();
  const index = all.findIndex((c) => c.id === coffee.id);

  let updatedList: CoffeeProduct[];
  if (index !== -1) {
    updatedList = [...all];
    updatedList[index] = coffee;
  } else {
    updatedList = [coffee, ...all];
  }

  try {
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(updatedList));
  } catch (err) {
    console.error('Failed to save coffee catalog', err);
  }

  return coffee;
}

export function updateCoffeeAvailability(id: string, availability: CoffeeAvailability): void {
  const all = getAllCoffees();
  const target = all.find((c) => c.id === id);
  if (target) {
    target.availability = availability;
    try {
      localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(all));
    } catch (err) {
      console.error('Failed to update coffee availability', err);
    }
  }
}

export function deleteCoffee(id: string): void {
  const all = getAllCoffees();
  const filtered = all.filter((c) => c.id !== id);
  try {
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete coffee', err);
  }
}

export function resetCatalogToDefaults(): CoffeeProduct[] {
  try {
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(INITIAL_COFFEE_CATALOG));
  } catch (err) {
    console.error('Failed to reset catalog', err);
  }
  return INITIAL_COFFEE_CATALOG;
}
