const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ?
            walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function replaceGreens() {
    const srcDir = path.join(__dirname, 'client/src');

    walkDir(srcDir, (filePath) => {
        if (filePath.endsWith('.jsx') || filePath.endsWith('.css')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let original = content;

            // Replace Tailwind green with emerald (a more premium/classic green)
            content = content.replace(/green-50/g, 'emerald-50');
            content = content.replace(/green-100/g, 'emerald-100');
            content = content.replace(/green-200/g, 'emerald-200');
            content = content.replace(/green-300/g, 'emerald-300');
            content = content.replace(/green-400/g, 'emerald-400');
            content = content.replace(/green-500/g, 'emerald-500');
            content = content.replace(/green-600/g, 'emerald-600');
            content = content.replace(/green-700/g, 'emerald-700');
            content = content.replace(/green-800/g, 'emerald-800');

            if (content !== original) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated: ${filePath}`);
            }
        }
    });
}

replaceGreens();
