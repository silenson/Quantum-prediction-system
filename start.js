const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// 设置开发环境
process.env.NODE_ENV = 'development';
// 设置控制台编码
process.env.LANG = 'zh_CN.UTF-8';
process.env.LC_ALL = 'zh_CN.UTF-8';
process.env.LESSCHARSET = 'utf-8';

// 在Windows平台上设置代码页
if (process.platform === 'win32') {
  // 尝试设置控制台代码页为UTF-8
  try {
    require('child_process').execSync('chcp 65001', { stdio: 'ignore' });
  } catch (err) {
    console.error('设置控制台代码页失败:', err);
  }
}

// 获取 electron 可执行文件路径
const electronPath = require('electron');

// 启动Electron应用
console.log('正在启动量子运势预测系统...');
const child = spawn(electronPath, ['.'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    ELECTRON_ENABLE_LOGGING: 1,
    ELECTRON_ENABLE_STACK_DUMPING: 1,
    ELECTRON_NO_ASAR: 1
  }
});

child.on('close', (code) => {
  console.log(`应用退出，退出码: ${code}`);
  process.exit(code);
}); 