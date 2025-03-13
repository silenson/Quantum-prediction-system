const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const QuantumEngine = require('./quantum-engine');
const config = require('./config');

// 设置控制台编码
process.env.LANG = 'zh_CN.UTF-8';
if (process.platform === 'win32') {
  process.env.LESSCHARSET = 'utf-8';
}

// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let mainWindow;

// 创建量子引擎实例
const quantumEngine = new QuantumEngine({
  apiKey: process.env.GUODUN_QUANTUM_API_KEY || config.quantum.apiKey,
  useRealQuantum: true, // 始终使用真实量子计算
  quantumDevice: 'quantum_computer', // 始终使用真实量子计算机
  apiBaseUrl: config.quantum.apiBaseUrl,
  apiVersion: config.quantum.apiVersion,
  projectId: config.quantum.projectId,
  maxQubits: config.quantum.maxQubits
});

// API设置文件路径
const apiSettingsPath = path.join(app.getPath('userData'), 'api-settings.json');

// 加载API设置
function loadApiSettings() {
  try {
    if (fs.existsSync(apiSettingsPath)) {
      const data = fs.readFileSync(apiSettingsPath, 'utf8');
      const settings = JSON.parse(data);
      
      // 更新配置
      if (settings.apiKey) {
        config.quantum.apiKey = settings.apiKey;
        quantumEngine.guodunQuantumClient.apiKey = settings.apiKey;
      }
      
      console.log('已加载API设置');
      return settings;
    }
  } catch (error) {
    console.error('加载API设置时出错:', error);
  }
  
  return {
    apiKey: config.quantum.apiKey
  };
}

// 保存API设置
function saveApiSettings(settings) {
  try {
    // 确保目录存在
    const userDataPath = app.getPath('userData');
    if (!fs.existsSync(userDataPath)) {
      fs.mkdirSync(userDataPath, { recursive: true });
    }
    
    // 保存设置
    fs.writeFileSync(apiSettingsPath, JSON.stringify(settings, null, 2), 'utf8');
    
    // 更新配置
    if (settings.apiKey) {
      config.quantum.apiKey = settings.apiKey;
      quantumEngine.guodunQuantumClient.apiKey = settings.apiKey;
    }
    
    console.log('已保存API设置');
    return true;
  } catch (error) {
    console.error('保存API设置时出错:', error);
    return false;
  }
}

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    title: '量子运势预测系统'
  });

  // 加载应用的index.html
  mainWindow.loadFile('index.html');

  // 设置窗口标题
  mainWindow.setTitle('量子运势预测系统');

  // 设置窗口的编码
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.setZoomFactor(1);
    mainWindow.webContents.setVisualZoomLevelLimits(1, 1);
  });

  // 开发环境下打开开发者工具
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // 当window被关闭时，触发下面的事件
  mainWindow.on('closed', function () {
    // 取消引用window对象，如果你的应用支持多窗口的话，
    // 通常会把多个window对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    mainWindow = null;
  });
}

// 确保assets目录存在
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir);
}

// 当Electron完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(() => {
  // 设置应用程序的名称
  if (app.setName) {
    app.setName('量子运势预测系统');
  }
  
  // 设置正确的中文编码
  if (process.platform === 'win32') {
    app.commandLine.appendSwitch('lang', 'zh-CN');
    app.commandLine.appendSwitch('force-chinese-ime', 'true');
  }
  
  // 加载API设置
  loadApiSettings();
  
  createWindow();

  app.on('activate', function () {
    // 在macOS上，当点击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 当所有窗口关闭时退出应用
app.on('window-all-closed', function () {
  // 在macOS上，除非用户用Cmd + Q确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') app.quit();
});

// 在这个文件中，你可以包含应用程序剩余的所有部分的代码，
// 也可以拆分成几个文件，然后用require导入。

// 处理量子预测请求
ipcMain.handle('predict', async (event, data) => {
  try {
    console.log('收到预测请求:', data);
    
    // 验证输入数据
    if (!data || !data.timeSpan) {
      throw new Error('无效的预测请求数据');
    }
    
    // 检查API密钥是否已设置
    if (!config.quantum.apiKey) {
      throw new Error('请先设置国盾量子API密钥');
    }
    
    // 获取预测结果
    const result = await quantumEngine.getFortunePrediction(data.timeSpan, data.birthDate);
    
    console.log('预测结果:', {
      fortune: result.fortune,
      usingRealQuantum: result.usingRealQuantum,
      quantumProvider: result.quantumProvider
    });
    
    return result;
  } catch (error) {
    console.error('预测过程中出错:', error);
    throw error;
  }
});

// 处理获取量子电路数据请求
ipcMain.handle('getQuantumCircuit', async (event) => {
  try {
    console.log('收到获取量子电路数据请求');
    
    // 获取量子电路数据
    const result = await quantumEngine.getQuantumCircuit();
    
    console.log('量子电路数据已获取');
    
    return result;
  } catch (error) {
    console.error('获取量子电路数据过程中出错:', error);
    throw error;
  }
});

// 获取量子设备列表
ipcMain.handle('getQuantumDevices', async () => {
  try {
    // 使用国盾量子客户端获取设备列表
    const devices = await quantumEngine.guodunQuantumClient.getAvailableDevices();
    return {
      devices: devices,
      currentDevice: 'quantum_computer',
      usingRealQuantum: true
    };
  } catch (error) {
    console.error('获取量子设备列表时出错:', error);
    return {
      devices: [
        { id: 'quantum_computer', name: '国盾量子计算机', type: 'quantum', available: true }
      ],
      currentDevice: 'quantum_computer',
      usingRealQuantum: true
    };
  }
});

// 获取API设置
ipcMain.handle('getApiSettings', async () => {
  try {
    return loadApiSettings();
  } catch (error) {
    console.error('获取API设置时出错:', error);
    return {
      apiKey: ''
    };
  }
});

// 保存API设置
ipcMain.handle('saveApiSettings', async (event, settings) => {
  try {
    // 验证设置
    if (!settings || !settings.apiKey) {
      throw new Error('API密钥不能为空');
    }
    
    // 保存设置
    const success = saveApiSettings(settings);
    
    return {
      success: success,
      message: success ? 'API设置已保存' : '保存API设置失败'
    };
  } catch (error) {
    console.error('保存API设置时出错:', error);
    return {
      success: false,
      message: `保存失败: ${error.message}`
    };
  }
});

// 测试API连接
ipcMain.handle('testApiConnection', async (event, settings) => {
  try {
    // 验证设置
    if (!settings || !settings.apiKey) {
      throw new Error('API密钥不能为空');
    }
    
    // 创建临时客户端进行测试
    const tempClient = quantumEngine.createTemporaryClient(settings.apiKey);
    
    // 测试连接
    const devices = await tempClient.getAvailableDevices();
    
    // 如果没有抛出异常，则连接成功
    return {
      success: true,
      message: '成功连接到国盾量子API',
      device: devices.find(d => d.id === 'quantum_computer') || devices[0]
    };
  } catch (error) {
    console.error('测试API连接时出错:', error);
    return {
      success: false,
      message: `连接失败: ${error.message}`
    };
  }
}); 