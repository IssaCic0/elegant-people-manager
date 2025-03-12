/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types/auth';

// 模拟用户数据
const mockUsers = [
  { username: 'admin', password: '123456', role: 'ADMIN', employeeId: null, id: 1 },
  { username: 'zhangming', password: '123456', role: 'HR', employeeId: 1, id: 2 },
  { username: 'wangqiang', password: '123456', role: 'MANAGER', employeeId: 3, id: 3 },
  { username: 'zhaoting', password: '123456', role: 'MANAGER', employeeId: 6, id: 4 },
  { username: 'zhouli', password: '123456', role: 'MANAGER', employeeId: 8, id: 5 },
  { username: 'lifang', password: '123456', role: 'EMPLOYEE', employeeId: 2, id: 6 },
  { username: 'chenxue', password: '123456', role: 'EMPLOYEE', employeeId: 4, id: 7 },
  { username: 'liuyang', password: '123456', role: 'EMPLOYEE', employeeId: 5, id: 8 },
  { username: 'sunwei', password: '123456', role: 'EMPLOYEE', employeeId: 7, id: 9 },
  { username: 'wulei', password: '123456', role: 'EMPLOYEE', employeeId: 9, id: 10 },
];

// 部门映射
const departmentMap = {
  1: '研发部',
  2: '市场部',
  3: '财务部',
  4: '人事部',
  5: '行政部'
};

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // 从 localStorage 恢复登录状态
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setAuthState({
          user: parsedUser,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // 使用模拟数据进行前端验证，不调用后端API
      const user = mockUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        throw new Error('用户名或密码错误');
      }

      // 添加部门信息
      const userWithDepartment = {
        ...user,
        department: user.employeeId ? departmentMap[user.employeeId % 5 + 1] : null,
        status: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // 保存到 localStorage
      localStorage.setItem('user', JSON.stringify(userWithDepartment));
      
      // 更新状态
      setAuthState({
        user: userWithDepartment as User,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 