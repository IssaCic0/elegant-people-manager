import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/components/layout/MainLayout';
import GlassCard from '@/components/ui/GlassCard';
import { 
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  Clock,
  CheckSquare,
  AlertTriangle,
  FileText,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* 系统概览 */}
      <h2 className="text-2xl font-bold">系统概览</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">员工总数</p>
              <h3 className="text-2xl font-bold mt-2">134</h3>
            </div>
            <div className="bg-primary/10 p-2 rounded-full">
              <Users className="text-primary h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-green-600">+2.5%</p>
            <p className="text-xs text-muted-foreground">较上月</p>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">部门数量</p>
              <h3 className="text-2xl font-bold mt-2">8</h3>
            </div>
            <div className="bg-blue-50 p-2 rounded-full">
              <Building2 className="text-blue-500 h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-blue-600">+1</p>
            <p className="text-xs text-muted-foreground">较上月</p>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">在职率</p>
              <h3 className="text-2xl font-bold mt-2">96.7%</h3>
            </div>
            <div className="bg-green-50 p-2 rounded-full">
              <CheckSquare className="text-green-500 h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-green-600">+0.5%</p>
            <p className="text-xs text-muted-foreground">较上月</p>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">待审批</p>
              <h3 className="text-2xl font-bold mt-2">12</h3>
            </div>
            <div className="bg-amber-50 p-2 rounded-full">
              <AlertTriangle className="text-amber-500 h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-amber-600">3 个紧急</p>
            <p className="text-xs text-muted-foreground">需要处理</p>
          </div>
        </GlassCard>
      </div>

      {/* 员工分布 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">部门员工分布</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>研发部</span>
                <span>45人</span>
              </div>
              <Progress value={33} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>市场部</span>
                <span>32人</span>
              </div>
              <Progress value={24} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>产品部</span>
                <span>26人</span>
              </div>
              <Progress value={19} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>人事部</span>
                <span>15人</span>
              </div>
              <Progress value={11} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>财务部</span>
                <span>16人</span>
              </div>
              <Progress value={12} className="h-2" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">系统公告</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4 py-2">
              <h4 className="font-medium">系统更新通知</h4>
              <p className="text-sm text-muted-foreground mt-1">系统将于本周日凌晨2:00-4:00进行维护更新，请提前做好工作安排。</p>
              <p className="text-xs text-muted-foreground mt-2">2023-05-10</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h4 className="font-medium">五一假期安排</h4>
              <p className="text-sm text-muted-foreground mt-1">根据国家规定，今年五一劳动节放假调休共5天，具体安排请查看详情。</p>
              <p className="text-xs text-muted-foreground mt-2">2023-04-20</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h4 className="font-medium">新员工培训通知</h4>
              <p className="text-sm text-muted-foreground mt-1">本月新入职员工培训将于下周一上午9:00在3号会议室进行。</p>
              <p className="text-xs text-muted-foreground mt-2">2023-04-15</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const HRDashboard = () => {
  return (
    <div className="space-y-6">
      {/* HR概览 */}
      <h2 className="text-2xl font-bold">人事概览</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">员工总数</p>
              <h3 className="text-2xl font-bold mt-2">134</h3>
            </div>
            <div className="bg-primary/10 p-2 rounded-full">
              <Users className="text-primary h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex">
            <Button size="sm" variant="outline" className="mr-2">
              <UserPlus className="h-4 w-4 mr-1" />
              添加员工
            </Button>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">待审批休假</p>
              <h3 className="text-2xl font-bold mt-2">5</h3>
            </div>
            <div className="bg-blue-50 p-2 rounded-full">
              <Calendar className="text-blue-500 h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" variant="outline">
              审批休假
            </Button>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">考勤异常</p>
              <h3 className="text-2xl font-bold mt-2">3</h3>
            </div>
            <div className="bg-red-50 p-2 rounded-full">
              <Clock className="text-red-500 h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" variant="outline">
              处理考勤
            </Button>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">本月入职</p>
              <h3 className="text-2xl font-bold mt-2">8</h3>
            </div>
            <div className="bg-green-50 p-2 rounded-full">
              <UserPlus className="text-green-500 h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" variant="outline">
              查看详情
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* 最近活动 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">待处理事项</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium">张明请假审批</p>
                <p className="text-sm text-muted-foreground">2天年假 (05-15至05-16)</p>
              </div>
              <Button size="sm">审批</Button>
            </div>
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium">新员工入职</p>
                <p className="text-sm text-muted-foreground">李明 - 产品经理 (05-20)</p>
              </div>
              <Button size="sm">准备</Button>
            </div>
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium">部门调动申请</p>
                <p className="text-sm text-muted-foreground">王强 - 研发部→产品部</p>
              </div>
              <Button size="sm">处理</Button>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">最近员工活动</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h4 className="font-medium">张明</h4>
              <p className="text-sm text-muted-foreground mt-1">提交了年假申请 (2天)</p>
              <p className="text-xs text-muted-foreground mt-1">10分钟前</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h4 className="font-medium">李娜</h4>
              <p className="text-sm text-muted-foreground mt-1">更新了个人联系信息</p>
              <p className="text-xs text-muted-foreground mt-1">2小时前</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-4 py-2">
              <h4 className="font-medium">王强</h4>
              <p className="text-sm text-muted-foreground mt-1">提交了部门调动申请</p>
              <p className="text-xs text-muted-foreground mt-1">昨天 15:30</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const ManagerDashboard = () => {
  return (
    <div className="space-y-6">
      {/* 部门概览 */}
      <h2 className="text-2xl font-bold">部门概览</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">团队成员</p>
              <h3 className="text-2xl font-bold mt-2">18</h3>
            </div>
            <div className="bg-primary/10 p-2 rounded-full">
              <Users className="text-primary h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" variant="outline">
              查看团队
            </Button>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">待审批</p>
              <h3 className="text-2xl font-bold mt-2">3</h3>
            </div>
            <div className="bg-amber-50 p-2 rounded-full">
              <AlertTriangle className="text-amber-500 h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" variant="outline">
              去审批
            </Button>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">今日出勤</p>
              <h3 className="text-2xl font-bold mt-2">16/18</h3>
            </div>
            <div className="bg-green-50 p-2 rounded-full">
              <CheckSquare className="text-green-500 h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" variant="outline">
              查看详情
            </Button>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">在休假</p>
              <h3 className="text-2xl font-bold mt-2">2</h3>
            </div>
            <div className="bg-blue-50 p-2 rounded-full">
              <Calendar className="text-blue-500 h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" variant="outline">
              查看日历
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* 团队信息 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">团队请假日历</h3>
          <div className="space-y-4">
            <div className="flex items-center border-b pb-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                <span>张</span>
              </div>
              <div>
                <p className="font-medium">张明</p>
                <p className="text-sm text-muted-foreground">年假 (05-15至05-16)</p>
              </div>
            </div>
            <div className="flex items-center border-b pb-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                <span>李</span>
              </div>
              <div>
                <p className="font-medium">李娜</p>
                <p className="text-sm text-muted-foreground">病假 (05-12)</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                <span>王</span>
              </div>
              <div>
                <p className="font-medium">王强</p>
                <p className="text-sm text-muted-foreground">调休 (05-20)</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">待审批事项</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h4 className="font-medium">休假申请</h4>
              <p className="text-sm text-muted-foreground mt-1">张明申请年假2天 (05-15至05-16)</p>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="default">批准</Button>
                <Button size="sm" variant="outline">拒绝</Button>
              </div>
            </div>
            <div className="border-l-4 border-amber-500 pl-4 py-2">
              <h4 className="font-medium">加班申请</h4>
              <p className="text-sm text-muted-foreground mt-1">李娜申请下周六加班</p>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="default">批准</Button>
                <Button size="sm" variant="outline">拒绝</Button>
              </div>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h4 className="font-medium">外出申请</h4>
              <p className="text-sm text-muted-foreground mt-1">王强申请下周三外出客户拜访</p>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="default">批准</Button>
                <Button size="sm" variant="outline">拒绝</Button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const EmployeeDashboard = () => {
  return (
    <div className="space-y-6">
      {/* 个人状态 */}
      <h2 className="text-2xl font-bold">个人状态</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">今日考勤</p>
              <h3 className="text-2xl font-bold mt-2">已签到</h3>
            </div>
            <div className="bg-green-50 p-2 rounded-full">
              <CheckSquare className="text-green-500 h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-green-600">09:02 签到</p>
            <p className="text-xs text-muted-foreground">未签退</p>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">剩余年假</p>
              <h3 className="text-2xl font-bold mt-2">10天</h3>
            </div>
            <div className="bg-blue-50 p-2 rounded-full">
              <Calendar className="text-blue-500 h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" variant="outline">
              申请休假
            </Button>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">待办事项</p>
              <h3 className="text-2xl font-bold mt-2">3</h3>
            </div>
            <div className="bg-amber-50 p-2 rounded-full">
              <AlertTriangle className="text-amber-500 h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" variant="outline">
              查看待办
            </Button>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">我的文档</p>
              <h3 className="text-2xl font-bold mt-2">12</h3>
            </div>
            <div className="bg-purple-50 p-2 rounded-full">
              <FileText className="text-purple-500 h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" variant="outline">
              查看文档
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* 个人信息 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">我的申请</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h4 className="font-medium">年假申请</h4>
              <p className="text-sm text-muted-foreground mt-1">2天 (2023-05-15至2023-05-16)</p>
              <p className="text-xs mt-1 inline-flex items-center bg-green-100 text-green-800 rounded-full px-2 py-0.5">已批准</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-4 py-2">
              <h4 className="font-medium">调休申请</h4>
              <p className="text-sm text-muted-foreground mt-1">1天 (2023-04-28)</p>
              <p className="text-xs mt-1 inline-flex items-center bg-amber-100 text-amber-800 rounded-full px-2 py-0.5">审批中</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h4 className="font-medium">报销申请</h4>
              <p className="text-sm text-muted-foreground mt-1">差旅费 ¥1,250</p>
              <p className="text-xs mt-1 inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">已提交</p>
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" variant="outline" className="w-full">
              新建申请
            </Button>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">公司通知</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4 py-2">
              <h4 className="font-medium">系统更新通知</h4>
              <p className="text-sm text-muted-foreground mt-1">系统将于本周日凌晨2:00-4:00进行维护更新，请提前做好工作安排。</p>
              <p className="text-xs text-muted-foreground mt-2">2023-05-10</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h4 className="font-medium">五一假期安排</h4>
              <p className="text-sm text-muted-foreground mt-1">根据国家规定，今年五一劳动节放假调休共5天，具体安排请查看详情。</p>
              <p className="text-xs text-muted-foreground mt-2">2023-04-20</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h4 className="font-medium">新员工培训通知</h4>
              <p className="text-sm text-muted-foreground mt-1">本月新入职员工培训将于下周一上午9:00在3号会议室进行。</p>
              <p className="text-xs text-muted-foreground mt-2">2023-04-15</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const Index = () => {
  const { user } = useAuth();

  // 根据用户角色返回不同的仪表盘
  const renderDashboard = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'ADMIN':
        return <AdminDashboard />;
      case 'HR':
        return <HRDashboard />;
      case 'MANAGER':
        return <ManagerDashboard />;
      case 'EMPLOYEE':
        return <EmployeeDashboard />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      {renderDashboard()}
    </MainLayout>
  );
};

export default Index;
