
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, LayoutDashboard, Building2, Clock, Calendar, FileText, Settings, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: '仪表盘', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/employees', label: '员工管理', icon: <Users className="w-5 h-5" /> },
    { path: '/departments', label: '部门管理', icon: <Building2 className="w-5 h-5" /> },
    { path: '/attendance', label: '考勤管理', icon: <Clock className="w-5 h-5" /> },
    { path: '/leave', label: '休假管理', icon: <Calendar className="w-5 h-5" /> },
    { path: '/documents', label: '文档管理', icon: <FileText className="w-5 h-5" /> },
  ];
  
  const bottomMenuItems = [
    { path: '/settings', label: '系统设置', icon: <Settings className="w-5 h-5" /> },
    { path: '/help', label: '帮助中心', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="fixed top-0 left-0 flex flex-col w-56 h-full bg-background/70 backdrop-blur-md border-r animate-slide-in-left">
      <div className="flex items-center h-16 px-6 border-b">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-hr-600 flex items-center justify-center text-white font-bold">HR</div>
          <span className="text-lg font-medium">人事管理系统</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-link flex items-center space-x-3",
                isActive(item.path) && "nav-link-active"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-3 border-t">
        <nav className="space-y-1">
          {bottomMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-link flex items-center space-x-3",
                isActive(item.path) && "nav-link-active"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
