#!/bin/bash
docker build --build-arg SONAR_TOKEN=$SONAR_TOKEN --build-arg CODEBUILD_GIT_BRANCH=$CODEBUILD_GIT_BRANCH -t datahub-admin-ui:latest .
docker run --rm -d -p 8098:80 -e PROXY_PASS='proxy_pass "http://localhost:3008/api";' datahub-admin-ui:latest
