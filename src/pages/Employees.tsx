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
import { Plus, Filter, MoreHorizontal, Search, UserPlus, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useAuth } from '@/hooks/useAuth';

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
  const { user } = useAuth();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDepartmentDialogOpen, setIsDepartmentDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<typeof employeesData[0] | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: '', to: '' });
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');

  // 根据用户角色获取可见的员工数据
  const getVisibleEmployees = () => {
    if (!user) return [];

    switch (user.role) {
      case 'ADMIN':
      case 'HR':
        // 管理员和HR可以看到所有员工
        return employeesData;
      case 'MANAGER':
        // 经理只能看到自己部门的员工（这里假设经理属于"研发部"）
        return employeesData.filter(emp => emp.department === '研发部');
      case 'EMPLOYEE':
        // 普通员工只能看到公开的员工目录，无敏感信息
        return employeesData.map(emp => ({
          ...emp,
          phone: '***********', // 隐藏电话号码
          email: emp.email.split('@')[0].slice(0, 3) + '****@' + emp.email.split('@')[1], // 部分隐藏邮箱
          department: '***' // 需要隐藏部门信息
        }));
      default:
        return [];
    }
  };

  // 检查用户是否有编辑权限
  const hasEditPermission = () => {
    return user && (user.role === 'ADMIN' || user.role === 'HR');
  };

  // 检查用户是否有部门管理权限
  const hasDepartmentPermission = () => {
    return user && (user.role === 'ADMIN' || user.role === 'HR');
  };

  // 检查用户是否有离职处理权限
  const hasLeavePermission = () => {
    return user && user.role === 'ADMIN';
  };

  // 检查用户是否有导出权限
  const hasExportPermission = () => {
    return user && (user.role === 'ADMIN' || user.role === 'HR' || user.role === 'MANAGER');
  };

  // 获取角色对应的页面标题
  const getPageTitle = () => {
    if (!user) return "员工管理";

    switch (user.role) {
      case 'ADMIN':
        return "员工管理";
      case 'HR':
        return "员工管理";
      case 'MANAGER':
        return "团队成员";
      case 'EMPLOYEE':
        return "公司员工";
      default:
        return "员工管理";
    }
  };

  // Filter employees based on all conditions
  const visibleEmployees = getVisibleEmployees();
  const filteredEmployees = visibleEmployees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                         employee.position.toLowerCase().includes(searchValue.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchValue.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    
    const matchesDateRange = (!dateRange.from || employee.joinDate >= dateRange.from) &&
                           (!dateRange.to || employee.joinDate <= dateRange.to);
    
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesDateRange && matchesStatus;
  });

  // Get unique departments for filter
  const departments = ['all', ...new Set(employeesData.map((emp) => emp.department))];

  // 添加导出功能
  const exportEmployees = () => {
    const exportData = visibleEmployees.map(emp => ({
      序号: emp.id,
      姓名: emp.name,
      职位: emp.position,
      部门: emp.department,
      邮箱: emp.email,
      电话: emp.phone,
      入职日期: emp.joinDate,
      状态: emp.status
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "员工名单");
    XLSX.writeFile(wb, "员工名单.xlsx");
  };

  // 添加批量导入功能
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        // TODO: 处理导入的数据，调用API保存
        console.log('Imported data:', jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // 添加打印功能
  const printEmployees = () => {
    const printContent = document.createElement('div');
    printContent.innerHTML = `
      <h2 style="text-align: center">员工名单</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid black; padding: 8px">序号</th>
            <th style="border: 1px solid black; padding: 8px">姓名</th>
            <th style="border: 1px solid black; padding: 8px">职位</th>
            <th style="border: 1px solid black; padding: 8px">部门</th>
            <th style="border: 1px solid black; padding: 8px">邮箱</th>
            <th style="border: 1px solid black; padding: 8px">电话</th>
            <th style="border: 1px solid black; padding: 8px">入职日期</th>
            <th style="border: 1px solid black; padding: 8px">状态</th>
          </tr>
        </thead>
        <tbody>
          ${employeesData.map(emp => `
            <tr>
              <td style="border: 1px solid black; padding: 8px">${emp.id}</td>
              <td style="border: 1px solid black; padding: 8px">${emp.name}</td>
              <td style="border: 1px solid black; padding: 8px">${emp.position}</td>
              <td style="border: 1px solid black; padding: 8px">${emp.department}</td>
              <td style="border: 1px solid black; padding: 8px">${emp.email}</td>
              <td style="border: 1px solid black; padding: 8px">${emp.phone}</td>
              <td style="border: 1px solid black; padding: 8px">${emp.joinDate}</td>
              <td style="border: 1px solid black; padding: 8px">${emp.status}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(printContent.innerHTML);
    printWindow?.document.close();
    printWindow?.print();
  };

  // 处理员工详情
  const handleViewDetail = (employee: typeof employeesData[0]) => {
    setSelectedEmployee(employee);
    setIsDetailDialogOpen(true);
  };

  // 处理编辑信息
  const handleEdit = (employee: typeof employeesData[0]) => {
    if (!hasEditPermission()) return;
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  // 处理调整部门
  const handleDepartmentChange = (employee: typeof employeesData[0]) => {
    if (!hasDepartmentPermission()) return;
    setSelectedEmployee(employee);
    setIsDepartmentDialogOpen(true);
  };

  // 处理离职
  const handleLeave = (employee: typeof employeesData[0]) => {
    if (!hasLeavePermission()) return;
    setSelectedEmployee(employee);
    setIsLeaveDialogOpen(true);
  };

  // 获取根据用户角色定制的下拉菜单选项
  const getDropdownMenuItems = (employee: typeof employeesData[0]) => {
    const items = [];
    
    // 所有角色都可以查看详情
    items.push(
      <DropdownMenuItem key="detail" onClick={() => handleViewDetail(employee)}>
        查看详情
      </DropdownMenuItem>
    );
    
    // 只有Admin和HR可以编辑
    if (hasEditPermission()) {
      items.push(
        <DropdownMenuItem key="edit" onClick={() => handleEdit(employee)}>
          编辑信息
        </DropdownMenuItem>
      );
    }
    
    // 只有Admin和HR可以调整部门
    if (hasDepartmentPermission()) {
      items.push(
        <DropdownMenuItem key="department" onClick={() => handleDepartmentChange(employee)}>
          调整部门
        </DropdownMenuItem>
      );
    }
    
    // 只有Admin可以处理离职
    if (hasLeavePermission()) {
      items.push(
        <DropdownMenuItem 
          key="leave"
          className="text-destructive"
          onClick={() => handleLeave(employee)}
        >
          离职处理
        </DropdownMenuItem>
      );
    }
    
    return items;
  };

  return (
    <MainLayout>
      <GlassCard className="animate-fade-in mb-6">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-1">{getPageTitle()}</h2>
            <p className="text-muted-foreground">
              {user?.role === 'EMPLOYEE' 
                ? "查看公司员工通讯录" 
                : user?.role === 'MANAGER'
                  ? "管理您的团队成员"
                  : "管理公司所有员工信息和状态"}
            </p>
          </div>
          
          {/* 只有Admin和HR可以添加员工 */}
          {(user?.role === 'ADMIN' || user?.role === 'HR') && (
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
          )}
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
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsFilterDialogOpen(true)}
              >
                <Filter className="h-4 w-4" />
              </Button>
              
              {/* 根据用户角色显示导出选项 */}
              {hasExportPermission() && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={exportEmployees}>导出员工名单</DropdownMenuItem>
                    {/* 只有Admin和HR可以导入 */}
                    {(user?.role === 'ADMIN' || user?.role === 'HR') && (
                      <DropdownMenuItem>
                        <label style={{ cursor: 'pointer', display: 'block', width: '100%' }}>
                          批量导入
                          <input
                            type="file"
                            accept=".xlsx,.xls"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                          />
                        </label>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={printEmployees}>打印员工名单</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
        
        {filteredEmployees.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">序号</TableHead>
                  <TableHead>员工</TableHead>
                  <TableHead>职位</TableHead>
                  <TableHead>部门</TableHead>
                  {/* 普通员工不显示详细联系信息 */}
                  {user?.role !== 'EMPLOYEE' && (
                    <>
                      <TableHead>邮箱</TableHead>
                      <TableHead>电话</TableHead>
                    </>
                  )}
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
                    {/* 普通员工不显示详细联系信息 */}
                    {user?.role !== 'EMPLOYEE' && (
                      <>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.phone}</TableCell>
                      </>
                    )}
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
                          {getDropdownMenuItems(employee)}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">没有找到员工</h3>
            <p className="text-muted-foreground mb-4">尝试调整筛选条件或清除搜索关键字</p>
            <Button variant="outline" onClick={() => {
              setSearchValue('');
              setDepartmentFilter('all');
              setDateRange({ from: '', to: '' });
              setStatusFilter('all');
            }}>
              清除筛选条件
            </Button>
          </div>
        )}
        
        <div className="flex items-center justify-end p-4">
          <div className="text-sm text-muted-foreground">
            共 {filteredEmployees.length} 名员工
          </div>
        </div>
      </GlassCard>
      
      {/* 员工详情对话框 */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>员工详情</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="grid gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img 
                    src={selectedEmployee.avatar} 
                    alt={selectedEmployee.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedEmployee.name}</h3>
                  <p className="text-muted-foreground">{selectedEmployee.position}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">部门</p>
                  <p className="font-medium">{selectedEmployee.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">入职日期</p>
                  <p className="font-medium">{selectedEmployee.joinDate}</p>
                </div>
                {/* 只有管理人员能看到详细联系方式 */}
                {user?.role !== 'EMPLOYEE' && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">邮箱</p>
                      <p className="font-medium">{selectedEmployee.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">电话</p>
                      <p className="font-medium">{selectedEmployee.phone}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑信息对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑员工信息</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-name" className="text-sm font-medium">姓名</label>
                  <Input id="edit-name" defaultValue={selectedEmployee.name} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-position" className="text-sm font-medium">职位</label>
                  <Input id="edit-position" defaultValue={selectedEmployee.position} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-email" className="text-sm font-medium">邮箱</label>
                  <Input id="edit-email" type="email" defaultValue={selectedEmployee.email} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-phone" className="text-sm font-medium">电话</label>
                  <Input id="edit-phone" defaultValue={selectedEmployee.phone} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>取消</Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 调整部门对话框 */}
      <Dialog open={isDepartmentDialogOpen} onOpenChange={setIsDepartmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>调整部门</DialogTitle>
            <DialogDescription>
              为 {selectedEmployee?.name} 选择新的部门
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">新部门</label>
              <Select defaultValue={selectedEmployee?.department}>
                <SelectTrigger>
                  <SelectValue placeholder="选择部门" />
                </SelectTrigger>
                <SelectContent>
                  {departments.filter(d => d !== 'all').map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">调整原因</label>
              <Input placeholder="请输入调整原因" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDepartmentDialogOpen(false)}>取消</Button>
            <Button onClick={() => setIsDepartmentDialogOpen(false)}>确认调整</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 离职处理对话框 */}
      <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>离职处理</DialogTitle>
            <DialogDescription>
              确认 {selectedEmployee?.name} 的离职信息
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">离职日期</label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">离职类型</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择离职类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="主动离职">主动离职</SelectItem>
                  <SelectItem value="合同到期">合同到期</SelectItem>
                  <SelectItem value="协商解约">协商解约</SelectItem>
                  <SelectItem value="辞退">辞退</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">离职原因</label>
              <Input placeholder="请输入离职原因" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLeaveDialogOpen(false)}>取消</Button>
            <Button variant="destructive" onClick={() => setIsLeaveDialogOpen(false)}>确认离职</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 高级筛选对话框 */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>高级筛选</DialogTitle>
            <DialogDescription>
              设置多个条件来筛选员工列表
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">入职日期范围</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-muted-foreground">从</label>
                  <Input 
                    type="date" 
                    value={dateRange.from}
                    onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">至</label>
                  <Input 
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">部门</label>
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择部门" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有部门</SelectItem>
                  {departments.filter(d => d !== 'all').map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">在职状态</label>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="active">在职</SelectItem>
                  <SelectItem value="inactive">离职</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDateRange({ from: '', to: '' });
                setDepartmentFilter('all');
                setStatusFilter('all');
                setIsFilterDialogOpen(false);
              }}
            >
              重置
            </Button>
            <Button onClick={() => setIsFilterDialogOpen(false)}>
              应用筛选
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Employees;
