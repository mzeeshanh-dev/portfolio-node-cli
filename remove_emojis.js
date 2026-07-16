import fs from 'fs';
import path from 'path';

const replacements = {
    '👋': '>',
    '🟢': '●',
    '📬': '[Contact]',
    '⏱': '~',
    '🔗': '[Link]',
    '⚠': '!',
    '✔': '√',
    '📦': '[Projects]',
    '🚀': '>',
    '📂': '>',
    '📄': '[Resume]',
    '⚙️': '[Settings]',
    '⚙': '[Settings]',
    '🛠️': '[Skills]',
    '🛠': '[Skills]',
    '🎨': '[Theme]',
    '📅': '[Timeline]',
    '☕': '>',
    '🤷': '!',
    '😂': '>',
    '🌌': '*',
    '🔓': '[Unlocked]',
    '⚡': '»',
    '💡': '>',
    '🖥️': '[Frontend]',
    '🖥': '[Frontend]',
    '🌱': '[Domain]',
    '🔧': '[Tools]'
};

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.ts')) results.push(file);
        }
    });
    return results;
}

const files = walk('D:/01 My Work/MERN STACK Portfolio NODE CLI Package for portfolio/src');
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    for (const [emoji, replacement] of Object.entries(replacements)) {
        if (content.includes(emoji)) {
            content = content.split(emoji).join(replacement);
            modified = true;
        }
    }
    
    if (modified) {
        fs.writeFileSync(file, content);
        console.log(`Replaced emojis in ${file}`);
    }
}
