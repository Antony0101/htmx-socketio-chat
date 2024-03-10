import fs from 'fs';
import ts from 'typescript';
// build process should copy the listed directories from src to the build directory

const SourceDir = 'src';
const list = [
    'hypermedia',
    // 'static',
]

const build = async () => {
    // const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
    const tsconfig = ts.readConfigFile('tsconfig.json', ts.sys.readFile);
    const buildDir = tsconfig.config.compilerOptions.outDir;
    if (!buildDir) {
        throw new Error('tsconfig.json does not contain outDir');
    }
    console.log('ourDir:',buildDir);
    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir);
    }
    for(const dir of list) {
        console.log(`copying ${dir} to build directory`);
        fs.cpSync(`${SourceDir}/${dir}`, `${buildDir}/${dir}`, {recursive: true});
    };
}

build()//.catch(e => console.error(e));