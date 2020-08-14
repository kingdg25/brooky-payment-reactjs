#!/usr/bin/env bash
git reset --hard
git checkout PaymentForm
git pull
yarn install
yarn run check
rm -rf build
yarn build
firebase deploy --only hosting:checkout --token 1//0eGWzPL-SIiPzCgYIARAAGA4SNwF-L9Ir6f8x97CqZL2s-LCiST_gKiaZk8ii7eVuPJ2x6rX2JPoqujbWNNAylbfPaPYLQbzudzo

