/**
 * ObtStar Hero 粒子背景
 * 使用原生 Canvas 实现星河漂移粒子效果
 */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], mouseX = 0, mouseY = 0;
  const PARTICLE_COUNT = 120;
  const MAX_DIST = 130;

  // 颜色方案
  const COLORS = [
    'rgba(99,102,241,',
    'rgba(124,58,237,',
    'rgba(6,182,212,',
    'rgba(16,185,129,',
    'rgba(139,92,246,',
  ];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 2.5 + 0.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
    };
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // 更新 & 绘制粒子
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;

      // 鼠标排斥
      const dx = p.x - mouseX, dy = p.y - mouseY;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 100) {
        p.vx += dx / d * 0.08;
        p.vy += dy / d * 0.08;
      }

      // 速度阻尼
      p.vx *= 0.995;
      p.vy *= 0.995;

      // 边界回绕
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;

      const opacityNow = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
      const rNow = p.r * (0.9 + 0.2 * Math.sin(p.pulse * 0.7));

      ctx.beginPath();
      ctx.arc(p.x, p.y, rNow, 0, Math.PI * 2);
      ctx.fillStyle = p.color + opacityNow + ')';
      ctx.fill();
    });

    // 连线
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  // 初始化
  init();
  draw();

  // 监听鼠标移动
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => {
      if (p.x > W) p.x = Math.random() * W;
      if (p.y > H) p.y = Math.random() * H;
    });
  });
})();
