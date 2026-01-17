# EVE Quant w/ AI - 美股量化策略Evaluation Dashboard

一个现代化的美股量化策略评估与分析dashboard，采用React + TypeScript + Tailwind CSS构建，提供AI驱动的策略分析和模型管理功能。

## ? 功能特性

### ? 看板 (Dashboard)
- **策略概览**: 近一周/月/季度/年度最佳策略展示
- **六维雷达图**: 收益率、夏普比率、最大回撤、胜率、稳定性、适应性综合评分
- **实时指标**: 年化收益率、最大回撤、夏普比率、波动率、胜率、盈利因子
- **最佳技术**: 每个策略的周度/月度/季度最佳技术标签
- **更新日志**: 实时策略更新记录

### ? 选股策略 (Stock Selection)
- **策略选择**: 多种AI选股策略对比
- **性能图表**: 策略收益 vs 基准收益走势
- **股票推荐**: 评分、目标价格、预期收益展示
- **搜索排序**: 按评分、收益、字母排序
- **技术标签**: AI提取的策略技术特征

### ? 价格预测 (Price Prediction)
- **预测策略**: 深度学习价格预测模型
- **准确率分析**: 各策略预测准确率对比
- **预测结果**: 当前价格、预测价格、信心度、目标日期
- **技术方法**: LSTM、时间序列、技术指标、情绪分析

### ? 配置策略 (Portfolio Allocation)
- **投资组合可视化**: 个股配置、扇区分布、风险收益散点图
- **整体指标**: 组合预期收益、风险、夏普比率
- **详细配置**: 权重、扇区、收益贡献、风险贡献
- **优化建议**: AI提供的收益优化和风险控制建议

### ? 模型上传 (Model Upload)
- **拖拽上传**: 支持Python (.py) 文件拖拽上传
- **AI分析**: 自动提取技术标签和策略特征
- **模型管理**: 模型信息、结果格式、运行状态
- **智能分类**: 自动识别选股/预测/配置策略类型

## ?? 技术栈

- **前端框架**: React 18 + TypeScript
- **样式系统**: Tailwind CSS
- **图表库**: Recharts + Chart.js
- **文件上传**: React Dropzone
- **图标库**: Lucide React
- **工具库**: date-fns, clsx, tailwind-merge

## ? 安装与运行

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd eve-quant-dashboard
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm start
```

应用将在 http://localhost:3000 启动

### 4. 构建生产版本
```bash
npm run build
```

## ? 部署到 www.panor.tech

### 1. 构建项目
```bash
npm run build
```

### 2. 上传到服务器
将 `build` 文件夹中的内容上传到服务器路径：
```
/www/wwwroot/www.panor.tech/eve-quant/
```

### 3. 配置Nginx
在现有的nginx配置中添加子路径配置：

```nginx
# EVE Quant Dashboard
location /eve-quant/ {
    root /www/wwwroot/www.panor.tech;
    try_files $uri $uri/ /eve-quant/index.html;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 4. 重启Nginx
```bash
nginx -s reload
```

现在可以通过 https://www.panor.tech/eve-quant/ 访问应用

## ? 项目结构

```
src/
├── components/          # React组件
│   ├── Dashboard.tsx    # 看板页面
│   ├── StockSelection.tsx   # 选股策略页面
│   ├── PricePrediction.tsx  # 价格预测页面
│   ├── PortfolioAllocation.tsx  # 配置策略页面
│   └── ModelUpload.tsx  # 模型上传页面
├── data/               # 模拟数据
│   └── mockData.ts     # 策略和结果数据
├── types/              # TypeScript类型定义
│   └── index.ts        # 接口和类型
├── utils/              # 工具函数
│   └── index.ts        # 通用工具函数
├── App.tsx             # 主应用组件
├── index.tsx           # 应用入口
└── index.css           # 全局样式
```

## ? 界面特性

- **响应式设计**: 完全适配桌面、平板、手机
- **现代化UI**: 使用Tailwind CSS构建的现代界面
- **数据可视化**: 丰富的图表和数据展示
- **交互体验**: 流畅的页面切换和数据筛选
- **AI元素**: 智能标签提取和策略分析

## ? 数据更新

系统设计为每日更新一次，包括：
- 策略性能数据
- 股票推荐结果
- 价格预测更新
- 投资组合重新平衡

## ? 未来计划

- [ ] 后端API集成
- [ ] 实时数据连接
- [ ] 用户认证系统
- [ ] 更多AI分析功能
- [ ] 移动端优化
- [ ] 数据导出功能

## ? 许可证

MIT License

## ? 贡献

欢迎提交Issues和Pull Requests！

---

**部署地址**: https://www.panor.tech/eve-quant/
**更新时间**: 每日自动更新
**技术支持**: AI驱动的量化策略分析 