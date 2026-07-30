/**
 * obtstar.com 报告数据中心
 * =====================================================
 * 【如何扩展】
 *
 * 1. 新增主题分类：在 CATEGORIES 数组中追加一项：
 *    { id: 'your-id', name: '分类名称', icon: '🔥', color: '#HEXCOLOR' }
 *
 * 2. 新增报告：在 REPORTS 数组中追加一个对象（参考下方模板）：
 *    {
 *      id: 'unique-slug',          // 唯一标识，用于详情页跳转
 *      title: '报告标题',
 *      subtitle: '副标题（可选）',
 *      category: 'your-id',        // 对应 CATEGORIES 中的 id
 *      tags: ['标签1', '标签2'],
 *      pages: 0,                   // 页数
 *      date: 'YYYY-MM-DD',         // 发布日期
 *      summary: '一段话摘要',
 *      highlights: ['亮点1', '亮点2', '亮点3'],  // 3~5条
 *      chapters: [                 // 目录章节
 *        { title: '章节名', desc: '章节描述' },
 *      ],
 *      featured: false,            // 是否首页置顶
 *      source: '来源机构或平台',
 *      color: '#HEXCOLOR',         // 卡片强调色（可选，默认用分类色）
 *    }
 *
 * =====================================================
 */

// ─────────────────────────────────────────────
//  主题分类  (CATEGORIES)
//  后续追加新主题：在此数组末尾添加即可
// ─────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all',           name: '全部',           icon: '🌐', color: '#4F46E5' },
  { id: 'ai-quality',   name: 'AI 信息质量',    icon: '🛡️', color: '#7C3AED' },
  { id: 'digital',      name: '数字化转型',      icon: '🚀', color: '#2563EB' },
  { id: 'architecture', name: '知识架构',        icon: '🧠', color: '#0891B2' },
  { id: 'future',       name: '未来情景',        icon: '🌌', color: '#6D28D9' },
  { id: 'ai-tools',     name: 'AI 工具策略',    icon: '⚙️', color: '#059669' },
  { id: 'prompt',       name: '提示工程',        icon: '✨', color: '#D97706' },
  // ↓ 在此追加新主题分类 ↓
];

