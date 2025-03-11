
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Filter, MoreHorizontal, Search, UserPlus } from 'lucide-react';

// Mock employee data
const employeesData = [
  {
    id: '1',
    name: '张明',
    position: '高级工程师',
    department: '研发部',
    email: 'zhang.ming@example.com',
    phone: '138-1234-5678',
    joinDate: '2022-05-15',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '2',
    name: '李娜',
    position: '产品经理',
    department: '产品部',
    email: 'li.na@example.com',
    phone: '139-8765-4321',
    joinDate: '2021-10-08',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '3',
    name: '王强',
    position: '市场总监',
    department: '市场部',
    email: 'wang.qiang@example.com',
    phone: '137-2468-1357',
    joinDate: '2023-01-20',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '4',
    name: '赵琳',
    position: '人力资源主管',
    department: '人事部',
    email: 'zhao.lin@example.com',
    phone: '135-1357-2468',
    joinDate: '2021-06-12',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '5',
    name: '刘伟',
    position: '财务主管',
    department: '财务部',
    email: 'liu.wei@example.com',
    phone: '136-8642-1975',
    joinDate: '2022-08-30',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '6',
    name: '陈萍',
    position: '客户经理',
    department: '销售部',
    email: 'chen.ping@example.com',
    phone: '133-9753-1864',
    joinDate: '2023-04-05',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '7',
    name: '吴杰',
    position: '销售主管',
    department: '销售部',
    email: 'wu.jie@example.com',
    phone: '132-4567-8901',
    joinDate: '2022-02-18',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '8',
    name: '郑华',
    position: '后端工程师',
    department: '研发部',
    email: 'zheng.hua@example.com',
    phone: '138-7890-1234',
    joinDate: '2023-03-10',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
];

const Employees = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Filter employees based on search and department
  const filteredEmployees = employeesData.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                          employee.position.toLowerCase().includes(searchValue.toLowerCase()) ||
                          employee.email.toLowerCase().includes(searchValue.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  // Get unique departments for filter
  const departments = ['all', ...new Set(employeesData.map((emp) => emp.department))];

  return (
    <MainLayout>
      <GlassCard className="animate-fade-in mb-6">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-1">员工管理</h2>
            <p className="text-muted-foreground">管理公司所有员工信息和状态</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="whitespace-nowrap">
                <UserPlus className="w-4 h-4 mr-2" />
                添加员工
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加新员工</DialogTitle>
                <DialogDescription>
                  填写新员工的基本信息，创建完成后可在员工详情页补充更多资料。
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">姓名</label>
                    <Input id="name" placeholder="请输入姓名" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="position" className="text-sm font-medium">职位</label>
                    <Input id="position" placeholder="请输入职位" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="department" className="text-sm font-medium">部门</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择部门" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="研发部">研发部</SelectItem>
                        <SelectItem value="产品部">产品部</SelectItem>
                        <SelectItem value="市场部">市场部</SelectItem>
                        <SelectItem value="销售部">销售部</SelectItem>
                        <SelectItem value="人事部">人事部</SelectItem>
                        <SelectItem value="财务部">财务部</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="joinDate" className="text-sm font-medium">入职日期</label>
                    <Input id="joinDate" type="date" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">邮箱</label>
                    <Input id="email" type="email" placeholder="请输入邮箱" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">电话</label>
                    <Input id="phone" placeholder="请输入电话" />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>取消</Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>保存</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </GlassCard>
      
      <GlassCard className="animate-slide-in-bottom">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索员工姓名、职位或邮箱..."
                className="pl-8"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="部门筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有部门</SelectItem>
                  {departments.filter(d => d !== 'all').map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>导出员工名单</DropdownMenuItem>
                  <DropdownMenuItem>批量导入</DropdownMenuItem>
                  <DropdownMenuItem>打印员工名单</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">序号</TableHead>
                <TableHead>员工</TableHead>
                <TableHead>职位</TableHead>
                <TableHead>部门</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead>电话</TableHead>
                <TableHead>入职日期</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee, index) => (
                <TableRow key={employee.id} className="transition-colors hover:bg-secondary/40">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img 
                          src={employee.avatar} 
                          alt={employee.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{employee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.joinDate}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      在职
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>查看详情</DropdownMenuItem>
                        <DropdownMenuItem>编辑信息</DropdownMenuItem>
                        <DropdownMenuItem>调整部门</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          离职处理
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-end p-4">
          <div className="text-sm text-muted-foreground">
            共 {filteredEmployees.length} 名员工
          </div>
        </div>
      </GlassCard>
    </MainLayout>
  );
};

export default Employees;
