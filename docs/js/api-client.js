/**
 * ObtStar API 客户端
 * 封装所有后端 API 调用
 *
 * 双模式说明：
 * - API 模式：优先请求 /api/*（本地 node server.js 环境）
 * - 静态模式：当 /api/* 不可用（如 GitHub Pages 纯静态托管）时，
 *   自动回退为直接加载 data/reports.js 与 data/reports-content/ 下的
 *   chunk 文件，在浏览器端复现同样的筛选/排序/分页逻辑。
 *   注意：若修改服务端 /api/reports 的查询语义，需同步修改下方静态实现。
 */

const API_BASE = '';

// 静态回退状态：一旦 API 请求失败，后续调用直接走静态数据
let useStatic = false;
let staticDataPromise = null;

/**
 * 切换到静态数据模式
 * /api 不可用（如 GitHub Pages 纯静态环境）是设计内的预期行为，
 * 仅在首次切换时输出一条 info 日志，避免每次调用都刷 error。
 */
function fallbackToStatic(error) {
  if (!useStatic) {
    console.info('[ObtStarAPI] /api 不可用，已切换为静态数据模式', error);
  }
  useStatic = true;
}

/**
 * 基础请求函数
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    // 检查 HTTP 状态码
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // API 返回错误格式 (RFC 7807 Problem Details)
    if (data.type && data.type.includes('/errors/')) {
      throw new Error(data.detail || data.title);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * 构建查询字符串
 */
function buildQueryString(params) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  });
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}

// ==================== 静态回退（无 /api 环境，如 GitHub Pages） ====================

/**
 * 读取全局静态数据
 * 注意：data/reports.js 用 const 声明 REPORTS/CATEGORIES，
 * 属于全局词法绑定而非 window 属性，因此需用 typeof 判断全局标识符。
 */
function getStaticReports() {
  if (typeof REPORTS !== 'undefined') return REPORTS;
  return (typeof window !== 'undefined' && window.REPORTS) || [];
}

function getStaticCategories() {
  if (typeof CATEGORIES !== 'undefined') return CATEGORIES;
  return (typeof window !== 'undefined' && window.CATEGORIES) || [];
}

/**
 * 动态加载 data/reports.js，暴露全局 REPORTS / CATEGORIES
 */
function loadStaticData() {
  if (staticDataPromise) return staticDataPromise;
  staticDataPromise = new Promise((resolve, reject) => {
    if (getStaticReports().length && getStaticCategories().length) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'data/reports.js';
    script.onload = () => resolve();
    script.onerror = () => {
      staticDataPromise = null;
      reject(new Error('静态数据加载失败: data/reports.js'));
    };
    document.head.appendChild(script);
  });
  return staticDataPromise;
}

/**
 * 静态模式：报告列表（复刻服务端 /api/reports 的筛选/排序/分页逻辑）
 */
