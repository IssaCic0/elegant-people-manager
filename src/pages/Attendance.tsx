
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Clock, Search, Filter, Calendar as CalendarIcon, Download, MoreHorizontal, FileText, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

// Mock attendance data
const attendanceData = [
  {
    id: '1',
    name: '张明',
    department: '研发部',
    date: '2023-08-01',
    clockIn: '08:56',
    clockOut: '18:03',
    status: 'normal',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '2',
    name: '李娜',
    department: '产品部',
    date: '2023-08-01',
    clockIn: '09:02',
    clockOut: '18:15',
    status: 'normal',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '3',
    name: '王强',
    department: '市场部',
    date: '2023-08-01',
    clockIn: '08:45',
    clockOut: '18:30',
    status: 'normal',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '4',
    name: '赵琳',
    department: '人事部',
    date: '2023-08-01',
    clockIn: '09:10',
    clockOut: '17:50',
    status: 'late',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '5',
    name: '刘伟',
    department: '财务部',
    date: '2023-08-01',
    clockIn: '08:50',
    clockOut: '18:05',
    status: 'normal',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '6',
    name: '陈萍',
    department: '销售部',
    date: '2023-08-01',
    clockIn: '09:30',
    clockOut: '18:10',
    status: 'late',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '7',
    name: '吴杰',
    department: '销售部',
    date: '2023-08-01',
    clockIn: '08:55',
    clockOut: '18:20',
    status: 'normal',
    avatar: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '8',
    name: '郑华',
    department: '研发部',
    date: '2023-08-01',
    clockIn: '',
    clockOut: '',
    status: 'absent',
    avatar: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
];

const statusMap = {
  normal: { label: '正常', color: 'bg-green-100 text-green-800' },
  late: { label: '迟到', color: 'bg-amber-100 text-amber-800' },
  early: { label: '早退', color: 'bg-blue-100 text-blue-800' },
  absent: { label: '缺勤', color: 'bg-red-100 text-red-800' },
};

const Attendance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchValue, setSearchValue] = useState('');
  
  // Statistics for today
  const stats = {
    total: 128,
    present: 120,
    late: 5,
    absent: 3,
  };
  
  // Filter attendance data based on search
  const filteredAttendance = attendanceData.filter((record) => {
    return record.name.toLowerCase().includes(searchValue.toLowerCase()) || 
           record.department.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <MainLayout>
      <GlassCard className="animate-fade-in mb-6">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-1">考勤管理</h2>
            <p className="text-muted-foreground">查看和管理员工考勤记录</p>
          </div>
          
          <div className="flex gap-2">
            <Button className="whitespace-nowrap">
              <FileText className="w-4 h-4 mr-2" />
              考勤报表
            </Button>
          </div>
        </div>
      </GlassCard>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="animate-scale-in" style={{ animationDelay: '0.05s' }}>
              <CardHeader className="pb-2">
                <CardDescription>今日出勤</CardDescription>
                <CardTitle className="text-2xl">{stats.present}/{stats.total}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  出勤率: {Math.round((stats.present / stats.total) * 100)}%
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-2">
                <CardDescription>准时打卡</CardDescription>
                <CardTitle className="text-2xl flex items-center text-green-600">
                  <CheckCircle2 className="mr-1 h-5 w-5" />
                  {stats.present - stats.late}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  准时率: {Math.round(((stats.present - stats.late) / stats.total) * 100)}%
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-scale-in" style={{ animationDelay: '0.15s' }}>
              <CardHeader className="pb-2">
                <CardDescription>迟到人数</CardDescription>
                <CardTitle className="text-2xl flex items-center text-amber-600">
                  <AlertCircle className="mr-1 h-5 w-5" />
                  {stats.late}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  迟到率: {Math.round((stats.late / stats.total) * 100)}%
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-2">
                <CardDescription>缺勤人数</CardDescription>
                <CardTitle className="text-2xl flex items-center text-red-600">
                  <XCircle className="mr-1 h-5 w-5" />
                  {stats.absent}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  缺勤率: {Math.round((stats.absent / stats.total) * 100)}%
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card className="p-4 animate-scale-in" style={{ animationDelay: '0.25s' }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">考勤日历</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {date?.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}
            </div>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>
      </div>
      
      <GlassCard className="animate-slide-in-bottom">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-medium">
                {date?.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })} 考勤记录
              </h3>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索员工姓名或部门..."
                  className="pl-8"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">序号</TableHead>
                <TableHead>员工</TableHead>
                <TableHead>部门</TableHead>
                <TableHead>上班打卡</TableHead>
                <TableHead>下班打卡</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendance.map((record, index) => (
                <TableRow key={record.id} className="transition-colors hover:bg-secondary/40">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img 
                          src={record.avatar} 
                          alt={record.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{record.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>
                    {record.clockIn ? record.clockIn : '-'}
                  </TableCell>
                  <TableCell>
                    {record.clockOut ? record.clockOut : '-'}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusMap[record.status as keyof typeof statusMap].color}`}>
                      {statusMap[record.status as keyof typeof statusMap].label}
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
                        <DropdownMenuItem>编辑记录</DropdownMenuItem>
                        <DropdownMenuItem>导出记录</DropdownMenuItem>
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
            共 {filteredAttendance.length} 条记录
          </div>
        </div>
      </GlassCard>
    </MainLayout>
  );
};

export default Attendance;
