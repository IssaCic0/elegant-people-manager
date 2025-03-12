export type UserRole = 'ADMIN' | 'HR' | 'MANAGER' | 'EMPLOYEE';

export interface User {
  id: number;
  username: string;
  employeeId: number | null;
  role: UserRole;
  department?: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// 定义不同角色的权限
export const rolePermissions = {
  ADMIN: {
    canManageUsers: true,
    canManageRoles: true,
    canManageDepartments: true,
    canViewAllEmployees: true,
    canEditAllEmployees: true,
    canApproveLeave: true,
    canManageSystem: true,
    canRequestLeave: true
  },
  HR: {
    canManageUsers: false,
    canManageRoles: false,
    canManageDepartments: true,
    canViewAllEmployees: true,
    canEditAllEmployees: true,
    canApproveLeave: true,
    canManageSystem: false,
    canRequestLeave: true
  },
  MANAGER: {
    canManageUsers: false,
    canManageRoles: false,
    canManageDepartments: false,
    canViewAllEmployees: false,
    canEditAllEmployees: false,
    canApproveLeave: true,
    canManageSystem: false,
    canViewDepartmentEmployees: true,
    canRequestLeave: true
  },
  EMPLOYEE: {
    canManageUsers: false,
    canManageRoles: false,
    canManageDepartments: false,
    canViewAllEmployees: false,
    canEditAllEmployees: false,
    canApproveLeave: false,
    canManageSystem: false,
    canViewSelfInfo: true,
    canRequestLeave: true
  }
}; 