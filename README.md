# 量子运势预测系统

![版本](https://img.shields.io/badge/版本-1.2.1-blue)
![许可证](https://img.shields.io/badge/许可证-MIT-green)
![平台](https://img.shields.io/badge/平台-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)

这是一个基于Electron开发的桌面应用程序，利用量子计算原理为用户提供个性化的运势分析和可视化。本应用将量子计算的概念与运势预测相结合，通过直观的界面展示预测结果。

<p align="center">
  <img src="assets/icon.png" alt="量子运势预测系统" width="200">
</p>

## 📥 下载与安装

### 最新版本下载

您可以从以下链接下载最新版本的量子运势预测系统：

- [GitHub Releases页面](https://github.com/silenson/quantum-fortune-teller/releases/latest)

提供以下版本：
- **Windows版本**：`quantum-fortune-teller-windows-x64.zip`
- **Linux版本**：`quantum-fortune-teller-linux-x64.zip`

### 安装步骤

#### Windows安装：
1. 下载`quantum-fortune-teller-windows-x64.zip`
2. 解压文件到任意位置
3. 双击`量子运势预测系统.exe`运行程序

#### Linux安装：
1. 下载`quantum-fortune-teller-linux-x64.zip`
2. 解压文件到任意位置
3. 打开终端，进入解压目录
4. 运行`./quantum-fortune-teller`启动程序

### 便携式使用
本应用为便携式应用，无需安装，解压后即可使用。您可以将其复制到U盘或其他存储设备上随身携带。

## 🌟 功能特点

- 基于出生日期的量子运势预测
- 支持日、周、月、年不同时间跨度的预测
- 量子电路可视化展示
- 详细的量子指标分析
- 个性化的运势建议
- 跨平台支持 (Windows, macOS, Linux)
- 本地化运算，保护隐私

## 🚀 最新更新

### 2024年3月13日更新 (v1.2.1)
- **新增**：便携式发布包，支持Windows和Linux平台
- **修复**：解决了mathjs依赖问题，确保应用正常运行
- **改进**：将Python错误消息改为Python信息，提升用户体验
- **修复**：移除"预测结果中没有电路数据"的警告信息，改为静默处理
- **优化**：更新README.md文件，增加emoji图标和表格布局
- **整理**：添加项目文档，包括架构说明、贡献指南和开发指南

### 2024年3月12日更新
- 全新设计的科学仪表盘界面，提供更专业的数据展示
- 优化仪表盘UI，增加现代感和交互性
- 改进指针动画和渐变效果，提升用户体验
- 添加响应式布局，支持多种屏幕尺寸
- 优化中心圆显示效果，增强数据可读性
- 更新系统图标，提升整体视觉效果

### 2023年3月12日更新
- 移除了访问令牌相关代码，简化API认证流程
- 改进了API设置面板，添加了更多说明信息
- 修复了中文字符显示问题，确保JSON正确解析
- 增强了错误处理，提供更友好的错误提示
- 优化了Bloch球的显示效果，使其更加直观和美观
- 添加了对国盾量子SDK缺失情况的处理，自动切换到模拟模式

## 💻 技术栈

- 框架：Electron
- 前端：HTML5, CSS3, JavaScript
- 量子计算：自定义量子计算引擎
- 可视化：D3.js
- API集成：RESTful API

## 🔧 系统要求

- Windows 10及以上
- macOS 10.13及以上
- Linux (支持主流发行版)
- 至少4GB RAM
- 500MB可用磁盘空间

## 📊 使用方法

1. 启动应用：
   - Windows: 双击解压目录中的`量子运势预测系统.exe`
   - Linux: 运行解压目录中的`quantum-fortune-teller`可执行文件

2. 配置API密钥（可选）：
   - 点击设置图标
   - 在API设置中配置您的量子计算API密钥
   - 保存设置

3. 进行预测：
   - 输入您的出生日期
   - 选择预测的时间跨度（日/周/月/年）
   - 点击"开始预测"按钮

4. 查看结果：
   - 运势预测结果
   - 量子指标分析
   - 量子电路可视化
   - 个性化建议

## 🧩 项目结构

```
quantum-fortune-teller/
├── assets/              # 图标和资源文件
├── scripts/             # JavaScript脚本文件
│   ├── lib/             # 第三方库
│   └── quantum-*.js     # 量子相关功能模块
├── styles/              # CSS样式文件
├── index.html           # 主页面
├── main.js              # Electron主进程
├── preload.js           # 预加载脚本
├── quantum-engine.js    # 量子算法引擎
├── quantum-bridge.py    # Python桥接脚本
├── start.js             # 启动脚本
├── package.json         # 项目配置
├── ARCHITECTURE.md      # 架构说明
├── CONTRIBUTING.md      # 贡献指南
├── DEVELOPMENT.md       # 开发指南
└── README.md            # 项目说明
```

## 📈 量子指标说明

| 指标 | 说明 |
|------|------|
| 纠缠度 | 反映事件间的关联程度 |
| 相干性 | 表示运势的稳定性 |
| 不确定性 | 表示变数的大小 |
| 能量 | 表示运势的强度 |
| 稳定性 | 表示状态的持续性 |
| 熵 | 表示混沌与秩序的程度 |
| 相位 | 表示运势的周期性变化 |
| 纯度 | 表示预测的准确度 |
| 干涉 | 表示外部影响的程度 |
| 保真度 | 表示预测的可信度 |

## 🔍 故障排除

1. 应用无法启动
   - 检查系统要求是否满足
   - 确认解压是否完整
   - 查看日志文件

2. 出现"Cannot find module"错误
   - 确保完整解压所有文件
   - 不要移动或删除解压目录中的任何文件
   - 重新下载并解压应用程序

3. API连接问题
   - 验证API密钥是否正确
   - 检查网络连接
   - 确认API服务状态

4. 显示异常
   - 更新显卡驱动
   - 调整系统缩放设置
   - 重启应用程序

## 🔒 安全说明

- 所有计算在本地完成，数据不会上传
- API密钥经过加密存储
- 定期更新以修复安全问题

## 📝 许可证

MIT License

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- [提交Issue](https://github.com/silenson/quantum-fortune-teller/issues)
- 发送邮件至：quantum@example.com

## 🤝 贡献指南

欢迎提交问题和功能请求。如果您想贡献代码，请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 文件获取详细指南。

简要步骤：
1. Fork 仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 📚 相关文档

- [ARCHITECTURE.md](ARCHITECTURE.md) - 系统架构和核心组件说明
- [CONTRIBUTING.md](CONTRIBUTING.md) - 贡献指南
- [DEVELOPMENT.md](DEVELOPMENT.md) - 开发环境设置和常见开发任务
- [BUILD.md](BUILD.md) - 构建和打包应用的详细说明

## 🙏 致谢

- 感谢Electron社区的支持
- 感谢所有为本项目做出贡献的开发者
- 特别感谢量子物理学家的研究成果，为本项目提供了理论基础

