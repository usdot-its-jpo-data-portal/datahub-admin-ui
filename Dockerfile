FROM node:10.20.0-jessie as buildimage

ARG CODEBUILD_GIT_BRANCH
ARG SONAR_TOKEN

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g @vue/cli

RUN sh ./uswds-init.sh

RUN npm run test:unit

RUN npm run build

# for sonarqube
RUN mkdir -p /root/.sonar/sonar-scanner-4.4.0.2170-linux
RUN rm -rf /root/.sonar/sonar-scanner-4.4.0.2170-linux
RUN mkdir -p /root/.sonar/sonar-scanner-4.4.0.2170-linux
RUN curl -ksSLo /root/.sonar/sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.4.0.2170-linux.zip
RUN unzip /root/.sonar/sonar-scanner.zip -d /root/.sonar/
RUN rm /root/.sonar/sonar-scanner.zip
RUN if [ -z ${SONAR_TOKEN} ]; then echo "NO SONAR"; else /root/.sonar/sonar-scanner-4.4.0.2170-linux/bin/sonar-scanner -Dsonar.projectKey=usdot-its-jpo-data-portal_datahub-admin-ui -Dsonar.organization=usdot-its-jpo-data-portal -Dsonar.sources=src -Dsonar.host.url=https://sonarcloud.io -Dsonar.login=${SONAR_TOKEN} -Dsonar.branch.name=${CODEBUILD_GIT_BRANCH}; fi

FROM nginx:1.17.9

WORKDIR /app

COPY --from=buildimage /app/dist .

COPY --from=buildimage /app/entrypoint.sh .

COPY nginx.template.conf /etc/nginx

CMD ["/app/entrypoint.sh"]
