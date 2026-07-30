/**
 * ObtStar 全局动效脚本
 * 包含：3D卡片悬停、滚动视差、卡片光晕跟踪、平滑导航等
 * 
 * 无障碍支持：
 * - 尊重 prefers-reduced-motion 用户偏好
 * - 所有动画均可被禁用
 */
(function () {
  'use strict';

  // 检测用户是否偏好减少动画
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  /**
   * HTML 转义函数 - 防止 XSS
   * @param {string} text - 需要转义的文本
   * @returns {string} 转义后的文本
   */
  function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ── 3D 卡片悬停倾斜效果 ─────────────────────────
  function init3DCards() {
    // 如果用户偏好减少动画，跳过此效果
    if (prefersReducedMotion) return;
    
    const cards = document.querySelectorAll('.report-card, .value-card, .stat-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = (y - cy) / cy * -8; // 倾斜幅度
        const ry = (x - cx) / cx * 8;

        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.01)`;
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';

        // 光晕跟随
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
      });
    });
  }

  // ── 卡片光晕跟踪（CSS 变量方式）──────────────────
  function initCardGlow() {
    const style = document.createElement('style');
    style.textContent = `
      .report-card::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: radial-gradient(
          220px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
          rgba(79,70,229,0.09),
          transparent 65%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      .report-card:hover::after { opacity: 1; }
    `;
    document.head.appendChild(style);
  }

  // ── 滚动时导航栏自动收缩 ───────────────────────────
  function initNavScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── 按钮涟漪效果 ──────────────────────────────────
  function initRipple() {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position:absolute;
          left:${x}px;top:${y}px;
          width:0;height:0;
          border-radius:50%;
          background:rgba(255,255,255,0.35);
          transform:translate(-50%,-50%);
          animation:ripple-anim 0.55s ease-out forwards;
          pointer-events:none;
        `;
        if (!getComputedStyle(btn).position || getComputedStyle(btn).position === 'static') {
          btn.style.position = 'relative';
        }
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // 注入 ripple keyframes
    if (!document.getElementById('ripple-style')) {
      const s = document.createElement('style');
      s.id = 'ripple-style';
      s.textContent = `
        @keyframes ripple-anim {
          to { width: 300px; height: 300px; opacity: 0; }
        }
      `;
      document.head.appendChild(s);
    }
  }

  // ── 图片懒加载占位 ────────────────────────────────
  function initImgFallback() {
    document.querySelectorAll('img').forEach(img => {
      img.onerror = function () {
        this.src = 'https://placehold.co/400x240/EEF2FF/4F46E5?text=ObtStar';
      };
    });
  }

  // ── 平滑锚点滚动 ──────────────────────────────────
  function initSmoothHash() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ── 标签云交互色 ──────────────────────────────────
  function initTagHover() {
    // 如果用户偏好减少动画，跳过变换效果
    document.querySelectorAll('.tag').forEach(tag => {
      tag.addEventListener('mouseenter', () => {
        if (!prefersReducedMotion) {
          tag.style.transform = 'scale(1.08) translateY(-1px)';
          tag.style.transition = 'transform 0.2s ease';
        }
      });
      tag.addEventListener('mouseleave', () => {
        tag.style.transform = '';
      });
    });
  }

  // ── 过渡进场动画（页面加载）──────────────────────
  function initPageEntrance() {
    // 如果用户偏好减少动画，直接显示内容
    if (prefersReducedMotion) {
      document.body.style.opacity = '1';
      document.body.style.transform = 'none';
      return;
    }
    
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(8px)';
    document.body.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
      });
    });
  }

  // ── 数字计数动画（全局适用）──────────────────────
  function initCounters() {
    const counterEls = document.querySelectorAll('.stat-num[data-count]');
    if (!counterEls.length) return;
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        
        // 如果用户偏好减少动画，直接显示最终值
        if (prefersReducedMotion) {
          el.textContent = target.toLocaleString();
          observer.unobserve(el);
          return;
        }
        
        const duration = 1600;
        const start = Date.now();
        const startVal = 0;
        const timer = setInterval(() => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(startVal + (target - startVal) * eased);
          el.textContent = current.toLocaleString();
          if (progress >= 1) { el.textContent = target.toLocaleString(); clearInterval(timer); }
        }, 16);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => observer.observe(el));
  }

  // ── 卡片入场错位动画 ─────────────────────────────
  function initCardStagger() {
    const cards = document.querySelectorAll('.report-card:not([data-aos])');
    cards.forEach((card, i) => {
      // 如果用户偏好减少动画，直接显示
      if (prefersReducedMotion) {
        card.style.opacity = '1';
        card.style.transform = 'none';
        return;
      }
      
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`;
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      obs.observe(card);
    });
  }

  // ── Mini progress bar 动画（首页 hero dashboard）──
  function initMiniProgress() {
    const fills = document.querySelectorAll('.mini-progress-fill');
    if (!fills.length) return;
    // 先设为 0，然后 animate
    fills.forEach(fill => {
      const targetW = fill.style.width;
      fill.style.width = '0%';
      setTimeout(() => {
        fill.style.width = targetW;
      }, 500);
    });
  }

  // ── 回到顶部按钮 ──────────────────────────────────
  function initBackToTop() {
    // 创建按钮
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', '回到顶部');
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(btn);

    // 滚动显示/隐藏
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.5);
    }, { passive: true });

    // 点击回到顶部
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── 键盘导航 ─────────────────────────────────────
  function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // Esc 关闭移动菜单
      if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
        }
      }

      // ? 显示快捷键提示
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const activeEl = document.activeElement;
        const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');
        if (!isInput) {
          showKeyboardShortcuts();
        }
      }

      // G 然后 H 回到首页
      if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const activeEl = document.activeElement;
        const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');
        if (!isInput) {
          window.location.href = 'index.html';
        }
      }

      // G 然后 R 跳转到报告库
      if (e.key === 'r' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const activeEl = document.activeElement;
        const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');
        if (!isInput) {
          window.location.href = 'reports.html';
        }
      }
    });
  }

  // 显示键盘快捷键提示
  function showKeyboardShortcuts() {
    const existing = document.getElementById('keyboard-hints');
    if (existing) {
      existing.remove();
      return;
    }

    const hints = document.createElement('div');
    hints.id = 'keyboard-hints';
    hints.innerHTML = `
      <div style="
        position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
        background:var(--bg-white);border:1px solid var(--border);
        border-radius:var(--radius-xl);padding:2rem;z-index:10000;
        box-shadow:var(--shadow-lg);min-width:300px;
      ">
        <h3 style="margin-bottom:1rem;font-size:1.125rem">⌨️ 键盘快捷键</h3>
        <div style="display:flex;flex-direction:column;gap:0.5rem;font-size:0.9rem;color:var(--text-body)">
          <div style="display:flex;justify-content:space-between">
            <span>回到首页</span><kbd style="background:var(--bg-subtle);padding:0.125rem 0.5rem;border-radius:4px;font-size:0.8rem">G H</kbd>
          </div>
          <div style="display:flex;justify-content:space-between">
            <span>报告库</span><kbd style="background:var(--bg-subtle);padding:0.125rem 0.5rem;border-radius:4px;font-size:0.8rem">G R</kbd>
          </div>
          <div style="display:flex;justify-content:space-between">
            <span>关闭弹窗</span><kbd style="background:var(--bg-subtle);padding:0.125rem 0.5rem;border-radius:4px;font-size:0.8rem">Esc</kbd>
          </div>
        </div>
        <button onclick="this.parentElement.remove()" style="
          margin-top:1rem;width:100%;padding:0.5rem;background:var(--primary);
          color:white;border:none;border-radius:var(--radius-md);cursor:pointer;
        ">关闭</button>
      </div>
    `;

    // 点击外部关闭
    const overlay = document.createElement('div');
    overlay.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.3);z-index:9999;';
    overlay.onclick = () => hints.remove();
    document.body.appendChild(overlay);
    document.body.appendChild(hints);
  }

  // ── 初始化主题切换按钮 ────────────────────────────
  function initThemeToggle() {
    const navToggle = document.getElementById('themeToggle');
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        window.themeManager.toggle();
      });
    }
  }

  // ── 搜索高亮 ─────────────────────────────────────
  function initSearchHighlight() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      document.querySelectorAll('.report-card, .report-card-sm').forEach(card => {
        const text = card.textContent;
        if (text.toLowerCase().includes(q.toLowerCase())) {
          card.style.boxShadow = '0 0 0 2px var(--primary), var(--shadow-md)';
        }
      });
    }
  }

  // ── 执行所有初始化 ───────────────────────────────
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(() => {
    initPageEntrance();
    initNavScroll();
    initImgFallback();
    initSmoothHash();
    initCardGlow();
    initMiniProgress();
    initBackToTop();
    initKeyboardNav();
    initThemeToggle();
    initSearchHighlight();

    // DOM 稳定后再挂交互
    setTimeout(() => {
      init3DCards();
      initRipple();
      initTagHover();
      initCounters();
      initCardStagger();
    }, 100);
  });

})();
