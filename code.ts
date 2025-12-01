// Default Shadcn UI tokens (latest OKLCH format + Typography + Spacing)
const DEFAULT_SHADCN_CSS = `
:root {
  --radius: 0.625rem;
  --background: 1 0 0;
  --foreground: 0.145 0 0;
  --card: 1 0 0;
  --card-foreground: 0.145 0 0;
  --popover: 1 0 0;
  --popover-foreground: 0.145 0 0;
  --primary: 0.205 0 0;
  --primary-foreground: 0.985 0 0;
  --secondary: 0.97 0 0;
  --secondary-foreground: 0.205 0 0;
  --muted: 0.97 0 0;
  --muted-foreground: 0.556 0 0;
  --accent: 0.97 0 0;
  --accent-foreground: 0.205 0 0;
  --destructive: 0.577 0.245 27.325;
  --destructive-foreground: 0.985 0 0;
  --border: 0.922 0 0;
  --input: 0.922 0 0;
  --ring: 0.708 0 0;
  --chart-1: 0.646 0.222 41.116;
  --chart-2: 0.6 0.118 184.704;
  --chart-3: 0.398 0.07 227.392;
  --chart-4: 0.828 0.189 84.429;
  --chart-5: 0.769 0.188 70.08;
  --sidebar: 0.985 0 0;
  --sidebar-foreground: 0.145 0 0;
  --sidebar-primary: 0.205 0 0;
  --sidebar-primary-foreground: 0.985 0 0;
  --sidebar-accent: 0.97 0 0;
  --sidebar-accent-foreground: 0.205 0 0;
  --sidebar-border: 0.922 0 0;
  --sidebar-ring: 0.708 0 0;
  
  --spacing-0: 0px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-20: 80px;
  --spacing-24: 96px;
  
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;
  --font-size-4xl: 36px;
  --font-size-5xl: 48px;
  
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}

.dark {
  --background: 0.145 0 0;
  --foreground: 0.985 0 0;
  --card: 0.205 0 0;
  --card-foreground: 0.985 0 0;
  --popover: 0.269 0 0;
  --popover-foreground: 0.985 0 0;
  --primary: 0.922 0 0;
  --primary-foreground: 0.205 0 0;
  --secondary: 0.269 0 0;
  --secondary-foreground: 0.985 0 0;
  --muted: 0.269 0 0;
  --muted-foreground: 0.708 0 0;
  --accent: 0.371 0 0;
  --accent-foreground: 0.985 0 0;
  --destructive: 0.704 0.191 22.216;
  --destructive-foreground: 0.985 0 0;
  --border: 1 0 0 / 10%;
  --input: 1 0 0 / 15%;
  --ring: 0.556 0 0;
  --chart-1: 0.488 0.243 264.376;
  --chart-2: 0.696 0.17 162.48;
  --chart-3: 0.769 0.188 70.08;
  --chart-4: 0.627 0.265 303.9;
  --chart-5: 0.645 0.246 16.439;
  --sidebar: 0.205 0 0;
  --sidebar-foreground: 0.985 0 0;
  --sidebar-primary: 0.488 0.243 264.376;
  --sidebar-primary-foreground: 0.985 0 0;
  --sidebar-accent: 0.269 0 0;
  --sidebar-accent-foreground: 0.985 0 0;
  --sidebar-border: 1 0 0 / 10%;
  --sidebar-ring: 0.439 0 0;
}
`;

// Helper to convert OKLCH to RGB
function oklchToRgb(l: number, c: number, h: number): { r: number, g: number, b: number } {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  const r_linear = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const g_linear = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const b_linear = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

  const toSrgb = (c: number) => {
    const abs = Math.abs(c);
    if (abs <= 0.0031308) return c * 12.92;
    return (Math.sign(c) || 1) * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
  };

  return {
    r: Math.max(0, Math.min(1, toSrgb(r_linear))),
    g: Math.max(0, Math.min(1, toSrgb(g_linear))),
    b: Math.max(0, Math.min(1, toSrgb(b_linear)))
  };
}

function parseOklch(value: string): { r: number, g: number, b: number, a?: number } | null {
  const parts = value.match(/([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+)%?)?/);

  if (parts && parts.length >= 4) {
    const l = parseFloat(parts[1]);
    const c = parseFloat(parts[2]);
    const h = parseFloat(parts[3]);
    const alpha = parts[4] ? parseFloat(parts[4]) / 100 : undefined;

    const rgb = oklchToRgb(l, c, h);
    return alpha !== undefined ? { ...rgb, a: alpha } : rgb;
  }
  return null;
}

function hslToRgb(h: number, s: number, l: number): { r: number, g: number, b: number } {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: f(0), g: f(8), b: f(4) };
}

function parseHsl(value: string): { r: number, g: number, b: number } | null {
  value = value.replace(/deg/g, '');
  const parts = value.match(/([\d.]+)\s*(?:%|,\s*)\s*([\d.]+)\s*(?:%|,\s*)\s*([\d.]+)\s*%?/);

  if (parts && parts.length === 4) {
    const h = parseFloat(parts[1]);
    const s = parseFloat(parts[2]);
    const l = parseFloat(parts[3]);
    return hslToRgb(h, s, l);
  }
  return null;
}

function parseNumber(value: string): number | null {
  if (/^[\d.]+$/.test(value)) return parseFloat(value);
  if (value.endsWith('rem')) return parseFloat(value) * 16;
  if (value.endsWith('px')) return parseFloat(value);
  return null;
}

interface Token {
  name: string;
  value: string;
  type: 'COLOR' | 'FLOAT' | 'STRING';
  parsedValue: any;
}

function parseBlock(css: string, blockName: string): Record<string, Token> {
  const tokens: Record<string, Token> = {};
  const blockRegex = new RegExp(`${blockName}\\s*{([^}]*)}`, 's');
  const match = css.match(blockRegex);

  if (!match) return tokens;

  const content = match[1];
  const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let varMatch;

  while ((varMatch = varRegex.exec(content)) !== null) {
    const name = varMatch[1];
    let value = varMatch[2].trim();

    if (value.startsWith('oklch(') && value.endsWith(')')) {
      value = value.slice(6, -1);
    }

    const oklch = parseOklch(value);
    if (oklch) {
      tokens[name] = { name, value, type: 'COLOR', parsedValue: oklch };
      continue;
    }

    const rgb = parseHsl(value);
    if (rgb) {
      tokens[name] = { name, value, type: 'COLOR', parsedValue: rgb };
      continue;
    }

    const num = parseNumber(value);
    if (num !== null) {
      tokens[name] = { name, value, type: 'FLOAT', parsedValue: num };
      continue;
    }

    tokens[name] = { name, value, type: 'STRING', parsedValue: value };
  }

  return tokens;
}

// Categorize tokens by type
function categorizeTokens(tokens: Record<string, Token>) {
  const colors: Record<string, Token> = {};
  const numbers: Record<string, Token> = {};
  const strings: Record<string, Token> = {};

  for (const name in tokens) {
    const token = tokens[name];
    if (token.type === 'COLOR') {
      colors[name] = token;
    } else if (token.type === 'FLOAT') {
      numbers[name] = token;
    } else {
      strings[name] = token;
    }
  }

  return { colors, numbers, strings };
}

// Create text styles
async function createTextStyles() {
  const textStyles = [
    { name: 'Heading 1', fontSize: 48, fontWeight: 'Bold', lineHeight: 1.25 },
    { name: 'Heading 2', fontSize: 36, fontWeight: 'Bold', lineHeight: 1.25 },
    { name: 'Heading 3', fontSize: 30, fontWeight: 'SemiBold', lineHeight: 1.25 },
    { name: 'Heading 4', fontSize: 24, fontWeight: 'SemiBold', lineHeight: 1.5 },
    { name: 'Heading 5', fontSize: 20, fontWeight: 'SemiBold', lineHeight: 1.5 },
    { name: 'Heading 6', fontSize: 18, fontWeight: 'SemiBold', lineHeight: 1.5 },
    { name: 'Body Large', fontSize: 18, fontWeight: 'Regular', lineHeight: 1.75 },
    { name: 'Body', fontSize: 16, fontWeight: 'Regular', lineHeight: 1.5 },
    { name: 'Body Small', fontSize: 14, fontWeight: 'Regular', lineHeight: 1.5 },
    { name: 'Caption', fontSize: 12, fontWeight: 'Regular', lineHeight: 1.5 },
    { name: 'Label', fontSize: 14, fontWeight: 'Medium', lineHeight: 1.5 },
  ];

  const existingStyles = await figma.getLocalTextStylesAsync();

  // Load all required fonts first
  const fontsToLoad = [
    { family: 'Inter', style: 'Bold' },
    { family: 'Inter', style: 'SemiBold' },
    { family: 'Inter', style: 'Regular' },
    { family: 'Inter', style: 'Medium' },
  ];

  for (const font of fontsToLoad) {
    try {
      await figma.loadFontAsync(font);
    } catch (e) {
      console.warn(`Could not load font ${font.family} ${font.style}, will use default`);
    }
  }

  for (const style of textStyles) {
    let textStyle = existingStyles.find(s => s.name === `shadcn/${style.name}`);

    if (!textStyle) {
      textStyle = figma.createTextStyle();
      textStyle.name = `shadcn/${style.name}`;
    }

    try {
      textStyle.fontName = { family: 'Inter', style: style.fontWeight };
      textStyle.fontSize = style.fontSize;
      textStyle.lineHeight = { value: style.lineHeight * 100, unit: 'PERCENT' };
    } catch (e) {
      console.warn(`Could not set font for ${style.name}:`, e);
    }
  }
}

