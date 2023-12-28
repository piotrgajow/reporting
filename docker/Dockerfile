# syntax=docker/dockerfile:1

FROM piotrgajow/texlive-base:latest AS texlive-base

RUN tlmgr install polski

ENTRYPOINT cd files && pdflatex -interactionmode=nonstopmode WykazDni.tex