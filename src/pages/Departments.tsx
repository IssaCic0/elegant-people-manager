import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { Building2, Users, UserPlus, BarChart3, MoreHorizontal } from 'lucide-react';
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock department data
const departments = [
  {
    id: '1',
    name: '研发部',
    manager: '张明',
    headcount: 24,
    budget: '1,260,000',
    progress: 78,
    description: '负责公司产品的研发和技术创新，包括前端、后端、移动端等各个技术领域。',
    icon: 'https://api.iconify.design/fluent:code-24-filled.svg?color=%230ea5e9',
  },
  {
    id: '2',
    name: '产品部',
    manager: '赵琳',
    headcount: 8,
    budget: '420,000',
    progress: 65,
    description: '负责产品规划、需求分析、用户研究和产品体验优化。',
    icon: 'https://api.iconify.design/fluent:design-ideas-24-filled.svg?color=%23a855f7',
  },
  {
    id: '3',
    name: '市场部',
    manager: '王强',
    headcount: 12,
    budget: '860,000',
    progress: 92,
    description: '负责市场调研、品牌推广、营销策略制定和执行。',
    icon: 'https://api.iconify.design/fluent:chart-multiple-24-filled.svg?color=%23f59e0b',
  },
  {
    id: '4',
    name: '财务部',
    manager: '刘伟',
    headcount: 6,
    budget: '350,000',
    progress: 84,
    description: '负责公司财务管理、预算控制、财务分析和报表制作。',
    icon: 'https://api.iconify.design/fluent:money-24-filled.svg?color=%2310b981',
  },
  {
    id: '5',
    name: '人事部',
    manager: '李娜',
    headcount: 5,
    budget: '280,000',
    progress: 88,
    description: '负责人员招聘、培训发展、绩效考核和员工关系管理。',
    icon: 'https://api.iconify.design/fluent:people-team-24-filled.svg?color=%23ec4899',
  },
  {
    id: '6',
    name: '销售部',
    manager: '吴杰',
    headcount: 16,
    budget: '950,000',
    progress: 72,
    description: '负责产品销售、客户开发、商务谈判和售后服务。',
    icon: 'https://api.iconify.design/fluent:shopping-bag-24-filled.svg?color=%23f43f5e',
  },
];

