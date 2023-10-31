# syntax=docker/dockerfile:1

FROM debian:bookworm-slim AS texlive-base

ENV TEXDIR=/usr/local/texlive
ENV ARCH=aarch64-linux

RUN apt-get update
RUN apt-get install -y --no-install-recommends wget ca-certificates perl

RUN wget -O texlive.tar.gz https://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz

RUN mkdir texlive
RUN tar -xz -f texlive.tar.gz -C texlive --strip-components=1
RUN perl ./texlive/install-tl --no-interaction --scheme=basic --no-doc-install --no-src-install --texdir=$TEXDIR
RUN rm -rf texlive
RUN rm texlive.tar.gz

ENV PATH=$TEXDIR/bin/$ARCH:$PATH

FROM texlive-base as texlive-onfly

RUN apt-get install -y --no-install-recommends python-is-python3

RUN tlmgr install texliveonfly

FROM texlive-onfly

ENTRYPOINT cd files && texliveonfly --compiler=pdflatex --arguments="-synctex=0 -interaction=nonstopmode" WykazDni.tex
