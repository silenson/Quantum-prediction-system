/**
 * 准备GitHub上传脚本
 * 
 * 此脚本用于清理项目，准备上传到GitHub
 * - 删除不必要的文件和目录
 * - 确保所有必要的文件都存在
 * - 检查图标文件
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 项目根目录
const rootDir = __dirname;

// 检查并创建必要的目录
const requiredDirs = ['assets', 'styles'];
requiredDirs.forEach(dir => {
  const dirPath = path.join(rootDir, dir);
  if (!fs.existsSync(dirPath)) {
    console.log(`创建目录: ${dir}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// 检查图标文件
const iconPath = path.join(rootDir, 'assets', 'icon.png');
if (!fs.existsSync(iconPath) || fs.statSync(iconPath).size < 100) {
  console.log('图标文件不存在或大小不正确，创建默认图标');
  
  // 这里我们使用一个简单的命令来创建一个基本的图标
  // 在实际使用中，你可能需要提供一个真实的图标文件
  try {
    // 尝试从public目录复制图标
    const publicIconPath = path.join(rootDir, 'public', 'icon.ico');
    if (fs.existsSync(publicIconPath)) {
      fs.copyFileSync(publicIconPath, iconPath);
      console.log('已从public目录复制图标文件');
    } else {
      console.log('无法找到源图标文件，请手动添加图标');
    }
  } catch (error) {
    console.error('创建图标文件时出错:', error);
  }
}

// 检查package.json
const packageJsonPath = path.join(rootDir, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  console.log('检查package.json...');
  const packageJson = require(packageJsonPath);
  
  // 检查许可证
  if (packageJson.license !== 'MIT') {
    console.log('更新许可证为MIT');
    packageJson.license = 'MIT';
  }
  
  // 检查图标路径
  if (packageJson.build && packageJson.build.win && packageJson.build.win.icon !== 'assets/icon.png') {
    console.log('更新Windows图标路径');
    packageJson.build.win.icon = 'assets/icon.png';
  }
  
  // 保存更新后的package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// 检查README.md
const readmePath = path.join(rootDir, 'README.md');
if (!fs.existsSync(readmePath)) {
  console.log('创建README.md文件');
  const readmeContent = `# 量子运势预测系统\n\n这是一个基于Electron的桌面应用程序，结合了量子物理学概念与传统运势预测方法，为用户提供独特的运势分析体验。\n\n## 安装与运行\n\n\`\`\`\nnpm install\nnpm start\n\`\`\`\n`;
  fs.writeFileSync(readmePath, readmeContent);
}

// 检查LICENSE
const licensePath = path.join(rootDir, 'LICENSE');
if (!fs.existsSync(licensePath)) {
  console.log('创建LICENSE文件');
  const licenseContent = `MIT License\n\nCopyright (c) 2023 量子运势预测系统\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;
  fs.writeFileSync(licensePath, licenseContent);
}

// 检查.gitignore
const gitignorePath = path.join(rootDir, '.gitignore');
if (!fs.existsSync(gitignorePath)) {
  console.log('创建.gitignore文件');
  const gitignoreContent = `# 依赖\nnode_modules/\nnpm-debug.log\nyarn-debug.log\nyarn-error.log\n\n# 构建输出\n/dist\n/build\n\n# 环境变量\n.env\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local\n\n# 编辑器和操作系统文件\n.DS_Store\n.idea/\n.vscode/\n*.swp\n*.swo\n\n# 日志\nlogs\n*.log\n\n# 临时文件\n.tmp/\n.temp/\n\n# 缓存\n.cache/\n`;
  fs.writeFileSync(gitignorePath, gitignoreContent);
}

console.log('项目准备完成，现在可以上传到GitHub了');
console.log('建议执行以下命令：');
console.log('git init');
console.log('git add .');
console.log('git commit -m "初始提交"');
console.log('git remote add origin https://github.com/yourusername/quantum-fortune-teller.git');
console.log('git push -u origin master'); 