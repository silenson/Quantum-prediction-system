# 量子占卜系统开发指南

本文档旨在帮助开发者快速上手量子占卜系统的开发工作，包含环境设置、常见开发任务和问题解决方案。

## 快速入门

### 前提条件

开发量子占卜系统需要以下软件和工具：

- Node.js (v14.0.0 或更高版本)
- Python 3.8+ (用于量子计算桥接)
- Git
- 代码编辑器 (推荐 Visual Studio Code)

### 克隆并运行项目

```bash
# 克隆仓库
git clone https://github.com/silenson/quantum-fortune-teller.git

# 进入项目目录
cd quantum-fortune-teller

# 安装依赖
npm install

# 安装Python依赖
pip install -r requirements.txt

# 启动应用
npm start
```

## 开发环境设置

### Node.js 环境

确保您使用的是 Node.js v14.0.0 或更高版本：

```bash
node -v
```

如果需要管理多个 Node.js 版本，建议使用 nvm (Node Version Manager)。

### Python 环境

量子桥接组件需要 Python 3.8 或更高版本，以及一些量子计算库：

```bash
# 检查Python版本
python --version

# 安装必要的Python库
pip install qiskit numpy matplotlib pandas
```

### 开发工具配置

推荐使用 Visual Studio Code 进行开发，并安装以下扩展：

- ESLint: JavaScript 代码质量检查
- Prettier: 代码格式化
- Python: Python 语言支持
- Electron Fiddle: Electron 应用调试

## 常见开发任务

### 修改量子算法

量子算法主要在 `quantum-engine.js` 和 `quantum-bridge.py` 中实现：

1. `quantum-engine.js` 包含前端逻辑和算法框架
2. `quantum-bridge.py` 包含实际的量子计算实现

修改算法时，请确保两个文件的接口保持一致。

### 添加新的占卜类型

要添加新的占卜类型：

1. 在 `quantum-engine.js` 中添加新的预测函数
2. 在 `quantum-bridge.py` 中实现相应的量子电路
3. 在 `index.html` 中添加用户界面元素
4. 在 `scripts/quantum-api.js` 中添加新的 API 端点

### UI 开发

UI 组件主要在以下文件中：

- `index.html`: 主界面结构
- `styles/main.css`: 主要样式
- `styles/quantum-indicators.css`: 量子指标可视化样式

## 调试技巧

### 前端调试

使用 Electron 的开发者工具进行前端调试：

```javascript
// 在main.js中添加以下代码以自动打开开发者工具
mainWindow.webContents.openDevTools();
```

### 量子引擎调试

使用 `test-quantum.js` 脚本测试量子引擎功能：

```bash
node test-quantum.js
```

### Python 桥接调试

在 `quantum-bridge.py` 中添加日志输出：

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## 常见问题解决方案

### 量子计算错误

**问题**: 运行时出现 "Quantum computation failed" 错误

**解决方案**:
1. 检查 Python 环境是否正确安装
2. 确认 `quantum-bridge.py` 中的量子库导入是否正确
3. 检查量子电路参数是否有效

### 界面渲染问题

**问题**: 量子指标可视化不显示或显示错误

**解决方案**:
1. 检查浏览器控制台是否有 JavaScript 错误
2. 确认 `quantum-indicators.js` 是否正确加载
3. 验证数据格式是否符合可视化组件的要求

### 性能问题

**问题**: 应用响应缓慢，特别是在复杂计算时

**解决方案**:
1. 使用 `config.js` 中的缓存设置
2. 考虑将复杂计算移至 Web Worker
3. 优化量子电路，减少量子比特数量或门操作

## 发布流程

### 准备发布

使用 `prepare-for-github.js` 脚本准备发布版本：

```bash
node prepare-for-github.js
```

### 构建应用

```bash
# 清理之前的构建
npm run clean

# 构建应用
npm run build

# 打包应用
npm run package
```

## 参考资源

- [Electron 文档](https://www.electronjs.org/docs)
- [Qiskit 文档](https://qiskit.org/documentation/)
- [量子计算入门](https://quantum-computing.ibm.com/composer/docs/iqx/guide/)

## 联系与支持

如有开发问题，请通过以下方式获取支持：

- 在 GitHub 上提交 Issue
- 发送邮件至项目维护者
- 查阅项目 Wiki 获取更多信息 