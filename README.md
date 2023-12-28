# Reporting

Simple tool for generating work related reports using LaTeX.

## Setup

- Install Node.js - e.g. via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Install and run [Docker](https://www.docker.com/)
- Run `npm ci`

### Usage

- Run `npm run generate` with proper parameters to generate a report
- Run `npm run help` to get usage help

### Docker image

PDF is created using TeX Live in docker container (`piotrgajow/texlive-reportin`).
Image is defined and can be built from `docker` directory.