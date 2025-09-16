# syntax=docker/dockerfile:1

ARG TAG=25.04
FROM ubuntu:${TAG} AS base

ENV OPENSSL_VERSION=3.0.12
ENV DEBIAN_FRONTEND=noninteractive

## Add user
RUN <<-EOF bash -ex
  useradd -m openssl
  gpasswd -a openssl sudo
  echo "openssl:openssl" | chpasswd
EOF

USER root
WORKDIR /root

## Ubuntu japanese repository
RUN sed -i.bak -e "s%http://[^ ]\+%http://ftp.jaist.ac.jp/pub/Linux/ubuntu/%g" /etc/apt/sources.list

## Install deps
RUN <<-EOF bash -ex
  apt-get update
  apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    gcc \
    iproute2 \
    iputils-ping \
    net-tools \
    make \
    perl \
    sudo \
    vim \
    zlib1g-dev \
    tzdata
  apt-get clean
  rm -rf /var/lib/apt/lists/*
EOF

## Add sudoers
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

## Get sources / compile and install
RUN <<-EOF bash -ex
  curl -sSLO https://www.openssl.org/source/openssl-$OPENSSL_VERSION.tar.gz
  tar xvf openssl-$OPENSSL_VERSION.tar.gz
  rm -v openssl-$OPENSSL_VERSION.tar.gz
  cd "/root/openssl-$OPENSSL_VERSION/"
  ./config --prefix=/opt/openssl shared enable-ec_nistp_64_gcc_128
  make depend
  make -j ${nproc}
  make install_sw
  rm -R "/root/openssl-$OPENSSL_VERSION/"
EOF

## Add CA Cert
COPY ca.pem /home/openssl/ca.pem
RUN chown openssl:openssl /home/openssl/ca.pem

## Add Server Cert
COPY server.crt /home/openssl/server.crt
RUN chown openssl:openssl /home/openssl/server.crt

## Add entry script
COPY init.sh /home/openssl/init.sh
RUN chown openssl:openssl /home/openssl/init.sh

USER openssl
WORKDIR /home/openssl

RUN echo '. /home/openssl/init.sh' >> ~/.bashrc

ENTRYPOINT ["/home/openssl/init.sh", "/usr/bin/bash"]
