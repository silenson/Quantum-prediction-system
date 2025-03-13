/**
 * 量子指标显示模块
 * 用于在网页上可视化展示量子计算的各种指标
 */

// 当DOM内容加载完成时初始化
document.addEventListener('DOMContentLoaded', () => {
    initQuantumIndicators();
    setupWaveformCanvas();
});

// 初始化量子指标显示
function initQuantumIndicators() {
    const container = document.getElementById('quantum-indicators-container');
    if (!container) {
        console.log('量子指标容器未找到，初始化默认指标');
        
        // 初始化默认指标
        const indicators = {
            entropy: { value: 0, max: 100 },
            coherence: { value: 0, max: 100 },
            entanglement: { value: 0, max: 100 },
            phase: { value: 0, max: 100 },
            fortune: { value: 0, max: 100 }
        };
        
        // 更新显示
        updateIndicatorDisplay(indicators);
    }
    
    // 监听量子预测完成事件
    document.addEventListener('quantumPredictionComplete', (event) => {
        if (event.detail && event.detail.indicators) {
            updateIndicatorDisplay(event.detail.indicators);
            updateGaugeDisplay(event.detail.indicators.fortune.value);
            updateWaveformData(event.detail.indicators);
        }
    });
}

// 更新单个指标显示
function updateIndicatorDisplay(indicators) {
    // 更新量子熵
    if (indicators.entropy) {
        const entropyElement = document.getElementById('entropy-value');
        if (entropyElement) {
            entropyElement.textContent = indicators.entropy.value.toFixed(2);
            const entropyFill = document.querySelector('.entropy-fill');
            if (entropyFill) {
                const percentage = (indicators.entropy.value / indicators.entropy.max) * 100;
                entropyFill.style.width = `${percentage}%`;
            }
        }
    }
    
    // 更新相干性
    if (indicators.coherence) {
        const coherenceElement = document.getElementById('coherence-value');
        if (coherenceElement) {
            coherenceElement.textContent = indicators.coherence.value.toFixed(2);
            const coherenceFill = document.querySelector('.coherence-fill');
            if (coherenceFill) {
                const percentage = (indicators.coherence.value / indicators.coherence.max) * 100;
                coherenceFill.style.width = `${percentage}%`;
            }
        }
    }
    
    // 更新纠缠度
    if (indicators.entanglement) {
        const entanglementElement = document.getElementById('entanglement-value');
        if (entanglementElement) {
            entanglementElement.textContent = indicators.entanglement.value.toFixed(2);
            const entanglementFill = document.querySelector('.entanglement-fill');
            if (entanglementFill) {
                const percentage = (indicators.entanglement.value / indicators.entanglement.max) * 100;
                entanglementFill.style.width = `${percentage}%`;
            }
        }
    }
    
    // 更新量子相位
    if (indicators.phase) {
        const phaseElement = document.getElementById('phase-value');
        if (phaseElement) {
            phaseElement.textContent = indicators.phase.value.toFixed(2);
            const phaseFill = document.querySelector('.phase-fill');
            if (phaseFill) {
                const percentage = (indicators.phase.value / indicators.phase.max) * 100;
                phaseFill.style.width = `${percentage}%`;
            }
        }
    }
    
    // 更新量子运势值
    if (indicators.fortune) {
        const fortuneElement = document.getElementById('fortune-value');
        if (fortuneElement) {
            fortuneElement.textContent = indicators.fortune.value.toFixed(2);
            const fortuneTextElement = document.getElementById('fortune-value-text');
            if (fortuneTextElement) {
                fortuneTextElement.textContent = indicators.fortune.value.toFixed(2);
            }
        }
    }
}

// 更新仪表盘显示
function updateGaugeDisplay(value) {
    // 获取仪表盘元素
    const gaugeFill = document.querySelector('.gauge-fill');
    const gaugeArrow = document.querySelector('.gauge-arrow');
    
    if (!gaugeFill || !gaugeArrow) {
        console.error('仪表盘元素未找到');
        return;
    }
    
    // 计算仪表盘填充值（0-100范围映射到仪表盘的弧长）
    const maxDashArray = 251; // SVG路径的总长度
    const dashOffset = maxDashArray - (value / 100) * maxDashArray;
    
    // 计算指针旋转角度（0-100范围映射到-90到90度）
    const rotationDegree = -90 + (value / 100) * 180;
    
    // 应用动画效果
    gaugeFill.style.strokeDashoffset = dashOffset;
    gaugeArrow.style.transform = `translate(-50%, -50%) rotate(${rotationDegree}deg)`;
    
    // 根据值设置颜色
    let color = getColorForValue(value);
    document.documentElement.style.setProperty('--gauge-color', color);
}

