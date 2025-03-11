
import React from 'react';
import { MoreHorizontal, Mail, Phone } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

// Define types for our employee data
type Employee = {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
};

interface EmployeeListProps {
  employees: Employee[];
  title: string;
  viewAllLink: string;
  limit?: number;
  className?: string;
}

const EmployeeList = ({
  employees,
  title,
  viewAllLink,
  limit = 5,
  className,
}: EmployeeListProps) => {
  // Limit the number of employees to display
  const displayEmployees = employees.slice(0, limit);

  return (
    <GlassCard className={className}>
      <div className="p-5 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">{title}</h3>
          <Link to={viewAllLink}>
            <Button variant="ghost" className="text-sm">查看全部</Button>
          </Link>
        </div>
      </div>
      <div className="divide-y">
        {displayEmployees.map((employee) => (
          <div 
            key={employee.id}
            className="p-4 flex items-center justify-between transition-colors hover:bg-secondary/40"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={employee.avatar} 
                  alt={employee.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{employee.name}</div>
                <div className="text-sm text-muted-foreground flex space-x-4">
                  <span>{employee.position}</span>
                  <span>|</span>
                  <span>{employee.department}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Phone className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem>
                    <Link to={`/employees/${employee.id}`} className="w-full">查看详情</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>编辑</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default EmployeeList;
