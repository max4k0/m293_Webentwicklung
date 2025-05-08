const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');


const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
}
fs.mkdirSync(distPath);


try {

  execSync('npx html-minifier --input-dir ./src --output-dir ./dist --collapse-whitespace --file-ext html', { stdio: 'inherit' });

  execSync('npx css-minify ./src/style.css -o ./dist/style.min.css', { stdio: 'inherit' });



} catch (error) {

}
