const rimraf = require('rimraf');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const siteDir = path.join(projectRoot, 'Site');
const templatesDir = path.join(projectRoot, 'Templates');
const distDir = path.join(projectRoot, 'dist');
const cssFile = path.join(projectRoot, 'styles.css');


rimraf.sync(distDir);
fs.mkdirSync(distDir);


try {
  execSync(
    `npx html-minifier --input-dir ${siteDir} --output-dir ${path.join(distDir, 'Site')} --collapse-whitespace --file-ext html`,
    { stdio: 'inherit' }
  );

} catch (error) {

}

try {
	
  execSync(
    `npx html-minifier --input-dir ${templatesDir} --output-dir ${path.join(distDir, 'Templates')} --collapse-whitespace --file-ext html`,
    { stdio: 'inherit' }
  );

} catch (error) {

}

try {

  execSync(
    `npx css-minify -f styles.css -o dist`,
    { stdio: 'inherit', cwd: projectRoot }
  );

  if (fs.existsSync(path.join(distDir, 'styles.css'))) {

  } else {

  }
} catch (error) {

}

execSync("upload.bat", { stdio: "inherit", cwd: projectRoot });

