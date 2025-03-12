import React from 'react';
import { FileText, FileImage, FileVideo, Download, Search } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface Document {
  name: string;
  type: 'pdf' | 'doc' | 'video' | 'image';
  size: string;
  uploadedAt: string;
  category: string;
  icon: LucideIcon;
  url: string;
}

const Documents = () => {
  const documents: Document[] = [
    { 
      name: '员工手册2024版.pdf',
      type: 'pdf',
      size: '2.5MB',
      uploadedAt: '2024-03-01',
      category: '规章制度',
      icon: FileText,
      url: '/documents/员工手册2024版.pdf'
    },
    { 
      name: '入职材料清单.docx',
      type: 'doc',
      size: '568KB',
      uploadedAt: '2024-02-28',
      category: '入职材料',
      icon: FileText,
      url: '/documents/入职材料清单.docx'
    },
    { 
      name: '企业文化宣传片.mp4',
      type: 'video',
      size: '156MB',
      uploadedAt: '2024-02-25',
      category: '企业文化',
      icon: FileVideo,
      url: '/documents/企业文化宣传片.mp4'
    },
    { 
      name: '公司logo素材.png',
      type: 'image',
      size: '2.1MB',
      uploadedAt: '2024-02-20',
      category: '企业形象',
      icon: FileImage,
      url: '/documents/公司logo素材.png'
    },
  ];

  const handleDownload = (doc: Document) => {
    // 创建一个隐藏的a标签
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="搜索文档..." 
            className="pl-10 w-full md:max-w-md"
          />
        </div>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle>文档管理</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">文件名</th>
                    <th className="text-left py-3 px-4">分类</th>
                    <th className="text-left py-3 px-4">大小</th>
                    <th className="text-left py-3 px-4">上传时间</th>
                    <th className="text-left py-3 px-4">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc, index) => {
                    const Icon = doc.icon;
                    return (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span>{doc.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{doc.category}</td>
                        <td className="py-3 px-4">{doc.size}</td>
                        <td className="py-3 px-4">{doc.uploadedAt}</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDownload(doc)}
                            className="text-primary hover:text-primary/80"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Documents;
