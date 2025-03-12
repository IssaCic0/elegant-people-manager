# 优雅的人事管理系统

<div align="center">
  <img src="public/logo.png" alt="系统Logo" width="120">
</div>

## 项目简介

这是一个现代化的企业人事管理系统前端项目，采用React和TypeScript开发，提供优雅的用户界面和流畅的操作体验。系统针对不同角色（管理员、HR、部门经理、普通员工）设计了差异化的功能和界面，满足企业的人事管理需求。

## 技术栈

- **React 18** - 流行的JavaScript UI库
- **TypeScript** - 带有类型检查的JavaScript
- **TailwindCSS** - 实用优先的CSS框架
- **shadcn/ui** - 高质量的UI组件库
- **React Router** - 应用路由管理
- **React Query** - 数据请求状态管理
- **date-fns** - 日期处理工具库
- **Lucide Icons** - 美观的图标库

## 系统亮点

- 🔐 **完善的角色权限控制** - 管理员、HR、经理、员工四种角色差异化权限设计
- 🌈 **优雅美观的UI设计** - 采用玻璃拟态设计风格，体验现代感十足
- 📱 **响应式界面** - 完美适配桌面端和移动端设备
- 🔥 **丰富的交互动效** - 流畅的过渡动画提升用户体验
- 📊 **直观的数据可视化** - 清晰展示统计数据和报表信息
- 🔍 **强大的搜索和筛选** - 快速定位和查找所需信息

## 系统功能

### 通用功能
- 📝 仪表盘 - 根据用户角色显示不同的数据概览
- 👤 个人信息管理 - 查看和编辑个人资料
- 🔐 帐户安全 - 密码修改和安全设置

### 管理员功能
- 👥 员工管理 - 全面管理所有员工信息
- 🏢 部门管理 - 管理公司部门结构
- 📊 考勤管理 - 管理全公司考勤规则和记录
- 📅 休假管理 - 假期审批和假期政策设置
- 📑 文档管理 - 公司文档的上传和管理
- ⚙️ 系统设置 - 系统参数配置和权限管理

### HR功能
- 👥 员工管理 - 管理员工信息和岗位变动
- 🏢 部门管理 - 管理部门人员分配
- 📊 考勤管理 - 处理考勤异常和统计报表
- 📅 休假管理 - 处理假期申请和统计

### 经理功能
- 👥 员工管理 - 管理本部门员工
- 📊 考勤管理 - 审核本部门员工的考勤
- 📅 休假管理 - 审批本部门员工的假期申请

### 员工功能
- 📋 **我的考勤** - 个人考勤记录与打卡管理
  - 每日打卡（签到/签退）
  - 考勤记录查询和统计
  - 考勤状态日历视图
  - 异常考勤处理
- 📁 **我的文档** - 个人文档管理
  - 个人文档上传与管理
  - 文档分类和状态查看
  - 隐私设置控制文档访问权限
  - 常用文档模板下载
- 📅 休假申请 - 提交和管理个人假期申请

## 测试账号

系统提供以下测试账号，可以体验不同角色的功能：

| 角色 | 用户名 | 密码 | 说明 |
|------|---------|---------|---------|
| 管理员 | admin | admin123 | 拥有系统所有权限 |
| HR | hr | hr123 | 负责人事管理相关操作 |
| 部门经理 | manager | manager123 | 管理部门员工 |
| 普通员工 | employee | employee123 | 基础员工功能 |

## 开始使用

确保你的开发环境中已安装：
- Node.js (推荐 v16 或更高版本)
- npm 或 yarn 或 pnpm

```bash
# 克隆项目
git clone https://github.com/yourusername/elegant-people-manager.git

# 进入项目目录
cd elegant-people-manager

# 安装依赖
npm install
# 或者
yarn install
# 或者
pnpm install

# 启动开发服务器
npm run dev
# 或者
yarn dev
# 或者
pnpm dev
```

## 项目结构

```
elegant-people-manager/
├── public/              # 静态资源
├── src/                 # 源代码目录
│   ├── components/      # 公共组件
│   │   ├── dashboard/   # 仪表盘组件
│   │   ├── layout/      # 布局相关组件
│   │   ├── ui/          # UI基础组件
│   │   └── user/        # 用户相关组件
│   ├── contexts/        # React上下文
│   ├── hooks/           # 自定义Hooks
│   ├── lib/             # 工具库
│   ├── pages/           # 页面组件
│   ├── types/           # TypeScript类型定义
│   ├── App.tsx          # 应用入口
│   └── main.tsx         # 主渲染文件
└── README.md            # 项目说明文档
```

## 最近更新

- ✨ 新增员工个人中心功能
  - **我的考勤页面** - 员工可查看个人考勤记录、打卡、申请请假
  - **我的文档页面** - 员工可管理个人文档、上传下载文件
- 🔐 完善的角色权限系统
  - 基于用户角色的菜单和功能权限控制
  - 不同角色登录后展示差异化界面
- 🎨 优化界面交互体验
  - 可折叠侧边栏
  - 角色特定的仪表盘设计

## 开发规范

- 使用React函数式组件和Hooks
- 使用TypeScript进行类型检查
- 使用ESLint进行代码规范检查
- 使用Prettier进行代码格式化

## 构建部署

```bash
# 构建生产环境版本
npm run build
# 或者
yarn build
# 或者
pnpm build
```

## 贡献指南

1. Fork本仓库
2. 创建你的特性分支 (git checkout -b feature/AmazingFeature)
3. 提交你的更改 (git commit -m 'Add some AmazingFeature')
4. 推送到分支 (git push origin feature/AmazingFeature)
5. 开启一个Pull Request

## 许可证

MIT License - 详见LICENSE文件
