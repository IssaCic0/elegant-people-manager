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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Search, Filter, Calendar as CalendarIcon, Download, CheckCircle2, XCircle, AlertCircle, FileText } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { format, parseISO, isToday, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { cn } from '@/lib/utils';

// 定义考勤记录类型
interface AttendanceRecord {
  id: string;
  date: string;
  clockIn: string;
  clockOut: string;
  status: 'normal' | 'late' | 'early' | 'absent' | 'leave';
  workHours: number;
  remarks?: string;
}

// 定义请假申请类型
interface LeaveRequest {
  id: string;
  type: '事假' | '病假' | '年假' | '调休' | '婚假' | '产假' | '陪产假';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approver?: string;
  submittedAt: string;
}

// 生成模拟数据
const generateMockAttendanceData = (): AttendanceRecord[] => {
  const today = new Date();
  const startDate = subMonths(today, 2);
  
  const records: AttendanceRecord[] = [];
  const daysInRange = eachDayOfInterval({
    start: startDate,
    end: today
  });
  
  daysInRange.forEach((date, index) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    if (isWeekend) {
      // 周末不记录考勤
      return;
    }
    
    const random = Math.random();
    let status: AttendanceRecord['status'] = 'normal';
    let clockIn = '09:00:00';
    let clockOut = '18:00:00';
    let workHours = 9;
    let remarks = undefined;
    
    if (random < 0.05) {
      status = 'leave';
      clockIn = '--:--:--';
      clockOut = '--:--:--';
      workHours = 0;
      remarks = '已请假';
    } else if (random < 0.1) {
      status = 'absent';
      clockIn = '--:--:--';
      clockOut = '--:--:--';
      workHours = 0;
    } else if (random < 0.2) {
      status = 'late';
      clockIn = `09:${Math.floor(Math.random() * 30) + 10}:00`;
      workHours = 8.5;
    } else if (random < 0.3) {
      status = 'early';
      clockOut = `17:${Math.floor(Math.random() * 30) + 10}:00`;
      workHours = 8.5;
    }
    
    records.push({
      id: `att-${index}`,
      date: formattedDate,
      clockIn,
      clockOut,
      status,
      workHours,
      remarks
    });
  });
  
  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// 生成模拟请假数据
const generateMockLeaveRequests = (): LeaveRequest[] => {
  return [
    {
      id: 'leave-1',
      type: '年假',
      startDate: '2024-03-20',
      endDate: '2024-03-21',
      days: 2,
      reason: '家庭旅行',
      status: 'approved',
      approver: '李经理',
      submittedAt: '2024-03-15T10:30:00',
    },
    {
      id: 'leave-2',
      type: '病假',
      startDate: '2024-02-10',
      endDate: '2024-02-11',
      days: 2,
      reason: '感冒发烧，需要休息',
      status: 'approved',
      approver: '李经理',
      submittedAt: '2024-02-09T14:20:00',
    },
    {
      id: 'leave-3',
      type: '事假',
      startDate: '2024-04-03',
      endDate: '2024-04-03',
      days: 1,
      reason: '办理个人证件',
      status: 'pending',
      submittedAt: '2024-03-29T09:15:00',
    },
  ];
};

const mockAttendanceData = generateMockAttendanceData();
const mockLeaveRequests = generateMockLeaveRequests();

const MyAttendance = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // 状态管理
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMonth, setFilterMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  
  // 当天考勤状态
  const todayRecord = mockAttendanceData.find(record => 
    record.date === format(new Date(), 'yyyy-MM-dd')
  );
  
  const needsClockIn = !todayRecord || todayRecord.clockIn === '--:--:--';
  const needsClockOut = todayRecord && todayRecord.clockIn !== '--:--:--' && todayRecord.clockOut === '--:--:--';
  
  // 统计数据
  const thisMonthRecords = mockAttendanceData.filter(record => 
    record.date.startsWith(format(new Date(), 'yyyy-MM'))
  );
  
  const normalDays = thisMonthRecords.filter(record => record.status === 'normal').length;
  const lateDays = thisMonthRecords.filter(record => record.status === 'late').length;
  const earlyDays = thisMonthRecords.filter(record => record.status === 'early').length;
  const absentDays = thisMonthRecords.filter(record => record.status === 'absent').length;
  const leaveDays = thisMonthRecords.filter(record => record.status === 'leave').length;
  
  // 过滤考勤记录
  const filteredAttendanceRecords = mockAttendanceData.filter(record => {
    const matchesSearch = searchQuery 
      ? record.date.includes(searchQuery) || record.status.includes(searchQuery)
      : true;
    
    const matchesMonth = record.date.startsWith(filterMonth);
    
    const matchesStatus = filterStatus === 'all' 
      ? true 
      : record.status === filterStatus;
    
    return matchesSearch && matchesMonth && matchesStatus;
  });
  
  // 处理打卡
  const handleClockIn = () => {
    toast({
      title: "打卡成功",
      description: `签到时间: ${format(new Date(), 'HH:mm:ss')}`,
    });
  };
  
  const handleClockOut = () => {
    toast({
      title: "打卡成功",
      description: `签退时间: ${format(new Date(), 'HH:mm:ss')}`,
    });
  };
  
  // 查看考勤详情
  const handleViewDetails = (record: AttendanceRecord) => {
    setSelectedRecord(record);
    setIsDetailsDialogOpen(true);
  };
  
  // 申请请假
  const handleApplyLeave = () => {
    setIsLeaveDialogOpen(true);
  };
  
  // 提交请假申请
  const handleSubmitLeave = () => {
    toast({
      title: "请假申请已提交",
      description: "您的请假申请已成功提交，请等待审批",
    });
    setIsLeaveDialogOpen(false);
  };
  
  // 导出考勤记录
  const handleExportAttendance = () => {
    toast({
      title: "考勤记录导出中",
      description: "您的考勤记录正在导出为Excel文件",
    });
  };

  // 根据状态获取标签样式
  const getStatusBadgeStyles = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-amber-100 text-amber-800';
      case 'early':
        return 'bg-blue-100 text-blue-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'leave':
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // 获取状态显示文本
  const getStatusText = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'normal':
        return '正常';
      case 'late':
        return '迟到';
      case 'early':
        return '早退';
      case 'absent':
        return '缺勤';
      case 'leave':
        return '请假';
    }
  };
  
  // 获取请假申请状态样式
  const getLeaveStatusStyle = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
    }
  };
  
  // 获取请假申请状态文本
  const getLeaveStatusText = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'pending':
        return '审批中';
      case 'approved':
        return '已批准';
      case 'rejected':
        return '已拒绝';
    }
  };
  
  // 日历日期单元格处理
  const handleCalendarRender = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const record = mockAttendanceData.find(r => r.date === formattedDate);
    
    // 没有记录时不显示特殊标记
    if (!record) return null;
    
    let className = '';
    switch (record.status) {
      case 'normal':
        className = 'bg-green-300';
        break;
      case 'late':
      case 'early':
        className = 'bg-amber-300';
        break;
      case 'absent':
        className = 'bg-red-300';
        break;
      case 'leave':
        className = 'bg-gray-300';
        break;
    }
    
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className={cn("h-2 w-2 rounded-full", className)}></div>
      </div>
    );
  };
  
  return (
    <MainLayout>
      <GlassCard className="animate-fade-in mb-6">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-1">我的考勤</h2>
            <p className="text-muted-foreground">查看您的考勤记录、打卡状态和请假申请</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportAttendance}>
              <Download className="w-4 h-4 mr-2" />
              导出记录
            </Button>
            <Button onClick={handleApplyLeave}>
              申请请假
            </Button>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* 今日打卡 */}
        <GlassCard className="animate-slide-in-bottom lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">今日打卡</CardTitle>
            <CardDescription>
              {format(new Date(), 'yyyy年MM月dd日')} {['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date().getDay()]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-4">
              <div className="text-4xl font-bold mb-2">
                {format(new Date(), 'HH:mm:ss')}
              </div>
              <div className="grid grid-cols-2 gap-4 w-full mt-4">
                <Button 
                  variant={needsClockIn ? "default" : "outline"} 
                  onClick={handleClockIn}
                  disabled={!needsClockIn}
                  className="w-full"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {needsClockIn ? '签到' : '已签到'}
                </Button>
                <Button 
                  variant={needsClockOut ? "default" : "outline"} 
                  onClick={handleClockOut}
                  disabled={!needsClockOut}
                  className="w-full"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {needsClockOut ? '签退' : '已签退'}
                </Button>
              </div>
              
              {todayRecord && (
                <div className="mt-6 w-full">
                  <div className="text-sm text-muted-foreground mb-2">今日状态</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-2 rounded-md bg-secondary">
                      <div className="text-xs mb-1">签到时间</div>
                      <div className="font-medium">
                        {todayRecord.clockIn === '--:--:--' ? '未签到' : todayRecord.clockIn}
                      </div>
                    </div>
                    <div className="p-2 rounded-md bg-secondary">
                      <div className="text-xs mb-1">签退时间</div>
                      <div className="font-medium">
                        {todayRecord.clockOut === '--:--:--' ? '未签退' : todayRecord.clockOut}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </GlassCard>

        {/* 本月统计 */}
        <GlassCard className="animate-slide-in-bottom lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">本月统计</CardTitle>
            <CardDescription>
              {format(new Date(), 'yyyy年MM月')}考勤概况
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col items-center p-2 bg-secondary/40 rounded-md">
                <span className="text-2xl font-bold text-green-600">{normalDays}</span>
                <span className="text-sm text-muted-foreground">正常</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-secondary/40 rounded-md">
                <span className="text-2xl font-bold text-amber-600">{lateDays}</span>
                <span className="text-sm text-muted-foreground">迟到</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-secondary/40 rounded-md">
                <span className="text-2xl font-bold text-blue-600">{earlyDays}</span>
                <span className="text-sm text-muted-foreground">早退</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-secondary/40 rounded-md">
                <span className="text-2xl font-bold text-red-600">{absentDays}</span>
                <span className="text-sm text-muted-foreground">缺勤</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-secondary/40 rounded-md col-span-2">
                <span className="text-2xl font-bold text-gray-600">{leaveDays}</span>
                <span className="text-sm text-muted-foreground">请假</span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="text-sm font-medium mb-2">最近请假记录</div>
              {mockLeaveRequests.length > 0 ? (
                <div className="space-y-2">
                  {mockLeaveRequests.slice(0, 2).map(leave => (
                    <div key={leave.id} className="flex justify-between items-center p-2 bg-secondary/40 rounded-md">
                      <div>
                        <div className="font-medium">{leave.type}</div>
                        <div className="text-xs text-muted-foreground">
                          {leave.startDate} ~ {leave.endDate}
                        </div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${getLeaveStatusStyle(leave.status)}`}>
                        {getLeaveStatusText(leave.status)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">暂无请假记录</div>
              )}
            </div>
          </CardContent>
        </GlassCard>

        {/* 考勤日历 */}
        <GlassCard className="animate-slide-in-bottom lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">考勤日历</CardTitle>
            <CardDescription>您本月的考勤状态一览</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              components={{
                DayContent: (props) => (
                  <div className="relative h-9 w-9 p-0 flex items-center justify-center">
                    <div>{props.date.getDate()}</div>
                    <div className="absolute bottom-1">
                      {handleCalendarRender(props.date)}
                    </div>
                  </div>
                )
              }}
            />
            <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-300 mr-1"></div>
                <span>正常</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-300 mr-1"></div>
                <span>异常</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-300 mr-1"></div>
                <span>缺勤</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
                <span>请假</span>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>

      <GlassCard className="animate-slide-in-bottom">
        <Tabs defaultValue="attendance">
          <div className="flex justify-between items-center p-4 border-b">
            <TabsList>
              <TabsTrigger value="attendance">考勤记录</TabsTrigger>
              <TabsTrigger value="leave">请假记录</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <div className="relative max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索记录..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={filterMonth} onValueChange={setFilterMonth}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="选择月份" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-03">2024年3月</SelectItem>
                  <SelectItem value="2024-02">2024年2月</SelectItem>
                  <SelectItem value="2024-01">2024年1月</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="normal">正常</SelectItem>
                  <SelectItem value="late">迟到</SelectItem>
                  <SelectItem value="early">早退</SelectItem>
                  <SelectItem value="absent">缺勤</SelectItem>
                  <SelectItem value="leave">请假</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="attendance" className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日期</TableHead>
                    <TableHead>签到时间</TableHead>
                    <TableHead>签退时间</TableHead>
                    <TableHead>工时</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>备注</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendanceRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-secondary/40">
                      <TableCell className="font-medium">{record.date}</TableCell>
                      <TableCell>{record.clockIn}</TableCell>
                      <TableCell>{record.clockOut}</TableCell>
                      <TableCell>{record.workHours}h</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyles(
                            record.status
                          )}`}
                        >
                          {getStatusText(record.status)}
                        </span>
                      </TableCell>
                      <TableCell>{record.remarks || '-'}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewDetails(record)}
                        >
                          查看
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="leave" className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>类型</TableHead>
                    <TableHead>开始日期</TableHead>
                    <TableHead>结束日期</TableHead>
                    <TableHead>天数</TableHead>
                    <TableHead>原因</TableHead>
                    <TableHead>提交时间</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>审批人</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLeaveRequests.map((leave) => (
                    <TableRow key={leave.id} className="hover:bg-secondary/40">
                      <TableCell className="font-medium">{leave.type}</TableCell>
                      <TableCell>{leave.startDate}</TableCell>
                      <TableCell>{leave.endDate}</TableCell>
                      <TableCell>{leave.days}天</TableCell>
                      <TableCell className="max-w-xs truncate">{leave.reason}</TableCell>
                      <TableCell>{format(parseISO(leave.submittedAt), 'yyyy-MM-dd HH:mm')}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLeaveStatusStyle(
                            leave.status
                          )}`}
                        >
                          {getLeaveStatusText(leave.status)}
                        </span>
                      </TableCell>
                      <TableCell>{leave.approver || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </GlassCard>

      {/* 考勤详情对话框 */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>考勤详情</DialogTitle>
            <DialogDescription>
              {selectedRecord?.date} 考勤记录
            </DialogDescription>
          </DialogHeader>
          
          {selectedRecord && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">签到时间</div>
                  <div className="font-medium">{selectedRecord.clockIn}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">签退时间</div>
                  <div className="font-medium">{selectedRecord.clockOut}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">工时</div>
                  <div className="font-medium">{selectedRecord.workHours}小时</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">状态</div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyles(
                        selectedRecord.status
                      )}`}
                    >
                      {getStatusText(selectedRecord.status)}
                    </span>
                  </div>
                </div>
              </div>
              
              {selectedRecord.remarks && (
                <div>
                  <div className="text-sm text-muted-foreground">备注</div>
                  <div className="font-medium">{selectedRecord.remarks}</div>
                </div>
              )}
              
              {selectedRecord.status === 'late' && (
                <div className="p-3 rounded-md bg-amber-50 text-amber-700 text-sm">
                  <AlertCircle className="h-4 w-4 inline-block mr-2" />
                  您在该日迟到，请注意按时签到。
                </div>
              )}
              
              {selectedRecord.status === 'early' && (
                <div className="p-3 rounded-md bg-blue-50 text-blue-700 text-sm">
                  <AlertCircle className="h-4 w-4 inline-block mr-2" />
                  您在该日早退，请确保工作时间满足要求。
                </div>
              )}
              
              {selectedRecord.status === 'absent' && (
                <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm">
                  <XCircle className="h-4 w-4 inline-block mr-2" />
                  您在该日缺勤，如有特殊情况请向主管申请请假。
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>关闭</Button>
            {selectedRecord && selectedRecord.status === 'absent' && (
              <Button onClick={handleApplyLeave}>申请补假</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 请假申请对话框 */}
      <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>申请请假</DialogTitle>
            <DialogDescription>
              填写请假申请信息，提交后将通知您的主管审批
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="leave-type" className="text-sm font-medium">请假类型</label>
              <Select>
                <SelectTrigger id="leave-type">
                  <SelectValue placeholder="选择请假类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="事假">事假</SelectItem>
                  <SelectItem value="病假">病假</SelectItem>
                  <SelectItem value="年假">年假</SelectItem>
                  <SelectItem value="调休">调休</SelectItem>
                  <SelectItem value="婚假">婚假</SelectItem>
                  <SelectItem value="产假">产假</SelectItem>
                  <SelectItem value="陪产假">陪产假</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="start-date" className="text-sm font-medium">开始日期</label>
                <Input type="date" id="start-date" />
              </div>
              <div className="space-y-2">
                <label htmlFor="end-date" className="text-sm font-medium">结束日期</label>
                <Input type="date" id="end-date" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="reason" className="text-sm font-medium">请假原因</label>
              <Input id="reason" placeholder="请输入请假原因" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="attachment" className="text-sm font-medium">附件（可选）</label>
              <Input id="attachment" type="file" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLeaveDialogOpen(false)}>取消</Button>
            <Button onClick={handleSubmitLeave}>提交申请</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default MyAttendance; 