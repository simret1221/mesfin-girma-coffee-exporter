import { UserProfile, UserRole } from '../types';

const USERS_STORAGE_KEY = 'mgg_auth_users_v2';
const SESSION_STORAGE_KEY = 'mgg_current_session_v2';
const SAVED_COFFEES_KEY = 'mgg_saved_coffees_v2';

interface StoredUserRecord extends UserProfile {
  passwordHash: string;
}

// Default demonstration accounts for frictionless testing
const SEED_USERS: StoredUserRecord[] = [
  {
    id: 'user-buyer-001',
    email: 'buyer@sample.com',
    passwordHash: 'password123',
    role: 'BUYER',
    buyerName: 'Lukas Weber',
    companyName: 'Hanseatic Coffee Importers GmbH',
    phoneWhatsApp: '+49 40 12345678',
    country: 'Germany',
    destinationPort: 'Hamburg',
    savedCoffeeIds: ['mgg-yirgacheffe-washed-g1', 'mgg-guji-natural-g1'],
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: 'user-staff-001',
    email: 'staff@mesfincoffee.com',
    passwordHash: 'staff123',
    role: 'STAFF',
    buyerName: 'Abebe Tadesse',
    companyName: 'Mesfin Girma Gemeda Coffee Supplies & Exporter',
    phoneWhatsApp: '0967576305',
    country: 'Ethiopia',
    savedCoffeeIds: [],
    createdAt: new Date(Date.now() - 3600000 * 120).toISOString()
  },
  {
    id: 'user-admin-001',
    email: 'admin@mesfincoffee.com',
    passwordHash: 'admin123',
    role: 'ADMIN',
    buyerName: 'Mesfin Girma Gemeda',
    companyName: 'Mesfin Girma Gemeda Coffee Management',
    phoneWhatsApp: '0967576305',
    country: 'Ethiopia',
    savedCoffeeIds: [],
    createdAt: new Date(Date.now() - 3600000 * 200).toISOString()
  }
];

function getStoredUsers(): StoredUserRecord[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    return parsed;
  } catch {
    return SEED_USERS;
  }
}

function saveStoredUsers(users: StoredUserRecord[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users', err);
  }
}

export function getCurrentUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUserSession(user: UserProfile | null): void {
  try {
    if (user) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed to update session', err);
  }
}

export interface RegisterInput {
  companyName: string;
  buyerName: string;
  email: string;
  phoneWhatsApp: string;
  country: string;
  password: string;
  confirmPassword: string;
}

export async function loginUser(email: string, password: string): Promise<UserProfile> {
  // Artificial micro-delay for realistic feedback
  await new Promise((resolve) => setTimeout(resolve, 300));

  const trimmedEmail = email.trim().toLowerCase();
  const users = getStoredUsers();
  const matched = users.find(
    (u) => u.email.toLowerCase() === trimmedEmail && u.passwordHash === password
  );

  if (!matched) {
    throw new Error('Invalid email or password. Please verify credentials or use demo login.');
  }

  const { passwordHash: _, ...profile } = matched;
  setCurrentUserSession(profile);
  return profile;
}

export async function registerUser(input: RegisterInput): Promise<UserProfile> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Validations
  if (!input.companyName.trim()) throw new Error('Company name is required.');
  if (!input.buyerName.trim()) throw new Error('Your name / contact name is required.');
  if (!input.email.trim()) throw new Error('Email address is required.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    throw new Error('Please provide a valid business email address.');
  }
  if (!input.phoneWhatsApp.trim()) throw new Error('WhatsApp or phone number is required.');
  if (!input.country.trim()) throw new Error('Country is required.');
  if (!input.password) throw new Error('Password is required.');
  if (input.password.length < 6) throw new Error('Password must be at least 6 characters long.');
  if (input.password !== input.confirmPassword) {
    throw new Error('Password confirmation does not match.');
  }

  const users = getStoredUsers();
  const existing = users.find((u) => u.email.toLowerCase() === input.email.trim().toLowerCase());
  if (existing) {
    throw new Error('An account with this email address already exists. Please log in.');
  }

  const newUser: StoredUserRecord = {
    id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    email: input.email.trim().toLowerCase(),
    passwordHash: input.password,
    role: 'BUYER',
    buyerName: input.buyerName.trim(),
    companyName: input.companyName.trim(),
    phoneWhatsApp: input.phoneWhatsApp.trim(),
    country: input.country.trim(),
    savedCoffeeIds: [],
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveStoredUsers(users);

  const { passwordHash: _, ...profile } = newUser;
  setCurrentUserSession(profile);
  return profile;
}

export function logoutUser(): void {
  setCurrentUserSession(null);
}

export function updateUserProfile(updates: Partial<UserProfile>): UserProfile {
  const current = getCurrentUser();
  if (!current) throw new Error('No user is currently logged in.');

  const updatedProfile: UserProfile = {
    ...current,
    ...updates,
    id: current.id,
    role: current.role // Role cannot be self-escalated
  };

  // Update in user list
  const users = getStoredUsers();
  const index = users.findIndex((u) => u.id === current.id);
  if (index !== -1) {
    users[index] = {
      ...users[index],
      ...updatedProfile
    };
    saveStoredUsers(users);
  }

  setCurrentUserSession(updatedProfile);
  return updatedProfile;
}

// Saved Coffees Management
export function getSavedCoffeeIds(): string[] {
  const user = getCurrentUser();
  if (user && user.savedCoffeeIds) {
    return user.savedCoffeeIds;
  }
  try {
    const raw = localStorage.getItem(SAVED_COFFEES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleSaveCoffee(coffeeId: string): string[] {
  const currentSaved = getSavedCoffeeIds();
  const isAlreadySaved = currentSaved.includes(coffeeId);
  const updated = isAlreadySaved
    ? currentSaved.filter((id) => id !== coffeeId)
    : [...currentSaved, coffeeId];

  // Update local storage
  try {
    localStorage.setItem(SAVED_COFFEES_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }

  // Update user profile if logged in
  const user = getCurrentUser();
  if (user) {
    updateUserProfile({ savedCoffeeIds: updated });
  }

  return updated;
}

// Admin User Management
export function getAllUsers(): UserProfile[] {
  const users = getStoredUsers();
  return users.map(({ passwordHash: _, ...p }) => p);
}

export function changeUserRole(userId: string, newRole: UserRole): void {
  const users = getStoredUsers();
  const target = users.find((u) => u.id === userId);
  if (target) {
    target.role = newRole;
    saveStoredUsers(users);

    // If changing currently active user
    const current = getCurrentUser();
    if (current && current.id === userId) {
      setCurrentUserSession({ ...current, role: newRole });
    }
  }
}
