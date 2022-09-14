import { DaysReport } from './reports';
import { writeFileSync } from 'fs';

export async function generateTexFile(file: string, year: number, month: number, invoice: number, excluded: number[]): Promise<void> {
    return new Promise<void>((resolve) => {
        console.log('Generating report tex file...');
        const report = new DaysReport(year, month, invoice, excluded);
        writeFileSync(file, report.getText());
        resolve();
    });
}