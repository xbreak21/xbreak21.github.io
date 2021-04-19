#!/usr/bin/env bash
DATAGRAPH='./resource/datagraph'
echo "Testing resource datagraph: ${DATAGRAPH}" > report.txt
python3 -m pyshacl -s ./shacl -e ./vocab -df turtle -ef turtle -sf turtle -f human $DATAGRAPH >> report.txt