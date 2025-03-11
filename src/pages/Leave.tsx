
import React from 'react';
import { Calendar, Clock, CalendarCheck, CalendarX } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Leave = () => {
  const leaveStats = [
    { title: '剩余年假', value: '12天', icon: Calendar, color: 'text-blue-500' },
    { title: '已休年假', value: '8天', icon: CalendarCheck, color: 'text-green-500' },
    { title: '待审批', value: '1条', icon: Clock, color: 'text-amber-500' },
    { title: '已驳回', value: '0条', icon: CalendarX, color: 'text-red-500' },
  ];

  const recentLeaves = [
    { type: '年假', startDate: '2024-03-15', endDate: '2024-03-16', status: '已批准', days: 2 },
    { type: '病假', startDate: '2024-02-28', endDate: '2024-02-28', status: '已批准', days: 1 },
    { type: '事假', startDate: '2024-02-10', endDate: '2024-02-10', status: '已驳回', days: 1 },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Leave Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaveStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className={`rounded-full p-3 bg-gray-100 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-semibold">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Leave Applications */}
        <Card>
          <CardHeader>
            <CardTitle>最近休假申请</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">类型</th>
                    <th className="text-left py-3 px-4">开始日期</th>
                    <th className="text-left py-3 px-4">结束日期</th>
                    <th className="text-left py-3 px-4">天数</th>
                    <th className="text-left py-3 px-4">状态</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeaves.map((leave, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 px-4">{leave.type}</td>
                      <td className="py-3 px-4">{leave.startDate}</td>
                      <td className="py-3 px-4">{leave.endDate}</td>
                      <td className="py-3 px-4">{leave.days}天</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          leave.status === '已批准' ? 'bg-green-100 text-green-700' : 
                          leave.status === '已驳回' ? 'bg-red-100 text-red-700' : 
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Leave;

