#!/bin/bash

set -e

mkdir -p ./reports
echo "Generating report tex file..."
ts-node tex-generate/index.ts $1 $2 $3 $4
echo "Generating report pdf file..."
docker-compose run tex-to-pdf
echo "Done"
