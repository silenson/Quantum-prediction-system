/**
 * 打包发布脚本
 * 使用Node.js替代批处理文件进行打包
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// 压缩目录为ZIP文件
function compressDirectory(sourceDir, targetZip) {
  try {
    log(`压缩目录 ${sourceDir} 到 ${targetZip}`, colors.cyan);
    
    // 确保目录存在
    if (!fs.existsSync(sourceDir)) {
      log(`  - 错误: 目录不存在 ${sourceDir}`, colors.red);
      return false;
    }
    
    // 使用PowerShell的Compress-Archive命令
    const command = `powershell -Command "Compress-Archive -Path '${sourceDir}\\*' -DestinationPath '${targetZip}' -Force"`;
    execSync(command, { stdio: 'inherit' });
    
    log(`  - 压缩成功: ${targetZip}`, colors.green);
    return true;
  } catch (error) {
    log(`  - 压缩失败: ${error.message}`, colors.red);
    return false;
  }
}

// 主函数
function main() {
  log('开始打包量子运势预测系统...', colors.bright + colors.blue);
  
  const rootDir = path.resolve(__dirname, '..');
  const distDir = path.join(rootDir, 'dist');
  const releaseDir = path.join(rootDir, 'release');
  
  // 确保release目录存在
  if (!fs.existsSync(releaseDir)) {
    fs.mkdirSync(releaseDir, { recursive: true });
    log('创建release目录', colors.dim);
  }
  
  // 检查dist目录是否存在
  if (!fs.existsSync(distDir)) {
    log(`错误: dist目录不存在，请先构建应用`, colors.red);
    return;
  }
  
  // 定义平台映射
  const platforms = [
    {
      sourceDir: path.join(distDir, 'quantum-fortune-teller-win32-x64'),
      targetZip: path.join(releaseDir, 'quantum-fortune-teller-windows-x64.zip'),
      name: 'Windows'
    },
    {
      sourceDir: path.join(distDir, 'quantum-fortune-teller-linux-x64'),
      targetZip: path.join(releaseDir, 'quantum-fortune-teller-linux-x64.zip'),
      name: 'Linux'
    },
    {
      sourceDir: path.join(distDir, 'quantum-fortune-teller-darwin-x64'),
      targetZip: path.join(releaseDir, 'quantum-fortune-teller-macos-x64.zip'),
      name: 'macOS'
    }
  ];
  
  // 打包每个平台
  let successCount = 0;
  for (const platform of platforms) {
    if (fs.existsSync(platform.sourceDir)) {
      log(`打包 ${platform.name} 版本...`, colors.blue);
      
      try {
        // 对于macOS版本，使用特殊处理
        if (platform.name === 'macOS') {
          // 创建临时目录
          const tempDir = path.join(distDir, 'temp_macos');
          if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
          }
          
          // 复制主要文件，跳过可能导致权限问题的文件
          log(`  - 为macOS版本创建临时目录`, colors.dim);
          const command = `powershell -Command "Copy-Item -Path '${platform.sourceDir}\\quantum-fortune-teller.app\\Contents\\Resources\\app\\*' -Destination '${tempDir}' -Recurse -Force"`;
          execSync(command, { stdio: 'inherit' });
          
          // 压缩临时目录
          compressDirectory(tempDir, platform.targetZip);
          
          // 清理临时目录
          fs.rmdirSync(tempDir, { recursive: true });
        } else {
          // 对于其他平台，直接压缩
          compressDirectory(platform.sourceDir, platform.targetZip);
        }
        
        log(`${platform.name} 版本打包完成!`, colors.green);
        successCount++;
      } catch (error) {
        log(`${platform.name} 版本打包失败: ${error.message}`, colors.red);
      }
    } else {
      log(`${platform.name} 版本目录不存在，跳过...`, colors.yellow);
    }
  }
  
  log(`打包完成! ${successCount} 个平台已打包`, colors.bright + colors.green);
  log(`发布文件位于 ${releaseDir} 目录`, colors.green);
}

// 执行主函数
try {
  main();
} catch (error) {
  log(`执行失败: ${error.message}`, colors.bright + colors.red);
  process.exit(1);
} 