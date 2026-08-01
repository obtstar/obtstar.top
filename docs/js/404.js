// 防止FOUC的内联主题脚本
    (function() {
      const savedTheme = localStorage.getItem('obtstar-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    })();
