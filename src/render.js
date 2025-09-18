import nunjucks from "nunjucks";
import fg from "fast-glob";
import fs from "fs";
import path from "path";

const templatesDir = path.resolve("src/templates");
const outDir = path.resolve("docs");

// Configure nunjucks
const env = nunjucks.configure(templatesDir, { autoescape: true });

// Ensure dist exists
fs.mkdirSync(outDir, { recursive: true });

async function build() {
  const files = await fg("*.njk", { cwd: templatesDir });

  for (const file of files) {
    const name = path.basename(file, ".njk");
    const outPath = path.join(outDir, `${name}.html`);

    const rendered = env.render(file, { title: name });
    fs.writeFileSync(outPath, rendered, "utf-8");

    console.log(`✅ Rendered: ${file} → ${outPath}`);

    // ALSO create index.html from home.njk
    if (name === "home") {
      const indexPath = path.join(outDir, "index.html");
      fs.writeFileSync(indexPath, rendered, "utf-8");
      console.log(`✅ Rendered: ${file} → ${indexPath}`);
    }
  }
}

build();

