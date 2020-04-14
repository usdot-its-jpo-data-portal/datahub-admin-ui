#!/bin/bash
docker build -t datahub-admin-ui:latest .
docker run --rm -d -p 8098:80 -e PROXY_PASS='proxy_pass "http://localhost:3008/api";' datahub-admin-ui:latest
