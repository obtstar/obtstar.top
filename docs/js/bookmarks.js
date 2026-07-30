/**
 * ObtStar 书签收藏系统
 * 基于 localStorage 的持久化收藏功能
 */
class BookmarkManager {
  constructor() {
    this.storageKey = 'obtstar-bookmarks';
    this.maxBookmarks = 100;
    this.init();
  }
  
  init() {
    // 初始化存储结构
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }
  
  // 获取所有书签
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    } catch {
      return [];
    }
  }
  
  // 检查是否已收藏
  isBookmarked(reportId) {
    const bookmarks = this.getAll();
    return bookmarks.includes(reportId);
  }
  
  // 添加收藏
  add(reportId) {
    const bookmarks = this.getAll();
    if (!bookmarks.includes(reportId)) {
      bookmarks.unshift(reportId);
      // 限制最大数量
      if (bookmarks.length > this.maxBookmarks) {
        bookmarks.pop();
      }
      localStorage.setItem(this.storageKey, JSON.stringify(bookmarks));
      this.dispatchEvent('added', reportId);
      return true;
    }
    return false;
  }
  
  // 移除收藏
  remove(reportId) {
    let bookmarks = this.getAll();
    const index = bookmarks.indexOf(reportId);
    if (index > -1) {
      bookmarks.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(bookmarks));
      this.dispatchEvent('removed', reportId);
      return true;
    }
    return false;
  }
  
  // 切换收藏状态
  toggle(reportId) {
    if (this.isBookmarked(reportId)) {
      this.remove(reportId);
      return false;
    } else {
      this.add(reportId);
      return true;
    }
  }
  
  // 获取收藏数量
  count() {
    return this.getAll().length;
  }
  
  // 清除所有收藏
  clear() {
    localStorage.setItem(this.storageKey, JSON.stringify([]));
    this.dispatchEvent('cleared', null);
  }
  
  // 触发事件
  dispatchEvent(action, reportId) {
    window.dispatchEvent(new CustomEvent('bookmark-changed', {
      detail: { action, reportId, count: this.count() }
    }));
  }
  
  // 渲染书签按钮 HTML
  renderButton(reportId, size = '') {
    const isBookmarked = this.isBookmarked(reportId);
    const iconClass = isBookmarked ? 'fas' : 'far';
    const activeClass = isBookmarked ? 'bookmark-active' : '';
    const title = isBookmarked ? '取消收藏' : '添加收藏';
    
    return `
      <button class="bookmark-btn ${activeClass} ${size}" 
              onclick="event.stopPropagation(); BookmarkManager.toggle('${reportId}')"
              title="${title}"
              aria-label="${title}">
        <i class="${iconClass} fa-bookmark"></i>
      </button>
    `;
  }
}

// 全局静态方法
BookmarkManager.toggle = function(reportId) {
  return window.bookmarkManager.toggle(reportId);
};

// 全局实例
window.BookmarkManager = BookmarkManager;
window.bookmarkManager = new BookmarkManager();

// 初始化书签按钮点击事件监听
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('bookmark-changed', (e) => {
    // 更新所有书签按钮状态
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
      const reportId = btn.getAttribute('data-report-id');
      if (reportId) {
        const isBookmarked = window.bookmarkManager.isBookmarked(reportId);
        btn.classList.toggle('bookmark-active', isBookmarked);
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark';
        }
      }
    });
    
    // 更新书签计数
    const counter = document.getElementById('bookmarkCount');
    if (counter) {
      counter.textContent = e.detail.count;
    }
  });
});
