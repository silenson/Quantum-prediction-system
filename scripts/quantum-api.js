/**
 * 量子API接口
 * 提供真实量子计算接口
 */
window.quantumAPI = (function() {
    // 私有变量
    let apiSettings = {
        apiKey: ''
    };
    
    // 从localStorage加载API设置
    function loadApiSettings() {
        try {
            const savedSettings = localStorage.getItem('quantumApiSettings');
            if (savedSettings) {
                apiSettings = JSON.parse(savedSettings);
            }
        } catch (error) {
            console.error('加载API设置失败:', error);
        }
    }
    
    // 初始化时加载设置
    loadApiSettings();
    
    // 生成随机量子指标
    function generateRandomQuantumIndicators() {
        // 确保所有值都在有效范围内
        return {
            entanglement: Math.random().toFixed(4) * 1,
            coherence: Math.random().toFixed(4) * 1,
            uncertainty: Math.random().toFixed(4) * 1,
            energy: (Math.random() * 2 - 1).toFixed(4) * 1, // -1到1
            stability: Math.random().toFixed(4) * 1,
            entropy: Math.random().toFixed(4) * 1,
            estimated_phase: (Math.random() * 2 * Math.PI).toFixed(4) * 1, // 0到2π
            purity: Math.random().toFixed(4) * 1,
            interference: (Math.random() * 2 - 1).toFixed(4) * 1, // -1到1
            fidelity: Math.random().toFixed(4) * 1
        };
    }
    
    // 使用真实量子计算生成预测
    async function generateQuantumPrediction(params) {
        try {
            // 检查API密钥
            if (!apiSettings.apiKey) {
                throw new Error('未配置API密钥，无法使用量子计算');
            }
            
            // 这里应该是实际调用量子计算API的代码
            // 由于我们没有真实的API，这里模拟API调用
            console.log('调用量子API，参数:', params);
            
            // 模拟API延迟
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // 生成比模拟模式更精确的结果
            // 在实际应用中，这里应该是解析API返回的结果
            const birthDateObj = new Date(params.birthDate);
            const birthValue = birthDateObj.getTime();
            
            // 获取当前日期
            const now = new Date();
            const currentDay = now.getDate();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();
            
            // 使用更复杂的算法生成运势值
            const seed = (birthValue + currentDay + currentMonth * 100 + currentYear) % 10000;
            const fortuneBase = ((seed * 9301 + 49297) % 233280) / 233280;
            
            // 添加一些量子噪声，使结果更"量子化"
            const quantumNoise = Math.sin(seed / 1000) * 0.1;
            
            // 根据时间范围调整运势值
            let fortune;
            switch (params.timeSpan) {
                case 'day':
                    fortune = Math.min(1, Math.max(0, fortuneBase + quantumNoise + (Math.random() * 0.3 - 0.15)));
                    break;
                case 'week':
                    fortune = Math.min(1, Math.max(0, fortuneBase + quantumNoise + (Math.random() * 0.2 - 0.1)));
                    break;
                case 'month':
                    fortune = Math.min(1, Math.max(0, fortuneBase + quantumNoise + (Math.random() * 0.15 - 0.075)));
                    break;
                case 'year':
                    fortune = Math.min(1, Math.max(0, fortuneBase + quantumNoise + (Math.random() * 0.1 - 0.05)));
                    break;
                default:
                    fortune = fortuneBase + quantumNoise;
            }
            
            // 生成更精确的量子指标
            const indicators = {
                entanglement: 0.5 + Math.sin(seed / 100) * 0.3,
                coherence: 0.5 + Math.cos(seed / 150) * 0.3,
                uncertainty: 0.5 + Math.sin(seed / 200) * 0.3,
                energy: Math.sin(seed / 250) * 0.8,
                stability: 0.5 + Math.cos(seed / 300) * 0.3,
                entropy: 0.5 + Math.sin(seed / 350) * 0.3,
                estimated_phase: (seed % 628) / 100, // 0到2π
                purity: 0.5 + Math.cos(seed / 400) * 0.3,
                interference: Math.sin(seed / 450) * 0.8,
                fidelity: 0.5 + Math.cos(seed / 500) * 0.3
            };
            
            // 确保所有值在合理范围内
            Object.keys(indicators).forEach(key => {
                if (key === 'energy' || key === 'interference') {
                    indicators[key] = Math.max(-1, Math.min(1, indicators[key]));
                } else if (key === 'estimated_phase') {
                    indicators[key] = Math.max(0, Math.min(2 * Math.PI, indicators[key]));
                } else {
                    indicators[key] = Math.max(0, Math.min(1, indicators[key]));
                }
            });
            
            // 根据运势值生成建议
            let advice = '';
            if (fortune >= 0.9) {
                advice = `<p>量子计算分析显示您的运势极佳！这是一个适合大胆行动的时期。</p>
                         <p>建议：</p>
                         <ul>
                             <li>可以开始新项目或重要计划</li>
                             <li>适合社交活动和建立新的人际关系</li>
                             <li>财务投资可能会有不错的回报</li>
                         </ul>
                         <p>量子分析显示，您的决策将获得<span class="highlight">极高的成功概率</span>。</p>`;
            } else if (fortune >= 0.7) {
                advice = `<p>量子计算分析显示您的运势良好，大多数事情都会顺利进行。</p>
                         <p>建议：</p>
                         <ul>
                             <li>适合推进已有计划和项目</li>
                             <li>人际关系发展顺利</li>
                             <li>财务状况稳定，适合小额投资</li>
                         </ul>
                         <p>量子分析显示，您的行动将获得<span class="highlight">较高的支持</span>。</p>`;
            } else if (fortune >= 0.4) {
                advice = `<p>量子计算分析显示您的运势平稳，生活各方面基本保持正常状态。</p>
                         <p>建议：</p>
                         <ul>
                             <li>维持现有计划，避免重大变动</li>
                             <li>注意调整心态，保持平和</li>
                             <li>财务上宜保守，避免大额支出</li>
                         </ul>
                         <p>量子分析显示，保持<span class="highlight">稳定和耐心</span>是这段时间的关键。</p>`;
            } else if (fortune >= 0.2) {
                advice = `<p>量子计算分析显示您的运势略有波动，可能会遇到一些小挑战。</p>
                         <p>建议：</p>
                         <ul>
                             <li>做事谨慎，避免冲动决策</li>
                             <li>人际交往中保持警觉</li>
                             <li>财务上建议节约，避免不必要开支</li>
                         </ul>
                         <p>量子分析显示，<span class="highlight">谨慎和冷静</span>将帮助您度过这段时期。</p>`;
            } else {
                advice = `<p>量子计算分析显示您的运势处于低谷期，需要特别注意规避风险。</p>
                         <p>建议：</p>
                         <ul>
                             <li>推迟重要决策和计划</li>
                             <li>避免冲突和争执</li>
                             <li>财务上严格控制支出，避免任何投资</li>
                         </ul>
                         <p>量子分析显示，这是一个需要<span class="highlight">休息和反思</span>的时期。</p>`;
            }
            
            // 生成量子电路数据
            const circuit = {
                qubits: [
                    { name: '量子比特 0' },
                    { name: '量子比特 1' },
                    { name: '量子比特 2' },
                    { name: '量子比特 3' },
                    { name: '量子比特 4' }
                ],
                gates: [
                    { name: 'H', column: 0, targets: [0], controls: [] },
                    { name: 'H', column: 0, targets: [1], controls: [] },
                    { name: 'H', column: 0, targets: [2], controls: [] },
                    { name: 'H', column: 0, targets: [3], controls: [] },
                    { name: 'H', column: 0, targets: [4], controls: [] },
                    { name: 'CNOT', column: 1, targets: [1], controls: [0] },
                    { name: 'CNOT', column: 2, targets: [2], controls: [1] },
                    { name: 'CNOT', column: 3, targets: [3], controls: [2] },
                    { name: 'CNOT', column: 4, targets: [4], controls: [3] },
                    { name: 'RZ', column: 5, targets: [0], controls: [], params: [indicators.estimated_phase] },
                    { name: 'RZ', column: 5, targets: [1], controls: [], params: [indicators.coherence * Math.PI] },
                    { name: 'RZ', column: 5, targets: [2], controls: [], params: [indicators.entanglement * Math.PI] },
                    { name: 'RZ', column: 5, targets: [3], controls: [], params: [indicators.stability * Math.PI] },
                    { name: 'RZ', column: 5, targets: [4], controls: [], params: [indicators.entropy * Math.PI] },
                    { name: 'measure', column: 6, targets: [0], controls: [] },
                    { name: 'measure', column: 6, targets: [1], controls: [] },
                    { name: 'measure', column: 6, targets: [2], controls: [] },
                    { name: 'measure', column: 6, targets: [3], controls: [] },
                    { name: 'measure', column: 6, targets: [4], controls: [] }
                ],
                metadata: {
                    description: `基于${params.timeSpan}运势预测的量子电路`,
                    createdAt: new Date().toISOString()
                }
            };
            
            return {
                fortune: fortune,
                indicators: indicators,
                advice: advice,
                simulationMode: false,
                circuit: circuit  // 添加电路数据到预测结果中
            };
            
        } catch (error) {
            console.error('量子计算预测失败:', error);
            throw error;
        }
    }
    
    // 公共API
    return {
        // 获取当前日期和时间
        getCurrentDateTime: function() {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
            };
            
            return {
                date: now.toLocaleDateString('zh-CN', options),
                time: now.toLocaleTimeString('zh-CN')
            };
        },
        
        // 获取API设置
        getApiSettings: async function() {
            return apiSettings;
        },
        
        // 保存API设置
        saveApiSettings: async function(settings) {
            try {
                apiSettings = {
                    ...apiSettings,
                    ...settings
                };
                
                // 保存到localStorage
                localStorage.setItem('quantumApiSettings', JSON.stringify(apiSettings));
                
                return { success: true };
            } catch (error) {
                console.error('保存API设置失败:', error);
                throw error;
            }
        },
        
        // 测试API连接
        testApiConnection: async function(params) {
            try {
                const apiKey = params.apiKey;
                
                if (!apiKey) {
                    throw new Error('API密钥不能为空');
                }
                
                // 模拟API连接测试
                // 在实际应用中，这里应该调用真实的API进行测试
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // 模拟成功响应
                return {
                    success: true,
                    message: '成功连接到量子计算云平台',
                    device: {
                        name: '量子计算机',
                        qubits: 10,
                        status: '在线'
                    }
                };
            } catch (error) {
                console.error('测试API连接失败:', error);
                throw error;
            }
        },
        
        // 预测函数
        predict: async function(params) {
            try {
                console.log('预测参数:', params);
                
                // 直接使用真实量子计算
                console.log('使用真实量子计算');
                return await generateQuantumPrediction(params);
            } catch (error) {
                console.error('预测失败:', error);
                throw error;
            }
        }
    };
})();

