import { DaysReport } from './reports';
import { writeFileSync } from 'fs';
import { currentMonth, currentYear } from '../utils/dates';
import { decode } from '../utils/sets';

const REPORTS_PATH: string = './reports';
const FILE_NAME: string = 'WykazDni.tex';

generateReport().catch(console.error);

async function generateReport(): Promise<void> {
    console.log(process.argv);
    const excluded: any = decode(process.argv[2]) ?? [];
    const month: any = process.argv[3] ?? currentMonth();
    const year: any = process.argv[4] ?? currentYear();
    const invoice: any = process.argv[5] ?? 1;

    await generateTexFile(`${REPORTS_PATH}/${FILE_NAME}`, year, month, invoice, excluded);
}

async function generateTexFile(file: string, year: number, month: number, invoice: number, excluded: number[]): Promise<void> {
    return new Promise<void>((resolve) => {
        const report = new DaysReport(year, month, invoice, excluded);
        writeFileSync(file, report.getText());
        resolve();
    });
}