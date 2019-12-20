#!/bin/bash

db ="db_nds"
echo "CONFIG db: $db"

dropdb -U ohnodamn db_nds
createdb -U node_user mostersdb

psql -U ohnodamn < ./bin/data/scripts/bld_nds_tbls.sql

echo "$db CONFIGured"
