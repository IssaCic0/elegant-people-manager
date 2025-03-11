
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { Building2, Users, UserPlus, BarChart3, MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock department data
const departments = [
  {
    id: '1',
    name: '研发部',
    manager: '张明',
    headcount: 24,
    budget: '1,260,000',
    progress: 78,
    icon: 'https://api.iconify.design/fluent:code-24-filled.svg?color=%230ea5e9',
  },
  {
    id: '2',
    name: '产品部',
    manager: '赵琳',
    headcount: 8,
    budget: '420,000',
    progress: 65,
    icon: 'https://api.iconify.design/fluent:design-ideas-24-filled.svg?color=%23a855f7',
  },
  {
    id: '3',
    name: '市场部',
    manager: '王强',
    headcount: 12,
    budget: '860,000',
    progress: 92,
    icon: 'https://api.iconify.design/fluent:chart-multiple-24-filled.svg?color=%23f59e0b',
  },
  {
    id: '4',
    name: '财务部',
    manager: '刘伟',
    headcount: 6,
    budget: '350,000',
    progress: 84,
    icon: 'https://api.iconify.design/fluent:money-24-filled.svg?color=%2310b981',
  },
  {
    id: '5',
    name: '人事部',
    manager: '李娜',
    headcount: 5,
    budget: '280,000',
    progress: 88,
    icon: 'https://api.iconify.design/fluent:people-team-24-filled.svg?color=%23ec4899',
  },
  {
    id: '6',
    name: '销售部',
    manager: '吴杰',
    headcount: 16,
    budget: '950,000',
    progress: 72,
    icon: 'https://api.iconify.design/fluent:shopping-bag-24-filled.svg?color=%23f43f5e',
  },
];

const Departments = () => {
  return (
    <MainLayout>
      <GlassCard className="animate-fade-in mb-6">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-1">部门管理</h2>
            <p className="text-muted-foreground">管理公司所有部门和团队</p>
          </div>
          
          <Button className="whitespace-nowrap">
            <Building2 className="w-4 h-4 mr-2" />
            添加部门
          </Button>
        </div>
      </GlassCard>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department, index) => (
          <Card key={department.id} className="overflow-hidden animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center">
                    <img src={department.icon} alt="" className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle>{department.name}</CardTitle>
                    <CardDescription>经理: {department.manager}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>查看详情</DropdownMenuItem>
                    <DropdownMenuItem>编辑部门</DropdownMenuItem>
                    <DropdownMenuItem>更换负责人</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      解散部门
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between py-2">
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 mx-auto mb-1 rounded-full bg-blue-50 text-blue-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-lg font-semibold">{department.headcount}</div>
                  <div className="text-xs text-muted-foreground">员工数</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 mx-auto mb-1 rounded-full bg-amber-50 text-amber-600">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div className="text-lg font-semibold">{department.progress}%</div>
                  <div className="text-xs text-muted-foreground">绩效</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 mx-auto mb-1 rounded-full bg-emerald-50 text-emerald-600">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div className="text-lg font-semibold">2</div>
                  <div className="text-xs text-muted-foreground">招聘中</div>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">预算使用</span>
                  <span className="text-sm text-muted-foreground">{department.progress}%</span>
                </div>
                <Progress value={department.progress} className="h-2" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="text-sm text-muted-foreground">
                预算: ¥{department.budget}
              </div>
              <Button variant="ghost" className="h-8 text-xs">查看详情</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Departments;
