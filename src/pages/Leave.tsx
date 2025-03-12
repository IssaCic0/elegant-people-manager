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
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { PermissionGuard } from '@/components/auth/PermissionGuard';
import { rolePermissions } from '@/types/auth';

// 休假类型数据
const leaveTypes = [
  { id: 1, name: '年假', defaultDays: 12, color: 'blue' },
  { id: 2, name: '事假', defaultDays: 0, color: 'orange' },
  { id: 3, name: '病假', defaultDays: 0, color: 'red' },
  { id: 4, name: '婚假', defaultDays: 3, color: 'pink' },
  { id: 5, name: '产假', defaultDays: 98, color: 'purple' },
  { id: 6, name: '陪产假', defaultDays: 15, color: 'indigo' },
  { id: 7, name: '丧假', defaultDays: 3, color: 'gray' },
];

// 休假申请记录数据
const leaveRecords = [
  {
    id: 1,
    employeeName: '张明',
    department: '研发部',
    leaveType: '年假',
    startDate: '2024-03-15',
    endDate: '2024-03-16',
    days: 2,
    reason: '个人休假',
    status: '已批准',
    approver: '李娜',
    createTime: '2024-03-10 14:30:00'
  },
  {
    id: 2,
    employeeName: '王强',
    department: '市场部',
    leaveType: '病假',
    startDate: '2024-02-28',
    endDate: '2024-02-28',
    days: 1,
    reason: '感冒发烧',
    status: '已批准',
    approver: '李娜',
    createTime: '2024-02-27 09:15:00'
  },
  {
    id: 3,
    employeeName: '李娜',
    department: '产品部',
    leaveType: '事假',
    startDate: '2024-02-10',
    endDate: '2024-02-10',
    days: 1,
    reason: '个人事务',
    status: '已驳回',
    approver: '张明',
    createTime: '2024-02-08 16:45:00'
  }
];

