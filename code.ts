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

// --- Primitive color helpers -------------------------------------------------
// Used to build the `shadcn/primitives` collection: deduplicate raw colors and
// give each one a readable, stable name (e.g. neutral/90, red/58, neutral/100/a10).

interface Rgba { r: number; g: number; b: number; a?: number }

// Stable identity key for a color so identical values share one primitive.
function colorKey(c: Rgba): string {
  const a = c.a === undefined ? 1 : c.a;
  return [c.r, c.g, c.b, a].map(n => Math.round(n * 10000)).join('_');
}

// Convert sRGB (0..1) to HSL — used only for naming, never for the stored value.
function rgbToHsl(r: number, g: number, b: number): { h: number, s: number, l: number } {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r: h = ((g - b) / d) % 6; break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4; break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s, l };
}

// Map an HSL hue angle to a Tailwind-ish color family name.
function hueFamily(h: number): string {
  if (h < 15 || h >= 345) return 'red';
  if (h < 45) return 'orange';
  if (h < 70) return 'yellow';
  if (h < 160) return 'green';
  if (h < 190) return 'teal';
  if (h < 250) return 'blue';
  if (h < 290) return 'violet';
  if (h < 330) return 'purple';
  return 'pink';
}

// Human-readable primitive name derived from a color's perceived hue/lightness.
function primitiveName(c: Rgba): string {
  const { h, s, l } = rgbToHsl(c.r, c.g, c.b);
  const step = Math.round(l * 100);
  const family = s < 0.08 ? 'neutral' : hueFamily(h);
  let name = `${family}/${step}`;
  if (c.a !== undefined && c.a < 1) name += `/a${Math.round(c.a * 100)}`;
  return name;
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

// A solid paint bound to a Figma variable (used for every component color so
// nothing is hardcoded). The literal color is a placeholder Figma replaces with
// the variable's resolved value.
function varPaint(v: Variable): SolidPaint {
  return { type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } };
}

// Combine pre-built variant components into one tidy, correctly-sized
// ComponentSet. The old approach reused a manually-sized auto-layout frame as
// the set parent, which left huge empty space; here we grid-position the
// variants and let combineAsVariants size the set to their bounding box.
function finalizeVariantSet(
  page: PageNode,
  components: ComponentNode[],
  name: string,
  description: string,
  columns: number,
  cellW = 220,
  cellH = 72
): ComponentSetNode {
  components.forEach((c, i) => {
    c.x = (i % columns) * cellW;
    c.y = Math.floor(i / columns) * cellH;
    page.appendChild(c);
  });
  const set = figma.combineAsVariants(components, page);
  set.name = name;
  set.description = description;
  return set;
}

// Component Generation System

// ============================================================================
// shadcn/ui component generators (auto-assembled). Each builds one component or
// variant set on the page, binding colors to semantic variables via varPaint.
// ============================================================================

async function gen_button(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const sizes = [
    { name: 'sm', height: 36, paddingX: 12, fontSize: 14 },
    { name: 'default', height: 40, paddingX: 16, fontSize: 14 },
    { name: 'lg', height: 44, paddingX: 24, fontSize: 16 },
  ];
  const variants: { name: string; bg: string | null; fg: string; border: string | null; underline: boolean }[] = [
    { name: 'default', bg: 'primary', fg: 'primary-foreground', border: null, underline: false },
    { name: 'destructive', bg: 'destructive', fg: 'destructive-foreground', border: null, underline: false },
    { name: 'outline', bg: null, fg: 'foreground', border: 'input', underline: false },
    { name: 'secondary', bg: 'secondary', fg: 'secondary-foreground', border: null, underline: false },
    { name: 'ghost', bg: null, fg: 'foreground', border: null, underline: false },
    { name: 'link', bg: null, fg: 'primary', border: null, underline: true },
  ];
  const comps: ComponentNode[] = [];
  for (const variant of variants) {
    for (const size of sizes) {
      const comp = figma.createComponent();
      comp.name = `Variant=${variant.name}, Size=${size.name}`;
      comp.layoutMode = 'HORIZONTAL';
      comp.primaryAxisAlignItems = 'CENTER';
      comp.counterAxisAlignItems = 'CENTER';
      comp.primaryAxisSizingMode = 'AUTO';
      comp.counterAxisSizingMode = 'FIXED';
      comp.paddingLeft = size.paddingX;
      comp.paddingRight = size.paddingX;
      comp.itemSpacing = 8;
      comp.cornerRadius = 6;
      comp.resize(100, size.height);
      if (variant.bg) { const v = findVariable(variant.bg); if (v) comp.fills = [varPaint(v)]; } else { comp.fills = []; }
      if (variant.border) { const v = findVariable(variant.border); if (v) { comp.strokes = [varPaint(v)]; comp.strokeWeight = 1; } }
      const text = figma.createText();
      text.fontName = { family: 'Inter', style: 'Medium' };
      text.characters = 'Button';
      text.fontSize = size.fontSize;
      if (variant.underline) text.textDecoration = 'UNDERLINE';
      const fg = findVariable(variant.fg); if (fg) text.fills = [varPaint(fg)];
      comp.appendChild(text);
      comps.push(comp);
    }
  }
  finalizeVariantSet(page, comps, 'Button', 'Shadcn button. Variant: default, destructive, outline, secondary, ghost, link. Size: sm, default, lg.', sizes.length);
}

async function gen_toggle(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const states = ['off', 'on'];
  const variants: { name: string; border: string | null }[] = [
    { name: 'default', border: null },
    { name: 'outline', border: 'input' },
  ];
  const comps: ComponentNode[] = [];
  for (const variant of variants) {
    for (const state of states) {
      const comp = figma.createComponent();
      comp.name = `Variant=${variant.name}, State=${state}`;
      comp.layoutMode = 'HORIZONTAL';
      comp.primaryAxisAlignItems = 'CENTER';
      comp.counterAxisAlignItems = 'CENTER';
      comp.primaryAxisSizingMode = 'FIXED';
      comp.counterAxisSizingMode = 'FIXED';
      comp.cornerRadius = 6;
      comp.resize(40, 40);
      if (state === 'on') { const v = findVariable('accent'); if (v) comp.fills = [varPaint(v)]; } else { comp.fills = []; }
      if (variant.border) { const v = findVariable('input'); if (v) { comp.strokes = [varPaint(v)]; comp.strokeWeight = 1; } }
      const text = figma.createText();
      text.fontName = { family: 'Inter', style: 'Medium' };
      text.characters = 'B';
      text.fontSize = 14;
      const fg = findVariable(state === 'on' ? 'accent-foreground' : 'foreground'); if (fg) text.fills = [varPaint(fg)];
      comp.appendChild(text);
      comps.push(comp);
    }
  }
  finalizeVariantSet(page, comps, 'Toggle', 'Shadcn toggle. Variant: default, outline. State: off, on (on uses accent).', states.length);
}

async function gen_toggle_group(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Toggle Group';
  comp.description = 'Shadcn toggle group. A row of connected toggle buttons; the middle item is pressed (accent).';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  comp.counterAxisAlignItems = 'CENTER';
  comp.itemSpacing = 0;
  comp.fills = [];
  const items: { label: string; on: boolean }[] = [
    { label: 'L', on: false },
    { label: 'C', on: true },
    { label: 'R', on: false },
  ];
  const border = findVariable('input');
  items.forEach((it, i) => {
    const b = figma.createFrame();
    b.name = `Item ${it.label}`;
    b.layoutMode = 'HORIZONTAL';
    b.primaryAxisAlignItems = 'CENTER';
    b.counterAxisAlignItems = 'CENTER';
    b.primaryAxisSizingMode = 'FIXED';
    b.counterAxisSizingMode = 'FIXED';
    b.resize(40, 40);
    if (it.on) { const v = findVariable('accent'); if (v) b.fills = [varPaint(v)]; } else { const v = findVariable('background'); if (v) b.fills = [varPaint(v)]; }
    if (border) { b.strokes = [varPaint(border)]; b.strokeWeight = 1; b.strokeAlign = 'INSIDE'; if (i > 0) b.strokeLeftWeight = 0; }
    b.topLeftRadius = i === 0 ? 6 : 0;
    b.bottomLeftRadius = i === 0 ? 6 : 0;
    b.topRightRadius = i === items.length - 1 ? 6 : 0;
    b.bottomRightRadius = i === items.length - 1 ? 6 : 0;
    const t = figma.createText();
    t.fontName = { family: 'Inter', style: 'Medium' };
    t.characters = it.label;
    t.fontSize = 14;
    const fg = findVariable(it.on ? 'accent-foreground' : 'foreground'); if (fg) t.fills = [varPaint(fg)];
    b.appendChild(t);
    comp.appendChild(b);
  });
  page.appendChild(comp);
}

async function gen_sonner(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Sonner';
  comp.description = 'Shadcn sonner toast. Compact notification card with a title, description, and an action button.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'AUTO';
  comp.counterAxisAlignItems = 'CENTER';
  comp.itemSpacing = 12;
  comp.paddingLeft = 16;
  comp.paddingRight = 16;
  comp.paddingTop = 14;
  comp.paddingBottom = 14;
  comp.cornerRadius = 8;
  comp.resize(360, 60);
  const bg = findVariable('popover'); if (bg) comp.fills = [varPaint(bg)];
  const border = findVariable('border'); if (border) { comp.strokes = [varPaint(border)]; comp.strokeWeight = 1; }

  const textCol = figma.createFrame();
  textCol.layoutMode = 'VERTICAL';
  textCol.primaryAxisSizingMode = 'AUTO';
  textCol.counterAxisSizingMode = 'AUTO';
  textCol.itemSpacing = 2;
  textCol.fills = [];
  textCol.layoutGrow = 1;
  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'Medium' };
  title.characters = 'Event created';
  title.fontSize = 14;
  const tfg = findVariable('popover-foreground'); if (tfg) title.fills = [varPaint(tfg)];
  const desc = figma.createText();
  desc.fontName = { family: 'Inter', style: 'Regular' };
  desc.characters = 'Monday, January 1 at 9:00 AM';
  desc.fontSize = 12;
  const dfg = findVariable('muted-foreground'); if (dfg) desc.fills = [varPaint(dfg)];
  textCol.appendChild(title);
  textCol.appendChild(desc);
  comp.appendChild(textCol);

  const action = figma.createFrame();
  action.layoutMode = 'HORIZONTAL';
  action.primaryAxisAlignItems = 'CENTER';
  action.counterAxisAlignItems = 'CENTER';
  action.primaryAxisSizingMode = 'AUTO';
  action.counterAxisSizingMode = 'FIXED';
  action.paddingLeft = 12;
  action.paddingRight = 12;
  action.resize(60, 32);
  action.cornerRadius = 6;
  const abg = findVariable('primary'); if (abg) action.fills = [varPaint(abg)];
  const at = figma.createText();
  at.fontName = { family: 'Inter', style: 'Medium' };
  at.characters = 'Undo';
  at.fontSize = 13;
  const afg = findVariable('primary-foreground'); if (afg) at.fills = [varPaint(afg)];
  action.appendChild(at);
  comp.appendChild(action);

  page.appendChild(comp);
}

async function gen_button_group(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Button Group';
  comp.description = 'Shadcn button group. Three outline buttons connected in a horizontal row sharing borders: first segment rounded-left, middle square, last rounded-right. Single static representation.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  comp.primaryAxisAlignItems = 'MIN';
  comp.counterAxisAlignItems = 'CENTER';
  comp.itemSpacing = 0;
  comp.fills = [];

  const borderVar = findVariable('input');
  const fgVar = findVariable('foreground');
  const bgVar = findVariable('background');

  const segments: { label: string; position: 'first' | 'middle' | 'last' }[] = [
    { label: 'Left', position: 'first' },
    { label: 'Center', position: 'middle' },
    { label: 'Right', position: 'last' },
  ];

  for (const seg of segments) {
    const button = figma.createFrame();
    button.name = `Segment ${seg.label}`;
    button.layoutMode = 'HORIZONTAL';
    button.primaryAxisSizingMode = 'AUTO';
    button.counterAxisSizingMode = 'FIXED';
    button.primaryAxisAlignItems = 'CENTER';
    button.counterAxisAlignItems = 'CENTER';
    button.paddingLeft = 16;
    button.paddingRight = 16;
    button.itemSpacing = 8;
    button.resize(100, 36);

    if (bgVar) {
      button.fills = [varPaint(bgVar)];
    } else {
      button.fills = [];
    }

    if (borderVar) {
      button.strokes = [varPaint(borderVar)];
      button.strokeWeight = 1;
      button.strokeAlign = 'INSIDE';
    }

    // Share borders: avoid double borders between adjacent segments by
    // removing the left stroke on middle and last segments. strokeAlign is
    // INSIDE so per-side stroke weights are honored.
    if (seg.position === 'first') {
      button.topLeftRadius = 6;
      button.bottomLeftRadius = 6;
      button.topRightRadius = 0;
      button.bottomRightRadius = 0;
    } else if (seg.position === 'middle') {
      button.topLeftRadius = 0;
      button.bottomLeftRadius = 0;
      button.topRightRadius = 0;
      button.bottomRightRadius = 0;
      if (borderVar) button.strokeLeftWeight = 0;
    } else {
      button.topLeftRadius = 0;
      button.bottomLeftRadius = 0;
      button.topRightRadius = 6;
      button.bottomRightRadius = 6;
      if (borderVar) button.strokeLeftWeight = 0;
    }

    const text = figma.createText();
    text.fontName = { family: 'Inter', style: 'Medium' };
    text.characters = seg.label;
    text.fontSize = 14;
    if (fgVar) text.fills = [varPaint(fgVar)];
    button.appendChild(text);

    comp.appendChild(button);
  }

  page.appendChild(comp);
}

async function gen_input(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const states: { name: string; border: string; placeholder: boolean; opacity: number; muted: boolean }[] = [
    { name: 'default', border: 'input', placeholder: true, opacity: 1, muted: false },
    { name: 'focused', border: 'ring', placeholder: false, opacity: 1, muted: false },
    { name: 'disabled', border: 'input', placeholder: true, opacity: 0.5, muted: true },
    { name: 'error', border: 'destructive', placeholder: true, opacity: 1, muted: false },
  ];
  const comps: ComponentNode[] = [];
  for (const state of states) {
    const comp = figma.createComponent();
    comp.name = `State=${state.name}`;
    comp.layoutMode = 'HORIZONTAL';
    comp.primaryAxisAlignItems = 'MIN';
    comp.counterAxisAlignItems = 'CENTER';
    comp.primaryAxisSizingMode = 'FIXED';
    comp.counterAxisSizingMode = 'FIXED';
    comp.paddingLeft = 12;
    comp.paddingRight = 12;
    comp.paddingTop = 0;
    comp.paddingBottom = 0;
    comp.itemSpacing = 8;
    comp.cornerRadius = 6;
    comp.resize(220, 40);

    const bgVar = findVariable(state.muted ? 'muted' : 'background');
    if (bgVar) comp.fills = [varPaint(bgVar)];

    const borderVar = findVariable(state.border);
    if (borderVar) {
      comp.strokes = [varPaint(borderVar)];
      comp.strokeWeight = 1;
    }

    comp.opacity = state.opacity;

    const text = figma.createText();
    text.fontName = { family: 'Inter', style: 'Regular' };
    text.fontSize = 14;
    text.characters = state.placeholder ? 'Placeholder' : 'Typed value';
    const fgVar = findVariable(state.placeholder ? 'muted-foreground' : 'foreground');
    if (fgVar) text.fills = [varPaint(fgVar)];
    text.layoutAlign = 'STRETCH';
    text.layoutGrow = 1;
    text.textAlignVertical = 'CENTER';
    comp.appendChild(text);

    comps.push(comp);
  }
  finalizeVariantSet(page, comps, 'Input', 'Shadcn input field. State: default, focused (ring stroke), disabled (muted bg, 50% opacity), error (destructive stroke). h-10, rounded-md, 1px border, px-3, placeholder text in muted-foreground.', states.length);
}

async function gen_textarea(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const states: { name: string; focused: boolean; disabled: boolean }[] = [
    { name: 'default', focused: false, disabled: false },
    { name: 'focused', focused: true, disabled: false },
    { name: 'disabled', focused: false, disabled: true },
  ];
  const comps: ComponentNode[] = [];
  for (const state of states) {
    const comp = figma.createComponent();
    comp.name = `State=${state.name}`;
    comp.layoutMode = 'VERTICAL';
    comp.primaryAxisAlignItems = 'MIN';
    comp.counterAxisAlignItems = 'MIN';
    comp.primaryAxisSizingMode = 'FIXED';
    comp.counterAxisSizingMode = 'FIXED';
    comp.paddingLeft = 12;
    comp.paddingRight = 12;
    comp.paddingTop = 8;
    comp.paddingBottom = 8;
    comp.cornerRadius = 6;
    comp.resize(320, 80);

    const bgVar = findVariable('background');
    if (bgVar) comp.fills = [varPaint(bgVar)];

    const borderVar = findVariable(state.focused ? 'ring' : 'input');
    if (borderVar) {
      comp.strokes = [varPaint(borderVar)];
      comp.strokeWeight = state.focused ? 2 : 1;
    }

    if (state.disabled) comp.opacity = 0.5;

    const text = figma.createText();
    text.fontName = { family: 'Inter', style: 'Regular' };
    text.fontSize = 14;
    text.characters = 'Type your message here.';
    text.layoutAlign = 'STRETCH';
    text.textAutoResize = 'HEIGHT';
    const fgVar = findVariable('muted-foreground');
    if (fgVar) text.fills = [varPaint(fgVar)];
    comp.appendChild(text);

    comps.push(comp);
  }
  finalizeVariantSet(page, comps, 'Textarea', 'Shadcn textarea. Multi-line text field with min-height 80px, rounded-md border, and top-aligned placeholder. State: default, focused (2px ring stroke), disabled (reduced opacity).', states.length);
}

async function gen_checkbox(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const checkedStates: boolean[] = [true, false];
  const states: { name: string; opacity: number }[] = [
    { name: 'default', opacity: 1 },
    { name: 'disabled', opacity: 0.5 },
  ];
  const comps: ComponentNode[] = [];
  for (const checked of checkedStates) {
    for (const state of states) {
      const comp = figma.createComponent();
      comp.name = `Checked=${checked}, State=${state.name}`;
      comp.layoutMode = 'HORIZONTAL';
      comp.primaryAxisAlignItems = 'CENTER';
      comp.counterAxisAlignItems = 'CENTER';
      comp.primaryAxisSizingMode = 'FIXED';
      comp.counterAxisSizingMode = 'FIXED';
      comp.cornerRadius = 4;
      comp.resize(16, 16);
      comp.opacity = state.opacity;
      if (checked) {
        const bg = findVariable('primary');
        if (bg) comp.fills = [varPaint(bg)];
        const borderV = findVariable('primary');
        if (borderV) { comp.strokes = [varPaint(borderV)]; comp.strokeWeight = 1; }
        const check = figma.createVector();
        check.name = 'Check';
        check.resize(11, 11);
        check.vectorPaths = [
          {
            windingRule: 'NONE',
            data: 'M 1.5 5.5 L 4.5 8.5 L 9.5 2.5',
          },
        ];
        check.fills = [];
        const fg = findVariable('primary-foreground');
        if (fg) { check.strokes = [varPaint(fg)]; }
        check.strokeWeight = 1.5;
        check.strokeCap = 'ROUND';
        check.strokeJoin = 'ROUND';
        comp.appendChild(check);
        check.layoutPositioning = 'ABSOLUTE';
        check.x = (comp.width - check.width) / 2;
        check.y = (comp.height - check.height) / 2;
      } else {
        const bg = findVariable('background');
        if (bg) comp.fills = [varPaint(bg)]; else comp.fills = [];
        const border = findVariable('input');
        if (border) { comp.strokes = [varPaint(border)]; comp.strokeWeight = 1; }
      }
      comps.push(comp);
    }
  }
  finalizeVariantSet(page, comps, 'Checkbox', 'Shadcn checkbox. 16x16 rounded square. Checked: true (filled primary with check-mark icon), false (empty with input border). State: default, disabled (reduced opacity).', states.length);
}

async function gen_switch(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const trackWidth = 36;
  const trackHeight = 20;
  const thumbSize = 16;
  const padding = 2;

  const states: { checked: boolean; track: string; thumb: string }[] = [
    { checked: false, track: 'input', thumb: 'background' },
    { checked: true, track: 'primary', thumb: 'primary-foreground' },
  ];

  const comps: ComponentNode[] = [];
  for (const state of states) {
    const comp = figma.createComponent();
    comp.name = `Checked=${state.checked}`;
    comp.layoutMode = 'HORIZONTAL';
    comp.primaryAxisSizingMode = 'FIXED';
    comp.counterAxisSizingMode = 'FIXED';
    comp.primaryAxisAlignItems = state.checked ? 'MAX' : 'MIN';
    comp.counterAxisAlignItems = 'CENTER';
    comp.paddingLeft = padding;
    comp.paddingRight = padding;
    comp.paddingTop = padding;
    comp.paddingBottom = padding;
    comp.cornerRadius = trackHeight / 2;
    comp.resize(trackWidth, trackHeight);

    const trackVar = findVariable(state.track);
    if (trackVar) comp.fills = [varPaint(trackVar)];

    const thumb = figma.createEllipse();
    thumb.resize(thumbSize, thumbSize);
    const thumbVar = findVariable(state.thumb);
    if (thumbVar) thumb.fills = [varPaint(thumbVar)];
    comp.appendChild(thumb);

    comps.push(comp);
  }

  finalizeVariantSet(page, comps, 'Switch', 'Shadcn switch toggle. Track is rounded-full (w-9 h-5) with a circular thumb. Checked: false (track uses input color, thumb left, thumb uses background color) or true (track uses primary color, thumb slides right, thumb uses primary-foreground color).', states.length);
}

async function gen_slider(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const TRACK_WIDTH = 200;
  const TRACK_HEIGHT = 6; // h-1.5
  const THUMB_SIZE = 16; // size-4
  const FILL_RATIO = 0.5;
  const RANGE_WIDTH = TRACK_WIDTH * FILL_RATIO;

  const comp = figma.createComponent();
  comp.name = 'Slider';
  comp.description = 'Shadcn slider. Full muted track (h-1.5, rounded-full), primary filled range at ~50%, and a 16px circular thumb (background fill, primary 2px border) positioned at the range end.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisAlignItems = 'MIN';
  comp.counterAxisAlignItems = 'CENTER';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.fills = [];
  comp.resize(TRACK_WIDTH, THUMB_SIZE);
  comp.clipsContent = false;

  // Track: full-width muted bar, auto-layout horizontal. Holds the filled range
  // as a layout child and the thumb as an absolutely-positioned overlay.
  const track = figma.createFrame();
  track.name = 'Track';
  track.layoutMode = 'HORIZONTAL';
  track.primaryAxisAlignItems = 'MIN';
  track.counterAxisAlignItems = 'CENTER';
  track.primaryAxisSizingMode = 'FIXED';
  track.counterAxisSizingMode = 'FIXED';
  track.paddingLeft = 0;
  track.paddingRight = 0;
  track.paddingTop = 0;
  track.paddingBottom = 0;
  track.itemSpacing = 0;
  track.resize(TRACK_WIDTH, TRACK_HEIGHT);
  track.cornerRadius = 9999;
  track.clipsContent = false;
  const mutedVar = findVariable('muted');
  if (mutedVar) track.fills = [varPaint(mutedVar)];
  comp.appendChild(track);

  // Filled range (primary) from left to ~50%, laid out by the track's auto-layout.
  const range = figma.createFrame();
  range.name = 'Range';
  range.layoutMode = 'HORIZONTAL';
  range.primaryAxisSizingMode = 'FIXED';
  range.counterAxisSizingMode = 'FIXED';
  range.itemSpacing = 0;
  range.resize(RANGE_WIDTH, TRACK_HEIGHT);
  range.cornerRadius = 9999;
  const primaryVar = findVariable('primary');
  if (primaryVar) range.fills = [varPaint(primaryVar)];
  track.appendChild(range);

  // Thumb: 16px circle, background fill, primary 2px border.
  // Absolutely positioned over the track, centered on the range end.
  const thumb = figma.createEllipse();
  thumb.name = 'Thumb';
  thumb.resize(THUMB_SIZE, THUMB_SIZE);
  const bgVar = findVariable('background');
  if (bgVar) thumb.fills = [varPaint(bgVar)];
  if (primaryVar) { thumb.strokes = [varPaint(primaryVar)]; thumb.strokeWeight = 2; }
  track.appendChild(thumb);
  thumb.layoutPositioning = 'ABSOLUTE';
  thumb.x = RANGE_WIDTH - THUMB_SIZE / 2;
  thumb.y = (TRACK_HEIGHT - THUMB_SIZE) / 2;

  page.appendChild(comp);
}

async function gen_label(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Label';
  comp.description = 'Shadcn label. A text-sm (14px) Medium weight label bound to the foreground token, used to caption form controls.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisAlignItems = 'CENTER';
  comp.counterAxisAlignItems = 'CENTER';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  comp.itemSpacing = 8;
  comp.fills = [];

  const text = figma.createText();
  text.fontName = { family: 'Inter', style: 'Medium' };
  text.characters = 'Label';
  text.fontSize = 14;
  const fg = findVariable('foreground');
  if (fg) text.fills = [varPaint(fg)];
  comp.appendChild(text);

  page.appendChild(comp);
}

async function gen_radio_group(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const states: { selected: boolean }[] = [
    { selected: false },
    { selected: true },
  ];
  const comps: ComponentNode[] = [];
  for (const state of states) {
    const comp = figma.createComponent();
    comp.name = `Selected=${state.selected ? 'true' : 'false'}`;
    comp.layoutMode = 'HORIZONTAL';
    comp.primaryAxisAlignItems = 'CENTER';
    comp.counterAxisAlignItems = 'CENTER';
    comp.primaryAxisSizingMode = 'FIXED';
    comp.counterAxisSizingMode = 'FIXED';
    comp.resize(16, 16);
    comp.cornerRadius = 9999;
    comp.fills = [];
    const borderVar = findVariable(state.selected ? 'primary' : 'input');
    if (borderVar) { comp.strokes = [varPaint(borderVar)]; comp.strokeWeight = 1; }

    if (state.selected) {
      const dot = figma.createEllipse();
      dot.resize(7, 7);
      const dotVar = findVariable('primary');
      if (dotVar) dot.fills = [varPaint(dotVar)];
      dot.strokes = [];
      comp.appendChild(dot);
    }
    comps.push(comp);
  }
  finalizeVariantSet(page, comps, 'Radio Group', 'Shadcn radio group item. A 16px circular control with a 1px border (input when unselected, primary when selected). Selected state shows an inner primary-colored dot. Property: Selected (true, false).', states.length);
}

