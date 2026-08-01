AOS.init({ duration: 650, easing: 'ease-out-cubic', once: true, offset: 50 });

    // 主题切换按钮绑定
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('theme-toggle'));
      });
    }

    function toggleNav() { document.getElementById('navLinks').classList.toggle('open'); }
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
      const progress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      document.getElementById('readingProgress').style.width = progress + '%';
    });

    // 状态
    let report = null;
    let category = null;
    let categories = [];

    // 获取 URL 参数
    const urlParams = new URLSearchParams(window.location.search);
    const reportId = urlParams.get('id');

    // 初始化
    async function initPage() {
      if (!reportId) {
        showError('缺少报告 ID');
        return;
      }

      try {
        // 并行加载数据
        const [reportRes, categoriesRes] = await Promise.all([
          ObtStarAPI.getReportById(reportId),
          ObtStarAPI.getCategoriesCached()
        ]);

        report = reportRes.data;
        categories = categoriesRes.data;
        category = categories.find(c => c.id === report.category) || categories[0];

        renderPage();
        showContent();
      } catch (error) {
        console.error('加载失败:', error);
        showError('无法加载报告数据，请检查网络连接');
      }
    }

    function showContent() {
      document.getElementById('loadingState').style.display = 'none';
      document.getElementById('errorState').style.display = 'none';
      document.getElementById('mainContent').style.display = 'block';
    }

    function showError(message) {
      document.getElementById('loadingState').style.display = 'none';
      document.getElementById('errorState').style.display = 'block';
      document.getElementById('errorMessage').textContent = message;
    }

    function renderPage() {
      // 设置主题色
      document.documentElement.style.setProperty('--report-color', report.color || '#4F46E5');
      document.documentElement.style.setProperty('--report-color-2', '#7C3AED');

      // 页面标题
      document.title = `${report.title} · ObtStar`;

      // Hero 区域
      document.getElementById('breadcrumbTitle').textContent = report.title;
      document.getElementById('heroGlow').style.background = `radial-gradient(circle, ${report.color || '#4F46E5'}, transparent)`;
      document.getElementById('heroCategoryBadge').innerHTML = `
        <span class="tag" style="background:${report.color||'#4F46E5'}18;color:${report.color||'#4F46E5'};font-size:0.8125rem">
          ${category.icon} ${category.name}
        </span>
        ${report.featured ? '<span class="badge badge-featured" style="margin-left:0.375rem">⭐ 精选</span>' : ''}
      `;
      document.getElementById('heroTitle').textContent = report.title;
      document.getElementById('heroSubtitle').textContent = report.subtitle;
      document.getElementById('heroTags').innerHTML = report.tags.map(t => `<span class="tag">${t}</span>`).join('');
      document.getElementById('readerModeBtn').href = `reader.html?id=${reportId}`;

      // 快速统计
      document.getElementById('quickStats').innerHTML = `
        <div style="font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:1rem">报告信息</div>
        <div style="display:flex;flex-direction:column;gap:0.75rem">
          <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.875rem">
            <span style="color:var(--text-muted)"><i class="fa fa-file-alt" style="width:16px"></i> 总页数</span>
            <strong>${report.pages} 页</strong>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.875rem">
            <span style="color:var(--text-muted)"><i class="fa fa-calendar" style="width:16px"></i> 发布日期</span>
            <strong>${report.date}</strong>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.875rem">
            <span style="color:var(--text-muted)"><i class="fa fa-user" style="width:16px"></i> 来源</span>
            <strong style="text-align:right;max-width:120px">${report.source}</strong>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.875rem">
            <span style="color:var(--text-muted)"><i class="fa fa-list" style="width:16px"></i> 章节数</span>
            <strong>${report.chapters.length} 章</strong>
          </div>
        </div>
      `;

      // 封面
      document.getElementById('reportCover').style.background =
        `linear-gradient(135deg, ${report.color||'#4F46E5'}dd, ${report.color||'#7C3AED'}cc, #1E1B4B)`;
      document.getElementById('coverIcon').textContent = category.icon;
      document.getElementById('coverTitle').textContent = report.title;
      document.getElementById('coverSub').textContent = report.subtitle;

      // 信息面板
      document.getElementById('infoPanelHeader').style.background =
        `linear-gradient(135deg, ${report.color||'#4F46E5'}, #7C3AED)`;
      document.getElementById('infoPanelIcon').textContent = category.icon;
      document.getElementById('infoPanelCat').textContent = category.name;
      document.getElementById('infoPanelList').innerHTML = `
        <li class="info-panel-item"><span class="info-panel-label">标题</span><span class="info-panel-value">${report.title}</span></li>
        <li class="info-panel-item"><span class="info-panel-label">页数</span><span class="info-panel-value">${report.pages} 页</span></li>
        <li class="info-panel-item"><span class="info-panel-label">发布</span><span class="info-panel-value">${report.date}</span></li>
        <li class="info-panel-item"><span class="info-panel-label">来源</span><span class="info-panel-value">${report.source}</span></li>
        <li class="info-panel-item"><span class="info-panel-label">章节</span><span class="info-panel-value">${report.chapters.length} 章</span></li>
        <li class="info-panel-item"><span class="info-panel-label">标签</span><span class="info-panel-value">${report.tags.length} 个</span></li>
      `;

      // 摘要
      document.getElementById('summaryText').textContent = report.summary;

      // 核心亮点
      document.getElementById('highlightsList').innerHTML = report.highlights.map((h, i) => `
        <div class="highlight-item" data-aos="fade-left" data-aos-delay="${i * 60}">
          <span class="hi-icon"><i class="fa fa-check-circle"></i></span>
          <span>${h}</span>
        </div>
      `).join('');

      // 章节目录
      document.getElementById('chaptersList').innerHTML = report.chapters.map((ch, i) => `
        <div class="chapter-item" data-aos="fade-up" data-aos-delay="${i * 50}">
          <div class="chapter-num">${String(i+1).padStart(2,'0')}</div>
          <div>
            <div style="font-weight:600;color:var(--text-title);margin-bottom:0.25rem">${ch.title}</div>
            <div style="font-size:0.875rem;color:var(--text-muted)">${ch.desc}</div>
          </div>
        </div>
      `).join('');

      // 标签
      document.getElementById('allTagsList').innerHTML = report.tags.map(t =>
        `<a href="reports.html?cat=${report.category}" class="tag" style="font-size:0.875rem;padding:0.35rem 0.875rem">${t}</a>`
      ).join('');

      // 右侧目录
      document.getElementById('tocList').innerHTML = report.chapters.map((ch, i) => `
        <div class="toc-item" onclick="scrollToChapter(${i})">
          <span class="toc-num">${String(i+1).padStart(2,'0')}</span>
          <span>${ch.title}</span>
        </div>
      `).join('');
      document.getElementById('tocList').insertAdjacentHTML('afterbegin', `
        <div class="toc-item active" onclick="window.scrollTo({top:0,behavior:'smooth'})">
          <span class="toc-num">—</span><span>报告摘要</span>
        </div>
        <div class="toc-item" onclick="document.querySelector('#highlightsList').scrollIntoView({behavior:'smooth',block:'start'})">
          <span class="toc-num">—</span><span>核心亮点</span>
        </div>
      `);

      // 加载相关推荐
      loadRelatedReports();
    }

    async function loadRelatedReports() {
      try {
        const { data: allReports } = await ObtStarAPI.getReportsCached();
        const related = allReports
          .filter(r => r.id !== report.id && r.category === report.category)
          .concat(allReports.filter(r => r.id !== report.id && r.category !== report.category))
          .slice(0, 3);

        document.getElementById('relatedGrid').innerHTML = related.map((r, i) => {
          const rc = categories.find(c => c.id === r.category);
          return `
            <div class="report-card" onclick="location.href='report-detail.html?id=${r.id}'" data-aos="fade-up" data-aos-delay="${i*80}">
              <div class="report-card-accent" style="background:linear-gradient(to bottom,${r.color||'#4F46E5'},${r.color||'#7C3AED'})"></div>
              <div class="report-card-header">
                <div class="report-card-icon" style="background:linear-gradient(135deg,${r.color||'#4F46E5'}18,${r.color||'#7C3AED'}28);font-size:1.5rem">
                  ${rc ? rc.icon : '📄'}
                </div>
                <div style="flex:1;padding-left:0.75rem">
                  <div class="report-card-title">${r.title}</div>
                  <div class="report-card-subtitle">${r.subtitle}</div>
                </div>
              </div>
              <p class="report-card-summary">${r.summary}</p>
              <div class="report-card-meta">
                <span class="meta-item"><i class="fa fa-file-alt"></i> ${r.pages} 页</span>
                <span class="meta-item"><i class="fa fa-calendar"></i> ${r.date}</span>
              </div>
            </div>
          `;
        }).join('');
      } catch (error) {
        console.error('加载相关推荐失败:', error);
      }
    }

    function copyLink() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const btn = event.target.closest('button');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fa fa-check"></i> 已复制!';
        btn.style.background = 'var(--accent2)';
        btn.style.color = 'white';
        setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.style.color = ''; }, 2000);
      });
    }

    function shareTwitter() {
      const text = encodeURIComponent(`${report.title} - ${report.subtitle}`);
      const url = encodeURIComponent(window.location.href);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }

    function scrollToChapter(index) {
      const chapters = document.querySelectorAll('.chapter-item');
      if (chapters[index]) {
        chapters[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // 启动
    initPage();
