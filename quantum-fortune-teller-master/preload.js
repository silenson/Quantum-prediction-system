// 预加载脚本
const { contextBridge, ipcRenderer } = require('electron');

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('quantumAPI', {
  // 发送预测请求到主进程
  predict: async (data) => {
    try {
      // 验证输入数据
      if (!data || !data.timeSpan) {
        throw new Error('无效的预测请求数据');
      }
      
      // 调用主进程的predict方法
      return await ipcRenderer.invoke('predict', data);
    } catch (error) {
      console.error('预测请求失败:', error);
      throw new Error(`预测失败: ${error.message}`);
    }
  },
  
  // 获取当前日期和时间
  getCurrentDateTime: () => {
    const now = new Date();
    return {
      date: now.toLocaleDateString('zh-CN'),
      time: now.toLocaleTimeString('zh-CN')
    };
  },
  
  // 计算生物节律
  calculateBiorhythm: (birthDate) => {
    try {
      if (!birthDate) return null;
      
      const birth = new Date(birthDate);
      const today = new Date();
      
      // 计算出生至今的天数
      const days = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
      
      // 计算三种生物节律
      const physical = Math.sin(2 * Math.PI * days / 23);
      const emotional = Math.sin(2 * Math.PI * days / 28);
      const intellectual = Math.sin(2 * Math.PI * days / 33);
      
      return {
        physical: (physical + 1) / 2, // 转换到[0,1]范围
        emotional: (emotional + 1) / 2,
        intellectual: (intellectual + 1) / 2,
        days: days
      };
    } catch (error) {
      console.error('计算生物节律时出错:', error);
      return null;
    }
  },
  
  // 获取量子设备列表
  getQuantumDevices: async () => {
    try {
      return await ipcRenderer.invoke('getQuantumDevices');
    } catch (error) {
      console.error('获取量子设备列表失败:', error);
      throw new Error(`获取量子设备列表失败: ${error.message}`);
    }
  },
  
  // 获取API设置
  getApiSettings: async () => {
    try {
      return await ipcRenderer.invoke('getApiSettings');
    } catch (error) {
      console.error('获取API设置失败:', error);
      throw new Error(`获取API设置失败: ${error.message}`);
    }
  },
  
  // 保存API设置
  saveApiSettings: async (settings) => {
    try {
      if (!settings || !settings.apiKey) {
        throw new Error('API密钥不能为空');
      }
      
      return await ipcRenderer.invoke('saveApiSettings', settings);
    } catch (error) {
      console.error('保存API设置失败:', error);
      throw new Error(`保存API设置失败: ${error.message}`);
    }
  },
  
  // 测试API连接
  testApiConnection: async (settings) => {
    try {
      if (!settings || !settings.apiKey) {
        throw new Error('API密钥不能为空');
      }
      
      return await ipcRenderer.invoke('testApiConnection', settings);
    } catch (error) {
      console.error('测试API连接失败:', error);
      throw new Error(`测试API连接失败: ${error.message}`);
    }
  },
  
  // 获取量子电路数据
  getQuantumCircuit: async () => {
    try {
      return await ipcRenderer.invoke('getQuantumCircuit');
    } catch (error) {
      console.error('获取量子电路数据失败:', error);
      throw new Error(`获取量子电路数据失败: ${error.message}`);
    }
  }
}); 