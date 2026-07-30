/**
 * ObtStar API 模块
 * 遵循 RESTful API 规范 (RFC 7231, RFC 7807) 和 W3C HTTP 标准
 * 
 * API 设计原则:
 * - 使用名词复数形式表示资源集合
 * - 使用 HTTP 方法表示操作 (GET/POST/PUT/DELETE)
 * - 使用标准 HTTP 状态码
 * - 遵循 RFC 7807 Problem Details 错误格式
 * - 支持 HATEOAS 风格的链接
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { URL } = require('url');

// 数据缓存
let categoriesCache = null;
let reportsCache = null;
const contentCache = new Map();
const manifestCache = new Map();

/**
 * 标准 HTTP 状态码 (RFC 7231)
 */
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  CONFLICT: 409,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

/**
 * API 版本
 */
const API_VERSION = '1.0.0';

/**
 * 加载分类数据
 */
function loadCategories() {
  if (categoriesCache) return categoriesCache;

  categoriesCache = [
    { id: 'all', name: '全部', icon: '🌐', color: '#4F46E5' },
    { id: 'ai-quality', name: 'AI 信息质量', icon: '🛡️', color: '#7C3AED' },
    { id: 'digital', name: '数字化转型', icon: '🚀', color: '#2563EB' },
    { id: 'architecture', name: '知识架构', icon: '🧠', color: '#0891B2' },
    { id: 'future', name: '未来情景', icon: '🌌', color: '#6D28D9' },
    { id: 'ai-tools', name: 'AI 工具策略', icon: '⚙️', color: '#059669' },
    { id: 'prompt', name: '提示工程', icon: '✨', color: '#D97706' },
  ];

  return categoriesCache;
}

/**
 * 加载报告数据
 */
function loadReports() {
  if (reportsCache) return reportsCache;

  const dataDir = path.join(__dirname, '..', 'docs', 'data');
  const reportsFile = path.join(dataDir, 'reports.js');

  const content = fs.readFileSync(reportsFile, 'utf-8');
  const reportsMatch = content.match(/const\s+REPORTS\s*=\s*(\[[\s\S]*?\]);/);
  
  if (!reportsMatch) {
    throw new Error('无法解析 REPORTS 数据');
  }

  try {
    reportsCache = new Function('return ' + reportsMatch[1])();
  } catch (e) {
    reportsCache = getFallbackReports();
  }

  return reportsCache;
}

/**
 * 后备报告数据
 */
