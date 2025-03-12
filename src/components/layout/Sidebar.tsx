import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  ClipboardList, 
  Calendar, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  UserCog,
  Clock,
  FileArchive,
  HomeIcon,
  ClipboardCheck,
  User,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { rolePermissions } from '@/types/auth';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, href, isActive, isCollapsed }) => {
  return (
    <Link 
      to={href}
      className={cn(
        "flex items-center py-3 px-4 text-sm font-medium rounded-lg transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        isCollapsed && "justify-center px-0"
      )}
    >
      <div className={cn(
        "mr-3",
        isCollapsed && "mr-0"
      )}>
        <Icon size={20} className="shrink-0" />
      </div>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // 定义所有可能的菜单项
  const allMenuItems = {
    dashboard: {
      name: '控制台',
      href: '/',
      icon: LayoutDashboard
    },
    employees: {
      name: '员工管理',
      href: '/employees',
      icon: Users
    },
    departments: {
      name: '部门管理',
      href: '/departments',
      icon: Building2
    },
    attendance: {
      name: '考勤管理',
      href: '/attendance',
      icon: ClipboardList
    },
    leave: {
      name: '假期管理',
      href: '/leave',
      icon: Calendar
    },
    documents: {
      name: '文档管理',
      href: '/documents',
      icon: FileText
    },
    settings: {
      name: '系统设置',
      href: '/settings',
      icon: Settings
    },
    myAttendance: {
      name: '我的考勤',
      href: '/my-attendance',
      icon: Clock
    },
    myDocuments: {
      name: '我的文档',
      href: '/my-documents',
      icon: FileArchive
    },
    profile: {
      name: '个人信息',
      href: '/profile',
      icon: UserCog
    },
    help: {
      name: '帮助中心',
      href: '/help',
      icon: HelpCircle
    }
  };

  // 根据用户角色获取菜单项
  const getMenuItems = (role?: string) => {
    switch (role) {
      case 'ADMIN':
        return [
          allMenuItems.dashboard,
          allMenuItems.employees,
          allMenuItems.departments,
          allMenuItems.attendance,
          allMenuItems.leave,
          allMenuItems.documents,
          allMenuItems.settings,
        ];
      case 'HR':
        return [
          allMenuItems.dashboard,
          allMenuItems.employees,
          allMenuItems.departments,
          allMenuItems.attendance,
          allMenuItems.leave,
          allMenuItems.documents,
        ];
      case 'MANAGER':
        return [
          allMenuItems.dashboard,
          allMenuItems.employees,
          allMenuItems.attendance,
          allMenuItems.leave,
        ];
      case 'EMPLOYEE':
        return [
          allMenuItems.dashboard,
          allMenuItems.myAttendance,
          allMenuItems.myDocuments,
          allMenuItems.leave,
        ];
      default:
        return [
          allMenuItems.dashboard,
          allMenuItems.profile,
          allMenuItems.help,
        ];
    }
  };

  // 获取基于用户角色的菜单项
  const sidebarItems = getMenuItems(user?.role);

  return (
    <div 
      className={cn(
        "h-screen fixed top-0 left-0 bg-card border-r transition-all duration-300 z-50 flex flex-col",
        isCollapsed ? "w-16" : "w-56"
      )}
    >
      <div className={cn(
        "flex items-center h-16 px-4 border-b",
        isCollapsed && "justify-center"
      )}>
        {!isCollapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground rounded-md w-8 h-8 flex items-center justify-center font-bold">
              HR
            </div>
            <span className="font-medium">人事管理系统</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="bg-primary text-primary-foreground rounded-md w-8 h-8 flex items-center justify-center font-bold">
            HR
          </div>
        )}
      </div>

      <div className="mt-2 px-3">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full flex justify-between items-center"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!isCollapsed && <span>收起</span>}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.name}
              href={item.href}
              isActive={location.pathname === item.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </div>

      {!isCollapsed && user && (
        <div className="border-t p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user.username}</p>
              <p className="text-xs text-muted-foreground mt-1">{user.role}</p>
            </div>
          </div>
        </div>
      )}
      
      {isCollapsed && user && (
        <div className="border-t p-2 flex justify-center">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            {user.username.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
