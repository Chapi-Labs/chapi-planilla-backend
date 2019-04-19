#! /bin/bash

set -e

printf "
port: ${PORT}
# managementApiSecret: ${MGMT_SECRET}
databases:
  default:
    connector: mongo
    uri: ${DB_URI}
" >> ${PRISMA_CONFIG_PATH}
