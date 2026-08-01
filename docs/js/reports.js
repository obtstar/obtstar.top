// 初始化 AOS（添加错误处理，CDN 加载失败时不阻断）
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 650, once: true, offset: 60 });
    }

    // 主题切换按钮绑定
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('theme-toggle'));
      });
    }

    // 状态管理
    let currentCat = 'all';
    let currentSearch = '';
    let currentSort = 'date-desc';
    let currentView = 'grid';
    let categories = [];
    let allReports = [];
    let isLoading = false;

    // 从 URL 解析初始状态
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has('cat')) currentCat = urlParams.get('cat');

    // 导航切换
    function toggleNav() { document.getElementById('navLinks').classList.toggle('open'); }
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
      const progress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      document.getElementById('readingProgress').style.width = progress + '%';
    });

    // ── 渲染侧边栏分类 ──
    function renderSidebar() {
      const counts = {};
      allReports.forEach(r => { counts[r.category] = (counts[r.category] || 0) + 1; });
      const total = allReports.length;

      document.getElementById('sidebarCats').innerHTML = categories.map(c => {
        const cnt = c.id === 'all' ? total : (counts[c.id] || 0);
        return `
          <div class="sidebar-cat-item ${currentCat === c.id ? 'active' : ''}" onclick="setCategory('${c.id}')">
            <div class="cat-left"><span>${c.icon}</span><span>${c.name}</span></div>
            <span class="sidebar-count">${cnt}</span>
          </div>
        `;
      }).join('');
    }

    // ── 渲染来源统计 ──
    function renderSources() {
      const sources = {};
      allReports.forEach(r => { sources[r.source] = (sources[r.source] || 0) + 1; });

      document.getElementById('sidebarSources').innerHTML = Object.entries(sources).map(([s, cnt]) => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0.4rem 0.5rem;font-size:0.875rem;color:var(--text-body)">
          <span>${s}</span>
          <span class="sidebar-count">${cnt}</span>
        </div>
      `).join('');
    }

    // ── 渲染热门标签 ──
    async function renderHotTags() {
      try {
        const { data: tags } = await ObtStarAPI.getHotTagsCached();
        const hot = tags.slice(0, 8);
        document.getElementById('hotTags').innerHTML =
          hot.map(({ name }) => `<span class="tag" style="cursor:pointer" onclick="searchTag('${name}')">${name}</span>`).join('');
      } catch (error) {
        console.error('加载热门标签失败:', error);
      }
    }

    // ── 设置分类 ──
    function setCategory(id) {
      currentCat = id;
      history.pushState({}, '', id === 'all' ? 'reports.html' : `reports.html?cat=${id}`);
      renderSidebar();
      applyFilter();

      const header = document.getElementById('currentCatHeader');
      if (id !== 'all') {
        const cat = categories.find(c => c.id === id);
        document.getElementById('currentCatIcon').textContent = cat.icon;
        document.getElementById('currentCatName').textContent = cat.name;
        header.style.display = 'block';
      } else {
        header.style.display = 'none';
      }
    }

    // ── 搜索标签点击 ──
    function searchTag(tag) {
      document.getElementById('searchInput').value = tag;
      currentSearch = tag;
      applyFilter();
    }

    // ── 设置视图 ──
    function setView(v) {
      currentView = v;
      document.getElementById('gridViewBtn').classList.toggle('active', v === 'grid');
      document.getElementById('listViewBtn').classList.toggle('active', v === 'list');
      const container = document.getElementById('reportsContainer');
      if (v === 'grid') {
        container.classList.remove('list-view');
        container.style.gridTemplateColumns = '';
      } else {
        container.classList.add('list-view');
        container.style.gridTemplateColumns = '1fr';
      }
    }

    // ── 重置所有 ──
    function resetAll() {
      currentCat = 'all';
      currentSearch = '';
      document.getElementById('searchInput').value = '';
      document.getElementById('currentCatHeader').style.display = 'none';
      renderSidebar();
      applyFilter();
      history.pushState({}, '', 'reports.html');
    }

    // ── 应用筛选 & 排序 ──
    async function applyFilter(options = {}) {
      const { skipLoadingCheck = false } = options;
      if (!skipLoadingCheck && isLoading) return;

      currentSort = document.getElementById('sortSelect').value;

      // 构建筛选参数
      const params = {
        sort: currentSort
      };

      if (currentCat !== 'all') {
        params.category = currentCat;
      }

      if (currentSearch) {
        params.search = currentSearch;
      }

      try {
        // 显示加载状态
        const container = document.getElementById('reportsContainer');
        if (allReports.length === 0) {
          container.innerHTML = `
            <div class="loading-skeleton skeleton-card"></div>
            <div class="loading-skeleton skeleton-card"></div>
            <div class="loading-skeleton skeleton-card"></div>
          `;
        }


        const { data: filtered, meta } = await ObtStarAPI.getReportsCached(params);
        const totalCount = (meta && meta.total != null) ? meta.total : filtered.length;

        // 更新分类标题计数
        document.getElementById('currentCatCount').textContent = `找到 ${totalCount} 篇报告`;
        document.getElementById('resultsInfo').innerHTML = `共 <strong>${totalCount}</strong> 篇报告`;


        const empty = document.getElementById('emptyState');

        if (!filtered.length) {
          container.innerHTML = '';
          empty.style.display = 'block';
          return;
        }
        empty.style.display = 'none';

        renderReports(filtered);
      } catch (error) {
        console.error('加载报告失败:', error);
        showError('加载报告失败，请检查网络连接');
      }
    }

    // ── 渲染报告列表 ──
    function renderReports(reports) {
      const container = document.getElementById('reportsContainer');

      container.innerHTML = reports.map((r, i) => {
        const cat = categories.find(c => c.id === r.category);
        if (currentView === 'list') {
          return `
            <div class="report-card" onclick="location.href='report-detail.html?id=${r.id}'" style="flex-direction:row;align-items:flex-start;gap:1.25rem;padding:1.25rem 1.5rem">
              <div class="report-card-accent" style="background:linear-gradient(to bottom,${r.color||'#4F46E5'},${r.color||'#7C3AED'})"></div>
              <div style="width:56px;height:56px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:14px;background:linear-gradient(135deg,${r.color||'#4F46E5'}18,${r.color||'#7C3AED'}28);font-size:1.75rem">
                ${cat ? cat.icon : '📄'}
              </div>
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:flex-start;gap:0.75rem;flex-wrap:wrap">
                  <div style="flex:1;min-width:200px">
                    <span class="tag" style="font-size:0.7rem;background:${r.color||'#4F46E5'}15;color:${r.color||'#4F46E5'};margin-bottom:0.375rem;display:inline-flex">
                      ${cat ? cat.name : ''}
                    </span>
                    <div class="report-card-title" style="font-size:1.0625rem">${r.title}</div>
                    <div class="report-card-subtitle">${r.subtitle}</div>
                  </div>
                  <div class="report-card-meta" style="border-top:none;padding:0;white-space:nowrap">
                    <span class="meta-item"><i class="fa fa-file-lines"></i> ${r.pages}页</span>
                    <span class="meta-item"><i class="fa fa-clock"></i> ${r.date}</span>
                  </div>
                </div>
                <p class="report-card-summary" style="margin-top:0.625rem;-webkit-line-clamp:2">${r.summary}</p>
                <div class="report-card-tags" style="margin-top:0.625rem">
                  ${r.tags.slice(0,4).map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
              </div>
            </div>
          `;
        }
        return `
          <div class="report-card" onclick="location.href='report-detail.html?id=${r.id}'" data-aos="fade-up" data-aos-delay="${(i%3)*60}">
            <div class="report-card-accent" style="background:linear-gradient(to bottom,${r.color||'#4F46E5'},${r.color||'#7C3AED'})"></div>
            <div class="report-card-header">
              <div class="report-card-icon" style="background:linear-gradient(135deg,${r.color||'#4F46E5'}18,${r.color||'#7C3AED'}28);font-size:1.5rem">
                ${cat ? cat.icon : '📄'}
              </div>
              <div style="flex:1;padding-left:0.75rem">
                <span class="tag" style="font-size:0.7rem;background:${r.color||'#4F46E5'}15;color:${r.color||'#4F46E5'};margin-bottom:0.375rem;display:inline-flex">
                  ${cat ? cat.name : ''}
                </span>
                <div class="report-card-title">${r.title}</div>
                <div class="report-card-subtitle">${r.subtitle}</div>
              </div>
            </div>
            <p class="report-card-summary">${r.summary}</p>
            <div class="report-card-tags">
              ${r.tags.slice(0,3).map(t => `<span class="tag">${t}</span>`).join('')}
              ${r.tags.length > 3 ? `<span class="tag" style="opacity:0.55">+${r.tags.length-3}</span>` : ''}
            </div>
            <div class="report-card-meta">
              <span class="meta-item"><i class="fa fa-file-alt"></i> ${r.pages} 页</span>
              <span class="meta-item"><i class="fa fa-calendar"></i> ${r.date}</span>
              <span class="meta-item"><i class="fa fa-user"></i> ${r.source}</span>
            </div>
          </div>
        `;
      }).join('');

      // 刷新 AOS 动画（如果已加载）
      if (typeof AOS !== 'undefined' && AOS.refreshHard) {
        AOS.refreshHard();
      }
    }

    // ── 显示错误 ──
    function showError(message) {
      document.getElementById('reportsContainer').innerHTML = '';
      document.getElementById('emptyState').style.display = 'none';
      document.getElementById('errorState').style.display = 'block';
      document.getElementById('errorMessage').textContent = message;
    }

    // ── 隐藏错误 ──
    function hideError() {
      document.getElementById('errorState').style.display = 'none';
    }

    // 搜索监听
    let searchTimeout;
    document.getElementById('searchInput').addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentSearch = e.target.value;
        applyFilter();
      }, 300);
    });

    // 排序监听
    document.getElementById('sortSelect').addEventListener('change', () => {
      applyFilter();
    });

    // ── 初始化页面 ──
    async function initPage() {
      isLoading = true;
      hideError();

      try {
        // 并行加载分类和报告
        const [categoriesRes, reportsRes] = await Promise.all([
          ObtStarAPI.getCategoriesCached(),
          ObtStarAPI.getReportsCached({ sort: currentSort })
        ]);

        categories = categoriesRes.data;
        allReports = reportsRes.data;

        // 渲染页面
        renderSidebar();
        renderSources();
        renderHotTags();
        applyFilter({ skipLoadingCheck: true });

        // 如果有初始分类，显示分类标题
        if (currentCat !== 'all') {
          const cat = categories.find(c => c.id === currentCat);
          if (cat) {
            document.getElementById('currentCatIcon').textContent = cat.icon;
            document.getElementById('currentCatName').textContent = cat.name;
            document.getElementById('currentCatHeader').style.display = 'block';
          }
        }

        // 更新 footer 统计
        const footerStats = document.getElementById('footerStats');
        if (footerStats) {
          const totalPages = allReports.reduce((sum, r) => sum + (r.pages || 0), 0);
          footerStats.textContent = `${allReports.length} 篇报告 · ${totalPages} 页内容`;
        }
      } catch (error) {
        console.error('初始化失败:', error);
        showError('无法连接到服务器，请检查网络连接或稍后重试');
      } finally {
        isLoading = false;
      }
    }

    // 启动
    initPage();