async function gen_select(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Select';
  comp.description = 'Shadcn select trigger. Single representative instance: h-10 trigger button, rounded-md border bound to the input token, selected value text (foreground) on the left and a chevron-down icon (muted-foreground) on the right.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisAlignItems = 'SPACE_BETWEEN';
  comp.counterAxisAlignItems = 'CENTER';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.paddingLeft = 12;
  comp.paddingRight = 12;
  comp.paddingTop = 8;
  comp.paddingBottom = 8;
  comp.itemSpacing = 8;
  comp.cornerRadius = 6;
  comp.resize(220, 40);

  const bg = findVariable('background');
  if (bg) comp.fills = [varPaint(bg)];
  const border = findVariable('input');
  if (border) {
    comp.strokes = [varPaint(border)];
    comp.strokeWeight = 1;
  }

  const value = figma.createText();
  value.fontName = { family: 'Inter', style: 'Regular' };
  value.characters = 'Select a fruit';
  value.fontSize = 14;
  const fg = findVariable('foreground');
  if (fg) value.fills = [varPaint(fg)];
  comp.appendChild(value);

  const icon = figma.createVector();
  icon.name = 'chevron-down';
  icon.resize(16, 16);
  icon.strokeWeight = 1.5;
  icon.strokeCap = 'ROUND';
  icon.strokeJoin = 'ROUND';
  icon.fills = [];
  const iconColor = findVariable('muted-foreground');
  if (iconColor) icon.strokes = [varPaint(iconColor)];
  await icon.setVectorNetworkAsync({
    vertices: [
      { x: 4, y: 6, strokeCap: 'ROUND', strokeJoin: 'ROUND', cornerRadius: 0, handleMirroring: 'NONE' },
      { x: 8, y: 10, strokeCap: 'ROUND', strokeJoin: 'ROUND', cornerRadius: 0, handleMirroring: 'NONE' },
      { x: 12, y: 6, strokeCap: 'ROUND', strokeJoin: 'ROUND', cornerRadius: 0, handleMirroring: 'NONE' },
    ],
    segments: [
      { start: 0, end: 1, tangentStart: { x: 0, y: 0 }, tangentEnd: { x: 0, y: 0 } },
      { start: 1, end: 2, tangentStart: { x: 0, y: 0 }, tangentEnd: { x: 0, y: 0 } },
    ],
    regions: [],
  });
  comp.appendChild(icon);
  icon.layoutSizingHorizontal = 'FIXED';
  icon.layoutSizingVertical = 'FIXED';
  icon.resize(16, 16);

  page.appendChild(comp);
}

async function gen_native_select(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Native Select';
  comp.description = 'Shadcn native-style select trigger. A bordered control (h-10, rounded-md, border=input) showing the selected value text and a chevron-down indicator, mimicking the browser-native <select> element.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisAlignItems = 'MIN';
  comp.counterAxisAlignItems = 'CENTER';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.paddingLeft = 12;
  comp.paddingRight = 12;
  comp.paddingTop = 0;
  comp.paddingBottom = 0;
  comp.itemSpacing = 8;
  comp.cornerRadius = 6;
  comp.resize(220, 40);

  const bg = findVariable('background');
  if (bg) comp.fills = [varPaint(bg)];
  const inputBorder = findVariable('input');
  if (inputBorder) { comp.strokes = [varPaint(inputBorder)]; comp.strokeWeight = 1; }

  const label = figma.createText();
  label.fontName = { family: 'Inter', style: 'Regular' };
  label.characters = 'Select an option';
  label.fontSize = 14;
  label.textAlignHorizontal = 'LEFT';
  const fg = findVariable('foreground');
  if (fg) label.fills = [varPaint(fg)];
  comp.appendChild(label);
  label.layoutSizingHorizontal = 'FILL';

  // Chevron-down icon: a fixed 16x16 auto-layout frame centering a "v" vector.
  const icon = figma.createFrame();
  icon.name = 'ChevronDown';
  icon.layoutMode = 'HORIZONTAL';
  icon.primaryAxisAlignItems = 'CENTER';
  icon.counterAxisAlignItems = 'CENTER';
  icon.primaryAxisSizingMode = 'FIXED';
  icon.counterAxisSizingMode = 'FIXED';
  icon.fills = [];
  icon.clipsContent = false;
  icon.resize(16, 16);

  const chevron = figma.createVector();
  chevron.name = 'chevron';
  chevron.vectorPaths = [{
    windingRule: 'NONE',
    data: 'M 4 6 L 8 10 L 12 6',
  }];
  chevron.strokeWeight = 1.5;
  chevron.strokeCap = 'ROUND';
  chevron.strokeJoin = 'ROUND';
  chevron.fills = [];
  const muted = findVariable('muted-foreground');
  if (muted) chevron.strokes = [varPaint(muted)];
  icon.appendChild(chevron);

  comp.appendChild(icon);

  page.appendChild(comp);
}

async function gen_combobox(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Combobox';
  comp.description = 'Shadcn combobox trigger button. Select-style: fixed width, h-9 (36px), rounded-md, 1px input border, selected value text on the left and a chevron-down icon on the right. Background: popover. Built as a single representative trigger.';

  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisAlignItems = 'MIN';
  comp.counterAxisAlignItems = 'CENTER';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.paddingLeft = 12;
  comp.paddingRight = 12;
  comp.itemSpacing = 8;
  comp.cornerRadius = 6;
  comp.resize(220, 36);

  const bg = findVariable('popover');
  if (bg) comp.fills = [varPaint(bg)];
  const borderVar = findVariable('input');
  if (borderVar) { comp.strokes = [varPaint(borderVar)]; comp.strokeWeight = 1; }

  // Selected value label (grows to fill available space)
  const label = figma.createText();
  label.fontName = { family: 'Inter', style: 'Regular' };
  label.characters = 'Select framework...';
  label.fontSize = 14;
  const fg = findVariable('foreground');
  if (fg) label.fills = [varPaint(fg)];
  comp.appendChild(label);
  label.layoutGrow = 1;
  label.layoutAlign = 'STRETCH';

  // Chevron-down icon (drawn with a vector, muted-foreground stroke)
  const icon = figma.createVector();
  icon.name = 'chevron-down';
  icon.resize(16, 16);
  icon.strokeWeight = 1.5;
  icon.strokeCap = 'ROUND';
  icon.strokeJoin = 'ROUND';
  icon.fills = [];
  const iconColor = findVariable('muted-foreground');
  if (iconColor) icon.strokes = [varPaint(iconColor)];
  await icon.setVectorNetworkAsync({
    vertices: [
      { x: 4, y: 6 },
      { x: 8, y: 10 },
      { x: 12, y: 6 },
    ],
    segments: [
      { start: 0, end: 1 },
      { start: 1, end: 2 },
    ],
    regions: [],
  });
  comp.appendChild(icon);

  page.appendChild(comp);
}

async function gen_date_picker(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Date Picker';
  comp.description = 'Shadcn date-picker. A trigger button (h-10=40, px-3, rounded-md, border=input, bg=background) containing a lucide-style calendar icon and a muted-foreground placeholder date label. Single representative instance of the popover trigger.';

  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisAlignItems = 'MIN';
  comp.counterAxisAlignItems = 'CENTER';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.paddingLeft = 12;
  comp.paddingRight = 12;
  comp.itemSpacing = 8;
  comp.cornerRadius = 6;
  comp.resize(280, 40);

  const bg = findVariable('background');
  if (bg) comp.fills = [varPaint(bg)];
  const border = findVariable('input');
  if (border) { comp.strokes = [varPaint(border)]; comp.strokeWeight = 1; }

  // Calendar icon (lucide-style): outer rounded rect + top binding posts + header divider line.
  const icon = figma.createFrame();
  icon.name = 'calendar-icon';
  icon.layoutMode = 'NONE';
  icon.resize(16, 16);
  icon.fills = [];
  icon.clipsContent = false;

  const mutedFg = findVariable('muted-foreground');

  const body = figma.createRectangle();
  body.name = 'body';
  body.resize(13, 12);
  body.x = 1.5;
  body.y = 2.5;
  body.cornerRadius = 2;
  body.fills = [];
  if (mutedFg) { body.strokes = [varPaint(mutedFg)]; body.strokeWeight = 1.4; }
  icon.appendChild(body);

  const headerLine = figma.createRectangle();
  headerLine.name = 'header-line';
  headerLine.resize(13, 1.4);
  headerLine.x = 1.5;
  headerLine.y = 6;
  if (mutedFg) headerLine.fills = [varPaint(mutedFg)];
  icon.appendChild(headerLine);

  const postLeft = figma.createRectangle();
  postLeft.name = 'post-left';
  postLeft.resize(1.4, 3);
  postLeft.x = 4.5;
  postLeft.y = 1;
  postLeft.cornerRadius = 0.7;
  if (mutedFg) postLeft.fills = [varPaint(mutedFg)];
  icon.appendChild(postLeft);

  const postRight = figma.createRectangle();
  postRight.name = 'post-right';
  postRight.resize(1.4, 3);
  postRight.x = 10;
  postRight.y = 1;
  postRight.cornerRadius = 0.7;
  if (mutedFg) postRight.fills = [varPaint(mutedFg)];
  icon.appendChild(postRight);

  comp.appendChild(icon);
  icon.layoutSizingHorizontal = 'FIXED';
  icon.layoutSizingVertical = 'FIXED';

  const label = figma.createText();
  label.fontName = { family: 'Inter', style: 'Regular' };
  label.characters = 'Pick a date';
  label.fontSize = 14;
  if (mutedFg) label.fills = [varPaint(mutedFg)];
  comp.appendChild(label);
  label.layoutGrow = 1;

  page.appendChild(comp);
}

async function gen_input_otp(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Input OTP';
  comp.description = 'Shadcn input-otp. A row of 6 square slots (40x40, input border, rounded-md) split into two groups of 3 with a middle separator. The first slot shows a digit with a blinking caret to indicate the active/focused position.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  comp.primaryAxisAlignItems = 'CENTER';
  comp.counterAxisAlignItems = 'CENTER';
  comp.itemSpacing = 8;
  comp.fills = [];

  const borderVar = findVariable('input');
  const ringVar = findVariable('ring');
  const fgVar = findVariable('foreground');

  const slotContents: string[] = ['1', '', '', '', '', ''];

  const makeGroup = (startIndex: number): FrameNode => {
    const group = figma.createFrame();
    group.name = 'Group';
    group.layoutMode = 'HORIZONTAL';
    group.primaryAxisSizingMode = 'AUTO';
    group.counterAxisSizingMode = 'AUTO';
    group.primaryAxisAlignItems = 'CENTER';
    group.counterAxisAlignItems = 'CENTER';
    group.itemSpacing = 0;
    group.fills = [];

    for (let i = 0; i < 3; i++) {
      const index = startIndex + i;
      const isFirstInRow = i === 0;
      const isLastInRow = i === 2;
      const isActive = index === 0;

      const slot = figma.createFrame();
      slot.name = `Slot ${index + 1}`;
      slot.layoutMode = 'HORIZONTAL';
      slot.primaryAxisSizingMode = 'FIXED';
      slot.counterAxisSizingMode = 'FIXED';
      slot.primaryAxisAlignItems = 'CENTER';
      slot.counterAxisAlignItems = 'CENTER';
      slot.resize(40, 40);
      slot.fills = [];

      // Group has rounded outer corners; slots share borders within a group.
      slot.topLeftRadius = isFirstInRow ? 6 : 0;
      slot.bottomLeftRadius = isFirstInRow ? 6 : 0;
      slot.topRightRadius = isLastInRow ? 6 : 0;
      slot.bottomRightRadius = isLastInRow ? 6 : 0;

      const strokeVar: Variable | undefined = isActive && ringVar ? ringVar : borderVar;
      if (strokeVar) {
        slot.strokes = [varPaint(strokeVar)];
        slot.strokeWeight = 1;
        slot.strokeAlign = 'INSIDE';
        // Avoid doubled internal borders: only the first slot draws its left edge.
        slot.strokeLeftWeight = isFirstInRow ? 1 : 0;
        slot.strokeTopWeight = 1;
        slot.strokeRightWeight = 1;
        slot.strokeBottomWeight = 1;
      }

      const content = slotContents[index];
      if (content) {
        const text = figma.createText();
        text.fontName = { family: 'Inter', style: 'Regular' };
        text.characters = content;
        text.fontSize = 14;
        if (fgVar) text.fills = [varPaint(fgVar)];
        slot.appendChild(text);
      } else if (isActive) {
        const caret = figma.createRectangle();
        caret.name = 'Caret';
        caret.resize(1, 16);
        if (fgVar) caret.fills = [varPaint(fgVar)];
        slot.appendChild(caret);
      }

      group.appendChild(slot);
    }
    return group;
  };

  comp.appendChild(makeGroup(0));

  const separator = figma.createFrame();
  separator.name = 'Separator';
  separator.layoutMode = 'HORIZONTAL';
  separator.primaryAxisSizingMode = 'FIXED';
  separator.counterAxisSizingMode = 'FIXED';
  separator.primaryAxisAlignItems = 'CENTER';
  separator.counterAxisAlignItems = 'CENTER';
  separator.resize(16, 40);
  separator.fills = [];
  const dash = figma.createRectangle();
  dash.name = 'Dash';
  dash.resize(8, 1);
  if (borderVar) dash.fills = [varPaint(borderVar)];
  separator.appendChild(dash);
  comp.appendChild(separator);

  comp.appendChild(makeGroup(3));

  page.appendChild(comp);
}

async function gen_field(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Field';
  comp.description = 'Shadcn field. Vertical stack of a Label, an Input control, and muted helper/description text. Used to group a single form control with its label and supporting copy.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.itemSpacing = 8;
  comp.resize(320, 100);
  const bg = findVariable('background');
  if (bg) comp.fills = [varPaint(bg)];

  // Label
  const label = figma.createText();
  label.fontName = { family: 'Inter', style: 'Medium' };
  label.characters = 'Email';
  label.fontSize = 14;
  const labelFg = findVariable('foreground');
  if (labelFg) label.fills = [varPaint(labelFg)];
  comp.appendChild(label);

  // Input control
  const input = figma.createFrame();
  input.name = 'Input';
  input.layoutMode = 'HORIZONTAL';
  input.primaryAxisAlignItems = 'MIN';
  input.counterAxisAlignItems = 'CENTER';
  input.primaryAxisSizingMode = 'FIXED';
  input.counterAxisSizingMode = 'FIXED';
  input.layoutAlign = 'STRETCH';
  input.paddingLeft = 12;
  input.paddingRight = 12;
  input.itemSpacing = 8;
  input.cornerRadius = 6;
  input.resize(320, 36);
  const inputBg = findVariable('background');
  if (inputBg) input.fills = [varPaint(inputBg)];
  const inputBorder = findVariable('input');
  if (inputBorder) { input.strokes = [varPaint(inputBorder)]; input.strokeWeight = 1; }
  const placeholder = figma.createText();
  placeholder.fontName = { family: 'Inter', style: 'Regular' };
  placeholder.characters = 'm@example.com';
  placeholder.fontSize = 14;
  const placeholderFg = findVariable('muted-foreground');
  if (placeholderFg) placeholder.fills = [varPaint(placeholderFg)];
  input.appendChild(placeholder);
  comp.appendChild(input);

  // Helper / description text
  const helper = figma.createText();
  helper.fontName = { family: 'Inter', style: 'Regular' };
  helper.characters = 'Enter the email address you want to use.';
  helper.fontSize = 12;
  helper.layoutAlign = 'STRETCH';
  const helperFg = findVariable('muted-foreground');
  if (helperFg) helper.fills = [varPaint(helperFg)];
  comp.appendChild(helper);

  page.appendChild(comp);
}

async function gen_card(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Card';
  comp.description = 'Shadcn card. Bordered rounded-lg container (border, padding 24, gap 24) composed of CardHeader (SemiBold title + muted-foreground description), CardContent body text, and CardFooter with a primary button.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.paddingTop = 24;
  comp.paddingRight = 24;
  comp.paddingBottom = 24;
  comp.paddingLeft = 24;
  comp.itemSpacing = 24;
  comp.cornerRadius = 8;
  comp.resize(360, 100);

  const cardBg = findVariable('card');
  if (cardBg) comp.fills = [varPaint(cardBg)];
  const cardBorder = findVariable('border');
  if (cardBorder) { comp.strokes = [varPaint(cardBorder)]; comp.strokeWeight = 1; }

  const cardFg = findVariable('card-foreground');
  const mutedFg = findVariable('muted-foreground');

  // CardHeader: title + description
  const header = figma.createFrame();
  header.name = 'CardHeader';
  header.layoutMode = 'VERTICAL';
  header.primaryAxisSizingMode = 'AUTO';
  header.counterAxisSizingMode = 'FIXED';
  header.layoutAlign = 'STRETCH';
  header.itemSpacing = 6;
  header.fills = [];

  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'SemiBold' };
  title.characters = 'Card Title';
  title.fontSize = 16;
  title.lineHeight = { value: 24, unit: 'PIXELS' };
  title.layoutAlign = 'STRETCH';
  title.textAutoResize = 'HEIGHT';
  if (cardFg) title.fills = [varPaint(cardFg)];
  header.appendChild(title);

  const description = figma.createText();
  description.fontName = { family: 'Inter', style: 'Regular' };
  description.characters = 'Card description goes here.';
  description.fontSize = 14;
  description.lineHeight = { value: 20, unit: 'PIXELS' };
  description.layoutAlign = 'STRETCH';
  description.textAutoResize = 'HEIGHT';
  if (mutedFg) description.fills = [varPaint(mutedFg)];
  header.appendChild(description);

  comp.appendChild(header);

  // CardContent: body text
  const content = figma.createFrame();
  content.name = 'CardContent';
  content.layoutMode = 'VERTICAL';
  content.primaryAxisSizingMode = 'AUTO';
  content.counterAxisSizingMode = 'FIXED';
  content.layoutAlign = 'STRETCH';
  content.itemSpacing = 8;
  content.fills = [];

  const body = figma.createText();
  body.fontName = { family: 'Inter', style: 'Regular' };
  body.characters = 'Card content provides the main area for details, forms, or other information.';
  body.fontSize = 14;
  body.lineHeight = { value: 20, unit: 'PIXELS' };
  body.layoutAlign = 'STRETCH';
  body.textAutoResize = 'HEIGHT';
  if (cardFg) body.fills = [varPaint(cardFg)];
  content.appendChild(body);

  comp.appendChild(content);

  // CardFooter: primary button
  const footer = figma.createFrame();
  footer.name = 'CardFooter';
  footer.layoutMode = 'HORIZONTAL';
  footer.primaryAxisSizingMode = 'AUTO';
  footer.counterAxisSizingMode = 'AUTO';
  footer.layoutAlign = 'STRETCH';
  footer.primaryAxisAlignItems = 'MIN';
  footer.counterAxisAlignItems = 'CENTER';
  footer.itemSpacing = 8;
  footer.fills = [];

  const button = figma.createFrame();
  button.name = 'Button';
  button.layoutMode = 'HORIZONTAL';
  button.primaryAxisSizingMode = 'AUTO';
  button.counterAxisSizingMode = 'FIXED';
  button.primaryAxisAlignItems = 'CENTER';
  button.counterAxisAlignItems = 'CENTER';
  button.paddingLeft = 16;
  button.paddingRight = 16;
  button.itemSpacing = 8;
  button.cornerRadius = 6;
  button.resize(100, 40);
  const primary = findVariable('primary');
  if (primary) button.fills = [varPaint(primary)];

  const buttonText = figma.createText();
  buttonText.fontName = { family: 'Inter', style: 'Medium' };
  buttonText.characters = 'Action';
  buttonText.fontSize = 14;
  const primaryFg = findVariable('primary-foreground');
  if (primaryFg) buttonText.fills = [varPaint(primaryFg)];
  button.appendChild(buttonText);

  footer.appendChild(button);
  comp.appendChild(footer);

  page.appendChild(comp);
}

async function gen_badge(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const variants: { name: string; bg: string | null; fg: string; border: string | null }[] = [
    { name: 'default', bg: 'primary', fg: 'primary-foreground', border: null },
    { name: 'secondary', bg: 'secondary', fg: 'secondary-foreground', border: null },
    { name: 'destructive', bg: 'destructive', fg: 'destructive-foreground', border: null },
    { name: 'outline', bg: null, fg: 'foreground', border: 'border' },
  ];
  const comps: ComponentNode[] = [];
  for (const variant of variants) {
    const comp = figma.createComponent();
    comp.name = `Variant=${variant.name}`;
    comp.layoutMode = 'HORIZONTAL';
    comp.primaryAxisAlignItems = 'CENTER';
    comp.counterAxisAlignItems = 'CENTER';
    comp.primaryAxisSizingMode = 'AUTO';
    comp.counterAxisSizingMode = 'AUTO';
    comp.paddingLeft = 10;
    comp.paddingRight = 10;
    comp.paddingTop = 2;
    comp.paddingBottom = 2;
    comp.itemSpacing = 4;
    comp.cornerRadius = 9999;
    if (variant.bg) {
      const v = findVariable(variant.bg);
      if (v) comp.fills = [varPaint(v)];
    } else {
      comp.fills = [];
    }
    if (variant.border) {
      const v = findVariable(variant.border);
      if (v) {
        comp.strokes = [varPaint(v)];
        comp.strokeWeight = 1;
      }
    }
    const text = figma.createText();
    text.fontName = { family: 'Inter', style: 'Medium' };
    text.characters = 'Badge';
    text.fontSize = 12;
    const fg = findVariable(variant.fg);
    if (fg) text.fills = [varPaint(fg)];
    comp.appendChild(text);
    comps.push(comp);
  }
  finalizeVariantSet(page, comps, 'Badge', 'Shadcn badge. Small pill (rounded-full, px-2.5 py-0.5, text-xs Medium). Variant: default, secondary, destructive, outline.', Math.min(4, variants.length));
}

async function gen_alert(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const variants: { name: string; fg: string; border: string; icon: string }[] = [
    { name: 'default', fg: 'foreground', border: 'border', icon: 'foreground' },
    { name: 'destructive', fg: 'destructive', border: 'destructive', icon: 'destructive' },
  ];

  const comps: ComponentNode[] = [];

  for (const variant of variants) {
    const comp = figma.createComponent();
    comp.name = `Variant=${variant.name}`;
    comp.layoutMode = 'HORIZONTAL';
    comp.primaryAxisSizingMode = 'FIXED';
    comp.counterAxisSizingMode = 'AUTO';
    comp.counterAxisAlignItems = 'MIN';
    comp.paddingLeft = 16;
    comp.paddingRight = 16;
    comp.paddingTop = 16;
    comp.paddingBottom = 16;
    comp.itemSpacing = 12;
    comp.cornerRadius = 8;
    comp.resize(420, 100);

    const bg = findVariable('background');
    if (bg) comp.fills = [varPaint(bg)];
    const borderVar = findVariable(variant.border);
    if (borderVar) {
      comp.strokes = [varPaint(borderVar)];
      comp.strokeWeight = 1;
    }

    // Leading icon: a circle with an exclamation, drawn as positioned primitives.
    const iconFrame = figma.createFrame();
    iconFrame.name = 'Icon';
    iconFrame.layoutMode = 'NONE';
    iconFrame.resize(16, 16);
    iconFrame.fills = [];
    iconFrame.clipsContent = false;
    iconFrame.layoutAlign = 'INHERIT';

    const iconColorVar = findVariable(variant.icon);

    const ring = figma.createEllipse();
    ring.name = 'Ring';
    ring.resize(16, 16);
    ring.fills = [];
    if (iconColorVar) {
      ring.strokes = [varPaint(iconColorVar)];
      ring.strokeWeight = 1.5;
    }
    iconFrame.appendChild(ring);

    const stem = figma.createRectangle();
    stem.name = 'Stem';
    stem.resize(1.5, 5);
    stem.x = 7.25;
    stem.y = 3.5;
    stem.cornerRadius = 1;
    if (iconColorVar) stem.fills = [varPaint(iconColorVar)];
    iconFrame.appendChild(stem);

    const dot = figma.createEllipse();
    dot.name = 'Dot';
    dot.resize(1.5, 1.5);
    dot.x = 7.25;
    dot.y = 10.5;
    if (iconColorVar) dot.fills = [varPaint(iconColorVar)];
    iconFrame.appendChild(dot);

    comp.appendChild(iconFrame);

    // Text column: title (SemiBold) + description.
    const textCol = figma.createFrame();
    textCol.name = 'Content';
    textCol.layoutMode = 'VERTICAL';
    textCol.primaryAxisSizingMode = 'AUTO';
    textCol.counterAxisSizingMode = 'AUTO';
    textCol.layoutGrow = 1;
    textCol.itemSpacing = 4;
    textCol.fills = [];

    const title = figma.createText();
    title.name = 'Title';
    title.fontName = { family: 'Inter', style: 'SemiBold' };
    title.characters = variant.name === 'destructive' ? 'Something went wrong' : 'Heads up!';
    title.fontSize = 14;
    title.lineHeight = { value: 16, unit: 'PIXELS' };
    title.textAutoResize = 'HEIGHT';
    title.layoutAlign = 'STRETCH';
    const titleFg = findVariable(variant.fg);
    if (titleFg) title.fills = [varPaint(titleFg)];
    textCol.appendChild(title);

    const desc = figma.createText();
    desc.name = 'Description';
    desc.fontName = { family: 'Inter', style: 'Regular' };
    desc.characters = variant.name === 'destructive'
      ? 'Your session has expired. Please log in again.'
      : 'You can add components to your app using the cli.';
    desc.fontSize = 14;
    desc.lineHeight = { value: 20, unit: 'PIXELS' };
    desc.textAutoResize = 'HEIGHT';
    desc.layoutAlign = 'STRETCH';
    const descFg = findVariable(variant.name === 'destructive' ? 'destructive' : 'muted-foreground');
    if (descFg) desc.fills = [varPaint(descFg)];
    textCol.appendChild(desc);

    comp.appendChild(textCol);

    comps.push(comp);
  }

  finalizeVariantSet(
    page,
    comps,
    'Alert',
    'Shadcn alert. Variant: default, destructive. Row layout with a leading icon and a stacked title (SemiBold) and description. 1px border, rounded-lg (8), padding 16, gap 12.',
    1,
  );
}

