import React, { useState } from 'react';
import { FileText, FileImage, FileVideo, Download, Search, Upload, PlusCircle, MoreHorizontal, Filter, AlertCircle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import GlassCard from '@/components/ui/GlassCard';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

// 定义文档类型
interface PersonalDocument {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'image' | 'video' | 'other';
  size: string;
  uploadedAt: string;
  category: '合同' | '证书' | '个人资料' | '工作文档' | '其他';
  status: 'approved' | 'pending' | 'rejected' | 'expired';
  description?: string;
  icon: LucideIcon;
  url: string;
  isPrivate: boolean;
}

// 生成模拟数据
const mockPersonalDocuments: PersonalDocument[] = [
  { 
    id: 'doc-1',
    name: '劳动合同.pdf',
    type: 'pdf',
    size: '2.4MB',
    uploadedAt: '2023-12-15',
    category: '合同',
    status: 'approved',
    description: '2024年签署的劳动合同',
    icon: FileText,
    url: '/documents/personal/labor_contract.pdf',
    isPrivate: true
  },
  { 
    id: 'doc-2',
    name: '个人简历.pdf',
    type: 'pdf',
    size: '1.8MB',
    uploadedAt: '2023-10-05',
    category: '个人资料',
    status: 'approved',
    icon: FileText,
    url: '/documents/personal/resume.pdf',
    isPrivate: true
  },
  { 
    id: 'doc-3',
    name: '身份证正反面.jpg',
    type: 'image',
    size: '1.2MB',
    uploadedAt: '2023-10-05',
    category: '个人资料',
    status: 'approved',
    icon: FileImage,
    url: '/documents/personal/id_card.jpg',
    isPrivate: true
  },
  { 
    id: 'doc-4',
    name: '学历证书.pdf',
    type: 'pdf',
    size: '3.5MB',
    uploadedAt: '2023-10-06',
    category: '证书',
    status: 'approved',
    icon: FileText,
    url: '/documents/personal/diploma.pdf',
    isPrivate: false
  },
  { 
    id: 'doc-5',
    name: '工作周报-第12周.doc',
    type: 'doc',
    size: '0.8MB',
    uploadedAt: '2024-03-22',
    category: '工作文档',
    status: 'pending',
    description: '2024年第12周工作周报',
    icon: FileText,
    url: '/documents/personal/weekly_report_w12.doc',
    isPrivate: false
  },
  { 
    id: 'doc-6',
    name: '员工培训证书.pdf',
    type: 'pdf',
    size: '1.5MB',
    uploadedAt: '2024-02-15',
    category: '证书',
    status: 'approved',
    icon: FileText,
    url: '/documents/personal/training_certificate.pdf',
    isPrivate: false
  },
  { 
    id: 'doc-7',
    name: '项目进度演示.mp4',
    type: 'video',
    size: '15.8MB',
    uploadedAt: '2024-03-10',
    category: '工作文档',
    status: 'approved',
    description: '客户项目进度演示视频',
    icon: FileVideo,
    url: '/documents/personal/project_demo.mp4',
    isPrivate: false
  }
];

// 定义文档模板类型
interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
  url: string;
}

// 模拟文档模板数据
const mockDocumentTemplates: DocumentTemplate[] = [
  {
    id: 'tpl-1',
    name: '休假申请表.docx',
    description: '标准休假申请表格模板',
    category: '申请表',
    icon: FileText,
    url: '/templates/leave_application.docx'
  },
  {
    id: 'tpl-2',
    name: '报销单.xlsx',
    description: '员工费用报销单模板',
    category: '财务',
    icon: FileText,
    url: '/templates/expense_claim.xlsx'
  },
  {
    id: 'tpl-3',
    name: '工作周报模板.docx',
    description: '标准工作周报模板',
    category: '工作报告',
    icon: FileText,
    url: '/templates/weekly_report.docx'
  },
  {
    id: 'tpl-4',
    name: '离职申请表.docx',
    description: '员工离职申请表格',
    category: '申请表',
    icon: FileText,
    url: '/templates/resignation.docx'
  }
];

