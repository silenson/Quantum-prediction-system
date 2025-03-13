/**
 * 量子运势预测系统构建脚本
 * 用于构建和打包Electron应用
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// 打印带颜色的消息
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// 创建构建目录
function createBuildDir() {
  log('创建构建目录...', colors.cyan);
  const buildDir = path.join(__dirname, 'build');
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }
  return buildDir;
}

// 清理构建目录
function cleanBuildDir(buildDir) {
  log('清理构建目录...', colors.cyan);
  const files = fs.readdirSync(buildDir);
  for (const file of files) {
    const filePath = path.join(buildDir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      fs.rmdirSync(filePath, { recursive: true });
    } else {
      fs.unlinkSync(filePath);
    }
  }
}

// 复制必要的文件到构建目录
function copyFiles(buildDir) {
  log('复制文件到构建目录...', colors.cyan);
  const filesToCopy = [
    'index.html',
    'main.js',
    'preload.js',
    'quantum-engine.js',
    'quantum-bridge.py',
    'start.js',
    'config.js',
    'package.json',
    'LICENSE',
    'README.md'
  ];

  const directoriesToCopy = [
    'assets',
    'scripts',
    'styles'
  ];

  // 复制文件
  for (const file of filesToCopy) {
    const sourcePath = path.join(__dirname, file);
    const destPath = path.join(buildDir, file);
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      log(`  - 已复制: ${file}`, colors.dim);
    } else {
      log(`  - 警告: 找不到文件 ${file}`, colors.yellow);
    }
  }

  // 复制目录
  for (const dir of directoriesToCopy) {
    const sourceDir = path.join(__dirname, dir);
    const destDir = path.join(buildDir, dir);
    if (fs.existsSync(sourceDir)) {
      copyDirectory(sourceDir, destDir);
      log(`  - 已复制目录: ${dir}`, colors.dim);
    } else {
      log(`  - 警告: 找不到目录 ${dir}`, colors.yellow);
    }
  }
}

// 递归复制目录
function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}

// 安装生产依赖
function installDependencies(buildDir) {
  log('安装生产依赖...', colors.cyan);
  process.chdir(buildDir);
  execSync('npm install --production', { stdio: 'inherit' });
  process.chdir(__dirname);
}

// 使用electron-packager打包应用
function packageApp(buildDir) {
  log('打包应用...', colors.cyan);
  const platforms = ['win32', 'darwin', 'linux'];
  const arch = ['x64'];
  const appVersion = packageJson.version;
  const appName = packageJson.name;

  for (const platform of platforms) {
    for (const architecture of arch) {
      log(`  - 为 ${platform}-${architecture} 打包...`, colors.dim);
      try {
        execSync(
          `npx electron-packager ${buildDir} ${appName} --platform=${platform} --arch=${architecture} --out=dist --overwrite --icon=assets/icon --app-version=${appVersion}`,
          { stdio: 'inherit' }
        );
      } catch (error) {
        log(`  - 打包 ${platform}-${architecture} 失败: ${error.message}`, colors.red);
      }
    }
  }
}

// 创建安装程序
function createInstallers() {
  log('创建安装程序...', colors.cyan);
  log('  - 此功能需要额外配置，请参考electron-builder文档', colors.yellow);
  // 这里可以添加使用electron-builder创建安装程序的代码
}

// 主函数
function main() {
  log('开始构建量子运势预测系统...', colors.bright + colors.blue);
  log(`版本: ${packageJson.version}`, colors.bright + colors.blue);

  try {
    const buildDir = createBuildDir();
    cleanBuildDir(buildDir);
    copyFiles(buildDir);
    installDependencies(buildDir);
    packageApp(buildDir);
    // createInstallers(); // 取消注释以创建安装程序

    log('构建完成!', colors.bright + colors.green);
    log(`输出目录: ${path.join(__dirname, 'dist')}`, colors.green);
  } catch (error) {
    log(`构建失败: ${error.message}`, colors.bright + colors.red);
    process.exit(1);
  }
}

// 执行主函数
main(); 