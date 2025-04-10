#!/bin/bash

node --env-file-if-exists=$PWD/.env $PWD/scripts/js/route_hash.mjs