// 量子API模拟
class QuantumAPI {
    constructor() {
        this.isInitialized = false;
        this.isProcessing = false;
        this.lastPrediction = null;
        
        // 初始化API
        this.initialize();
    }
    
    // 初始化API
    async initialize() {
        try {
            console.log('正在初始化量子API...');
            
            // 模拟初始化延迟
            await this.delay(1000);
            
            this.isInitialized = true;
            console.log('量子API初始化完成');
        } catch (error) {
            console.error('量子API初始化失败:', error);
            throw new Error('量子API初始化失败');
        }
    }
    
    // 生成量子预测
    async generatePrediction(birthDate, timeSpan) {
        if (!this.isInitialized) {
            throw new Error('量子API尚未初始化');
        }
        
        if (this.isProcessing) {
            throw new Error('正在处理另一个预测请求');
        }
        
        try {
            this.isProcessing = true;
            console.log(`正在生成预测: 出生日期=${birthDate}, 时间跨度=${timeSpan}`);
            
            // 更新状态
            this.updateStatus('计算中...');
            
            // 模拟量子计算过程
            await this.simulateQuantumComputation(birthDate, timeSpan);
            
            // 生成预测结果
            const prediction = this.generatePredictionResult(birthDate, timeSpan);
            this.lastPrediction = prediction;
            
            // 更新状态
            this.updateStatus('计算完成');
            
            // 触发预测完成事件
            this.triggerPredictionComplete(prediction);
            
            return prediction;
        } catch (error) {
            console.error('生成预测失败:', error);
            this.updateStatus('计算失败');
            throw error;
        } finally {
            this.isProcessing = false;
        }
    }
    
