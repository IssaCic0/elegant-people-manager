import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { rolePermissions } from '@/types/auth';

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredPermission: keyof typeof rolePermissions.ADMIN;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  requiredPermission,
  fallback = null
}) => {
  const { user } = useAuth();

  if (!user) {
    return fallback;
  }

  const userPermissions = rolePermissions[user.role];
  const hasPermission = userPermissions[requiredPermission];

  return hasPermission ? <>{children}</> : <>{fallback}</>;
}; 