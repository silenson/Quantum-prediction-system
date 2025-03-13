/**
 * 项目清理脚本
 * 用于删除嵌套目录和临时文件
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('开始清理项目...');

// 获取项目根目录
const rootDir = path.resolve(__dirname, '..');

// 删除嵌套目录
const nestedDir = path.join(rootDir, 'quantum-fortune-teller-master');
if (fs.existsSync(nestedDir)) {
  console.log(`删除嵌套目录: ${nestedDir}`);
  try {
    // 在Windows上使用rd命令递归删除目录
    execSync(`rd /s /q "${nestedDir}"`, { stdio: 'inherit' });
    console.log('嵌套目录已删除');
  } catch (error) {
    console.error('删除嵌套目录时出错:', error.message);
  }
}

// 清理构建目录
const buildDir = path.join(rootDir, 'build');
if (fs.existsSync(buildDir)) {
  console.log(`清理构建目录: ${buildDir}`);
  try {
    execSync(`rd /s /q "${buildDir}"`, { stdio: 'inherit' });
    console.log('构建目录已清理');
  } catch (error) {
    console.error('清理构建目录时出错:', error.message);
  }
}

// 清理dist目录
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  console.log(`清理dist目录: ${distDir}`);
  try {
    execSync(`rd /s /q "${distDir}"`, { stdio: 'inherit' });
    console.log('dist目录已清理');
  } catch (error) {
    console.error('清理dist目录时出错:', error.message);
  }
}

// 删除临时文件
const tempFiles = fs.readdirSync(rootDir)
  .filter(file => file.startsWith('how') || file === 'h' || file === 'h -u origin master' || file.endsWith('.tmp') || file.endsWith('.bak'));

if (tempFiles.length > 0) {
  console.log('删除临时文件:');
  tempFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    try {
      fs.unlinkSync(filePath);
      console.log(`- 已删除: ${file}`);
    } catch (error) {
      console.error(`- 删除 ${file} 时出错:`, error.message);
    }
  });
}

console.log('项目清理完成!'); 