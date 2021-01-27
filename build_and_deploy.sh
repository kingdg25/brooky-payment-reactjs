#!/usr/bin/env bash

rm -rf build
npm run build
firebase deploy --only hosting:brooky-payment
