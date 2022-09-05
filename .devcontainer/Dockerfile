# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.245.2/containers/python-3-anaconda/.devcontainer/base.Dockerfile

FROM continuumio/anaconda3

COPY python-env /python-env/

WORKDIR /python-env/

RUN conda env create -f environment.yaml

ENV PATH /opt/conda/envs/ldm/bin:$PATH
# ENV CONDA_DEFAULT_ENV /stable-diffusion

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>
