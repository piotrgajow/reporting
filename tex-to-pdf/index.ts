import { spawn } from 'node:child_process';

export async function generatePdfFromTex(fileName: string): Promise<void> {
    console.log('Generating report pdf file...');
    return runDockerCompose({
        service: 'tex-to-pdf',
        command: 'texliveonfly',
        args: [
            '--compiler=pdflatex',
            '--arguments="-synctex=0 -interaction=nonstopmode"',
            fileName,
        ],
    });
}

interface DockerComposeConfig {
    service: string;
    command: string;
    options?: string[];
    args?: string[];
}

async function runDockerCompose(config: DockerComposeConfig): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const { service, command, options = [], args = [] } = config;
        const process = spawn('docker-compose', ['run', ...options, service, command, ...args]);

        process.stdout.on('data', (data: any) => {
            data.toString()
                .split('\n')
                .forEach((line: string) => {
                    console.log(`[${service}]`, line);
                });
        });

        process.on('exit', (code: number) => {
            if (code === 0) {
                resolve();
            } else {
                reject(`Process failed with error code ${code}`);
            }
        });
    });
}