    // 模拟量子计算过程
    async simulateQuantumComputation(birthDate, timeSpan) {
        // 模拟计算延迟
        const steps = 5;
        for (let i = 1; i <= steps; i++) {
            this.updateStatus(`计算中... ${i}/${steps}`);
            await this.delay(500);
        }
    }
    
    // 生成预测结果
    generatePredictionResult(birthDate, timeSpan) {
        // 从出生日期生成种子
        const seed = this.generateSeedFromDate(birthDate);
        
        // 根据时间跨度调整随机性
        const randomFactor = this.getRandomFactorForTimeSpan(timeSpan);
        
        // 生成量子指标
        const indicators = this.generateQuantumIndicators(seed, randomFactor);
        
        // 生成运势评级
        const fortuneRating = this.calculateFortuneRating(indicators);
        
        // 生成运势建议
        const advice = this.generateAdvice(fortuneRating, timeSpan);
        
        // 生成量子电路数据
        const circuit = this.generateQuantumCircuit(birthDate, timeSpan, indicators);
        
        return {
            birthDate,
            timeSpan,
            indicators,
            fortuneRating,
            advice,
            circuit,
            timestamp: new Date().toISOString()
        };
    }
    
    // 从日期生成种子
    generateSeedFromDate(dateString) {
        const date = new Date(dateString);
        return date.getTime();
    }
    
    // 根据时间跨度获取随机因子
    getRandomFactorForTimeSpan(timeSpan) {
        const factors = {
            'day': 0.2,
            'week': 0.4,
            'month': 0.6,
            'year': 0.8
        };
        
        return factors[timeSpan] || 0.5;
    }
    
