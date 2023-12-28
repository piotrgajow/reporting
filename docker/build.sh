#!/usr/bin/env bash

REPO=piotrgajow/texlive-reporting

ID=$(git rev-parse HEAD)
TAG1="${REPO}:${ID}"
TAG2="${REPO}:latest"

echo ${DOCKER_TOKEN} | docker login -u ${DOCKER_USER} --password-stdin

docker build -t "${TAG1}" -t "${TAG2}" .

docker push "${TAG1}"
docker push "${TAG2}"