async function gen_alert_dialog(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'AlertDialog';
  comp.description = 'Shadcn alert-dialog. A centered modal dialog card with title, description, and a footer row of Cancel (outline) and Action (primary) buttons.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.primaryAxisAlignItems = 'MIN';
  comp.counterAxisAlignItems = 'MIN';
  comp.paddingTop = 24;
  comp.paddingBottom = 24;
  comp.paddingLeft = 24;
  comp.paddingRight = 24;
  comp.itemSpacing = 16;
  comp.cornerRadius = 8;
  comp.resize(512, 100);

  const bgVar = findVariable('background');
  if (bgVar) comp.fills = [varPaint(bgVar)];
  const borderVar = findVariable('border');
  if (borderVar) { comp.strokes = [varPaint(borderVar)]; comp.strokeWeight = 1; }
  comp.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.15 },
    offset: { x: 0, y: 8 },
    radius: 24,
    spread: 0,
    visible: true,
    blendMode: 'NORMAL',
  }];

  // Header (title + description)
  const header = figma.createFrame();
  header.name = 'Header';
  header.layoutMode = 'VERTICAL';
  header.primaryAxisSizingMode = 'AUTO';
  header.counterAxisSizingMode = 'FIXED';
  header.layoutAlign = 'STRETCH';
  header.itemSpacing = 8;
  header.fills = [];

  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'SemiBold' };
  title.characters = 'Are you absolutely sure?';
  title.fontSize = 18;
  title.layoutAlign = 'STRETCH';
  title.textAutoResize = 'HEIGHT';
  const fgVar = findVariable('foreground');
  if (fgVar) title.fills = [varPaint(fgVar)];
  header.appendChild(title);

  const desc = figma.createText();
  desc.fontName = { family: 'Inter', style: 'Regular' };
  desc.characters = 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.';
  desc.fontSize = 14;
  desc.layoutAlign = 'STRETCH';
  desc.textAutoResize = 'HEIGHT';
  const mutedVar = findVariable('muted-foreground');
  if (mutedVar) desc.fills = [varPaint(mutedVar)];
  header.appendChild(desc);

  comp.appendChild(header);

  // Footer (buttons)
  const footer = figma.createFrame();
  footer.name = 'Footer';
  footer.layoutMode = 'HORIZONTAL';
  footer.primaryAxisSizingMode = 'FIXED';
  footer.counterAxisSizingMode = 'AUTO';
  footer.primaryAxisAlignItems = 'MAX';
  footer.counterAxisAlignItems = 'CENTER';
  footer.layoutAlign = 'STRETCH';
  footer.itemSpacing = 8;
  footer.paddingTop = 8;
  footer.fills = [];

  const makeButton = (label: string, bgToken: string | null, fgToken: string, borderToken: string | null): FrameNode => {
    const btn = figma.createFrame();
    btn.name = label;
    btn.layoutMode = 'HORIZONTAL';
    btn.primaryAxisSizingMode = 'AUTO';
    btn.counterAxisSizingMode = 'FIXED';
    btn.primaryAxisAlignItems = 'CENTER';
    btn.counterAxisAlignItems = 'CENTER';
    btn.paddingLeft = 16;
    btn.paddingRight = 16;
    btn.itemSpacing = 8;
    btn.cornerRadius = 6;
    btn.resize(100, 36);
    if (bgToken) { const v = findVariable(bgToken); if (v) btn.fills = [varPaint(v)]; } else { btn.fills = []; }
    if (borderToken) { const v = findVariable(borderToken); if (v) { btn.strokes = [varPaint(v)]; btn.strokeWeight = 1; } }
    const t = figma.createText();
    t.fontName = { family: 'Inter', style: 'Medium' };
    t.characters = label;
    t.fontSize = 14;
    const v = findVariable(fgToken); if (v) t.fills = [varPaint(v)];
    btn.appendChild(t);
    return btn;
  };

  const cancelBtn = makeButton('Cancel', null, 'foreground', 'input');
  const actionBtn = makeButton('Continue', 'primary', 'primary-foreground', null);
  footer.appendChild(cancelBtn);
  footer.appendChild(actionBtn);

  comp.appendChild(footer);

  page.appendChild(comp);
}

async function gen_avatar(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const sizes: { name: string; size: number; fontSize: number }[] = [
    { name: 'sm', size: 32, fontSize: 12 },
    { name: 'default', size: 40, fontSize: 14 },
    { name: 'lg', size: 48, fontSize: 16 },
  ];
  const types: { name: string; isImage: boolean }[] = [
    { name: 'image', isImage: true },
    { name: 'fallback', isImage: false },
  ];
  const comps: ComponentNode[] = [];
  for (const type of types) {
    for (const size of sizes) {
      const comp = figma.createComponent();
      comp.name = `Type=${type.name}, Size=${size.name}`;
      comp.layoutMode = 'HORIZONTAL';
      comp.primaryAxisAlignItems = 'CENTER';
      comp.counterAxisAlignItems = 'CENTER';
      comp.primaryAxisSizingMode = 'FIXED';
      comp.counterAxisSizingMode = 'FIXED';
      comp.resize(size.size, size.size);
      comp.cornerRadius = size.size / 2;
      comp.clipsContent = true;
      if (type.isImage) {
        const bg = findVariable('muted');
        if (bg) comp.fills = [varPaint(bg)];
        const circle = figma.createEllipse();
        circle.resize(size.size, size.size);
        const fillVar = findVariable('muted-foreground');
        if (fillVar) circle.fills = [varPaint(fillVar)];
        comp.appendChild(circle);
      } else {
        const bg = findVariable('muted');
        if (bg) comp.fills = [varPaint(bg)];
        const text = figma.createText();
        text.fontName = { family: 'Inter', style: 'Medium' };
        text.characters = 'CN';
        text.fontSize = size.fontSize;
        const fg = findVariable('muted-foreground');
        if (fg) text.fills = [varPaint(fg)];
        comp.appendChild(text);
      }
      comps.push(comp);
    }
  }
  finalizeVariantSet(page, comps, 'Avatar', 'Shadcn avatar. Type: image (filled circle), fallback (initials on muted). Size: sm (32), default (40), lg (48). Circular rounded-full container.', sizes.length);
}

async function gen_separator(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const orientations: { name: string; horizontal: boolean }[] = [
    { name: 'horizontal', horizontal: true },
    { name: 'vertical', horizontal: false },
  ];
  const comps: ComponentNode[] = [];
  for (const orientation of orientations) {
    const comp = figma.createComponent();
    comp.name = `Orientation=${orientation.name}`;
    comp.layoutMode = orientation.horizontal ? 'HORIZONTAL' : 'VERTICAL';
    comp.primaryAxisAlignItems = 'CENTER';
    comp.counterAxisAlignItems = 'CENTER';
    comp.primaryAxisSizingMode = 'FIXED';
    comp.counterAxisSizingMode = 'FIXED';
    comp.itemSpacing = 0;
    comp.fills = [];
    if (orientation.horizontal) {
      comp.resize(256, 1);
    } else {
      comp.resize(1, 80);
    }

    const line = figma.createRectangle();
    line.name = 'Line';
    if (orientation.horizontal) {
      line.resize(256, 1);
    } else {
      line.resize(1, 80);
    }
    const borderVar = findVariable('border');
    if (borderVar) line.fills = [varPaint(borderVar)];

    comp.appendChild(line);
    line.layoutGrow = 1;
    line.layoutAlign = 'STRETCH';

    comps.push(comp);
  }
  finalizeVariantSet(page, comps, 'Separator', 'Shadcn separator. A 1px line in the border color that visually divides content. Orientation: horizontal (full width, h-1px) or vertical (full height, w-1px).', orientations.length);
}

async function gen_skeleton(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Skeleton';
  comp.description = 'Shadcn skeleton. Muted rounded-md placeholder blocks used as a loading state. This representative instance shows a circular avatar placeholder beside two stacked text-line placeholders.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  comp.counterAxisAlignItems = 'CENTER';
  comp.itemSpacing = 16;
  comp.paddingLeft = 16;
  comp.paddingRight = 16;
  comp.paddingTop = 16;
  comp.paddingBottom = 16;
  comp.cornerRadius = 8;
  comp.fills = [];

  const muted = findVariable('muted');

  // Circular avatar placeholder (h-12 w-12, rounded-full)
  const avatar = figma.createFrame();
  avatar.name = 'Avatar';
  avatar.layoutMode = 'HORIZONTAL';
  avatar.primaryAxisSizingMode = 'FIXED';
  avatar.counterAxisSizingMode = 'FIXED';
  avatar.resize(48, 48);
  avatar.cornerRadius = 9999;
  if (muted) avatar.fills = [varPaint(muted)];
  comp.appendChild(avatar);

  // Stacked text lines
  const lines = figma.createFrame();
  lines.name = 'Lines';
  lines.layoutMode = 'VERTICAL';
  lines.primaryAxisSizingMode = 'AUTO';
  lines.counterAxisSizingMode = 'AUTO';
  lines.itemSpacing = 8;
  lines.fills = [];
  comp.appendChild(lines);

  // First line (h-4 w-[250px], rounded-md)
  const line1 = figma.createFrame();
  line1.name = 'Line 1';
  line1.layoutMode = 'HORIZONTAL';
  line1.primaryAxisSizingMode = 'FIXED';
  line1.counterAxisSizingMode = 'FIXED';
  line1.resize(250, 16);
  line1.cornerRadius = 6;
  if (muted) line1.fills = [varPaint(muted)];
  lines.appendChild(line1);

  // Second line (h-4 w-[200px], rounded-md)
  const line2 = figma.createFrame();
  line2.name = 'Line 2';
  line2.layoutMode = 'HORIZONTAL';
  line2.primaryAxisSizingMode = 'FIXED';
  line2.counterAxisSizingMode = 'FIXED';
  line2.resize(200, 16);
  line2.cornerRadius = 6;
  if (muted) line2.fills = [varPaint(muted)];
  lines.appendChild(line2);

  page.appendChild(comp);
}

async function gen_kbd(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Kbd';
  comp.description = 'Shadcn kbd. A small key cap used to display keyboard shortcuts: muted background, 1px border, rounded corners, and a text-xs label (e.g. Ctrl+K).';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisAlignItems = 'CENTER';
  comp.counterAxisAlignItems = 'CENTER';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.paddingLeft = 6;
  comp.paddingRight = 6;
  comp.itemSpacing = 4;
  comp.cornerRadius = 6;
  comp.resize(20, 20);

  const bg = findVariable('muted');
  if (bg) comp.fills = [varPaint(bg)];
  const border = findVariable('border');
  if (border) { comp.strokes = [varPaint(border)]; comp.strokeWeight = 1; }

  const text = figma.createText();
  text.fontName = { family: 'Inter', style: 'Medium' };
  text.characters = 'Ctrl+K';
  text.fontSize = 12;
  text.lineHeight = { value: 16, unit: 'PIXELS' };
  const fg = findVariable('muted-foreground');
  if (fg) text.fills = [varPaint(fg)];
  comp.appendChild(text);

  page.appendChild(comp);
}

async function gen_empty(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Empty';
  comp.description = 'Shadcn empty-state. Centered composite with a rounded icon container, title, muted description, and a primary action button. Used to communicate that there is no content to display.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  comp.primaryAxisAlignItems = 'CENTER';
  comp.counterAxisAlignItems = 'CENTER';
  comp.itemSpacing = 24;
  comp.paddingTop = 48;
  comp.paddingBottom = 48;
  comp.paddingLeft = 48;
  comp.paddingRight = 48;
  comp.cornerRadius = 8;

  const cardV = findVariable('card');
  if (cardV) comp.fills = [varPaint(cardV)];
  const borderV = findVariable('border');
  if (borderV) { comp.strokes = [varPaint(borderV)]; comp.strokeWeight = 1; }
  comp.dashPattern = [4, 4];

  // Icon container (rounded muted square with a simple glyph)
  const iconWrap = figma.createFrame();
  iconWrap.name = 'Icon';
  iconWrap.layoutMode = 'HORIZONTAL';
  iconWrap.primaryAxisSizingMode = 'FIXED';
  iconWrap.counterAxisSizingMode = 'FIXED';
  iconWrap.primaryAxisAlignItems = 'CENTER';
  iconWrap.counterAxisAlignItems = 'CENTER';
  iconWrap.resize(40, 40);
  iconWrap.cornerRadius = 9999;
  const mutedV = findVariable('muted');
  if (mutedV) iconWrap.fills = [varPaint(mutedV)];

  const glyph = figma.createEllipse();
  glyph.resize(18, 18);
  glyph.fills = [];
  const mutedFgV = findVariable('muted-foreground');
  if (mutedFgV) { glyph.strokes = [varPaint(mutedFgV)]; glyph.strokeWeight = 2; }
  iconWrap.appendChild(glyph);
  comp.appendChild(iconWrap);

  // Text block (title + description)
  const textBlock = figma.createFrame();
  textBlock.name = 'Text';
  textBlock.layoutMode = 'VERTICAL';
  textBlock.primaryAxisSizingMode = 'AUTO';
  textBlock.counterAxisSizingMode = 'AUTO';
  textBlock.primaryAxisAlignItems = 'CENTER';
  textBlock.counterAxisAlignItems = 'CENTER';
  textBlock.itemSpacing = 6;
  textBlock.fills = [];

  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'SemiBold' };
  title.characters = 'No data found';
  title.fontSize = 18;
  title.textAlignHorizontal = 'CENTER';
  const fgV = findVariable('foreground');
  if (fgV) title.fills = [varPaint(fgV)];
  textBlock.appendChild(title);

  const desc = figma.createText();
  desc.fontName = { family: 'Inter', style: 'Regular' };
  desc.textAutoResize = 'HEIGHT';
  desc.characters = 'There is nothing to display here yet. Get started by creating a new item.';
  desc.fontSize = 14;
  desc.textAlignHorizontal = 'CENTER';
  desc.resize(320, desc.height);
  if (mutedFgV) desc.fills = [varPaint(mutedFgV)];
  textBlock.appendChild(desc);

  comp.appendChild(textBlock);

  // Action button
  const button = figma.createFrame();
  button.name = 'Button';
  button.layoutMode = 'HORIZONTAL';
  button.primaryAxisSizingMode = 'AUTO';
  button.counterAxisSizingMode = 'FIXED';
  button.primaryAxisAlignItems = 'CENTER';
  button.counterAxisAlignItems = 'CENTER';
  button.paddingLeft = 16;
  button.paddingRight = 16;
  button.itemSpacing = 8;
  button.cornerRadius = 6;
  button.resize(120, 40);
  const primaryV = findVariable('primary');
  if (primaryV) button.fills = [varPaint(primaryV)];

  const btnText = figma.createText();
  btnText.fontName = { family: 'Inter', style: 'Medium' };
  btnText.characters = 'Add item';
  btnText.fontSize = 14;
  const primaryFgV = findVariable('primary-foreground');
  if (primaryFgV) btnText.fills = [varPaint(primaryFgV)];
  button.appendChild(btnText);

  comp.appendChild(button);

  page.appendChild(comp);
}

async function gen_item(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Item';
  comp.description = 'Shadcn item. A list item row composed of a leading icon container, a stacked title and subtitle, and a trailing chevron indicator. Uses rounded-lg, border, gap-3 spacing, and card background.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'AUTO';
  comp.primaryAxisAlignItems = 'MIN';
  comp.counterAxisAlignItems = 'CENTER';
  comp.itemSpacing = 12;
  comp.paddingLeft = 16;
  comp.paddingRight = 16;
  comp.paddingTop = 12;
  comp.paddingBottom = 12;
  comp.cornerRadius = 8;
  comp.resize(360, 64);

  const bgVar = findVariable('card');
  if (bgVar) comp.fills = [varPaint(bgVar)];
  const borderVar = findVariable('border');
  if (borderVar) { comp.strokes = [varPaint(borderVar)]; comp.strokeWeight = 1; }

  // Leading icon container (avatar/icon slot)
  const iconBox = figma.createFrame();
  iconBox.name = 'Icon';
  iconBox.layoutMode = 'HORIZONTAL';
  iconBox.primaryAxisAlignItems = 'CENTER';
  iconBox.counterAxisAlignItems = 'CENTER';
  iconBox.primaryAxisSizingMode = 'FIXED';
  iconBox.counterAxisSizingMode = 'FIXED';
  iconBox.resize(40, 40);
  iconBox.cornerRadius = 6;
  iconBox.layoutGrow = 0;
  const mutedVar = findVariable('muted');
  if (mutedVar) iconBox.fills = [varPaint(mutedVar)];

  // simple glyph inside the icon box (a small rounded square)
  const glyph = figma.createRectangle();
  glyph.name = 'Glyph';
  glyph.resize(18, 18);
  glyph.cornerRadius = 4;
  const mutedFgVar = findVariable('muted-foreground');
  if (mutedFgVar) glyph.fills = [varPaint(mutedFgVar)];
  iconBox.appendChild(glyph);
  comp.appendChild(iconBox);

  // Content column: title + subtitle
  const content = figma.createFrame();
  content.name = 'Content';
  content.layoutMode = 'VERTICAL';
  content.primaryAxisSizingMode = 'AUTO';
  content.counterAxisSizingMode = 'AUTO';
  content.primaryAxisAlignItems = 'CENTER';
  content.counterAxisAlignItems = 'MIN';
  content.itemSpacing = 2;
  content.fills = [];
  content.layoutGrow = 1;

  const title = figma.createText();
  title.name = 'Title';
  title.fontName = { family: 'Inter', style: 'Medium' };
  title.characters = 'Item title';
  title.fontSize = 14;
  const fgVar = findVariable('foreground');
  if (fgVar) title.fills = [varPaint(fgVar)];
  content.appendChild(title);

  const subtitle = figma.createText();
  subtitle.name = 'Subtitle';
  subtitle.fontName = { family: 'Inter', style: 'Regular' };
  subtitle.characters = 'Supporting description text';
  subtitle.fontSize = 12;
  if (mutedFgVar) subtitle.fills = [varPaint(mutedFgVar)];
  content.appendChild(subtitle);

  comp.appendChild(content);

  // Trailing chevron indicator
  const chevron = figma.createFrame();
  chevron.name = 'Chevron';
  chevron.layoutMode = 'HORIZONTAL';
  chevron.primaryAxisAlignItems = 'CENTER';
  chevron.counterAxisAlignItems = 'CENTER';
  chevron.primaryAxisSizingMode = 'FIXED';
  chevron.counterAxisSizingMode = 'FIXED';
  chevron.resize(16, 16);
  chevron.fills = [];
  chevron.layoutGrow = 0;

  const chevronGlyph = figma.createText();
  chevronGlyph.name = 'ChevronRight';
  chevronGlyph.fontName = { family: 'Inter', style: 'SemiBold' };
  chevronGlyph.characters = '>';
  chevronGlyph.fontSize = 12;
  if (mutedFgVar) chevronGlyph.fills = [varPaint(mutedFgVar)];
  chevron.appendChild(chevronGlyph);
  comp.appendChild(chevron);

  page.appendChild(comp);
}

async function gen_accordion(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const foregroundVar = findVariable('foreground');
  const mutedFgVar = findVariable('muted-foreground');
  const borderVar = findVariable('border');

  const comp = figma.createComponent();
  comp.name = 'Accordion';
  comp.description = 'Shadcn accordion. A vertically stacked set of interactive headings (triggers) that each reveal an associated content panel. Items are separated by a 1px bottom border. The first item is expanded (chevron up, content visible); the rest are collapsed (chevron down). Triggers use text-sm Medium; content uses text-sm Regular in muted-foreground.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.itemSpacing = 0;
  comp.fills = [];
  comp.resize(400, comp.height);

  // Draws a chevron icon using a vector node. `up` = pointing up, else pointing down.
  const makeChevron = (up: boolean): FrameNode => {
    const icon = figma.createFrame();
    icon.name = up ? 'chevron-up' : 'chevron-down';
    icon.layoutMode = 'NONE';
    icon.resize(16, 16);
    icon.fills = [];
    icon.clipsContent = false;

    const vec = figma.createVector();
    vec.name = 'path';
    if (up) {
      vec.vectorPaths = [{
        windingRule: 'NONE',
        data: 'M 4 10 L 8 6 L 12 10',
      }];
    } else {
      vec.vectorPaths = [{
        windingRule: 'NONE',
        data: 'M 4 6 L 8 10 L 12 6',
      }];
    }
    vec.strokes = mutedFgVar ? [varPaint(mutedFgVar)] : [];
    vec.strokeWeight = 1.5;
    vec.strokeCap = 'ROUND';
    vec.strokeJoin = 'ROUND';
    vec.fills = [];
    icon.appendChild(vec);
    return icon;
  };

  // Builds a single accordion item with a 1px bottom divider.
  const makeItem = (title: string, expanded: boolean, body: string): FrameNode => {
    const item = figma.createFrame();
    item.name = `Item (${expanded ? 'expanded' : 'collapsed'})`;
    item.layoutMode = 'VERTICAL';
    item.primaryAxisSizingMode = 'AUTO';
    item.counterAxisSizingMode = 'FIXED';
    item.layoutAlign = 'STRETCH';
    item.itemSpacing = 0;
    item.fills = [];

    // Trigger row
    const trigger = figma.createFrame();
    trigger.name = 'Trigger';
    trigger.layoutMode = 'HORIZONTAL';
    trigger.primaryAxisSizingMode = 'FIXED';
    trigger.counterAxisSizingMode = 'AUTO';
    trigger.layoutAlign = 'STRETCH';
    trigger.primaryAxisAlignItems = 'SPACE_BETWEEN';
    trigger.counterAxisAlignItems = 'CENTER';
    trigger.paddingTop = 16;
    trigger.paddingBottom = 16;
    trigger.paddingLeft = 0;
    trigger.paddingRight = 0;
    trigger.itemSpacing = 8;
    trigger.fills = [];

    const titleText = figma.createText();
    titleText.fontName = { family: 'Inter', style: 'Medium' };
    titleText.characters = title;
    titleText.fontSize = 14;
    if (foregroundVar) titleText.fills = [varPaint(foregroundVar)];
    trigger.appendChild(titleText);
    trigger.appendChild(makeChevron(expanded));

    item.appendChild(trigger);

    // Content panel (only for expanded item)
    if (expanded) {
      const content = figma.createFrame();
      content.name = 'Content';
      content.layoutMode = 'VERTICAL';
      content.primaryAxisSizingMode = 'AUTO';
      content.counterAxisSizingMode = 'FIXED';
      content.layoutAlign = 'STRETCH';
      content.paddingTop = 0;
      content.paddingBottom = 16;
      content.paddingLeft = 0;
      content.paddingRight = 0;
      content.itemSpacing = 0;
      content.fills = [];

      const bodyText = figma.createText();
      bodyText.fontName = { family: 'Inter', style: 'Regular' };
      bodyText.characters = body;
      bodyText.fontSize = 14;
      bodyText.lineHeight = { value: 20, unit: 'PIXELS' };
      if (mutedFgVar) bodyText.fills = [varPaint(mutedFgVar)];
      bodyText.layoutAlign = 'STRETCH';
      bodyText.textAutoResize = 'HEIGHT';
      content.appendChild(bodyText);

      item.appendChild(content);
    }

    // 1px bottom divider as a faithful separator.
    const divider = figma.createFrame();
    divider.name = 'Divider';
    divider.layoutMode = 'HORIZONTAL';
    divider.primaryAxisSizingMode = 'FIXED';
    divider.counterAxisSizingMode = 'FIXED';
    divider.layoutAlign = 'STRETCH';
    divider.resize(divider.width, 1);
    if (borderVar) divider.fills = [varPaint(borderVar)];
    item.appendChild(divider);

    return item;
  };

  comp.appendChild(makeItem('Is it accessible?', true, 'Yes. It adheres to the WAI-ARIA design pattern.'));
  comp.appendChild(makeItem('Is it styled?', false, ''));
  comp.appendChild(makeItem('Is it animated?', false, ''));

  page.appendChild(comp);
}

async function gen_tabs(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Tabs';
  comp.description = 'Shadcn tabs composite. A muted rounded-md tab list containing three triggers (the active trigger shown with a card background and foreground text) above a bordered rounded-lg content panel.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.itemSpacing = 8;
  comp.fills = [];
  comp.resize(400, 100);

  // ----- Tab list -----
  const list = figma.createFrame();
  list.name = 'TabsList';
  list.layoutMode = 'HORIZONTAL';
  list.primaryAxisSizingMode = 'FIXED';
  list.counterAxisSizingMode = 'AUTO';
  list.layoutAlign = 'STRETCH';
  list.primaryAxisAlignItems = 'MIN';
  list.counterAxisAlignItems = 'CENTER';
  list.itemSpacing = 4;
  list.paddingLeft = 4;
  list.paddingRight = 4;
  list.paddingTop = 4;
  list.paddingBottom = 4;
  list.cornerRadius = 6;
  const mutedV = findVariable('muted');
  if (mutedV) list.fills = [varPaint(mutedV)];

  const triggers: { label: string; active: boolean }[] = [
    { label: 'Account', active: true },
    { label: 'Password', active: false },
    { label: 'Settings', active: false },
  ];

  for (const trigger of triggers) {
    const tab = figma.createFrame();
    tab.name = `TabsTrigger${trigger.active ? '-active' : ''}`;
    tab.layoutMode = 'HORIZONTAL';
    tab.primaryAxisSizingMode = 'FIXED';
    tab.counterAxisSizingMode = 'FIXED';
    tab.layoutGrow = 1;
    tab.primaryAxisAlignItems = 'CENTER';
    tab.counterAxisAlignItems = 'CENTER';
    tab.paddingLeft = 12;
    tab.paddingRight = 12;
    tab.cornerRadius = 4;
    tab.resize(100, 28);
    if (trigger.active) {
      const cardV = findVariable('card');
      if (cardV) tab.fills = [varPaint(cardV)];
    } else {
      tab.fills = [];
    }

    const label = figma.createText();
    label.fontName = { family: 'Inter', style: 'Medium' };
    label.characters = trigger.label;
    label.fontSize = 14;
    const fgName = trigger.active ? 'foreground' : 'muted-foreground';
    const fgV = findVariable(fgName);
    if (fgV) label.fills = [varPaint(fgV)];
    tab.appendChild(label);

    list.appendChild(tab);
  }
  comp.appendChild(list);

  // ----- Content panel -----
  const content = figma.createFrame();
  content.name = 'TabsContent';
  content.layoutMode = 'VERTICAL';
  content.primaryAxisSizingMode = 'AUTO';
  content.counterAxisSizingMode = 'FIXED';
  content.layoutAlign = 'STRETCH';
  content.itemSpacing = 8;
  content.paddingLeft = 24;
  content.paddingRight = 24;
  content.paddingTop = 24;
  content.paddingBottom = 24;
  content.cornerRadius = 8;
  const cardBgV = findVariable('card');
  if (cardBgV) content.fills = [varPaint(cardBgV)];
  const borderV = findVariable('border');
  if (borderV) { content.strokes = [varPaint(borderV)]; content.strokeWeight = 1; }

  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'SemiBold' };
  title.characters = 'Account';
  title.fontSize = 16;
  const titleV = findVariable('foreground');
  if (titleV) title.fills = [varPaint(titleV)];
  content.appendChild(title);

  const body = figma.createText();
  body.fontName = { family: 'Inter', style: 'Regular' };
  body.characters = 'Make changes to your account here. Click save when you are done.';
  body.fontSize = 14;
  body.layoutAlign = 'STRETCH';
  body.textAutoResize = 'HEIGHT';
  const bodyV = findVariable('muted-foreground');
  if (bodyV) body.fills = [varPaint(bodyV)];
  content.appendChild(body);

  comp.appendChild(content);

  page.appendChild(comp);
}

