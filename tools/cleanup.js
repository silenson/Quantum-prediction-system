/**
 * 项目清理脚本
 * 用于删除嵌套目录和临时文件
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('开始清理项目...');

// 删除嵌套目录
const nestedDir = path.join(__dirname, 'quantum-fortune-teller-master');
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

// 删除临时文件
const tempFiles = fs.readdirSync(__dirname)
  .filter(file => file.startsWith('how') || file === 'h' || file === 'h -u origin master');

if (tempFiles.length > 0) {
  console.log('删除临时文件:');
  tempFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    try {
      fs.unlinkSync(filePath);
      console.log(`- 已删除: ${file}`);
    } catch (error) {
      console.error(`- 删除 ${file} 时出错:`, error.message);
    }
  });
}

console.log('项目清理完成!'); 