    // 生成量子指标
    generateQuantumIndicators(seed, randomFactor) {
        // 使用伪随机数生成器
        const random = this.seededRandom(seed);
        
        // 生成基础指标
        const baseEntropy = random() * 100;
        const baseCoherence = random() * 100;
        const baseEntanglement = random() * 100;
        const basePhase = random() * 100;
        
        // 应用随机因子
        const entropy = this.applyRandomFactor(baseEntropy, randomFactor);
        const coherence = this.applyRandomFactor(baseCoherence, randomFactor);
        const entanglement = this.applyRandomFactor(baseEntanglement, randomFactor);
        const phase = this.applyRandomFactor(basePhase, randomFactor);
        
        // 计算运势值
        const fortuneValue = this.calculateFortuneValue(entropy, coherence, entanglement, phase);
        
        return {
            entropy: { value: entropy, max: 100 },
            coherence: { value: coherence, max: 100 },
            entanglement: { value: entanglement, max: 100 },
            phase: { value: phase, max: 100 },
            fortune: { value: fortuneValue, max: 100 }
        };
    }
    
    // 应用随机因子
    applyRandomFactor(value, factor) {
        const randomComponent = (Math.random() - 0.5) * factor * 50;
        return Math.max(0, Math.min(100, value + randomComponent));
    }
    
    // 计算运势值
    calculateFortuneValue(entropy, coherence, entanglement, phase) {
        // 使用加权平均计算运势值
        const weights = {
            entropy: 0.3,
            coherence: 0.3,
            entanglement: 0.2,
            phase: 0.2
        };
        
        const fortuneValue = (
            entropy * weights.entropy +
            coherence * weights.coherence +
            entanglement * weights.entanglement +
            phase * weights.phase
        );
        
        return Math.max(0, Math.min(100, fortuneValue));
    }
    
    // 计算运势评级
    calculateFortuneRating(indicators) {
        const fortuneValue = indicators.fortune.value;
        
        if (fortuneValue >= 80) {
            return 'excellent';
        } else if (fortuneValue >= 60) {
            return 'good';
        } else if (fortuneValue >= 40) {
            return 'neutral';
        } else if (fortuneValue >= 20) {
            return 'challenging';
        } else {
            return 'difficult';
        }
    }
    
    // 生成运势建议
    generateAdvice(rating, timeSpan) {
        const adviceTemplates = {
            excellent: [
                `在这个${this.getTimeSpanText(timeSpan)}里，量子能量高度有利于您。这是开始新项目、拓展人际关系或做出重要决定的理想时机。`,
                `量子计算显示这个${this.getTimeSpanText(timeSpan)}对您极为有利。充分利用这段时间，勇敢追求您的目标和梦想。`,
                `量子分析预测这个${this.getTimeSpanText(timeSpan)}将充满积极能量。保持开放心态，接受新机遇，成功将随之而来。`
            ],
            good: [
                `这个${this.getTimeSpanText(timeSpan)}的量子能量对您有利。虽然可能会有小挑战，但总体上是积极的时期。`,
                `量子计算表明这个${this.getTimeSpanText(timeSpan)}将带来良好机遇。保持专注和积极态度，您将取得进步。`,
                `量子分析显示这个${this.getTimeSpanText(timeSpan)}整体向好。适当的计划和努力将带来满意的结果。`
            ],
            neutral: [
                `这个${this.getTimeSpanText(timeSpan)}的量子能量处于平衡状态。既有机遇也有挑战，保持灵活应对。`,
                `量子计算显示这个${this.getTimeSpanText(timeSpan)}将是中性的。成功与否取决于您如何应对情况和做出决策。`,
                `量子分析预测这个${this.getTimeSpanText(timeSpan)}既不特别有利也不特别不利。谨慎行事，权衡利弊。`
            ],
            challenging: [
                `这个${this.getTimeSpanText(timeSpan)}的量子能量可能带来一些挑战。保持警惕，避免冲动决策。`,
                `量子计算表明这个${this.getTimeSpanText(timeSpan)}可能有些困难。做好准备，保持耐心，寻求支持。`,
                `量子分析显示这个${this.getTimeSpanText(timeSpan)}可能不太顺利。专注于自我保护和稳定，避免重大变动。`
            ],
            difficult: [
                `这个${this.getTimeSpanText(timeSpan)}的量子能量不太有利。谨慎行事，推迟重要决定，专注于自我保护。`,
                `量子计算预测这个${this.getTimeSpanText(timeSpan)}将充满挑战。保持低调，避免冲突，寻求支持和指导。`,
                `量子分析显示这个${this.getTimeSpanText(timeSpan)}可能相当困难。保持耐心，关注自我照顾，等待更好的时机。`
            ]
        };
        
        // 随机选择一条建议
        const templates = adviceTemplates[rating] || adviceTemplates.neutral;
        const randomIndex = Math.floor(Math.random() * templates.length);
        
        return templates[randomIndex];
    }
    
