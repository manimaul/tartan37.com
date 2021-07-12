#!/usr/bin/env bash

npm install --save react-bootstrap bootstrap@5.0.0
npm install --save @types/react-router
npm install --save @types/react-router-dom
yarn build
tag_postfix="$(date +"%m-%d-%y")_r0"
docker build -t "docker.io/manimaul/t37.com:${tag_postfix}" .
docker tag "docker.io/manimaul/t37.com:${tag_postfix}" "manimaul/t37.com:latest"
docker push "docker.io/manimaul/t37.com:latest"
docker push "docker.io/manimaul/t37.com:${tag_postfix}"
