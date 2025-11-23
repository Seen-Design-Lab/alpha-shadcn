<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alpha Shadcn - Documentation</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <style>
        :root {
            --bg-color: #ffffff;
            --text-primary: #111111;
            --text-secondary: #666666;
            --text-tertiary: #888888;
            --accent-color: #000000;
            --border-color: #eeeeee;
            --hover-bg: #f5f5f5;
            --sidebar-width: 280px;
            --header-height: 64px;
            --font-family: 'Inter', sans-serif;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-primary);
            line-height: 1.6;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        /* Header */
        header {
            height: var(--header-height);
            border-bottom: 1px solid var(--border-color);
            position: fixed;
            top: 0;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            z-index: 50;
            display: flex;
            align-items: center;
            padding: 0 24px;
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
        }

        .logo {
            font-weight: 600;
            font-size: 1rem;
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-primary);
            text-decoration: none;
        }

        .search-bar {
            background: var(--hover-bg);
            border: 1px solid transparent;
            padding: 8px 12px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            gap: 8px;
            width: 300px;
            color: var(--text-secondary);
            font-size: 0.875rem;
            transition: all 0.2s;
        }

        .search-bar:focus-within {
            border-color: var(--border-color);
            background: white;
        }

        .search-bar input {
            border: none;
            background: transparent;
            outline: none;
            width: 100%;
            font-family: inherit;
        }

        /* Layout */
        .main-wrapper {
            display: flex;
            margin-top: var(--header-height);
            max-width: 1400px;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
            flex: 1;
        }

        /* Sidebar */
        aside {
            width: var(--sidebar-width);
            height: calc(100vh - var(--header-height));
            position: sticky;
            top: var(--header-height);
            overflow-y: auto;
            border-right: 1px solid var(--border-color);
            padding: 32px 24px;
            display: flex;
            flex-direction: column;
            gap: 32px;
        }

        .nav-group h4 {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-primary);
            margin-bottom: 12px;
            font-weight: 600;
        }

        .nav-group ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .nav-group a {
            display: block;
            padding: 6px 12px;
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.875rem;
            border-radius: 6px;
            transition: all 0.2s;
            margin-left: -12px;
        }

        .nav-group a:hover {
            background-color: var(--hover-bg);
            color: var(--text-primary);
        }

        .nav-group a.active {
            background-color: #f0f0f0;
            color: var(--text-primary);
            font-weight: 500;
        }

        /* Main Content */
        main {
            flex: 1;
            padding: 48px 64px;
            max-width: 900px;
        }

        .breadcrumb {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-tertiary);
            font-size: 0.875rem;
            margin-bottom: 24px;
        }

        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 16px;
            letter-spacing: -0.02em;
        }

        .lead {
            font-size: 1.125rem;
            color: var(--text-secondary);
            margin-bottom: 48px;
        }

        h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 48px;
            margin-bottom: 24px;
            padding-bottom: 12px;
            border-bottom: 1px solid var(--border-color);
        }

        h3 {
            font-size: 1.125rem;
            font-weight: 600;
            margin-top: 32px;
            margin-bottom: 16px;
        }

        p {
            margin-bottom: 24px;
            color: var(--text-secondary);
        }

        code {
            background-color: var(--hover-bg);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
            font-size: 0.875rem;
            color: var(--text-primary);
        }

        pre {
            background-color: #111;
            color: #fff;
            padding: 24px;
            border-radius: 8px;
            overflow-x: auto;
            margin-bottom: 24px;
        }

        pre code {
            background-color: transparent;
            padding: 0;
            color: inherit;
        }

        .callout {
            background-color: var(--hover-bg);
            border-left: 4px solid var(--text-primary);
            padding: 24px;
            border-radius: 0 8px 8px 0;
            margin-bottom: 24px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
            aside {
                display: none; /* Hidden for simplicity in this demo, normally would be a drawer */
            }
            
            main {
                padding: 32px 24px;
            }
        }
    </style>
</head>
<body>

    <header>
        <div class="header-content">
            <a href="/" class="logo">
                <i class="ph ph-cube"></i>
                Alpha Shadcn Docs
            </a>
            <div class="search-bar">
                <i class="ph ph-magnifying-glass"></i>
                <input type="text" placeholder="Search documentation...">
                <span style="font-size: 10px; border: 1px solid #ddd; padding: 2px 4px; border-radius: 4px;">⌘K</span>
            </div>
        </div>
    </header>

    <div class="main-wrapper">
        <aside>
            <div class="nav-group">
                <h4>Getting Started</h4>
                <ul>
                    <li><a href="#" class="active">Introduction</a></li>
                    <li><a href="#">Installation</a></li>
                    <li><a href="#">Project Structure</a></li>
                </ul>
            </div>
            <div class="nav-group">
                <h4>Core Concepts</h4>
                <ul>
                    <li><a href="#">Design Tokens</a></li>
                    <li><a href="#">Variables</a></li>
                    <li><a href="#">Theming</a></li>
                </ul>
            </div>
            <div class="nav-group">
                <h4>Components</h4>
                <ul>
                    <li><a href="#">Accordion</a></li>
                    <li><a href="#">Button</a></li>
                    <li><a href="#">Card</a></li>
                    <li><a href="#">Dialog</a></li>
                </ul>
            </div>
        </aside>

        <main>
            <div class="breadcrumb">
                <span>Docs</span>
                <i class="ph ph-caret-right"></i>
                <span>Getting Started</span>
                <i class="ph ph-caret-right"></i>
                <span>Introduction</span>
            </div>

            <h1>Introduction</h1>
            <p class="lead">Welcome to the Alpha Shadcn documentation. Learn how to generate a complete design system in Figma instantly.</p>

            <div class="callout">
                <p style="margin-bottom: 0;"><strong>Note:</strong> This plugin is designed to work seamlessly with the shadcn/ui codebase structure.</p>
            </div>

            <h2>What is Alpha Shadcn?</h2>
            <p>Alpha Shadcn is a Figma plugin that automates the creation of your design system. Instead of manually creating variables, styles, and components, you can generate them all with a single click.</p>

            <h2>Key Features</h2>
            <ul>
                <li><strong>Automated Variables:</strong> Full primitive and semantic variable collections.</li>
                <li><strong>Component Generation:</strong> Production-ready components that match code.</li>
                <li><strong>Smart Layouts:</strong> Auto-layout everywhere.</li>
            </ul>

            <h2>Quick Start</h2>
            <p>To get started, simply install the plugin from the Figma Community.</p>
            
            <pre><code>// Example configuration
{
  "theme": "zinc",
  "radius": 0.5,
  "mode": "light"
}</code></pre>

            <h2>Next Steps</h2>
            <p>Check out the <a href="#">Installation</a> guide to set up your first project.</p>
        </main>
    </div>

</body>
</html>
