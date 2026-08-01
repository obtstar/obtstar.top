    // 多语言支持
    const i18n = {
      'zh-CN': {
        loading: '正在加载报告内容...',
        loadingMore: '正在加载更多内容...',
        noContent: '暂无完整内容',
        returnDetail: '返回报告详情',
        toc: '目录',
        prevPage: '上一页',
        nextPage: '下一页',
        page: '页',
        theme: '深色模式',
        fontDecrease: '字体减小',
        fontIncrease: '字体增大',
        fullscreen: '全屏',
        exitFullscreen: '退出全屏',
        language: '切换语言',
        share: '分享',
        bookmark: '收藏',
        close: '关闭',
        pageOf: '/',
        printPdf: '导出PDF',
        preparingPrint: '正在准备PDF...'
      },
      'en': {
        loading: 'Loading report content...',
        loadingMore: 'Loading more content...',
        noContent: 'No content available',
        returnDetail: 'Return to Report Detail',
        toc: 'Table of Contents',
        prevPage: 'Previous',
        nextPage: 'Next',
        page: 'Page',
        theme: 'Toggle Theme',
        fontDecrease: 'Decrease Font',
        fontIncrease: 'Increase Font',
        fullscreen: 'Fullscreen',
        exitFullscreen: 'Exit Fullscreen',
        language: 'Switch Language',
        share: 'Share',
        bookmark: 'Bookmark',
        close: 'Close',
        pageOf: '/',
        printPdf: 'Export PDF',
        preparingPrint: 'Preparing PDF...'
      },
      'ja': {
        loading: 'レポートコンテンツを読み込み中...',
        loadingMore: 'コンテンツをさらに読み込み中...',
        noContent: 'コンテンツがありません',
        returnDetail: 'レポート詳細に戻る',
        toc: '目次',
        prevPage: '前のページ',
        nextPage: '次のページ',
        page: 'ページ',
        theme: 'ダークモード',
        fontDecrease: 'フォントを小さく',
        fontIncrease: 'フォントを大きく',
        fullscreen: '全画面',
        exitFullscreen: '全画面を終了',
        language: '言語を切り替え',
        share: '共有',
        bookmark: 'ブックマーク',
        close: '閉じる',
        pageOf: '/',
        printPdf: 'PDF出力',
        preparingPrint: 'PDF準備中...'
      }
    };

    // 支持的语言列表（用于循环切换）
    const SUPPORTED_LANGS = ['zh-CN', 'en', 'ja'];
    const LANG_LABELS = { 'zh-CN': '中', 'en': 'EN', 'ja': '日' };

    // 当前语言
    let currentLang = localStorage.getItem('reader-lang') || 'zh-CN';
    if (!SUPPORTED_LANGS.includes(currentLang)) {
      currentLang = 'zh-CN';
    }

    // 获取翻译文本
    function t(key) {
      return i18n[currentLang]?.[key] || i18n['zh-CN'][key] || key;
    }

    // 切换语言（在报告支持的语言间循环）
    function toggleLanguage() {
      if (!isMultilingual) return;
      const currentIndex = reportLangs.indexOf(currentLang);
      const nextIndex = (currentIndex + 1) % reportLangs.length;
      currentLang = reportLangs[nextIndex];
      localStorage.setItem('reader-lang', currentLang);
      updateLanguageUI();
      updatePageText();
      // 重新渲染内容以应用新语言
      if (allSections.length > 0) {
        renderPage(currentPage);
        renderTOC();
      }
    }

    // 更新语言UI
    function updateLanguageUI() {
      // 同步 <html lang>
      document.documentElement.lang = currentLang;
      const langBtn = document.getElementById('langBtn');
      if (langBtn) {
        // 非多语言报告隐藏语言按钮
        langBtn.style.display = isMultilingual ? '' : 'none';
        const langIcon = document.getElementById('langIcon');
        if (langIcon) {
          langIcon.textContent = LANG_LABELS[currentLang] || '中';
        }
      }
    }

    // 更新页面文本
    function updatePageText() {
      // 目录标题
      const tocHeader = document.querySelector('.reader-sidebar-header');
      if (tocHeader) {
        tocHeader.innerHTML = `<i class="fas fa-list-ul" style="margin-right:0.5rem"></i>${t('toc')}`;
      }
      
      // 加载状态
      const loadingEl = document.getElementById('loading');
      if (loadingEl) {
        loadingEl.querySelector('p').textContent = t('loading');
      }
      
      // 分块加载
      const chunkLoading = document.getElementById('chunkLoading');
      if (chunkLoading) {
        chunkLoading.querySelector('span').textContent = t('loadingMore');
      }
      
      // 分页按钮
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      if (prevBtn) {
        prevBtn.innerHTML = `<i class="fas fa-chevron-left"></i> ${t('prevPage')}`;
      }
      if (nextBtn) {
        nextBtn.innerHTML = `${t('nextPage')} <i class="fas fa-chevron-right"></i>`;
      }
      
      // 更新分页信息
      const pageInfo = document.getElementById('pageInfo');
      if (pageInfo && pageInfo.textContent) {
        const parts = pageInfo.textContent.split(/[\/\-]/);
        if (parts.length >= 2) {
          pageInfo.textContent = `${parts[0]} ${t('pageOf')} ${parts[parts.length - 1]}`;
        }
      }
      
      // 更新工具栏按钮 title
      document.querySelectorAll('.reader-btn').forEach(btn => {
        const title = btn.getAttribute('title');
        const icon = btn.querySelector('i');
        if (icon) {
          if (icon.classList.contains('fa-moon') || icon.classList.contains('fa-sun')) {
            btn.setAttribute('title', t('theme'));
          } else if (icon.classList.contains('fa-expand') || icon.classList.contains('fa-compress')) {
            btn.setAttribute('title', isFullscreen ? t('exitFullscreen') : t('fullscreen'));
          }
        }
      });
      
      // 更新无内容提示
      const noContentBtn = document.querySelector('.reader-page-btn[onclick="goBack()"]');
      if (noContentBtn) {
        noContentBtn.textContent = t('returnDetail');
      }
    }

    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const reportId = urlParams.get('id') || 'report-001';
    const report = REPORTS.find(r => r.id === reportId) || REPORTS[0];

    // 报告是否支持多语言（只有声明 multilingual.enabled 的报告才显示语言按钮）
    const isMultilingual = !!(report && report.multilingual && report.multilingual.enabled);
    // 报告支持的语言（未声明时回退为默认三语循环）
    const reportLangs = isMultilingual && Array.isArray(report.multilingual.languages)
      ? report.multilingual.languages.map(l => l.code)
      : ['zh-CN'];
    
    // 报告数据管理
    let reportManifest = null;  // 报告清单
    let loadedChunks = {};      // 已加载的分块
    let allSections = [];       // 所有章节（合并后）
    
    // 状态变量
    let currentPage = 1;
    let currentSection = 0;
    const sectionsPerPage = 3;
    let isDark = false;
    let fontLevel = 1;
    let totalChunks = 0;
    let isFullscreen = false;

    // 初始化
    document.addEventListener('DOMContentLoaded', () => {
      init();
    });

    async function init() {
      // 初始化语言
      updateLanguageUI();
      
      // 设置标题
      document.title = `${report.title} - 阅读模式`;
      document.getElementById('reportTitle').textContent = report.title;

      // 检查是否需要自动打印
      const shouldPrint = urlParams.get('print') === '1';

      // 加载报告清单
      reportManifest = await loadManifest(reportId);
      
      if (!reportManifest) {
        showNoContent();
        return;
      }

      totalChunks = reportManifest.totalChunks;
      
      // 先加载第一块内容（包含摘要和前几章）
      const firstChunk = await loadChunk(reportId, 0);
      if (firstChunk) {
        loadedChunks[0] = firstChunk;
        allSections = [...firstChunk.sections];
        
        renderTOC();
        renderProgressIndicator();
        renderPage(1);
        
        // 如果需要打印，预加载所有内容后触发打印
        if (shouldPrint) {
          await preloadAllChunks();
          setTimeout(() => {
            window.print();
          }, 1500);
        }
      } else {
        showNoContent();
      }

      // 滚动监听
      window.addEventListener('scroll', updateProgress);
    }

    // 预加载所有分块（用于打印）
    async function preloadAllChunks() {
      for (let i = 1; i < totalChunks; i++) {
        const chunk = await loadChunk(reportId, i);
        if (chunk) {
          mergeSections(chunk);
        }
      }
      // 注意：不调用 renderPage，避免覆盖已渲染的内容
      // 调用方会负责重新渲染（如 printReport 中的 renderFullContent）
    }

    // 加载报告清单
    async function loadManifest(reportId) {
      try {
        const response = await fetch(`data/reports-content/${reportId}/manifest.json`);
        if (!response.ok) return null;
        return await response.json();
      } catch (error) {
        console.error('加载清单失败:', error);
        return null;
      }
    }

    // 加载指定分块
    async function loadChunk(reportId, chunkIndex) {
      // 检查是否已加载
      if (loadedChunks[chunkIndex]) {
        return loadedChunks[chunkIndex];
      }
      
      try {
        const response = await fetch(`data/reports-content/${reportId}/chunk-${chunkIndex}.js`);
        if (!response.ok) {
          console.error(`加载 chunk ${chunkIndex} 失败: HTTP ${response.status}`);
          return null;
        }
        
        const jsCode = await response.text();
        
        // 执行JS代码 - 使用 Function 构造器更安全
        const chunkKey = `REPORT_CHUNK_${reportId.replace(/-/g, '_')}_${chunkIndex}`;
        try {
          // 清除旧的 chunk 数据
          if (window[chunkKey]) {
            delete window[chunkKey];
          }
          // 执行新代码
          eval(jsCode);
        } catch (e) {
          console.error('执行 chunk JS 失败:', e);
          return null;
        }
        
        // 获取内容
        const chunk = window[chunkKey];
        
        if (chunk) {
          loadedChunks[chunkIndex] = chunk;
          return chunk;
        } else {
          console.error(`Chunk ${chunkIndex} 执行后未找到数据: ${chunkKey}`);
        }
        return null;
      } catch (error) {
        console.error(`加载分块 ${chunkIndex} 失败:`, error);
        return null;
      }
    }

    // 确保指定范围的章节已加载
    async function ensureSectionsLoaded(sectionIndex) {
      if (!reportManifest) return;
      
      // 计算需要加载的分块
      const sectionsPerChunk = Math.ceil(allSections.length / totalChunks);
      const targetChunk = Math.floor(sectionIndex / sectionsPerChunk);
      
      // 加载目标分块及其相邻分块（预加载）
      const chunksToLoad = [targetChunk];
      if (targetChunk > 0) chunksToLoad.push(targetChunk - 1);
      if (targetChunk < totalChunks - 1) chunksToLoad.push(targetChunk + 1);
      
      for (const chunkIdx of chunksToLoad) {
        if (!loadedChunks[chunkIdx]) {
          showChunkLoading();
          const chunk = await loadChunk(reportId, chunkIdx);
          if (chunk) {
            // 合并章节
            mergeSections(chunk);
          }
          hideChunkLoading();
        }
      }
    }

    // 合并章节（保持顺序）
    function mergeSections(chunk) {
      // 根据chunkIndex确定插入位置
      const existingIds = new Set(allSections.map(s => s.title));
      
      for (const section of chunk.sections) {
        if (!existingIds.has(section.title)) {
          allSections.push(section);
          existingIds.add(section.title);
        }
      }
      
      // 重新渲染目录
      renderTOC();
    }

    // 获取章节标题（根据语言）
    function getSectionTitle(section) {
      if (section.title_i18n) {
        // 优先当前语言，回退中文，最后取第一个可用语言
        if (section.title_i18n[currentLang]) {
          return section.title_i18n[currentLang];
        }
        if (section.title_i18n['zh-CN']) {
          return section.title_i18n['zh-CN'];
        }
        const firstLang = Object.keys(section.title_i18n)[0];
        if (firstLang) {
          return section.title_i18n[firstLang];
        }
      }
      return section.title;
    }

    // 获取章节内容（根据语言）
    function getSectionContent(section) {
      if (section.content_i18n) {
        // 优先当前语言，回退中文，最后取第一个可用语言
        if (section.content_i18n[currentLang]) {
          return section.content_i18n[currentLang];
        }
        if (section.content_i18n['zh-CN']) {
          return section.content_i18n['zh-CN'];
        }
        const firstLang = Object.keys(section.content_i18n)[0];
        if (firstLang) {
          return section.content_i18n[firstLang];
        }
      }
      return section.content;
    }

    // 显示分块加载状态
    function showChunkLoading() {
      document.getElementById('chunkLoading').style.display = 'block';
    }

    function hideChunkLoading() {
      document.getElementById('chunkLoading').style.display = 'none';
    }

    // 显示无内容
    function showNoContent() {
      document.getElementById('loading').innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <p>暂无完整内容</p>
        <button class="reader-page-btn" style="margin-top:1rem" onclick="goBack()">
          返回报告详情
        </button>
      `;
    }

    // 侧边栏目录标题最大显示宽度（中文字符按 2 计，其余按 1）
    const TOC_MAX_LEN = 24;

    // 按显示宽度截断标题，超出补省略号
    function truncateTitle(title, maxLen) {
      if (!title) return '';
      let width = 0;
      let result = '';
      for (const ch of title) {
        const w = /[\u4e00-\u9fff\u3400-\u4dbf\uF900-\uFAFF\u3000-\u303f\uFF00-\uFFEF]/.test(ch) ? 2 : 1;
        if (width + w > maxLen) break;
        width += w;
        result += ch;
      }
      if (result.length < title.length) {
        result = result.replace(/[\s,，。；;、:：]+$/, '') + '…';
      }
      return result;
    }

    // 用于 HTML 属性（title 提示）的转义
    function escapeAttr(s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }

    // 渲染目录
    function renderTOC() {
      const toc = document.getElementById('tocList');
      let html = '';
      
      allSections.forEach((section, idx) => {
        const levelClass = section.level === 1 ? '' : (section.level === 2 ? 'lv2' : 'lv3');
        const title = getSectionTitle(section);
        const shortTitle = truncateTitle(title, TOC_MAX_LEN);
        html += `<div class="reader-toc-item ${levelClass}" onclick="scrollToSection(${idx})" data-idx="${idx}" title="${escapeAttr(title)}">${shortTitle}</div>`;
      });
      
      toc.innerHTML = html;
    }

    // 渲染右侧进度点
    function renderProgressIndicator() {
      const indicator = document.getElementById('progressIndicator');
      const totalPages = Math.ceil(allSections.length / sectionsPerPage);
      
      let html = '';
      for (let i = 0; i < totalPages; i++) {
        const activeClass = i === 0 ? 'active' : '';
        html += `<div class="progress-dot ${activeClass}" onclick="goToPage(${i + 1})" title="第${i + 1}页"></div>`;
      }
      
      indicator.innerHTML = html;
    }

    // 渲染当前页
    async function renderPage(page, options = {}) {
      const smoothScroll = options.smooth !== false;
      currentPage = page;
      
      const startIdx = (page - 1) * sectionsPerPage;
      const endIdx = Math.min(startIdx + sectionsPerPage, allSections.length);
      
      // 确保需要的章节已加载
      await ensureSectionsLoaded(endIdx - 1);
      
      const pageSections = allSections.slice(startIdx, endIdx);
      
      // 更新文章内容
      const article = document.getElementById('articleBody');
      // 获取报告标题（支持多语言）
      const reportTitle = report.title_i18n?.[currentLang] || report.title;
      let html = `<h1>${reportTitle}</h1>`;
      
      pageSections.forEach((section, sIdx) => {
        const tag = section.level === 1 ? 'h2' : 'h3';
        const sectionTitle = getSectionTitle(section);
        const sectionContent = getSectionContent(section);
        html += `
          <${tag} id="section-${startIdx + sIdx}">${sectionTitle}</${tag}>
          ${sectionContent}
        `;
      });
      
      article.innerHTML = html;
      article.style.display = 'block';
      document.getElementById('loading').style.display = 'none';
      document.getElementById('pagination').style.display = 'flex';
      
      // 更新分页信息
      const totalPages = Math.ceil(allSections.length / sectionsPerPage);
      document.getElementById('pageInfo').textContent = `${page} ${t('pageOf')} ${totalPages}`;
      document.getElementById('prevBtn').disabled = page === 1;
      document.getElementById('nextBtn').disabled = page === totalPages;
      
      // 更新按钮文本（支持多语言）
      updatePageText();
      
      // 更新进度指示器
      updateProgressDots(page);
      
      // 更新目录选中状态
      updateTOCHighlight();
      
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: smoothScroll ? 'smooth' : 'auto' });
    }

    // 切换页面
    async function changePage(direction) {
      const totalPages = Math.ceil(allSections.length / sectionsPerPage);
      const newPage = currentPage + direction;
      
      if (newPage >= 1 && newPage <= totalPages) {
        await renderPage(newPage);
      }
    }

    // 跳转到指定页
    async function goToPage(page) {
      await renderPage(page);
    }

    // 滚动到指定章节
    async function scrollToSection(idx) {
      // 确保章节已加载
      await ensureSectionsLoaded(idx);

      // 目标章节所在页
      const targetPage = Math.floor(idx / sectionsPerPage) + 1;

      // 目标章节不在当前渲染页时，先跳转到对应页（否则 DOM 中不存在该元素）
      if (targetPage !== currentPage) {
        await renderPage(targetPage, { smooth: false });
      }

      const el = document.getElementById(`section-${idx}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // 更新当前页状态
      currentPage = targetPage;
      updateProgressDots(currentPage);
      updateTOCHighlight();

      // 移动端自动收起侧栏
      closeSidebar();
    }

    // 更新进度条
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      document.getElementById('progressFill').style.width = `${progress}%`;
    }

    // 更新进度点
    function updateProgressDots(page) {
      const dots = document.querySelectorAll('.progress-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === page - 1);
      });
    }

    // 更新目录高亮
    function updateTOCHighlight() {
      const items = document.querySelectorAll('.reader-toc-item');
      const startIdx = (currentPage - 1) * sectionsPerPage;
      const endIdx = Math.min(startIdx + sectionsPerPage, allSections.length);
      
      items.forEach((item, idx) => {
        item.classList.toggle('active', idx >= startIdx && idx < endIdx);
      });
    }

    // 切换边栏（移动端）
    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebarOverlay');
      const open = sidebar.classList.toggle('open');
      if (overlay) {
        overlay.classList.toggle('visible', open);
      }
    }

    // 关闭边栏（移动端）
    function closeSidebar() {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebarOverlay');
      if (sidebar) {
        sidebar.classList.remove('open');
      }
      if (overlay) {
        overlay.classList.remove('visible');
      }
    }

    // 切换主题
    function toggleTheme() {
      // 使用全局主题管理器
      if (window.themeManager) {
        window.themeManager.toggle();
        const isDark = window.themeManager.isDark();
        document.body.classList.toggle('theme-dark', isDark);
        document.getElementById('themeIcon').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
      } else {
        // 降级：使用本地状态
        isDark = !isDark;
        document.body.classList.toggle('theme-dark', isDark);
      }
      document.getElementById('themeIcon').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    // 字体大小控制
    function decreaseFont() {
      if (fontLevel > 0) {
        fontLevel--;
        updateFontSize();
      }
    }

    function increaseFont() {
      if (fontLevel < 2) {
        fontLevel++;
        updateFontSize();
      }
    }

    function updateFontSize() {
      document.body.classList.remove('font-small', 'font-medium', 'font-large');
      if (fontLevel === 0) document.body.classList.add('font-small');
      else if (fontLevel === 2) document.body.classList.add('font-large');
      else document.body.classList.add('font-medium');
    }

    // 全屏
    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.getElementById('fullscreenIcon').className = 'fas fa-compress';
        isFullscreen = true;
      } else {
        document.exitFullscreen();
        document.getElementById('fullscreenIcon').className = 'fas fa-expand';
        isFullscreen = false;
      }
    }

    // 打印/导出PDF
    async function printReport() {
      // 显示加载提示
      const loadingEl = document.getElementById('loading');
      const articleBody = document.getElementById('articleBody');
      const pagination = document.getElementById('pagination');
      
      // 保存当前状态
      const originalArticleContent = articleBody.innerHTML;
      const originalPaginationDisplay = pagination.style.display;
      const originalPage = currentPage;
      
      loadingEl.innerHTML = `
        <i class="fas fa-spinner" style="animation: spin 1s linear infinite;"></i>
        <p>${t('preparingPrint')}</p>
      `;
      loadingEl.style.display = 'flex';
      articleBody.style.display = 'none';
      
      try {
        // 预加载所有分块（确保内容完整）
        await preloadAllChunks();
        
        // 渲染全部内容到单页
        await renderFullContent();
        
        // 确保所有图表样式正确应用
        fixChartStylesForPrint();
        
        // 延迟确保渲染完成
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 触发打印
        window.print();
        
        // 打印完成后恢复原始状态
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error('打印准备失败:', error);
        alert('打印准备失败，请重试');
      } finally {
        // 恢复原始内容
        articleBody.innerHTML = originalArticleContent;
        articleBody.style.display = 'block';
        pagination.style.display = originalPaginationDisplay;
        loadingEl.style.display = 'none';
        
        // 恢复当前页
        currentPage = originalPage;
      }
    }

    // 渲染完整内容（用于打印）
    async function renderFullContent() {
      // 合并所有分块
      for (let i = 1; i < totalChunks; i++) {
        if (!loadedChunks[i]) {
          const chunk = await loadChunk(reportId, i);
          if (chunk) {
            mergeSections(chunk);
          }
        }
      }
      
      // 获取报告标题（支持多语言）
      const reportTitle = report.title_i18n?.[currentLang] || report.title;
      const reportSubtitle = report.subtitle_i18n?.[currentLang] || report.subtitle;
      const reportDate = report.date;
      const reportSource = report.source;
      
      // 渲染完整内容
      const article = document.getElementById('articleBody');
      
      // 构建打印头部信息
      let html = `
        <div class="print-header" style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #4F46E5;">
          <h1 style="font-size: 22pt; font-weight: 700; margin: 0 0 0.5rem 0; color: #1a1a1a;">${reportTitle}</h1>
          ${reportSubtitle ? `<p style="font-size: 14pt; color: #4a5568; margin: 0 0 0.5rem 0;">${reportSubtitle}</p>` : ''}
          <div style="font-size: 10pt; color: #718096; margin-top: 1rem;">
            ${reportSource ? `<span>来源: ${reportSource}</span>` : ''}
            ${reportDate ? `<span style="margin-left: 1rem;">发布日期: ${reportDate}</span>` : ''}
          </div>
        </div>
      `;
      
      // 渲染所有章节
      allSections.forEach((section, idx) => {
        const tag = section.level === 1 ? 'h2' : 'h3';
        const sectionTitle = getSectionTitle(section);
        const sectionContent = getSectionContent(section);
        
        // 处理内容中的图表，确保打印时样式正确
        const processedContent = processContentForPrint(sectionContent);
        
        html += `
          <${tag} id="print-section-${idx}" style="page-break-after: avoid;">${sectionTitle}</${tag}>
          ${processedContent}
        `;
      });
      
      // 添加打印页脚
      html += `
        <div class="print-footer" style="margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; font-size: 9pt; color: #718096; text-align: center;">
          <p>本文档由 ObtStar 报告平台生成 | www.obtstar.top</p>
          <p>生成时间: ${new Date().toLocaleString('zh-CN')}</p>
        </div>
      `;
      
      article.innerHTML = html;
      article.style.display = 'block';
      
      // 隐藏分页控件
      document.getElementById('pagination').style.display = 'none';
    }

    // 处理内容，优化打印显示
    function processContentForPrint(content) {
      if (!content) return '';
      
      // 创建一个临时容器来处理内容
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      
      // 为所有图表容器添加打印优化属性
      tempDiv.querySelectorAll('.chart-container').forEach(chart => {
        chart.style.pageBreakInside = 'avoid';
        chart.style.breakInside = 'avoid';
      });
      
      // 为表格添加打印优化
      tempDiv.querySelectorAll('table').forEach(table => {
        table.style.pageBreakInside = 'auto';
        table.style.breakInside = 'auto';
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
      });
      
      // 为表格行添加打印优化
      tempDiv.querySelectorAll('tr').forEach(row => {
        row.style.pageBreakInside = 'avoid';
        row.style.breakInside = 'avoid';
      });
      
      return tempDiv.innerHTML;
    }

    // 修复图表样式以确保打印时正确显示
    function fixChartStylesForPrint() {
      // 修复风险条形图
      document.querySelectorAll('.risk-bar').forEach(bar => {
        const value = bar.style.getPropertyValue('--value');
        const color = bar.style.getPropertyValue('--color');
        if (value && color) {
          bar.style.setProperty('--value', value, 'important');
          bar.style.setProperty('--color', color, 'important');
        }
      });
      
      // 修复饼图
      document.querySelectorAll('.pie-chart').forEach(pie => {
        const styles = ['--color1', '--color2', '--color3', '--color4', '--slice1', '--slice2', '--slice3'];
        styles.forEach(style => {
          const value = pie.style.getPropertyValue(style);
          if (value) {
            pie.style.setProperty(style, value, 'important');
          }
        });
      });
      
      // 确保所有图表颜色在打印时保留
      document.querySelectorAll('.chart-container, .flow-step, .risk-bar::before, .pie-chart, .pie-legend-color, .data-table th, .data-table tr:nth-child(even)').forEach(el => {
        el.style.webkitPrintColorAdjust = 'exact';
        el.style.printColorAdjust = 'exact';
      });
    }

    // 返回
    function goBack() {
      window.location.href = `report-detail.html?id=${reportId}`;
    }
  
