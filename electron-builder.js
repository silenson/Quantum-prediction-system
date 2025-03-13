/**
 * 量子运势预测系统 electron-builder 配置
 * 用于创建安装程序
 */

const builder = require('electron-builder');
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

// 构建配置
const config = {
  appId: 'com.silenson.quantum-fortune-teller',
  productName: '量子运势预测系统',
  copyright: `Copyright © ${new Date().getFullYear()} Silenson`,
  
  // 构建目录
  directories: {
    output: path.join(__dirname, 'dist'),
    app: path.join(__dirname, 'build')
  },
  
  // 文件
  files: [
    '**/*',
    '!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}',
    '!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}',
    '!**/node_modules/*.d.ts',
    '!**/node_modules/.bin',
    '!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}',
    '!.editorconfig',
    '!**/._*',
    '!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}',
    '!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}',
    '!**/{appveyor.yml,.travis.yml,circle.yml}',
    '!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}'
  ],
  
  // Windows配置
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64']
      }
    ],
    icon: path.join(__dirname, 'assets', 'icon.ico')
  },
  
  // macOS配置
  mac: {
    target: ['dmg'],
    icon: path.join(__dirname, 'assets', 'icon.icns'),
    category: 'public.app-category.lifestyle'
  },
  
  // Linux配置
  linux: {
    target: ['AppImage', 'deb'],
    icon: path.join(__dirname, 'assets', 'icon.png'),
    category: 'Utility'
  },
  
  // NSIS配置 (Windows安装程序)
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: '量子运势预测系统',
    installerIcon: path.join(__dirname, 'assets', 'icon.ico'),
    uninstallerIcon: path.join(__dirname, 'assets', 'icon.ico'),
    installerHeaderIcon: path.join(__dirname, 'assets', 'icon.ico')
  },
  
  // DMG配置 (macOS安装程序)
  dmg: {
    contents: [
      {
        x: 130,
        y: 220
      },
      {
        x: 410,
        y: 220,
        type: 'link',
        path: '/Applications'
      }
    ],
    window: {
      width: 540,
      height: 380
    }
  },
  
  // 发布配置
  publish: {
    provider: 'github',
    owner: 'silenson',
    repo: 'quantum-fortune-teller'
  }
};

// 主函数
async function main() {
  log('开始创建安装程序...', colors.bright + colors.blue);
  log(`版本: ${packageJson.version}`, colors.bright + colors.blue);
  
  try {
    const result = await builder.build({
      config: config
    });
    
    log('安装程序创建成功!', colors.bright + colors.green);
    log(`输出文件:`, colors.green);
    for (const file of result) {
      log(`  - ${file}`, colors.dim);
    }
  } catch (error) {
    log(`创建安装程序失败: ${error.message}`, colors.bright + colors.red);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

// 导出配置，以便其他脚本使用
module.exports = config; 