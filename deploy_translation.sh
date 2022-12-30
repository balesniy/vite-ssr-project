#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# Download translations
declare -a arr=("en" "de" "ru" "es" "fr" "nl" "pl" "ro")

for i in "${arr[@]}"
do
   wget -O ./langs/"$i".json https://ru.searadar.com/api/config/translations/"$i".json
done
