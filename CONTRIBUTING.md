# 贡献指南

感谢您对量子运势预测系统的关注！本文档将帮助您了解如何为项目做出贡献。

## 项目结构

```
quantum-fortune-teller/
├── assets/              # 图标和资源文件
├── scripts/             # JavaScript脚本文件
│   ├── lib/             # 第三方库
│   ├── quantum-api.js   # 量子API接口
│   ├── quantum-circuit-visualizer.js # 量子电路可视化
│   ├── quantum-indicators.js # 量子指标显示
│   └── quantum-visualizer-integration.js # 量子可视化集成
├── styles/              # CSS样式文件
│   ├── main.css         # 主样式
│   └── quantum-indicators.css # 量子指标样式
├── index.html           # 主页面
├── main.js              # Electron主进程
├── preload.js           # 预加载脚本
├── quantum-engine.js    # 量子算法引擎
├── quantum-bridge.py    # Python桥接脚本
├── start.js             # 启动脚本
├── config.js            # 配置文件
├── package.json         # 项目配置
└── README.md            # 项目说明
```

## 开发环境设置

1. 克隆仓库：
```bash
git clone https://github.com/silenson/quantum-fortune-teller.git
```

2. 进入项目目录：
```bash
cd quantum-fortune-teller
```

3. 安装依赖：
```bash
npm install
```

4. 启动应用：
```bash
npm start
```

## 开发工作流程

1. 创建一个新的分支：
```bash
git checkout -b feature/your-feature-name
```

2. 进行代码修改

3. 提交您的更改：
```bash
git add .
git commit -m "描述您的更改"
```

4. 推送到您的分支：
```bash
git push origin feature/your-feature-name
```

5. 创建一个Pull Request

## 代码规范

- 使用2个空格进行缩进
- 使用驼峰命名法命名变量和函数
- 使用有意义的变量名和函数名
- 添加适当的注释，特别是对于复杂的算法和逻辑
- 遵循模块化设计原则

## 测试

在提交代码之前，请确保运行测试：

```bash
npm test
```

## 文档

如果您添加了新功能或修改了现有功能，请更新相应的文档：

- 更新README.md中的功能描述
- 更新代码注释
- 如果需要，创建或更新用户文档

## 问题和功能请求

如果您发现了问题或有功能请求，请在GitHub上创建一个Issue。请提供尽可能详细的信息，包括：

- 问题的详细描述
- 重现问题的步骤
- 预期行为和实际行为
- 截图（如果适用）
- 系统信息（操作系统、Node.js版本等）

## 联系方式

如果您有任何问题或建议，请通过以下方式联系我们：

- [提交Issue](https://github.com/silenson/quantum-fortune-teller/issues)
- 发送邮件至：quantum@example.com

感谢您的贡献！ 