function getFallbackReports() {
  return [
    {
      id: 'ai-fact-check-2026',
      title: 'AI时代的信息质量保障',
      subtitle: '2026年系统性事实核查与风险管理体系研究',
      category: 'ai-quality',
      tags: ['事实核查', 'AI偏见', '风险管理', '可信AI', '幻觉检测'],
      pages: 56,
      date: '2026-03-31',
      summary: '深度研究AI时代信息质量挑战，构建面向2026年的系统性事实核查与风险管理体系。',
      highlights: ['AI幻觉检测的技术路径与评估标准', '多层次事实核查体系架构设计'],
      chapters: [
        { title: '第一章：AI信息质量现状', desc: '当前AI系统信息质量问题全景分析' },
      ],
      featured: true,
      source: '小艺 · 华为研究院',
      color: '#7C3AED',
    },
    {
      id: 'digital-transform-2024-2030',
      title: '个人与小微企业数字化转型',
      subtitle: '通用可行性报告（2024-2030）',
      category: 'digital',
      tags: ['数字化转型', '小微企业', '可行性分析'],
      pages: 34,
      date: '2026-03-01',
      summary: '系统梳理个人及小微企业在2024至2030年间数字化转型的通用可行性路径。',
      highlights: ['小微企业数字化转型五阶段模型', '零技术背景快速上手数字工具指南'],
      chapters: [
        { title: '第一章：数字化现状评估', desc: '个人与小微企业当前数字化水平分析' },
      ],
      featured: true,
      source: 'Kimi · Moonshot AI',
      color: '#2563EB',
    },
    {
      id: 'knowledge-memory-arch',
      title: '超大规模知识记忆存储架构',
      subtitle: '从个人到国家的可行性分析',
      category: 'architecture',
      tags: ['知识图谱', '记忆存储', '可扩展架构'],
      pages: 22,
      date: '2026-03-15',
      summary: '探索从个人知识管理到国家级知识记忆系统的架构设计可行性。',
      highlights: ['个人-团队-组织-国家四级存储架构', '知识压缩与语义索引技术路径'],
      chapters: [
        { title: '第一章：知识记忆挑战', desc: '信息爆炸时代的知识管理困境' },
      ],
      featured: false,
      source: 'Kimi · Moonshot AI',
      color: '#0891B2',
    },
    {
      id: 'data-stream-micro-light',
      title: '数据洪流与微光',
      subtitle: '弱小智能体的进化史诗（2050-2100未来情景推演）',
      category: 'future',
      tags: ['未来推演', '智能体进化', 'AI叙事'],
      pages: 45,
      date: '2026-02-20',
      summary: '以叙事性情景推演方式探索2050-2100年间弱小智能体的进化路径。',
      highlights: ['2050-2100年AI进化关键节点推演', '弱小智能体生存策略与协同机制'],
      chapters: [
        { title: '序章：洪流来临', desc: '2050年数据洪流的背景设定' },
      ],
      featured: true,
      source: 'Kimi · Moonshot AI',
      color: '#6D28D9',
    },
    {
      id: 'ai-coding-tools-growth',
      title: 'AI编程工具销量增长策略',
      subtitle: '深度研究报告',
      category: 'ai-tools',
      tags: ['AI编程', '市场策略', '增长黑客'],
      pages: 13,
      date: '2026-03-10',
      summary: '聚焦AI编程工具市场，深度分析增长瓶颈与机会窗口。',
      highlights: ['AI编程工具市场规模与竞争格局', '开发者决策链路与采购行为分析'],
      chapters: [
        { title: '第一章：市场现状', desc: 'AI编程工具赛道竞争全貌' },
      ],
      featured: false,
      source: 'Kimi · Moonshot AI',
      color: '#059669',
    },
    {
      id: 'prompt-engineering-v7',
      title: 'Prompt Engineering 提示工程',
      subtitle: 'Google 提示工程完全指南（中英双语版）v7',
      category: 'prompt',
      tags: ['Prompt Engineering', 'CoT', 'Few-shot'],
      pages: 68,
      date: '2025-12-01',
      summary: 'Google 官方出品的提示工程权威指南中英双语版本。',
      highlights: ['Zero-shot / Few-shot 提示技术对比', 'Chain-of-Thought (CoT) 深度解析'],
      chapters: [
        { title: '第一章：提示工程基础', desc: 'LLM工作原理与提示基本概念' },
      ],
      featured: false,
      source: 'Google · Cloud AI',
      color: '#D97706',
    },
  ];
}

/**
 * 加载报告 manifest
 */
function loadManifest(reportId) {
  if (manifestCache.has(reportId)) {
    return manifestCache.get(reportId);
  }

  const manifestPath = path.join(__dirname, '..', 'docs', 'data', 'reports-content', reportId, 'manifest.json');

  if (!fs.existsSync(manifestPath)) {
    return null;
  }

  const content = fs.readFileSync(manifestPath, 'utf-8');
  const manifest = JSON.parse(content);
  manifestCache.set(reportId, manifest);
  return manifest;
}

/**
 * 加载报告内容块
 */
function loadContentChunk(reportId, chunkIndex) {
  const cacheKey = `${reportId}_${chunkIndex}`;
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey);
  }

  const chunkPath = path.join(__dirname, '..', 'docs', 'data', 'reports-content', reportId, `chunk-${chunkIndex}.js`);

  if (!fs.existsSync(chunkPath)) {
    return null;
  }

  const content = fs.readFileSync(chunkPath, 'utf-8');
  const chunkMatch = content.match(/window\.REPORT_CHUNK_[\w_]+\s*=\s*({[\s\S]*?\n}\s*;)/m);
  
  if (!chunkMatch) {
    console.error(`无法匹配内容块: ${reportId}/${chunkIndex}`);
    return null;
  }

  try {
    const jsonStr = chunkMatch[1].replace(/;\s*$/, '');
    const chunk = new Function('return ' + jsonStr)();
    contentCache.set(cacheKey, chunk);
    return chunk;
  } catch (e) {
    console.error(`解析内容块失败: ${reportId}/${chunkIndex}`, e);
    return null;
  }
}

