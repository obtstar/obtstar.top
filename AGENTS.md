# AGENTS.md — obtstar.top 官网（control 平台）项目说明

> 本文件面向 AI 编码代理。obtstar.top 为 **control 平台官网**（2026-08-29 改造，TASK-000019）。

## 项目概述

obtstar.top 是 control 平台（单人 AI Agent 平台）的**公网展示官网**（GitHub Pages 静态站）。
域名 `obtstar.top` 已解析到 GitHub Pages（CNAME → obtstar.github.io）。展示内容：平台介绍、
架构、快速开始、平台状态快照。**不含平台运行时**（平台为内网单机，不暴露公网）。

## 技术栈

- 纯静态 HTML + 原生 CSS（无框架、无构建、无包管理器）
- GitHub Pages 部署：`.github/workflows/pages.yml`（push main → docs/ → Pages 自动发布）
- 无 Node 后端（旧站 server.js/api/ 已移除，保留在 git 历史）

## 目录结构

```
├── docs/                    # 【部署产物】GitHub Pages 发布此目录
│   ├── index.html           # 平台介绍 + 核心原则
│   ├── architecture.html    # 六仓/技术栈/流水线/数据分层
│   ├── quickstart.html      # 快速开始（初始化/构建/运行）
│   ├── status.html          # 平台状态快照
│   ├── css/styles.css       # 全局样式（深色主题）
│   └── favicon.svg
└── .github/workflows/pages.yml  # Pages 自动部署
```

## 内容来源（有据）

官网内容提炼自 control 平台仓库（权威居所）：
- `control-center/docs/architecture/00-principles.md`（核心原则）
- `control-center/docs/architecture/01-overview.md`、`05/06/15/17` 章（架构）
- `/home/dev/AGENTS.md`（构建运行/快速开始）
- 平台状态为**静态快照**（定期更新，非实时）

修改官网内容时保持与平台文档一致；平台文档改动后如需官网同步，更新对应页面。

## 提交规范

- 中文 Conventional Commits（如 `feat: 新增架构页`、`fix: 样式`）
- 部署：push 到 main → Actions 自动部署 Pages（无需手动）

## 验证

```bash
python3 -m http.server 8000 -d docs   # 本地预览
curl http://localhost:8000/            # 检查首页
```
