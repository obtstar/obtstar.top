const http = require('http');
const fs = require('fs');
const path = require('path');
const { handleAPIRequest } = require('./api');

// 服务器根目录（部署产物均在 docs/ 下，GitHub Pages 也发布该目录）
const ROOT_DIR = path.join(__dirname, 'docs');

const server = http.createServer((req, res) => {
  // 解析URL，移除查询参数
  let pathname = req.url.split('?')[0];

  // API 路由处理
  if (pathname.startsWith('/api/')) {
    return handleAPIRequest(req, res);
  }

  // 静态文件处理 - 使用绝对路径
  let filePath = path.join(ROOT_DIR, pathname === '/' ? 'index.html' : pathname);

  // 路径穿越防护：解析后的路径必须仍位于 ROOT_DIR 内
  if (!path.resolve(filePath).startsWith(path.resolve(ROOT_DIR) + path.sep)) {
    res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>403 Forbidden</h1>', 'utf-8');
    return;
  }

  // 获取文件扩展名
  const extname = String(path.extname(filePath)).toLowerCase();

  // MIME类型映射
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // 读取文件
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // 文件不存在 - 返回 404 页面
        const notFoundPage = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - 页面未找到 · ObtStar</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
      background: linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 50%, #EDE9FE 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .error-container {
      text-align: center;
      max-width: 480px;
    }
    .error-code {
      font-size: 8rem;
      font-weight: 800;
      background: linear-gradient(135deg, #4F46E5, #7C3AED);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
      margin-bottom: 1rem;
    }
    .error-title {
      font-size: 1.75rem;
      color: #1E293B;
      margin-bottom: 0.75rem;
    }
    .error-desc {
      color: #64748B;
      margin-bottom: 2rem;
      line-height: 1.6;
    }
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      background: linear-gradient(135deg, #4F46E5, #7C3AED);
      color: white;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .back-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(79, 70, 229, 0.3);
    }
  </style>
</head>
<body>
  <div class="error-container">
    <div class="error-code">404</div>
    <h1 class="error-title">页面未找到</h1>
    <p class="error-desc">抱歉，您访问的页面不存在或已被移除。<br>请检查网址是否正确，或返回首页继续浏览。</p>
    <a href="/" class="back-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12l9-9 9 9M12 3v18"/>
      </svg>
      返回首页
    </a>
  </div>
</body>
</html>`;
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(notFoundPage, 'utf-8');
      } else {
        // 服务器错误
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>500 Internal Server Error</h1><p>' + error.code + '</p>', 'utf-8');
      }
    } else {
      // 成功响应
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║           ObtStar Server 启动成功                      ║');
  console.log('╠════════════════════════════════════════════════════════╣');
  console.log('║  静态页面: http://localhost:' + PORT + '/                    ║');
  console.log('║  API 文档: http://localhost:' + PORT + '/api/reports         ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('按 Ctrl+C 停止服务器');
});
