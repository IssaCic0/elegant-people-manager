
import React from 'react';
import { Users, Building2, Clock, ArrowUpRight, Briefcase, Calendar, Percent } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import StatCard from '@/components/dashboard/StatCard';
import EmployeeList from '@/components/dashboard/EmployeeList';
import GlassCard from '@/components/ui/GlassCard';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const attendanceData = [
  { date: '周一', count: 95 },
  { date: '周二', count: 97 },
  { date: '周三', count: 94 },
  { date: '周四', count: 96 },
  { date: '周五', count: 93 },
  { date: '周六', count: 40 },
  { date: '周日', count: 25 },
];

const departmentProgress = [
  { name: '研发部', progress: 78 },
  { name: '市场部', progress: 65 },
  { name: '人事部', progress: 92 },
  { name: '财务部', progress: 84 },
];

// Mock employee data
const employees = [
  {
    id: '1',
    name: '张明',
    position: '高级工程师',
    department: '研发部',
    email: 'zhang.ming@example.com',
    phone: '138-1234-5678',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '2',
    name: '李娜',
    position: '产品经理',
    department: '产品部',
    email: 'li.na@example.com',
    phone: '139-8765-4321',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '3',
    name: '王强',
    position: '市场总监',
    department: '市场部',
    email: 'wang.qiang@example.com',
    phone: '137-2468-1357',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '4',
    name: '赵琳',
    position: '人力资源主管',
    department: '人事部',
    email: 'zhao.lin@example.com',
    phone: '135-1357-2468',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '5',
    name: '刘伟',
    position: '财务主管',
    department: '财务部',
    email: 'liu.wei@example.com',
    phone: '136-8642-1975',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
];

const Index = () => {
  return (
    <MainLayout>
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard 
          title="员工总数" 
          value={128} 
          icon={Users}
          trend={2.5}
          iconClassName="bg-blue-100 text-blue-600"
        />
        <StatCard 
          title="部门数量" 
          value={8} 
          icon={Building2}
          iconClassName="bg-purple-100 text-purple-600"
        />
        <StatCard 
          title="今日考勤" 
          value={112} 
          icon={Clock}
          trend={-1.2}
          valueFormatter={(value) => `${value}人`}
          iconClassName="bg-amber-100 text-amber-600"
        />
        <StatCard 
          title="本月入职" 
          value={4} 
          icon={ArrowUpRight}
          trend={12.5}
          trendLabel="相比上月"
          iconClassName="bg-emerald-100 text-emerald-600"
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Attendance Chart */}
          <GlassCard className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">本周考勤数据</h3>
              <div className="text-sm text-muted-foreground">总体出勤率: 94%</div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={attendanceData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '8px',
                      border: '1px solid rgba(230, 230, 230, 0.8)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [`${value}人`, '出勤人数']}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#0ea5e9" 
                    fillOpacity={1} 
                    fill="url(#colorAttendance)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
          
          {/* Recent Employees */}
          <EmployeeList 
            title="最近入职员工" 
            employees={employees} 
            viewAllLink="/employees"
          />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Department Progress */}
          <GlassCard className="p-5">
            <h3 className="font-medium text-lg mb-4">部门目标完成度</h3>
            <div className="space-y-5">
              {departmentProgress.map((dept) => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{dept.name}</span>
                    <span className="text-sm text-muted-foreground">{dept.progress}%</span>
                  </div>
                  <Progress value={dept.progress} className="h-2" />
                </div>
              ))}
            </div>
          </GlassCard>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <GlassCard className="p-4 hover-scale">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-2">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold">6</div>
                <div className="text-xs text-muted-foreground">进行中的项目</div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-4 hover-scale">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-2">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-muted-foreground">请假申请</div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-4 hover-scale">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                  <Percent className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold">94%</div>
                <div className="text-xs text-muted-foreground">员工满意度</div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-4 hover-scale">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-2">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-xs text-muted-foreground">加班时长</div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
