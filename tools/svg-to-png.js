/**
 * SVG转PNG工具脚本
 * 使用Sharp库将SVG文件转换为PNG格式
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

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

// 转换SVG到PNG
async function convertSvgToPng(svgPath, pngPath, width = 512, height = 512) {
  try {
    log(`转换 ${svgPath} 到 ${pngPath}`, colors.cyan);
    
    // 读取SVG文件
    const svgBuffer = fs.readFileSync(svgPath);
    
    // 使用Sharp转换
    await sharp(svgBuffer)
      .resize(width, height)
      .png()
      .toFile(pngPath);
    
    log(`  - 转换成功: ${pngPath}`, colors.green);
    return true;
  } catch (error) {
    log(`  - 转换失败: ${error.message}`, colors.red);
    return false;
  }
}

// 批量转换目录中的SVG文件
async function convertDirectory(sourceDir, targetDir, options = {}) {
  // 确保目标目录存在
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // 获取所有SVG文件
  const files = fs.readdirSync(sourceDir)
    .filter(file => file.toLowerCase().endsWith('.svg'));
  
  if (files.length === 0) {
    log(`没有找到SVG文件: ${sourceDir}`, colors.yellow);
    return;
  }
  
  log(`找到 ${files.length} 个SVG文件`, colors.blue);
  
  // 转换每个文件
  for (const file of files) {
    const svgPath = path.join(sourceDir, file);
    const pngPath = path.join(targetDir, file.replace('.svg', '.png'));
    
    await convertSvgToPng(
      svgPath, 
      pngPath, 
      options.width || 512, 
      options.height || 512
    );
  }
}

// 创建图标文件
async function createIcons() {
  const rootDir = path.resolve(__dirname, '..');
  const svgIconPath = path.join(rootDir, 'assets', 'icons', 'icon.svg');
  
  if (!fs.existsSync(svgIconPath)) {
    log(`图标文件不存在: ${svgIconPath}`, colors.red);
    return;
  }
  
  // 创建PNG图标
  const pngIconPath = path.join(rootDir, 'assets', 'icon.png');
  await convertSvgToPng(svgIconPath, pngIconPath, 512, 512);
  
  // 复制SVG图标到根目录
  fs.copyFileSync(svgIconPath, path.join(rootDir, 'assets', 'icon.svg'));
  log(`  - 已复制SVG图标到assets目录`, colors.dim);
}

// 主函数
async function main() {
  log('开始转换SVG文件...', colors.bright + colors.blue);
  
  const rootDir = path.resolve(__dirname, '..');
  
  // 转换图标
  await createIcons();
  
  // 转换images目录中的SVG
  const imagesDir = path.join(rootDir, 'assets', 'images');
  if (fs.existsSync(imagesDir)) {
    await convertDirectory(imagesDir, imagesDir);
  }
  
  log('转换完成!', colors.bright + colors.green);
}

// 执行主函数
main().catch(error => {
  log(`执行失败: ${error.message}`, colors.bright + colors.red);
  process.exit(1);
}); 