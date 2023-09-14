import fs from 'fs';

export function readFile(path: string){
    try {
        const res = fs.readFileSync(path, 'utf8');
        return JSON.parse(res);
    } catch(e) {
        console.log(e);
        return;
    }
}

// takes an array
export function writeRecords(path: string, data: Object[]) {
    fs.writeFile(path, JSON.stringify(data), (e) => {
        if(e) {
            console.log("Unable to write file: " + path);
            console.log(e);
        } else {
            console.log('File has been saved: ' + path);
        }
    });
}