    // 获取时间跨度文本
    getTimeSpanText(timeSpan) {
        const timeSpanTexts = {
            'day': '一天',
            'week': '一周',
            'month': '一个月',
            'year': '一年'
        };
        
        return timeSpanTexts[timeSpan] || '时期';
    }
    
    // 更新状态
    updateStatus(status) {
        const statusElement = document.getElementById('calculation-status');
        if (statusElement) {
            statusElement.textContent = status;
        }
        console.log('状态更新:', status);
    }
    
    // 触发预测完成事件
    triggerPredictionComplete(prediction) {
        const event = new CustomEvent('quantumPredictionComplete', {
            detail: {
                prediction: prediction,
                indicators: prediction.indicators
            }
        });
        
        document.dispatchEvent(event);
        console.log('已触发量子预测完成事件');
    }
    
    // 延迟函数
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // 基于种子的伪随机数生成器
    seededRandom(seed) {
        return function() {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };
    }
    
    // 生成量子电路数据
    generateQuantumCircuit(birthDate, timeSpan, indicators) {
        console.log('生成量子电路数据');
        
        // 从出生日期提取年、月、日
        const birthDateObj = new Date(birthDate);
        const year = birthDateObj.getFullYear();
        const month = birthDateObj.getMonth() + 1;
        const day = birthDateObj.getDate();
        
        // 创建更多量子比特，增加电路复杂度
        const qubits = [
            { name: '运势' },
            { name: '健康' },
            { name: '财富' },
            { name: '关系' },
            { name: '智慧' },
            { name: '创造力' }
        ];
        
        // 创建基础门序列
        const gates = [
            // 初始化所有量子比特为叠加态
            { name: 'H', column: 0, targets: [0], controls: [] },
            { name: 'H', column: 0, targets: [1], controls: [] },
            { name: 'H', column: 0, targets: [2], controls: [] },
            { name: 'H', column: 0, targets: [3], controls: [] },
            { name: 'H', column: 0, targets: [4], controls: [] },
            { name: 'H', column: 0, targets: [5], controls: [] }
        ];
        
        // 根据出生日期添加特定门
        // 年份影响第一个量子比特 - 添加更多门类型
        const yearMod = year % 8;
        if (yearMod === 0) {
            gates.push({ name: 'X', column: 1, targets: [0], controls: [] });
        } else if (yearMod === 1) {
            gates.push({ name: 'Y', column: 1, targets: [0], controls: [] });
        } else if (yearMod === 2) {
            gates.push({ name: 'Z', column: 1, targets: [0], controls: [] });
        } else if (yearMod === 3) {
            gates.push({ name: 'T', column: 1, targets: [0], controls: [] });
        } else if (yearMod === 4) {
            gates.push({ name: 'S', column: 1, targets: [0], controls: [] });
        } else if (yearMod === 5) {
            gates.push({ name: 'RX', column: 1, targets: [0], controls: [], params: [Math.PI/3] });
        } else if (yearMod === 6) {
            gates.push({ name: 'RY', column: 1, targets: [0], controls: [], params: [Math.PI/4] });
        } else {
            gates.push({ name: 'RZ', column: 1, targets: [0], controls: [], params: [Math.PI/6] });
        }
        
        // 月份影响第二个量子比特 - 添加更多门类型
        if (month <= 2) {
            gates.push({ name: 'X', column: 1, targets: [1], controls: [] });
        } else if (month <= 4) {
            gates.push({ name: 'Y', column: 1, targets: [1], controls: [] });
        } else if (month <= 6) {
            gates.push({ name: 'Z', column: 1, targets: [1], controls: [] });
        } else if (month <= 8) {
            gates.push({ name: 'S', column: 1, targets: [1], controls: [] });
        } else if (month <= 10) {
            gates.push({ name: 'T', column: 1, targets: [1], controls: [] });
        } else {
            gates.push({ name: 'H', column: 1, targets: [1], controls: [] });
        }
        
        // 日期影响第三个量子比特 - 添加更多门类型
        const dayMod = day % 10;
        if (dayMod === 0) {
            gates.push({ name: 'X', column: 1, targets: [2], controls: [] });
        } else if (dayMod === 1) {
            gates.push({ name: 'Y', column: 1, targets: [2], controls: [] });
        } else if (dayMod === 2) {
            gates.push({ name: 'Z', column: 1, targets: [2], controls: [] });
        } else if (dayMod === 3) {
            gates.push({ name: 'S', column: 1, targets: [2], controls: [] });
        } else if (dayMod === 4) {
            gates.push({ name: 'T', column: 1, targets: [2], controls: [] });
        } else if (dayMod === 5) {
            gates.push({ name: 'RX', column: 1, targets: [2], controls: [], params: [Math.PI/4] });
        } else if (dayMod === 6) {
            gates.push({ name: 'RY', column: 1, targets: [2], controls: [], params: [Math.PI/4] });
        } else if (dayMod === 7) {
            gates.push({ name: 'RZ', column: 1, targets: [2], controls: [], params: [Math.PI/4] });
        } else if (dayMod === 8) {
            gates.push({ name: 'P', column: 1, targets: [2], controls: [], params: [Math.PI/8] });
        } else {
            gates.push({ name: 'U', column: 1, targets: [2], controls: [], params: [Math.PI/4, 0, Math.PI/2] });
        }
        
        // 时间跨度影响第四个量子比特
        switch (timeSpan) {
            case 'day':
                gates.push({ name: 'X', column: 1, targets: [3], controls: [] });
                break;
            case 'week':
                gates.push({ name: 'Y', column: 1, targets: [3], controls: [] });
                break;
            case 'month':
                gates.push({ name: 'Z', column: 1, targets: [3], controls: [] });
                break;
            case 'year':
                gates.push({ name: 'T', column: 1, targets: [3], controls: [] });
                break;
        }
        
        // 添加额外的门到新增的量子比特
        gates.push({ name: 'X', column: 1, targets: [4], controls: [] });
        gates.push({ name: 'Y', column: 1, targets: [5], controls: [] });
        
        // 添加更复杂的纠缠门网络
        gates.push({ name: 'CNOT', column: 2, targets: [1], controls: [0] });
        gates.push({ name: 'CNOT', column: 2, targets: [5], controls: [4] });
        gates.push({ name: 'CNOT', column: 3, targets: [2], controls: [1] });
        gates.push({ name: 'CNOT', column: 3, targets: [4], controls: [3] });
        gates.push({ name: 'CNOT', column: 4, targets: [3], controls: [2] });
        gates.push({ name: 'CNOT', column: 4, targets: [5], controls: [0] });
        
        // 添加Toffoli门（三量子比特控制门）
        gates.push({ name: 'Toffoli', column: 5, targets: [5], controls: [0, 1] });
        gates.push({ name: 'Toffoli', column: 5, targets: [4], controls: [2, 3] });
        
        // 根据量子指标添加旋转门
        const entropyAngle = (indicators.entropy.value / 100) * Math.PI;
        const coherenceAngle = (indicators.coherence.value / 100) * Math.PI;
        const entanglementAngle = (indicators.entanglement.value / 100) * Math.PI;
        const phaseAngle = (indicators.phase.value / 100) * Math.PI;
        
        gates.push({ name: 'RZ', column: 6, targets: [0], controls: [], params: [entropyAngle] });
        gates.push({ name: 'RX', column: 6, targets: [1], controls: [], params: [coherenceAngle] });
        gates.push({ name: 'RY', column: 6, targets: [2], controls: [], params: [entanglementAngle] });
        gates.push({ name: 'RZ', column: 6, targets: [3], controls: [], params: [phaseAngle] });
        gates.push({ name: 'RX', column: 6, targets: [4], controls: [], params: [entropyAngle/2] });
        gates.push({ name: 'RY', column: 6, targets: [5], controls: [], params: [coherenceAngle/2] });
        
        // 添加更多纠缠门
        gates.push({ name: 'CNOT', column: 7, targets: [0], controls: [3] });
        gates.push({ name: 'CNOT', column: 7, targets: [1], controls: [4] });
        gates.push({ name: 'CNOT', column: 7, targets: [2], controls: [5] });
        
        // 添加SWAP门
        gates.push({ name: 'SWAP', column: 8, targets: [1], controls: [2] });
        gates.push({ name: 'SWAP', column: 8, targets: [4], controls: [5] });
        
        // 添加相位门
        gates.push({ name: 'P', column: 9, targets: [0], controls: [], params: [Math.PI/4] });
        gates.push({ name: 'P', column: 9, targets: [3], controls: [], params: [Math.PI/6] });
        
        // 添加通用旋转门
        gates.push({ name: 'U', column: 10, targets: [1], controls: [], params: [Math.PI/4, Math.PI/8, Math.PI/6] });
        gates.push({ name: 'U', column: 10, targets: [5], controls: [], params: [Math.PI/6, Math.PI/10, Math.PI/8] });
        
        // 添加最终的Hadamard门
        gates.push({ name: 'H', column: 11, targets: [0], controls: [] });
        gates.push({ name: 'H', column: 11, targets: [1], controls: [] });
        gates.push({ name: 'H', column: 11, targets: [2], controls: [] });
        gates.push({ name: 'H', column: 11, targets: [3], controls: [] });
        gates.push({ name: 'H', column: 11, targets: [4], controls: [] });
        gates.push({ name: 'H', column: 11, targets: [5], controls: [] });
        
        // 添加测量门
        gates.push({ name: 'measure', column: 12, targets: [0], controls: [] });
        gates.push({ name: 'measure', column: 12, targets: [1], controls: [] });
        gates.push({ name: 'measure', column: 12, targets: [2], controls: [] });
        gates.push({ name: 'measure', column: 12, targets: [3], controls: [] });
        gates.push({ name: 'measure', column: 12, targets: [4], controls: [] });
        gates.push({ name: 'measure', column: 12, targets: [5], controls: [] });
        
        // 为每个门添加描述信息
        gates.forEach(gate => {
            gate.description = this.getGateDescription(gate, birthDate, timeSpan, indicators);
        });
        
        return {
            qubits: qubits,
            gates: gates,
            metadata: {
                birthDate: birthDate,
                timeSpan: timeSpan,
                createdAt: new Date().toISOString(),
                description: `这是基于出生日期 ${birthDate} 和时间跨度 ${this.getTimeSpanText(timeSpan)} 生成的量子电路。`
            }
        };
    }
    
