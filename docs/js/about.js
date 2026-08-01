AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });

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

    // FAQ
    const faqs = [
      { q: 'ObtStar 上的报告从哪里来？', a: '目前收录的报告来自小艺（华为研究院）、Kimi（Moonshot AI）和 Google 等机构，均为公开发布的高质量研究报告。未来也会向社区开放投稿通道。' },
      { q: '如何追加新的报告或主题？', a: '最简单的方式是修改 data/reports.js 文件：在 REPORTS 数组末尾追加一个新报告对象，在 CATEGORIES 数组末尾追加新主题分类。文件内有详细注释说明格式。你也可以通过邮件或 GitHub 联系我们。' },
      { q: '网站内容可以免费使用吗？', a: 'ObtStar 上展示的报告内容版权归原作者所有。平台本身的设计代码欢迎参考和使用。引用报告内容请注明来源。' },
      { q: '为什么选择做静态网站？', a: '静态网站加载快、维护简单、无需数据库，非常适合内容展示场景。所有数据集中在 data/reports.js 一个文件中管理，扩展成本极低。' },
      { q: '我投稿了报告，多久会上线？', a: '我们会在 3 个工作日内审核，通过后在下次部署时上线。如果你有急需上线的内容，可以在邮件中注明。' },
    ];
    document.getElementById('faqList').innerHTML = faqs.map((f, i) => `
      <div class="faq-item" id="faq-${i}">
        <div class="faq-q" onclick="toggleFaq(${i})">
          <span>${f.q}</span>
          <i class="fa fa-chevron-down faq-arrow"></i>
        </div>
        <div class="faq-a">${f.a}</div>
      </div>
    `).join('');

    function toggleFaq(i) {
      const item = document.getElementById('faq-'+i);
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    }

    function submitForm(e) {
      e.preventDefault();
      const type = document.getElementById('formType').value;
      const title = document.getElementById('formTitle').value;
      const btn = e.target.querySelector('button[type=submit]');
      btn.innerHTML = '<i class="fa fa-check"></i> 已收到，感谢！';
      btn.style.background = 'linear-gradient(135deg,#10B981,#0D9488)';
      btn.disabled = true;
      // 实际可接入 Formspree / Netlify Forms 等服务
      setTimeout(() => {
        btn.innerHTML = '<i class="fa fa-paper-plane"></i> 提交';
        btn.style.background = '';
        btn.disabled = false;
        e.target.reset();
      }, 3000);
    }
