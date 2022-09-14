import { currentMonth, currentYear } from './utils/dates';
import { decode } from './utils/sets';
import { generatePdfFromTex } from './tex-to-pdf';
import { generateTexFile } from './tex-generate';
import { mkdirSync, readdirSync, rmSync } from 'fs';

const REPORTS_PATH = './reports';
const FILE_NAME = 'WykazDni';

if (process.argv[2] === 'help') {
    printHelp();
} else {
    generateReport().catch(console.error);
}

async function generateReport(): Promise<void> {
    const excluded: any = decode(process.argv[2]) ?? [];
    const month: any = process.argv[3] ?? currentMonth();
    const year: any = process.argv[4] ?? currentYear();
    const invoice: any = process.argv[5] ?? 1;

    prepareReportsDirectory();
    await generateTexFile(`${REPORTS_PATH}/${FILE_NAME}.tex`, year, month, invoice, excluded);
    await generatePdfFromTex(`${FILE_NAME}.tex`);
    console.log('Done!');
}

function prepareReportsDirectory(): void {
    try {
        readdirSync(REPORTS_PATH).forEach((file) => rmSync(`${REPORTS_PATH}/${file}`));
    } catch (err) {
        mkdirSync(REPORTS_PATH);
    }
}

function printHelp(): void {
    console.log('Usage:');
    console.log('npm run generate -- [excluded] [month] [year] [invoice]');
    console.log('  excluded - days excluded from the report ; default empty');
    console.log('    . - empty');
    console.log('    2-5 - day range');
    console.log('    3,5,9 - enumerated days');
    console.log('    1-5,10,13,24-31 - combination of ranges and enumerations');
    console.log('  month - month number i.e. 1-12 ; default current month');
    console.log('  year - year number e.g. 2021 ; default current year');
    console.log('  invoice - invoice number for given month ; default 1');
}
