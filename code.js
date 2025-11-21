"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Default Shadcn UI tokens (latest OKLCH format)
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
function oklchToRgb(l, c, h) {
    // OKLCH to OKLab
    const hRad = (h * Math.PI) / 180;
    const a = c * Math.cos(hRad);
    const b = c * Math.sin(hRad);
    // OKLab to Linear RGB
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = l - 0.0894841775 * a - 1.2914855480 * b;
    const l3 = l_ * l_ * l_;
    const m3 = m_ * m_ * m_;
    const s3 = s_ * s_ * s_;
    const r_linear = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
    const g_linear = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
    const b_linear = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;
    // Linear RGB to sRGB (gamma correction)
    const toSrgb = (c) => {
        const abs = Math.abs(c);
        if (abs <= 0.0031308)
            return c * 12.92;
        return (Math.sign(c) || 1) * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
    };
    return {
        r: Math.max(0, Math.min(1, toSrgb(r_linear))),
        g: Math.max(0, Math.min(1, toSrgb(g_linear))),
        b: Math.max(0, Math.min(1, toSrgb(b_linear)))
    };
}
// Helper to parse OKLCH string "0.145 0 0" or "0.577 0.245 27.325" or "1 0 0 / 10%"
function parseOklch(value) {
    // Match OKLCH format: L C H or L C H / A%
    const parts = value.match(/([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+)%?)?/);
    if (parts && parts.length >= 4) {
        const l = parseFloat(parts[1]);
        const c = parseFloat(parts[2]);
        const h = parseFloat(parts[3]);
        const alpha = parts[4] ? parseFloat(parts[4]) / 100 : undefined;
        const rgb = oklchToRgb(l, c, h);
        return alpha !== undefined ? Object.assign(Object.assign({}, rgb), { a: alpha }) : rgb;
    }
    return null;
}
// Helper to convert HSL string to RGB
function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return { r: f(0), g: f(8), b: f(4) };
}
// Helper to parse HSL string "222.2 84% 4.9%" or "222.2, 84%, 4.9%"
function parseHsl(value) {
    // Remove "deg" unit if present for hue
    value = value.replace(/deg/g, '');
    // Match 3 numbers, optionally with % or commas
    const parts = value.match(/([\d.]+)\s*(?:%|,\s*)\s*([\d.]+)\s*(?:%|,\s*)\s*([\d.]+)\s*%?/);
    if (parts && parts.length === 4) {
        const h = parseFloat(parts[1]);
        const s = parseFloat(parts[2]);
        const l = parseFloat(parts[3]);
        return hslToRgb(h, s, l);
    }
    return null;
}
// Helper to check if a value is likely a number (e.g. "0.5rem", "16px", "100")
function parseNumber(value) {
    if (/^[\d.]+$/.test(value))
        return parseFloat(value);
    if (value.endsWith('rem'))
        return parseFloat(value) * 16; // Assume 16px base
    if (value.endsWith('px'))
        return parseFloat(value);
    return null;
}
function parseBlock(css, blockName) {
    const tokens = {};
    // Find the block content
    const blockRegex = new RegExp(`${blockName}\\s*{([^}]*)}`, 's');
    const match = css.match(blockRegex);
    if (!match)
        return tokens;
    const content = match[1];
    // Match --variable: value;
    const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
    let varMatch;
    while ((varMatch = varRegex.exec(content)) !== null) {
        const name = varMatch[1];
        let value = varMatch[2].trim();
        // Remove oklch() wrapper if present
        if (value.startsWith('oklch(') && value.endsWith(')')) {
            value = value.slice(6, -1);
        }
        // Try OKLCH first (modern shadcn format)
        const oklch = parseOklch(value);
        if (oklch) {
            tokens[name] = { name, value, type: 'COLOR', parsedValue: oklch };
            continue;
        }
        // Try HSL (legacy shadcn format)
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
figma.showUI(__html__, { width: 400, height: 500 });
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'generate-variables') {
        try {
            // Use default tokens or custom CSS
            const css = msg.useDefault ? DEFAULT_SHADCN_CSS : msg.css;
            const rootTokens = parseBlock(css, ':root');
            const darkTokens = parseBlock(css, '.dark');
            if (Object.keys(rootTokens).length === 0) {
                figma.ui.postMessage({ type: 'status', message: 'No variables found in :root', status: 'error' });
                return;
            }
            // Create Collection
            const collections = yield figma.variables.getLocalVariableCollectionsAsync();
            let collection = collections.find(c => c.name === 'shadcn');
            if (!collection) {
                collection = figma.variables.createVariableCollection('shadcn');
            }
            // Setup Modes
            const modes = collection.modes;
            let lightModeId = modes[0].modeId;
            // Rename first mode to Light if it's the default
            if (modes[0].name === 'Mode 1') {
                collection.renameMode(lightModeId, 'Light');
            }
            else {
                // Try to find existing Light mode
                const light = modes.find(m => m.name === 'Light');
                if (light)
                    lightModeId = light.modeId;
            }
            let darkModeId = null;
            if (Object.keys(darkTokens).length > 0) {
                const dark = modes.find(m => m.name === 'Dark');
                if (dark) {
                    darkModeId = dark.modeId;
                }
                else {
                    darkModeId = collection.addMode('Dark');
                }
            }
            // Create Variables
            const existingVars = (yield figma.variables.getLocalVariablesAsync()).filter(v => v.variableCollectionId === collection.id);
            for (const name in rootTokens) {
                const token = rootTokens[name];
                let variable = existingVars.find(v => v.name === name);
                if (!variable) {
                    variable = figma.variables.createVariable(name, collection, token.type);
                }
                // Update Light Mode
                if (token.type === 'COLOR') {
                    variable.setValueForMode(lightModeId, token.parsedValue);
                }
                else if (token.type === 'FLOAT') {
                    variable.setValueForMode(lightModeId, token.parsedValue);
                }
                else {
                    variable.setValueForMode(lightModeId, token.parsedValue);
                }
                // Update Dark Mode
                if (darkModeId && darkTokens[name]) {
                    const darkToken = darkTokens[name];
                    // Ensure types match, otherwise skip or warn? 
                    // Assuming shadcn consistency, types should match.
                    if (darkToken.type === token.type) {
                        variable.setValueForMode(darkModeId, darkToken.parsedValue);
                    }
                }
            }
            const source = msg.useDefault ? 'default Shadcn tokens' : 'custom CSS';
            figma.ui.postMessage({
                type: 'status',
                message: `Successfully generated ${Object.keys(rootTokens).length} variables from ${source}!`,
                status: 'success'
            });
        }
        catch (e) {
            console.error(e);
            figma.ui.postMessage({ type: 'status', message: 'Error: ' + e.message, status: 'error' });
        }
    }
});