/**
 * 生成 ETag (RFC 7232)
 * @param {string|Buffer} data - 数据内容
 * @returns {string} ETag 值
 */
function generateETag(data) {
  const hash = crypto.createHash('sha256');
  hash.update(typeof data === 'string' ? data : JSON.stringify(data));
  return hash.digest('hex').substring(0, 16);
}

/**
 * 检查 If-None-Match 条件
 * @param {Object} req - HTTP 请求对象
 * @param {string} etag - 当前 ETag
 * @returns {boolean} 是否匹配
 */
function isNotModified(req, etag) {
  const ifNoneMatch = req.headers['if-none-match'];
  if (!ifNoneMatch) return false;
  return ifNoneMatch === `"${etag}"` || ifNoneMatch === etag || ifNoneMatch === '*';
}

/**
 * 设置标准响应头 (RFC 7231, RFC 7234)
 * @param {Object} res - HTTP 响应对象
 * @param {Object} options - 配置选项
 * @param {boolean} options.cache - 是否启用缓存
 * @param {string} options.etag - ETag 值
 * @param {number} options.maxAge - 缓存最大年龄（秒）
 */
function setStandardHeaders(res, options = {}) {
  // 内容类型
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Accept-Language');
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count, X-Page, X-Limit, X-API-Version, Link');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // 内容协商
  res.setHeader('Vary', 'Accept, Accept-Encoding, Accept-Language');
  
  // API 版本
  res.setHeader('X-API-Version', API_VERSION);
  
  // 缓存控制 (RFC 7234)
  if (options.cache) {
    const maxAge = options.maxAge || 300;
    res.setHeader('Cache-Control', `public, max-age=${maxAge}, stale-while-revalidate=60`);
  } else {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  
  // ETag (RFC 7232)
  if (options.etag) {
    res.setHeader('ETag', `"${options.etag}"`);
  }
  
  // 安全头
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
}

/**
 * 发送成功响应
 */
function sendResponse(res, statusCode, data, options = {}) {
  setStandardHeaders(res, options);
  res.writeHead(statusCode);
  res.end(JSON.stringify(data));
}

/**
 * 发送错误响应 (RFC 7807 Problem Details)
 * @param {Object} res - HTTP 响应对象
 * @param {number} statusCode - HTTP 状态码
 * @param {string} title - 错误标题
 * @param {string} detail - 错误详情
 * @param {string} instance - 错误实例 URI
 * @param {Object} extensions - 扩展字段
 */
function sendError(res, statusCode, title, detail, instance, extensions = {}) {
  const errorResponse = {
    type: `https://api.obtstar.com/errors/${statusCode}`,
    title,
    status: statusCode,
    detail,
    instance: instance || '/api' + (new URL(res.req.url, `http://${res.req.headers.host}`).pathname),
    timestamp: new Date().toISOString(),
    ...extensions
  };
  
  res.setHeader('Content-Type', 'application/problem+json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.writeHead(statusCode);
  res.end(JSON.stringify(errorResponse));
}

/**
 * 发送验证错误响应 (RFC 7807 + RFC 9457)
 * @param {Object} res - HTTP 响应对象
 * @param {Array} errors - 验证错误列表
 */
function sendValidationError(res, errors) {
  const errorResponse = {
    type: 'https://api.obtstar.com/errors/validation-failed',
    title: 'Validation Failed',
    status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    errors: errors.map(err => ({
      field: err.field,
      message: err.message,
      code: err.code || 'invalid'
    })),
    timestamp: new Date().toISOString()
  };
  
  res.setHeader('Content-Type', 'application/problem+json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.writeHead(HTTP_STATUS.UNPROCESSABLE_ENTITY);
  res.end(JSON.stringify(errorResponse));
}

/**
 * 检查内容协商
 */
function checkContentNegotiation(req, res) {
  const accept = req.headers.accept || '*/*';
  
  if (accept !== '*/*' && !accept.includes('application/json') && !accept.includes('*/*')) {
    sendError(
      res, 
      HTTP_STATUS.NOT_ACCEPTABLE, 
      'Not Acceptable',
      'API 仅支持 application/json 响应格式'
    );
    return false;
  }
  
  return true;
}

/**
 * 验证报告 ID 格式
 */
function isValidReportId(id) {
  return typeof id === 'string' && /^[a-z0-9-]+$/.test(id) && id.length <= 64;
}

/**
 * GET /categories - 获取所有分类
 * 
 * 响应格式 (200 OK):
 * {
 *   data: Category[],
 *   meta: { total: number },
 *   links: { self: string }
 * }
 */
function getCategories(req, res) {
  if (!checkContentNegotiation(req, res)) return;
  
  const categories = loadCategories();
  const etag = generateETag(categories);
  
  // RFC 7232 条件请求处理
  if (isNotModified(req, etag)) {
    res.writeHead(HTTP_STATUS.NOT_MODIFIED);
    res.end();
    return;
  }
  
  const response = {
    data: categories,
    meta: {
      total: categories.length,
      version: API_VERSION
    },
    links: {
      self: '/api/categories',
      reports: '/api/reports'
    }
  };
  
  sendResponse(res, HTTP_STATUS.OK, response, { 
    cache: true, 
    etag,
    maxAge: 3600 // 分类数据缓存1小时
  });
}

/**
 * GET /reports - 获取报告列表
 */
function getReports(req, res, query) {
  if (!checkContentNegotiation(req, res)) return;
  
  let reports = loadReports();

  // 分类筛选
  if (query.category && query.category !== 'all') {
    reports = reports.filter(r => r.category === query.category);
  }

  // 搜索筛选
  if (query.search) {
    const searchLower = query.search.toLowerCase();
    reports = reports.filter(r =>
      r.title.toLowerCase().includes(searchLower) ||
      (r.subtitle && r.subtitle.toLowerCase().includes(searchLower)) ||
      r.summary.toLowerCase().includes(searchLower) ||
      r.tags.some(t => t.toLowerCase().includes(searchLower))
    );
  }

  // 标签筛选
  if (query.tag) {
    reports = reports.filter(r => r.tags.includes(query.tag));
  }

  // 排序
  const sort = query.sort || '-date';
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
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  
  if (page < 1 || limit < 1 || limit > 100) {
    sendError(
      res,
      HTTP_STATUS.BAD_REQUEST,
      'Bad Request',
      '分页参数无效: page >= 1, 1 <= limit <= 100'
    );
    return;
  }
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedReports = reports.slice(start, end);
  const totalPages = Math.ceil(reports.length / limit);
  
  // 构建查询参数（用于链接）
  const buildQuery = (pageNum) => {
    const params = new URLSearchParams();
    params.set('page', pageNum);
    params.set('limit', limit);
    if (query.category && query.category !== 'all') params.set('category', query.category);
    if (query.search) params.set('search', query.search);
    if (query.tag) params.set('tag', query.tag);
    if (query.sort) params.set('sort', query.sort);
    return params.toString();
  };
  
  const responseData = {
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
    },
    links: {
      self: `/api/reports?${buildQuery(page)}`,
      first: `/api/reports?${buildQuery(1)}`,
      last: `/api/reports?${buildQuery(totalPages)}`,
      ...(page > 1 && { prev: `/api/reports?${buildQuery(page - 1)}` }),
      ...(page < totalPages && { next: `/api/reports?${buildQuery(page + 1)}` })
    }
  };
  
  // 生成 ETag
  const etag = generateETag(responseData);
  
  // RFC 7232 条件请求
  if (isNotModified(req, etag)) {
    res.writeHead(HTTP_STATUS.NOT_MODIFIED);
    res.end();
    return;
  }
  
  setStandardHeaders(res, { cache: true, etag, maxAge: 60 });
  res.setHeader('X-Total-Count', reports.length);
  res.setHeader('X-Page', page);
  res.setHeader('X-Limit', limit);
  
  // RFC 5988 Web Linking
  const links = [];
  links.push(`</api/reports?${buildQuery(page)}>; rel="self"`);
  links.push(`</api/reports?${buildQuery(1)}>; rel="first"`);
  links.push(`</api/reports?${buildQuery(totalPages)}>; rel="last"`);
  if (page > 1) links.push(`</api/reports?${buildQuery(page - 1)}>; rel="prev"`);
  if (page < totalPages) links.push(`</api/reports?${buildQuery(page + 1)}>; rel="next"`);
  res.setHeader('Link', links.join(', '));
  
  res.writeHead(HTTP_STATUS.OK);
  res.end(JSON.stringify(responseData));
}

/**
 * GET /reports/:id - 获取单个报告详情
 */
function getReportById(req, res, reportId) {
  if (!checkContentNegotiation(req, res)) return;
  
  if (!isValidReportId(reportId)) {
    sendError(
      res,
      HTTP_STATUS.BAD_REQUEST,
      'Bad Request',
      '报告 ID 格式无效'
    );
    return;
  }
  
  const reports = loadReports();
  const report = reports.find(r => r.id === reportId);

  if (!report) {
    sendError(
      res,
      HTTP_STATUS.NOT_FOUND,
      'Not Found',
      `报告 ID '${reportId}' 不存在`
    );
    return;
  }

  const etag = generateETag(report);
  
  if (req.headers['if-none-match'] === `"${etag}"`) {
    res.writeHead(304);
    res.end();
    return;
  }
  
  sendResponse(res, HTTP_STATUS.OK, { data: report }, { cache: true, etag });
}

/**
 * GET /reports/:id/sections - 获取报告内容
 */
function getReportSections(req, res, reportId, query) {
  if (!checkContentNegotiation(req, res)) return;
  
  if (!isValidReportId(reportId)) {
    sendError(
      res,
      HTTP_STATUS.BAD_REQUEST,
      'Bad Request',
      '报告 ID 格式无效'
    );
    return;
  }
  
  const manifest = loadManifest(reportId);

  if (!manifest) {
    sendError(
      res,
      HTTP_STATUS.NOT_FOUND,
      'Not Found',
      `报告 '${reportId}' 的内容不存在`
    );
    return;
  }

  // 请求特定块
  if (query.chunk !== undefined) {
    const chunkIndex = parseInt(query.chunk);
    
    if (isNaN(chunkIndex) || chunkIndex < 0 || chunkIndex >= manifest.totalChunks) {
      sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'Bad Request',
        `chunk 参数必须在 0 到 ${manifest.totalChunks - 1} 之间`
      );
      return;
    }
    
    const chunk = loadContentChunk(reportId, chunkIndex);
    if (!chunk) {
      sendError(
        res,
        HTTP_STATUS.NOT_FOUND,
        'Not Found',
        `内容块 ${chunkIndex} 不存在`
      );
      return;
    }

    sendResponse(res, HTTP_STATUS.OK, chunk, { cache: true });
    return;
  }

  // 返回所有内容
  const allSections = [];
  for (let i = 0; i < manifest.totalChunks; i++) {
    const chunk = loadContentChunk(reportId, i);
    if (chunk && chunk.sections) {
      allSections.push(...chunk.sections);
    }
  }

  const responseData = {
    reportId,
    title: manifest.title,
    totalPages: manifest.totalPages,
    totalChunks: manifest.totalChunks,
    sections: allSections,
    links: {
      self: `/reports/${reportId}/sections`,
      report: `/reports/${reportId}`
    }
  };

  sendResponse(res, HTTP_STATUS.OK, responseData, { cache: true });
}

/**
 * GET /reports/:id/manifest - 获取报告清单
 */
function getReportManifest(req, res, reportId) {
  if (!checkContentNegotiation(req, res)) return;
  
  if (!isValidReportId(reportId)) {
    sendError(
      res,
      HTTP_STATUS.BAD_REQUEST,
      'Bad Request',
      '报告 ID 格式无效'
    );
    return;
  }
  
  const manifest = loadManifest(reportId);

  if (!manifest) {
    sendError(
      res,
      HTTP_STATUS.NOT_FOUND,
      'Not Found',
      `报告 '${reportId}' 的清单不存在`
    );
    return;
  }

  const etag = generateETag(manifest);
  
  if (req.headers['if-none-match'] === `"${etag}"`) {
    res.writeHead(304);
    res.end();
    return;
  }
  
  const responseData = {
    ...manifest,
    links: {
      self: `/reports/${reportId}/manifest`,
      report: `/reports/${reportId}`,
      sections: `/reports/${reportId}/sections`
    }
  };
  
  sendResponse(res, HTTP_STATUS.OK, responseData, { cache: true, etag });
}

/**
 * GET /tags - 获取热门标签
 */
function getTags(req, res) {
  if (!checkContentNegotiation(req, res)) return;
  
  const reports = loadReports();
  const tagCount = {};

  reports.forEach(r => {
    r.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  const tags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([name, count]) => ({ 
      name, 
      count,
      links: {
        reports: `/reports?tag=${encodeURIComponent(name)}`
      }
    }));

  sendResponse(res, HTTP_STATUS.OK, tags, { cache: true });
}

/**
 * GET /sources - 获取报告来源统计
 */
function getSources(req, res) {
  if (!checkContentNegotiation(req, res)) return;
  
  const reports = loadReports();
  const sourceCount = {};

  reports.forEach(r => {
    sourceCount[r.source] = (sourceCount[r.source] || 0) + 1;
  });

  const sources = Object.entries(sourceCount)
    .map(([name, count]) => ({ 
      name, 
      count,
      links: {
        reports: `/reports?source=${encodeURIComponent(name)}`
      }
    }));

  sendResponse(res, HTTP_STATUS.OK, sources, { cache: true });
}

/**
 * GET /health - 健康检查
 */
function getHealth(req, res) {
  sendResponse(res, HTTP_STATUS.OK, {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}

/**
 * API 路由处理
 */
function handleAPIRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.replace(/^\/api/, '') || '/';
  const query = Object.fromEntries(url.searchParams);

  // 只允许 GET、HEAD、OPTIONS 方法
  if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD, OPTIONS');
    sendError(
      res,
      HTTP_STATUS.METHOD_NOT_ALLOWED,
      'Method Not Allowed',
      `方法 ${req.method} 不被允许`
    );
    return;
  }

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.writeHead(HTTP_STATUS.NO_CONTENT);
    res.end();
    return;
  }

  // HEAD 请求处理 - 与 GET 相同但不返回 body
  const isHead = req.method === 'HEAD';

  // 路由匹配
  const routes = [
    { pattern: /^\/$/, handler: getHealth },
    { pattern: /^\/categories$/, handler: getCategories },
    { pattern: /^\/reports$/, handler: (req, res) => getReports(req, res, query) },
    { pattern: /^\/tags$/, handler: getTags },
    { pattern: /^\/sources$/, handler: getSources },
    { 
      pattern: /^\/reports\/([^\/]+)$/, 
      handler: (req, res, matches) => getReportById(req, res, matches[1]) 
    },
    { 
      pattern: /^\/reports\/([^\/]+)\/sections$/, 
      handler: (req, res, matches) => getReportSections(req, res, matches[1], query) 
    },
    { 
      pattern: /^\/reports\/([^\/]+)\/manifest$/, 
      handler: (req, res, matches) => getReportManifest(req, res, matches[1]) 
    }
  ];

  for (const route of routes) {
    const matches = pathname.match(route.pattern);
    if (matches) {
      if (isHead) {
        const originalEnd = res.end;
        res.end = function() {
          return originalEnd.call(this);
        };
      }
      route.handler(req, res, matches);
      return;
    }
  }

  // 404 - API 端点不存在
  sendError(
    res,
    HTTP_STATUS.NOT_FOUND,
    'Not Found',
    `API 端点 '${pathname}' 不存在`
  );
}

module.exports = { handleAPIRequest };