// Create effect styles
async function createEffectStyles() {
  const shadowStyles = [
    { name: 'Shadow SM', offset: { x: 0, y: 1 }, radius: 2, spread: 0, opacity: 0.05 },
    { name: 'Shadow', offset: { x: 0, y: 1 }, radius: 3, spread: 0, opacity: 0.1 },
    { name: 'Shadow MD', offset: { x: 0, y: 4 }, radius: 6, spread: -1, opacity: 0.1 },
    { name: 'Shadow LG', offset: { x: 0, y: 10 }, radius: 15, spread: -3, opacity: 0.1 },
    { name: 'Shadow XL', offset: { x: 0, y: 20 }, radius: 25, spread: -5, opacity: 0.1 },
  ];

  const existingStyles = await figma.getLocalEffectStylesAsync();

  // Create shadow styles
  for (const style of shadowStyles) {
    let effectStyle = existingStyles.find(s => s.name === `shadcn/${style.name}`);

    if (!effectStyle) {
      effectStyle = figma.createEffectStyle();
      effectStyle.name = `shadcn/${style.name}`;
    }

    effectStyle.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: style.opacity },
      offset: style.offset,
      radius: style.radius,
      spread: style.spread,
      visible: true,
      blendMode: 'NORMAL'
    }];
  }

  // Create Grid Styles
  const existingGridStyles = await figma.getLocalGridStylesAsync();

  const gridStyles = [
    // --- Mobile Grids (320-767px) ---
    {
      name: 'shadcn/Grid/Mobile/4-Col',
      grids: [
        {
          pattern: 'COLUMNS' as const,
          sectionSize: 72,
          count: 4,
          gutterSize: 16,
          alignment: 'CENTER' as const,
          color: { r: 1, g: 0, b: 0, a: 0.1 },
          visible: true
        },
        {
          pattern: 'GRID' as const,
          sectionSize: 8,
          color: { r: 0, g: 0, b: 1, a: 0.05 },
          visible: true
        }
      ]
    },
    {
      name: 'shadcn/Grid/Mobile/6-Col',
      grids: [
        {
          pattern: 'COLUMNS' as const,
          sectionSize: 48,
          count: 6,
          gutterSize: 16,
          alignment: 'CENTER' as const,
          color: { r: 1, g: 0, b: 0, a: 0.1 },
          visible: true
        },
        {
          pattern: 'GRID' as const,
          sectionSize: 8,
          color: { r: 0, g: 0, b: 1, a: 0.05 },
          visible: true
        }
      ]
    },

    // --- Tablet Grids (768-1023px) ---
    {
      name: 'shadcn/Grid/Tablet/8-Col',
      grids: [
        {
          pattern: 'COLUMNS' as const,
          sectionSize: 60,
          count: 8,
          gutterSize: 20,
          alignment: 'CENTER' as const,
          color: { r: 1, g: 0, b: 0, a: 0.1 },
          visible: true
        },
        {
          pattern: 'GRID' as const,
          sectionSize: 8,
          color: { r: 0, g: 0, b: 1, a: 0.05 },
          visible: true
        }
      ]
    },
    {
      name: 'shadcn/Grid/Tablet/10-Col',
      grids: [
        {
          pattern: 'COLUMNS' as const,
          sectionSize: 56,
          count: 10,
          gutterSize: 24,
          alignment: 'CENTER' as const,
          color: { r: 1, g: 0, b: 0, a: 0.1 },
          visible: true
        },
        {
          pattern: 'GRID' as const,
          sectionSize: 8,
          color: { r: 0, g: 0, b: 1, a: 0.05 },
          visible: true
        }
      ]
    },

    // --- Desktop Grids (1024-1439px) ---
    {
      name: 'shadcn/Grid/Desktop/10-Col',
      grids: [
        {
          pattern: 'COLUMNS' as const,
          sectionSize: 96,
          count: 10,
          gutterSize: 24,
          alignment: 'CENTER' as const,
          color: { r: 1, g: 0, b: 0, a: 0.1 },
          visible: true
        },
        {
          pattern: 'GRID' as const,
          sectionSize: 8,
          color: { r: 0, g: 0, b: 1, a: 0.05 },
          visible: true
        }
      ]
    },
    {
      name: 'shadcn/Grid/Desktop/12-Col',
      grids: [
        {
          pattern: 'COLUMNS' as const,
          sectionSize: 80,
          count: 12,
          gutterSize: 24,
          alignment: 'CENTER' as const,
          color: { r: 1, g: 0, b: 0, a: 0.1 },
          visible: true
        },
        {
          pattern: 'GRID' as const,
          sectionSize: 8,
          color: { r: 0, g: 0, b: 1, a: 0.05 },
          visible: true
        }
      ]
    },

    // --- Large Desktop Grids (1440px+) ---
    {
      name: 'shadcn/Grid/Large Desktop/12-Col',
      grids: [
        {
          pattern: 'COLUMNS' as const,
          sectionSize: 96,
          count: 12,
          gutterSize: 32,
          alignment: 'CENTER' as const,
          color: { r: 1, g: 0, b: 0, a: 0.1 },
          visible: true
        },
        {
          pattern: 'GRID' as const,
          sectionSize: 8,
          color: { r: 0, g: 0, b: 1, a: 0.05 },
          visible: true
        }
      ]
    },
    {
      name: 'shadcn/Grid/Large Desktop/16-Col',
      grids: [
        {
          pattern: 'COLUMNS' as const,
          sectionSize: 72,
          count: 16,
          gutterSize: 32,
          alignment: 'CENTER' as const,
          color: { r: 1, g: 0, b: 0, a: 0.1 },
          visible: true
        },
        {
          pattern: 'GRID' as const,
          sectionSize: 8,
          color: { r: 0, g: 0, b: 1, a: 0.05 },
          visible: true
        }
      ]
    }
  ];

  for (const gridStyleDef of gridStyles) {
    let gridStyle = existingGridStyles.find(s => s.name === gridStyleDef.name);

    if (!gridStyle) {
      gridStyle = figma.createGridStyle();
      gridStyle.name = gridStyleDef.name;
    }

    gridStyle.layoutGrids = gridStyleDef.grids;
  }
}

// Helper function to apply grid layout to a frame
function applyGridLayout(frame: FrameNode, gridType: 'mobile' | 'desktop') {
  if (gridType === 'mobile') {
    frame.layoutGrids = [
      {
        pattern: 'COLUMNS',
        sectionSize: 16,
        count: 4,
        gutterSize: 16,
        alignment: 'CENTER',
        color: { r: 1, g: 0, b: 0, a: 0.1 },
        visible: true
      },
      {
        pattern: 'GRID',
        sectionSize: 8,
        color: { r: 0, g: 0, b: 1, a: 0.05 },
        visible: true
      }
    ];
  } else if (gridType === 'desktop') {
    frame.layoutGrids = [
      {
        pattern: 'COLUMNS',
        sectionSize: 64,
        count: 12,
        gutterSize: 24,
        alignment: 'CENTER',
        color: { r: 1, g: 0, b: 0, a: 0.1 },
        visible: true
      },
      {
        pattern: 'GRID',
        sectionSize: 8,
        color: { r: 0, g: 0, b: 1, a: 0.05 },
        visible: true
      }
    ];
  }
}

// Create reusable grid template frames (acts as grid "styles" library)
async function createGridExamples(page: PageNode) {
  // Note: Figma API doesn't support creating grid styles directly.
  // These template frames serve as a reusable grid system library.

  const gridTemplates = [
    // Mobile devices
    { name: 'Mobile / iPhone SE', width: 375, height: 667, type: 'mobile' as const },
    { name: 'Mobile / iPhone 12/13', width: 390, height: 844, type: 'mobile' as const },
    { name: 'Mobile / iPhone 14 Pro', width: 393, height: 852, type: 'mobile' as const },
    { name: 'Mobile / Android', width: 360, height: 800, type: 'mobile' as const },

    // Tablets
    { name: 'Tablet / iPad Mini', width: 768, height: 1024, type: 'mobile' as const },
    { name: 'Tablet / iPad Pro 11"', width: 834, height: 1194, type: 'desktop' as const },

    // Desktop
    { name: 'Desktop / Laptop', width: 1440, height: 900, type: 'desktop' as const },
    { name: 'Desktop / Large', width: 1920, height: 1080, type: 'desktop' as const },
    { name: 'Desktop / XL', width: 2560, height: 1440, type: 'desktop' as const },
  ];

  let yOffset = 50;
  const xSpacing = 50;

  for (const template of gridTemplates) {
    const frame = figma.createFrame();
    frame.name = template.name;
    frame.resize(template.width, template.height);
    frame.x = 50;
    frame.y = yOffset;

    // Light gray background to show grid clearly
    frame.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];

    // Apply appropriate grid
    applyGridLayout(frame, template.type);

    // Add description text
    const description = figma.createText();
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    description.characters = `${template.width}×${template.height} • ${template.type === 'mobile' ? '4 cols, 16px gutter' : '12 cols, 24px gutter'} • 8px baseline`;
    description.fontSize = 12;
    description.fontName = { family: 'Inter', style: 'Regular' };
    description.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
    description.x = 50;
    description.y = yOffset - 20;
    page.appendChild(description);

    page.appendChild(frame);

    // Stack vertically with spacing
    yOffset += template.height + 100;
  }

  // Add usage instructions
  const instructions = figma.createText();
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  instructions.characters = `📐 Grid System Templates\n\nDuplicate these frames to use as artboards with pre-configured grids.\nRed columns show content areas, blue grid shows 8px baseline.`;
  instructions.fontSize = 14;
  instructions.fontName = { family: 'Inter', style: 'Medium' };
  instructions.fills = [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2 } }];
  instructions.x = 50;
  instructions.y = 10;
  instructions.resize(600, 60);
  page.appendChild(instructions);
}

