import fs from 'fs';
import path from 'path';

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
    const originalContent = content;
    
    // Split into lines
    const lines = content.split('\n');
    
    // Filter out lines containing analytics imports or tracking calls
    const newLines = lines.filter(line => {
        return !line.includes('analytics.service.js') && 
               !line.includes('trackCommand') &&
               !line.includes('analyticsEnabled') &&
               !line.includes('setAnalyticsEnabled') &&
               !line.includes('AnalyticsEntry');
    });

    if (newLines.length !== lines.length) {
        fs.writeFileSync(file, newLines.join('\n'));
        console.log(`Cleaned ${file}`);
    }
}