const Leave = () => {
  const { user } = useAuth();
  const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false);
  const [isTypeManageOpen, setIsTypeManageOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // 根据用户角色筛选休假记录
  const filteredRecords = leaveRecords.filter((record) => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchValue.toLowerCase()) ||
                         record.department.toLowerCase().includes(searchValue.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesType = typeFilter === 'all' || record.leaveType === typeFilter;
    
    // 根据角色过滤数据
    const roleFilter = () => {
      if (!user) return false;
      switch (user.role) {
        case 'ADMIN':
        case 'HR':
          return true; // 可以看到所有记录
        case 'MANAGER':
          return record.department === user.department; // 只能看到本部门的记录
        case 'EMPLOYEE':
          return record.employeeName === user.username; // 只能看到自己的记录
        default:
          return false;
      }
    };

    return matchesSearch && matchesStatus && matchesType && roleFilter();
  });

  return (
    <MainLayout>
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* 员工只能看到自己的假期统计 */}
        <GlassCard>
          <div className="p-6">
            <h3 className="text-lg font-medium text-blue-600">剩余年假</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">12</span>
              <span className="ml-2 text-muted-foreground">天</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-6">
            <h3 className="text-lg font-medium text-green-600">已休年假</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">8</span>
              <span className="ml-2 text-muted-foreground">天</span>
            </div>
          </div>
        </GlassCard>

        {/* 只有管理员、HR和主管可以看到待审批数量 */}
        <PermissionGuard requiredPermission="canApproveLeave">
          <GlassCard>
            <div className="p-6">
              <h3 className="text-lg font-medium text-orange-600">待审批</h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-3xl font-bold">1</span>
                <span className="ml-2 text-muted-foreground">条</span>
              </div>
            </div>
          </GlassCard>
        </PermissionGuard>

        <GlassCard>
          <div className="p-6">
            <h3 className="text-lg font-medium text-purple-600">本月休假</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">3</span>
              <span className="ml-2 text-muted-foreground">天</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* 主要内容区 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 休假记录列表 */}
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="p-4 border-b">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                {/* HR和管理员可以搜索 */}
                <PermissionGuard 
                  requiredPermission="canViewAllEmployees"
                  fallback={<div className="flex-1" />}
                >
                  <div className="flex-1">
                    <Input
                      placeholder="搜索员工姓名或部门..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                </PermissionGuard>
                
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="状态筛选" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部状态</SelectItem>
                      <SelectItem value="待审批">待审批</SelectItem>
                      <SelectItem value="已批准">已批准</SelectItem>
                      <SelectItem value="已驳回">已驳回</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="类型筛选" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部类型</SelectItem>
                      {leaveTypes.map(type => (
                        <SelectItem key={type.id} value={type.name}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* 所有人都可以申请休假 */}
                  <PermissionGuard requiredPermission="canRequestLeave">
                    <Dialog open={isAddLeaveOpen} onOpenChange={setIsAddLeaveOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          申请休假
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>申请休假</DialogTitle>
                          <DialogDescription>
                            请填写休假申请信息，提交后将通知相关主管审批。
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">休假类型</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="选择休假类型" />
                              </SelectTrigger>
                              <SelectContent>
                                {leaveTypes.map(type => (
                                  <SelectItem key={type.id} value={type.id.toString()}>
                                    {type.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">开始日期</label>
                              <Input type="date" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">结束日期</label>
                              <Input type="date" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">休假原因</label>
                            <Textarea placeholder="请输入休假原因..." />
                          </div>
                        </div>

                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddLeaveOpen(false)}>
                            取消
                          </Button>
                          <Button onClick={() => setIsAddLeaveOpen(false)}>
                            提交申请
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </PermissionGuard>
                </div>
                  </div>
        </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>申请人</TableHead>
                    <TableHead>部门</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>日期</TableHead>
                    <TableHead>天数</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>审批人</TableHead>
                    {/* 只有有审批权限的人才能看到操作列 */}
                    <PermissionGuard requiredPermission="canApproveLeave">
                      <TableHead>操作</TableHead>
                    </PermissionGuard>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.employeeName}</TableCell>
                      <TableCell>{record.department}</TableCell>
                      <TableCell>{record.leaveType}</TableCell>
                      <TableCell>{record.startDate} 至 {record.endDate}</TableCell>
                      <TableCell>{record.days}天</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${record.status === '已批准' ? 'bg-green-100 text-green-800' :
                            record.status === '已驳回' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'}`}>
                          {record.status}
                        </span>
                      </TableCell>
                      <TableCell>{record.approver}</TableCell>
                      {/* 审批操作按钮 */}
                      <PermissionGuard requiredPermission="canApproveLeave">
                        <TableCell>
                          {record.status === '待审批' && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="text-green-600">
                                批准
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600">
                                驳回
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </PermissionGuard>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </GlassCard>
        </div>

        {/* 日历视图 */}
        <div className="lg:col-span-1">
          <GlassCard>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">休假日历</h3>
                {/* 只有 HR 和管理员可以管理假期类型 */}
                <PermissionGuard requiredPermission="canManageDepartments">
                  <Dialog open={isTypeManageOpen} onOpenChange={setIsTypeManageOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        假期类型
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>假期类型管理</DialogTitle>
                        <DialogDescription>
                          管理公司的假期类型和默认天数。
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        {leaveTypes.map((type) => (
                          <div key={type.id} className="flex items-center justify-between p-4 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full bg-${type.color}-500`} />
                              <span className="font-medium">{type.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                默认 {type.defaultDays} 天
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsTypeManageOpen(false)}>
                          关闭
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </PermissionGuard>
              </div>
              
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />

              <div className="mt-4 space-y-2">
                <h4 className="font-medium">今日休假</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/40">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-sm">张</span>
                      </div>
                      <div>
                        <p className="font-medium">张明</p>
                        <p className="text-sm text-muted-foreground">年假</p>
                      </div>
                    </div>
                    <span className="text-sm">1天</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </MainLayout>
  );
};

export default Leave;

