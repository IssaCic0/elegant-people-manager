
import React from 'react';
import { HelpCircle, Book, Mail, Phone } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Help = () => {
  const faqs = [
    {
      question: '如何申请休假？',
      answer: '登录系统后，点击"休假管理"模块，选择"申请休假"，填写相关信息并提交即可。'
    },
    {
      question: '如何查看考勤记录？',
      answer: '在"考勤管理"模块中，可以查看个人的考勤记录，包括上下班打卡时间、加班记录等。'
    },
    {
      question: '如何修改个人信息？',
      answer: '点击右上角头像，选择"个人资料"，即可修改个人基本信息。'
    },
    {
      question: '忘记密码怎么办？',
      answer: '点击登录页面的"忘记密码"，通过绑定的手机号或邮箱进行密码重置。'
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl space-y-6">
        {/* Help Search */}
        <Card>
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold">您需要什么帮助？</h1>
              <div className="max-w-md mx-auto">
                <Input placeholder="搜索帮助文档..." />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              <CardTitle>常见问题</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Documentation */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              <CardTitle>使用手册</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto py-4 px-6">
                <div className="text-left">
                  <h3 className="font-medium">新手指南</h3>
                  <p className="text-sm text-muted-foreground">了解系统基本功能和操作流程</p>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4 px-6">
                <div className="text-left">
                  <h3 className="font-medium">功能详解</h3>
                  <p className="text-sm text-muted-foreground">深入了解系统各项功能的使用方法</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <CardTitle>联系支持</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">电子邮件</p>
                  <p className="text-sm text-muted-foreground">support@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">服务热线</p>
                  <p className="text-sm text-muted-foreground">400-123-4567</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Help;

