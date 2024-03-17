// this will go through source directory and remove the lines between the comments with dev-code-start and dev-code-end:


import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const selectFiles = (dir, files_) => {
    files_ = files_ || [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            selectFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

const removeCode = async () => {
    // const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
    const tsconfig = ts.readConfigFile('tsconfig.json', ts.sys.readFile);
    const buildDir = tsconfig.config.compilerOptions.outDir;
    if (!buildDir) {
        throw new Error('tsconfig.json does not contain outDir');
    }
    console.log('ourDir:',buildDir);
    if (!fs.existsSync(buildDir)) {
        throw new Error('build directory does not exist');
    }
    const files = fs.readdirSync(buildDir);
    for(const file of files) {
        const filePath = path.join(buildDir, file   );
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.split('\n');
        let newData = '';
        let skip = false;
        for(const line of lines) {
            if (line.includes('dev-code-start')) {
                skip = true;
            }
            if (!skip) {
                newData += line + '\n';
            }
            if (line.includes('dev-code-end')) {
                skip = false;
            }
        }
        fs.writeFileSync(filePath, newData);
    }
}

removeCode()
