#!/usr/bin/env bash

convert ./src/assets/images/favicon.png -define icon:auto-resize=64,48,32,16 ./public/favicon.ico