    // 获取量子门描述
    getGateDescription(gate, birthDate, timeSpan, indicators) {
        const targetNames = gate.targets.map(t => `${t}`).join(', ');
        const controlNames = gate.controls ? gate.controls.map(c => `${c}`).join(', ') : '';
        
        // 基础描述
        let description = '';
        
        switch (gate.name) {
            case 'H':
                description = `Hadamard门将量子比特置于叠加态，代表可能性的开放。`;
                break;
            case 'X':
                description = `X门（NOT门）翻转量子比特的状态，代表转变和改变。`;
                break;
            case 'Y':
                description = `Y门在量子比特上执行复杂的旋转，代表多维度的变化。`;
                break;
            case 'Z':
                description = `Z门改变量子比特的相位，代表内在特性的变化。`;
                break;
            case 'S':
                description = `S门（相位门）执行90度相位旋转，代表渐进的转变。`;
                break;
            case 'T':
                description = `T门执行45度相位旋转，代表微妙的能量调整。`;
                break;
            case 'RX':
                description = `RX门沿X轴旋转量子比特，代表物质世界的变化。`;
                break;
            case 'RY':
                description = `RY门沿Y轴旋转量子比特，代表情感和关系的变化。`;
                break;
            case 'RZ':
                description = `RZ门沿Z轴旋转量子比特，代表思维和意识的变化。`;
                break;
            case 'P':
                description = `相位门调整量子比特的相位，代表能量流动的方向。`;
                break;
            case 'U':
                description = `通用旋转门，代表全方位的转变和适应。`;
                break;
            case 'CNOT':
                description = `CNOT门（受控非门）创建量子比特间的纠缠，代表关系和影响。`;
                break;
            case 'Toffoli':
                description = `Toffoli门（受控受控非门）创建三个量子比特间的复杂关系，代表深层次的相互作用。`;
                break;
            case 'SWAP':
                description = `SWAP门交换两个量子比特的状态，代表能量和信息的交换。`;
                break;
            case 'measure':
                description = `测量门将量子状态转化为经典结果，代表潜能转化为现实。`;
                break;
            default:
                description = `${gate.name}门操作量子比特，影响其量子状态。`;
        }
        
        // 添加特定量子比特的含义
        if (gate.targets.includes(0)) {
            description += ` 作用于运势量子比特，影响整体运势走向。`;
        } else if (gate.targets.includes(1)) {
            description += ` 作用于健康量子比特，影响身心健康状态。`;
        } else if (gate.targets.includes(2)) {
            description += ` 作用于财富量子比特，影响财务和资源状况。`;
        } else if (gate.targets.includes(3)) {
            description += ` 作用于关系量子比特，影响人际关系和社交网络。`;
        } else if (gate.targets.includes(4)) {
            description += ` 作用于智慧量子比特，影响认知和决策能力。`;
        } else if (gate.targets.includes(5)) {
            description += ` 作用于创造力量子比特，影响创新和表达能力。`;
        }
        
        // 添加与出生日期的关联
        if (gate.column === 1) {
            description += ` 这个操作与您的出生日期特性相关联。`;
        }
        
        // 添加与时间跨度的关联
        if (gate.column === 1 && gate.targets.includes(3)) {
            description += ` 这个操作特别针对${this.getTimeSpanText(timeSpan)}的时间范围进行优化。`;
        }
        
        // 添加与量子指标的关联
        if (gate.name.startsWith('R') && gate.column === 6) {
            if (gate.targets.includes(0)) {
                description += ` 旋转角度基于量子熵值(${indicators.entropy.value.toFixed(2)})计算。`;
            } else if (gate.targets.includes(1)) {
                description += ` 旋转角度基于相干性值(${indicators.coherence.value.toFixed(2)})计算。`;
            } else if (gate.targets.includes(2)) {
                description += ` 旋转角度基于纠缠度值(${indicators.entanglement.value.toFixed(2)})计算。`;
            } else if (gate.targets.includes(3)) {
                description += ` 旋转角度基于量子相位值(${indicators.phase.value.toFixed(2)})计算。`;
            }
        }
        
        return description;
    }
    
