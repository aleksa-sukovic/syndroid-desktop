FROM ubuntu:18.04

LABEL maintainer="Aleksa Sukovic" email="sukovic.aleksa@gmail.com"

# Basic packages
RUN apt-get update && apt-get install --no-install-recommends -y \
        wget \
        nano \
        git \
        unzip \
        curl \
        gnupg2 \
        make \
        gcc \
        libxtst-dev \
        libpng++-dev \
        software-properties-common

# Install NVM, Node, NodeGYP
RUN curl -sL https://deb.nodesource.com/setup_10.x -o /root/node.sh
RUN chmod +x /root/node.sh
RUN sh /root/node.sh
RUN apt install -y nodejs

# Initialize source
RUN mkdir -p /usr/src
