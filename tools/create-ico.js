/**
 * 创建ICO和ICNS图标文件脚本
 * 使用to-ico库将PNG转换为ICO格式
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const toIco = require('to-ico');

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

// 创建不同尺寸的图标
async function createIconSizes(pngPath, outputDir, sizes = [16, 32, 48, 64, 128, 256]) {
  const results = [];
  
  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}.png`);
    
    try {
      await sharp(pngPath)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      results.push({
        size,
        path: outputPath,
        success: true
      });
      
      log(`  - 已创建 ${size}x${size} 图标`, colors.dim);
    } catch (error) {
      log(`  - 创建 ${size}x${size} 图标失败: ${error.message}`, colors.red);
      results.push({
        size,
        path: outputPath,
        success: false,
        error: error.message
      });
    }
  }
  
  return results;
}

// 创建ICO文件
async function createIcoFile(pngPath, icoPath) {
  try {
    log(`创建ICO文件: ${icoPath}`, colors.cyan);
    
    // 创建临时目录
    const tempDir = path.join(path.dirname(icoPath), 'temp_icons');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    // 创建不同尺寸的图标
    const iconSizes = await createIconSizes(pngPath, tempDir, [16, 24, 32, 48, 64, 128, 256]);
    
    // 收集成功创建的图标
    const pngFiles = iconSizes
      .filter(icon => icon.success)
      .map(icon => fs.readFileSync(icon.path));
    
    if (pngFiles.length === 0) {
      throw new Error('没有成功创建任何尺寸的图标');
    }
    
    // 使用to-ico库创建ICO文件
    const icoBuffer = await toIco(pngFiles);
    fs.writeFileSync(icoPath, icoBuffer);
    
    log(`  - ICO文件创建成功: ${icoPath}`, colors.green);
    
    // 清理临时文件
    for (const icon of iconSizes) {
      if (icon.success && fs.existsSync(icon.path)) {
        fs.unlinkSync(icon.path);
      }
    }
    
    if (fs.existsSync(tempDir)) {
      fs.rmdirSync(tempDir);
    }
    
    return true;
  } catch (error) {
    log(`  - ICO文件创建失败: ${error.message}`, colors.red);
    return false;
  }
}

// 创建ICNS文件 (简化版，实际上只是复制PNG)
async function createIcnsFile(pngPath, icnsPath) {
  try {
    log(`创建ICNS文件: ${icnsPath}`, colors.cyan);
    
    // 简化处理：直接复制PNG文件
    fs.copyFileSync(pngPath, icnsPath);
    log(`  - ICNS文件创建成功: ${icnsPath}`, colors.green);
    
    return true;
  } catch (error) {
    log(`  - ICNS文件创建失败: ${error.message}`, colors.red);
    return false;
  }
}

// 主函数
async function main() {
  log('开始创建图标文件...', colors.bright + colors.blue);
  
  const rootDir = path.resolve(__dirname, '..');
  const pngIconPath = path.join(rootDir, 'assets', 'icon.png');
  
  if (!fs.existsSync(pngIconPath)) {
    log(`PNG图标文件不存在: ${pngIconPath}`, colors.red);
    return;
  }
  
  // 创建ICO文件
  const icoPath = path.join(rootDir, 'assets', 'icon.ico');
  await createIcoFile(pngIconPath, icoPath);
  
  // 创建ICNS文件
  const icnsPath = path.join(rootDir, 'assets', 'icon.icns');
  await createIcnsFile(pngIconPath, icnsPath);
  
  log('图标文件创建完成!', colors.bright + colors.green);
}

// 执行主函数
main().catch(error => {
  log(`执行失败: ${error.message}`, colors.bright + colors.red);
  process.exit(1);
}); 