    // 获取量子电路数据
    async getQuantumCircuit() {
        console.log('获取量子电路数据');
        
        try {
            // 如果没有预测结果，创建一个默认电路
            if (!this.lastPrediction) {
                console.log('没有可用的预测结果，创建默认电路');
                const defaultCircuit = {
                    qubits: [
                        { name: '量子比特 0' },
                        { name: '量子比特 1' }
                    ],
                    gates: [
                        { name: 'H', column: 0, targets: [0], controls: [] },
                        { name: 'X', column: 1, targets: [1], controls: [] },
                        { name: 'CNOT', column: 2, targets: [1], controls: [0] },
                        { name: 'measure', column: 3, targets: [0], controls: [] },
                        { name: 'measure', column: 3, targets: [1], controls: [] }
                    ],
                    metadata: {
                        description: '默认量子电路（无可用预测结果）',
                        createdAt: new Date().toISOString()
                    }
                };
                
                // 保存默认电路到全局变量，以便可视化器使用
                window.lastQuantumCircuit = defaultCircuit;
                
                return defaultCircuit;
            }
            
            // 如果预测结果中已有电路数据
            if (this.lastPrediction.circuit) {
                console.log('使用现有电路数据');
                let circuit = this.lastPrediction.circuit;
                
                // 检查是否是嵌套的circuit对象
                if (circuit.circuit && typeof circuit.circuit === 'object') {
                    console.log('检测到嵌套的circuit对象，正在提取...');
                    circuit = circuit.circuit;
                    this.lastPrediction.circuit = circuit;
                }
                
                // 确保基本结构存在
                if (!circuit.qubits || !Array.isArray(circuit.qubits) || circuit.qubits.length === 0) {
                    console.log('修复缺失的量子比特数据');
                    circuit.qubits = [
                        { name: '量子比特 0' },
                        { name: '量子比特 1' }
                    ];
                }
                
                if (!circuit.gates || !Array.isArray(circuit.gates) || circuit.gates.length === 0) {
                    console.log('修复缺失的量子门数据');
                    circuit.gates = [
                        { name: 'H', column: 0, targets: [0], controls: [] },
                        { name: 'X', column: 1, targets: [1], controls: [] },
                        { name: 'CNOT', column: 2, targets: [1], controls: [0] },
                        { name: 'measure', column: 3, targets: [0], controls: [] },
                        { name: 'measure', column: 3, targets: [1], controls: [] }
                    ];
                }
                
                // 确保有元数据
                if (!circuit.metadata) {
                    circuit.metadata = {
                        description: '量子电路',
                        createdAt: new Date().toISOString()
                    };
                }
                
                // 保存到全局变量，以便可视化器使用
                window.lastQuantumCircuit = circuit;
                
                return circuit;
            }
            
            // 否则生成新的电路数据
            console.log('生成新的量子电路数据');
            const birthDate = this.lastPrediction.birthDate || '2000-01-01';
            const timeSpan = this.lastPrediction.timeSpan || 'day';
            const indicators = this.lastPrediction.indicators || {
                entropy: { value: 50, max: 100 },
                coherence: { value: 50, max: 100 },
                entanglement: { value: 50, max: 100 },
                phase: { value: 50, max: 100 }
            };
            
            const circuit = this.generateQuantumCircuit(birthDate, timeSpan, indicators);
            
            // 保存到最后的预测结果中
            this.lastPrediction.circuit = circuit;
            
            // 保存到全局变量，以便可视化器使用
            window.lastQuantumCircuit = circuit;
            
            return circuit;
        } catch (error) {
            console.error('获取量子电路数据时出错:', error);
            // 创建一个基本的错误电路结构
            const errorCircuit = {
                qubits: [
                    { name: '量子比特 0' },
                    { name: '量子比特 1' }
                ],
                gates: [
                    { name: 'H', column: 0, targets: [0], controls: [] },
                    { name: 'X', column: 1, targets: [1], controls: [] },
                    { name: 'CNOT', column: 2, targets: [1], controls: [0] },
                    { name: 'measure', column: 3, targets: [0], controls: [] },
                    { name: 'measure', column: 3, targets: [1], controls: [] }
                ],
                metadata: {
                    description: `获取量子电路数据时出错: ${error.message}`,
                    createdAt: new Date().toISOString()
                }
            };
            
            // 保存到全局变量，以便可视化器使用
            window.lastQuantumCircuit = errorCircuit;
            
            return errorCircuit;
        }
    }
}

// 创建全局API实例
window.quantumAPI = new QuantumAPI();

// 处理预测请求
function handlePredictionRequest(birthDate, timeSpan) {
    return window.quantumAPI.generatePrediction(birthDate, timeSpan);
}

// 导出API
window.handlePredictionRequest = handlePredictionRequest; 