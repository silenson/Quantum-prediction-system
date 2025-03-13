class QuantumIndicatorsDisplay {
  constructor(container) {
    this.container = container;
    this.currentTab = 'prediction';  // 默认显示运势预测标签
    this.tabs = {
      prediction: '运势预测',
      basic: '基础量子态',
      advanced: '高级量子特性',
      geometry: '量子几何',
      interaction: '量子相互作用',
      education: '量子教程'
    };
    this.lastIndicators = {}; // 初始化 lastIndicators
    
    // 添加防抖函数，避免频繁渲染
    this.debouncedRender = this.debounce(this.render.bind(this), 100);
  }
  
  // 防抖函数
  debounce(func, wait) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  createTabs() {
    try {
      const tabsHtml = Object.entries(this.tabs)
        .map(([id, name]) => `
          <div class="quantum-tab ${id === this.currentTab ? 'active' : ''}" 
               data-tab="${id}">${name}</div>
        `).join('');

      return `
        <div class="quantum-tabs">
          ${tabsHtml}
        </div>
      `;
    } catch (error) {
      console.error('创建标签时出错:', error);
      return '<div class="quantum-tabs"><div class="quantum-tab active">基础量子态</div></div>';
    }
  }

  formatValue(value, precision = 4) {
    try {
      if (typeof value === 'number' && !isNaN(value)) {
        return value.toFixed(precision);
      }
      return (value !== undefined && value !== null && !isNaN(value)) ? value : '0.0000';
    } catch (error) {
      console.error('格式化值时出错:', error);
      return '0.0000';
    }
  }

  createIndicatorElement(label, value, description = '') {
    try {
      const safeValue = (value !== undefined && value !== null && !isNaN(value)) ? value : 0;
      const percentage = Math.min(100, Math.max(0, safeValue * 100));
      
      return `
        <div class="quantum-indicator">
          <div class="indicator-label">${label}</div>
          <div class="indicator-value">${this.formatValue(safeValue)}</div>
          ${description ? `<div class="indicator-description">${description}</div>` : ''}
          <div class="indicator-bar-container">
            <div class="indicator-bar" style="width: ${percentage}%"></div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('创建指标元素时出错:', error);
      return `<div class="quantum-indicator">
                <div class="indicator-label">${label}</div>
                <div class="indicator-value">0.0000</div>
                <div class="indicator-bar-container">
                  <div class="indicator-bar" style="width: 0%"></div>
                </div>
              </div>`;
    }
  }

  createTabContent(indicators) {
    try {
      const safeIndicators = indicators || {};
      
      const blochAngles = {
        theta: safeIndicators.blochAngles?.theta ?? 0,
        phi: safeIndicators.blochAngles?.phi ?? 0
      };
      
      // 确保Bloch球有最小可见角度，即使theta接近0
      const minVisibleTheta = Math.max(0.05, blochAngles.theta);
      
      const contents = {
        prediction: `
          <div class="tab-content">
            <h3 class="prediction-title">量子运势预测分析</h3>
            <div class="fortune-display">
              <div class="fortune-meter">
                <div class="fortune-value" style="width: ${(safeIndicators.fortune || 0.5) * 100}%"></div>
              </div>
              <div class="fortune-label">综合运势: <span class="fortune-number">${this.formatValue(safeIndicators.fortune || 0.5)}</span></div>
            </div>
            <div class="prediction-advice">${safeIndicators.advice || '暂无预测建议'}</div>
            <div class="quantum-indicators-grid prediction-indicators">
              <h4>核心量子指标</h4>
              ${this.createIndicatorElement('量子相干性', safeIndicators.coherence, '量子态的相干叠加程度')}
              ${this.createIndicatorElement('量子纯度', safeIndicators.purity, '量子态的纯净程度')}
              ${this.createIndicatorElement('量子能量', safeIndicators.energy, '系统的能量水平')}
            </div>
          </div>
        `,
        basic: `
          <div class="tab-content">
            <h3>基础量子态指标</h3>
            <div class="quantum-indicators-grid">
              ${this.createIndicatorElement('量子相干性', safeIndicators.coherence, '量子态的相干叠加程度，表示量子比特处于叠加态的程度')}
              ${this.createIndicatorElement('量子纯度', safeIndicators.purity, '量子态的纯净程度，纯态为1，混合态小于1')}
              ${this.createIndicatorElement('量子能量', safeIndicators.energy, '系统的能量水平，与量子态的激发程度相关')}
              ${this.createIndicatorElement('不确定性', safeIndicators.uncertainty, '海森堡不确定性原理的体现，位置和动量不能同时精确测量')}
            </div>
          </div>
        `,
        advanced: `
          <div class="tab-content">
            <h3>高级量子特性</h3>
            <div class="quantum-indicators-grid">
              ${this.createIndicatorElement('量子纠缠度', safeIndicators.entanglement, '量子比特间的纠缠强度，表示量子系统间的非局域关联')}
              ${this.createIndicatorElement('系统熵', safeIndicators.entropy, '量子系统的混乱程度，与信息丢失相关')}
              ${this.createIndicatorElement('量子稳定性', safeIndicators.stability, '量子态的稳定性指标，抵抗退相干的能力')}
              ${this.createIndicatorElement('相位估计', safeIndicators.estimatedPhase, '量子相位信息，与量子态的旋转角度相关')}
            </div>
          </div>
        `,
        geometry: `
          <div class="tab-content">
            <h3>量子几何特性</h3>
            <div class="quantum-indicators-grid">
              ${this.createIndicatorElement('Bloch球倾角', blochAngles.theta * 180, '量子态在Bloch球上的极角(度)')}
              ${this.createIndicatorElement('Bloch球方位角', blochAngles.phi * 360, '量子态在Bloch球上的方位角(度)')}
            </div>
            
            <div class="bloch-sphere-container">
              <div class="bloch-sphere">
                <div class="bloch-sphere-3d">
                  <div class="bloch-sphere-shell"></div>
                  <div class="bloch-sphere-inner-shell"></div>
                  
                  <div class="bloch-meridian meridian-1"></div>
                  <div class="bloch-meridian meridian-2"></div>
                  <div class="bloch-parallel parallel-1"></div>
                  <div class="bloch-parallel parallel-2"></div>
                  
                  <div class="bloch-equator"></div>
                  <div class="pole north-pole">|0⟩</div>
                  <div class="pole south-pole">|1⟩</div>
                  <div class="axis x-axis"></div>
                  <div class="axis y-axis"></div>
                  <div class="axis z-axis"></div>
                  <div class="axis-label x-label">X</div>
                  <div class="axis-label y-label">Y</div>
                  <div class="axis-label z-label">Z</div>
                  <div class="state-point-container">
                    <div class="state-point" style="transform: rotateX(${(minVisibleTheta * 180) || 9}deg) rotateZ(${(blochAngles.phi * 360) || 0}deg) translateY(-80px)"></div>
                  </div>
                  <div class="quantum-vector" style="transform: rotateX(${(minVisibleTheta * 180) || 9}deg) rotateZ(${(blochAngles.phi * 360) || 0}deg) translateY(-100%)"></div>
                </div>
              </div>
            </div>
            
            <div class="quantum-state-display">
              |ψ⟩ = cos(${((blochAngles.theta * 180 / 2) || 0).toFixed(1)}°)|0⟩ + e<sup>i${((blochAngles.phi * 360) || 0).toFixed(1)}°</sup>sin(${((blochAngles.theta * 180 / 2) || 0).toFixed(1)}°)|1⟩
            </div>
            
            <div class="bloch-explanation">
              <p>Bloch球是量子比特状态的几何表示。在这个球体上，北极代表|0⟩态，南极代表|1⟩态，
              而球面上的其他点代表这两个基态的叠加。</p>
              <p>当前量子态的位置由两个角度决定：</p>
              <ul>
                <li><strong>倾角(θ)：</strong> 从北极(|0⟩)测量的角度，范围从0°到180°</li>
                <li><strong>方位角(φ)：</strong> 在赤道平面上的角度，范围从0°到360°</li>
              </ul>
              <p>红色点和向量表示当前量子态在Bloch球上的位置。</p>
            </div>
          </div>
        `,
        interaction: `
          <div class="tab-content">
            <h3>量子相互作用</h3>
            <div class="quantum-indicators-grid">
              ${this.createIndicatorElement('量子干涉强度', safeIndicators.interference, '量子态之间的干涉效应，波函数相位叠加的结果')}
              ${this.createIndicatorElement('量子态保真度', safeIndicators.fidelity, '与理想量子态的接近程度，量子计算中的重要指标')}
              ${this.createIndicatorElement('退相干时间', safeIndicators.decoherenceTime || 20, '量子态保持相干的时间，环境影响下量子信息的保持时间')}
            </div>
            
            <div class="interference-pattern">
              <div class="wave">
                <div class="wave-path"></div>
              </div>
            </div>
            
            <p class="explanation">
              上图展示了量子干涉模式，类似于双缝实验中的干涉条纹。量子干涉是量子计算中的核心现象，
              它允许量子比特在多个状态之间相互影响，产生经典计算无法实现的计算能力。
            </p>
          </div>
        `,
        education: `
          <div class="tab-content">
            <h3>量子计算基础教程</h3>
            
            <div class="education-section">
              <h4>什么是量子比特？</h4>
              <p>
                想象一个普通硬币，它只能是正面或反面（0或1）。而量子比特就像一个神奇的硬币，它可以同时处于正面和反面的状态！
              </p>
              <p>
                <strong>经典比特</strong>：只能是0或1，就像普通硬币只能是正面或反面。
              </p>
              <p>
                <strong>量子比特(Qubit)</strong>：可以同时是0和1的叠加态，就像一个正在旋转的硬币，在观测前同时具有正面和反面的可能性。
              </p>
              <div class="concept-illustration">
                <div class="classical-bit">
                  <div class="bit-label">经典比特</div>
                  <div class="bit-states">
                    <div class="bit-state">0</div>
                    <div class="bit-state">1</div>
                  </div>
                  <div class="bit-description">只能是其中一种状态</div>
                </div>
                <div class="quantum-bit">
                  <div class="bit-label">量子比特</div>
                  <div class="bit-states">
                    <div class="bit-state">0</div>
                    <div class="bit-superposition">叠加态</div>
                    <div class="bit-state">1</div>
                  </div>
                  <div class="bit-description">可以同时处于多种状态</div>
                </div>
              </div>
            </div>
            
            <div class="education-section">
              <h4>量子叠加态是什么？</h4>
              <p>
                量子叠加态就像是"既是猫又是狗"的状态。在经典世界中，一个动物要么是猫要么是狗，不可能同时是两者。但在量子世界中，一个量子比特可以同时是0和1，直到我们观测它。
              </p>
              <p>
                著名的"薛定谔的猫"思想实验就是描述这种现象：在观测前，猫同时处于活着和死去的叠加态。
              </p>
              <div class="concept-illustration">
                <div class="superposition-example">
                  <div class="superposition-wave"></div>
                  <div class="superposition-text">观测前：0和1的叠加</div>
                  <div class="superposition-arrow">↓ 观测</div>
                  <div class="superposition-result">观测后：随机坍缩为0或1</div>
                </div>
              </div>
            </div>
            
            <div class="education-section">
              <h4>量子纠缠是什么？</h4>
              <p>
                想象两个相距遥远的硬币，它们被"神奇地连接"在一起。当你翻转一个硬币，无论相距多远，另一个硬币也会立即做出相应的翻转。这就是量子纠缠的简单类比。
              </p>
              <p>
                爱因斯坦称之为"幽灵般的超距作用"，两个纠缠的量子比特无论相距多远，一个量子比特的状态改变会立即影响另一个，这种现象挑战了我们对时空的传统理解。
              </p>
            </div>
            
            <div class="quantum-circuit">
              <h4>基本量子门电路</h4>
              <p>量子门就像是量子比特的开关或转换器，可以改变量子比特的状态。以下是几种基本的量子门：</p>
              <div class="circuit-grid">
                <div class="circuit-label">Qubit 0</div>
                <div class="circuit-wire">
                  <div class="circuit-gate hadamard">H</div>
                </div>
                <div class="circuit-wire">
                  <div class="circuit-gate phase">P</div>
                </div>
                <div class="circuit-wire">
                  <div class="circuit-gate">X</div>
                </div>
                <div class="circuit-wire">
                  <div class="circuit-gate cnot">•</div>
                  <div class="circuit-connector"></div>
                </div>
                <div class="circuit-wire">
                  <div class="circuit-gate">Z</div>
                </div>
                
                <div class="circuit-label">Qubit 1</div>
                <div class="circuit-wire">
                  <div class="circuit-gate">H</div>
                </div>
                <div class="circuit-wire">
                  <div class="circuit-gate">Z</div>
                </div>
                <div class="circuit-wire">
                  <div class="circuit-gate phase">P</div>
                </div>
                <div class="circuit-wire"></div>
                <div class="circuit-wire">
                  <div class="circuit-gate">X</div>
                </div>
                
                <div class="circuit-label">Qubit 2</div>
                <div class="circuit-wire"></div>
                <div class="circuit-wire"></div>
                <div class="circuit-wire"></div>
                <div class="circuit-wire"></div>
                <div class="circuit-wire">
                  <div class="circuit-gate hadamard">H</div>
                </div>
              </div>
            </div>
            
            <div class="education-section">
              <h4>量子门的作用</h4>
              <p>量子门就像是对量子比特进行的特殊操作，每种门有不同的功能：</p>
              <div class="gates-explanation">
                <div class="gate-item">
                  <div class="gate-icon hadamard">H</div>
                  <div class="gate-description">
                    <strong>Hadamard门</strong>：创建叠加态，就像把一个静止的硬币变成旋转的硬币。
                    <div class="gate-effect">|0⟩ → (|0⟩+|1⟩)/√2</div>
                  </div>
                </div>
                <div class="gate-item">
                  <div class="gate-icon">X</div>
                  <div class="gate-description">
                    <strong>Pauli-X门</strong>：量子比特的"非"门，就像把硬币从正面翻到反面。
                    <div class="gate-effect">|0⟩ → |1⟩，|1⟩ → |0⟩</div>
                  </div>
                </div>
                <div class="gate-item">
                  <div class="gate-icon">Z</div>
                  <div class="gate-description">
                    <strong>Pauli-Z门</strong>：改变相位，不改变概率，就像给旋转的硬币一个"魔法触碰"。
                    <div class="gate-effect">|1⟩ → -|1⟩</div>
                  </div>
                </div>
                <div class="gate-item">
                  <div class="gate-icon phase">P</div>
                  <div class="gate-description">
                    <strong>相位门</strong>：引入特定角度的相位旋转，就像调整硬币旋转的角度。
                    <div class="gate-effect">|1⟩ → e<sup>iθ</sup>|1⟩</div>
                  </div>
                </div>
                <div class="gate-item">
                  <div class="gate-icon cnot">•</div>
                  <div class="gate-description">
                    <strong>CNOT门</strong>：两个量子比特间的相互作用，创建纠缠，就像连接两个硬币使它们同步翻转。
                    <div class="gate-effect">|10⟩ → |11⟩，|11⟩ → |10⟩</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="education-section">
              <h4>量子计算的应用</h4>
              <p>
                量子计算机利用量子力学的特性，可以在某些问题上比传统计算机快得多。就像一个普通人只能走一条路，而量子计算机可以同时探索多条路径。
              </p>
              <div class="applications-grid">
                <div class="application-item">
                  <div class="application-icon crypto"></div>
                  <div class="application-title">密码学</div>
                  <div class="application-description">Shor算法可以快速分解大数，这可能会破解当前的加密系统，但也能创建更安全的量子加密。</div>
                </div>
                <div class="application-item">
                  <div class="application-icon search"></div>
                  <div class="application-title">搜索优化</div>
                  <div class="application-description">Grover算法可以在未排序数据库中更快地找到目标，就像在一堆杂乱的书中快速找到特定的一本。</div>
                </div>
                <div class="application-item">
                  <div class="application-icon chemistry"></div>
                  <div class="application-title">化学模拟</div>
                  <div class="application-description">量子计算机可以精确模拟分子行为，加速新药物和新材料的开发。</div>
                </div>
                <div class="application-item">
                  <div class="application-icon ai"></div>
                  <div class="application-title">人工智能</div>
                  <div class="application-description">量子机器学习算法可能会大大加速AI训练过程，创造更强大的AI系统。</div>
                </div>
              </div>
            </div>
            
            <div class="education-section">
              <h4>量子计算的挑战</h4>
              <p>
                尽管量子计算有巨大潜力，但它也面临着重大挑战：
              </p>
              <ul class="challenges-list">
                <li><strong>退相干</strong>：量子比特很容易受到环境干扰而失去其量子特性，就像一个旋转的硬币很快就会停下来。</li>
                <li><strong>错误率</strong>：量子操作的错误率目前仍然很高，需要复杂的错误纠正技术。</li>
                <li><strong>扩展性</strong>：增加量子比特数量并保持其量子特性非常困难，就像同时保持多个硬币旋转。</li>
                <li><strong>温度要求</strong>：大多数量子计算机需要接近绝对零度的环境才能工作。</li>
              </ul>
            </div>
            
            <div class="education-footer">
              <p>量子计算是一个令人兴奋的前沿领域，它可能会彻底改变我们解决复杂问题的方式。虽然完全实用的量子计算机还需要时间，但它的潜力是无限的！</p>
            </div>
          </div>
        `
      };

      return contents[this.currentTab] || contents.basic;
    } catch (error) {
      console.error('创建标签内容时出错:', error);
      return `<div class="tab-content">
                <h3>基础量子态指标</h3>
                <div class="error-message">显示量子指标时出错，请刷新页面重试。</div>
              </div>`;
    }
  }

  render(indicators) {
    try {
      this.lastIndicators = indicators || this.lastIndicators || {};
      
      const html = `
        <div class="quantum-indicators-container">
          ${this.createTabs()}
          <div class="quantum-content">
            ${this.createTabContent(this.lastIndicators)}
          </div>
        </div>
      `;

      if (this.container) {
        this.container.innerHTML = html;
        this.attachEventListeners();
      } else {
        console.error('容器元素不存在');
      }
    } catch (error) {
      console.error('渲染量子指标时出错:', error);
      if (this.container) {
        this.container.innerHTML = '<div class="error-message">显示量子指标时出错，请刷新页面重试。</div>';
      }
    }
  }

  attachEventListeners() {
    try {
      if (!this.container) {
        console.error('容器元素不存在，无法添加事件监听器');
        return;
      }
      
      const tabs = this.container.querySelectorAll('.quantum-tab');
      if (!tabs || tabs.length === 0) {
        console.error('未找到标签元素');
        return;
      }
      
      tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
          try {
            if (!e.target || !e.target.dataset || !e.target.dataset.tab) {
              console.error('标签元素缺少必要的数据属性');
              return;
            }
            
            this.currentTab = e.target.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            const html = `
              <div class="quantum-indicators-container">
                ${this.createTabs()}
                <div class="quantum-content">
                  ${this.createTabContent(this.lastIndicators)}
                </div>
              </div>
            `;
            this.container.innerHTML = html;
            this.attachEventListeners();
          } catch (error) {
            console.error('处理标签点击事件时出错:', error);
          }
        });
      });
      
      const gates = this.container.querySelectorAll('.circuit-gate');
      gates.forEach(gate => {
        gate.addEventListener('mouseover', () => {
          try {
            let description = '';
            if (gate.textContent === 'H') {
              description = 'Hadamard门: 创建叠加态';
            } else if (gate.textContent === 'X') {
              description = 'Pauli-X门: 量子比特翻转';
            } else if (gate.textContent === 'Z') {
              description = 'Pauli-Z门: 相位翻转';
            } else if (gate.textContent === 'P') {
              description = '相位门: 引入相位旋转';
            } else if (gate.textContent === '•') {
              description = '受控非门: 创建量子纠缠';
            }
            
            if (description) {
              const tooltip = document.createElement('div');
              tooltip.className = 'gate-tooltip';
              tooltip.textContent = description;
              gate.appendChild(tooltip);
            }
          } catch (error) {
            console.error('处理门元素悬停事件时出错:', error);
          }
        });
        
        gate.addEventListener('mouseout', () => {
          try {
            const tooltip = gate.querySelector('.gate-tooltip');
            if (tooltip) {
              tooltip.remove();
            }
          } catch (error) {
            console.error('处理门元素鼠标离开事件时出错:', error);
          }
        });
      });
    } catch (error) {
      console.error('添加事件监听器时出错:', error);
    }
  }

  update(indicators) {
    try {
      if (!indicators) {
        console.error('更新指标时收到无效数据');
        return;
      }
      
      this.lastIndicators = indicators;
      this.debouncedRender(indicators);
    } catch (error) {
      console.error('更新量子指标时出错:', error);
      this.render(this.lastIndicators); // 尝试使用上次的有效数据
    }
  }
}

// 将类直接暴露给全局作用域
window.QuantumIndicatorsDisplay = QuantumIndicatorsDisplay; 