import latex from 'node-latex';
import { createReadStream, createWriteStream, mkdirSync, writeFileSync, access, accessSync } from 'fs';

export interface TextProvider {
    getText(): string;
}

const OUT_DIR = './out';

export function documentFromFile(inFilePath: string, outFileName: string = 'document'): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        assureOutDirectoryExists();
        const input = createReadStream(inFilePath);
        const output = createWriteStream(`${OUT_DIR}/${outFileName}.pdf`);
        const pdf = latex(input);

        pdf.pipe(output)
        pdf.on('error', err => reject(err));
        pdf.on('finish', () => resolve());
    });
}

export function documentFromText(content: string | TextProvider, outFileName: string = 'document'): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        assureOutDirectoryExists();
        const text = typeof content === 'string' ? content : content.getText();

        writeFileSync(`${OUT_DIR}/${outFileName}.tex`, text);
        const output = createWriteStream(`${OUT_DIR}/${outFileName}.pdf`);
        const pdf = latex(text);

        pdf.pipe(output)
        pdf.on('error', err => reject(err));
        pdf.on('finish', () => resolve());
    });

}

function assureOutDirectoryExists(): void {
    try {
        accessSync(OUT_DIR);
    } catch (err) {
        mkdirSync(OUT_DIR);
    }
}