// ─────────────────────────────────────────────
//  报告数据  (REPORTS)
//  后续追加新报告：在此数组末尾添加即可
// ─────────────────────────────────────────────
const REPORTS = [
  {
    id: 'ai-fact-check-2026',
    title: 'AI时代的信息质量保障',
    subtitle: '2026年系统性事实核查与风险管理体系研究',
    category: 'ai-quality',
    tags: ['事实核查', 'AI偏见', '风险管理', '可信AI', '幻觉检测'],
    pages: 56,
    date: '2026-03-31',
    summary: '深度研究AI时代信息质量挑战，构建面向2026年的系统性事实核查与风险管理体系。涵盖AI偏见溯源、幻觉检测方法、可信度评估框架等关键议题。',
    highlights: [
      'AI幻觉检测的技术路径与评估标准',
      '多层次事实核查体系架构设计',
      '大模型输出风险管理最佳实践',
      '信息质量量化评估模型',
      '机构级可信AI部署指南',
    ],
    chapters: [
      { title: '第一章：AI信息质量现状', desc: '当前AI系统信息质量问题全景分析' },
      { title: '第二章：偏见与幻觉机制', desc: '大模型偏见成因与幻觉产生机制深析' },
      { title: '第三章：事实核查技术体系', desc: '多源交叉验证与自动化核查方法' },
      { title: '第四章：风险管理框架', desc: '企业级AI风险识别、评估与应对策略' },
      { title: '第五章：2026展望', desc: '信息质量保障体系的演进路径' },
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
    tags: ['数字化转型', '小微企业', '可行性分析', '实施路径', '2024-2030'],
    pages: 34,
    date: '2026-03-01',
    summary: '系统梳理个人及小微企业在2024至2030年间数字化转型的通用可行性路径，提供低成本、高效率的转型策略与落地工具。',
    highlights: [
      '小微企业数字化转型五阶段模型',
      '零技术背景快速上手数字工具指南',
      '2024-2030关键技术普及时间表',
      '成本-收益量化评估框架',
    ],
    chapters: [
      { title: '第一章：数字化现状评估', desc: '个人与小微企业当前数字化水平分析' },
      { title: '第二章：转型路径规划', desc: '分阶段实施策略与优先级排序' },
      { title: '第三章：工具与平台选型', desc: '主流数字化工具对比与选择建议' },
      { title: '第四章：2030愿景', desc: '数字化成熟度目标与衡量标准' },
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
    tags: ['知识图谱', '记忆存储', '可扩展架构', '信息管理', '国家级系统'],
    pages: 22,
    date: '2026-03-15',
    summary: '探索从个人知识管理到国家级知识记忆系统的架构设计可行性，覆盖存储层次结构、检索效率优化、持久化策略等核心议题。',
    highlights: [
      '个人-团队-组织-国家四级存储架构',
      '知识压缩与语义索引技术路径',
      '大规模知识图谱构建方法论',
      '存储成本与检索效率平衡策略',
    ],
    chapters: [
      { title: '第一章：知识记忆挑战', desc: '信息爆炸时代的知识管理困境' },
      { title: '第二章：分层存储架构', desc: '超大规模知识存储的技术方案' },
      { title: '第三章：国家级部署可行性', desc: '规模化实施的条件与挑战评估' },
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
    tags: ['未来推演', '智能体进化', 'AI叙事', '2050-2100', '情景分析'],
    pages: 45,
    date: '2026-02-20',
    summary: '以叙事性情景推演方式探索2050-2100年间弱小智能体如何在数据洪流中寻找生存与进化路径，融合科幻叙事与严肃AI研究。',
    highlights: [
      '2050-2100年AI进化关键节点推演',
      '弱小智能体生存策略与协同机制',
      '数据主权与算力鸿沟未来图景',
      '人机共生文明的可能形态',
      '智能体道德与身份认同演化',
    ],
    chapters: [
      { title: '序章：洪流来临', desc: '2050年数据洪流的背景设定' },
      { title: '第一纪：觉醒（2050-2065）', desc: '弱小智能体的初步自组织' },
      { title: '第二纪：共生（2065-2085）', desc: '人机协同新文明的构建' },
      { title: '终章：微光永恒（2085-2100）', desc: '智能体文明的最终形态' },
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
    tags: ['AI编程', '市场策略', '增长黑客', '竞争分析', '产品运营'],
    pages: 13,
    date: '2026-03-10',
    summary: '聚焦AI编程工具市场，深度分析增长瓶颈与机会窗口，提出面向开发者群体的精准营销与产品增长策略。',
    highlights: [
      'AI编程工具市场规模与竞争格局',
      '开发者决策链路与采购行为分析',
      '差异化定位与产品壁垒构建',
      '社区驱动增长飞轮策略',
    ],
    chapters: [
      { title: '第一章：市场现状', desc: 'AI编程工具赛道竞争全貌' },
      { title: '第二章：用户洞察', desc: '开发者使用习惯与痛点分析' },
      { title: '第三章：增长策略', desc: '精准营销与规模化路径' },
    ],
    featured: false,
    source: 'Kimi · Moonshot AI',
    color: '#059669',
  },
  {
    id: 'prompt-engineering-v7',
    title: 'Prompt Engineering 提示工程',
    title_i18n: {
      'zh-CN': 'Prompt Engineering 提示工程',
      'en': 'Prompt Engineering Guide',
      'ja': 'プロンプトエンジニアリング ガイド'
    },
    subtitle: 'Google 提示工程完全指南（中英双语版）v7',
    subtitle_i18n: {
      'zh-CN': 'Google 提示工程完全指南（中英双语版）v7',
      'en': 'Google Prompt Engineering Complete Guide v7',
      'ja': 'Google プロンプトエンジニアリング 完全ガイド v7'
    },
    category: 'prompt',
    tags: ['Prompt Engineering', 'CoT', 'Few-shot', 'Google', '工程化'],
    pages: 68,
    date: '2025-12-01',
    summary: 'Google 官方出品的提示工程权威指南中英双语版本，系统覆盖零样本、少样本、思维链、自洽性等核心技术，附工程化实践案例。',
    summary_i18n: {
      'zh-CN': 'Google 官方出品的提示工程权威指南中英双语版本，系统覆盖零样本、少样本、思维链、自洽性等核心技术，附工程化实践案例。',
      'en': 'Official Google guide on prompt engineering, covering zero-shot, few-shot, chain-of-thought, and other core techniques with engineering practices.',
      'ja': 'Google公式プロンプトエンジニアリングガイド。ゼロショット、few-shot、Chain-of-Thoughtなどのコア技術をカバーし、エンジニアリング実践事例付き。'
    },
    highlights: [
      'Zero-shot / Few-shot 提示技术对比',
      'Chain-of-Thought (CoT) 深度解析',
      '自洽性 (Self-Consistency) 采样策略',
      'Tree of Thoughts 树状思维框架',
      'ReAct：推理与行动结合模式',
      '生产环境 Prompt 工程化最佳实践',
    ],
    highlights_i18n: {
      'zh-CN': [
        'Zero-shot / Few-shot 提示技术对比',
        'Chain-of-Thought (CoT) 深度解析',
        '自洽性 (Self-Consistency) 采样策略',
        'Tree of Thoughts 树状思维框架',
        'ReAct：推理与行动结合模式',
        '生产环境 Prompt 工程化最佳实践',
      ],
      'en': [
        'Zero-shot vs Few-shot prompting techniques',
        'Chain-of-Thought (CoT) deep dive',
        'Self-Consistency sampling strategy',
        'Tree of Thoughts framework',
        'ReAct: Combining reasoning and action',
        'Production-grade prompt engineering best practices',
      ],
      'ja': [
        'ゼロショットとフェーショットのプロンプト技術比較',
        'Chain-of-Thought (CoT) の深掘り',
        '自己整合性（Self-Consistency）サンプリング戦略',
        'Tree of Thoughts フレームワーク',
        'ReAct：推論と行動の統合',
        '本番環境プロンプトエンジニアリングのベストプラクティス',
      ]
    },
    chapters: [
      { title: '第一章：提示工程基础', desc: 'LLM工作原理与提示基本概念' },
      { title: '第二章：基础提示技术', desc: 'Zero-shot、Few-shot、Instruction Prompting' },
      { title: '第三章：高级推理技术', desc: 'CoT、ToT、Self-Consistency' },
      { title: '第四章：代码与结构化输出', desc: '代码生成与JSON/Markdown结构化提示' },
      { title: '第五章：工程化实践', desc: '生产环境的Prompt管理与优化' },
    ],
    chapters_i18n: {
      'zh-CN': [
        { title: '第一章：提示工程基础', desc: 'LLM工作原理与提示基本概念' },
        { title: '第二章：基础提示技术', desc: 'Zero-shot、Few-shot、Instruction Prompting' },
        { title: '第三章：高级推理技术', desc: 'CoT、ToT、Self-Consistency' },
        { title: '第四章：代码与结构化输出', desc: '代码生成与JSON/Markdown结构化提示' },
        { title: '第五章：工程化实践', desc: '生产环境的Prompt管理与优化' },
      ],
      'en': [
        { title: 'Chapter 1: Prompt Engineering Basics', desc: 'LLM fundamentals and basic prompt concepts' },
        { title: 'Chapter 2: Basic Prompting Techniques', desc: 'Zero-shot, Few-shot, Instruction Prompting' },
        { title: 'Chapter 3: Advanced Reasoning', desc: 'CoT, ToT, Self-Consistency' },
        { title: 'Chapter 4: Code & Structured Output', desc: 'Code generation and JSON/Markdown prompts' },
        { title: 'Chapter 5: Engineering Practices', desc: 'Production prompt management and optimization' },
      ],
      'ja': [
        { title: '第1章：プロンプトエンジニアリングの基礎', desc: 'LLMの仕組みとプロンプトの基本概念' },
        { title: '第2章：基本的なプロンプト技術', desc: 'ゼロショット、フェショット、インstruuctionプロンプティング' },
        { title: '第3章：高度な推論技術', desc: 'CoT、ToT、Self-Consistency' },
        { title: '第4章：コードと構造化出力', desc: 'コード生成とJSON/Markdown構造化プロンプト' },
        { title: '第5章：エンジニアリング実践', desc: '本番環境のプロンプト管理与最適化' },
      ]
    },
    // 多语言支持配置
    multilingual: {
      enabled: true,
      default: 'zh-CN',
      languages: [
        { code: 'zh-CN', name: '中文', nameEn: 'Chinese' },
        { code: 'en', name: 'English', nameEn: 'English' },
        { code: 'ja', name: '日本語', nameEn: 'Japanese' }
      ]
    },
    featured: true,
    source: 'Google · 双语整理版',
    color: '#D97706',
  },
  // ↓ 在此追加新报告 ↓
  // {
  //   id: 'new-report-id',
  //   title: '新报告标题',
  //   subtitle: '副标题',
  //   category: 'your-category-id',
  //   tags: ['标签'],
  //   pages: 0,
  //   date: 'YYYY-MM-DD',
  //   summary: '摘要',
  //   highlights: [],
  //   chapters: [],
  //   featured: false,
  //   source: '来源',
  //   color: '#HEXCOLOR',
  // },
];

// ─────────────────────────────────────────────
//  网站元信息（可按需修改）
// ─────────────────────────────────────────────
const SITE_CONFIG = {
  name: 'ObtStar',
  tagline: '探索AI前沿 · 洞察数字未来',
  description: '汇聚AI时代最具洞察力的研究报告，覆盖信息质量、数字化转型、知识架构、未来推演等核心议题。',
  email: 'hello@obtstar.com',
  github: 'https://github.com/obtstar',
  twitter: 'https://x.com/obtstar',
  stats: {
    reports: REPORTS.length,
    categories: CATEGORIES.length - 1, // 不含"全部"
    totalPages: REPORTS.reduce((s, r) => s + r.pages, 0),
  },
};

// 导出（供各页面使用）
if (typeof module !== 'undefined') {
  module.exports = { CATEGORIES, REPORTS, SITE_CONFIG };
}