const MyDocuments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // 状态管理
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<PersonalDocument | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  
  // 过滤文档
  const filteredDocuments = mockPersonalDocuments.filter(doc => {
    const matchesSearch = searchQuery 
      ? doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesCategory = filterCategory === 'all' 
      ? true 
      : doc.category === filterCategory;
    
    const matchesStatus = filterStatus === 'all' 
      ? true 
      : doc.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // 处理文档上传
  const handleUpload = () => {
    setIsUploading(true);
    
    // 模拟上传进度
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadProgress(0);
        setIsUploadDialogOpen(false);
        
        toast({
          title: "文档上传成功",
          description: "您的文档已成功上传，等待审核",
        });
      }
    }, 500);
  };
  
  // 预览文档
  const handlePreview = (doc: PersonalDocument) => {
    setSelectedDocument(doc);
    setIsPreviewDialogOpen(true);
  };
  
  // 下载文档
  const handleDownload = (doc: PersonalDocument) => {
    toast({
      title: "文档下载中",
      description: `正在下载: ${doc.name}`,
    });
  };
  
  // 根据文件类型获取图标
  const getFileTypeIcon = (type: PersonalDocument['type']) => {
    switch (type) {
      case 'pdf':
      case 'doc':
        return FileText;
      case 'image':
        return FileImage;
      case 'video':
        return FileVideo;
      default:
        return FileText;
    }
  };
  
  // 根据文档状态获取徽章样式
  const getStatusBadgeStyle = (status: PersonalDocument['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'pending':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'rejected':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'expired':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };
  
  // 获取文档状态文本
  const getStatusText = (status: PersonalDocument['status']) => {
    switch (status) {
      case 'approved':
        return '已通过';
      case 'pending':
        return '审核中';
      case 'rejected':
        return '已拒绝';
      case 'expired':
        return '已过期';
    }
  };
  
  // 获取文档统计数据
  const totalDocuments = mockPersonalDocuments.length;
  const approvedDocuments = mockPersonalDocuments.filter(doc => doc.status === 'approved').length;
  const pendingDocuments = mockPersonalDocuments.filter(doc => doc.status === 'pending').length;
  const privateDocuments = mockPersonalDocuments.filter(doc => doc.isPrivate).length;
  
  // 获取文档分类分布
  const categoryDistribution = mockPersonalDocuments.reduce((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <MainLayout>
      <GlassCard className="animate-fade-in mb-6">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-1">我的文档</h2>
            <p className="text-muted-foreground">管理您的个人文档和证书</p>
          </div>
          
          <Button onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            上传文档
          </Button>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* 文档概览 */}
        <GlassCard className="animate-slide-in-bottom">
          <CardHeader>
            <CardTitle className="text-xl">文档概览</CardTitle>
            <CardDescription>您的文档统计信息</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-md bg-secondary/40 flex flex-col items-center">
                <span className="text-2xl font-bold">{totalDocuments}</span>
                <span className="text-sm text-muted-foreground">总文档数</span>
              </div>
              <div className="p-3 rounded-md bg-secondary/40 flex flex-col items-center">
                <span className="text-2xl font-bold text-green-600">{approvedDocuments}</span>
                <span className="text-sm text-muted-foreground">已通过</span>
              </div>
              <div className="p-3 rounded-md bg-secondary/40 flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-600">{pendingDocuments}</span>
                <span className="text-sm text-muted-foreground">审核中</span>
              </div>
              <div className="p-3 rounded-md bg-secondary/40 flex flex-col items-center">
                <span className="text-2xl font-bold text-amber-600">{privateDocuments}</span>
                <span className="text-sm text-muted-foreground">私密文档</span>
              </div>
            </div>
          </CardContent>
        </GlassCard>

        {/* 文档分类 */}
        <GlassCard className="animate-slide-in-bottom">
          <CardHeader>
            <CardTitle className="text-xl">文档分类</CardTitle>
            <CardDescription>按分类查看文档分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(categoryDistribution).map(([category, count]) => (
                <div key={category} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    <span>{category}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{count} 个文档</span>
                </div>
              ))}
            </div>
          </CardContent>
        </GlassCard>

        {/* 常用模板 */}
        <GlassCard className="animate-slide-in-bottom">
          <CardHeader>
            <CardTitle className="text-xl">常用模板</CardTitle>
            <CardDescription>下载和使用公司文档模板</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockDocumentTemplates.slice(0, 3).map(template => (
                <div key={template.id} className="flex justify-between items-center p-2 rounded-md bg-secondary/40">
                  <div className="flex items-center">
                    <template.icon className="w-4 h-4 mr-2 text-primary" />
                    <div>
                      <div className="text-sm font-medium">{template.name}</div>
                      <div className="text-xs text-muted-foreground">{template.category}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => 
                    toast({
                      title: "模板下载中",
                      description: `正在下载: ${template.name}`,
                    })
                  }>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              <div className="text-center pt-2">
                <Button variant="link" size="sm" onClick={() => 
                  toast({
                    title: "查看更多模板",
                    description: "前往模板中心查看所有可用模板",
                  })
                }>
                  查看更多模板
                </Button>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>

      <GlassCard className="animate-slide-in-bottom">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">我的文档列表</h3>
          <div className="flex gap-2">
            <div className="relative max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索文档..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有分类</SelectItem>
                <SelectItem value="合同">合同</SelectItem>
                <SelectItem value="证书">证书</SelectItem>
                <SelectItem value="个人资料">个人资料</SelectItem>
                <SelectItem value="工作文档">工作文档</SelectItem>
                <SelectItem value="其他">其他</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有状态</SelectItem>
                <SelectItem value="approved">已通过</SelectItem>
                <SelectItem value="pending">审核中</SelectItem>
                <SelectItem value="rejected">已拒绝</SelectItem>
                <SelectItem value="expired">已过期</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {filteredDocuments.map((doc) => {
              const FileIcon = getFileTypeIcon(doc.type);
              
              return (
                <Card key={doc.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
                          <FileIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium truncate max-w-[180px]">{doc.name}</div>
                          <div className="text-xs text-muted-foreground">{doc.category} · {doc.size}</div>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handlePreview(doc)}>预览</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(doc)}>下载</DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => toast({
                              title: "分享链接已复制",
                              description: "文档分享链接已复制到剪贴板",
                            })}
                          >
                            分享
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => toast({
                              title: "删除文档",
                              description: "是否确认删除该文档？此操作不可撤销。",
                            })}
                          >
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between items-center mt-4 text-xs">
                      <div className="text-muted-foreground">上传于 {doc.uploadedAt}</div>
                      <Badge variant="outline" className={getStatusBadgeStyle(doc.status)}>
                        {getStatusText(doc.status)}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2 bg-secondary/30 flex justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => handlePreview(doc)}
                    >
                      预览
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => handleDownload(doc)}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      下载
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">没有找到文档</h3>
            <p className="text-muted-foreground mb-4">尝试调整筛选条件或清除搜索关键字</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setFilterCategory('all');
              setFilterStatus('all');
            }}>
              清除筛选条件
            </Button>
          </div>
        )}
      </GlassCard>

      {/* 文档预览对话框 */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>文档预览</DialogTitle>
            <DialogDescription>
              {selectedDocument?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDocument && (
            <div className="min-h-[50vh] flex flex-col items-center justify-center bg-secondary/30 rounded-md border">
              <div className="p-8">
                <selectedDocument.icon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium">{selectedDocument.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedDocument.size} · {selectedDocument.type.toUpperCase()}</p>
                </div>
                
                {selectedDocument.description && (
                  <div className="mt-4 p-3 bg-secondary rounded-md text-sm">
                    <p className="font-medium mb-1">文档描述</p>
                    <p className="text-muted-foreground">{selectedDocument.description}</p>
                  </div>
                )}
                
                <div className="mt-6 text-sm text-center text-muted-foreground">
                  此文档预览不可用，请下载后查看
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>关闭</Button>
            {selectedDocument && (
              <Button onClick={() => handleDownload(selectedDocument)}>
                <Download className="w-4 h-4 mr-2" />
                下载文档
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 上传文档对话框 */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>上传文档</DialogTitle>
            <DialogDescription>
              上传您的个人文档或证书
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="file" className="text-sm font-medium">选择文件</label>
              <div className="border-2 border-dashed rounded-md p-8 text-center bg-secondary/20">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">点击选择或拖拽文件到此处</p>
                <p className="text-xs text-muted-foreground">支持 PDF, Word, Excel, 图片等格式，最大 20MB</p>
                <Button variant="outline" className="mt-4">
                  浏览文件
                </Button>
                <input type="file" id="file" className="hidden" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="doc-category" className="text-sm font-medium">文档分类</label>
              <Select>
                <SelectTrigger id="doc-category">
                  <SelectValue placeholder="选择文档分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="合同">合同</SelectItem>
                  <SelectItem value="证书">证书</SelectItem>
                  <SelectItem value="个人资料">个人资料</SelectItem>
                  <SelectItem value="工作文档">工作文档</SelectItem>
                  <SelectItem value="其他">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="doc-privacy" className="text-sm font-medium">隐私设置</label>
              <Select defaultValue="private">
                <SelectTrigger id="doc-privacy">
                  <SelectValue placeholder="选择隐私设置" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">私密文档 (仅自己和HR可见)</SelectItem>
                  <SelectItem value="public">公开文档 (所有人可见)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">文档描述 (可选)</label>
              <Input id="description" placeholder="请输入文档描述" />
            </div>
            
            {isUploading && (
              <div className="space-y-2">
                <label className="text-sm font-medium">上传进度</label>
                <Progress value={uploadProgress} />
                <p className="text-xs text-right text-muted-foreground">{uploadProgress}%</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)} disabled={isUploading}>取消</Button>
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? '上传中...' : '上传文档'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default MyDocuments; 