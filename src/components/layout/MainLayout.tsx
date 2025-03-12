import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import { UserMenu } from '../user/UserMenu';
import { Bell, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // 如果用户未登录，重定向到登录页面
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // 未登录时不渲染内容
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen overflow-hidden bg-background">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col ml-16 md:ml-56 transition-all duration-300">
        {/* 顶部导航栏 */}
        <header className="h-16 flex items-center justify-between px-6 border-b bg-white">
          <h1 className="text-xl font-medium">人事管理系统</h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Input 
                className="w-64 pl-10" 
                placeholder="搜索..." 
                type="search" 
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
            </div>
            
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
            </button>
            
            <UserMenu />
          </div>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
