// 量子预测系统配置文件

// 国盾量子计算API配置
const quantumConfig = {
  // 国盾量子API密钥
  // 注意：在生产环境中，应该使用环境变量或安全的密钥管理系统存储API密钥
  apiKey: process.env.GUODUN_QUANTUM_API_KEY || '',
  
  // 国盾量子计算机配置
  // 系统将始终连接国盾量子真实量子计算机
  useRealQuantum: true, // 始终使用真实量子计算
  
  // 量子设备配置
  quantumDevice: 'quantum_computer', // 始终使用真实量子计算机
  
  // API配置
  apiBaseUrl: 'https://quantum.guoduny.com/api', // 国盾量子API基础URL
  apiVersion: 'v1',
  
  // 国盾量子特有配置
  projectId: 'default',
  
  // 最大量子比特数
  maxQubits: 10 // 国盾量子计算机支持的最大量子比特数
};

// 应用通用配置
const appConfig = {
  // 缓存配置
  cacheExpiryTime: 5 * 60 * 1000, // 缓存过期时间（毫秒）
  
  // 预测配置
  predictionTimeSpans: [
    { id: 'day', name: '今日运势' },
    { id: 'week', name: '本周运势' },
    { id: 'month', name: '本月运势' },
    { id: 'year', name: '年度运势' }
  ],
  
  // 量子比特配置
  defaultNumQubits: 4, // 默认使用的量子比特数量
  
  // 调试模式
  debug: process.env.NODE_ENV !== 'production',
  
  // 应用配置
  appName: '量子运势预测系统',
  appVersion: '1.0.0',
  
  // 界面配置
  ui: {
    theme: 'quantum',
    animations: true,
    showAdvancedIndicators: true,
    blochSphereAnimation: true
  }
};

module.exports = {
  quantum: quantumConfig,
  app: appConfig
}; 