async function gen_breadcrumb(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Breadcrumb';
  comp.description = 'Shadcn breadcrumb navigation trail. Ancestor links use muted-foreground, the current (last) page uses foreground, separated by chevron-right icons. Single representative instance.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  comp.primaryAxisAlignItems = 'MIN';
  comp.counterAxisAlignItems = 'CENTER';
  comp.itemSpacing = 6;
  comp.fills = [];

  const mutedVar: Variable | undefined = findVariable('muted-foreground');
  const fgVar: Variable | undefined = findVariable('foreground');

  const makeLabel = (label: string, current: boolean): TextNode => {
    const t = figma.createText();
    t.fontName = { family: 'Inter', style: current ? 'Medium' : 'Regular' };
    t.characters = label;
    t.fontSize = 14;
    const colorVar: Variable | undefined = current ? fgVar : mutedVar;
    if (colorVar) t.fills = [varPaint(colorVar)];
    return t;
  };

  const makeSeparator = (): FrameNode => {
    const sep = figma.createFrame();
    sep.name = 'Separator';
    sep.layoutMode = 'HORIZONTAL';
    sep.primaryAxisSizingMode = 'FIXED';
    sep.counterAxisSizingMode = 'FIXED';
    sep.primaryAxisAlignItems = 'CENTER';
    sep.counterAxisAlignItems = 'CENTER';
    sep.resize(16, 16);
    sep.fills = [];
    sep.clipsContent = false;

    const chevron = figma.createVector();
    chevron.name = 'ChevronRight';
    chevron.vectorPaths = [
      {
        windingRule: 'NONE',
        data: 'M 6 4 L 10 8 L 6 12',
      },
    ];
    chevron.strokeWeight = 1.5;
    chevron.strokeCap = 'ROUND';
    chevron.strokeJoin = 'ROUND';
    chevron.fills = [];
    if (mutedVar) chevron.strokes = [varPaint(mutedVar)];
    sep.appendChild(chevron);
    return sep;
  };

  const items: { label: string; current: boolean }[] = [
    { label: 'Home', current: false },
    { label: 'Components', current: false },
    { label: 'Breadcrumb', current: true },
  ];

  for (let i = 0; i < items.length; i++) {
    comp.appendChild(makeLabel(items[i].label, items[i].current));
    if (i < items.length - 1) {
      comp.appendChild(makeSeparator());
    }
  }

  page.appendChild(comp);
}

async function gen_pagination(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Pagination';
  comp.description = 'Shadcn pagination. Single representative instance: Previous button, numbered page links (1, 2, 3) with the current page highlighted in an outline style, an ellipsis for skipped pages, and a Next button. Built with ghost-style links sized h-9 (36px), gap-1 (4px) between items.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  comp.primaryAxisAlignItems = 'CENTER';
  comp.counterAxisAlignItems = 'CENTER';
  comp.itemSpacing = 4;
  comp.fills = [];

  const fgVar = findVariable('foreground');
  const mutedFgVar = findVariable('muted-foreground');
  const borderVar = findVariable('border');

  // Helper: build a navigation link (Previous / Next) with a chevron glyph and label.
  const makeNavLink = (label: string, leading: boolean): FrameNode => {
    const link = figma.createFrame();
    link.name = leading ? 'Previous' : 'Next';
    link.layoutMode = 'HORIZONTAL';
    link.primaryAxisSizingMode = 'AUTO';
    link.counterAxisSizingMode = 'FIXED';
    link.primaryAxisAlignItems = 'CENTER';
    link.counterAxisAlignItems = 'CENTER';
    link.paddingLeft = 10;
    link.paddingRight = 10;
    link.itemSpacing = 4;
    link.cornerRadius = 6;
    link.resize(100, 36);
    link.fills = [];

    const chevron = figma.createText();
    chevron.fontName = { family: 'Inter', style: 'Regular' };
    chevron.characters = leading ? '‹' : '›';
    chevron.fontSize = 16;
    if (fgVar) chevron.fills = [varPaint(fgVar)];

    const text = figma.createText();
    text.fontName = { family: 'Inter', style: 'Medium' };
    text.characters = label;
    text.fontSize = 14;
    if (fgVar) text.fills = [varPaint(fgVar)];

    if (leading) {
      link.appendChild(chevron);
      link.appendChild(text);
    } else {
      link.appendChild(text);
      link.appendChild(chevron);
    }
    return link;
  };

  // Helper: build a square page-number link. `active` renders the outline (current page) style.
  const makePageLink = (label: string, active: boolean): FrameNode => {
    const cell = figma.createFrame();
    cell.name = active ? `Page ${label} (active)` : `Page ${label}`;
    cell.layoutMode = 'HORIZONTAL';
    cell.primaryAxisSizingMode = 'FIXED';
    cell.counterAxisSizingMode = 'FIXED';
    cell.primaryAxisAlignItems = 'CENTER';
    cell.counterAxisAlignItems = 'CENTER';
    cell.cornerRadius = 6;
    cell.resize(36, 36);
    if (active) {
      cell.fills = [];
      if (borderVar) { cell.strokes = [varPaint(borderVar)]; cell.strokeWeight = 1; }
    } else {
      cell.fills = [];
    }

    const text = figma.createText();
    text.fontName = { family: 'Inter', style: 'Medium' };
    text.characters = label;
    text.fontSize = 14;
    if (fgVar) text.fills = [varPaint(fgVar)];
    cell.appendChild(text);
    return cell;
  };

  // Helper: ellipsis for skipped pages.
  const makeEllipsis = (): FrameNode => {
    const cell = figma.createFrame();
    cell.name = 'More pages';
    cell.layoutMode = 'HORIZONTAL';
    cell.primaryAxisSizingMode = 'FIXED';
    cell.counterAxisSizingMode = 'FIXED';
    cell.primaryAxisAlignItems = 'CENTER';
    cell.counterAxisAlignItems = 'CENTER';
    cell.resize(36, 36);
    cell.fills = [];

    const text = figma.createText();
    text.fontName = { family: 'Inter', style: 'Regular' };
    text.characters = '…';
    text.fontSize = 14;
    if (mutedFgVar) text.fills = [varPaint(mutedFgVar)];
    cell.appendChild(text);
    return cell;
  };

  comp.appendChild(makeNavLink('Previous', true));
  comp.appendChild(makePageLink('1', false));
  comp.appendChild(makePageLink('2', true));
  comp.appendChild(makePageLink('3', false));
  comp.appendChild(makeEllipsis());
  comp.appendChild(makePageLink('8', false));
  comp.appendChild(makeNavLink('Next', false));

  page.appendChild(comp);
}

async function gen_menubar(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Menubar';
  comp.description = 'Shadcn menubar. A horizontal bar of menu triggers (File, Edit, View, Profiles) with rounded-md border and background, each trigger using text-sm Medium and px-3/py-1 spacing.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  comp.primaryAxisAlignItems = 'MIN';
  comp.counterAxisAlignItems = 'CENTER';
  comp.itemSpacing = 4;
  comp.paddingLeft = 4;
  comp.paddingRight = 4;
  comp.paddingTop = 4;
  comp.paddingBottom = 4;
  comp.cornerRadius = 6;

  const bgVar = findVariable('background');
  if (bgVar) comp.fills = [varPaint(bgVar)];
  const borderVar = findVariable('border');
  if (borderVar) {
    comp.strokes = [varPaint(borderVar)];
    comp.strokeWeight = 1;
  }

  const labels: { text: string; active: boolean }[] = [
    { text: 'File', active: true },
    { text: 'Edit', active: false },
    { text: 'View', active: false },
    { text: 'Profiles', active: false },
  ];

  for (const label of labels) {
    const trigger = figma.createFrame();
    trigger.name = `Trigger=${label.text}`;
    trigger.layoutMode = 'HORIZONTAL';
    trigger.primaryAxisSizingMode = 'AUTO';
    trigger.counterAxisSizingMode = 'AUTO';
    trigger.primaryAxisAlignItems = 'CENTER';
    trigger.counterAxisAlignItems = 'CENTER';
    trigger.paddingLeft = 12;
    trigger.paddingRight = 12;
    trigger.paddingTop = 4;
    trigger.paddingBottom = 4;
    trigger.cornerRadius = 6;
    trigger.itemSpacing = 8;

    if (label.active) {
      const accentVar = findVariable('accent');
      if (accentVar) trigger.fills = [varPaint(accentVar)];
    } else {
      trigger.fills = [];
    }

    const text = figma.createText();
    text.fontName = { family: 'Inter', style: 'Medium' };
    text.characters = label.text;
    text.fontSize = 14;
    const fgVar = findVariable(label.active ? 'accent-foreground' : 'foreground');
    if (fgVar) text.fills = [varPaint(fgVar)];
    trigger.appendChild(text);

    comp.appendChild(trigger);
  }

  page.appendChild(comp);
}

async function gen_navigation_menu(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Navigation Menu';
  comp.description = 'Shadcn navigation menu. A horizontal navigation bar containing menu triggers; triggers with submenus show a chevron-down indicator and the active/current item is highlighted using the accent token.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  comp.counterAxisAlignItems = 'CENTER';
  comp.itemSpacing = 4;
  comp.paddingLeft = 4;
  comp.paddingRight = 4;
  comp.paddingTop = 4;
  comp.paddingBottom = 4;
  comp.cornerRadius = 6;

  const bgVar = findVariable('background');
  if (bgVar) comp.fills = [varPaint(bgVar)];
  const borderVar = findVariable('border');
  if (borderVar) { comp.strokes = [varPaint(borderVar)]; comp.strokeWeight = 1; }

  const fgVar = findVariable('foreground');
  const accentVar = findVariable('accent');
  const accentFgVar = findVariable('accent-foreground');
  const mutedFgVar = findVariable('muted-foreground');

  type Trigger = { label: string; chevron: boolean; active: boolean };
  const triggers: Trigger[] = [
    { label: 'Getting started', chevron: true, active: false },
    { label: 'Components', chevron: true, active: true },
    { label: 'Documentation', chevron: false, active: false },
  ];

  const makeChevron = (colorVar: Variable | undefined): TextNode => {
    const chevron = figma.createText();
    chevron.name = 'Chevron';
    chevron.fontName = { family: 'Inter', style: 'Regular' };
    chevron.fontSize = 10;
    chevron.characters = '▼';
    if (colorVar) chevron.fills = [varPaint(colorVar)];
    return chevron;
  };

  for (const trig of triggers) {
    const item = figma.createFrame();
    item.name = `Item=${trig.label}`;
    item.layoutMode = 'HORIZONTAL';
    item.primaryAxisSizingMode = 'AUTO';
    item.counterAxisSizingMode = 'FIXED';
    item.primaryAxisAlignItems = 'CENTER';
    item.counterAxisAlignItems = 'CENTER';
    item.itemSpacing = 4;
    item.paddingLeft = 16;
    item.paddingRight = 16;
    item.cornerRadius = 6;
    item.resize(120, 36);

    if (trig.active) {
      if (accentVar) item.fills = [varPaint(accentVar)];
    } else {
      item.fills = [];
    }

    const text = figma.createText();
    text.fontName = { family: 'Inter', style: 'Medium' };
    text.fontSize = 14;
    text.characters = trig.label;
    const labelColor = trig.active ? accentFgVar : fgVar;
    if (labelColor) text.fills = [varPaint(labelColor)];
    item.appendChild(text);

    if (trig.chevron) {
      const chevColor = trig.active ? accentFgVar : mutedFgVar;
      item.appendChild(makeChevron(chevColor));
    }

    comp.appendChild(item);
  }

  page.appendChild(comp);
}

async function gen_progress(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Progress';
  comp.description = 'Shadcn progress bar. A full-width track (muted, h-2 = 8px, rounded-full) containing a primary-colored indicator that fills ~60% of the width to show completion.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisAlignItems = 'MIN';
  comp.counterAxisAlignItems = 'CENTER';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.clipsContent = true;
  comp.cornerRadius = 9999;
  comp.resize(320, 8);

  const trackVar = findVariable('muted');
  if (trackVar) comp.fills = [varPaint(trackVar)];
  else comp.fills = [];

  const indicator = figma.createFrame();
  indicator.name = 'Indicator';
  indicator.layoutMode = 'HORIZONTAL';
  indicator.primaryAxisSizingMode = 'FIXED';
  indicator.counterAxisSizingMode = 'FIXED';
  indicator.cornerRadius = 9999;
  indicator.resize(192, 8);

  const fillVar = findVariable('primary');
  if (fillVar) indicator.fills = [varPaint(fillVar)];
  else indicator.fills = [];

  comp.appendChild(indicator);
  indicator.layoutGrow = 0;
  indicator.layoutAlign = 'STRETCH';

  page.appendChild(comp);
}

async function gen_spinner(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const size = 24;
  const strokeWeight = 2;
  const inset = strokeWeight / 2;
  const diameter = size - strokeWeight;

  const comp = figma.createComponent();
  comp.name = 'Spinner';
  comp.description = 'Shadcn spinner. A circular loading indicator composed of a faint full-circle track and a primary-colored arc segment that conveys indeterminate progress. Single component, no variants.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisAlignItems = 'CENTER';
  comp.counterAxisAlignItems = 'CENTER';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.fills = [];
  comp.resize(size, size);

  // Background track: full circle with a faint muted-foreground stroke.
  const ring = figma.createEllipse();
  ring.name = 'Track';
  ring.resize(diameter, diameter);
  ring.fills = [];
  const trackVar = findVariable('muted-foreground');
  if (trackVar) {
    ring.strokes = [{ ...varPaint(trackVar), opacity: 0.25 }];
  }
  ring.strokeWeight = strokeWeight;
  comp.appendChild(ring);
  ring.layoutPositioning = 'ABSOLUTE';
  ring.x = inset;
  ring.y = inset;

  // Primary arc: a quarter-to-three-quarter sweep that reads as the spinning segment.
  const arc = figma.createEllipse();
  arc.name = 'Arc';
  arc.resize(diameter, diameter);
  arc.fills = [];
  arc.arcData = {
    startingAngle: -Math.PI / 2,
    endingAngle: 0,
    innerRadius: 0,
  };
  const arcVar = findVariable('primary');
  if (arcVar) {
    arc.strokes = [varPaint(arcVar)];
  }
  arc.strokeWeight = strokeWeight;
  arc.strokeCap = 'ROUND';
  comp.appendChild(arc);
  arc.layoutPositioning = 'ABSOLUTE';
  arc.x = inset;
  arc.y = inset;

  page.appendChild(comp);
}

async function gen_tooltip(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Tooltip';
  comp.description = 'Shadcn tooltip. A small dark popover (primary background, primary-foreground text), rounded-md with px-3 py-1.5 padding and a downward-pointing arrow. Single representative instance.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  comp.primaryAxisAlignItems = 'CENTER';
  comp.counterAxisAlignItems = 'CENTER';
  comp.itemSpacing = 0;
  comp.fills = [];

  const bg = findVariable('primary');

  // Bubble: the rounded dark popover body.
  const bubble = figma.createFrame();
  bubble.name = 'Bubble';
  bubble.layoutMode = 'HORIZONTAL';
  bubble.primaryAxisSizingMode = 'AUTO';
  bubble.counterAxisSizingMode = 'AUTO';
  bubble.primaryAxisAlignItems = 'CENTER';
  bubble.counterAxisAlignItems = 'CENTER';
  bubble.paddingLeft = 12;
  bubble.paddingRight = 12;
  bubble.paddingTop = 6;
  bubble.paddingBottom = 6;
  bubble.itemSpacing = 0;
  bubble.cornerRadius = 6;
  if (bg) bubble.fills = [varPaint(bg)];

  const text = figma.createText();
  text.fontName = { family: 'Inter', style: 'Medium' };
  text.characters = 'Add to library';
  text.fontSize = 12;
  const fg = findVariable('primary-foreground');
  if (fg) text.fills = [varPaint(fg)];
  bubble.appendChild(text);
  comp.appendChild(bubble);

  // Pointer: a small rotated square forming the downward arrow.
  const pointerWrap = figma.createFrame();
  pointerWrap.name = 'Pointer';
  pointerWrap.layoutMode = 'VERTICAL';
  pointerWrap.primaryAxisSizingMode = 'FIXED';
  pointerWrap.counterAxisSizingMode = 'FIXED';
  pointerWrap.primaryAxisAlignItems = 'CENTER';
  pointerWrap.counterAxisAlignItems = 'CENTER';
  pointerWrap.itemSpacing = 0;
  pointerWrap.clipsContent = true;
  pointerWrap.fills = [];
  pointerWrap.resize(12, 6);

  const arrow = figma.createRectangle();
  arrow.name = 'Arrow';
  const arrowSize = 9;
  arrow.resize(arrowSize, arrowSize);
  arrow.rotation = 45;
  // Figma rotates around the node's top-left origin. A square of side s rotated
  // 45deg spans a horizontal diagonal of s*sqrt(2). Center that diagonal in the
  // 12px-wide wrapper, and place the top point flush against the wrapper top.
  const diag = arrowSize * Math.SQRT2;
  if (bg) arrow.fills = [varPaint(bg)];
  pointerWrap.appendChild(arrow);
  // Take the rotated square out of flow (after appending) so manual x/y hold.
  arrow.layoutPositioning = 'ABSOLUTE';
  arrow.x = (12 - diag) / 2 + arrowSize / Math.SQRT2;
  arrow.y = -arrowSize / Math.SQRT2;

  comp.appendChild(pointerWrap);

  page.appendChild(comp);
}

async function gen_toast(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Toast';
  comp.description = 'Shadcn toast notification. Single composite: card with title, description, and a close X button. Border, rounded-md, shadow.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'AUTO';
  comp.primaryAxisAlignItems = 'SPACE_BETWEEN';
  comp.counterAxisAlignItems = 'MIN';
  comp.paddingTop = 24;
  comp.paddingBottom = 24;
  comp.paddingLeft = 24;
  comp.paddingRight = 24;
  comp.itemSpacing = 16;
  comp.cornerRadius = 6;
  comp.resize(360, 100);

  const bgVar = findVariable('background');
  if (bgVar) comp.fills = [varPaint(bgVar)];
  const borderVar = findVariable('border');
  if (borderVar) { comp.strokes = [varPaint(borderVar)]; comp.strokeWeight = 1; }
  comp.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.1 },
    offset: { x: 0, y: 4 },
    radius: 12,
    spread: 0,
    visible: true,
    blendMode: 'NORMAL',
  }];

  // Text column: title + description
  const textCol = figma.createFrame();
  textCol.name = 'Content';
  textCol.layoutMode = 'VERTICAL';
  textCol.primaryAxisSizingMode = 'AUTO';
  textCol.counterAxisSizingMode = 'AUTO';
  textCol.primaryAxisAlignItems = 'MIN';
  textCol.counterAxisAlignItems = 'MIN';
  textCol.itemSpacing = 4;
  textCol.fills = [];
  textCol.layoutGrow = 1;

  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'SemiBold' };
  title.characters = 'Scheduled: Catch up';
  title.fontSize = 14;
  const fgVar = findVariable('foreground');
  if (fgVar) title.fills = [varPaint(fgVar)];
  textCol.appendChild(title);

  const desc = figma.createText();
  desc.fontName = { family: 'Inter', style: 'Regular' };
  desc.characters = 'Friday, February 10, 2023 at 5:57 PM';
  desc.fontSize = 14;
  const mutedVar = findVariable('muted-foreground');
  if (mutedVar) desc.fills = [varPaint(mutedVar)];
  textCol.appendChild(desc);

  comp.appendChild(textCol);

  // Close button (X) — small ghost icon button
  const closeBtn = figma.createFrame();
  closeBtn.name = 'Close';
  closeBtn.layoutMode = 'HORIZONTAL';
  closeBtn.primaryAxisSizingMode = 'FIXED';
  closeBtn.counterAxisSizingMode = 'FIXED';
  closeBtn.primaryAxisAlignItems = 'CENTER';
  closeBtn.counterAxisAlignItems = 'CENTER';
  closeBtn.resize(20, 20);
  closeBtn.cornerRadius = 6;
  closeBtn.fills = [];

  const closeIcon = figma.createText();
  closeIcon.fontName = { family: 'Inter', style: 'Regular' };
  closeIcon.characters = '✕';
  closeIcon.fontSize = 14;
  if (mutedVar) closeIcon.fills = [varPaint(mutedVar)];
  closeBtn.appendChild(closeIcon);

  comp.appendChild(closeBtn);

  page.appendChild(comp);
}

async function gen_collapsible(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const fg = findVariable('foreground');
  const mutedFg = findVariable('muted-foreground');
  const borderVar = findVariable('border');

  // Root component (vertical stack: trigger row + content)
  const comp = figma.createComponent();
  comp.name = 'Collapsible';
  comp.description = 'Shadcn collapsible. A trigger row with a label and a chevron toggle button, plus an expanded content area of bordered stacked rows shown below. Static representation of the open state.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.itemSpacing = 8;
  comp.fills = [];
  comp.resize(350, 100);

  // Trigger row: label + chevron toggle, justified between
  const trigger = figma.createFrame();
  trigger.name = 'Trigger';
  trigger.layoutMode = 'HORIZONTAL';
  trigger.primaryAxisSizingMode = 'FIXED';
  trigger.counterAxisSizingMode = 'FIXED';
  trigger.primaryAxisAlignItems = 'SPACE_BETWEEN';
  trigger.counterAxisAlignItems = 'CENTER';
  trigger.paddingLeft = 16;
  trigger.paddingRight = 8;
  trigger.itemSpacing = 8;
  trigger.fills = [];
  trigger.resize(350, 36);
  comp.appendChild(trigger);
  trigger.layoutSizingHorizontal = 'FILL';
  trigger.layoutSizingVertical = 'FIXED';

  const triggerLabel = figma.createText();
  triggerLabel.fontName = { family: 'Inter', style: 'SemiBold' };
  triggerLabel.characters = '@peduarte starred 3 repositories';
  triggerLabel.fontSize = 14;
  if (fg) triggerLabel.fills = [varPaint(fg)];
  trigger.appendChild(triggerLabel);

  // Chevron toggle button (ghost icon button, square)
  const toggle = figma.createFrame();
  toggle.name = 'Toggle';
  toggle.layoutMode = 'HORIZONTAL';
  toggle.primaryAxisSizingMode = 'FIXED';
  toggle.counterAxisSizingMode = 'FIXED';
  toggle.primaryAxisAlignItems = 'CENTER';
  toggle.counterAxisAlignItems = 'CENTER';
  toggle.cornerRadius = 6;
  toggle.fills = [];
  toggle.resize(36, 36);
  trigger.appendChild(toggle);

  // Chevron icon (up arrow for the open state) drawn as an open-stroke vector
  const chevron = figma.createVector();
  chevron.name = 'Chevron';
  chevron.resize(15, 15);
  chevron.strokeWeight = 1.5;
  chevron.strokeCap = 'ROUND';
  chevron.strokeJoin = 'ROUND';
  chevron.fills = [];
  if (fg) chevron.strokes = [varPaint(fg)];
  const chevronPaths: VectorPaths = [
    {
      windingRule: 'NONE',
      data: 'M 3 9.5 L 7.5 5 L 12 9.5',
    },
  ];
  chevron.vectorPaths = chevronPaths;
  toggle.appendChild(chevron);

  // Content block: bordered rounded rows
  const content = figma.createFrame();
  content.name = 'Content';
  content.layoutMode = 'VERTICAL';
  content.primaryAxisSizingMode = 'AUTO';
  content.counterAxisSizingMode = 'FIXED';
  content.itemSpacing = 8;
  content.paddingTop = 0;
  content.fills = [];
  content.resize(350, 100);
  comp.appendChild(content);
  content.layoutSizingHorizontal = 'FILL';

  const items: ReadonlyArray<string> = ['@radix-ui/primitives', '@radix-ui/colors', '@stitches/react'];
  for (const label of items) {
    const row = figma.createFrame();
    row.name = 'Item';
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'FIXED';
    row.counterAxisSizingMode = 'FIXED';
    row.counterAxisAlignItems = 'CENTER';
    row.paddingLeft = 16;
    row.paddingRight = 16;
    row.paddingTop = 8;
    row.paddingBottom = 8;
    row.cornerRadius = 6;
    row.fills = [];
    if (borderVar) {
      row.strokes = [varPaint(borderVar)];
      row.strokeWeight = 1;
    }
    row.resize(350, 33);
    content.appendChild(row);
    row.layoutSizingHorizontal = 'FILL';

    const rowText = figma.createText();
    rowText.fontName = { family: 'Inter', style: 'Regular' };
    rowText.characters = label;
    rowText.fontSize = 14;
    if (mutedFg) rowText.fills = [varPaint(mutedFg)];
    row.appendChild(rowText);

    // Hug height now that the text child exists, so the row sizes to its content.
    row.layoutSizingVertical = 'HUG';
  }

  // Hug content height now that all rows exist.
  content.layoutSizingVertical = 'HUG';

  page.appendChild(comp);
}

