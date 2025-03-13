/**
 * 量子电路可视化器
 * 使用D3.js绘制量子电路
 */

// 确保D3.js已加载
if (typeof d3 === 'undefined') {
    console.error('D3.js未加载，量子电路可视化功能不可用');
} else {
    console.log('D3.js已加载，版本:', d3.version);
    
    // 定义全局showQuantumCircuit函数
    window.showQuantumCircuit = function(circuit, gateClickCallback) {
        console.log('显示量子电路:', circuit);
        
        // 获取电路显示区域
        const circuitArea = document.getElementById('quantum-circuit-visualizer');
        if (!circuitArea) {
            console.error('找不到电路显示区域');
            return false;
        }
        
        // 清空现有内容
        circuitArea.innerHTML = '';
        
        // 检查电路数据是否有效
        if (!circuit || !circuit.qubits || !Array.isArray(circuit.qubits) || !circuit.gates || !Array.isArray(circuit.gates)) {
            console.error('电路数据无效');
            
            // 显示错误信息
            const errorMsg = document.createElement('div');
            errorMsg.textContent = '无法显示量子电路：数据无效';
            errorMsg.style.color = '#ff6b6b';
            errorMsg.style.padding = '20px';
            errorMsg.style.textAlign = 'center';
            circuitArea.appendChild(errorMsg);
            
            return false;
        }
        
        // 设置SVG尺寸和边距
        const margin = { top: 40, right: 40, bottom: 40, left: 100 };
        const width = circuitArea.clientWidth - margin.left - margin.right;
        const height = Math.max(300, circuit.qubits.length * 60) - margin.top - margin.bottom;
        
        // 创建SVG元素
        const svg = d3.select(circuitArea)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
        
        // 添加标题
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', -20)
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .style('fill', '#4cc9f0')
            .text('量子电路可视化');
        
        // 计算列数（最大列号+1）
        const columnCount = circuit.gates.reduce((max, gate) => Math.max(max, gate.column + 1), 0);
        
        // 创建X轴比例尺（列）
        const xScale = d3.scaleLinear()
            .domain([0, columnCount - 1])
            .range([0, width]);
        
        // 创建Y轴比例尺（量子比特）
        const yScale = d3.scaleLinear()
            .domain([0, circuit.qubits.length - 1])
            .range([0, height]);
        
        // 绘制量子比特线
        circuit.qubits.forEach((qubit, index) => {
            // 添加量子比特标签
            svg.append('text')
                .attr('x', -10)
                .attr('y', yScale(index) + 5)
                .attr('text-anchor', 'end')
                .style('font-size', '14px')
                .style('fill', 'white')
                .text(qubit.name || `q${index}`);
            
            // 绘制量子比特线
            svg.append('line')
                .attr('x1', 0)
                .attr('y1', yScale(index))
                .attr('x2', width)
                .attr('y2', yScale(index))
                .style('stroke', '#555')
                .style('stroke-width', 1);
        });
        
        // 绘制量子门
        circuit.gates.forEach((gate, gateIndex) => {
            // 计算门的位置
            const x = xScale(gate.column);
            
            // 对于每个目标量子比特
            gate.targets.forEach(target => {
                const y = yScale(target);
                
                // 创建门的容器
                const gateGroup = svg.append('g')
                    .attr('transform', `translate(${x}, ${y})`)
                    .style('cursor', 'pointer')
                    .on('click', () => {
                        if (typeof gateClickCallback === 'function') {
                            gateClickCallback(gate);
                        }
                    });
                
                // 根据门类型绘制不同的形状
                if (gate.name === 'measure') {
                    // 测量门
                    gateGroup.append('rect')
                        .attr('x', -15)
                        .attr('y', -15)
                        .attr('width', 30)
                        .attr('height', 30)
                        .attr('rx', 5)
                        .style('fill', 'rgba(231, 76, 60, 0.7)')
                        .style('stroke', '#e74c3c');
                    
                    // 测量符号
                    gateGroup.append('path')
                        .attr('d', 'M-7,-5 L7,-5 L0,5 Z')
                        .style('fill', 'white');
                    
                    gateGroup.append('line')
                        .attr('x1', 0)
                        .attr('y1', 5)
                        .attr('x2', 0)
                        .attr('y2', 10)
                        .style('stroke', 'white')
                        .style('stroke-width', 2);
                } else if (gate.name === 'CNOT') {
                    // CNOT门
                    gateGroup.append('circle')
                        .attr('r', 15)
                        .style('fill', 'rgba(52, 152, 219, 0.7)')
                        .style('stroke', '#3498db');
                    
                    gateGroup.append('line')
                        .attr('x1', -10)
                        .attr('y1', 0)
                        .attr('x2', 10)
                        .attr('y2', 0)
                        .style('stroke', 'white')
                        .style('stroke-width', 2);
                    
                    gateGroup.append('line')
                        .attr('x1', 0)
                        .attr('y1', -10)
                        .attr('x2', 0)
                        .attr('y2', 10)
                        .style('stroke', 'white')
                        .style('stroke-width', 2);
                } else {
                    // 其他门
                    gateGroup.append('rect')
                        .attr('x', -15)
                        .attr('y', -15)
                        .attr('width', 30)
                        .attr('height', 30)
                        .attr('rx', 5)
                        .style('fill', 'rgba(46, 204, 113, 0.7)')
                        .style('stroke', '#2ecc71');
                    
                    // 门名称
                    gateGroup.append('text')
                        .attr('text-anchor', 'middle')
                        .attr('dominant-baseline', 'middle')
                        .style('font-size', '12px')
                        .style('fill', 'white')
                        .text(gate.name);
                }
            });
            
            // 绘制控制点和控制线
            if (gate.controls && gate.controls.length > 0) {
                gate.controls.forEach(control => {
                    const controlY = yScale(control);
                    
                    // 控制点
                    svg.append('circle')
                        .attr('cx', x)
                        .attr('cy', controlY)
                        .attr('r', 5)
                        .style('fill', 'black')
                        .style('stroke', 'white');
                    
                    // 控制线（连接控制点和目标）
                    gate.targets.forEach(target => {
                        const targetY = yScale(target);
                        
                        svg.append('line')
                            .attr('x1', x)
                            .attr('y1', controlY)
                            .attr('x2', x)
                            .attr('y2', targetY)
                            .style('stroke', 'white')
                            .style('stroke-width', 1)
                            .style('stroke-dasharray', '3,3');
                    });
                });
            }
        });
        
        // 添加缩放功能
        const zoom = d3.zoom()
            .scaleExtent([0.5, 3])
            .on('zoom', (event) => {
                svg.attr('transform', event.transform);
            });
        
        d3.select(circuitArea).select('svg')
            .call(zoom);
        
        return true;
    };
}

// 页面加载完成后通知
document.addEventListener('DOMContentLoaded', function() {
    console.log('量子电路可视化器已加载');
}); 