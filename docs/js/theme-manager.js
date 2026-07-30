/**
 * ObtStar 深色模式管理器
 * 支持系统偏好检测、用户手动切换、本地存储持久化
 */
class ThemeManager {
  constructor() {
    this.storageKey = 'obtstar-theme';
    this.currentTheme = 'light';
    this.transitionDuration = 300;
    
    this.init();
  }
  
  init() {
    // 优先读取已设置的主题（由<head>内联脚本设置）
    const existingTheme = document.documentElement.getAttribute('data-theme');
    const savedTheme = localStorage.getItem(this.storageKey);
    
    if (existingTheme) {
      // 使用已设置的主题
      this.currentTheme = existingTheme;
    } else if (savedTheme) {
      // 使用用户保存的主题
      this.currentTheme = savedTheme;
      this.applyTheme(this.currentTheme);
    } else {
      // 检测系统偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = prefersDark ? 'dark' : 'light';
      this.applyTheme(this.currentTheme);
    }
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.storageKey)) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
    
    // 监听切换事件
    document.addEventListener('theme-toggle', () => this.toggle());
  }
  
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    
    // 更新 meta theme-color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#0F172A' : '#F8FAFC');
    }
    
    // 触发主题切换事件
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme } }));
  }
  
  setTheme(theme) {
    if (this.currentTheme === theme) return;
    
    // 添加过渡动画
    document.documentElement.style.transition = `background-color ${this.transitionDuration}ms ease, color ${this.transitionDuration}ms ease`;
    
    this.applyTheme(theme);
    localStorage.setItem(this.storageKey, theme);
    
    // 移除过渡效果
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, this.transitionDuration);
  }
  
  toggle() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  getTheme() {
    return this.currentTheme;
  }
  
  isDark() {
    return this.currentTheme === 'dark';
  }
}

// 全局实例
window.ThemeManager = ThemeManager;
window.themeManager = new ThemeManager();