async function gen_resizable(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Resizable';
  comp.description = 'Shadcn resizable panel group. A horizontal group of two resizable panels separated by a draggable handle that contains a centered grip indicator. Uses border, background, muted, muted-foreground, and foreground tokens.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.primaryAxisAlignItems = 'MIN';
  comp.counterAxisAlignItems = 'CENTER';
  comp.itemSpacing = 0;
  comp.cornerRadius = 8;
  comp.clipsContent = false;
  comp.resize(420, 220);
  const borderVar = findVariable('border');
  if (borderVar) { comp.strokes = [varPaint(borderVar)]; comp.strokeWeight = 1; }
  const bgVar = findVariable('background');
  if (bgVar) { comp.fills = [varPaint(bgVar)]; } else { comp.fills = []; }

  const makePanel = (label: string): FrameNode => {
    const panel = figma.createFrame();
    panel.name = `Panel ${label}`;
    panel.layoutMode = 'VERTICAL';
    panel.primaryAxisSizingMode = 'FIXED';
    panel.counterAxisSizingMode = 'AUTO';
    panel.primaryAxisAlignItems = 'CENTER';
    panel.counterAxisAlignItems = 'CENTER';
    panel.layoutGrow = 1;
    panel.layoutAlign = 'STRETCH';
    panel.paddingLeft = 24;
    panel.paddingRight = 24;
    panel.paddingTop = 24;
    panel.paddingBottom = 24;
    panel.fills = [];
    const text = figma.createText();
    text.fontName = { family: 'Inter', style: 'SemiBold' };
    text.characters = label;
    text.fontSize = 14;
    const fgVar = findVariable('foreground');
    if (fgVar) text.fills = [varPaint(fgVar)];
    panel.appendChild(text);
    return panel;
  };

  const panelOne = makePanel('One');
  comp.appendChild(panelOne);

  const handle = figma.createFrame();
  handle.name = 'Handle';
  handle.layoutMode = 'VERTICAL';
  handle.primaryAxisSizingMode = 'FIXED';
  handle.counterAxisSizingMode = 'FIXED';
  handle.primaryAxisAlignItems = 'CENTER';
  handle.counterAxisAlignItems = 'CENTER';
  handle.layoutAlign = 'STRETCH';
  handle.clipsContent = false;
  handle.resize(1, 220);
  const handleBgVar = findVariable('border');
  if (handleBgVar) { handle.fills = [varPaint(handleBgVar)]; } else { handle.fills = []; }
  comp.appendChild(handle);

  const grip = figma.createFrame();
  grip.name = 'Grip';
  grip.layoutMode = 'VERTICAL';
  grip.primaryAxisSizingMode = 'FIXED';
  grip.counterAxisSizingMode = 'FIXED';
  grip.primaryAxisAlignItems = 'CENTER';
  grip.counterAxisAlignItems = 'CENTER';
  grip.itemSpacing = 2;
  grip.paddingTop = 4;
  grip.paddingBottom = 4;
  grip.cornerRadius = 2;
  grip.resize(12, 20);
  const gripFillVar = findVariable('muted');
  if (gripFillVar) { grip.fills = [varPaint(gripFillVar)]; } else { grip.fills = []; }
  const gripStrokeVar = findVariable('border');
  if (gripStrokeVar) { grip.strokes = [varPaint(gripStrokeVar)]; grip.strokeWeight = 1; }
  for (let i = 0; i < 3; i++) {
    const dot = figma.createEllipse();
    dot.name = 'Dot';
    dot.resize(2, 2);
    const dotVar = findVariable('muted-foreground');
    if (dotVar) dot.fills = [varPaint(dotVar)];
    grip.appendChild(dot);
  }
  handle.appendChild(grip);

  const panelTwo = makePanel('Two');
  comp.appendChild(panelTwo);

  page.appendChild(comp);
}

async function gen_scroll_area(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Scroll Area';
  comp.description = 'Shadcn scroll-area. A bordered box that augments native scroll with custom styling: vertically stacked content fills the available width and a thin rounded scrollbar thumb is pinned to the right edge.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.itemSpacing = 0;
  comp.cornerRadius = 6;
  comp.clipsContent = true;
  comp.resize(280, 220);

  const bgVar = findVariable('background');
  if (bgVar) comp.fills = [varPaint(bgVar)];
  const borderVar = findVariable('border');
  if (borderVar) { comp.strokes = [varPaint(borderVar)]; comp.strokeWeight = 1; }

  // Content column (fills remaining width, with padding)
  const content = figma.createFrame();
  content.name = 'Content';
  content.layoutMode = 'VERTICAL';
  content.primaryAxisSizingMode = 'FIXED';
  content.counterAxisSizingMode = 'FIXED';
  content.layoutGrow = 1;
  content.layoutAlign = 'STRETCH';
  content.itemSpacing = 8;
  content.paddingTop = 16;
  content.paddingBottom = 16;
  content.paddingLeft = 16;
  content.paddingRight = 16;
  content.fills = [];

  const heading = figma.createText();
  heading.fontName = { family: 'Inter', style: 'SemiBold' };
  heading.characters = 'Tags';
  heading.fontSize = 14;
  const fgVar = findVariable('foreground');
  if (fgVar) heading.fills = [varPaint(fgVar)];
  heading.layoutAlign = 'STRETCH';
  content.appendChild(heading);

  const rowLabels: string[] = ['v1.2.0-beta.50', 'v1.2.0-beta.49', 'v1.2.0-beta.48', 'v1.2.0-beta.47', 'v1.2.0-beta.46', 'v1.2.0-beta.45', 'v1.2.0-beta.44'];
  const mutedVar = findVariable('muted-foreground');
  for (const label of rowLabels) {
    const row = figma.createText();
    row.fontName = { family: 'Inter', style: 'Regular' };
    row.characters = label;
    row.fontSize = 14;
    if (mutedVar) row.fills = [varPaint(mutedVar)];
    row.layoutAlign = 'STRETCH';
    content.appendChild(row);
  }
  comp.appendChild(content);

  // Scrollbar track (thin, fixed width, full height)
  const track = figma.createFrame();
  track.name = 'Scrollbar';
  track.layoutMode = 'VERTICAL';
  track.primaryAxisSizingMode = 'FIXED';
  track.counterAxisSizingMode = 'FIXED';
  track.layoutAlign = 'STRETCH';
  track.resize(14, 220);
  track.primaryAxisAlignItems = 'MIN';
  track.counterAxisAlignItems = 'CENTER';
  track.paddingTop = 4;
  track.paddingBottom = 4;
  track.paddingLeft = 2;
  track.paddingRight = 2;
  track.fills = [];

  // Scrollbar thumb (rounded-full, partial height)
  const thumb = figma.createFrame();
  thumb.name = 'Thumb';
  thumb.layoutMode = 'VERTICAL';
  thumb.primaryAxisSizingMode = 'FIXED';
  thumb.counterAxisSizingMode = 'FIXED';
  thumb.resize(8, 96);
  thumb.cornerRadius = 9999;
  const thumbVar = findVariable('border');
  if (thumbVar) thumb.fills = [varPaint(thumbVar)];
  track.appendChild(thumb);
  comp.appendChild(track);

  page.appendChild(comp);
}

async function gen_aspect_ratio(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'AspectRatio';
  comp.description = 'Shadcn aspect-ratio. A single 16:9 ratio container (320x180) with muted background and rounded-md corners, used to constrain content (image, video, embed) to a fixed aspect ratio.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisAlignItems = 'CENTER';
  comp.counterAxisAlignItems = 'CENTER';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.cornerRadius = 6;
  comp.clipsContent = true;
  comp.resize(320, 180);

  const mutedBg = findVariable('muted');
  if (mutedBg) comp.fills = [varPaint(mutedBg)];

  const label = figma.createText();
  label.fontName = { family: 'Inter', style: 'Medium' };
  label.characters = '16 / 9';
  label.fontSize = 14;
  const fg = findVariable('muted-foreground');
  if (fg) label.fills = [varPaint(fg)];
  comp.appendChild(label);

  page.appendChild(comp);
}

async function gen_sidebar(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const sidebarBg = findVariable('sidebar');
  const sidebarFg = findVariable('sidebar-foreground');
  const sidebarBorder = findVariable('sidebar-border');
  const sidebarAccent = findVariable('sidebar-accent');
  const sidebarAccentFg = findVariable('sidebar-accent-foreground');
  const sidebarPrimary = findVariable('sidebar-primary');
  const sidebarPrimaryFg = findVariable('sidebar-primary-foreground');
  const mutedFg = findVariable('muted-foreground');

  const comp = figma.createComponent();
  comp.name = 'Sidebar';
  comp.description = 'Shadcn sidebar (w-64 / 256px) using sidebar* tokens. Composition: header (brand logo + title), a labelled nav group with menu items (one active using sidebar-accent), and a footer user row. Single representative instance.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(256, 600);
  comp.itemSpacing = 0;
  if (sidebarBg) comp.fills = [varPaint(sidebarBg)];
  if (sidebarBorder) { comp.strokes = [varPaint(sidebarBorder)]; comp.strokeWeight = 1; }

  // ---- Header ----
  const header = figma.createFrame();
  header.name = 'Header';
  header.layoutMode = 'HORIZONTAL';
  header.primaryAxisSizingMode = 'FIXED';
  header.counterAxisSizingMode = 'AUTO';
  header.layoutAlign = 'STRETCH';
  header.counterAxisAlignItems = 'CENTER';
  header.itemSpacing = 8;
  header.paddingLeft = 16;
  header.paddingRight = 16;
  header.paddingTop = 16;
  header.paddingBottom = 16;
  header.fills = [];

  const logo = figma.createFrame();
  logo.name = 'Logo';
  logo.layoutMode = 'HORIZONTAL';
  logo.primaryAxisSizingMode = 'FIXED';
  logo.counterAxisSizingMode = 'FIXED';
  logo.primaryAxisAlignItems = 'CENTER';
  logo.counterAxisAlignItems = 'CENTER';
  logo.resize(32, 32);
  logo.cornerRadius = 8;
  if (sidebarPrimary) logo.fills = [varPaint(sidebarPrimary)];
  const logoText = figma.createText();
  logoText.fontName = { family: 'Inter', style: 'Bold' };
  logoText.characters = 'A';
  logoText.fontSize = 14;
  if (sidebarPrimaryFg) logoText.fills = [varPaint(sidebarPrimaryFg)];
  logo.appendChild(logoText);
  header.appendChild(logo);

  const brand = figma.createFrame();
  brand.name = 'Brand';
  brand.layoutMode = 'VERTICAL';
  brand.primaryAxisSizingMode = 'AUTO';
  brand.counterAxisSizingMode = 'AUTO';
  brand.itemSpacing = 2;
  brand.fills = [];
  brand.layoutGrow = 1;
  const brandTitle = figma.createText();
  brandTitle.fontName = { family: 'Inter', style: 'SemiBold' };
  brandTitle.characters = 'Acme Inc';
  brandTitle.fontSize = 14;
  if (sidebarFg) brandTitle.fills = [varPaint(sidebarFg)];
  const brandSub = figma.createText();
  brandSub.fontName = { family: 'Inter', style: 'Regular' };
  brandSub.characters = 'Enterprise';
  brandSub.fontSize = 12;
  if (mutedFg) brandSub.fills = [varPaint(mutedFg)];
  brand.appendChild(brandTitle);
  brand.appendChild(brandSub);
  header.appendChild(brand);

  comp.appendChild(header);

  // ---- Content (nav group) ----
  const content = figma.createFrame();
  content.name = 'Content';
  content.layoutMode = 'VERTICAL';
  content.primaryAxisSizingMode = 'AUTO';
  content.counterAxisSizingMode = 'FIXED';
  content.layoutAlign = 'STRETCH';
  content.layoutGrow = 1;
  content.itemSpacing = 4;
  content.paddingLeft = 8;
  content.paddingRight = 8;
  content.paddingTop = 8;
  content.paddingBottom = 8;
  content.fills = [];

  const groupLabel = figma.createText();
  groupLabel.fontName = { family: 'Inter', style: 'Medium' };
  groupLabel.characters = 'Platform';
  groupLabel.fontSize = 12;
  if (mutedFg) groupLabel.fills = [varPaint(mutedFg)];
  groupLabel.layoutAlign = 'STRETCH';
  // emulate px-2 py-1.5 label spacing via a wrapper
  const labelWrap = figma.createFrame();
  labelWrap.name = 'GroupLabel';
  labelWrap.layoutMode = 'HORIZONTAL';
  labelWrap.primaryAxisSizingMode = 'FIXED';
  labelWrap.counterAxisSizingMode = 'AUTO';
  labelWrap.layoutAlign = 'STRETCH';
  labelWrap.paddingLeft = 8;
  labelWrap.paddingRight = 8;
  labelWrap.paddingTop = 6;
  labelWrap.paddingBottom = 6;
  labelWrap.fills = [];
  labelWrap.appendChild(groupLabel);
  content.appendChild(labelWrap);

  const items: { label: string; active: boolean }[] = [
    { label: 'Dashboard', active: false },
    { label: 'Projects', active: true },
    { label: 'Team', active: false },
    { label: 'Calendar', active: false },
    { label: 'Settings', active: false },
  ];

  for (const item of items) {
    const row = figma.createFrame();
    row.name = `MenuItem=${item.label}`;
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'FIXED';
    row.counterAxisSizingMode = 'FIXED';
    row.layoutAlign = 'STRETCH';
    row.counterAxisAlignItems = 'CENTER';
    row.resize(240, 32);
    row.itemSpacing = 8;
    row.paddingLeft = 8;
    row.paddingRight = 8;
    row.cornerRadius = 6;
    if (item.active && sidebarAccent) {
      row.fills = [varPaint(sidebarAccent)];
    } else {
      row.fills = [];
    }

    // leading icon (square placeholder)
    const icon = figma.createFrame();
    icon.name = 'Icon';
    icon.layoutMode = 'HORIZONTAL';
    icon.primaryAxisSizingMode = 'FIXED';
    icon.counterAxisSizingMode = 'FIXED';
    icon.resize(16, 16);
    icon.cornerRadius = 4;
    const iconColor: Variable | undefined = item.active ? sidebarAccentFg : sidebarFg;
    if (iconColor) icon.fills = [varPaint(iconColor)];
    icon.opacity = item.active ? 1 : 0.7;
    row.appendChild(icon);

    const label = figma.createText();
    label.fontName = { family: 'Inter', style: item.active ? 'Medium' : 'Regular' };
    label.characters = item.label;
    label.fontSize = 14;
    const labelColor: Variable | undefined = item.active ? sidebarAccentFg : sidebarFg;
    if (labelColor) label.fills = [varPaint(labelColor)];
    label.layoutGrow = 1;
    row.appendChild(label);

    content.appendChild(row);
  }

  comp.appendChild(content);

  // ---- Footer ----
  const footer = figma.createFrame();
  footer.name = 'Footer';
  footer.layoutMode = 'HORIZONTAL';
  footer.primaryAxisSizingMode = 'FIXED';
  footer.counterAxisSizingMode = 'AUTO';
  footer.layoutAlign = 'STRETCH';
  footer.counterAxisAlignItems = 'CENTER';
  footer.itemSpacing = 8;
  footer.paddingLeft = 16;
  footer.paddingRight = 16;
  footer.paddingTop = 12;
  footer.paddingBottom = 12;
  footer.fills = [];
  if (sidebarBorder) {
    footer.strokes = [varPaint(sidebarBorder)];
    footer.strokeWeight = 1;
    footer.strokeAlign = 'INSIDE';
    footer.strokeTopWeight = 1;
    footer.strokeBottomWeight = 0;
    footer.strokeLeftWeight = 0;
    footer.strokeRightWeight = 0;
  }

  const avatar = figma.createFrame();
  avatar.name = 'Avatar';
  avatar.layoutMode = 'HORIZONTAL';
  avatar.primaryAxisSizingMode = 'FIXED';
  avatar.counterAxisSizingMode = 'FIXED';
  avatar.primaryAxisAlignItems = 'CENTER';
  avatar.counterAxisAlignItems = 'CENTER';
  avatar.resize(32, 32);
  avatar.cornerRadius = 9999;
  if (sidebarAccent) avatar.fills = [varPaint(sidebarAccent)];
  const avatarText = figma.createText();
  avatarText.fontName = { family: 'Inter', style: 'Medium' };
  avatarText.characters = 'JD';
  avatarText.fontSize = 12;
  if (sidebarAccentFg) avatarText.fills = [varPaint(sidebarAccentFg)];
  avatar.appendChild(avatarText);
  footer.appendChild(avatar);

  const userInfo = figma.createFrame();
  userInfo.name = 'UserInfo';
  userInfo.layoutMode = 'VERTICAL';
  userInfo.primaryAxisSizingMode = 'AUTO';
  userInfo.counterAxisSizingMode = 'AUTO';
  userInfo.itemSpacing = 2;
  userInfo.fills = [];
  userInfo.layoutGrow = 1;
  const userName = figma.createText();
  userName.fontName = { family: 'Inter', style: 'SemiBold' };
  userName.characters = 'Jane Doe';
  userName.fontSize = 14;
  if (sidebarFg) userName.fills = [varPaint(sidebarFg)];
  const userMail = figma.createText();
  userMail.fontName = { family: 'Inter', style: 'Regular' };
  userMail.characters = 'jane@acme.com';
  userMail.fontSize = 12;
  if (mutedFg) userMail.fills = [varPaint(mutedFg)];
  userInfo.appendChild(userName);
  userInfo.appendChild(userMail);
  footer.appendChild(userInfo);

  comp.appendChild(footer);

  page.appendChild(comp);
}

async function gen_dialog(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Dialog';
  comp.description = 'Shadcn dialog. A modal card centered on a backdrop with a header (title + close X), description, content body, and a footer with Cancel and Confirm buttons. Rounded-lg with border and shadow.';

  // Backdrop / overlay frame holding the centered modal card.
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisAlignItems = 'CENTER';
  comp.counterAxisAlignItems = 'CENTER';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.paddingTop = 48;
  comp.paddingBottom = 48;
  comp.paddingLeft = 48;
  comp.paddingRight = 48;
  comp.resize(620, 360);
  const overlay = findVariable('foreground');
  if (overlay) {
    const overlayPaint: SolidPaint = { ...varPaint(overlay), opacity: 0.5 };
    comp.fills = [overlayPaint];
  } else {
    comp.fills = [];
  }

  // ----- Modal card -----
  const card = figma.createFrame();
  card.name = 'Content';
  card.layoutMode = 'VERTICAL';
  card.primaryAxisSizingMode = 'AUTO';
  card.counterAxisSizingMode = 'FIXED';
  card.layoutAlign = 'STRETCH';
  card.itemSpacing = 16;
  card.paddingTop = 24;
  card.paddingBottom = 24;
  card.paddingLeft = 24;
  card.paddingRight = 24;
  card.cornerRadius = 8;
  card.resize(512, 100);
  const cardBg = findVariable('background');
  if (cardBg) card.fills = [varPaint(cardBg)];
  const cardBorder = findVariable('border');
  if (cardBorder) { card.strokes = [varPaint(cardBorder)]; card.strokeWeight = 1; }
  card.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.18 },
    offset: { x: 0, y: 8 },
    radius: 24,
    spread: -4,
    visible: true,
    blendMode: 'NORMAL',
  }];

  // ----- Header (title + close X) -----
  const header = figma.createFrame();
  header.name = 'Header';
  header.layoutMode = 'HORIZONTAL';
  header.primaryAxisSizingMode = 'FIXED';
  header.counterAxisSizingMode = 'AUTO';
  header.layoutAlign = 'STRETCH';
  header.primaryAxisAlignItems = 'SPACE_BETWEEN';
  header.counterAxisAlignItems = 'MIN';
  header.itemSpacing = 8;
  header.fills = [];

  const title = figma.createText();
  title.name = 'Title';
  title.fontName = { family: 'Inter', style: 'SemiBold' };
  title.characters = 'Are you absolutely sure?';
  title.fontSize = 18;
  title.lineHeight = { value: 18, unit: 'PIXELS' };
  const titleFg = findVariable('foreground');
  if (titleFg) title.fills = [varPaint(titleFg)];
  header.appendChild(title);

  // Close button (X) — icon glyph inside a small frame.
  const closeBtn = figma.createFrame();
  closeBtn.name = 'Close';
  closeBtn.layoutMode = 'HORIZONTAL';
  closeBtn.primaryAxisSizingMode = 'FIXED';
  closeBtn.counterAxisSizingMode = 'FIXED';
  closeBtn.primaryAxisAlignItems = 'CENTER';
  closeBtn.counterAxisAlignItems = 'CENTER';
  closeBtn.resize(16, 16);
  closeBtn.fills = [];

  const closeIcon = figma.createText();
  closeIcon.name = 'Icon';
  closeIcon.fontName = { family: 'Inter', style: 'Regular' };
  closeIcon.characters = '✕';
  closeIcon.fontSize = 14;
  const closeFg = findVariable('muted-foreground');
  if (closeFg) closeIcon.fills = [varPaint(closeFg)];
  closeBtn.appendChild(closeIcon);
  header.appendChild(closeBtn);

  card.appendChild(header);

  // ----- Description -----
  const description = figma.createText();
  description.name = 'Description';
  description.fontName = { family: 'Inter', style: 'Regular' };
  description.characters = 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.';
  description.fontSize = 14;
  description.lineHeight = { value: 20, unit: 'PIXELS' };
  description.layoutAlign = 'STRETCH';
  const descFg = findVariable('muted-foreground');
  if (descFg) description.fills = [varPaint(descFg)];
  card.appendChild(description);

  // ----- Content body -----
  const content = figma.createFrame();
  content.name = 'Content Body';
  content.layoutMode = 'VERTICAL';
  content.primaryAxisSizingMode = 'AUTO';
  content.counterAxisSizingMode = 'FIXED';
  content.layoutAlign = 'STRETCH';
  content.itemSpacing = 8;
  content.paddingTop = 12;
  content.paddingBottom = 12;
  content.paddingLeft = 12;
  content.paddingRight = 12;
  content.cornerRadius = 6;
  content.fills = [];
  const contentBorder = findVariable('border');
  if (contentBorder) { content.strokes = [varPaint(contentBorder)]; content.strokeWeight = 1; }

  const contentLabel = figma.createText();
  contentLabel.name = 'Content Label';
  contentLabel.fontName = { family: 'Inter', style: 'Medium' };
  contentLabel.characters = 'Name';
  contentLabel.fontSize = 14;
  contentLabel.lineHeight = { value: 14, unit: 'PIXELS' };
  const contentLabelFg = findVariable('foreground');
  if (contentLabelFg) contentLabel.fills = [varPaint(contentLabelFg)];
  content.appendChild(contentLabel);

  const contentValue = figma.createText();
  contentValue.name = 'Content Value';
  contentValue.fontName = { family: 'Inter', style: 'Regular' };
  contentValue.characters = 'pedro@example.com';
  contentValue.fontSize = 14;
  contentValue.lineHeight = { value: 20, unit: 'PIXELS' };
  const contentValueFg = findVariable('muted-foreground');
  if (contentValueFg) contentValue.fills = [varPaint(contentValueFg)];
  content.appendChild(contentValue);

  card.appendChild(content);

  // ----- Footer (Cancel + Confirm) -----
  const footer = figma.createFrame();
  footer.name = 'Footer';
  footer.layoutMode = 'HORIZONTAL';
  footer.primaryAxisSizingMode = 'FIXED';
  footer.counterAxisSizingMode = 'AUTO';
  footer.layoutAlign = 'STRETCH';
  footer.primaryAxisAlignItems = 'MAX';
  footer.counterAxisAlignItems = 'CENTER';
  footer.itemSpacing = 8;
  footer.paddingTop = 8;
  footer.fills = [];

  // Cancel button (outline variant).
  const cancelBtn = figma.createFrame();
  cancelBtn.name = 'Cancel Button';
  cancelBtn.layoutMode = 'HORIZONTAL';
  cancelBtn.primaryAxisSizingMode = 'AUTO';
  cancelBtn.counterAxisSizingMode = 'FIXED';
  cancelBtn.primaryAxisAlignItems = 'CENTER';
  cancelBtn.counterAxisAlignItems = 'CENTER';
  cancelBtn.paddingLeft = 16;
  cancelBtn.paddingRight = 16;
  cancelBtn.itemSpacing = 8;
  cancelBtn.cornerRadius = 6;
  cancelBtn.resize(100, 40);
  cancelBtn.fills = [];
  const cancelBorder = findVariable('input');
  if (cancelBorder) { cancelBtn.strokes = [varPaint(cancelBorder)]; cancelBtn.strokeWeight = 1; }

  const cancelText = figma.createText();
  cancelText.fontName = { family: 'Inter', style: 'Medium' };
  cancelText.characters = 'Cancel';
  cancelText.fontSize = 14;
  const cancelFg = findVariable('foreground');
  if (cancelFg) cancelText.fills = [varPaint(cancelFg)];
  cancelBtn.appendChild(cancelText);
  footer.appendChild(cancelBtn);

  // Confirm button (default/primary variant).
  const confirmBtn = figma.createFrame();
  confirmBtn.name = 'Confirm Button';
  confirmBtn.layoutMode = 'HORIZONTAL';
  confirmBtn.primaryAxisSizingMode = 'AUTO';
  confirmBtn.counterAxisSizingMode = 'FIXED';
  confirmBtn.primaryAxisAlignItems = 'CENTER';
  confirmBtn.counterAxisAlignItems = 'CENTER';
  confirmBtn.paddingLeft = 16;
  confirmBtn.paddingRight = 16;
  confirmBtn.itemSpacing = 8;
  confirmBtn.cornerRadius = 6;
  confirmBtn.resize(100, 40);
  const confirmBg = findVariable('primary');
  if (confirmBg) confirmBtn.fills = [varPaint(confirmBg)];

  const confirmText = figma.createText();
  confirmText.fontName = { family: 'Inter', style: 'Medium' };
  confirmText.characters = 'Continue';
  confirmText.fontSize = 14;
  const confirmFg = findVariable('primary-foreground');
  if (confirmFg) confirmText.fills = [varPaint(confirmFg)];
  confirmBtn.appendChild(confirmText);
  footer.appendChild(confirmBtn);

  card.appendChild(footer);

  comp.appendChild(card);
  page.appendChild(comp);
}