// Component Generation System
async function generateComponent(
  componentName: string,
  page: PageNode,
  findVariable: (name: string) => Variable | undefined,
  colorCollection: VariableCollection
) {
  const lightModeId = colorCollection.modes.find(m => m.name === 'Light')?.modeId || colorCollection.modes[0].modeId;
  const darkModeId = colorCollection.modes.find(m => m.name === 'Dark')?.modeId;

  // Helper to load fonts safely
  const loadFontSafely = async (font: FontName) => {
    try {
      await figma.loadFontAsync(font);
      return font;
    } catch (e) {
      console.warn(`Could not load font ${font.family} ${font.style}, falling back to Inter Regular`);
      const fallback = { family: 'Inter', style: 'Regular' };
      await figma.loadFontAsync(fallback);
      return fallback;
    }
  };

  // Load fonts with fallbacks
  await loadFontSafely({ family: 'Inter', style: 'Medium' });
  await loadFontSafely({ family: 'Inter', style: 'Regular' });
  const semiBoldFont = await loadFontSafely({ family: 'Inter', style: 'SemiBold' });
  const boldFont = await loadFontSafely({ family: 'Inter', style: 'Bold' });

  let xOffset = 0;

  if (componentName === 'button') {
    // Shadcn button specifications based on Tailwind classes
    // h-9 = 36px, h-10 = 40px, h-11 = 44px
    // px-3 = 12px, px-4 = 16px, px-8 = 32px
    // text-sm = 14px, text-base = 16px

    const sizes = [
      { name: 'sm', height: 36, paddingX: 12, fontSize: 14, text: 'Small' },
      { name: 'default', height: 40, paddingX: 16, fontSize: 14, text: 'Button' },
      { name: 'lg', height: 44, paddingX: 32, fontSize: 16, text: 'Large' },
    ];

    const variants = [
      { name: 'default', bg: 'primary', fg: 'primary-foreground', border: null },
      { name: 'destructive', bg: 'destructive', fg: 'destructive-foreground', border: null },
      { name: 'outline', bg: null, fg: 'foreground', border: 'input' },
      { name: 'secondary', bg: 'secondary', fg: 'secondary-foreground', border: null },
      { name: 'ghost', bg: null, fg: 'foreground', border: null },
      { name: 'link', bg: null, fg: 'primary', border: null, underline: true },
    ];

    // Create component set frames for each size
    let yOffset = 50;

    for (const size of sizes) {
      const componentSetFrame = figma.createFrame();
      componentSetFrame.name = `Button/${size.name}`;
      componentSetFrame.layoutMode = 'HORIZONTAL';
      componentSetFrame.itemSpacing = 16;
      componentSetFrame.x = 50;
      componentSetFrame.y = yOffset;
      componentSetFrame.fills = [];

      const componentsInSet: ComponentNode[] = [];

      for (const variant of variants) {
        const frame = figma.createFrame();
        frame.name = `variant=${variant.name}`;
        frame.layoutMode = 'HORIZONTAL';
        frame.primaryAxisAlignItems = 'CENTER';
        frame.counterAxisAlignItems = 'CENTER';
        frame.primaryAxisSizingMode = 'AUTO';
        frame.counterAxisSizingMode = 'FIXED';
        frame.paddingLeft = size.paddingX;
        frame.paddingRight = size.paddingX;
        frame.paddingTop = 0;
        frame.paddingBottom = 0;
        frame.itemSpacing = 8;
        frame.cornerRadius = 6;
        frame.resize(100, size.height);

        // Background
        if (variant.bg) {
          const bgVar = findVariable(variant.bg);
          if (bgVar) {
            frame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
          }
        } else {
          frame.fills = [];
        }

        // Border
        if (variant.border) {
          const borderVar = findVariable(variant.border);
          if (borderVar) {
            frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
            frame.strokeWeight = 1;
          }
        }

        // Text
        const text = figma.createText();
        text.characters = size.text;
        text.fontSize = size.fontSize;
        text.fontName = { family: 'Inter', style: 'Medium' };
        text.textAlignHorizontal = 'CENTER';
        text.textAlignVertical = 'CENTER';

        // Underline for link variant
        if (variant.underline) {
          text.textDecoration = 'UNDERLINE';
        }

        const fgVar = findVariable(variant.fg);
        if (fgVar) {
          text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
        }

        frame.appendChild(text);
        componentSetFrame.appendChild(frame);
      }

      page.appendChild(componentSetFrame);

      // Convert each frame to a component first
      const components: ComponentNode[] = [];
      for (const child of componentSetFrame.children) {
        const component = figma.createComponentFromNode(child as FrameNode);
        components.push(component);
      }

      // Convert to component set
      const componentSet = figma.combineAsVariants(components, componentSetFrame);
      componentSet.name = `Button/${size.name}`;
      componentSet.x = 50;
      componentSet.y = yOffset;

      yOffset += 100;
    }
  }

  else if (componentName === 'input') {
    const frame = figma.createFrame();
    frame.name = 'Input';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.paddingLeft = 12;
    frame.paddingRight = 12;
    frame.paddingTop = 8;
    frame.paddingBottom = 8;
    frame.cornerRadius = 6;
    frame.x = 50;
    frame.y = 50;
    frame.resize(280, 40);

    // Background
    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    // Border
    const borderVar = findVariable('input');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    // Placeholder text
    const text = figma.createText();
    text.characters = 'Email';
    text.fontSize = 14;
    text.fontName = { family: 'Inter', style: 'Regular' };

    const mutedVar = findVariable('muted-foreground');
    if (mutedVar) {
      text.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    frame.appendChild(text);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'card') {
    const frame = figma.createFrame();
    frame.name = 'Card';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'AUTO';
    frame.paddingLeft = 24;
    frame.paddingRight = 24;
    frame.paddingTop = 24;
    frame.paddingBottom = 24;
    frame.itemSpacing = 16;
    frame.cornerRadius = 8;
    frame.x = 50;
    frame.y = 50;

    // Background
    const cardVar = findVariable('card');
    if (cardVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: cardVar.id } } }];
    }

    // Border
    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    // Title
    const title = figma.createText();
    title.characters = 'Card Title';
    title.fontSize = 20;
    title.fontName = { family: 'Inter', style: 'Medium' };

    const fgVar = findVariable('card-foreground');
    if (fgVar) {
      title.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    // Description
    const desc = figma.createText();
    desc.characters = 'Card description goes here';
    desc.fontSize = 14;
    desc.fontName = { family: 'Inter', style: 'Regular' };

    const mutedVar = findVariable('muted-foreground');
    if (mutedVar) {
      desc.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    frame.appendChild(title);
    frame.appendChild(desc);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'badge') {
    const variants = [
      { name: 'default', bg: 'primary', fg: 'primary-foreground', border: null },
      { name: 'secondary', bg: 'secondary', fg: 'secondary-foreground', border: null },
      { name: 'destructive', bg: 'destructive', fg: 'destructive-foreground', border: null },
      { name: 'outline', bg: null, fg: 'foreground', border: 'border' },
    ];

    const componentSetFrame = figma.createFrame();
    componentSetFrame.name = 'Badge';
    componentSetFrame.layoutMode = 'HORIZONTAL';
    componentSetFrame.itemSpacing = 16;
    componentSetFrame.x = 50;
    componentSetFrame.y = 50;
    componentSetFrame.fills = [];

    for (const variant of variants) {
      const frame = figma.createFrame();
      frame.name = `variant=${variant.name}`;
      frame.layoutMode = 'HORIZONTAL';
      frame.primaryAxisAlignItems = 'CENTER';
      frame.counterAxisAlignItems = 'CENTER';
      frame.primaryAxisSizingMode = 'AUTO';
      frame.counterAxisSizingMode = 'AUTO';
      frame.paddingLeft = 10;
      frame.paddingRight = 10;
      frame.paddingTop = 2;
      frame.paddingBottom = 2;
      frame.cornerRadius = 9999;

      if (variant.bg) {
        const bgVar = findVariable(variant.bg);
        if (bgVar) {
          frame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
        }
      } else {
        frame.fills = [];
      }

      if (variant.border) {
        const borderVar = findVariable(variant.border);
        if (borderVar) {
          frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
          frame.strokeWeight = 1;
        }
      }

      const text = figma.createText();
      text.characters = 'Badge';
      text.fontSize = 12;
      text.fontName = { family: 'Inter', style: 'Medium' };

      const fgVar = findVariable(variant.fg);
      if (fgVar) {
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      frame.appendChild(text);
      componentSetFrame.appendChild(frame);
    }

    page.appendChild(componentSetFrame);

    // Convert to component set
    const components: ComponentNode[] = [];
    for (const child of componentSetFrame.children) {
      const component = figma.createComponentFromNode(child as FrameNode);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, componentSetFrame);
    componentSet.name = 'Badge';
    componentSet.x = 50;
    componentSet.y = 50;
  }

  else if (componentName === 'alert') {
    const variants = [
      { name: 'default', bg: 'background', fg: 'foreground', border: 'border' },
      { name: 'destructive', bg: 'destructive', fg: 'destructive-foreground', border: 'destructive' },
    ];

    const componentSetFrame = figma.createFrame();
    componentSetFrame.name = 'Alert';
    componentSetFrame.layoutMode = 'VERTICAL';
    componentSetFrame.itemSpacing = 16;
    componentSetFrame.x = 50;
    componentSetFrame.y = 50;
    componentSetFrame.fills = [];

    for (const variant of variants) {
      const frame = figma.createFrame();
      frame.name = `variant=${variant.name}`;
      frame.layoutMode = 'VERTICAL';
      frame.primaryAxisSizingMode = 'FIXED';
      frame.counterAxisSizingMode = 'AUTO';
      frame.paddingLeft = 16;
      frame.paddingRight = 16;
      frame.paddingTop = 16;
      frame.paddingBottom = 16;
      frame.itemSpacing = 8;
      frame.cornerRadius = 8;
      frame.resize(400, 80);

      const bgVar = findVariable(variant.bg);
      if (bgVar) {
        frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
      }

      const borderVar = findVariable(variant.border);
      if (borderVar) {
        frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
        frame.strokeWeight = 1;
      }

      const title = figma.createText();
      title.characters = 'Alert Title';
      title.fontSize = 14;
      title.fontName = { family: 'Inter', style: 'Medium' };

      const fgVar = findVariable(variant.fg);
      if (fgVar) {
        title.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      const desc = figma.createText();
      desc.characters = 'Alert description';
      desc.fontSize = 14;
      desc.fontName = { family: 'Inter', style: 'Regular' };
      if (fgVar) {
        desc.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      frame.appendChild(title);
      frame.appendChild(desc);
      componentSetFrame.appendChild(frame);
    }

    page.appendChild(componentSetFrame);

    // Convert to component set
    const components: ComponentNode[] = [];
    for (const child of componentSetFrame.children) {
      const component = figma.createComponentFromNode(child as FrameNode);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, componentSetFrame);
    componentSet.name = 'Alert';
    componentSet.x = 50;
    componentSet.y = 50;
  }

  else if (componentName === 'accordion') {
    const variants = [
      { name: 'closed-default', open: false, hover: false },
      { name: 'closed-hover', open: false, hover: true },
      { name: 'open-default', open: true, hover: false },
      { name: 'open-hover', open: true, hover: true },
    ];

    const componentSetFrame = figma.createFrame();
    componentSetFrame.name = 'Accordion';
    componentSetFrame.layoutMode = 'VERTICAL';
    componentSetFrame.itemSpacing = 20;
    componentSetFrame.x = 50;
    componentSetFrame.y = 50;
    componentSetFrame.fills = [];

    for (const variant of variants) {
      const openStr = variant.open ? 'True' : 'False';
      const hoverStr = variant.hover ? 'True' : 'False';
      const frame = figma.createFrame();
      frame.name = `Open=${openStr}, Hover=${hoverStr}`;
      frame.layoutMode = 'VERTICAL';
      frame.primaryAxisSizingMode = 'AUTO';
      frame.counterAxisSizingMode = 'FIXED';
      frame.resize(450, 100);
      frame.paddingBottom = variant.open ? 16 : 0;

      const borderVar = findVariable('border');
      if (borderVar) {
        frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
        frame.strokeWeight = 1;
      }

      const trigger = figma.createFrame();
      trigger.layoutMode = 'HORIZONTAL';
      trigger.primaryAxisAlignItems = 'SPACE_BETWEEN';
      trigger.counterAxisAlignItems = 'CENTER';
      trigger.paddingTop = 16;
      trigger.paddingBottom = 16;
      trigger.fills = [];

      const title = figma.createText();
      title.characters = 'Is it accessible?';
      title.fontSize = 16;
      title.fontName = { family: 'Inter', style: 'Medium' };
      if (variant.hover) {
        title.textDecoration = 'UNDERLINE';
      }
      const fgVar = findVariable('foreground');
      if (fgVar) {
        title.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }
      trigger.appendChild(title);

      const icon = figma.createVector();
      icon.vectorPaths = [{
        windingRule: 'NONZERO',
        data: 'M 4 6 L 8 10 L 12 6'
      }];
      icon.strokeWeight = 2;
      icon.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
      if (fgVar) {
        icon.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }
      if (variant.open) {
        icon.rotation = 180;
      }
      icon.resize(16, 16);
      trigger.appendChild(icon);
      frame.appendChild(trigger);
      trigger.layoutSizingHorizontal = 'FILL';

      if (variant.open) {
        const content = figma.createText();
        content.characters = 'Yes. It adheres to the WAI-ARIA design pattern.';
        content.fontSize = 14;
        content.fontName = { family: 'Inter', style: 'Regular' };
        if (fgVar) {
          content.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
        }
        frame.appendChild(content);
      }

      componentSetFrame.appendChild(frame);
    }

    page.appendChild(componentSetFrame);

    const components: ComponentNode[] = [];
    for (const child of componentSetFrame.children) {
      const component = figma.createComponentFromNode(child as FrameNode);
      components.push(component);
    }
    const componentSet = figma.combineAsVariants(components, componentSetFrame);
    componentSet.name = 'Accordion';
    componentSet.x = 50;
    componentSet.y = 50;
  }

  else if (componentName === 'grids') {
    // Create grid layout examples
    await createGridExamples(page);
  }

  else if (componentName === 'textarea') {
    const frame = figma.createFrame();
    frame.name = 'Textarea';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisAlignItems = 'MIN';
    frame.paddingLeft = 12;
    frame.paddingRight = 12;
    frame.paddingTop = 8;
    frame.paddingBottom = 8;
    frame.cornerRadius = 6;
    frame.x = 50;
    frame.y = 150;  // Positioned below Input
    frame.resize(280, 100);

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('input');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const text = figma.createText();
    text.characters = 'Your message...';
    text.fontSize = 14;
    text.fontName = { family: 'Inter', style: 'Regular' };

    const mutedVar = findVariable('muted-foreground');
    if (mutedVar) {
      text.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    frame.appendChild(text);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'checkbox') {
    const frame = figma.createFrame();
    frame.name = 'Checkbox';
    frame.resize(16, 16);
    frame.cornerRadius = 3;
    frame.x = 50;
    frame.y = 280;  // Positioned below Textarea

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('primary');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 2;
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'accordion') {
    const variants = [
      { name: 'closed-default', open: false, hover: false },
      { name: 'closed-hover', open: false, hover: true },
      { name: 'open-default', open: true, hover: false },
      { name: 'open-hover', open: true, hover: true },
    ];

    const componentSetFrame = figma.createFrame();
    componentSetFrame.name = 'Accordion';
    componentSetFrame.layoutMode = 'VERTICAL';
    componentSetFrame.itemSpacing = 20;
    componentSetFrame.x = 50;
    componentSetFrame.y = 50;
    componentSetFrame.fills = [];

    for (const variant of variants) {
      const openStr = variant.open ? 'True' : 'False';
      const hoverStr = variant.hover ? 'True' : 'False';
      const frame = figma.createFrame();
      frame.name = `Open=${openStr}, Hover=${hoverStr}`;
      frame.layoutMode = 'VERTICAL';
      frame.primaryAxisSizingMode = 'AUTO';
      frame.counterAxisSizingMode = 'FIXED';
      frame.resize(450, 100);
      frame.paddingBottom = variant.open ? 16 : 0;

      const borderVar = findVariable('border');
      if (borderVar) {
        frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
        frame.strokeWeight = 1;
      }

      const trigger = figma.createFrame();
      trigger.layoutMode = 'HORIZONTAL';
      trigger.primaryAxisAlignItems = 'SPACE_BETWEEN';
      trigger.counterAxisAlignItems = 'CENTER';
      trigger.paddingTop = 16;
      trigger.paddingBottom = 16;
      trigger.fills = [];

      const title = figma.createText();
      title.characters = 'Is it accessible?';
      title.fontSize = 16;
      title.fontName = { family: 'Inter', style: 'Medium' };
      if (variant.hover) {
        title.textDecoration = 'UNDERLINE';
      }
      const fgVar = findVariable('foreground');
      if (fgVar) {
        title.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }
      trigger.appendChild(title);

      const icon = figma.createVector();
      icon.vectorPaths = [{
        windingRule: 'NONZERO',
        data: 'M 4 6 L 8 10 L 12 6'
      }];
      icon.strokeWeight = 2;
      icon.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
      if (fgVar) {
        icon.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }
      if (variant.open) {
        icon.rotation = 180;
      }
      icon.resize(16, 16);
      trigger.appendChild(icon);
      frame.appendChild(trigger);
      trigger.layoutSizingHorizontal = 'FILL';

      if (variant.open) {
        const content = figma.createText();
        content.characters = 'Yes. It adheres to the WAI-ARIA design pattern.';
        content.fontSize = 14;
        content.fontName = { family: 'Inter', style: 'Regular' };
        if (fgVar) {
          content.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
        }
        frame.appendChild(content);
      }

      componentSetFrame.appendChild(frame);
    }

    page.appendChild(componentSetFrame);

    const components: ComponentNode[] = [];
    for (const child of componentSetFrame.children) {
      const component = figma.createComponentFromNode(child as FrameNode);
      components.push(component);
    }
    const componentSet = figma.combineAsVariants(components, componentSetFrame);
    componentSet.name = 'Accordion';
  }

  else if (componentName === 'tabs') {
    const frame = figma.createFrame();
    frame.name = 'Tabs';
    frame.layoutMode = 'HORIZONTAL';
    frame.itemSpacing = 8;
    frame.primaryAxisSizingMode = 'AUTO';
    frame.x = 50;
    frame.y = 50;

    const tabs = ['Account', 'Password', 'Settings'];
    for (const tabName of tabs) {


      const tab = figma.createFrame();
      tab.name = tabName;
      tab.layoutMode = 'HORIZONTAL';
      tab.primaryAxisAlignItems = 'CENTER';
      tab.counterAxisAlignItems = 'CENTER';
      tab.paddingLeft = 12;
      tab.paddingRight = 12;
      tab.paddingTop = 6;
      tab.paddingBottom = 6;
      tab.fills = [];

      const text = figma.createText();
      text.characters = tabName;
      text.fontSize = 14;
      text.fontName = { family: 'Inter', style: 'Medium' };

      const fgVar = findVariable('foreground');
      if (fgVar) {
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      tab.appendChild(text);
      frame.appendChild(tab);
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  // PHASE 1: SIMPLE COMPONENTS

  else if (componentName === 'label') {
    const frame = figma.createFrame();
    frame.name = 'Label';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'AUTO';
    frame.fills = [];
    frame.x = 50;
    frame.y = 50;

    const text = figma.createText();
    text.characters = 'Label';
    text.fontSize = 14;
    text.fontName = { family: 'Inter', style: 'Medium' };

    const fgVar = findVariable('foreground');
    if (fgVar) {
      text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    frame.appendChild(text);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'separator') {
    // Horizontal separator
    const hFrame = figma.createFrame();
    hFrame.name = 'variant=horizontal';
    hFrame.resize(200, 1);
    hFrame.x = 50;
    hFrame.y = 50;

    const borderVar = findVariable('border');
    if (borderVar) {
      hFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
    }

    // Vertical separator
    const vFrame = figma.createFrame();
    vFrame.name = 'variant=vertical';
    vFrame.resize(1, 40);
    vFrame.x = 270;
    vFrame.y = 50;

    if (borderVar) {
      vFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
    }

    const componentSetFrame = figma.createFrame();
    componentSetFrame.name = 'Separator';
    componentSetFrame.layoutMode = 'HORIZONTAL';
    componentSetFrame.itemSpacing = 16;
    componentSetFrame.x = 50;
    componentSetFrame.y = 50;
    componentSetFrame.fills = [];
    componentSetFrame.appendChild(hFrame);
    componentSetFrame.appendChild(vFrame);

    page.appendChild(componentSetFrame);

    const components: ComponentNode[] = [];
    for (const child of componentSetFrame.children) {
      const component = figma.createComponentFromNode(child as FrameNode);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, componentSetFrame);
    componentSet.name = 'Separator';
  }

  else if (componentName === 'avatar') {
    const sizes = [
      { name: 'sm', size: 32 },
      { name: 'default', size: 40 },
      { name: 'lg', size: 48 },
    ];

    let yOffset = 50;

    for (const sizeSpec of sizes) {
      const componentSetFrame = figma.createFrame();
      componentSetFrame.name = `Avatar/${sizeSpec.name}`;
      componentSetFrame.layoutMode = 'HORIZONTAL';
      componentSetFrame.itemSpacing = 16;
      componentSetFrame.x = 50;
      componentSetFrame.y = yOffset;
      componentSetFrame.fills = [];

      // Image variant
      const imageFrame = figma.createFrame();
      imageFrame.name = 'variant=image';
      imageFrame.resize(sizeSpec.size, sizeSpec.size);
      imageFrame.cornerRadius = 9999;

      const mutedVar = findVariable('muted');
      if (mutedVar) {
        imageFrame.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
      }

      // Fallback variant with initials
      const fallbackFrame = figma.createFrame();
      fallbackFrame.name = 'variant=fallback';
      fallbackFrame.resize(sizeSpec.size, sizeSpec.size);
      fallbackFrame.cornerRadius = 9999;
      fallbackFrame.layoutMode = 'HORIZONTAL';
      fallbackFrame.primaryAxisAlignItems = 'CENTER';
      fallbackFrame.counterAxisAlignItems = 'CENTER';

      if (mutedVar) {
        fallbackFrame.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
      }

      const initials = figma.createText();
      initials.characters = 'AB';
      initials.fontSize = sizeSpec.size / 2.5;
      initials.fontName = { family: 'Inter', style: 'Medium' };

      const mutedFgVar = findVariable('muted-foreground');
      if (mutedFgVar) {
        initials.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedFgVar.id } } }];
      }

      fallbackFrame.appendChild(initials);
      componentSetFrame.appendChild(imageFrame);
      componentSetFrame.appendChild(fallbackFrame);

      page.appendChild(componentSetFrame);

      const components: ComponentNode[] = [];
      for (const child of componentSetFrame.children) {
        const component = figma.createComponentFromNode(child as FrameNode);
        components.push(component);
      }

      const componentSet = figma.combineAsVariants(components, componentSetFrame);
      componentSet.name = `Avatar/${sizeSpec.name}`;
      componentSet.x = 50;
      componentSet.y = yOffset;

      yOffset += 80;
    }
  }

  else if (componentName === 'progress') {
    const variants = [
      { name: 'default', color: 'primary' },
      { name: 'destructive', color: 'destructive' },
    ];

    const componentSetFrame = figma.createFrame();
    componentSetFrame.name = 'Progress';
    componentSetFrame.layoutMode = 'VERTICAL';
    componentSetFrame.itemSpacing = 16;
    componentSetFrame.x = 50;
    componentSetFrame.y = 50;
    componentSetFrame.fills = [];

    for (const variant of variants) {
      const container = figma.createFrame();
      container.name = `variant=${variant.name}`;
      container.resize(300, 8);
      container.cornerRadius = 9999;
      container.layoutMode = 'HORIZONTAL';

      const bgVar = findVariable('secondary');
      if (bgVar) {
        container.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
      }

      const bar = figma.createFrame();
      bar.name = 'Progress Bar';
      bar.resize(180, 8);
      bar.cornerRadius = 9999;

      const colorVar = findVariable(variant.color);
      if (colorVar) {
        bar.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: colorVar.id } } }];
      }

      container.appendChild(bar);
      componentSetFrame.appendChild(container);
    }

    page.appendChild(componentSetFrame);

    const components: ComponentNode[] = [];
    for (const child of componentSetFrame.children) {
      const component = figma.createComponentFromNode(child as FrameNode);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, componentSetFrame);
    componentSet.name = 'Progress';
  }

  else if (componentName === 'skeleton') {
    const frame = figma.createFrame();
    frame.name = 'Skeleton';
    frame.resize(200, 20);
    frame.cornerRadius = 4;
    frame.x = 50;
    frame.y = 50;

    const mutedVar = findVariable('muted');
    if (mutedVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'switch') {
    const variants = [
      { name: 'off', checked: false },
      { name: 'on', checked: true },
    ];

    const componentSetFrame = figma.createFrame();
    componentSetFrame.name = 'Switch';
    componentSetFrame.layoutMode = 'HORIZONTAL';
    componentSetFrame.itemSpacing = 16;
    componentSetFrame.x = 50;
    componentSetFrame.y = 50;
    componentSetFrame.fills = [];

    for (const variant of variants) {
      const track = figma.createFrame();
      track.name = `variant=${variant.name}`;
      track.resize(44, 24);
      track.cornerRadius = 9999;
      track.layoutMode = 'HORIZONTAL';
      track.primaryAxisAlignItems = variant.checked ? 'MAX' : 'MIN';
      track.counterAxisAlignItems = 'CENTER';
      track.paddingLeft = 2;
      track.paddingRight = 2;

      const bgVar = findVariable(variant.checked ? 'primary' : 'input');
      if (bgVar) {
        track.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
      }

      const thumb = figma.createFrame();
      thumb.name = 'Thumb';
      thumb.resize(20, 20);
      thumb.cornerRadius = 9999;
      thumb.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

      track.appendChild(thumb);
      componentSetFrame.appendChild(track);
    }

    page.appendChild(componentSetFrame);

    const components: ComponentNode[] = [];
    for (const child of componentSetFrame.children) {
      const component = figma.createComponentFromNode(child as FrameNode);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, componentSetFrame);
    componentSet.name = 'Switch';
  }

  else if (componentName === 'slider') {
    const frame = figma.createFrame();
    frame.name = 'Slider';
    frame.resize(300, 20);
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.counterAxisAlignItems = 'CENTER';
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    const track = figma.createFrame();
    track.name = 'Track';
    track.resize(300, 4);
    track.cornerRadius = 9999;

    const bgVar = findVariable('secondary');
    if (bgVar) {
      track.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const thumb = figma.createFrame();
    thumb.name = 'Thumb';
    thumb.resize(20, 20);
    thumb.cornerRadius = 9999;
    thumb.x = 140;
    thumb.y = 0;

    const bgVarThumb = findVariable('background');
    if (bgVarThumb) {
      thumb.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVarThumb.id } } }];
    }

    const borderVar = findVariable('primary');
    if (borderVar) {
      thumb.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      thumb.strokeWeight = 2;
    }

    frame.appendChild(track);
    frame.appendChild(thumb);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'toggle') {
    const variants = [
      { name: 'default', pressed: false },
      { name: 'pressed', pressed: true },
    ];

    const componentSetFrame = figma.createFrame();
    componentSetFrame.name = 'Toggle';
    componentSetFrame.layoutMode = 'HORIZONTAL';
    componentSetFrame.itemSpacing = 16;
    componentSetFrame.x = 50;
    componentSetFrame.y = 50;
    componentSetFrame.fills = [];

    for (const variant of variants) {
      const frame = figma.createFrame();
      frame.name = `variant=${variant.name}`;
      frame.layoutMode = 'HORIZONTAL';
      frame.primaryAxisAlignItems = 'CENTER';
      frame.counterAxisAlignItems = 'CENTER';
      frame.primaryAxisSizingMode = 'AUTO';
      frame.paddingLeft = 12;
      frame.paddingRight = 12;
      frame.paddingTop = 8;
      frame.paddingBottom = 8;
      frame.cornerRadius = 6;
      frame.resize(80, 36);

      const bgVar = findVariable(variant.pressed ? 'accent' : 'background');
      if (bgVar) {
        frame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
      }

      const borderVar = findVariable('input');
      if (borderVar) {
        frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
        frame.strokeWeight = 1;
      }

      const text = figma.createText();
      text.characters = 'Toggle';
      text.fontSize = 14;
      text.fontName = { family: 'Inter', style: 'Medium' };

      const fgVar = findVariable('foreground');
      if (fgVar) {
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      frame.appendChild(text);
      componentSetFrame.appendChild(frame);
    }

    page.appendChild(componentSetFrame);

    const components: ComponentNode[] = [];
    for (const child of componentSetFrame.children) {
      const component = figma.createComponentFromNode(child as FrameNode);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, componentSetFrame);
    componentSet.name = 'Toggle';
  }

  else if (componentName === 'spinner') {
    const frame = figma.createFrame();
    frame.name = 'Spinner';
    frame.resize(24, 24);
    frame.cornerRadius = 9999;
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    const borderVar = findVariable('primary');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 2;
      frame.dashPattern = [12, 12];
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  // PHASE 2: FORM COMPONENTS

  else if (componentName === 'radio-group') {
    const variants = [
      { name: 'unchecked', checked: false },
      { name: 'checked', checked: true },
    ];

    const componentSetFrame = figma.createFrame();
    componentSetFrame.name = 'Radio';
    componentSetFrame.layoutMode = 'HORIZONTAL';
    componentSetFrame.itemSpacing = 16;
    componentSetFrame.x = 50;
    componentSetFrame.y = 50;
    componentSetFrame.fills = [];

    for (const variant of variants) {
      const frame = figma.createFrame();
      frame.name = `variant=${variant.name}`;
      frame.resize(20, 20);
      frame.cornerRadius = 9999;
      frame.layoutMode = 'HORIZONTAL';
      frame.primaryAxisAlignItems = 'CENTER';
      frame.counterAxisAlignItems = 'CENTER';

      const bgVar = findVariable('background');
      if (bgVar) {
        frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
      }

      const borderVar = findVariable('primary');
      if (borderVar) {
        frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
        frame.strokeWeight = 2;
      }

      if (variant.checked) {
        const dot = figma.createFrame();
        dot.name = 'Dot';
        dot.resize(10, 10);
        dot.cornerRadius = 9999;

        if (borderVar) {
          dot.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
        }

        frame.appendChild(dot);
      }

      componentSetFrame.appendChild(frame);
    }

    page.appendChild(componentSetFrame);

    const components: ComponentNode[] = [];
    for (const child of componentSetFrame.children) {
      const component = figma.createComponentFromNode(child as FrameNode);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, componentSetFrame);
    componentSet.name = 'Radio';
  }

  else if (componentName === 'select') {
    const frame = figma.createFrame();
    frame.name = 'Select';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.counterAxisAlignItems = 'CENTER';
    frame.primaryAxisSizingMode = 'FIXED';
    frame.paddingLeft = 12;
    frame.paddingRight = 12;
    frame.paddingTop = 8;
    frame.paddingBottom = 8;
    frame.itemSpacing = 8;
    frame.cornerRadius = 6;
    frame.resize(200, 40);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('input');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const text = figma.createText();
    text.characters = 'Select option...';
    text.fontSize = 14;
    text.fontName = { family: 'Inter', style: 'Regular' };
    text.layoutGrow = 1;

    const fgVar = findVariable('foreground');
    if (fgVar) {
      text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    // Chevron icon (simple triangle)
    const chevron = figma.createFrame();
    chevron.name = 'Chevron';
    chevron.resize(12, 12);
    chevron.fills = [];

    frame.appendChild(text);
    frame.appendChild(chevron);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  // PHASE 3: NAVIGATION & LAYOUT

  else if (componentName === 'accordion') {
    const frame = figma.createFrame();
    frame.name = 'Accordion Item';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'FIXED';
    frame.itemSpacing = 0;
    frame.resize(400, 80);
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    // Header
    const header = figma.createFrame();
    header.name = 'Header';
    header.layoutMode = 'HORIZONTAL';
    header.primaryAxisAlignItems = 'CENTER';
    header.counterAxisAlignItems = 'CENTER';
    header.paddingLeft = 16;
    header.paddingRight = 16;
    header.paddingTop = 16;
    header.paddingBottom = 16;
    header.itemSpacing = 8;
    header.resize(400, 56);
    header.fills = [];

    const headerText = figma.createText();
    headerText.characters = 'Accordion Header';
    headerText.fontSize = 16;
    headerText.fontName = { family: 'Inter', style: 'Medium' };
    headerText.layoutGrow = 1;

    const fgVar = findVariable('foreground');
    if (fgVar) {
      headerText.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    header.appendChild(headerText);

    // Separator
    const separator = figma.createFrame();
    separator.name = 'Separator';
    separator.resize(400, 1);

    const borderVar = findVariable('border');
    if (borderVar) {
      separator.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
    }

    frame.appendChild(header);
    frame.appendChild(separator);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'breadcrumb') {
    const frame = figma.createFrame();
    frame.name = 'Breadcrumb';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.itemSpacing = 8;
    frame.primaryAxisSizingMode = 'AUTO';
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    const items = ['Home', 'Products', 'Category'];

    for (let i = 0; i < items.length; i++) {
      const text = figma.createText();
      text.characters = items[i];
      text.fontSize = 14;
      text.fontName = { family: 'Inter', style: i === items.length - 1 ? 'Medium' : 'Regular' };

      const fgVar = findVariable(i === items.length - 1 ? 'foreground' : 'muted-foreground');
      if (fgVar) {
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      frame.appendChild(text);

      if (i < items.length - 1) {
        const separator = figma.createText();
        separator.characters = '/';
        separator.fontSize = 14;
        separator.fontName = { family: 'Inter', style: 'Regular' };

        const mutedVar = findVariable('muted-foreground');
        if (mutedVar) {
          separator.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
        }

        frame.appendChild(separator);
      }
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'tooltip') {
    const frame = figma.createFrame();
    frame.name = 'Tooltip';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.counterAxisAlignItems = 'CENTER';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 12;
    frame.paddingRight = 12;
    frame.paddingTop = 6;
    frame.paddingBottom = 6;
    frame.cornerRadius = 6;
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('primary');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const text = figma.createText();
    text.characters = 'Tooltip';
    text.fontSize = 12;
    text.fontName = { family: 'Inter', style: 'Medium' };

    const fgVar = findVariable('primary-foreground');
    if (fgVar) {
      text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    frame.appendChild(text);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'pagination') {
    const frame = figma.createFrame();
    frame.name = 'Pagination';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.itemSpacing = 4;
    frame.primaryAxisSizingMode = 'AUTO';
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    const pages = ['Previous', '1', '2', '3', 'Next'];

    for (let i = 0; i < pages.length; i++) {
      const button = figma.createFrame();
      button.name = pages[i];
      button.layoutMode = 'HORIZONTAL';
      button.primaryAxisAlignItems = 'CENTER';
      button.counterAxisAlignItems = 'CENTER';
      button.paddingLeft = 12;
      button.paddingRight = 12;
      button.paddingTop = 8;
      button.paddingBottom = 8;
      button.cornerRadius = 6;
      button.resize(40, 36);

      const isActive = pages[i] === '2';

      const bgVar = findVariable(isActive ? 'primary' : 'background');
      if (bgVar) {
        button.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
      }

      if (!isActive) {
        const borderVar = findVariable('input');
        if (borderVar) {
          button.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
          button.strokeWeight = 1;
        }
      }

      const text = figma.createText();
      text.characters = pages[i];
      text.fontSize = 14;
      text.fontName = { family: 'Inter', style: 'Medium' };

      const fgVar = findVariable(isActive ? 'primary-foreground' : 'foreground');
      if (fgVar) {
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      button.appendChild(text);
      frame.appendChild(button);
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  // PHASE 4: OVERLAY & COMPLEX COMPONENTS

  else if (componentName === 'dialog') {
    const frame = figma.createFrame();
    frame.name = 'Dialog';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'FIXED';
    frame.paddingLeft = 24;
    frame.paddingRight = 24;
    frame.paddingTop = 24;
    frame.paddingBottom = 24;
    frame.itemSpacing = 16;
    frame.cornerRadius = 12;
    frame.resize(400, 200);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    // Title
    const title = figma.createText();
    title.characters = 'Dialog Title';
    title.fontSize = 18;
    title.fontName = semiBoldFont;

    const fgVar = findVariable('foreground');
    if (fgVar) {
      title.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    // Description
    const desc = figma.createText();
    desc.characters = 'Dialog description goes here';
    desc.fontSize = 14;
    desc.fontName = { family: 'Inter', style: 'Regular' };

    const mutedVar = findVariable('muted-foreground');
    if (mutedVar) {
      desc.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    // Buttons
    const buttonRow = figma.createFrame();
    buttonRow.name = 'Actions';
    buttonRow.layoutMode = 'HORIZONTAL';
    buttonRow.primaryAxisAlignItems = 'MAX';
    buttonRow.itemSpacing = 8;
    buttonRow.fills = [];

    frame.appendChild(title);
    frame.appendChild(desc);
    frame.appendChild(buttonRow);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'popover') {
    const frame = figma.createFrame();
    frame.name = 'Popover';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'AUTO';
    frame.paddingLeft = 16;
    frame.paddingRight = 16;
    frame.paddingTop = 12;
    frame.paddingBottom = 12;
    frame.itemSpacing = 8;
    frame.cornerRadius = 8;
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('popover');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const text = figma.createText();
    text.characters = 'Popover content';
    text.fontSize = 14;
    text.fontName = { family: 'Inter', style: 'Regular' };

    const fgVar = findVariable('popover-foreground');
    if (fgVar) {
      text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    frame.appendChild(text);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'collapsible') {
    const frame = figma.createFrame();
    frame.name = 'Collapsible';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'FIXED';
    frame.itemSpacing = 8;
    frame.resize(400, 60);
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    // Trigger
    const trigger = figma.createFrame();
    trigger.name = 'Trigger';
    trigger.layoutMode = 'HORIZONTAL';
    trigger.primaryAxisAlignItems = 'CENTER';
    trigger.counterAxisAlignItems = 'CENTER';
    trigger.paddingLeft = 16;
    trigger.paddingRight = 16;
    trigger.paddingTop = 12;
    trigger.paddingBottom = 12;
    trigger.itemSpacing = 8;
    trigger.cornerRadius = 6;
    trigger.resize(400, 48);
    trigger.fills = [];

    const borderVar = findVariable('border');
    if (borderVar) {
      trigger.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      trigger.strokeWeight = 1;
    }

    const text = figma.createText();
    text.characters = 'Collapsible Header';
    text.fontSize = 14;
    text.fontName = { family: 'Inter', style: 'Medium' };
    text.layoutGrow = 1;

    const fgVar = findVariable('foreground');
    if (fgVar) {
      text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    trigger.appendChild(text);
    frame.appendChild(trigger);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'table') {
    const frame = figma.createFrame();
    frame.name = 'Table';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'FIXED';
    frame.itemSpacing = 0;
    frame.resize(600, 150);
    frame.x = 50;
    frame.y = 50;

    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    // Header row
    const headerRow = figma.createFrame();
    headerRow.name = 'Header Row';
    headerRow.layoutMode = 'HORIZONTAL';
    headerRow.itemSpacing = 0;
    headerRow.resize(600, 48);
    headerRow.fills = [];

    const mutedVar = findVariable('muted');
    if (mutedVar) {
      headerRow.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    const headers = ['Name', 'Status', 'Role'];
    for (const header of headers) {
      const cell = figma.createFrame();
      cell.name = header;
      cell.layoutMode = 'HORIZONTAL';
      cell.primaryAxisAlignItems = 'MIN';
      cell.counterAxisAlignItems = 'CENTER';
      cell.paddingLeft = 16;
      cell.paddingRight = 16;
      cell.paddingTop = 12;
      cell.paddingBottom = 12;
      cell.layoutGrow = 1;
      cell.fills = [];

      const text = figma.createText();
      text.characters = header;
      text.fontSize = 14;
      text.fontName = { family: 'Inter', style: 'Medium' };

      const fgVar = findVariable('foreground');
      if (fgVar) {
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      cell.appendChild(text);
      headerRow.appendChild(cell);
    }

    // Data row
    const dataRow = figma.createFrame();
    dataRow.name = 'Data Row';
    dataRow.layoutMode = 'HORIZONTAL';
    dataRow.itemSpacing = 0;
    dataRow.resize(600, 48);
    dataRow.fills = [];

    const data = ['John Doe', 'Active', 'Admin'];
    for (const value of data) {
      const cell = figma.createFrame();
      cell.name = value;
      cell.layoutMode = 'HORIZONTAL';
      cell.primaryAxisAlignItems = 'MIN';
      cell.counterAxisAlignItems = 'CENTER';
      cell.paddingLeft = 16;
      cell.paddingRight = 16;
      cell.paddingTop = 12;
      cell.paddingBottom = 12;
      cell.layoutGrow = 1;
      cell.fills = [];

      const text = figma.createText();
      text.characters = value;
      text.fontSize = 14;
      text.fontName = { family: 'Inter', style: 'Regular' };

      const fgVar = findVariable('foreground');
      if (fgVar) {
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      cell.appendChild(text);
      dataRow.appendChild(cell);
    }

    frame.appendChild(headerRow);
    frame.appendChild(dataRow);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  // REMAINING COMPONENTS - BATCH 1

  else if (componentName === 'alert-dialog') {
    const frame = figma.createFrame();
    frame.name = 'Alert Dialog';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 24;
    frame.paddingRight = 24;
    frame.paddingTop = 24;
    frame.paddingBottom = 24;
    frame.itemSpacing = 16;
    frame.cornerRadius = 12;
    frame.resize(400, 180);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const title = figma.createText();
    title.characters = 'Are you sure?';
    title.fontSize = 18;
    title.fontName = semiBoldFont;

    const fgVar = findVariable('foreground');
    if (fgVar) {
      title.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    const desc = figma.createText();
    desc.characters = 'This action cannot be undone.';
    desc.fontSize = 14;
    desc.fontName = { family: 'Inter', style: 'Regular' };

    const mutedVar = findVariable('muted-foreground');
    if (mutedVar) {
      desc.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    frame.appendChild(title);
    frame.appendChild(desc);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'toast') {
    const frame = figma.createFrame();
    frame.name = 'Toast';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 16;
    frame.paddingRight = 16;
    frame.paddingTop = 12;
    frame.paddingBottom = 12;
    frame.itemSpacing = 12;
    frame.cornerRadius = 8;
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const text = figma.createText();
    text.characters = 'Toast notification';
    text.fontSize = 14;
    text.fontName = { family: 'Inter', style: 'Medium' };

    const fgVar = findVariable('foreground');
    if (fgVar) {
      text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    frame.appendChild(text);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'dropdown-menu') {
    const frame = figma.createFrame();
    frame.name = 'Dropdown Menu';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 4;
    frame.paddingRight = 4;
    frame.paddingTop = 4;
    frame.paddingBottom = 4;
    frame.itemSpacing = 2;
    frame.cornerRadius = 8;
    frame.resize(200, 120);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('popover');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const items = ['Profile', 'Settings', 'Logout'];
    for (const item of items) {
      const menuItem = figma.createFrame();
      menuItem.name = item;
      menuItem.layoutMode = 'HORIZONTAL';
      menuItem.primaryAxisAlignItems = 'MIN';
      menuItem.counterAxisAlignItems = 'CENTER';
      menuItem.paddingLeft = 8;
      menuItem.paddingRight = 8;
      menuItem.paddingTop = 6;
      menuItem.paddingBottom = 6;
      menuItem.cornerRadius = 4;
      menuItem.fills = [];

      const text = figma.createText();
      text.characters = item;
      text.fontSize = 14;
      text.fontName = { family: 'Inter', style: 'Regular' };

      const fgVar = findVariable('popover-foreground');
      if (fgVar) {
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      menuItem.appendChild(text);
      frame.appendChild(menuItem);
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'context-menu') {
    const frame = figma.createFrame();
    frame.name = 'Context Menu';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 4;
    frame.paddingRight = 4;
    frame.paddingTop = 4;
    frame.paddingBottom = 4;
    frame.itemSpacing = 2;
    frame.cornerRadius = 8;
    frame.resize(180, 100);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('popover');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const items = ['Copy', 'Cut', 'Paste'];
    for (const item of items) {
      const menuItem = figma.createFrame();
      menuItem.name = item;
      menuItem.layoutMode = 'HORIZONTAL';
      menuItem.primaryAxisAlignItems = 'MIN';
      menuItem.counterAxisAlignItems = 'CENTER';
      menuItem.paddingLeft = 8;
      menuItem.paddingRight = 8;
      menuItem.paddingTop = 6;
      menuItem.paddingBottom = 6;
      menuItem.cornerRadius = 4;
      menuItem.fills = [];

      const text = figma.createText();
      text.characters = item;
      text.fontSize = 14;
      text.fontName = { family: 'Inter', style: 'Regular' };

      const fgVar = findVariable('popover-foreground');
      if (fgVar) {
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      menuItem.appendChild(text);
      frame.appendChild(menuItem);
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'hover-card') {
    const frame = figma.createFrame();
    frame.name = 'Hover Card';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 16;
    frame.paddingRight = 16;
    frame.paddingTop = 12;
    frame.paddingBottom = 12;
    frame.itemSpacing = 8;
    frame.cornerRadius = 8;
    frame.resize(280, 100);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('popover');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const title = figma.createText();
    title.characters = '@username';
    title.fontSize = 14;
    title.fontName = semiBoldFont;

    const fgVar = findVariable('popover-foreground');
    if (fgVar) {
      title.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    const desc = figma.createText();
    desc.characters = 'User bio and information';
    desc.fontSize = 12;
    desc.fontName = { family: 'Inter', style: 'Regular' };

    const mutedVar = findVariable('muted-foreground');
    if (mutedVar) {
      desc.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    frame.appendChild(title);
    frame.appendChild(desc);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'sheet') {
    const frame = figma.createFrame();
    frame.name = 'Sheet';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 24;
    frame.paddingRight = 24;
    frame.paddingTop = 24;
    frame.paddingBottom = 24;
    frame.itemSpacing = 16;
    frame.resize(400, 600);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const title = figma.createText();
    title.characters = 'Sheet Title';
    title.fontSize = 20;
    title.fontName = semiBoldFont;

    const fgVar = findVariable('foreground');
    if (fgVar) {
      title.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    const desc = figma.createText();
    desc.characters = 'Sheet description';
    desc.fontSize = 14;
    desc.fontName = { family: 'Inter', style: 'Regular' };

    const mutedVar = findVariable('muted-foreground');
    if (mutedVar) {
      desc.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    frame.appendChild(title);
    frame.appendChild(desc);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'drawer') {
    const frame = figma.createFrame();
    frame.name = 'Drawer';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 24;
    frame.paddingRight = 24;
    frame.paddingTop = 24;
    frame.paddingBottom = 24;
    frame.itemSpacing = 16;
    frame.resize(320, 600);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const title = figma.createText();
    title.characters = 'Drawer';
    title.fontSize = 20;
    title.fontName = semiBoldFont;

    const fgVar = findVariable('foreground');
    if (fgVar) {
      title.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    frame.appendChild(title);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'toggle-group') {
    const frame = figma.createFrame();
    frame.name = 'Toggle Group';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.itemSpacing = 0;
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    const items = ['Left', 'Center', 'Right'];
    for (let i = 0; i < items.length; i++) {
      const button = figma.createFrame();
      button.name = items[i];
      button.layoutMode = 'HORIZONTAL';
      button.primaryAxisAlignItems = 'CENTER';
      button.counterAxisAlignItems = 'CENTER';
      button.paddingLeft = 12;
      button.paddingRight = 12;
      button.paddingTop = 8;
      button.paddingBottom = 8;
      button.resize(60, 36);

      if (i === 0) {
        button.topLeftRadius = 6;
        button.bottomLeftRadius = 6;
      } else if (i === items.length - 1) {
        button.topRightRadius = 6;
        button.bottomRightRadius = 6;
      }

      const bgVar = findVariable('background');
      if (bgVar) {
        button.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
      }

      const borderVar = findVariable('input');
      if (borderVar) {
        button.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
        button.strokeWeight = 1;
      }

      const text = figma.createText();
      text.characters = items[i];
      text.fontSize = 14;
      text.fontName = { family: 'Inter', style: 'Medium' };

      const fgVar = findVariable('foreground');
      if (fgVar) {
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      button.appendChild(text);
      frame.appendChild(button);
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'menubar') {
    const frame = figma.createFrame();
    frame.name = 'Menubar';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.itemSpacing = 4;
    frame.paddingLeft = 4;
    frame.paddingRight = 4;
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    const items = ['File', 'Edit', 'View', 'Help'];
    for (const item of items) {
      const menuItem = figma.createFrame();
      menuItem.name = item;
      menuItem.layoutMode = 'HORIZONTAL';
      menuItem.primaryAxisAlignItems = 'CENTER';
      menuItem.counterAxisAlignItems = 'CENTER';
      menuItem.paddingLeft = 12;
      menuItem.paddingRight = 12;
      menuItem.paddingTop = 6;
      menuItem.paddingBottom = 6;
      menuItem.cornerRadius = 4;
      menuItem.fills = [];

      const text = figma.createText();
      text.characters = item;
      text.fontSize = 14;
      text.fontName = { family: 'Inter', style: 'Medium' };

      const fgVar = findVariable('foreground');
      if (fgVar) {
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      menuItem.appendChild(text);
      frame.appendChild(menuItem);
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'navigation-menu') {
    const frame = figma.createFrame();
    frame.name = 'Navigation Menu';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.itemSpacing = 8;
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    const items = ['Home', 'About', 'Services', 'Contact'];
    for (const item of items) {
      const navItem = figma.createFrame();
      navItem.name = item;
      navItem.layoutMode = 'HORIZONTAL';
      navItem.primaryAxisAlignItems = 'CENTER';
      navItem.counterAxisAlignItems = 'CENTER';
      navItem.paddingLeft = 16;
      navItem.paddingRight = 16;
      navItem.paddingTop = 8;
      navItem.paddingBottom = 8;
      navItem.fills = [];

      const text = figma.createText();
      text.characters = item;
      text.fontSize = 14;
      text.fontName = { family: 'Inter', style: 'Medium' };

      const fgVar = findVariable('foreground');
      if (fgVar) {
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      navItem.appendChild(text);
      frame.appendChild(navItem);
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'kbd') {
    const frame = figma.createFrame();
    frame.name = 'Kbd';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.counterAxisAlignItems = 'CENTER';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 8;
    frame.paddingRight = 8;
    frame.paddingTop = 4;
    frame.paddingBottom = 4;
    frame.cornerRadius = 4;
    frame.x = 50;
    frame.y = 50;

    const mutedVar = findVariable('muted');
    if (mutedVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const text = figma.createText();
    text.characters = '⌘K';
    text.fontSize = 12;
    text.fontName = { family: 'Inter', style: 'Medium' };

    const fgVar = findVariable('foreground');
    if (fgVar) {
      text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    frame.appendChild(text);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'input-otp') {
    const frame = figma.createFrame();
    frame.name = 'Input OTP';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.itemSpacing = 8;
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    for (let i = 0; i < 6; i++) {
      const digit = figma.createFrame();
      digit.name = `Digit ${i + 1}`;
      digit.layoutMode = 'HORIZONTAL';
      digit.primaryAxisAlignItems = 'CENTER';
      digit.counterAxisAlignItems = 'CENTER';
      digit.resize(40, 48);
      digit.cornerRadius = 6;

      const bgVar = findVariable('background');
      if (bgVar) {
        digit.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
      }

      const borderVar = findVariable('input');
      if (borderVar) {
        digit.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
        digit.strokeWeight = 1;
      }

      frame.appendChild(digit);
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'scroll-area') {
    const frame = figma.createFrame();
    frame.name = 'Scroll Area';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'FIXED';
    frame.itemSpacing = 8;
    frame.paddingLeft = 16;
    frame.paddingRight = 16;
    frame.paddingTop = 16;
    frame.paddingBottom = 16;
    frame.resize(300, 200);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const text = figma.createText();
    text.characters = 'Scrollable content area';
    text.fontSize = 14;
    text.fontName = { family: 'Inter', style: 'Regular' };

    const fgVar = findVariable('foreground');
    if (fgVar) {
      text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    frame.appendChild(text);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'aspect-ratio') {
    const frame = figma.createFrame();
    frame.name = 'Aspect Ratio';
    frame.resize(400, 225); // 16:9 aspect ratio
    frame.x = 50;
    frame.y = 50;

    const mutedVar = findVariable('muted');
    if (mutedVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'empty') {
    const frame = figma.createFrame();
    frame.name = 'Empty State';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.counterAxisAlignItems = 'CENTER';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 40;
    frame.paddingRight = 40;
    frame.paddingTop = 40;
    frame.paddingBottom = 40;
    frame.itemSpacing = 12;
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    const title = figma.createText();
    title.characters = 'No results found';
    title.fontSize = 16;
    title.fontName = semiBoldFont;
    title.textAlignHorizontal = 'CENTER';

    const fgVar = findVariable('foreground');
    if (fgVar) {
      title.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    const desc = figma.createText();
    desc.characters = 'Try adjusting your search';
    desc.fontSize = 14;
    desc.fontName = { family: 'Inter', style: 'Regular' };
    desc.textAlignHorizontal = 'CENTER';

    const mutedVar = findVariable('muted-foreground');
    if (mutedVar) {
      desc.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    frame.appendChild(title);
    frame.appendChild(desc);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'command') {
    const frame = figma.createFrame();
    frame.name = 'Command';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.itemSpacing = 0;
    frame.cornerRadius = 12;
    frame.resize(400, 300);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('popover');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    // Search input
    const input = figma.createFrame();
    input.name = 'Search';
    input.layoutMode = 'HORIZONTAL';
    input.paddingLeft = 16;
    input.paddingRight = 16;
    input.paddingTop = 12;
    input.paddingBottom = 12;
    input.fills = [];

    const searchText = figma.createText();
    searchText.characters = 'Type a command...';
    searchText.fontSize = 14;
    searchText.fontName = { family: 'Inter', style: 'Regular' };

    const mutedVar = findVariable('muted-foreground');
    if (mutedVar) {
      searchText.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    input.appendChild(searchText);
    frame.appendChild(input);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'carousel') {
    const frame = figma.createFrame();
    frame.name = 'Carousel';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.itemSpacing = 16;
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    for (let i = 1; i <= 3; i++) {
      const slide = figma.createFrame();
      slide.name = `Slide ${i}`;
      slide.resize(300, 200);
      slide.cornerRadius = 8;

      const mutedVar = findVariable('muted');
      if (mutedVar) {
        slide.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
      }

      frame.appendChild(slide);
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'calendar') {
    const frame = figma.createFrame();
    frame.name = 'Calendar';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 16;
    frame.paddingRight = 16;
    frame.paddingTop = 16;
    frame.paddingBottom = 16;
    frame.itemSpacing = 12;
    frame.cornerRadius = 8;
    frame.resize(300, 320);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const header = figma.createText();
    header.characters = 'November 2025';
    header.fontSize = 16;
    header.fontName = semiBoldFont;

    const fgVar = findVariable('foreground');
    if (fgVar) {
      header.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    frame.appendChild(header);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'chart') {
    const frame = figma.createFrame();
    frame.name = 'Chart';
    frame.resize(400, 300);
    frame.cornerRadius = 8;
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  // FINAL BATCH - REMAINING COMPONENTS

  else if (componentName === 'combobox') {
    const frame = figma.createFrame();
    frame.name = 'Combobox';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.counterAxisAlignItems = 'CENTER';
    frame.paddingLeft = 12;
    frame.paddingRight = 12;
    frame.paddingTop = 8;
    frame.paddingBottom = 8;
    frame.itemSpacing = 8;
    frame.cornerRadius = 6;
    frame.resize(200, 40);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('input');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const text = figma.createText();
    text.characters = 'Select option...';
    text.fontSize = 14;
    text.fontName = { family: 'Inter', style: 'Regular' };
    text.layoutGrow = 1;

    const mutedVar = findVariable('muted-foreground');
    if (mutedVar) {
      text.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    frame.appendChild(text);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'date-picker') {
    const frame = figma.createFrame();
    frame.name = 'Date Picker';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.counterAxisAlignItems = 'CENTER';
    frame.paddingLeft = 12;
    frame.paddingRight = 12;
    frame.paddingTop = 8;
    frame.paddingBottom = 8;
    frame.itemSpacing = 8;
    frame.cornerRadius = 6;
    frame.resize(200, 40);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('input');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const text = figma.createText();
    text.characters = 'Pick a date';
    text.fontSize = 14;
    text.fontName = { family: 'Inter', style: 'Regular' };
    text.layoutGrow = 1;

    const mutedVar = findVariable('muted-foreground');
    if (mutedVar) {
      text.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    frame.appendChild(text);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'resizable') {
    const frame = figma.createFrame();
    frame.name = 'Resizable';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.itemSpacing = 2;
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    const panel1 = figma.createFrame();
    panel1.name = 'Panel 1';
    panel1.resize(200, 300);
    panel1.cornerRadius = 6;

    const bgVar = findVariable('background');
    if (bgVar) {
      panel1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('border');
    if (borderVar) {
      panel1.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      panel1.strokeWeight = 1;
    }

    const panel2 = figma.createFrame();
    panel2.name = 'Panel 2';
    panel2.resize(200, 300);
    panel2.cornerRadius = 6;

    if (bgVar) {
      panel2.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    if (borderVar) {
      panel2.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      panel2.strokeWeight = 1;
    }

    frame.appendChild(panel1);
    frame.appendChild(panel2);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'sidebar') {
    const frame = figma.createFrame();
    frame.name = 'Sidebar';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 16;
    frame.paddingRight = 16;
    frame.paddingTop = 16;
    frame.paddingBottom = 16;
    frame.itemSpacing = 8;
    frame.resize(240, 600);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const items = ['Dashboard', 'Projects', 'Team', 'Settings'];
    for (const item of items) {
      const navItem = figma.createFrame();
      navItem.name = item;
      navItem.layoutMode = 'HORIZONTAL';
      navItem.primaryAxisAlignItems = 'MIN';
      navItem.counterAxisAlignItems = 'CENTER';
      navItem.paddingLeft = 12;
      navItem.paddingRight = 12;
      navItem.paddingTop = 8;
      navItem.paddingBottom = 8;
      navItem.cornerRadius = 4;
      navItem.fills = [];

      const text = figma.createText();
      text.characters = item;
      text.fontSize = 14;
      text.fontName = { family: 'Inter', style: 'Medium' };

      const fgVar = findVariable('foreground');
      if (fgVar) {
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      navItem.appendChild(text);
      frame.appendChild(navItem);
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'sonner') {
    const frame = figma.createFrame();
    frame.name = 'Sonner';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 16;
    frame.paddingRight = 16;
    frame.paddingTop = 12;
    frame.paddingBottom = 12;
    frame.itemSpacing = 12;
    frame.cornerRadius = 8;
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const text = figma.createText();
    text.characters = 'Sonner toast notification';
    text.fontSize = 14;
    text.fontName = { family: 'Inter', style: 'Medium' };

    const fgVar = findVariable('foreground');
    if (fgVar) {
      text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    frame.appendChild(text);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'button-group') {
    const frame = figma.createFrame();
    frame.name = 'Button Group';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.itemSpacing = 8;
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    const buttons = ['Button 1', 'Button 2', 'Button 3'];
    for (const btn of buttons) {
      const button = figma.createFrame();
      button.name = btn;
      button.layoutMode = 'HORIZONTAL';
      button.primaryAxisAlignItems = 'CENTER';
      button.counterAxisAlignItems = 'CENTER';
      button.paddingLeft = 16;
      button.paddingRight = 16;
      button.paddingTop = 8;
      button.paddingBottom = 8;
      button.cornerRadius = 6;
      button.resize(80, 40);

      const bgVar = findVariable('primary');
      if (bgVar) {
        button.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
      }

      const text = figma.createText();
      text.characters = btn;
      text.fontSize = 14;
      text.fontName = { family: 'Inter', style: 'Medium' };

      const fgVar = findVariable('primary-foreground');
      if (fgVar) {
        text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      button.appendChild(text);
      frame.appendChild(button);
    }

    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'field') {
    const frame = figma.createFrame();
    frame.name = 'Field';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.itemSpacing = 8;
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    const label = figma.createText();
    label.characters = 'Field Label';
    label.fontSize = 14;
    label.fontName = { family: 'Inter', style: 'Medium' };

    const fgVar = findVariable('foreground');
    if (fgVar) {
      label.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    const input = figma.createFrame();
    input.name = 'Input';
    input.layoutMode = 'HORIZONTAL';
    input.paddingLeft = 12;
    input.paddingRight = 12;
    input.paddingTop = 8;
    input.paddingBottom = 8;
    input.cornerRadius = 6;
    input.resize(200, 40);

    const bgVar = findVariable('background');
    if (bgVar) {
      input.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('input');
    if (borderVar) {
      input.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      input.strokeWeight = 1;
    }

    frame.appendChild(label);
    frame.appendChild(input);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'form') {
    const frame = figma.createFrame();
    frame.name = 'Form';
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 24;
    frame.paddingRight = 24;
    frame.paddingTop = 24;
    frame.paddingBottom = 24;
    frame.itemSpacing = 16;
    frame.cornerRadius = 8;
    frame.resize(400, 300);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('border');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const title = figma.createText();
    title.characters = 'Form Title';
    title.fontSize = 20;
    title.fontName = semiBoldFont;

    const fgVar = findVariable('foreground');
    if (fgVar) {
      title.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    frame.appendChild(title);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'native-select') {
    const frame = figma.createFrame();
    frame.name = 'Native Select';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.counterAxisAlignItems = 'CENTER';
    frame.paddingLeft = 12;
    frame.paddingRight = 12;
    frame.paddingTop = 8;
    frame.paddingBottom = 8;
    frame.itemSpacing = 8;
    frame.cornerRadius = 6;
    frame.resize(200, 40);
    frame.x = 50;
    frame.y = 50;

    const bgVar = findVariable('background');
    if (bgVar) {
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: bgVar.id } } }];
    }

    const borderVar = findVariable('input');
    if (borderVar) {
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: borderVar.id } } }];
      frame.strokeWeight = 1;
    }

    const text = figma.createText();
    text.characters = 'Select...';
    text.fontSize = 14;
    text.fontName = { family: 'Inter', style: 'Regular' };
    text.layoutGrow = 1;

    const mutedVar = findVariable('muted-foreground');
    if (mutedVar) {
      text.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: mutedVar.id } } }];
    }

    frame.appendChild(text);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }

  else if (componentName === 'item') {
    const frame = figma.createFrame();
    frame.name = 'Item';
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisAlignItems = 'CENTER';
    frame.counterAxisAlignItems = 'CENTER';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingLeft = 12;
    frame.paddingRight = 12;
    frame.paddingTop = 8;
    frame.paddingBottom = 8;
    frame.itemSpacing = 8;
    frame.cornerRadius = 4;
    frame.x = 50;
    frame.y = 50;
    frame.fills = [];

    const text = figma.createText();
    text.characters = 'List Item';
    text.fontSize = 14;
    text.fontName = { family: 'Inter', style: 'Regular' };

    const fgVar = findVariable('foreground');
    if (fgVar) {
      text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
    }

    frame.appendChild(text);
    page.appendChild(frame);
    figma.createComponentFromNode(frame);
  }
}



figma.showUI(__html__, { width: 400, height: 500 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate-variables') {
    try {
      const css = msg.useDefault ? DEFAULT_SHADCN_CSS : msg.css;

      const rootTokens = parseBlock(css, ':root');
      const darkTokens = parseBlock(css, '.dark');

      if (Object.keys(rootTokens).length === 0) {
        figma.ui.postMessage({ type: 'status', message: 'No variables found in :root', status: 'error' });
        return;
      }

      // Categorize tokens
      const { colors: rootColors, numbers: rootNumbers } = categorizeTokens(rootTokens);
      const { colors: darkColors } = categorizeTokens(darkTokens);

      // Create Color Collection
      const collections = await figma.variables.getLocalVariableCollectionsAsync();
      let colorCollection = collections.find(c => c.name === 'shadcn/colors');
      if (!colorCollection) {
        colorCollection = figma.variables.createVariableCollection('shadcn/colors');
      }

      const colorModes = colorCollection.modes;
      let lightModeId = colorModes[0].modeId;

      if (colorModes[0].name === 'Mode 1') {
        colorCollection.renameMode(lightModeId, 'Light');
      } else {
        const light = colorModes.find(m => m.name === 'Light');
        if (light) lightModeId = light.modeId;
      }

      let darkModeId: string | null = null;
      if (Object.keys(darkColors).length > 0) {
        const dark = colorModes.find(m => m.name === 'Dark');
        if (dark) {
          darkModeId = dark.modeId;
        } else {
          darkModeId = colorCollection.addMode('Dark');
        }
      }

      // Create color variables
      const existingColorVars = (await figma.variables.getLocalVariablesAsync()).filter(v => v.variableCollectionId === colorCollection!.id);

      for (const name in rootColors) {
        const token = rootColors[name];
        let variable = existingColorVars.find(v => v.name === name);

        if (!variable) {
          variable = figma.variables.createVariable(name, colorCollection, 'COLOR');
        }

        variable.setValueForMode(lightModeId, token.parsedValue);

        if (darkModeId && darkColors[name]) {
          variable.setValueForMode(darkModeId, darkColors[name].parsedValue);
        }
      }

      // Create Number Collection
      let numberCollection = collections.find(c => c.name === 'shadcn/numbers');
      if (!numberCollection) {
        numberCollection = figma.variables.createVariableCollection('shadcn/numbers');
      }

      const numberModeId = numberCollection.modes[0].modeId;
      const existingNumberVars = (await figma.variables.getLocalVariablesAsync()).filter(v => v.variableCollectionId === numberCollection!.id);

      for (const name in rootNumbers) {
        const token = rootNumbers[name];
        let variable = existingNumberVars.find(v => v.name === name);

        if (!variable) {
          variable = figma.variables.createVariable(name, numberCollection, 'FLOAT');
        }

        variable.setValueForMode(numberModeId, token.parsedValue);
      }

      // Create Text Styles
      await createTextStyles();

      // Create Effect Styles
      await createEffectStyles();

      // Create Grid System Templates
      console.log('Starting grid creation...');
      let gridPage = figma.root.children.find(p => p.name === '📐 Grid System') as PageNode;
      if (!gridPage) {
        console.log('Creating new Grid System page...');
        gridPage = figma.createPage();
        gridPage.name = '📐 Grid System';
      } else {
        console.log('Grid System page already exists');
      }
      await gridPage.loadAsync();
      console.log('Grid page loaded, creating examples...');
      await createGridExamples(gridPage);
      console.log('Grid examples created successfully!');

      const colorCount = Object.keys(rootColors).length;
      const numberCount = Object.keys(rootNumbers).length;
      const source = msg.useDefault ? 'default Shadcn tokens' : 'custom CSS';

      figma.ui.postMessage({
        type: 'status',
        message: `✓ Generated ${colorCount} color variables, ${numberCount} number variables, 11 text styles, 5 effect styles, and 2 grid styles from ${source}!`,
        status: 'success'
      });

    } catch (e: any) {
      console.error(e);
      figma.ui.postMessage({ type: 'status', message: 'Error: ' + e.message, status: 'error' });
    }
  }

  if (msg.type === 'generate-components') {
    try {
      figma.ui.postMessage({ type: 'status', message: 'Generating components...', status: 'info' });

      // Get variable collections for binding
      const collections = await figma.variables.getLocalVariableCollectionsAsync();
      const colorCollection = collections.find(c => c.name === 'shadcn/colors');
      const numberCollection = collections.find(c => c.name === 'shadcn/numbers');

      if (!colorCollection) {
        figma.ui.postMessage({
          type: 'status',
          message: 'Please generate variables first!',
          status: 'error'
        });
        return;
      }

      // Get all variables
      const allVariables = await figma.variables.getLocalVariablesAsync();
      const colorVars = allVariables.filter(v => v.variableCollectionId === colorCollection.id);
      const numberVars = numberCollection ? allVariables.filter(v => v.variableCollectionId === numberCollection.id) : [];

      // Helper to find variable by name
      const findVariable = (name: string) => {
        return colorVars.find(v => v.name === name) || numberVars.find(v => v.name === name);
      };

      // Create pages
      const pageStructure: Record<string, string[]> = {
        '📦 Buttons': ['button', 'button-group'],
        '📦 Forms': ['input', 'textarea', 'checkbox', 'switch', 'slider', 'label', 'radio-group', 'select', 'native-select', 'combobox', 'date-picker', 'input-otp', 'field'],
        '📦 Components': ['card', 'badge', 'alert', 'alert-dialog', 'avatar', 'separator', 'skeleton', 'kbd', 'empty', 'item'],
        '📦 Accordion': ['accordion'],
        '📦 Navigation': ['tabs', 'breadcrumb', 'pagination', 'menubar', 'navigation-menu'],
        '📦 Feedback': ['progress', 'spinner', 'tooltip', 'toast', 'sonner'],
        '📦 Interactive': ['toggle', 'toggle-group'],
        '📦 Layout': ['collapsible', 'resizable', 'scroll-area', 'aspect-ratio', 'sidebar'],
        '📦 Overlays': ['dialog', 'popover', 'sheet', 'drawer', 'hover-card'],
        '📦 Menus': ['dropdown-menu', 'context-menu', 'command'],
        '📦 Data': ['table', 'calendar', 'chart', 'carousel'],
        '📦 Forms Advanced': ['form'],
        '📦 Grids': ['grids'],

      };

      let componentsCreated = 0;

      // Helper to organize page layout
      const organizePageLayout = (page: PageNode) => {
        const padding = 50;
        let currentY = 50;

        // Figma children are ordered top-to-bottom (index 0 is top).
        // We want to process them in the order they were created (oldest first),
        // which corresponds to the bottom of the stack (last index) to top?
        // No, appendChild adds to the top (index 0).
        // So the first component created is at the bottom (last index).
        // We want the first component created to be at the top of the page.
        // So we should iterate from last index to 0.

        const children = [...page.children];
        // Reverse to get [FirstCreated, ..., LastCreated]
        children.reverse();

        for (const node of children) {
          node.x = 50;
          node.y = currentY;
          currentY += node.height + padding;
        }
      };

      for (const pageName in pageStructure) {
        const componentNames = pageStructure[pageName];

        // Create or find page
        let page = figma.root.children.find(p => p.name === `📦 ${pageName}`) as PageNode;
        if (!page) {
          page = figma.createPage();
          page.name = `📦 ${pageName}`;
        }

        // Load page before appending components (required for dynamic-page mode)
        await page.loadAsync();

        // Generate components on this page
        for (const componentName of componentNames) {
          await generateComponent(componentName, page, findVariable, colorCollection);
          componentsCreated++;
        }

        // Organize layout
        organizePageLayout(page);
      }

      const pageCount = Object.keys(pageStructure).length;

      figma.ui.postMessage({
        type: 'status',
        message: `✓ Generated ${componentsCreated} components across ${pageCount} pages!`,
        status: 'success'
      });

    } catch (e: any) {
      console.error('Plugin Error:', e);
      const errorMessage = e.message || (typeof e === 'string' ? e : JSON.stringify(e));
      figma.ui.postMessage({ type: 'status', message: 'Error: ' + errorMessage, status: 'error' });
    }
  }
};
