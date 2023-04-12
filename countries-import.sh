#!/bin/bash

countryCodes=("BE" "FR" "ES" "IT" "PT" "HR" "DE" "NL")

for code in "${countryCodes[@]}"
do
  COUNTRY=$code npm start
done