async function gen_popover(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Popover';
  comp.description = 'Shadcn popover. A floating panel rendered on top of content with popover background, 1px border, rounded-md corners, drop shadow, and 16px padding. Single representative instance containing a title, description, and a labeled input field.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(288, 100);
  comp.paddingLeft = 16;
  comp.paddingRight = 16;
  comp.paddingTop = 16;
  comp.paddingBottom = 16;
  comp.itemSpacing = 16;
  comp.cornerRadius = 6;

  const bgVar = findVariable('popover');
  if (bgVar) comp.fills = [varPaint(bgVar)];
  const borderVar = findVariable('border');
  if (borderVar) { comp.strokes = [varPaint(borderVar)]; comp.strokeWeight = 1; }
  comp.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.1 },
    offset: { x: 0, y: 4 },
    radius: 12,
    spread: 0,
    visible: true,
    blendMode: 'NORMAL',
  }];

  const fgVar = findVariable('popover-foreground');
  const mutedVar = findVariable('muted-foreground');

  // Header block: title + description
  const header = figma.createFrame();
  header.name = 'Header';
  header.layoutMode = 'VERTICAL';
  header.primaryAxisSizingMode = 'AUTO';
  header.counterAxisSizingMode = 'AUTO';
  header.layoutAlign = 'STRETCH';
  header.itemSpacing = 4;
  header.fills = [];

  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'Medium' };
  title.characters = 'Dimensions';
  title.fontSize = 14;
  title.lineHeight = { value: 16, unit: 'PIXELS' };
  if (fgVar) title.fills = [varPaint(fgVar)];
  header.appendChild(title);

  const description = figma.createText();
  description.fontName = { family: 'Inter', style: 'Regular' };
  description.characters = 'Set the dimensions for the layer.';
  description.fontSize = 14;
  description.lineHeight = { value: 20, unit: 'PIXELS' };
  if (mutedVar) description.fills = [varPaint(mutedVar)];
  header.appendChild(description);

  comp.appendChild(header);

  // Field row: label + input
  const row = figma.createFrame();
  row.name = 'Field';
  row.layoutMode = 'HORIZONTAL';
  row.primaryAxisSizingMode = 'FIXED';
  row.counterAxisSizingMode = 'AUTO';
  row.counterAxisAlignItems = 'CENTER';
  row.layoutAlign = 'STRETCH';
  row.itemSpacing = 8;
  row.fills = [];

  const label = figma.createText();
  label.fontName = { family: 'Inter', style: 'Medium' };
  label.characters = 'Width';
  label.fontSize = 14;
  label.lineHeight = { value: 14, unit: 'PIXELS' };
  if (fgVar) label.fills = [varPaint(fgVar)];
  row.appendChild(label);

  const input = figma.createFrame();
  input.name = 'Input';
  input.layoutMode = 'HORIZONTAL';
  input.primaryAxisSizingMode = 'FIXED';
  input.counterAxisSizingMode = 'FIXED';
  input.counterAxisAlignItems = 'CENTER';
  input.layoutGrow = 1;
  input.resize(120, 36);
  input.paddingLeft = 12;
  input.paddingRight = 12;
  input.cornerRadius = 6;
  const inputBgVar = findVariable('background');
  if (inputBgVar) input.fills = [varPaint(inputBgVar)];
  const inputBorderVar = findVariable('input');
  if (inputBorderVar) { input.strokes = [varPaint(inputBorderVar)]; input.strokeWeight = 1; }

  const inputText = figma.createText();
  inputText.fontName = { family: 'Inter', style: 'Regular' };
  inputText.characters = '100%';
  inputText.fontSize = 14;
  if (fgVar) inputText.fills = [varPaint(fgVar)];
  input.appendChild(inputText);

  row.appendChild(input);
  comp.appendChild(row);

  page.appendChild(comp);
}

async function gen_sheet(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Sheet';
  comp.description = 'Shadcn sheet. Right-side slide-over panel (w-80) at full height containing a header (title + description + close button), a scrollable form content body, and a footer with Cancel and Save actions.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.primaryAxisAlignItems = 'MIN';
  comp.counterAxisAlignItems = 'MIN';
  comp.resize(320, 600);
  comp.paddingTop = 24;
  comp.paddingBottom = 24;
  comp.paddingLeft = 24;
  comp.paddingRight = 24;
  comp.itemSpacing = 24;
  {
    const v = findVariable('background');
    if (v) comp.fills = [varPaint(v)];
  }
  {
    const v = findVariable('border');
    if (v) {
      comp.strokes = [varPaint(v)];
      comp.strokeWeight = 1;
    }
  }

  const fgVar = findVariable('foreground');
  const mutedFgVar = findVariable('muted-foreground');

  // Header: title row (title + close X) + description
  const header = figma.createFrame();
  header.name = 'Header';
  header.layoutMode = 'VERTICAL';
  header.primaryAxisSizingMode = 'AUTO';
  header.counterAxisSizingMode = 'AUTO';
  header.layoutAlign = 'STRETCH';
  header.itemSpacing = 8;
  header.fills = [];

  const titleRow = figma.createFrame();
  titleRow.name = 'Title Row';
  titleRow.layoutMode = 'HORIZONTAL';
  titleRow.primaryAxisSizingMode = 'FIXED';
  titleRow.counterAxisSizingMode = 'AUTO';
  titleRow.layoutAlign = 'STRETCH';
  titleRow.primaryAxisAlignItems = 'SPACE_BETWEEN';
  titleRow.counterAxisAlignItems = 'CENTER';
  titleRow.itemSpacing = 8;
  titleRow.fills = [];

  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'SemiBold' };
  title.characters = 'Edit profile';
  title.fontSize = 18;
  if (fgVar) title.fills = [varPaint(fgVar)];
  titleRow.appendChild(title);

  // Close button (X) rendered as a glyph for reliable, variable-bound color
  const closeBtn = figma.createFrame();
  closeBtn.name = 'Close';
  closeBtn.layoutMode = 'HORIZONTAL';
  closeBtn.primaryAxisSizingMode = 'FIXED';
  closeBtn.counterAxisSizingMode = 'FIXED';
  closeBtn.primaryAxisAlignItems = 'CENTER';
  closeBtn.counterAxisAlignItems = 'CENTER';
  closeBtn.resize(16, 16);
  closeBtn.fills = [];
  const closeIcon = figma.createText();
  closeIcon.fontName = { family: 'Inter', style: 'Medium' };
  closeIcon.characters = '✕';
  closeIcon.fontSize = 14;
  if (mutedFgVar) closeIcon.fills = [varPaint(mutedFgVar)];
  closeBtn.appendChild(closeIcon);
  titleRow.appendChild(closeBtn);

  header.appendChild(titleRow);

  const desc = figma.createText();
  desc.fontName = { family: 'Inter', style: 'Regular' };
  desc.characters = "Make changes to your profile here. Click save when you're done.";
  desc.fontSize = 14;
  desc.layoutAlign = 'STRETCH';
  if (mutedFgVar) desc.fills = [varPaint(mutedFgVar)];
  header.appendChild(desc);

  comp.appendChild(header);

  // Content body: labeled field rows to represent form content; grows to fill height
  const content = figma.createFrame();
  content.name = 'Content';
  content.layoutMode = 'VERTICAL';
  content.primaryAxisSizingMode = 'FIXED';
  content.counterAxisSizingMode = 'AUTO';
  content.layoutAlign = 'STRETCH';
  content.layoutGrow = 1;
  content.itemSpacing = 16;
  content.fills = [];

  const fields: { label: string; value: string }[] = [
    { label: 'Name', value: 'Pedro Duarte' },
    { label: 'Username', value: '@peduarte' },
  ];
  for (const field of fields) {
    const fieldFrame = figma.createFrame();
    fieldFrame.name = 'Field';
    fieldFrame.layoutMode = 'VERTICAL';
    fieldFrame.primaryAxisSizingMode = 'AUTO';
    fieldFrame.counterAxisSizingMode = 'AUTO';
    fieldFrame.layoutAlign = 'STRETCH';
    fieldFrame.itemSpacing = 8;
    fieldFrame.fills = [];

    const label = figma.createText();
    label.fontName = { family: 'Inter', style: 'Medium' };
    label.characters = field.label;
    label.fontSize = 14;
    if (fgVar) label.fills = [varPaint(fgVar)];
    fieldFrame.appendChild(label);

    const input = figma.createFrame();
    input.name = 'Input';
    input.layoutMode = 'HORIZONTAL';
    input.primaryAxisSizingMode = 'FIXED';
    input.counterAxisSizingMode = 'FIXED';
    input.layoutAlign = 'STRETCH';
    input.counterAxisAlignItems = 'CENTER';
    input.resize(272, 36);
    input.paddingLeft = 12;
    input.paddingRight = 12;
    input.cornerRadius = 6;
    {
      const bg = findVariable('background');
      if (bg) input.fills = [varPaint(bg)];
    }
    {
      const inputVar = findVariable('input');
      if (inputVar) {
        input.strokes = [varPaint(inputVar)];
        input.strokeWeight = 1;
      }
    }
    const inputText = figma.createText();
    inputText.fontName = { family: 'Inter', style: 'Regular' };
    inputText.characters = field.value;
    inputText.fontSize = 14;
    if (fgVar) inputText.fills = [varPaint(fgVar)];
    input.appendChild(inputText);
    fieldFrame.appendChild(input);

    content.appendChild(fieldFrame);
  }
  comp.appendChild(content);

  // Footer: actions aligned to the right
  const footer = figma.createFrame();
  footer.name = 'Footer';
  footer.layoutMode = 'HORIZONTAL';
  footer.primaryAxisSizingMode = 'FIXED';
  footer.counterAxisSizingMode = 'AUTO';
  footer.layoutAlign = 'STRETCH';
  footer.primaryAxisAlignItems = 'MAX';
  footer.counterAxisAlignItems = 'CENTER';
  footer.itemSpacing = 8;
  footer.fills = [];

  // Cancel (outline) button
  const cancelBtn = figma.createFrame();
  cancelBtn.name = 'Cancel';
  cancelBtn.layoutMode = 'HORIZONTAL';
  cancelBtn.primaryAxisSizingMode = 'AUTO';
  cancelBtn.counterAxisSizingMode = 'FIXED';
  cancelBtn.primaryAxisAlignItems = 'CENTER';
  cancelBtn.counterAxisAlignItems = 'CENTER';
  cancelBtn.resize(80, 36);
  cancelBtn.paddingLeft = 16;
  cancelBtn.paddingRight = 16;
  cancelBtn.cornerRadius = 6;
  cancelBtn.fills = [];
  {
    const inputVar = findVariable('input');
    if (inputVar) {
      cancelBtn.strokes = [varPaint(inputVar)];
      cancelBtn.strokeWeight = 1;
    }
  }
  const cancelText = figma.createText();
  cancelText.fontName = { family: 'Inter', style: 'Medium' };
  cancelText.characters = 'Cancel';
  cancelText.fontSize = 14;
  if (fgVar) cancelText.fills = [varPaint(fgVar)];
  cancelBtn.appendChild(cancelText);
  footer.appendChild(cancelBtn);

  // Save (primary) button
  const saveBtn = figma.createFrame();
  saveBtn.name = 'Save';
  saveBtn.layoutMode = 'HORIZONTAL';
  saveBtn.primaryAxisSizingMode = 'AUTO';
  saveBtn.counterAxisSizingMode = 'FIXED';
  saveBtn.primaryAxisAlignItems = 'CENTER';
  saveBtn.counterAxisAlignItems = 'CENTER';
  saveBtn.resize(120, 36);
  saveBtn.paddingLeft = 16;
  saveBtn.paddingRight = 16;
  saveBtn.cornerRadius = 6;
  {
    const primary = findVariable('primary');
    if (primary) saveBtn.fills = [varPaint(primary)];
  }
  const saveText = figma.createText();
  saveText.fontName = { family: 'Inter', style: 'Medium' };
  saveText.characters = 'Save changes';
  saveText.fontSize = 14;
  {
    const primaryFg = findVariable('primary-foreground');
    if (primaryFg) saveText.fills = [varPaint(primaryFg)];
  }
  saveBtn.appendChild(saveText);
  footer.appendChild(saveBtn);

  comp.appendChild(footer);

  page.appendChild(comp);
}

async function gen_drawer(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Drawer';
  comp.description = 'Shadcn drawer. A bottom-anchored panel that slides up from the edge of the screen. Anatomy: grab handle, header (title + description), content area, and footer with primary (Submit) and secondary (Cancel/outline) actions.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.counterAxisAlignItems = 'CENTER';
  comp.resize(420, 100);
  comp.paddingTop = 16;
  comp.paddingBottom = 16;
  comp.paddingLeft = 0;
  comp.paddingRight = 0;
  comp.itemSpacing = 16;
  comp.topLeftRadius = 8;
  comp.topRightRadius = 8;
  comp.bottomLeftRadius = 0;
  comp.bottomRightRadius = 0;
  const bgVar = findVariable('background');
  if (bgVar) comp.fills = [varPaint(bgVar)];
  const borderVar = findVariable('border');
  if (borderVar) { comp.strokes = [varPaint(borderVar)]; comp.strokeWeight = 1; }

  // Grab handle
  const handle = figma.createRectangle();
  handle.name = 'Grab Handle';
  handle.resize(100, 8);
  handle.cornerRadius = 9999;
  handle.layoutAlign = 'CENTER';
  const muteVar = findVariable('muted');
  if (muteVar) handle.fills = [varPaint(muteVar)];
  comp.appendChild(handle);

  // Header (title + description)
  const header = figma.createFrame();
  header.name = 'Header';
  header.layoutMode = 'VERTICAL';
  header.primaryAxisSizingMode = 'AUTO';
  header.counterAxisSizingMode = 'AUTO';
  header.layoutAlign = 'STRETCH';
  header.fills = [];
  header.itemSpacing = 6;
  header.paddingLeft = 16;
  header.paddingRight = 16;
  comp.appendChild(header);
  header.layoutSizingHorizontal = 'FILL';

  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'SemiBold' };
  title.characters = 'Move Goal';
  title.fontSize = 18;
  title.lineHeight = { value: 24, unit: 'PIXELS' };
  const fgVar = findVariable('foreground');
  if (fgVar) title.fills = [varPaint(fgVar)];
  header.appendChild(title);

  const desc = figma.createText();
  desc.fontName = { family: 'Inter', style: 'Regular' };
  desc.characters = 'Set your daily activity goal.';
  desc.fontSize = 14;
  desc.lineHeight = { value: 20, unit: 'PIXELS' };
  const mutedFgVar = findVariable('muted-foreground');
  if (mutedFgVar) desc.fills = [varPaint(mutedFgVar)];
  header.appendChild(desc);
  desc.layoutSizingHorizontal = 'FILL';

  // Content
  const content = figma.createFrame();
  content.name = 'Content';
  content.layoutMode = 'VERTICAL';
  content.primaryAxisSizingMode = 'AUTO';
  content.counterAxisSizingMode = 'AUTO';
  content.counterAxisAlignItems = 'CENTER';
  content.primaryAxisAlignItems = 'CENTER';
  content.layoutAlign = 'STRETCH';
  content.fills = [];
  content.itemSpacing = 8;
  content.paddingLeft = 16;
  content.paddingRight = 16;
  content.paddingTop = 8;
  content.paddingBottom = 8;
  comp.appendChild(content);
  content.layoutSizingHorizontal = 'FILL';

  const bigNumber = figma.createText();
  bigNumber.fontName = { family: 'Inter', style: 'Bold' };
  bigNumber.characters = '350';
  bigNumber.fontSize = 56;
  bigNumber.lineHeight = { value: 64, unit: 'PIXELS' };
  if (fgVar) bigNumber.fills = [varPaint(fgVar)];
  content.appendChild(bigNumber);

  const unit = figma.createText();
  unit.fontName = { family: 'Inter', style: 'Regular' };
  unit.characters = 'CALORIES/DAY';
  unit.fontSize = 12;
  unit.lineHeight = { value: 16, unit: 'PIXELS' };
  unit.letterSpacing = { value: 5, unit: 'PERCENT' };
  if (mutedFgVar) unit.fills = [varPaint(mutedFgVar)];
  content.appendChild(unit);

  // Footer
  const footer = figma.createFrame();
  footer.name = 'Footer';
  footer.layoutMode = 'VERTICAL';
  footer.primaryAxisSizingMode = 'AUTO';
  footer.counterAxisSizingMode = 'AUTO';
  footer.layoutAlign = 'STRETCH';
  footer.fills = [];
  footer.itemSpacing = 8;
  footer.paddingLeft = 16;
  footer.paddingRight = 16;
  comp.appendChild(footer);
  footer.layoutSizingHorizontal = 'FILL';

  // Primary button (Submit)
  const submitBtn = figma.createFrame();
  submitBtn.name = 'Submit';
  submitBtn.layoutMode = 'HORIZONTAL';
  submitBtn.primaryAxisAlignItems = 'CENTER';
  submitBtn.counterAxisAlignItems = 'CENTER';
  submitBtn.primaryAxisSizingMode = 'FIXED';
  submitBtn.counterAxisSizingMode = 'FIXED';
  submitBtn.layoutAlign = 'STRETCH';
  submitBtn.paddingLeft = 16;
  submitBtn.paddingRight = 16;
  submitBtn.cornerRadius = 6;
  submitBtn.resize(388, 40);
  const primaryVar = findVariable('primary');
  if (primaryVar) submitBtn.fills = [varPaint(primaryVar)];
  footer.appendChild(submitBtn);
  submitBtn.layoutSizingHorizontal = 'FILL';

  const submitText = figma.createText();
  submitText.fontName = { family: 'Inter', style: 'Medium' };
  submitText.characters = 'Submit';
  submitText.fontSize = 14;
  const primaryFgVar = findVariable('primary-foreground');
  if (primaryFgVar) submitText.fills = [varPaint(primaryFgVar)];
  submitBtn.appendChild(submitText);

  // Secondary button (Cancel - outline)
  const cancelBtn = figma.createFrame();
  cancelBtn.name = 'Cancel';
  cancelBtn.layoutMode = 'HORIZONTAL';
  cancelBtn.primaryAxisAlignItems = 'CENTER';
  cancelBtn.counterAxisAlignItems = 'CENTER';
  cancelBtn.primaryAxisSizingMode = 'FIXED';
  cancelBtn.counterAxisSizingMode = 'FIXED';
  cancelBtn.layoutAlign = 'STRETCH';
  cancelBtn.paddingLeft = 16;
  cancelBtn.paddingRight = 16;
  cancelBtn.cornerRadius = 6;
  cancelBtn.resize(388, 40);
  cancelBtn.fills = [];
  const inputVar = findVariable('input');
  if (inputVar) { cancelBtn.strokes = [varPaint(inputVar)]; cancelBtn.strokeWeight = 1; }
  footer.appendChild(cancelBtn);
  cancelBtn.layoutSizingHorizontal = 'FILL';

  const cancelText = figma.createText();
  cancelText.fontName = { family: 'Inter', style: 'Medium' };
  cancelText.characters = 'Cancel';
  cancelText.fontSize = 14;
  if (fgVar) cancelText.fills = [varPaint(fgVar)];
  cancelBtn.appendChild(cancelText);

  page.appendChild(comp);
}

async function gen_hover_card(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Hover Card';
  comp.description = 'Shadcn hover-card. Floating popover card shown on hover. Contains an avatar, name/handle header, a short bio paragraph, and a meta line. Single representative instance.';

  // Outer card container (popover): rounded-md border, p-4, shadow-md, w-64
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'AUTO';
  comp.itemSpacing = 16;
  comp.paddingTop = 16;
  comp.paddingBottom = 16;
  comp.paddingLeft = 16;
  comp.paddingRight = 16;
  comp.cornerRadius = 6;
  comp.resize(256, 100);

  const popoverBg = findVariable('popover');
  if (popoverBg) comp.fills = [varPaint(popoverBg)];
  const borderVar = findVariable('border');
  if (borderVar) { comp.strokes = [varPaint(borderVar)]; comp.strokeWeight = 1; }
  comp.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.1 },
    offset: { x: 0, y: 4 },
    radius: 6,
    spread: -1,
    visible: true,
    blendMode: 'NORMAL',
  }];

  // Avatar: h-10 w-10 rounded-full
  const avatar = figma.createFrame();
  avatar.name = 'Avatar';
  avatar.layoutMode = 'HORIZONTAL';
  avatar.primaryAxisAlignItems = 'CENTER';
  avatar.counterAxisAlignItems = 'CENTER';
  avatar.cornerRadius = 9999;
  avatar.clipsContent = true;
  avatar.resize(40, 40);
  const avatarBg = findVariable('muted');
  if (avatarBg) avatar.fills = [varPaint(avatarBg)];

  const avatarFallback = figma.createText();
  avatarFallback.fontName = { family: 'Inter', style: 'Medium' };
  avatarFallback.characters = 'VC';
  avatarFallback.fontSize = 14;
  const avatarFg = findVariable('muted-foreground');
  if (avatarFg) avatarFallback.fills = [varPaint(avatarFg)];
  avatar.appendChild(avatarFallback);

  comp.appendChild(avatar);
  // Set layout sizing AFTER appending to an auto-layout parent.
  avatar.layoutGrow = 0;
  avatar.layoutSizingHorizontal = 'FIXED';
  avatar.layoutSizingVertical = 'FIXED';

  // Content column: name/handle + bio + meta
  const content = figma.createFrame();
  content.name = 'Content';
  content.layoutMode = 'VERTICAL';
  content.primaryAxisSizingMode = 'AUTO';
  content.counterAxisSizingMode = 'AUTO';
  content.itemSpacing = 4;
  content.fills = [];

  comp.appendChild(content);
  // Set layout sizing AFTER appending to an auto-layout parent.
  content.layoutGrow = 1;
  content.layoutSizingHorizontal = 'FILL';

  // Name / handle (text-sm font-semibold)
  const name = figma.createText();
  name.name = 'Name';
  name.fontName = { family: 'Inter', style: 'SemiBold' };
  name.characters = '@nextjs';
  name.fontSize = 14;
  const fgVar = findVariable('popover-foreground');
  if (fgVar) name.fills = [varPaint(fgVar)];
  content.appendChild(name);
  name.layoutSizingHorizontal = 'FILL';

  // Bio (text-sm muted)
  const bio = figma.createText();
  bio.name = 'Bio';
  bio.fontName = { family: 'Inter', style: 'Regular' };
  bio.characters = 'The React Framework - created and maintained by @vercel.';
  bio.fontSize = 14;
  bio.lineHeight = { value: 20, unit: 'PIXELS' };
  const bioFg = findVariable('muted-foreground');
  if (bioFg) bio.fills = [varPaint(bioFg)];
  content.appendChild(bio);
  bio.layoutSizingHorizontal = 'FILL';

  // Footer meta line (text-xs muted) e.g. join date
  const meta = figma.createText();
  meta.name = 'Meta';
  meta.fontName = { family: 'Inter', style: 'Regular' };
  meta.characters = 'Joined December 2021';
  meta.fontSize = 12;
  const metaFg = findVariable('muted-foreground');
  if (metaFg) meta.fills = [varPaint(metaFg)];
  content.appendChild(meta);
  meta.layoutSizingHorizontal = 'FILL';

  page.appendChild(comp);
}

async function gen_dropdown_menu(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const popoverBg = findVariable('popover');
  const popoverFg = findVariable('popover-foreground');
  const mutedFg = findVariable('muted-foreground');
  const borderVar = findVariable('border');
  const accentBg = findVariable('accent');
  const accentFg = findVariable('accent-foreground');
  const destructiveFg = findVariable('destructive');

  // Root menu panel
  const panel = figma.createComponent();
  panel.name = 'Dropdown Menu';
  panel.description =
    'Shadcn dropdown menu. Popover panel (popover bg, border, rounded-md, shadow) containing a label, menu items (one with a leading icon, one with a keyboard shortcut), a separator, and a destructive item.';
  panel.layoutMode = 'VERTICAL';
  panel.primaryAxisSizingMode = 'AUTO';
  panel.counterAxisSizingMode = 'FIXED';
  panel.resize(224, 100);
  panel.paddingTop = 4;
  panel.paddingBottom = 4;
  panel.paddingLeft = 4;
  panel.paddingRight = 4;
  panel.itemSpacing = 0;
  panel.cornerRadius = 6;
  if (popoverBg) panel.fills = [varPaint(popoverBg)];
  if (borderVar) {
    panel.strokes = [varPaint(borderVar)];
    panel.strokeWeight = 1;
  }
  panel.effects = [
    {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.1 },
      offset: { x: 0, y: 4 },
      radius: 12,
      spread: 0,
      visible: true,
      blendMode: 'NORMAL',
    },
  ];

  // Helper: build a menu label row
  const makeLabel = (label: string): FrameNode => {
    const row = figma.createFrame();
    row.name = 'Label';
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'FIXED';
    row.counterAxisSizingMode = 'AUTO';
    row.layoutAlign = 'STRETCH';
    row.primaryAxisAlignItems = 'MIN';
    row.counterAxisAlignItems = 'CENTER';
    row.paddingLeft = 8;
    row.paddingRight = 8;
    row.paddingTop = 6;
    row.paddingBottom = 6;
    row.itemSpacing = 0;
    row.cornerRadius = 4;
    row.fills = [];
    const t = figma.createText();
    t.fontName = { family: 'Inter', style: 'SemiBold' };
    t.characters = label;
    t.fontSize = 14;
    if (popoverFg) t.fills = [varPaint(popoverFg)];
    row.appendChild(t);
    return row;
  };

  // Helper: build a menu item row
  const makeItem = (
    label: string,
    opts: { icon?: boolean; shortcut?: string | null; destructive?: boolean; highlighted?: boolean }
  ): FrameNode => {
    const row = figma.createFrame();
    row.name = opts.destructive ? 'Item (Destructive)' : 'Item';
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'FIXED';
    row.counterAxisSizingMode = 'AUTO';
    row.layoutAlign = 'STRETCH';
    row.primaryAxisAlignItems = 'MIN';
    row.counterAxisAlignItems = 'CENTER';
    row.paddingLeft = 8;
    row.paddingRight = 8;
    row.paddingTop = 6;
    row.paddingBottom = 6;
    row.itemSpacing = 8;
    row.cornerRadius = 4;
    if (opts.highlighted && accentBg) {
      row.fills = [varPaint(accentBg)];
    } else {
      row.fills = [];
    }

    const fgVar: Variable | undefined = opts.destructive ? destructiveFg : opts.highlighted ? accentFg : popoverFg;

    if (opts.icon) {
      const icon = figma.createFrame();
      icon.name = 'Icon';
      icon.resize(16, 16);
      icon.layoutMode = 'NONE';
      icon.fills = [];
      icon.cornerRadius = 3;
      if (fgVar) {
        icon.strokes = [varPaint(fgVar)];
        icon.strokeWeight = 1.5;
      }
      row.appendChild(icon);
    }

    const t = figma.createText();
    t.fontName = { family: 'Inter', style: 'Regular' };
    t.characters = label;
    t.fontSize = 14;
    t.layoutGrow = 1;
    if (fgVar) t.fills = [varPaint(fgVar)];
    row.appendChild(t);

    if (opts.shortcut) {
      const sc = figma.createText();
      sc.fontName = { family: 'Inter', style: 'Regular' };
      sc.characters = opts.shortcut;
      sc.fontSize = 12;
      if (mutedFg) sc.fills = [varPaint(mutedFg)];
      row.appendChild(sc);
    }

    return row;
  };

  // Helper: separator
  const makeSeparator = (): FrameNode => {
    const wrap = figma.createFrame();
    wrap.name = 'Separator';
    wrap.layoutMode = 'VERTICAL';
    wrap.primaryAxisSizingMode = 'AUTO';
    wrap.counterAxisSizingMode = 'FIXED';
    wrap.layoutAlign = 'STRETCH';
    wrap.paddingTop = 4;
    wrap.paddingBottom = 4;
    wrap.paddingLeft = 0;
    wrap.paddingRight = 0;
    wrap.fills = [];
    const line = figma.createFrame();
    line.name = 'Line';
    line.layoutMode = 'HORIZONTAL';
    line.primaryAxisSizingMode = 'FIXED';
    line.counterAxisSizingMode = 'FIXED';
    line.layoutAlign = 'STRETCH';
    line.resize(208, 1);
    if (borderVar) line.fills = [varPaint(borderVar)];
    wrap.appendChild(line);
    return wrap;
  };

  panel.appendChild(makeLabel('My Account'));
  panel.appendChild(makeItem('Profile', { icon: true, shortcut: '⌘P' }));
  panel.appendChild(makeItem('Settings', { shortcut: '⌘S', highlighted: true }));
  panel.appendChild(makeItem('Keyboard shortcuts', { shortcut: '⌘K' }));
  panel.appendChild(makeSeparator());
  panel.appendChild(makeItem('Log out', { destructive: true, shortcut: '⇧⌘Q' }));

  page.appendChild(panel);
}

