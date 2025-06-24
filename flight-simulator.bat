// filepath: flight-simulator/scripts/build.js
const fs = require('fs');
const path = require('path');

console.log('🛩️  Building Flight Simulator...');

// Ensure dist directory exists
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
    console.log('✅ Created dist directory');
}

// Copy HTML file to dist
const srcHtml = path.join(__dirname, '..', 'index.html');
const distHtml = path.join(distDir, 'index.html');

if (fs.existsSync(srcHtml)) {
    fs.copyFileSync(srcHtml, distHtml);
    console.log('✅ Copied index.html to dist');
}

// Copy assets if they exist
const assetsDir = path.join(__dirname, '..', 'assets');
const distAssetsDir = path.join(distDir, 'assets');

if (fs.existsSync(assetsDir)) {
    if (!fs.existsSync(distAssetsDir)) {
        fs.mkdirSync(distAssetsDir, { recursive: true });
    }
    console.log('✅ Assets directory ready');
}

console.log('🚀 Build preparation complete!');