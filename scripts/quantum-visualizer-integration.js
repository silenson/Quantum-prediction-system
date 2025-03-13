/**
 * 量子可视化集成模块
 * 将量子电路可视化器集成到量子运势预测系统中
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('量子电路可视化集成模块已加载');
    
    // 检查是否已加载D3.js
    if (typeof d3 === 'undefined') {
        console.error('D3.js未加载，请确保scripts/lib/d3.v7.min.js文件存在');
        showErrorNotification('D3.js未加载，量子电路可视化功能不可用');
    } else {
        console.log('D3.js已加载，版本:', d3.version);
        initializeVisualization();
    }
    
    // 初始化可视化功能
    function initializeVisualization() {
        // 创建可视化容器
        createVisualizerContainer();
        
        // 创建显示电路按钮
        createCircuitButton();
        
        // 监听预测完成事件
        document.addEventListener('quantumPredictionComplete', function(event) {
            console.log('量子预测完成事件触发，准备显示电路按钮');
            
            // 获取预测结果
            const result = event.detail;
            
            // 保存电路数据到全局变量
            if (result && result.prediction && result.prediction.circuit) {
                window.lastQuantumCircuit = result.prediction.circuit;
                console.log('已保存量子电路数据');
                
                // 显示电路按钮
                showCircuitButton();
            } else {
                // 静默处理，不显示警告
                
                // 尝试从API获取电路数据
                if (window.quantumAPI && typeof window.quantumAPI.getQuantumCircuit === 'function') {
                    window.quantumAPI.getQuantumCircuit().then(function(circuitData) {
                        window.lastQuantumCircuit = circuitData;
                        console.log('已从API获取量子电路数据');
                        
                        // 显示电路按钮
                        showCircuitButton();
                    }).catch(function(error) {
                        console.error('获取量子电路数据失败:', error);
                    });
                } else {
                    console.error('无法获取量子电路数据，API不可用');
                }
            }
        });
        
        // 修改原始预测函数，确保获取电路数据
        if (window.quantumAPI && window.quantumAPI.predict) {
            const originalPredict = window.quantumAPI.predict;
            
            window.quantumAPI.predict = function(params) {
                // 确保请求包含获取电路数据的参数
                params.includeCircuit = true;
                
                // 调用原始函数
                return originalPredict(params).then(function(prediction) {
                    // 如果预测结果中没有电路数据，尝试获取
                    if (!prediction.circuit) {
                        console.log('正在获取量子电路数据...');
                        return window.quantumAPI.getQuantumCircuit().then(function(circuitData) {
                            prediction.circuit = circuitData;
                            
                            // 触发预测完成事件
                            const event = new CustomEvent('quantumPredictionComplete', {
                                detail: {
                                    prediction: prediction,
                                    indicators: prediction.indicators
                                }
                            });
                            document.dispatchEvent(event);
                            
                            return prediction;
                        }).catch(function(error) {
                            console.error('获取量子电路数据失败:', error);
                            return prediction;
                        });
                    } else {
                        // 触发预测完成事件
                        const event = new CustomEvent('quantumPredictionComplete', {
                            detail: {
                                prediction: prediction,
                                indicators: prediction.indicators
                            }
                        });
                        document.dispatchEvent(event);
                        
                        return prediction;
                    }
                });
            };
        }
    }
    
    // 创建可视化容器
    function createVisualizerContainer() {
        // 检查是否已存在容器
        if (document.getElementById('quantum-circuit-container')) {
            console.log('量子电路容器已存在');
            return;
        }
        
        // 创建可视化容器
        const visualizerContainer = document.createElement('div');
        visualizerContainer.id = 'quantum-circuit-container';
        visualizerContainer.style.display = 'none';
        visualizerContainer.style.position = 'fixed';
        visualizerContainer.style.top = '0';
        visualizerContainer.style.left = '0';
        visualizerContainer.style.width = '100%';
        visualizerContainer.style.height = '100%';
        visualizerContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        visualizerContainer.style.zIndex = '1000';
        visualizerContainer.style.overflow = 'hidden';
        
        // 创建内容区域
        const contentArea = document.createElement('div');
        contentArea.className = 'quantum-visualizer-content';
        contentArea.style.position = 'relative';
        contentArea.style.width = '90%';
        contentArea.style.height = '90%';
        contentArea.style.margin = '2% auto';
        contentArea.style.backgroundColor = '#1a1a2e';
        contentArea.style.borderRadius = '10px';
        contentArea.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
        contentArea.style.padding = '20px';
        contentArea.style.display = 'flex';
        contentArea.style.flexDirection = 'column';
        
        // 创建标题区域
        const titleArea = document.createElement('div');
        titleArea.style.display = 'flex';
        titleArea.style.justifyContent = 'space-between';
        titleArea.style.alignItems = 'center';
        titleArea.style.marginBottom = '20px';
        
        // 创建标题
        const title = document.createElement('h2');
        title.textContent = '量子电路可视化';
        title.style.color = 'white';
        title.style.margin = '0';
        title.style.fontSize = '24px';
        
        // 创建关闭按钮
        const closeButton = document.createElement('button');
        closeButton.textContent = '关闭';
        closeButton.style.backgroundColor = '#4361ee';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.padding = '8px 15px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontWeight = 'bold';
        closeButton.style.fontSize = '16px';
        
        // 添加悬停效果
        closeButton.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#3a56d4';
        });
        
        closeButton.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#4361ee';
        });
        
        // 关闭按钮点击事件
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hideVisualizerContainer();
        });
        
        // 将标题和关闭按钮添加到标题区域
        titleArea.appendChild(title);
        titleArea.appendChild(closeButton);
        
        // 创建描述
        const description = document.createElement('p');
        description.textContent = '以下是用于生成您的量子运势预测的量子电路。您可以使用右侧的缩放控件放大或缩小电路，使用底部的导航按钮查看电路的不同部分。';
        description.style.color = '#ccc';
        description.style.marginBottom = '20px';
        
        // 创建电路元数据区域
        const metadataArea = document.createElement('div');
        metadataArea.id = 'quantum-circuit-metadata';
        metadataArea.style.marginBottom = '20px';
        metadataArea.style.padding = '10px';
        metadataArea.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        metadataArea.style.borderRadius = '5px';
        metadataArea.style.color = '#ccc';
        
        // 创建电路可视化区域
        const visualizerArea = document.createElement('div');
        visualizerArea.style.display = 'flex';
        visualizerArea.style.flexGrow = '1';
        visualizerArea.style.gap = '20px';
        
        // 创建电路显示区域
        const circuitArea = document.createElement('div');
        circuitArea.id = 'quantum-circuit-visualizer';
        circuitArea.style.flexGrow = '1';
        circuitArea.style.backgroundColor = '#111122';
        circuitArea.style.borderRadius = '5px';
        circuitArea.style.overflow = 'hidden';
        
        // 创建电路解释区域
        const explanationArea = document.createElement('div');
        explanationArea.id = 'quantum-gate-explanation';
        explanationArea.style.width = '300px';
        explanationArea.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        explanationArea.style.borderRadius = '5px';
        explanationArea.style.padding = '15px';
        explanationArea.style.color = 'white';
        explanationArea.style.overflowY = 'auto';
        
        // 添加解释区域标题
        const explanationTitle = document.createElement('h3');
        explanationTitle.textContent = '量子门解释';
        explanationTitle.style.margin = '0 0 15px 0';
        explanationTitle.style.color = '#4cc9f0';
        explanationTitle.style.borderBottom = '1px solid #333';
        explanationTitle.style.paddingBottom = '10px';
        
        // 添加解释内容区域
        const explanationContent = document.createElement('div');
        explanationContent.id = 'gate-explanation-content';
        
        // 添加默认解释文本
        const defaultExplanation = document.createElement('p');
        defaultExplanation.textContent = '点击电路中的量子门以查看其详细解释。';
        defaultExplanation.style.color = '#aaa';
        defaultExplanation.style.fontStyle = 'italic';
        
        // 组装解释区域
        explanationContent.appendChild(defaultExplanation);
        explanationArea.appendChild(explanationTitle);
        explanationArea.appendChild(explanationContent);
        
        // 组装可视化区域
        visualizerArea.appendChild(circuitArea);
        visualizerArea.appendChild(explanationArea);
        
        // 组装内容区域
        contentArea.appendChild(titleArea);
        contentArea.appendChild(description);
        contentArea.appendChild(metadataArea);
        contentArea.appendChild(visualizerArea);
        
        // 将内容区域添加到容器
        visualizerContainer.appendChild(contentArea);
        
        // 将容器添加到文档
        document.body.appendChild(visualizerContainer);
        
        console.log('量子电路可视化容器已创建');
    }
    
    // 创建显示电路按钮
    function createCircuitButton() {
        // 检查是否已存在按钮
        if (document.querySelector('.show-quantum-circuit-button')) {
            console.log('量子电路按钮已存在');
            return;
        }
        
        // 创建按钮
        const showCircuitButton = document.createElement('button');
        showCircuitButton.className = 'show-quantum-circuit-button';
        showCircuitButton.textContent = '查看量子电路';
        showCircuitButton.style.display = 'none';
        showCircuitButton.style.backgroundColor = '#4361ee';
        showCircuitButton.style.color = 'white';
        showCircuitButton.style.border = 'none';
        showCircuitButton.style.borderRadius = '5px';
        showCircuitButton.style.padding = '10px 20px';
        showCircuitButton.style.margin = '15px 0';
        showCircuitButton.style.cursor = 'pointer';
        showCircuitButton.style.fontWeight = 'bold';
        showCircuitButton.style.fontSize = '16px';
        showCircuitButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        showCircuitButton.style.transition = 'all 0.3s ease';
        
        // 添加悬停效果
        showCircuitButton.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#3a56d4';
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
        });
        
        showCircuitButton.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#4361ee';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
        
        // 按钮点击事件
        showCircuitButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showQuantumCircuitVisualizer();
        });
        
        // 查找按钮容器
        const buttonContainer = document.getElementById('quantum-circuit-button-container');
        if (buttonContainer) {
            // 添加到按钮容器
            buttonContainer.appendChild(showCircuitButton);
            console.log('量子电路按钮已添加到按钮容器');
        } else {
            // 如果没有找到按钮容器，添加到预测结果区域
            const adviceContainer = document.getElementById('advice-container');
            if (adviceContainer) {
                adviceContainer.appendChild(showCircuitButton);
                console.log('量子电路按钮已添加到预测结果区域');
            } else {
                // 如果没有找到预测结果区域，添加到主容器
                const mainContainer = document.querySelector('.container');
                if (mainContainer) {
                    mainContainer.appendChild(showCircuitButton);
                    console.log('量子电路按钮已添加到主容器');
                } else {
                    console.error('找不到合适的容器来添加量子电路按钮');
                }
            }
        }
    }
    
    // 显示电路按钮
    function showCircuitButton() {
        // 查找按钮
        const circuitButton = document.querySelector('.show-quantum-circuit-button');
        if (circuitButton) {
            circuitButton.style.display = 'block';
            console.log('已显示量子电路按钮');
            
            // 添加动画效果
            circuitButton.style.animation = 'pulse 2s infinite';
            
            // 添加脉冲动画样式
            if (!document.getElementById('quantum-button-animation')) {
                const style = document.createElement('style');
                style.id = 'quantum-button-animation';
                style.textContent = `
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }
                `;
                document.head.appendChild(style);
            }
        } else {
            console.error('找不到量子电路按钮');
            // 尝试重新创建按钮
            createCircuitButton();
            setTimeout(showCircuitButton, 100);
        }
    }
    
    // 显示量子电路可视化器
    function showQuantumCircuitVisualizer() {
        console.log('显示量子电路可视化器');
        
        try {
            // 检查是否有电路数据
            if (!window.lastQuantumCircuit) {
                console.error('没有可用的量子电路数据');
                
                // 尝试从API获取电路数据
                if (window.quantumAPI && typeof window.quantumAPI.getQuantumCircuit === 'function') {
                    showNotification('正在尝试获取量子电路数据...', 'info');
                    
                    window.quantumAPI.getQuantumCircuit().then(function(circuitData) {
                        console.log('已获取量子电路数据', circuitData);
                        
                        // 确保数据有效
                        if (circuitData && typeof circuitData === 'object') {
                            window.lastQuantumCircuit = circuitData;
                            
                            // 重新尝试显示
                            setTimeout(function() {
                                console.log('使用新获取的数据重新尝试显示');
                                showQuantumCircuitVisualizer();
                            }, 500);
                        } else {
                            console.error('获取的电路数据无效', circuitData);
                            showErrorNotification('获取的电路数据无效，无法显示可视化');
                        }
                    }).catch(function(error) {
                        console.error('获取量子电路数据失败:', error);
                        showErrorNotification('无法获取有效的量子电路数据，请重新进行预测');
                    });
                    
                    return;
                } else {
                    // 如果无法从API获取，创建一个默认电路
                    console.log('创建默认电路数据');
                    window.lastQuantumCircuit = {
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
                    
                    showNotification('已创建默认电路数据', 'info');
                }
            }
            
            // 验证电路数据结构
            let circuit = window.lastQuantumCircuit;
            
            // 检查是否是嵌套的circuit对象
            if (circuit.circuit && typeof circuit.circuit === 'object') {
                console.log('检测到嵌套的circuit对象，正在提取...');
                window.lastQuantumCircuit = circuit.circuit;
                circuit = circuit.circuit;
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
            
            // 显示可视化容器
            const visualizerContainer = document.getElementById('quantum-circuit-container');
            if (visualizerContainer) {
                visualizerContainer.style.display = 'block';
                
                // 显示电路元数据
                displayCircuitMetadata(circuit);
                
                // 显示电路
                if (typeof window.showQuantumCircuit === 'function') {
                    try {
                        // 传递回调函数以处理门点击事件
                        window.showQuantumCircuit(circuit, handleGateClick);
                        showNotification('量子电路已成功显示', 'success');
                    } catch (error) {
                        console.error('显示量子电路时出错:', error);
                        showErrorNotification('显示量子电路时出错: ' + error.message);
                    }
                } else {
                    console.error('showQuantumCircuit函数未定义');
                    showErrorNotification('量子电路可视化器未正确加载');
                }
            } else {
                console.error('找不到量子电路容器');
                // 尝试重新创建容器
                createVisualizerContainer();
                setTimeout(showQuantumCircuitVisualizer, 100);
            }
        } catch (error) {
            console.error('显示量子电路可视化器时出错:', error);
            showErrorNotification('显示量子电路可视化器时出错: ' + error.message);
        }
    }
    
    // 显示电路元数据
    function displayCircuitMetadata(circuit) {
        const metadataArea = document.getElementById('quantum-circuit-metadata');
        if (!metadataArea) return;
        
        // 清空现有内容
        metadataArea.innerHTML = '';
        
        // 检查电路数据是否有效
        if (!circuit) {
            const errorInfo = document.createElement('p');
            errorInfo.textContent = '无法显示电路元数据：电路数据无效';
            errorInfo.style.color = '#ff6b6b';
            metadataArea.appendChild(errorInfo);
            return;
        }
        
        // 如果有元数据，显示它
        if (circuit.metadata) {
            const metadata = circuit.metadata;
            
            // 创建元数据内容
            const metadataContent = document.createElement('div');
            
            // 添加描述
            if (metadata.description) {
                const description = document.createElement('p');
                description.textContent = metadata.description;
                description.style.margin = '0 0 10px 0';
                metadataContent.appendChild(description);
            }
            
            // 添加其他元数据
            const details = document.createElement('div');
            details.style.display = 'flex';
            details.style.gap = '20px';
            details.style.fontSize = '0.9em';
            
            // 添加出生日期
            if (metadata.birthDate) {
                const birthDate = document.createElement('div');
                birthDate.innerHTML = `<strong>出生日期:</strong> ${metadata.birthDate}`;
                details.appendChild(birthDate);
            }
            
            // 添加时间跨度
            if (metadata.timeSpan) {
                const timeSpan = document.createElement('div');
                timeSpan.innerHTML = `<strong>预测范围:</strong> ${metadata.timeSpan}`;
                details.appendChild(timeSpan);
            }
            
            // 添加创建时间
            if (metadata.createdAt) {
                const createdAt = document.createElement('div');
                const date = new Date(metadata.createdAt);
                createdAt.innerHTML = `<strong>创建时间:</strong> ${date.toLocaleString()}`;
                details.appendChild(createdAt);
            }
            
            // 添加量子比特数量（检查qubits是否存在）
            if (circuit.qubits && Array.isArray(circuit.qubits)) {
                const qubitCount = document.createElement('div');
                qubitCount.innerHTML = `<strong>量子比特数:</strong> ${circuit.qubits.length}`;
                details.appendChild(qubitCount);
            }
            
            // 添加量子门数量（检查gates是否存在）
            if (circuit.gates && Array.isArray(circuit.gates)) {
                const gateCount = document.createElement('div');
                gateCount.innerHTML = `<strong>量子门数:</strong> ${circuit.gates.length}`;
                details.appendChild(gateCount);
            }
            
            metadataContent.appendChild(details);
            metadataArea.appendChild(metadataContent);
        } else {
            // 如果没有元数据，显示基本信息
            const basicInfo = document.createElement('p');
            
            // 检查qubits和gates是否存在
            const qubitCount = (circuit.qubits && Array.isArray(circuit.qubits)) ? circuit.qubits.length : '未知';
            const gateCount = (circuit.gates && Array.isArray(circuit.gates)) ? circuit.gates.length : '未知';
            
            basicInfo.textContent = `量子电路包含 ${qubitCount} 个量子比特和 ${gateCount} 个量子门。`;
            metadataArea.appendChild(basicInfo);
        }
    }
    
    // 处理门点击事件
    function handleGateClick(gate) {
        console.log('量子门点击:', gate);
        
        // 获取解释内容区域
        const explanationContent = document.getElementById('gate-explanation-content');
        if (!explanationContent) return;
        
        // 清空现有内容
        explanationContent.innerHTML = '';
        
        // 创建门信息
        const gateInfo = document.createElement('div');
        
        // 添加门名称
        const gateName = document.createElement('h4');
        gateName.textContent = `${gate.name} 门`;
        gateName.style.color = '#f72585';
        gateName.style.marginTop = '0';
        gateInfo.appendChild(gateName);
        
        // 添加目标量子比特
        const targets = document.createElement('p');
        targets.innerHTML = `<strong>目标量子比特:</strong> ${gate.targets.map(t => `q${t}`).join(', ')}`;
        gateInfo.appendChild(targets);
        
        // 如果有控制量子比特，添加它们
        if (gate.controls && gate.controls.length > 0) {
            const controls = document.createElement('p');
            controls.innerHTML = `<strong>控制量子比特:</strong> ${gate.controls.map(c => `q${c}`).join(', ')}`;
            gateInfo.appendChild(controls);
        }
        
        // 如果有参数，添加它们
        if (gate.params && gate.params.length > 0) {
            const params = document.createElement('p');
            params.innerHTML = `<strong>参数:</strong> ${gate.params.map(p => p.toFixed(4)).join(', ')}`;
            gateInfo.appendChild(params);
        }
        
        // 添加门描述
        if (gate.description) {
            const description = document.createElement('div');
            description.style.marginTop = '15px';
            description.style.padding = '10px';
            description.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            description.style.borderRadius = '5px';
            description.style.borderLeft = '3px solid #4cc9f0';
            
            const descText = document.createElement('p');
            descText.textContent = gate.description;
            descText.style.margin = '0';
            descText.style.lineHeight = '1.5';
            
            description.appendChild(descText);
            gateInfo.appendChild(description);
        } else {
            // 如果没有描述，添加默认描述
            const defaultDesc = document.createElement('div');
            defaultDesc.style.marginTop = '15px';
            defaultDesc.style.padding = '10px';
            defaultDesc.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            defaultDesc.style.borderRadius = '5px';
            defaultDesc.style.borderLeft = '3px solid #4cc9f0';
            
            let descText = '';
            switch (gate.name) {
                case 'H':
                    descText = 'Hadamard门将量子比特置于叠加态，代表可能性的开放。';
                    break;
                case 'X':
                    descText = 'X门（NOT门）翻转量子比特的状态，代表转变和改变。';
                    break;
                case 'Y':
                    descText = 'Y门在量子比特上执行复杂的旋转，代表多维度的变化。';
                    break;
                case 'Z':
                    descText = 'Z门改变量子比特的相位，代表内在特性的变化。';
                    break;
                case 'CNOT':
                    descText = 'CNOT门（受控非门）创建量子比特间的纠缠，代表关系和影响。';
                    break;
                case 'measure':
                    descText = '测量门将量子状态转化为经典结果，代表潜能转化为现实。';
                    break;
                default:
                    descText = `${gate.name}门操作量子比特，影响其量子状态。`;
            }
            
            const descElement = document.createElement('p');
            descElement.textContent = descText;
            descElement.style.margin = '0';
            descElement.style.lineHeight = '1.5';
            
            defaultDesc.appendChild(descElement);
            gateInfo.appendChild(defaultDesc);
        }
        
        // 添加量子效应解释
        const effectTitle = document.createElement('h4');
        effectTitle.textContent = '量子效应';
        effectTitle.style.color = '#4cc9f0';
        effectTitle.style.marginTop = '20px';
        gateInfo.appendChild(effectTitle);
        
        const effectDesc = document.createElement('p');
        
        // 根据门类型提供不同的效应解释
        switch (gate.name) {
            case 'H':
                effectDesc.textContent = '创建量子叠加态，使量子比特同时处于多个状态，增加预测的可能性空间。';
                break;
            case 'X':
                effectDesc.textContent = '翻转量子比特状态，在预测中引入转变和变化的元素。';
                break;
            case 'Y':
                effectDesc.textContent = '在复平面上旋转量子状态，为预测添加多维度的考量。';
                break;
            case 'Z':
                effectDesc.textContent = '改变量子相位，调整预测中的微妙能量流动。';
                break;
            case 'CNOT':
                effectDesc.textContent = '创建量子纠缠，使预测中的不同因素相互影响和关联。';
                break;
            case 'Toffoli':
                effectDesc.textContent = '创建复杂的条件逻辑，在预测中模拟多重因素的综合影响。';
                break;
            case 'SWAP':
                effectDesc.textContent = '交换量子状态，在预测中重新分配和平衡不同因素的影响力。';
                break;
            case 'measure':
                effectDesc.textContent = '将量子可能性转化为确定结果，形成最终的预测输出。';
                break;
            default:
                if (gate.name.startsWith('R')) {
                    effectDesc.textContent = '执行量子旋转，微调预测中特定因素的影响程度和方向。';
                } else {
                    effectDesc.textContent = '调整量子状态，影响预测的精确度和特性。';
                }
        }
        
        gateInfo.appendChild(effectDesc);
        
        // 添加到解释内容区域
        explanationContent.appendChild(gateInfo);
    }
    
    // 隐藏可视化容器
    function hideVisualizerContainer() {
        const visualizerContainer = document.getElementById('quantum-circuit-container');
        if (visualizerContainer) {
            visualizerContainer.style.display = 'none';
            console.log('已隐藏量子电路可视化器');
        }
    }
    
    // 显示错误通知
    function showErrorNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = '#e74c3c';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '2000';
        notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        
        document.body.appendChild(notification);
        
        // 3秒后移除通知
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
    
    // 显示通知
    function showNotification(message, type = 'error') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '2000';
        notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        
        // 根据类型设置颜色
        switch (type) {
            case 'error':
                notification.style.backgroundColor = '#e74c3c';
                break;
            case 'success':
                notification.style.backgroundColor = '#2ecc71';
                break;
            case 'info':
                notification.style.backgroundColor = '#3498db';
                break;
            case 'warning':
                notification.style.backgroundColor = '#f39c12';
                break;
            default:
                notification.style.backgroundColor = '#e74c3c';
        }
        
        document.body.appendChild(notification);
        
        // 3秒后移除通知
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
    
    // 添加一个简单的showQuantumCircuit函数实现，以防原始函数未定义
    if (typeof window.showQuantumCircuit !== 'function') {
        console.log('定义备用的showQuantumCircuit函数');
        window.showQuantumCircuit = function(circuit, gateClickCallback) {
            console.log('使用备用的showQuantumCircuit函数');
            
            // 获取电路显示区域
            const circuitArea = document.getElementById('quantum-circuit-visualizer');
            if (!circuitArea) {
                console.error('找不到电路显示区域');
                return;
            }
            
            // 清空现有内容
            circuitArea.innerHTML = '';
            
            // 创建简单的电路表示
            const circuitContainer = document.createElement('div');
            circuitContainer.style.padding = '20px';
            circuitContainer.style.color = 'white';
            
            // 添加标题
            const title = document.createElement('h3');
            title.textContent = '量子电路可视化';
            title.style.color = '#4cc9f0';
            title.style.marginBottom = '20px';
            circuitContainer.appendChild(title);
            
            // 添加量子比特标签
            const qubitsContainer = document.createElement('div');
            qubitsContainer.style.marginBottom = '20px';
            
            if (circuit.qubits && Array.isArray(circuit.qubits)) {
                circuit.qubits.forEach((qubit, index) => {
                    const qubitLabel = document.createElement('div');
                    qubitLabel.textContent = qubit.name || `量子比特 ${index}`;
                    qubitLabel.style.marginBottom = '10px';
                    qubitLabel.style.fontWeight = 'bold';
                    qubitsContainer.appendChild(qubitLabel);
                });
            } else {
                const errorMsg = document.createElement('div');
                errorMsg.textContent = '无法显示量子比特：数据无效';
                errorMsg.style.color = '#ff6b6b';
                qubitsContainer.appendChild(errorMsg);
            }
            
            circuitContainer.appendChild(qubitsContainer);
            
            // 添加门信息
            const gatesContainer = document.createElement('div');
            gatesContainer.style.marginBottom = '20px';
            
            if (circuit.gates && Array.isArray(circuit.gates)) {
                const gatesList = document.createElement('div');
                gatesList.style.display = 'flex';
                gatesList.style.flexWrap = 'wrap';
                gatesList.style.gap = '10px';
                
                circuit.gates.forEach((gate, index) => {
                    const gateElement = document.createElement('div');
                    gateElement.textContent = gate.name;
                    gateElement.style.padding = '10px';
                    gateElement.style.backgroundColor = 'rgba(67, 97, 238, 0.3)';
                    gateElement.style.borderRadius = '5px';
                    gateElement.style.cursor = 'pointer';
                    
                    // 添加点击事件
                    gateElement.addEventListener('click', () => {
                        if (typeof gateClickCallback === 'function') {
                            gateClickCallback(gate);
                        }
                    });
                    
                    gatesList.appendChild(gateElement);
                });
                
                gatesContainer.appendChild(gatesList);
            } else {
                const errorMsg = document.createElement('div');
                errorMsg.textContent = '无法显示量子门：数据无效';
                errorMsg.style.color = '#ff6b6b';
                gatesContainer.appendChild(errorMsg);
            }
            
            circuitContainer.appendChild(gatesContainer);
            
            // 添加说明
            const note = document.createElement('p');
            note.textContent = '注意：这是一个简化的电路可视化。点击量子门可查看详细信息。';
            note.style.fontStyle = 'italic';
            note.style.color = '#aaa';
            circuitContainer.appendChild(note);
            
            // 添加到电路显示区域
            circuitArea.appendChild(circuitContainer);
            
            return true;
        };
    }
}); 