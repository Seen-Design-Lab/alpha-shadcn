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
        const value = varMatch[2].trim();
        // Determine type
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
            const css = msg.css;
            const rootTokens = parseBlock(css, ':root');
            const darkTokens = parseBlock(css, '.dark');
            if (Object.keys(rootTokens).length === 0) {
                figma.ui.postMessage({ type: 'status', message: 'No variables found in :root', status: 'error' });
                return;
            }
            // Create Collection
            const collections = figma.variables.getLocalVariableCollections();
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
            const existingVars = figma.variables.getLocalVariables().filter(v => v.variableCollectionId === collection.id);
            for (const name in rootTokens) {
                const token = rootTokens[name];
                let variable = existingVars.find(v => v.name === name);
                if (!variable) {
                    variable = figma.variables.createVariable(name, collection.id, token.type);
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
            figma.ui.postMessage({ type: 'status', message: `Successfully generated ${Object.keys(rootTokens).length} variables!`, status: 'success' });
        }
        catch (e) {
            console.error(e);
            figma.ui.postMessage({ type: 'status', message: 'Error: ' + e.message, status: 'error' });
        }
    }
});
