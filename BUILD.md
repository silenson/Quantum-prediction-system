# 量子运势预测系统构建指南

本文档提供了构建和打包量子运势预测系统的详细说明。

## 前提条件

在开始构建之前，请确保您的系统满足以下要求：

- **Node.js**: v14.0.0 或更高版本
- **npm**: v6.0.0 或更高版本
- **Python**: v3.8 或更高版本
- **Git**: 最新版本

## 安装依赖

### 安装 Node.js 依赖

```bash
# 安装所有依赖（包括开发依赖）
npm install

# 仅安装生产依赖
npm install --production
```

### 安装 Python 依赖

```bash
# 安装 Python 依赖
pip install -r requirements.txt
```

## 开发环境

启动开发环境：

```bash
# 启动开发模式
npm run dev
```

## 构建流程

### 清理构建目录

在构建之前，您可以清理之前的构建文件：

```bash
# 清理构建目录
npm run clean
```

### 构建应用

构建应用将创建一个优化的生产版本：

```bash
# 构建应用
npm run build
```

这个命令会执行以下操作：
1. 清理之前的构建文件
2. 创建构建目录
3. 复制必要的文件到构建目录
4. 安装生产依赖
5. 打包应用

### 打包应用

如果您只想打包应用而不执行完整的构建流程：

```bash
# 打包应用
npm run package
```

这将为Windows、macOS和Linux创建可执行文件。

### 创建安装程序

创建安装程序（Windows的.exe、macOS的.dmg和Linux的.AppImage）：

```bash
# 创建安装程序
npm run make-installer
```

### 完整发布流程

执行完整的发布流程（构建、打包和创建安装程序）：

```bash
# 完整发布流程
npm run release
```

## 构建输出

构建输出将位于以下目录：

- **build/**: 包含构建文件
- **dist/**: 包含打包的应用和安装程序

## 自定义构建

### 修改构建脚本

构建脚本位于 `build.js`，您可以根据需要修改它。

### 修改打包配置

打包配置位于 `electron-builder.js` 和 `package.json` 的 `build` 部分。

## 常见问题

### 构建失败

如果构建失败，请检查以下几点：

1. 确保所有依赖都已正确安装
2. 检查Node.js和npm版本
3. 查看构建日志以获取详细错误信息

### 图标问题

如果您遇到图标相关的问题：

1. 确保 `assets` 目录中包含正确格式的图标文件：
   - Windows: `icon.ico`
   - macOS: `icon.icns`
   - Linux: `icon.png`

### Python 依赖问题

如果遇到Python依赖问题：

1. 确保使用正确的Python版本
2. 尝试在虚拟环境中安装依赖
3. 检查 `requirements.txt` 中的版本兼容性

## 平台特定说明

### Windows

在Windows上构建时，您可能需要安装以下工具：

- Visual Studio Build Tools
- Windows 10 SDK

### macOS

在macOS上构建时，您需要：

- Xcode Command Line Tools
- 如果要创建签名的应用，需要Apple Developer账号

### Linux

在Linux上构建时，您可能需要安装以下依赖：

```bash
# Ubuntu/Debian
sudo apt-get install libgtk-3-dev libwebkit2gtk-4.0-dev libappindicator3-dev librsvg2-dev patchelf
```

## 脚本说明

| 脚本 | 说明 |
|------|------|
| `npm start` | 启动应用 |
| `npm run dev` | 启动开发模式 |
| `npm run clean` | 清理构建目录 |
| `npm run build` | 构建应用 |
| `npm run package` | 打包应用 |
| `npm run make-installer` | 创建安装程序 |
| `npm run release` | 执行完整的发布流程 |
| `npm run lint` | 运行代码质量检查 |

## 更多资源

- [Electron 文档](https://www.electronjs.org/docs)
- [Electron Builder 文档](https://www.electron.build/)
- [Electron Packager 文档](https://github.com/electron/electron-packager) 