
import React from 'react';
import { Bell, Shield, Moon, Sun, Globe } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const notificationSettings = [
    { title: '系统通知', description: '接收系统重要通知和更新', enabled: true },
    { title: '考勤提醒', description: '每日考勤打卡提醒', enabled: true },
    { title: '请假审批', description: '新的请假申请通知', enabled: true },
  ];

  const securitySettings = [
    { title: '双因素认证', description: '启用双因素认证以提高账户安全性', enabled: false },
    { title: '登录通知', description: '新设备登录时发送通知', enabled: true },
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl space-y-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>通知设置</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {notificationSettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{setting.title}</p>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <Switch defaultChecked={setting.enabled} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>安全设置</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {securitySettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{setting.title}</p>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <Switch defaultChecked={setting.enabled} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              <CardTitle>外观设置</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">深色模式</p>
                <p className="text-sm text-muted-foreground">切换深色/浅色主题</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <CardTitle>语言设置</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <select className="w-full p-2 border rounded-md">
              <option value="zh">中文</option>
              <option value="en">English</option>
            </select>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;