// 根据值获取颜色
function getColorForValue(value) {
    if (value < 30) {
        return '#ef4444'; // 红色 - 低值
    } else if (value < 70) {
        return '#f59e0b'; // 黄色 - 中值
    } else {
        return '#10b981'; // 绿色 - 高值
    }
}

// 设置波形图画布
let waveformCanvas, waveformCtx;
let waveformData = {
    coherence: [],
    entanglement: []
};
let animationId = null;

function setupWaveformCanvas() {
    waveformCanvas = document.getElementById('quantum-waveform-canvas');
    if (!waveformCanvas) {
        console.error('波形图画布未找到');
        return;
    }
    
    waveformCtx = waveformCanvas.getContext('2d');
    
    // 初始化波形数据
    for (let i = 0; i < 100; i++) {
        waveformData.coherence.push(Math.random() * 30);
        waveformData.entanglement.push(Math.random() * 30);
    }
    
    // 开始动画
    animateWaveform();
}

// 更新波形数据
function updateWaveformData(indicators) {
    // 停止当前动画
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    // 重置波形数据
    waveformData = {
        coherence: [],
        entanglement: []
    };
    
    // 生成新的波形数据
    const coherenceBase = indicators.coherence.value;
    const entanglementBase = indicators.entanglement.value;
    
    for (let i = 0; i < 100; i++) {
        // 使用正弦波生成更自然的波形
        const coherenceValue = coherenceBase + Math.sin(i * 0.1) * 15 + Math.random() * 10;
        const entanglementValue = entanglementBase + Math.sin(i * 0.1 + Math.PI/4) * 15 + Math.random() * 10;
        
        waveformData.coherence.push(coherenceValue);
        waveformData.entanglement.push(entanglementValue);
    }
    
    // 重新开始动画
    animateWaveform();
}

// 动画波形
function animateWaveform() {
    if (!waveformCtx || !waveformCanvas) return;
    
    // 清除画布
    waveformCtx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
    
    // 绘制背景网格
    drawGrid();
    
    // 绘制波形
    drawWaveform(waveformData.coherence, '#4cc9f0', 2);
    drawWaveform(waveformData.entanglement, '#f72585', 2);
    
    // 更新波形数据 - 创建波动效果
    updateWaveformAnimation();
    
    // 继续动画循环
    animationId = requestAnimationFrame(animateWaveform);
}

// 绘制网格
function drawGrid() {
    const width = waveformCanvas.width;
    const height = waveformCanvas.height;
    
    waveformCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    waveformCtx.lineWidth = 1;
    
    // 绘制水平线
    for (let y = 0; y < height; y += 20) {
        waveformCtx.beginPath();
        waveformCtx.moveTo(0, y);
        waveformCtx.lineTo(width, y);
        waveformCtx.stroke();
    }
    
    // 绘制垂直线
    for (let x = 0; x < width; x += 20) {
        waveformCtx.beginPath();
        waveformCtx.moveTo(x, 0);
        waveformCtx.lineTo(x, height);
        waveformCtx.stroke();
    }
}

// 绘制波形
function drawWaveform(data, color, lineWidth) {
    if (!data || data.length === 0) return;
    
    const width = waveformCanvas.width;
    const height = waveformCanvas.height;
    const step = width / (data.length - 1);
    
    waveformCtx.strokeStyle = color;
    waveformCtx.lineWidth = lineWidth;
    waveformCtx.beginPath();
    
    // 绘制波形线
    for (let i = 0; i < data.length; i++) {
        const x = i * step;
        const y = height - (data[i] / 100) * height;
        
        if (i === 0) {
            waveformCtx.moveTo(x, y);
        } else {
            waveformCtx.lineTo(x, y);
        }
    }
    
    waveformCtx.stroke();
    
    // 添加渐变填充
    waveformCtx.lineTo(width, height);
    waveformCtx.lineTo(0, height);
    waveformCtx.closePath();
    
    const gradient = waveformCtx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, color.replace(')', ', 0.5)').replace('rgb', 'rgba'));
    gradient.addColorStop(1, color.replace(')', ', 0)').replace('rgb', 'rgba'));
    
    waveformCtx.fillStyle = gradient;
    waveformCtx.fill();
}

// 更新波形动画
function updateWaveformAnimation() {
    // 为每个数据点添加小的随机变化，创建波动效果
    for (let i = 0; i < waveformData.coherence.length; i++) {
        waveformData.coherence[i] += (Math.random() - 0.5) * 2;
        waveformData.coherence[i] = Math.max(0, Math.min(100, waveformData.coherence[i]));
        
        waveformData.entanglement[i] += (Math.random() - 0.5) * 2;
        waveformData.entanglement[i] = Math.max(0, Math.min(100, waveformData.entanglement[i]));
    }
} 