async function gen_context_menu(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const popoverFill = findVariable('popover');
  const popoverFg = findVariable('popover-foreground');
  const mutedFg = findVariable('muted-foreground');
  const accentFill = findVariable('accent');
  const accentFg = findVariable('accent-foreground');
  const borderVar = findVariable('border');
  const destructiveColor = findVariable('destructive');

  const comp = figma.createComponent();
  comp.name = 'Context Menu';
  comp.description = 'Shadcn context menu. A representative menu panel: items with right-aligned keyboard shortcuts, a highlighted (focused) item, a separator, and a destructive item.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(192, 100);
  comp.paddingTop = 4;
  comp.paddingBottom = 4;
  comp.paddingLeft = 4;
  comp.paddingRight = 4;
  comp.itemSpacing = 0;
  comp.cornerRadius = 6;
  if (popoverFill) comp.fills = [varPaint(popoverFill)];
  if (borderVar) { comp.strokes = [varPaint(borderVar)]; comp.strokeWeight = 1; }

  const makeItem = (label: string, shortcut: string | null, highlighted: boolean, destructive: boolean): FrameNode => {
    const item = figma.createFrame();
    item.name = label;
    item.layoutMode = 'HORIZONTAL';
    item.primaryAxisSizingMode = 'FIXED';
    item.counterAxisSizingMode = 'FIXED';
    item.layoutAlign = 'STRETCH';
    item.primaryAxisAlignItems = 'SPACE_BETWEEN';
    item.counterAxisAlignItems = 'CENTER';
    item.resize(184, 32);
    item.paddingLeft = 8;
    item.paddingRight = 8;
    item.paddingTop = 6;
    item.paddingBottom = 6;
    item.itemSpacing = 8;
    item.cornerRadius = 4;
    if (highlighted && accentFill) { item.fills = [varPaint(accentFill)]; } else { item.fills = []; }

    const text = figma.createText();
    text.fontName = { family: 'Inter', style: 'Regular' };
    text.characters = label;
    text.fontSize = 14;
    if (destructive) {
      if (destructiveColor) text.fills = [varPaint(destructiveColor)];
    } else if (highlighted) {
      if (accentFg) text.fills = [varPaint(accentFg)];
    } else if (popoverFg) {
      text.fills = [varPaint(popoverFg)];
    }
    item.appendChild(text);

    if (shortcut) {
      const sc = figma.createText();
      sc.fontName = { family: 'Inter', style: 'Regular' };
      sc.characters = shortcut;
      sc.fontSize = 12;
      sc.letterSpacing = { value: 5, unit: 'PERCENT' };
      if (mutedFg) sc.fills = [varPaint(mutedFg)];
      item.appendChild(sc);
    }
    return item;
  };

  const appendItem = (label: string, shortcut: string | null, highlighted: boolean, destructive: boolean): void => {
    const item = makeItem(label, shortcut, highlighted, destructive);
    comp.appendChild(item);
    item.layoutSizingHorizontal = 'FILL';
  };

  appendItem('Back', '⌘[', false, false);
  appendItem('Forward', '⌘]', true, false);
  appendItem('Reload', '⌘R', false, false);

  const sep = figma.createFrame();
  sep.name = 'Separator';
  sep.layoutMode = 'HORIZONTAL';
  sep.primaryAxisSizingMode = 'FIXED';
  sep.counterAxisSizingMode = 'FIXED';
  sep.layoutAlign = 'STRETCH';
  sep.counterAxisAlignItems = 'CENTER';
  sep.resize(184, 5);
  sep.paddingTop = 2;
  sep.paddingBottom = 2;
  sep.fills = [];
  const line = figma.createFrame();
  line.name = 'Line';
  line.layoutAlign = 'STRETCH';
  line.resize(184, 1);
  if (borderVar) line.fills = [varPaint(borderVar)];
  sep.appendChild(line);
  line.layoutSizingHorizontal = 'FILL';
  comp.appendChild(sep);
  sep.layoutSizingHorizontal = 'FILL';

  appendItem('Save Page As...', '⌘S', false, false);
  appendItem('Print...', '⌘P', false, false);
  appendItem('Delete', '⌫', false, true);

  page.appendChild(comp);
}

async function gen_command(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const fgVar = findVariable('foreground');
  const mutedFgVar = findVariable('muted-foreground');
  const popoverVar = findVariable('popover');
  const borderVar = findVariable('border');
  const accentVar = findVariable('accent');
  const accentFgVar = findVariable('accent-foreground');

  // Helper: build a small square "icon" placeholder using a rounded frame with a stroke.
  const makeIcon = (size: number, colorVar: Variable | undefined): FrameNode => {
    const icon = figma.createFrame();
    icon.name = 'Icon';
    icon.layoutMode = 'HORIZONTAL';
    icon.primaryAxisSizingMode = 'FIXED';
    icon.counterAxisSizingMode = 'FIXED';
    icon.resize(size, size);
    icon.cornerRadius = 3;
    icon.fills = [];
    if (colorVar) { icon.strokes = [varPaint(colorVar)]; icon.strokeWeight = 1.5; }
    return icon;
  };

  // Helper: make a text node.
  const makeText = (
    chars: string,
    style: 'Regular' | 'Medium' | 'SemiBold' | 'Bold',
    fontSize: number,
    colorVar: Variable | undefined,
  ): TextNode => {
    const t = figma.createText();
    t.fontName = { family: 'Inter', style };
    t.characters = chars;
    t.fontSize = fontSize;
    if (colorVar) t.fills = [varPaint(colorVar)];
    return t;
  };

  // Root component: the command palette container (popover).
  const comp = figma.createComponent();
  comp.name = 'Command';
  comp.description =
    'Shadcn command palette. Anatomy: search input row (with search icon + placeholder), separator, and a scrollable list of grouped items. Each item has a leading icon, label, and optional keyboard shortcut. Static representative instance.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(420, 100);
  comp.cornerRadius = 8;
  comp.clipsContent = true;
  if (popoverVar) comp.fills = [varPaint(popoverVar)];
  if (borderVar) { comp.strokes = [varPaint(borderVar)]; comp.strokeWeight = 1; }

  // --- Search input row ---
  const inputRow = figma.createFrame();
  inputRow.name = 'Input Row';
  inputRow.layoutMode = 'HORIZONTAL';
  inputRow.primaryAxisSizingMode = 'FIXED';
  inputRow.counterAxisSizingMode = 'FIXED';
  inputRow.layoutAlign = 'STRETCH';
  inputRow.counterAxisAlignItems = 'CENTER';
  inputRow.resize(420, 44);
  inputRow.paddingLeft = 12;
  inputRow.paddingRight = 12;
  inputRow.itemSpacing = 8;
  inputRow.fills = [];

  const searchIcon = makeIcon(16, mutedFgVar);
  searchIcon.name = 'Search Icon';
  inputRow.appendChild(searchIcon);

  const placeholder = makeText('Type a command or search...', 'Regular', 14, mutedFgVar);
  placeholder.name = 'Placeholder';
  inputRow.appendChild(placeholder);
  placeholder.layoutGrow = 1;

  comp.appendChild(inputRow);

  // --- Separator under the input ---
  const separator = figma.createFrame();
  separator.name = 'Separator';
  separator.layoutMode = 'HORIZONTAL';
  separator.primaryAxisSizingMode = 'FIXED';
  separator.counterAxisSizingMode = 'FIXED';
  separator.layoutAlign = 'STRETCH';
  separator.resize(420, 1);
  if (borderVar) separator.fills = [varPaint(borderVar)]; else separator.fills = [];
  comp.appendChild(separator);

  // --- List container ---
  const list = figma.createFrame();
  list.name = 'List';
  list.layoutMode = 'VERTICAL';
  list.primaryAxisSizingMode = 'AUTO';
  list.counterAxisSizingMode = 'FIXED';
  list.layoutAlign = 'STRETCH';
  list.resize(420, 100);
  list.paddingTop = 4;
  list.paddingBottom = 8;
  list.paddingLeft = 4;
  list.paddingRight = 4;
  list.itemSpacing = 4;
  list.fills = [];

  // Helper: a group heading row.
  const makeHeading = (label: string): FrameNode => {
    const heading = figma.createFrame();
    heading.name = 'Group Heading';
    heading.layoutMode = 'HORIZONTAL';
    heading.primaryAxisSizingMode = 'FIXED';
    heading.counterAxisSizingMode = 'AUTO';
    heading.layoutAlign = 'STRETCH';
    heading.counterAxisAlignItems = 'CENTER';
    heading.paddingLeft = 8;
    heading.paddingRight = 8;
    heading.paddingTop = 6;
    heading.paddingBottom = 6;
    heading.fills = [];
    const t = makeText(label, 'Medium', 12, mutedFgVar);
    heading.appendChild(t);
    return heading;
  };

  // Helper: an item row. `active` highlights it like a hovered/selected item.
  const makeItem = (label: string, shortcut: string | null, active: boolean): FrameNode => {
    const item = figma.createFrame();
    item.name = active ? 'Item (Selected)' : 'Item';
    item.layoutMode = 'HORIZONTAL';
    item.primaryAxisSizingMode = 'FIXED';
    item.counterAxisSizingMode = 'AUTO';
    item.layoutAlign = 'STRETCH';
    item.counterAxisAlignItems = 'CENTER';
    item.paddingLeft = 8;
    item.paddingRight = 8;
    item.paddingTop = 8;
    item.paddingBottom = 8;
    item.itemSpacing = 8;
    item.cornerRadius = 6;
    if (active && accentVar) item.fills = [varPaint(accentVar)]; else item.fills = [];

    const labelColor = active ? accentFgVar : fgVar;

    const itemIcon = makeIcon(16, active ? accentFgVar : mutedFgVar);
    item.appendChild(itemIcon);

    const labelText = makeText(label, 'Regular', 14, labelColor);
    item.appendChild(labelText);
    labelText.layoutGrow = 1;

    if (shortcut) {
      const kbd = makeText(shortcut, 'Medium', 12, mutedFgVar);
      kbd.name = 'Shortcut';
      kbd.textAlignHorizontal = 'RIGHT';
      item.appendChild(kbd);
    }

    return item;
  };

  // Group 1: Suggestions
  list.appendChild(makeHeading('Suggestions'));
  list.appendChild(makeItem('Calendar', null, true));
  list.appendChild(makeItem('Search Emoji', null, false));
  list.appendChild(makeItem('Calculator', null, false));

  // Inner separator between groups.
  const innerSep = figma.createFrame();
  innerSep.name = 'Separator';
  innerSep.layoutMode = 'HORIZONTAL';
  innerSep.primaryAxisSizingMode = 'FIXED';
  innerSep.counterAxisSizingMode = 'FIXED';
  innerSep.layoutAlign = 'STRETCH';
  innerSep.resize(412, 1);
  if (borderVar) innerSep.fills = [varPaint(borderVar)]; else innerSep.fills = [];
  list.appendChild(innerSep);

  // Group 2: Settings
  list.appendChild(makeHeading('Settings'));
  list.appendChild(makeItem('Profile', '⌘P', false));
  list.appendChild(makeItem('Billing', '⌘B', false));
  list.appendChild(makeItem('Settings', '⌘S', false));

  comp.appendChild(list);

  page.appendChild(comp);
}

async function gen_table(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const fgVar = findVariable('foreground');
  const mutedFgVar = findVariable('muted-foreground');
  const borderVar = findVariable('border');
  const cardVar = findVariable('card');

  type Column = {
    width: number;
    grow: boolean;
    align: 'MIN' | 'MAX';
    header: string;
    cells: string[];
    semibold: boolean;
  };

  // Column layout: name, grow weight, alignment, header label, and cell values per data row.
  const columns: Column[] = [
    { width: 120, grow: false, align: 'MIN', header: 'Invoice', cells: ['INV001', 'INV002', 'INV003'], semibold: true },
    { width: 0, grow: true, align: 'MIN', header: 'Status', cells: ['Paid', 'Pending', 'Unpaid'], semibold: false },
    { width: 0, grow: true, align: 'MIN', header: 'Method', cells: ['Credit Card', 'PayPal', 'Bank Transfer'], semibold: false },
    { width: 120, grow: false, align: 'MAX', header: 'Amount', cells: ['$250.00', '$150.00', '$350.00'], semibold: false },
  ];

  const rowHeight = 48;
  const cellPadX = 16;

  const makeCell = (value: string, col: Column, isHeader: boolean): FrameNode => {
    const cell = figma.createFrame();
    cell.name = isHeader ? 'HeaderCell' : 'Cell';
    cell.layoutMode = 'HORIZONTAL';
    cell.primaryAxisAlignItems = col.align === 'MAX' ? 'MAX' : 'MIN';
    cell.counterAxisAlignItems = 'CENTER';
    cell.primaryAxisSizingMode = 'FIXED';
    cell.counterAxisSizingMode = 'FIXED';
    cell.paddingLeft = cellPadX;
    cell.paddingRight = cellPadX;
    cell.fills = [];
    cell.resize(col.grow ? 160 : col.width, rowHeight);

    const text = figma.createText();
    text.fontName = isHeader
      ? { family: 'Inter', style: 'Medium' }
      : { family: 'Inter', style: col.semibold ? 'Medium' : 'Regular' };
    text.characters = value;
    text.fontSize = 14;
    text.textAlignHorizontal = col.align === 'MAX' ? 'RIGHT' : 'LEFT';
    if (isHeader) {
      if (mutedFgVar) text.fills = [varPaint(mutedFgVar)];
    } else {
      if (fgVar) text.fills = [varPaint(fgVar)];
    }
    cell.appendChild(text);
    return cell;
  };

  const makeRow = (
    name: string,
    isHeader: boolean,
    getValue: (col: Column) => string
  ): FrameNode => {
    const row = figma.createFrame();
    row.name = name;
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'FIXED';
    row.counterAxisSizingMode = 'FIXED';
    row.primaryAxisAlignItems = 'MIN';
    row.counterAxisAlignItems = 'CENTER';
    row.fills = [];
    row.resize(640, rowHeight);
    // Bottom border separating rows.
    if (borderVar) {
      row.strokes = [varPaint(borderVar)];
      row.strokeWeight = 1;
      row.strokeAlign = 'INSIDE';
      row.strokeTopWeight = 0;
      row.strokeLeftWeight = 0;
      row.strokeRightWeight = 0;
      row.strokeBottomWeight = 1;
    }
    for (const col of columns) {
      const cell = makeCell(getValue(col), col, isHeader);
      row.appendChild(cell);
      // Layout sizing must be set AFTER the cell is parented to an auto-layout frame.
      cell.layoutSizingVertical = 'FIXED';
      if (col.grow) {
        cell.layoutGrow = 1;
      } else {
        cell.layoutSizingHorizontal = 'FIXED';
      }
    }
    return row;
  };

  const comp = figma.createComponent();
  comp.name = 'Table';
  comp.description = 'Shadcn table composite. A muted-foreground header row followed by three data rows, each separated by a bottom border. Columns (Invoice, Status, Method, Amount) are aligned via nested auto-layout with the amount column right-aligned.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.primaryAxisAlignItems = 'MIN';
  comp.counterAxisAlignItems = 'MIN';
  comp.itemSpacing = 0;
  comp.cornerRadius = 8;
  comp.clipsContent = true;
  comp.resize(640, 100);
  if (cardVar) comp.fills = [varPaint(cardVar)];
  if (borderVar) {
    comp.strokes = [varPaint(borderVar)];
    comp.strokeWeight = 1;
    comp.strokeAlign = 'INSIDE';
  }

  const headerRow = makeRow('HeaderRow', true, (col) => col.header);
  comp.appendChild(headerRow);
  headerRow.layoutSizingHorizontal = 'FILL';

  for (let i = 0; i < 3; i++) {
    const dataRow = makeRow(`Row ${i + 1}`, false, (col) => col.cells[i]);
    comp.appendChild(dataRow);
    dataRow.layoutSizingHorizontal = 'FILL';
  }

  page.appendChild(comp);
}

async function gen_calendar(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Calendar';
  comp.description = 'Shadcn calendar. A single-month date picker: header with month label and prev/next nav buttons, a weekday row (Su-Sa), and a 6x7 grid of day cells. Today is highlighted with primary; out-of-month days are muted.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  comp.itemSpacing = 16;
  comp.paddingTop = 12;
  comp.paddingBottom = 12;
  comp.paddingLeft = 12;
  comp.paddingRight = 12;
  comp.cornerRadius = 8;
  const bgVar = findVariable('background');
  if (bgVar) comp.fills = [varPaint(bgVar)];
  const borderVar = findVariable('border');
  if (borderVar) { comp.strokes = [varPaint(borderVar)]; comp.strokeWeight = 1; }

  const fgVar = findVariable('foreground');
  const mutedFgVar = findVariable('muted-foreground');
  const primaryVar = findVariable('primary');
  const primaryFgVar = findVariable('primary-foreground');

  const cellSize = 36;

  // ---- Header: month label + prev/next nav ----
  const header = figma.createFrame();
  header.name = 'Header';
  header.layoutMode = 'HORIZONTAL';
  header.primaryAxisSizingMode = 'FIXED';
  header.counterAxisSizingMode = 'AUTO';
  header.primaryAxisAlignItems = 'SPACE_BETWEEN';
  header.counterAxisAlignItems = 'CENTER';
  header.fills = [];
  header.resize(cellSize * 7, cellSize);
  header.layoutAlign = 'STRETCH';

  const makeNavButton = (glyph: string): FrameNode => {
    const btn = figma.createFrame();
    btn.name = 'NavButton';
    btn.layoutMode = 'HORIZONTAL';
    btn.primaryAxisSizingMode = 'FIXED';
    btn.counterAxisSizingMode = 'FIXED';
    btn.primaryAxisAlignItems = 'CENTER';
    btn.counterAxisAlignItems = 'CENTER';
    btn.resize(28, 28);
    btn.cornerRadius = 6;
    btn.fills = [];
    if (borderVar) { btn.strokes = [varPaint(borderVar)]; btn.strokeWeight = 1; }
    const t = figma.createText();
    t.fontName = { family: 'Inter', style: 'Medium' };
    t.characters = glyph;
    t.fontSize = 14;
    if (fgVar) t.fills = [varPaint(fgVar)];
    btn.appendChild(t);
    return btn;
  };

  const prevBtn = makeNavButton('‹');
  const monthLabel = figma.createText();
  monthLabel.fontName = { family: 'Inter', style: 'SemiBold' };
  monthLabel.characters = 'June 2026';
  monthLabel.fontSize = 14;
  if (fgVar) monthLabel.fills = [varPaint(fgVar)];
  const nextBtn = makeNavButton('›');

  header.appendChild(prevBtn);
  header.appendChild(monthLabel);
  header.appendChild(nextBtn);
  comp.appendChild(header);

  // ---- Grid container (weekday row + day rows) ----
  const grid = figma.createFrame();
  grid.name = 'Grid';
  grid.layoutMode = 'VERTICAL';
  grid.primaryAxisSizingMode = 'AUTO';
  grid.counterAxisSizingMode = 'AUTO';
  grid.itemSpacing = 0;
  grid.fills = [];
  comp.appendChild(grid);

  // ---- Weekday row ----
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const weekdayRow = figma.createFrame();
  weekdayRow.name = 'Weekdays';
  weekdayRow.layoutMode = 'HORIZONTAL';
  weekdayRow.primaryAxisSizingMode = 'AUTO';
  weekdayRow.counterAxisSizingMode = 'AUTO';
  weekdayRow.itemSpacing = 0;
  weekdayRow.fills = [];
  for (const wd of weekdays) {
    const cell = figma.createFrame();
    cell.name = 'WeekdayCell';
    cell.layoutMode = 'HORIZONTAL';
    cell.primaryAxisSizingMode = 'FIXED';
    cell.counterAxisSizingMode = 'FIXED';
    cell.primaryAxisAlignItems = 'CENTER';
    cell.counterAxisAlignItems = 'CENTER';
    cell.resize(cellSize, cellSize);
    cell.fills = [];
    const t = figma.createText();
    t.fontName = { family: 'Inter', style: 'Medium' };
    t.characters = wd;
    t.fontSize = 12;
    if (mutedFgVar) t.fills = [varPaint(mutedFgVar)];
    cell.appendChild(t);
    weekdayRow.appendChild(cell);
  }
  grid.appendChild(weekdayRow);

  // ---- 6x7 day grid for June 2026 ----
  // June 1, 2026 is a Monday -> leading cell from May (col 0 = Sunday = May 31).
  // Build 42 cells: 1 trailing-prev (31), days 1..30, then trailing-next 1..11.
  const todayDay = 15;
  type DayCell = { label: string; outOfMonth: boolean; isToday: boolean };
  const cells: DayCell[] = [];
  cells.push({ label: '31', outOfMonth: true, isToday: false }); // May 31 (Sunday)
  for (let d = 1; d <= 30; d++) {
    cells.push({ label: String(d), outOfMonth: false, isToday: d === todayDay });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ label: String(nextDay), outOfMonth: true, isToday: false });
    nextDay++;
  }

  for (let row = 0; row < 6; row++) {
    const weekRow = figma.createFrame();
    weekRow.name = 'Week';
    weekRow.layoutMode = 'HORIZONTAL';
    weekRow.primaryAxisSizingMode = 'AUTO';
    weekRow.counterAxisSizingMode = 'AUTO';
    weekRow.itemSpacing = 0;
    weekRow.fills = [];
    for (let col = 0; col < 7; col++) {
      const data = cells[row * 7 + col];
      const cell = figma.createFrame();
      cell.name = 'DayCell';
      cell.layoutMode = 'HORIZONTAL';
      cell.primaryAxisSizingMode = 'FIXED';
      cell.counterAxisSizingMode = 'FIXED';
      cell.primaryAxisAlignItems = 'CENTER';
      cell.counterAxisAlignItems = 'CENTER';
      cell.resize(cellSize, cellSize);
      cell.cornerRadius = 6;
      if (data.isToday) {
        if (primaryVar) cell.fills = [varPaint(primaryVar)];
      } else {
        cell.fills = [];
      }
      const t = figma.createText();
      t.fontName = { family: 'Inter', style: data.isToday ? 'Medium' : 'Regular' };
      t.characters = data.label;
      t.fontSize = 14;
      if (data.isToday) {
        if (primaryFgVar) t.fills = [varPaint(primaryFgVar)];
      } else if (data.outOfMonth) {
        if (mutedFgVar) t.fills = [varPaint(mutedFgVar)];
      } else {
        if (fgVar) t.fills = [varPaint(fgVar)];
      }
      cell.appendChild(t);
      weekRow.appendChild(cell);
    }
    grid.appendChild(weekRow);
  }

  page.appendChild(comp);
}

async function gen_chart(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Chart';
  comp.description = 'Shadcn chart. A simple bar chart card with 6 vertical bars of varying height using chart-1..chart-5 series colors, a header with title and description, and an x-axis baseline.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  comp.paddingTop = 24;
  comp.paddingBottom = 24;
  comp.paddingLeft = 24;
  comp.paddingRight = 24;
  comp.itemSpacing = 24;
  comp.cornerRadius = 8;
  const cardBg = findVariable('card');
  if (cardBg) comp.fills = [varPaint(cardBg)];
  const cardBorder = findVariable('border');
  if (cardBorder) { comp.strokes = [varPaint(cardBorder)]; comp.strokeWeight = 1; }

  // Header
  const header = figma.createFrame();
  header.name = 'Header';
  header.layoutMode = 'VERTICAL';
  header.primaryAxisSizingMode = 'AUTO';
  header.counterAxisSizingMode = 'AUTO';
  header.itemSpacing = 6;
  header.fills = [];

  const title = figma.createText();
  title.fontName = { family: 'Inter', style: 'SemiBold' };
  title.characters = 'Bar Chart';
  title.fontSize = 16;
  const cardFg = findVariable('card-foreground');
  if (cardFg) title.fills = [varPaint(cardFg)];
  header.appendChild(title);

  const desc = figma.createText();
  desc.fontName = { family: 'Inter', style: 'Regular' };
  desc.characters = 'January - June 2024';
  desc.fontSize = 14;
  const mutedFg = findVariable('muted-foreground');
  if (mutedFg) desc.fills = [varPaint(mutedFg)];
  header.appendChild(desc);

  comp.appendChild(header);

  // Chart area
  const chartArea = figma.createFrame();
  chartArea.name = 'ChartArea';
  chartArea.layoutMode = 'VERTICAL';
  chartArea.primaryAxisSizingMode = 'FIXED';
  chartArea.counterAxisSizingMode = 'FIXED';
  chartArea.resize(320, 200);
  chartArea.itemSpacing = 0;
  chartArea.fills = [];

  // Bars row
  const barsRow = figma.createFrame();
  barsRow.name = 'Bars';
  barsRow.layoutMode = 'HORIZONTAL';
  barsRow.primaryAxisSizingMode = 'FIXED';
  barsRow.counterAxisSizingMode = 'FIXED';
  barsRow.layoutAlign = 'STRETCH';
  barsRow.layoutGrow = 1;
  barsRow.primaryAxisAlignItems = 'SPACE_BETWEEN';
  barsRow.counterAxisAlignItems = 'MAX';
  barsRow.itemSpacing = 12;
  barsRow.paddingLeft = 8;
  barsRow.paddingRight = 8;
  barsRow.fills = [];

  const barHeights: number[] = [120, 180, 90, 150, 110, 170];
  const series: string[] = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5', 'chart-1'];
  for (let i = 0; i < barHeights.length; i++) {
    const barHeight: number = barHeights[i] ?? 100;
    const seriesName: string = series[i] ?? 'chart-1';
    const bar = figma.createFrame();
    bar.name = `Bar ${i + 1}`;
    bar.layoutMode = 'VERTICAL';
    bar.primaryAxisSizingMode = 'FIXED';
    bar.counterAxisSizingMode = 'FIXED';
    bar.resize(36, barHeight);
    bar.topLeftRadius = 6;
    bar.topRightRadius = 6;
    bar.bottomLeftRadius = 0;
    bar.bottomRightRadius = 0;
    const sv = findVariable(seriesName);
    if (sv) bar.fills = [varPaint(sv)];
    barsRow.appendChild(bar);
  }
  chartArea.appendChild(barsRow);

  // X-axis line
  const axis = figma.createFrame();
  axis.name = 'XAxis';
  axis.layoutMode = 'HORIZONTAL';
  axis.primaryAxisSizingMode = 'FIXED';
  axis.counterAxisSizingMode = 'FIXED';
  axis.layoutAlign = 'STRETCH';
  axis.resize(320, 1);
  const borderV = findVariable('border');
  if (borderV) axis.fills = [varPaint(borderV)];
  chartArea.appendChild(axis);

  comp.appendChild(chartArea);

  page.appendChild(comp);
}

