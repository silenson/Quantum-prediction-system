const QuantumEngine = require('./quantum-engine');

// 创建测试函数
function testQuantumEngine() {
    console.log('开始测试量子运势预测系统...\n');
    
    // 初始化量子引擎
    const engine = new QuantumEngine();
    
    // 测试1: 量子态基本特性
    console.log('测试1: 量子态基本特性');
    const qubit = engine.quantumRegister.qubits[0];
    console.log('初始状态密度矩阵:');
    console.log(qubit.getDensityMatrix());
    console.log('量子态纯度:', qubit.getPurity());
    
    qubit.applyH();
    console.log('\n应用H门后:');
    console.log('密度矩阵:', qubit.getDensityMatrix());
    console.log('Bloch球角度:', qubit.getBlochAngles());
    console.log('\n');
    
    // 测试2: 量子态演化与相互作用
    console.log('测试2: 量子态演化与相互作用');
    const qubit2 = engine.quantumRegister.qubits[1];
    qubit2.applyH();
    console.log('两个量子比特的重叠度:', qubit.calculateOverlap(qubit2));
    
    engine.quantumRegister.createEntanglement(0, 1);
    console.log('纠缠后的干涉强度:', engine.quantumRegister.calculateInterference());
    console.log('系统保真度:', engine.quantumRegister.calculateFidelity());
    console.log('\n');
    
    // 测试3: 完整量子指标
    console.log('测试3: 完整量子指标');
    const indicators = engine.calculateQuantumIndicators();
    
    // 基本指标
    console.log('基本量子指标:');
    console.log('- 量子纠缠度:', indicators.entanglement);
    console.log('- 量子相干性:', indicators.coherence);
    console.log('- 不确定性:', indicators.uncertainty);
    console.log('- 量子能量:', indicators.energy);
    console.log('- 量子稳定性:', indicators.stability);
    console.log('- 系统熵:', indicators.entropy);
    console.log('- 估计相位:', indicators.estimatedPhase);
    
    // 新增指标
    console.log('\n增强量子指标:');
    console.log('- 量子态纯度:', indicators.purity);
    console.log('- 量子干涉强度:', indicators.interference);
    console.log('- 量子态保真度:', indicators.fidelity);
    console.log('- Bloch球坐标:');
    console.log('  * 倾角(θ):', indicators.blochAngles.theta * Math.PI, 'rad');
    console.log('  * 方位角(φ):', indicators.blochAngles.phi * 2 * Math.PI, 'rad');
    console.log('\n');
    
    // 测试4: 运势预测
    console.log('测试4: 基于完整量子特性的运势预测');
    const birthDate = '1990-01-01';
    const prediction = engine.getFortunePrediction('day', birthDate);
    console.log('运势值:', prediction.fortune);
    console.log('运势建议:', prediction.advice);
}

// 运行测试
console.log('量子运势预测系统 - 增强版量子指标测试');
console.log('================================\n');
testQuantumEngine(); 