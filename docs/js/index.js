// 初始化 AOS
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });

    // 主题切换按钮绑定
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('theme-toggle'));
      });
    }

    // 导航滚动效果
    function toggleNav() {
      document.getElementById('navLinks').classList.toggle('open');
    }
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
      const progress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      document.getElementById('readingProgress').style.width = progress + '%';
    });

    // 状态
    let categories = [];
    let reports = [];

    // 初始化页面
    async function initPage() {
      try {
        // 并行加载数据
        const [categoriesRes, reportsRes] = await Promise.all([
          ObtStarAPI.getCategoriesCached(),
          ObtStarAPI.getReportsCached()
        ]);

        categories = categoriesRes.data;
        reports = reportsRes.data;

        // 更新统计数据
        updateStats();

        // 渲染页面
        renderHeroMiniCards();
        renderCategoryCloud();
        renderFeatured();
        renderAllReports();
        renderFooter();
      } catch (error) {
        console.error('初始化失败:', error);
      }
    }

    // 更新统计数据
    function updateStats() {
      const totalPages = reports.reduce((sum, r) => sum + r.pages, 0);
      const categoriesCount = categories.filter(c => c.id !== 'all').length;

      document.getElementById('statReports').textContent = reports.length;
      document.getElementById('statPages').textContent = totalPages;
      document.getElementById('statCategories').textContent = categoriesCount;
      document.getElementById('reportCount').textContent = reports.length;

      document.getElementById('counterReports').textContent = reports.length;
      document.getElementById('counterPages').textContent = totalPages;
      document.getElementById('counterCategories').textContent = categoriesCount;
    }

    // 渲染 Hero 迷你卡片
    function renderHeroMiniCards() {
      const latest = reports.slice(0, 3);
      const icons = ['🛡️', '🚀', '🌌'];
      const colors = ['#7C3AED', '#2563EB', '#6D28D9'];

      document.getElementById('heroMiniCards').innerHTML = latest.map((r, i) => `
        <div class="mini-card" onclick="location.href='report-detail.html?id=${r.id}'">
          <div class="mini-card-icon" style="background:linear-gradient(135deg,${colors[i]}22,${colors[i]}44)">${icons[i]}</div>
          <div style="flex:1">
            <div class="mini-card-title">${r.title}</div>
            <div class="mini-card-sub">${r.pages}页 · ${r.source}</div>
            <div class="mini-progress"><div class="mini-progress-fill" style="width:${70 - i * 15}%;background:linear-gradient(90deg,${colors[i]},#4F46E5)"></div></div>
          </div>
        </div>
      `).join('');
    }

    // 渲染分类标签云
    function renderCategoryCloud() {
      const container = document.getElementById('categoryCloud');
      const counts = {};
      reports.forEach(r => { counts[r.category] = (counts[r.category] || 0) + 1; });
      const cats = categories.filter(c => c.id !== 'all');

      container.innerHTML = cats.map((c, i) => `
        <a href="reports.html?cat=${c.id}" class="category-cloud-item" data-aos="zoom-in" data-aos-delay="${i * 60}">
          <span class="cat-icon">${c.icon}</span>
          <span>${c.name}</span>
          <span class="cat-count">${counts[c.id] || 0}</span>
        </a>
      `).join('');
    }

    // 渲染精选报告
    function renderFeatured() {
      const featured = reports.filter(r => r.featured);
      const container = document.getElementById('featuredGrid');
      if (!featured.length) return;

      const main = featured[0];
      let html = `
        <div class="featured-main report-card card-featured" onclick="location.href='report-detail.html?id=${main.id}'" data-aos="fade-right">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem">
            <div class="report-card-accent"></div>
            <div style="flex:1">
              <div style="display:flex;gap:0.5rem;margin-bottom:1rem;flex-wrap:wrap">
                <span class="badge badge-featured">⭐ 精选</span>
                <span class="tag" style="background:rgba(255,255,255,0.15);color:rgba(255,255,255,0.85)">${getCategoryLabel(main.category)}</span>
              </div>
              <div class="report-card-title" style="font-size:1.25rem">${main.title}</div>
              <div class="report-card-subtitle">${main.subtitle}</div>
            </div>
            <div class="report-card-icon" style="background:rgba(255,255,255,0.12);font-size:2rem">${getCategoryIcon(main.category)}</div>
          </div>
          <p class="report-card-summary" style="-webkit-line-clamp:5">${main.summary}</p>
          <div class="report-card-tags">
            ${main.tags.slice(0,4).map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div class="report-card-meta">
            <span class="meta-item"><i class="fa fa-file-alt"></i> ${main.pages} 页</span>
            <span class="meta-item"><i class="fa fa-calendar"></i> ${main.date}</span>
            <span class="meta-item"><i class="fa fa-user"></i> ${main.source}</span>
          </div>
          <a href="report-detail.html?id=${main.id}" class="btn btn-sm" style="background:rgba(255,255,255,0.15);color:white;margin-top:0.5rem;align-self:flex-start">
            阅读报告 <i class="fa fa-arrow-right"></i>
          </a>
        </div>
      `;

      featured.slice(1).forEach((r, i) => {
        html += `
          <div class="report-card-sm" onclick="location.href='report-detail.html?id=${r.id}'" data-aos="fade-left" data-aos-delay="${(i+1)*100}">
            <div style="display:flex;align-items:flex-start;gap:1rem">
              <div class="report-card-icon" style="background:linear-gradient(135deg,${r.color}22,${r.color}44);color:${r.color};font-size:1.5rem">
                ${getCategoryIcon(r.category)}
              </div>
              <div style="flex:1;min-width:0">
                <div style="display:flex;gap:0.5rem;margin-bottom:0.375rem">
                  <span class="badge badge-new">NEW</span>
                </div>
                <div class="report-card-title">${r.title}</div>
                <div class="report-card-subtitle" style="margin-top:0.25rem">${r.subtitle}</div>
              </div>
            </div>
            <p class="report-card-summary" style="margin-top:0.75rem;-webkit-line-clamp:2">${r.summary}</p>
            <div class="report-card-meta" style="margin-top:0.75rem">
              <span class="meta-item"><i class="fa fa-file-alt"></i> ${r.pages} 页</span>
              <span class="meta-item"><i class="fa fa-calendar"></i> ${r.date}</span>
            </div>
          </div>
        `;
      });

      container.innerHTML = html;
    }

    // 渲染全部报告
    function renderAllReports() {
      const container = document.getElementById('allReportsGrid');
      container.innerHTML = reports.map((r, i) => `
        <div class="report-card" onclick="location.href='report-detail.html?id=${r.id}'"
             data-aos="fade-up" data-aos-delay="${(i % 3) * 80}" style="--card-color:${r.color || '#4F46E5'}">
          <div class="report-card-accent" style="background:linear-gradient(to bottom,${r.color || '#4F46E5'},${r.color || '#7C3AED'})"></div>
          <div class="report-card-header">
            <div>
              <div class="report-card-icon" style="background:linear-gradient(135deg,${r.color || '#4F46E5'}18,${r.color || '#7C3AED'}28);font-size:1.375rem">
                ${getCategoryIcon(r.category)}
              </div>
            </div>
            <div style="flex:1;padding-left:0.75rem">
              <span class="tag" style="font-size:0.7rem;background:${r.color || '#4F46E5'}15;color:${r.color || '#4F46E5'};margin-bottom:0.375rem;display:inline-flex">
                ${getCategoryLabel(r.category)}
              </span>
              <div class="report-card-title">${r.title}</div>
              <div class="report-card-subtitle">${r.subtitle}</div>
            </div>
          </div>
          <p class="report-card-summary">${r.summary}</p>
          <div class="report-card-tags">
            ${r.tags.slice(0,3).map(t => `<span class="tag">${t}</span>`).join('')}
            ${r.tags.length > 3 ? `<span class="tag" style="opacity:0.6">+${r.tags.length-3}</span>` : ''}
          </div>
          <div class="report-card-meta">
            <span class="meta-item"><i class="fa fa-file-alt"></i> ${r.pages} 页</span>
            <span class="meta-item"><i class="fa fa-calendar"></i> ${r.date}</span>
          </div>
        </div>
      `).join('');
    }

    // 渲染 Footer
    function renderFooter() {
      const cats = categories.filter(c => c.id !== 'all');
      document.getElementById('footerCategories').innerHTML = cats.map(c =>
        `<li><a href="reports.html?cat=${c.id}">${c.icon} ${c.name}</a></li>`
      ).join('');

      const featured = reports.filter(r => r.featured).slice(0, 4);
      document.getElementById('footerReports').innerHTML = featured.map(r =>
        `<li><a href="report-detail.html?id=${r.id}">${r.title}</a></li>`
      ).join('');
    }

    // 辅助函数
    function getCategoryIcon(id) {
      const c = categories.find(c => c.id === id);
      return c ? c.icon : '📄';
    }

    function getCategoryLabel(id) {
      const c = categories.find(c => c.id === id);
      return c ? c.name : id;
    }

    // 启动
    initPage();

if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('[SW] Registered:', registration.scope);
            
            // 检测更新
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // 有新版本可用
                  if (confirm('网站有新版本，是否立即更新？')) {
                    newWorker.postMessage('skipWaiting');
                    window.location.reload();
                  }
                }
              });
            });
          })
          .catch((error) => {
            console.log('[SW] Registration failed:', error);
          });
        
        // 监听 Service Worker 更新
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('[SW] Controller changed');
        });
      });
    }