async function gen_carousel(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Carousel';
  comp.description = 'Shadcn carousel. A muted rounded-lg slide with circular previous/next arrow buttons positioned at the edges and dot indicators below.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'AUTO';
  comp.primaryAxisAlignItems = 'CENTER';
  comp.counterAxisAlignItems = 'CENTER';
  comp.itemSpacing = 16;
  comp.fills = [];

  const bgVar = findVariable('background');
  const borderVar = findVariable('border');
  const mutedVar = findVariable('muted');
  const mutedFgVar = findVariable('muted-foreground');
  const primaryVar = findVariable('primary');

  // Stage: holds the slide and overlapping arrow buttons.
  const stage = figma.createFrame();
  stage.name = 'Stage';
  stage.layoutMode = 'HORIZONTAL';
  stage.primaryAxisSizingMode = 'FIXED';
  stage.counterAxisSizingMode = 'FIXED';
  stage.primaryAxisAlignItems = 'CENTER';
  stage.counterAxisAlignItems = 'CENTER';
  stage.resize(360, 220);
  stage.fills = [];
  stage.clipsContent = false;
  comp.appendChild(stage);

  // Slide: muted rounded-lg box with centered numeral.
  const slide = figma.createFrame();
  slide.name = 'Slide';
  slide.layoutMode = 'HORIZONTAL';
  slide.layoutGrow = 1;
  slide.layoutAlign = 'STRETCH';
  slide.primaryAxisSizingMode = 'FIXED';
  slide.counterAxisSizingMode = 'FIXED';
  slide.primaryAxisAlignItems = 'CENTER';
  slide.counterAxisAlignItems = 'CENTER';
  slide.cornerRadius = 8;
  slide.resize(360, 220);
  if (mutedVar) slide.fills = [varPaint(mutedVar)];
  if (borderVar) { slide.strokes = [varPaint(borderVar)]; slide.strokeWeight = 1; }
  stage.appendChild(slide);

  const slideLabel = figma.createText();
  slideLabel.fontName = { family: 'Inter', style: 'SemiBold' };
  slideLabel.characters = '1';
  slideLabel.fontSize = 48;
  if (mutedFgVar) slideLabel.fills = [varPaint(mutedFgVar)];
  slide.appendChild(slideLabel);

  // Helper to build a circular arrow button (outline icon-button style).
  const makeArrow = (name: string, glyph: string): FrameNode => {
    const btn = figma.createFrame();
    btn.name = name;
    btn.layoutMode = 'HORIZONTAL';
    btn.primaryAxisSizingMode = 'FIXED';
    btn.counterAxisSizingMode = 'FIXED';
    btn.primaryAxisAlignItems = 'CENTER';
    btn.counterAxisAlignItems = 'CENTER';
    btn.cornerRadius = 9999;
    btn.resize(32, 32);
    if (bgVar) btn.fills = [varPaint(bgVar)];
    if (borderVar) { btn.strokes = [varPaint(borderVar)]; btn.strokeWeight = 1; }
    const icon = figma.createText();
    icon.fontName = { family: 'Inter', style: 'Medium' };
    icon.characters = glyph;
    icon.fontSize = 16;
    const fgVar = findVariable('foreground');
    if (fgVar) icon.fills = [varPaint(fgVar)];
    btn.appendChild(icon);
    return btn;
  };

  const prevBtn = makeArrow('Previous', '<');
  const nextBtn = makeArrow('Next', '>');
  stage.appendChild(prevBtn);
  stage.appendChild(nextBtn);

  // Position arrow buttons at the vertical center, overlapping slide edges.
  prevBtn.layoutPositioning = 'ABSOLUTE';
  prevBtn.constraints = { horizontal: 'MIN', vertical: 'CENTER' };
  prevBtn.x = -16;
  prevBtn.y = (stage.height - prevBtn.height) / 2;

  nextBtn.layoutPositioning = 'ABSOLUTE';
  nextBtn.constraints = { horizontal: 'MAX', vertical: 'CENTER' };
  nextBtn.x = stage.width - nextBtn.width + 16;
  nextBtn.y = (stage.height - nextBtn.height) / 2;

  // Dot indicators.
  const dots = figma.createFrame();
  dots.name = 'Dots';
  dots.layoutMode = 'HORIZONTAL';
  dots.primaryAxisSizingMode = 'AUTO';
  dots.counterAxisSizingMode = 'AUTO';
  dots.primaryAxisAlignItems = 'CENTER';
  dots.counterAxisAlignItems = 'CENTER';
  dots.itemSpacing = 8;
  dots.fills = [];
  comp.appendChild(dots);

  for (let i = 0; i < 4; i++) {
    const dot = figma.createEllipse();
    dot.name = i === 0 ? 'Dot Active' : 'Dot';
    dot.resize(8, 8);
    if (i === 0) {
      if (primaryVar) dot.fills = [varPaint(primaryVar)];
    } else {
      if (mutedFgVar) dot.fills = [varPaint(mutedFgVar)];
      dot.opacity = 0.4;
    }
    dots.appendChild(dot);
  }

  page.appendChild(comp);
}

async function gen_form(page: PageNode, findVariable: (name: string) => Variable | undefined): Promise<void> {
  const comp = figma.createComponent();
  comp.name = 'Form';
  comp.description = 'Shadcn form composite. Contains two form fields (each with a Label, Input, and helper/description text) stacked vertically with gap-6, followed by a primary submit Button. Built with nested auto-layout frames.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.primaryAxisAlignItems = 'MIN';
  comp.counterAxisAlignItems = 'MIN';
  comp.itemSpacing = 24;
  comp.paddingTop = 24;
  comp.paddingBottom = 24;
  comp.paddingLeft = 24;
  comp.paddingRight = 24;
  comp.cornerRadius = 8;
  comp.resize(360, 100);

  const cardV = findVariable('card');
  if (cardV) comp.fills = [varPaint(cardV)];
  const borderV = findVariable('border');
  if (borderV) { comp.strokes = [varPaint(borderV)]; comp.strokeWeight = 1; }

  const fgV = findVariable('foreground');
  const mutedFgV = findVariable('muted-foreground');
  const inputBorderV = findVariable('input');
  const bgV = findVariable('background');

  const buildField = (
    labelText: string,
    placeholderText: string,
    helperText: string
  ): FrameNode => {
    const field = figma.createFrame();
    field.name = 'Form Field';
    field.layoutMode = 'VERTICAL';
    field.primaryAxisSizingMode = 'AUTO';
    field.counterAxisSizingMode = 'FIXED';
    field.layoutAlign = 'STRETCH';
    field.primaryAxisAlignItems = 'MIN';
    field.counterAxisAlignItems = 'MIN';
    field.itemSpacing = 8;
    field.fills = [];

    const label = figma.createText();
    label.fontName = { family: 'Inter', style: 'Medium' };
    label.characters = labelText;
    label.fontSize = 14;
    if (fgV) label.fills = [varPaint(fgV)];
    field.appendChild(label);

    const input = figma.createFrame();
    input.name = 'Input';
    input.layoutMode = 'HORIZONTAL';
    input.primaryAxisSizingMode = 'FIXED';
    input.counterAxisSizingMode = 'FIXED';
    input.layoutAlign = 'STRETCH';
    input.primaryAxisAlignItems = 'MIN';
    input.counterAxisAlignItems = 'CENTER';
    input.paddingLeft = 12;
    input.paddingRight = 12;
    input.cornerRadius = 6;
    input.resize(312, 36);
    if (bgV) input.fills = [varPaint(bgV)];
    if (inputBorderV) { input.strokes = [varPaint(inputBorderV)]; input.strokeWeight = 1; }

    const placeholder = figma.createText();
    placeholder.fontName = { family: 'Inter', style: 'Regular' };
    placeholder.characters = placeholderText;
    placeholder.fontSize = 14;
    if (mutedFgV) placeholder.fills = [varPaint(mutedFgV)];
    input.appendChild(placeholder);
    field.appendChild(input);

    const helper = figma.createText();
    helper.fontName = { family: 'Inter', style: 'Regular' };
    helper.characters = helperText;
    helper.fontSize = 12;
    if (mutedFgV) helper.fills = [varPaint(mutedFgV)];
    field.appendChild(helper);

    return field;
  };

  comp.appendChild(buildField('Username', 'shadcn', 'This is your public display name.'));
  comp.appendChild(buildField('Email', 'm@example.com', "We'll never share your email."));

  const button = figma.createFrame();
  button.name = 'Submit Button';
  button.layoutMode = 'HORIZONTAL';
  button.primaryAxisSizingMode = 'AUTO';
  button.counterAxisSizingMode = 'FIXED';
  button.primaryAxisAlignItems = 'CENTER';
  button.counterAxisAlignItems = 'CENTER';
  button.paddingLeft = 16;
  button.paddingRight = 16;
  button.itemSpacing = 8;
  button.cornerRadius = 6;
  button.resize(80, 36);
  const primaryV = findVariable('primary');
  if (primaryV) button.fills = [varPaint(primaryV)];

  const buttonText = figma.createText();
  buttonText.fontName = { family: 'Inter', style: 'Medium' };
  buttonText.characters = 'Submit';
  buttonText.fontSize = 14;
  const primaryFgV = findVariable('primary-foreground');
  if (primaryFgV) buttonText.fills = [varPaint(primaryFgV)];
  button.appendChild(buttonText);
  comp.appendChild(button);

  page.appendChild(comp);
}

const COMPONENT_GENERATORS: Record<string, (page: PageNode, findVariable: (name: string) => Variable | undefined) => Promise<void>> = {
  "button": gen_button,
  "toggle": gen_toggle,
  "toggle-group": gen_toggle_group,
  "sonner": gen_sonner,
  "button-group": gen_button_group,
  "input": gen_input,
  "textarea": gen_textarea,
  "checkbox": gen_checkbox,
  "switch": gen_switch,
  "slider": gen_slider,
  "label": gen_label,
  "radio-group": gen_radio_group,
  "select": gen_select,
  "native-select": gen_native_select,
  "combobox": gen_combobox,
  "date-picker": gen_date_picker,
  "input-otp": gen_input_otp,
  "field": gen_field,
  "card": gen_card,
  "badge": gen_badge,
  "alert": gen_alert,
  "alert-dialog": gen_alert_dialog,
  "avatar": gen_avatar,
  "separator": gen_separator,
  "skeleton": gen_skeleton,
  "kbd": gen_kbd,
  "empty": gen_empty,
  "item": gen_item,
  "accordion": gen_accordion,
  "tabs": gen_tabs,
  "breadcrumb": gen_breadcrumb,
  "pagination": gen_pagination,
  "menubar": gen_menubar,
  "navigation-menu": gen_navigation_menu,
  "progress": gen_progress,
  "spinner": gen_spinner,
  "tooltip": gen_tooltip,
  "toast": gen_toast,
  "collapsible": gen_collapsible,
  "resizable": gen_resizable,
  "scroll-area": gen_scroll_area,
  "aspect-ratio": gen_aspect_ratio,
  "sidebar": gen_sidebar,
  "dialog": gen_dialog,
  "popover": gen_popover,
  "sheet": gen_sheet,
  "drawer": gen_drawer,
  "hover-card": gen_hover_card,
  "dropdown-menu": gen_dropdown_menu,
  "context-menu": gen_context_menu,
  "command": gen_command,
  "table": gen_table,
  "calendar": gen_calendar,
  "chart": gen_chart,
  "carousel": gen_carousel,
  "form": gen_form,
};

// Component Generation System — loads fonts, then dispatches to the per-component generator.
async function generateComponent(
  componentName: string,
  page: PageNode,
  findVariable: (name: string) => Variable | undefined,
  colorCollection: VariableCollection
): Promise<void> {
  void colorCollection;
  const loadFontSafely = async (font: FontName) => {
    try { await figma.loadFontAsync(font); }
    catch (e) { console.warn("Font load failed:", font.family, font.style); await figma.loadFontAsync({ family: "Inter", style: "Regular" }); }
  };
  await loadFontSafely({ family: "Inter", style: "Regular" });
  await loadFontSafely({ family: "Inter", style: "Medium" });
  await loadFontSafely({ family: "Inter", style: "SemiBold" });
  await loadFontSafely({ family: "Inter", style: "Bold" });

  const gen = COMPONENT_GENERATORS[componentName];
  if (!gen) { console.warn("No generator for component:", componentName); return; }
  await gen(page, findVariable);
}




// Component → page mapping. Each component belongs to a "tag" (a page). When a
// component is generated, its page is created on demand if it doesn't exist yet.
const PAGE_STRUCTURE: Record<string, string[]> = {
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

// Reverse lookup: component name → its owning page name.
const COMPONENT_TO_PAGE: Record<string, string> = {};
for (const pageName in PAGE_STRUCTURE) {
  for (const componentName of PAGE_STRUCTURE[pageName]) {
    COMPONENT_TO_PAGE[componentName] = pageName;
  }
}

// Find a page by name, creating it if missing, and load it (required for
// dynamic-page document access before appending nodes).
async function ensurePage(pageName: string): Promise<PageNode> {
  let page = figma.root.children.find(p => p.name === pageName) as PageNode;
  if (!page) {
    page = figma.createPage();
    page.name = pageName;
  }
  await page.loadAsync();
  return page;
}

// Stack every top-level node on a page vertically, in creation order.
function organizePageLayout(page: PageNode) {
  const padding = 50;
  let currentY = 50;
  // appendChild inserts at index 0, so the first-created node is last. Reverse
  // to lay them out oldest-first from the top of the page.
  const children = [...page.children];
  children.reverse();
  for (const node of children) {
    node.x = 50;
    node.y = currentY;
    currentY += node.height + padding;
  }
}

// Build the variable-binding context shared by component generation. Returns
// null (after posting an error) when variables haven't been generated yet.
async function getComponentBindingContext(): Promise<{ findVariable: (name: string) => Variable | undefined, colorCollection: VariableCollection } | null> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorCollection = collections.find(c => c.name === 'shadcn/colors');
  const numberCollection = collections.find(c => c.name === 'shadcn/numbers');

  if (!colorCollection) {
    figma.ui.postMessage({ type: 'status', message: 'Please generate variables first!', status: 'error' });
    return null;
  }

  const allVariables = await figma.variables.getLocalVariablesAsync();
  const colorVars = allVariables.filter(v => v.variableCollectionId === colorCollection.id);
  const numberVars = numberCollection ? allVariables.filter(v => v.variableCollectionId === numberCollection.id) : [];

  // O(1) name lookup; colors win on name collisions.
  const variableByName = new Map<string, Variable>();
  for (const v of numberVars) variableByName.set(v.name, v);
  for (const v of colorVars) variableByName.set(v.name, v);

  return { findVariable: (name: string) => variableByName.get(name), colorCollection };
}

figma.showUI(__html__, { width: 400, height: 560 });

// Restore the last window size the user dragged to, if any.
(async () => {
  const saved = await figma.clientStorage.getAsync('uiSize');
  if (saved && saved.width && saved.height) {
    figma.ui.resize(saved.width, saved.height);
  }
})();

// Tailwind Color Generation
const tailwindColors = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
  zinc: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  stone: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
    950: '#0c0a09',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  yellow: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
    950: '#422006',
  },
  lime: {
    50: '#f7fee7',
    100: '#ecfccb',
    200: '#d9f99d',
    300: '#bef264',
    400: '#a3e635',
    500: '#84cc16',
    600: '#65a30d',
    700: '#4d7c0f',
    800: '#3f6212',
    900: '#365314',
    950: '#1a2e05',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e',
  },
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },
  sky: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },
  violet: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  fuchsia: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
    950: '#4a044e',
  },
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
    950: '#500724',
  },
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
    950: '#4c0519',
  },
};

function hexToRgb(hex: string): { r: number, g: number, b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

async function generateTailwindVariables() {
  console.log('generateTailwindVariables called');
  figma.ui.postMessage({ type: 'status', message: 'Generating Tailwind colors...', status: 'info' });

  try {
    console.log('Tailwind Colors keys:', Object.keys(tailwindColors));
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    let collection = collections.find(c => c.name === 'Tailwind Colors');

    if (!collection) {
      console.log('Creating new Tailwind Colors collection');
      collection = figma.variables.createVariableCollection('Tailwind Colors');
    } else {
      console.log('Found existing Tailwind Colors collection:', collection.id);
    }

    const modeId = collection.modes[0].modeId;
    const existingVariables = await figma.variables.getLocalVariablesAsync();
    const collectionVariables = existingVariables.filter(v => v.variableCollectionId === collection!.id);
    console.log('Existing variables in collection:', collectionVariables.length);

    async function processColor(path: string, value: any) {
      if (typeof value === 'string') {
        const rgb = hexToRgb(value);
        let variable = collectionVariables.find(v => v.name === path);

        if (!variable) {
          // console.log('Creating variable:', path);
          variable = figma.variables.createVariable(path, collection!, 'COLOR');
          collectionVariables.push(variable);
        }

        variable.setValueForMode(modeId, rgb);
      } else {
        for (const key in value) {
          await processColor(`${path}/${key}`, value[key]);
        }
      }
    }

    for (const colorName in tailwindColors) {
      console.log('Processing palette:', colorName);
      await processColor(colorName, tailwindColors[colorName as keyof typeof tailwindColors]);
    }

    console.log('Finished processing all colors');
    figma.ui.postMessage({ type: 'status', message: 'Tailwind colors generated!', status: 'success' });
  } catch (e) {
    console.error('Error in generateTailwindVariables:', e);
    throw e;
  }
}

figma.ui.onmessage = async (msg) => {
  // Resize the plugin window in response to the UI's drag handle, and remember
  // the size for next time.
  if (msg.type === 'resize') {
    const width = Math.max(320, Math.round(msg.width));
    const height = Math.max(400, Math.round(msg.height));
    figma.ui.resize(width, height);
    await figma.clientStorage.setAsync('uiSize', { width, height });
    return;
  }

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

      // Fetch all local variables once and reuse for both the color and number
      // passes below (avoids a second full getLocalVariablesAsync round-trip).
      const allLocalVars = await figma.variables.getLocalVariablesAsync();

      // --- Primitives collection ---------------------------------------------
      // The raw colors live here as a single-mode palette. Semantic tokens below
      // do NOT store literal colors; they alias into this collection per mode, so
      // Light/Dark are built by pointing at different primitives.
      let primitiveCollection = collections.find(c => c.name === 'shadcn/primitives');
      if (!primitiveCollection) {
        primitiveCollection = figma.variables.createVariableCollection('shadcn/primitives');
      }
      const primitiveModeId = primitiveCollection.modes[0].modeId;
      if (primitiveCollection.modes[0].name === 'Mode 1') {
        primitiveCollection.renameMode(primitiveModeId, 'Value');
      }

      // Seed dedup maps from any primitives that already exist (re-run safe).
      const existingPrimitiveVars = allLocalVars.filter(v => v.variableCollectionId === primitiveCollection!.id);
      const primitiveByValue = new Map<string, Variable>();
      const usedPrimitiveNames = new Set<string>();
      for (const v of existingPrimitiveVars) {
        usedPrimitiveNames.add(v.name);
        const val = v.valuesByMode[primitiveModeId] as any;
        if (val && typeof val === 'object' && 'r' in val) {
          primitiveByValue.set(colorKey(val), v);
        }
      }

      // Return the primitive variable for a color, creating it if new.
      const getOrCreatePrimitive = (value: Rgba): Variable => {
        const key = colorKey(value);
        const existing = primitiveByValue.get(key);
        if (existing) return existing;

        const base = primitiveName(value);
        let name = base;
        let i = 2;
        while (usedPrimitiveNames.has(name)) name = `${base}-${i++}`;

        const variable = figma.variables.createVariable(name, primitiveCollection!, 'COLOR');
        variable.setValueForMode(primitiveModeId, value);
        usedPrimitiveNames.add(name);
        primitiveByValue.set(key, variable);
        return variable;
      };

      // --- Semantic color variables (alias into primitives) ------------------
      const existingColorVars = allLocalVars.filter(v => v.variableCollectionId === colorCollection!.id);

      for (const name in rootColors) {
        const token = rootColors[name];
        let variable = existingColorVars.find(v => v.name === name);

        if (!variable) {
          variable = figma.variables.createVariable(name, colorCollection, 'COLOR');
        }

        const lightPrimitive = getOrCreatePrimitive(token.parsedValue);
        variable.setValueForMode(lightModeId, figma.variables.createVariableAlias(lightPrimitive));

        if (darkModeId) {
          // Use the dark override when present, otherwise fall back to the light
          // primitive so the Dark mode is never left empty.
          const darkValue = darkColors[name] ? darkColors[name].parsedValue : token.parsedValue;
          const darkPrimitive = getOrCreatePrimitive(darkValue);
          variable.setValueForMode(darkModeId, figma.variables.createVariableAlias(darkPrimitive));
        }
      }

      const primitiveCount = primitiveByValue.size;

      // Create Number Collection
      let numberCollection = collections.find(c => c.name === 'shadcn/numbers');
      if (!numberCollection) {
        numberCollection = figma.variables.createVariableCollection('shadcn/numbers');
      }

      const numberModeId = numberCollection.modes[0].modeId;
      const existingNumberVars = allLocalVars.filter(v => v.variableCollectionId === numberCollection!.id);

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

      // Generate Tailwind Colors
      console.log('Calling generateTailwindVariables...');
      await generateTailwindVariables();
      console.log('Returned from generateTailwindVariables');

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

      // Count Tailwind colors
      const tailwindColorFamilies = Object.keys(tailwindColors);
      const tailwindColorCount = tailwindColorFamilies.reduce((acc, family) => {
        return acc + Object.keys(tailwindColors[family as keyof typeof tailwindColors]).length;
      }, 0);

      figma.ui.postMessage({
        type: 'status',
        message: `✓ Generated ${colorCount} Shadcn semantic colors (aliased to ${primitiveCount} primitives), ${numberCount} number variables, ${tailwindColorCount} Tailwind color variables, 11 text styles, 5 effect styles, and 2 grid styles from ${source}!`,
        status: 'success'
      });

    } catch (e: any) {
      console.error(e);
      figma.ui.postMessage({ type: 'status', message: 'Error: ' + e.message, status: 'error' });
    }
  }



  // Send the catalog of components (grouped by tag/page) to the UI so it can
  // render the list. The UI requests this once it has loaded.
  if (msg.type === 'request-component-list') {
    figma.ui.postMessage({
      type: 'component-list',
      groups: Object.keys(PAGE_STRUCTURE).map(pageName => ({
        tag: pageName.replace(/^📦\s*/, ''),
        components: PAGE_STRUCTURE[pageName],
      })),
    });
  }

  // Generate a single component into its tag's page (created on demand).
  if (msg.type === 'generate-component') {
    try {
      const name: string = msg.name;
      const pageName = COMPONENT_TO_PAGE[name];
      if (!pageName) {
        figma.ui.postMessage({ type: 'status', message: `Unknown component: ${name}`, status: 'error' });
        return;
      }

      const ctx = await getComponentBindingContext();
      if (!ctx) return;

      figma.ui.postMessage({ type: 'status', message: `Generating ${name}…`, status: 'info' });

      const page = await ensurePage(pageName);
      await generateComponent(name, page, ctx.findVariable, ctx.colorCollection);
      organizePageLayout(page);

      figma.ui.postMessage({
        type: 'status',
        message: `✓ Added "${name}" to ${pageName}`,
        status: 'success',
      });
    } catch (e: any) {
      console.error('Plugin Error:', e);
      const errorMessage = e.message || (typeof e === 'string' ? e : JSON.stringify(e));
      figma.ui.postMessage({ type: 'status', message: 'Error: ' + errorMessage, status: 'error' });
    }
  }

  // Generate every component in one tag/category into its page.
  if (msg.type === 'generate-category') {
    try {
      // The UI sends the display tag (📦 stripped); resolve back to the page.
      const pageName = Object.keys(PAGE_STRUCTURE).find(p => p.replace(/^📦\s*/, '') === msg.tag);
      if (!pageName) {
        figma.ui.postMessage({ type: 'status', message: `Unknown category: ${msg.tag}`, status: 'error' });
        return;
      }

      const ctx = await getComponentBindingContext();
      if (!ctx) return;

      figma.ui.postMessage({ type: 'status', message: `Generating ${msg.tag}…`, status: 'info' });

      const page = await ensurePage(pageName);
      const names = PAGE_STRUCTURE[pageName];
      for (const componentName of names) {
        await generateComponent(componentName, page, ctx.findVariable, ctx.colorCollection);
      }
      organizePageLayout(page);

      figma.ui.postMessage({
        type: 'status',
        message: `✓ Added ${names.length} components to ${pageName}`,
        status: 'success',
      });
    } catch (e: any) {
      console.error('Plugin Error:', e);
      const errorMessage = e.message || (typeof e === 'string' ? e : JSON.stringify(e));
      figma.ui.postMessage({ type: 'status', message: 'Error: ' + errorMessage, status: 'error' });
    }
  }

  // Generate every component across all tags/pages.
  if (msg.type === 'generate-components') {
    try {
      const ctx = await getComponentBindingContext();
      if (!ctx) return;

      figma.ui.postMessage({ type: 'status', message: 'Generating all components…', status: 'info' });

      let componentsCreated = 0;

      for (const pageName in PAGE_STRUCTURE) {
        const componentNames = PAGE_STRUCTURE[pageName];
        const page = await ensurePage(pageName);

        for (const componentName of componentNames) {
          await generateComponent(componentName, page, ctx.findVariable, ctx.colorCollection);
          componentsCreated++;
        }

        organizePageLayout(page);
      }

      const pageCount = Object.keys(PAGE_STRUCTURE).length;

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
