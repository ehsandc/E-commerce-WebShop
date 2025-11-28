import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  joinedDate: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  trackingNumber?: string;
}

interface UserState {
  user: User | null;
  orders: Order[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addOrder: (order: Order) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      orders: [],
      isAuthenticated: false,

      login: (email: string, password: string) => {
        // Mock login - in real app, validate with backend
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email: email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
          phone: '+1 (555) 123-4567',
          address: {
            street: '123 Main Street, Apt 4B',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
          },
          joinedDate: new Date().toISOString(),
        };

        const mockOrders: Order[] = [
          {
            id: 'ORD-001',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'delivered',
            total: 249.99,
            items: 2,
            trackingNumber: 'TRK123456789',
          },
          {
            id: 'ORD-002',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'shipped',
            total: 599.97,
            items: 3,
            trackingNumber: 'TRK987654321',
          },
          {
            id: 'ORD-003',
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'processing',
            total: 129.99,
            items: 1,
          },
        ];

        set({ user: mockUser, orders: mockOrders, isAuthenticated: true });
      },

      signup: (name: string, email: string, password: string) => {
        // Mock signup
        const newUser: User = {
          id: Date.now().toString(),
          name,
          email,
          joinedDate: new Date().toISOString(),
        };
        set({ user: newUser, orders: [], isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, orders: [], isAuthenticated: false });
      },

      updateProfile: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },

      addOrder: (order: Order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },
    }),
    {
      name: 'user-storage',
    }
  )
);