function staticGetReports(params = {}) {
  let reports = getStaticReports().slice();

  // 分类筛选
  if (params.category && params.category !== 'all') {
    reports = reports.filter(r => r.category === params.category);
  }

  // 搜索筛选
  if (params.search) {
    const searchLower = String(params.search).toLowerCase();
    reports = reports.filter(r =>
      r.title.toLowerCase().includes(searchLower) ||
      (r.subtitle && r.subtitle.toLowerCase().includes(searchLower)) ||
      r.summary.toLowerCase().includes(searchLower) ||
      r.tags.some(t => t.toLowerCase().includes(searchLower))
    );
  }

  // 标签筛选
  if (params.tag) {
    reports = reports.filter(r => r.tags.includes(params.tag));
  }

  // 排序
  const sort = params.sort || '-date';
  const sortField = sort.replace(/^-/, '');
  const sortDesc = sort.startsWith('-');

  reports.sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'pages':
        comparison = a.pages - b.pages;
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title, 'zh-CN');
        break;
      default:
        comparison = new Date(a.date) - new Date(b.date);
    }
    return sortDesc ? -comparison : comparison;
  });

  // 分页
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 20;
  const start = (page - 1) * limit;
  const paginatedReports = reports.slice(start, start + limit);
  const totalPages = Math.ceil(reports.length / limit);

  return {
    data: paginatedReports.map(report => ({
      ...report,
      links: {
        self: `/api/reports/${report.id}`,
        manifest: `/api/reports/${report.id}/manifest`,
        sections: `/api/reports/${report.id}/sections`
      }
    })),
    meta: {
      total: reports.length,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
}

/**
 * 静态模式：热门标签（复刻服务端 /api/tags）
 */
function staticGetHotTags() {
  const tagCount = {};
  getStaticReports().forEach(r => {
    r.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([name, count]) => ({
      name,
      count,
      links: {
        reports: `/reports?tag=${encodeURIComponent(name)}`
      }
    }));
}

/**
 * 静态模式：来源统计（复刻服务端 /api/sources）
 */
function staticGetSources() {
  const sourceCount = {};
  getStaticReports().forEach(r => {
    sourceCount[r.source] = (sourceCount[r.source] || 0) + 1;
  });

  return Object.entries(sourceCount)
    .map(([name, count]) => ({
      name,
      count,
      links: {
        reports: `/reports?source=${encodeURIComponent(name)}`
      }
    }));
}

/**
 * 静态模式：加载单个 chunk 文件，返回其内容对象
 * chunk 文件通过 script 标签加载，读取全局变量 window.REPORT_CHUNK_<id下划线化>_<N>
 */
function loadStaticChunk(reportId, chunkIndex) {
  return new Promise((resolve, reject) => {
    const varName = `REPORT_CHUNK_${reportId.replace(/-/g, '_')}_${chunkIndex}`;
    if (window[varName]) {
      resolve(window[varName]);
      return;
    }
    const script = document.createElement('script');
    script.src = `data/reports-content/${reportId}/chunk-${chunkIndex}.js`;
    script.onload = () => {
      if (window[varName]) {
        resolve(window[varName]);
      } else {
        reject(new Error(`内容块 ${reportId}/${chunkIndex} 格式无效`));
      }
    };
    script.onerror = () => reject(new Error(`内容块 ${reportId}/${chunkIndex} 不存在`));
    document.head.appendChild(script);
  });
}

// ==================== 分类 API ====================

/**
 * 获取所有分类
 * @returns {Promise<{data: Category[]}>}
 */
async function getCategories() {
  if (!useStatic) {
    try {
      return await apiRequest('/api/categories');
    } catch (e) {
      fallbackToStatic(e);
    }
  }
  await loadStaticData();
  const categories = getStaticCategories();
  return {
    data: categories,
    meta: { total: categories.length },
    links: { self: '/api/categories', reports: '/api/reports' }
  };
}

// ==================== 报告 API ====================

/**
 * 获取报告列表
 * @param {Object} params - 查询参数
 * @param {string} params.category - 分类ID
 * @param {string} params.search - 搜索关键词
 * @param {string} params.tag - 标签筛选
 * @param {string} params.sort - 排序方式 (date-desc, date-asc, pages-desc, pages-asc, title)
 * @param {number} params.page - 页码
 * @param {number} params.limit - 每页数量
 * @returns {Promise<{data: Report[], meta: PaginationMeta}>}
 */
async function getReports(params = {}) {
  if (!useStatic) {
    try {
      const queryString = buildQueryString(params);
      return await apiRequest(`/api/reports${queryString}`);
    } catch (e) {
      fallbackToStatic(e);
    }
  }
  await loadStaticData();
  return staticGetReports(params);
}

/**
 * 获取单个报告详情
 * @param {string} reportId - 报告ID
 * @returns {Promise<{data: Report}>}
 */
async function getReportById(reportId) {
  if (!useStatic) {
    try {
      return await apiRequest(`/api/reports/${reportId}`);
    } catch (e) {
      fallbackToStatic(e);
    }
  }
  await loadStaticData();
  const report = getStaticReports().find(r => r.id === reportId);
  if (!report) {
    throw new Error(`报告 ID '${reportId}' 不存在`);
  }
  return { data: report };
}

/**
 * 获取报告内容
 * @param {string} reportId - 报告ID
 * @param {Object} options - 选项
 * @param {number} options.chunk - 指定内容块索引（可选）
 * @returns {Promise<{data: ReportContent}>}
 */
async function getReportContent(reportId, options = {}) {
  if (!useStatic) {
    try {
      const queryString = buildQueryString(options);
      return await apiRequest(`/api/reports/${reportId}/sections${queryString}`);
    } catch (e) {
      fallbackToStatic(e);
    }
  }
  const manifest = await (await fetch(`data/reports-content/${reportId}/manifest.json`)).json();

  // 请求特定块
  if (options.chunk !== undefined) {
    return loadStaticChunk(reportId, options.chunk);
  }

  // 返回所有内容
  const allSections = [];
  for (let i = 0; i < manifest.totalChunks; i++) {
    const chunk = await loadStaticChunk(reportId, i);
    if (chunk && chunk.sections) {
      allSections.push(...chunk.sections);
    }
  }

  return {
    reportId,
    title: manifest.title,
    totalPages: manifest.totalPages,
    totalChunks: manifest.totalChunks,
    sections: allSections
  };
}

/**
 * 获取报告清单
 * @param {string} reportId - 报告ID
 * @returns {Promise<{data: Manifest}>}
 */
async function getReportManifest(reportId) {
  if (!useStatic) {
    try {
      return await apiRequest(`/api/reports/${reportId}/manifest`);
    } catch (e) {
      fallbackToStatic(e);
    }
  }
  const response = await fetch(`data/reports-content/${reportId}/manifest.json`);
  if (!response.ok) {
    throw new Error(`报告 '${reportId}' 的清单不存在`);
  }
  return response.json();
}

// ==================== 标签和来源 API ====================

/**
 * 获取热门标签
 * @returns {Promise<{data: {tag: string, count: number}[]}>}
 */
async function getHotTags() {
  if (!useStatic) {
    try {
      return await apiRequest('/api/tags');
    } catch (e) {
      fallbackToStatic(e);
    }
  }
  await loadStaticData();
  return staticGetHotTags();
}

/**
 * 获取报告来源统计
 * @returns {Promise<{data: {source: string, count: number}[]}>}
 */
async function getSources() {
  if (!useStatic) {
    try {
      return await apiRequest('/api/sources');
    } catch (e) {
      fallbackToStatic(e);
    }
  }
  await loadStaticData();
  return staticGetSources();
}

// ==================== 缓存工具 ====================

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

function getCached(key) {
  const item = cache.get(key);
  if (item && Date.now() - item.timestamp < CACHE_DURATION) {
    return item.data;
  }
  cache.delete(key);
  return null;
}

function setCached(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

// 带缓存的 API 方法
async function getCategoriesCached() {
  const cached = getCached('categories');
  if (cached) return { data: cached };
  const result = await getCategories();
  // 只缓存 data 数组，避免二次嵌套
  setCached('categories', result.data);
  return { data: result.data };
}

async function getReportsCached(params = {}) {
  const cacheKey = `reports_${JSON.stringify(params)}`;
  const cached = getCached(cacheKey);
  // 缓存整个 { data, meta } 对象，确保 meta 不丢失
  if (cached) return cached;
  const result = await getReports(params);
  const payload = { data: result.data, meta: result.meta };
  setCached(cacheKey, payload);
  return payload;
}

async function getReportByIdCached(reportId) {
  const cacheKey = `report_${reportId}`;
  const cached = getCached(cacheKey);
  if (cached) return { data: cached };
  const result = await getReportById(reportId);
  // 只缓存 data 对象
  setCached(cacheKey, result.data);
  return { data: result.data };
}

async function getHotTagsCached() {
  const cached = getCached('tags');
  if (cached) return { data: cached };
  const result = await getHotTags();
  // /api/tags 直接返回数组，没有 .data 包裹
  const data = Array.isArray(result) ? result : (result.data || result);
  setCached('tags', data);
  return { data };
}

async function getSourcesCached() {
  const cached = getCached('sources');
  if (cached) return { data: cached };
  const result = await getSources();
  // /api/sources 直接返回数组，没有 .data 包裹
  const data = Array.isArray(result) ? result : (result.data || result);
  setCached('sources', data);
  return { data };
}

// ==================== 导出 ====================

const ObtStarAPI = {
  // 基础方法
  getCategories,
  getReports,
  getReportById,
  getReportContent,
  getReportManifest,
  getHotTags,
  getSources,

  // 带缓存的方法
  getCategoriesCached,
  getReportsCached,
  getReportByIdCached,
  getHotTagsCached,
  getSourcesCached,

  // 工具
  clearCache: () => cache.clear(),
};

// 兼容 CommonJS 和浏览器环境
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ObtStarAPI;
} else {
  window.ObtStarAPI = ObtStarAPI;
}
