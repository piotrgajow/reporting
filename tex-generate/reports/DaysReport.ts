import { BaseReportDocument } from './BaseReportDocument';
import { workingDaysInMonth } from '../../utils/dates';

export class DaysReport extends BaseReportDocument {

    private readonly invoice: number;
    private readonly month: number;
    private readonly year: number;
    private readonly excluded: number[];

    public constructor(year: number, month: number, invoice: number, excluded: number[]) {
        super();
        this.invoice = invoice;
        this.month = month;
        this.year = year;
        this.excluded = excluded;
    }

    protected getDefinitions(): string {
        return `${super.getDefinitions()}\n${buildHeaderCommand()}`;
    }

    protected getDocumentContent(): string {
        return buildContent(this.getInvoiceNumber(), this.getDaysTable());
    }

    private getInvoiceNumber(): string {
        return `A${this.invoice}/${this.month}/${this.year}`;
    }

    private getDaysTable(): string {
        return workingDaysInMonth(this.month, this.year)
            .filter((day) => !this.excluded.includes(day))
            .map((day, i) => buildReportTableRow(i, day, this.month, this.year))
            .join('\n');
    }

}

function buildHeaderCommand(): string {
    return `\\newcommand{\\header}[1]{
    \\begin{center}
        \\LARGE #1
    \\end{center}
}`;
}

function buildContent(invoiceNumber: string, tableContent: string): string {
    return `\\header{Załącznik do faktury nr ${invoiceNumber}}
\\header{Wykaz dni świadczenia usług}

\\noindent
\\begin{tabularx}{\\textwidth}{|l|X|}
\\hline
\\textbf{Lp.} & \\textbf{Dzień} \\\\
\\hline
${tableContent}
\\end{tabularx}`;
}

function buildReportTableRow(i: number, day: number, month: number, year: number): string {
    return `${i + 1} & ${formatNumber(day)}.${formatNumber(month)}.${year.toString(10)} \\\\\n\\hline`;
}

function formatNumber(num: number): string {
    return num.toString(10).padStart(2, '0');
}