const Departments = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departments, setDepartments] = useState([
    {
      id: '1',
      name: '研发部',
      manager: '张明',
      headcount: 24,
      budget: '1,260,000',
      progress: 78,
      description: '负责公司产品的研发和技术创新，包括前端、后端、移动端等各个技术领域。',
      icon: 'https://api.iconify.design/fluent:code-24-filled.svg?color=%230ea5e9',
    },
    // ... rest of the departments data ...
  ]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    manager: '',
    description: '',
    budget: '',
  });
  const [editingDepartment, setEditingDepartment] = useState(null);

  const handleAddDepartment = () => {
    const newDeptWithId = {
      ...newDepartment,
      id: (departments.length + 1).toString(),
      headcount: 0,
      progress: 0,
      icon: 'https://api.iconify.design/fluent:building-24-filled.svg?color=%230ea5e9',
    };
    setDepartments([...departments, newDeptWithId]);
    setIsAddOpen(false);
    setNewDepartment({
      name: '',
      manager: '',
      description: '',
      budget: '',
    });
  };

  const handleEditDepartment = () => {
    const updatedDepartments = departments.map(dept => 
      dept.id === editingDepartment.id ? editingDepartment : dept
    );
    setDepartments(updatedDepartments);
    setIsEditOpen(false);
    setEditingDepartment(null);
  };

  const handleChangeManager = () => {
    const updatedDepartments = departments.map(dept => 
      dept.id === editingDepartment.id ? 
      { ...dept, manager: editingDepartment.manager } : dept
    );
    setDepartments(updatedDepartments);
    setIsManagerOpen(false);
    setEditingDepartment(null);
  };

  const handleDeleteDepartment = () => {
    const updatedDepartments = departments.filter(dept => 
      dept.id !== selectedDepartment.id
    );
    setDepartments(updatedDepartments);
    setIsDeleteOpen(false);
    setSelectedDepartment(null);
  };

  return (
    <MainLayout>
      <GlassCard className="animate-fade-in mb-6">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-1">部门管理</h2>
            <p className="text-muted-foreground">管理公司所有部门和团队</p>
          </div>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="whitespace-nowrap">
                <Building2 className="w-4 h-4 mr-2" />
                添加部门
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加新部门</DialogTitle>
                <DialogDescription>
                  创建一个新的部门并设置基本信息。创建后可以在部门详情中补充更多信息。
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">部门名称</Label>
                  <Input
                    id="name"
                    value={newDepartment.name}
                    onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                    placeholder="请输入部门名称"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="manager">部门主管</Label>
                  <Input
                    id="manager"
                    value={newDepartment.manager}
                    onChange={(e) => setNewDepartment({...newDepartment, manager: e.target.value})}
                    placeholder="请输入部门主管姓名"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="budget">部门预算</Label>
                  <Input
                    id="budget"
                    value={newDepartment.budget}
                    onChange={(e) => setNewDepartment({...newDepartment, budget: e.target.value})}
                    placeholder="请输入部门预算"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">部门描述</Label>
                  <Textarea
                    id="description"
                    value={newDepartment.description}
                    onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                    placeholder="请输入部门职责描述"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>取消</Button>
                <Button onClick={handleAddDepartment}>创建</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </GlassCard>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department, index) => (
          <Card key={department.id} className="overflow-hidden animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center">
                    <img src={department.icon} alt="" className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle>{department.name}</CardTitle>
                    <CardDescription>经理: {department.manager}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {
                      setSelectedDepartment(department);
                      setIsDetailsOpen(true);
                    }}>
                      查看详情
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setEditingDepartment(department);
                      setIsEditOpen(true);
                    }}>
                      编辑部门
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setEditingDepartment(department);
                      setIsManagerOpen(true);
                    }}>
                      更换负责人
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => {
                        setSelectedDepartment(department);
                        setIsDeleteOpen(true);
                      }}
                    >
                      解散部门
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between py-2">
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 mx-auto mb-1 rounded-full bg-blue-50 text-blue-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-lg font-semibold">{department.headcount}</div>
                  <div className="text-xs text-muted-foreground">员工数</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 mx-auto mb-1 rounded-full bg-amber-50 text-amber-600">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div className="text-lg font-semibold">{department.progress}%</div>
                  <div className="text-xs text-muted-foreground">绩效</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 mx-auto mb-1 rounded-full bg-emerald-50 text-emerald-600">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div className="text-lg font-semibold">2</div>
                  <div className="text-xs text-muted-foreground">招聘中</div>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">预算使用</span>
                  <span className="text-sm text-muted-foreground">{department.progress}%</span>
                </div>
                <Progress value={department.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          {selectedDepartment && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <img src={selectedDepartment.icon} alt="" className="w-8 h-8" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedDepartment.name}</DialogTitle>
                    <DialogDescription>部门主管：{selectedDepartment.manager}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="grid gap-6">
                <div>
                  <h4 className="font-medium mb-2">部门简介</h4>
                  <p className="text-muted-foreground">{selectedDepartment.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">员工数量</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedDepartment.headcount}</div>
                      <p className="text-sm text-muted-foreground">当前在职人数</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">部门预算</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">¥{selectedDepartment.budget}</div>
                      <p className="text-sm text-muted-foreground">年度预算</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">目标完成</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedDepartment.progress}%</div>
                      <p className="text-sm text-muted-foreground">年度目标</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Edit Department Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑部门</DialogTitle>
            <DialogDescription>
              修改部门的基本信息。
            </DialogDescription>
          </DialogHeader>
          {editingDepartment && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">部门名称</Label>
                <Input
                  id="edit-name"
                  value={editingDepartment.name}
                  onChange={(e) => setEditingDepartment({
                    ...editingDepartment,
                    name: e.target.value
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-budget">部门预算</Label>
                <Input
                  id="edit-budget"
                  value={editingDepartment.budget}
                  onChange={(e) => setEditingDepartment({
                    ...editingDepartment,
                    budget: e.target.value
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">部门描述</Label>
                <Textarea
                  id="edit-description"
                  value={editingDepartment.description}
                  onChange={(e) => setEditingDepartment({
                    ...editingDepartment,
                    description: e.target.value
                  })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>取消</Button>
            <Button onClick={handleEditDepartment}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Change Manager Dialog */}
      <Dialog open={isManagerOpen} onOpenChange={setIsManagerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>更换部门负责人</DialogTitle>
            <DialogDescription>
              为部门指定新的负责人。
            </DialogDescription>
          </DialogHeader>
          {editingDepartment && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="new-manager">新负责人</Label>
                <Input
                  id="new-manager"
                  value={editingDepartment.manager}
                  onChange={(e) => setEditingDepartment({
                    ...editingDepartment,
                    manager: e.target.value
                  })}
                  placeholder="请输入新负责人姓名"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsManagerOpen(false)}>取消</Button>
            <Button onClick={handleChangeManager}>确认更换</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Delete Department Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>解散部门</DialogTitle>
            <DialogDescription>
              确定要解散该部门吗？此操作不可撤销。
            </DialogDescription>
          </DialogHeader>
          {selectedDepartment && (
            <div className="py-4">
              <p className="text-muted-foreground mb-4">
                即将解散：<span className="font-semibold text-foreground">{selectedDepartment.name}</span>
              </p>
              <p className="text-sm text-destructive">
                注意：解散部门后，相关的所有数据将被永久删除。请确保已妥善处理部门内的人员安排。
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>取消</Button>
            <Button variant="destructive" onClick={handleDeleteDepartment}>
              确认解散
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Departments;
