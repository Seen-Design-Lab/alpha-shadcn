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

  // Load fonts
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  let xOffset = 0;

  if (componentName === 'button') {
    const variants = [
      { name: 'default', bg: 'primary', fg: 'primary-foreground' },
      { name: 'destructive', bg: 'destructive', fg: 'destructive-foreground' },
      { name: 'outline', bg: null, fg: 'primary', border: 'input' },
      { name: 'secondary', bg: 'secondary', fg: 'secondary-foreground' },
      { name: 'ghost', bg: null, fg: 'primary' },
    ];

    for (const variant of variants) {
      const frame = figma.createFrame();
      frame.name = `Button/${variant.name}`;
      frame.layoutMode = 'HORIZONTAL';
      frame.primaryAxisAlignItems = 'CENTER';
      frame.counterAxisAlignItems = 'CENTER';
      frame.paddingLeft = 16;
      frame.paddingRight = 16;
      frame.paddingTop = 8;
      frame.paddingBottom = 8;
      frame.itemSpacing = 8;
      frame.cornerRadius = 6;
      frame.x = xOffset;
      frame.y = 50;

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
      text.characters = 'Button';
      text.fontSize = 14;
      text.fontName = { family: 'Inter', style: 'Medium' };

      const fgVar = findVariable(variant.fg);
      if (fgVar) {
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: fgVar.id } } }];
      }

      frame.appendChild(text);
      page.appendChild(frame);

      const component = figma.createComponentFromNode(frame);
      component.x = xOffset;
      xOffset += 150;
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
      { name: 'default', bg: 'primary', fg: 'primary-foreground' },
      { name: 'secondary', bg: 'secondary', fg: 'secondary-foreground' },
      { name: 'destructive', bg: 'destructive', fg: 'destructive-foreground' },
      { name: 'outline', bg: null, fg: 'foreground', border: 'border' },
    ];

    for (const variant of variants) {
      const frame = figma.createFrame();
      frame.name = `Badge/${variant.name}`;
      frame.layoutMode = 'HORIZONTAL';
      frame.primaryAxisAlignItems = 'CENTER';
      frame.counterAxisAlignItems = 'CENTER';
      frame.primaryAxisSizingMode = 'AUTO';
      frame.paddingLeft = 10;
      frame.paddingRight = 10;
      frame.paddingTop = 2;
      frame.paddingBottom = 2;
      frame.cornerRadius = 9999;
      frame.x = xOffset;
      frame.y = 50;

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
      page.appendChild(frame);
      figma.createComponentFromNode(frame);
      xOffset += 120;
    }
  }

  else if (componentName === 'alert') {
    const variants = [
      { name: 'default', bg: 'background', fg: 'foreground', border: 'border' },
      { name: 'destructive', bg: 'destructive', fg: 'destructive-foreground', border: 'destructive' },
    ];

    for (const variant of variants) {
      const frame = figma.createFrame();
      frame.name = `Alert/${variant.name}`;
      frame.layoutMode = 'VERTICAL';
      frame.primaryAxisSizingMode = 'AUTO';
      frame.paddingLeft = 16;
      frame.paddingRight = 16;
      frame.paddingTop = 16;
      frame.paddingBottom = 16;
      frame.itemSpacing = 8;
      frame.cornerRadius = 8;
      frame.x = xOffset;
      frame.y = 50;
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
      page.appendChild(frame);
      figma.createComponentFromNode(frame);
      xOffset += 450;
    }
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
    frame.y = 120;
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
    frame.y = 250;

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

      const colorCount = Object.keys(rootColors).length;
      const numberCount = Object.keys(rootNumbers).length;
      const source = msg.useDefault ? 'default Shadcn tokens' : 'custom CSS';

      figma.ui.postMessage({
        type: 'status',
        message: `✓ Generated ${colorCount} color variables, ${numberCount} number variables, 11 text styles, and 5 effect styles from ${source}!`,
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
        'Buttons': ['button'],
        'Forms': ['input', 'textarea', 'checkbox'],
        'Components': ['card', 'badge', 'alert'],
        'Navigation': ['tabs'],
      };

      let componentsCreated = 0;

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
      }

      const pageCount = Object.keys(pageStructure).length;

      figma.ui.postMessage({
        type: 'status',
        message: `✓ Generated ${componentsCreated} components across ${pageCount} pages!`,
        status: 'success'
      });

    } catch (e: any) {
      console.error(e);
      figma.ui.postMessage({ type: 'status', message: 'Error: ' + e.message, status: 'error' });
    }
  }
};
