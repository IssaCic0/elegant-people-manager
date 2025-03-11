
import React from 'react';
import { User, Mail, Phone, Building2, BookOpen, MapPin } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const userInfo = {
    name: '张明',
    title: '高级工程师',
    department: '研发部',
    email: 'zhang.ming@example.com',
    phone: '138-1234-5678',
    location: '上海',
    joinDate: '2022-06-15',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  };

  const skills = ['JavaScript', 'React', 'Node.js', 'TypeScript', 'SQL'];

  return (
    <MainLayout>
      <div className="max-w-4xl space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={userInfo.avatar}
                alt={userInfo.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{userInfo.name}</h2>
                <p className="text-muted-foreground">{userInfo.title}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <Button className="ml-auto">编辑资料</Button>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">部门</p>
                <p className="font-medium">{userInfo.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">邮箱</p>
                <p className="font-medium">{userInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">电话</p>
                <p className="font-medium">{userInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">地点</p>
                <p className="font-medium">{userInfo.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">入职日期</p>
                <p className="font-medium">{userInfo.joinDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Experience */}
        <Card>
          <CardHeader>
            <CardTitle>工作经历</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-2 pl-4 pb-4">
              <p className="font-medium">高级工程师</p>
              <p className="text-sm text-muted-foreground">某某科技有限公司</p>
              <p className="text-sm text-muted-foreground">2022年6月 - 至今</p>
            </div>
            <div className="border-l-2 pl-4">
              <p className="font-medium">工程师</p>
              <p className="text-sm text-muted-foreground">某某网络科技公司</p>
              <p className="text-sm text-muted-foreground">2020年3月 - 2022年5月</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Profile;

