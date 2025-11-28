import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  name: string;
}

interface AdminState {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      adminUser: null,
      isAdminAuthenticated: false,

      adminLogin: (email: string, password: string) => {
        // Mock admin login - in real app, validate with backend
        // Admin credentials: admin@shophub.com / admin123
        if (email === 'admin@shophub.com' && password === 'admin123') {
          const admin: AdminUser = {
            id: 'admin-1',
            email: 'admin@shophub.com',
            role: 'super_admin',
            name: 'Admin User',
          };
          set({ adminUser: admin, isAdminAuthenticated: true });
          return true;
        }
        return false;
      },

      adminLogout: () => {
        set({ adminUser: null, isAdminAuthenticated: false });
      },
    }),
    {
      name: 'admin-storage',
    }
  )
);
