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

function replaceColors() {
    const srcDir = path.join(__dirname, 'client/src');

    walkDir(srcDir, (filePath) => {
        if (filePath.endsWith('.jsx') || filePath.endsWith('.css')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let original = content;

            // Replacements
            // Update hex colors
            content = content.replace(/hex-orange/g, 'brand-primary');

            // Update Tailwind classes
            content = content.replace(/orange-50/g, 'slate-50');
            content = content.replace(/orange-100/g, 'slate-100');
            content = content.replace(/orange-200/g, 'slate-200');
            content = content.replace(/orange-300/g, 'slate-300');
            content = content.replace(/orange-400/g, 'blue-500');
            content = content.replace(/orange-500/g, 'blue-600');
            content = content.replace(/orange-600/g, 'blue-700');
            content = content.replace(/orange-700/g, 'slate-800');

            // Hex values for orange in css/jsx
            content = content.replace(/#F97316/gi, '#007AFF'); // orange-500 to Apple Blue
            content = content.replace(/#EA580C/gi, '#005bb5'); // darker orange to darker blue
            content = content.replace(/#FB923C/gi, '#3395ff'); // lighter orange to lighter blue

            if (content !== original) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated: ${filePath}`);
            }
        }
    });
}

replaceColors();
