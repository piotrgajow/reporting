
export abstract class BaseReportDocument {

    public getText(): string {
        return buildDocument(this.getPackages().trim(), this.getDefinitions().trim(), this.getDocumentContent().trim());
    }

    protected abstract getDocumentContent(): string;

    protected getPackages(): string {
        return buildBasePackages();
    }

    protected getDefinitions(): string {
        return '';
    }

}

function buildBasePackages(): string {
    return `\\usepackage{amsmath}

\\usepackage[a4paper,left=1in,right=1in,top=1in,bottom=1in]{geometry}

\\usepackage{polski}

\\usepackage[utf8]{inputenc}

\\usepackage{tabularx}`;
}

function buildDocument(packages: string, definitions: string, content: string): string {
    return `% Preamble
\\documentclass[11pt]{article}

% Packages
${packages}

% Definitions
${definitions}

% Document
\\begin{document}

${content}

\\end{document}`;
}
