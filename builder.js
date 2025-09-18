const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

// Configure Nunjucks
nunjucks.configure('src/templates', { autoescape: true });

// Clean and create dist folder
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true });
}
fs.mkdirSync(distPath);

// Render templates
const templates = ['home.njk', 'about.njk', 'contact.njk'];

templates.forEach(template => {
  const output = nunjucks.render(template);
  const filename = template.replace('.njk', '.html');
  fs.writeFileSync(path.join(distPath, filename), output);
});

// Copy assets (css, js, images) from src/assets to dist/
function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursive(path.join(__dirname, 'src/assets'), path.join(distPath, ''));
