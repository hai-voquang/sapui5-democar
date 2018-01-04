FROM node:8.9.4
EXPOSE 80 443

#pre npm install
RUN npm install -g eslint gulp-cli hdb karma-cli
RUN mkdir -p /data/default_frontend_npm
COPY ./package.json /data/default_frontend_npm/package.json
RUN cd /data/default_frontend_npm/ && npm install

#Build arguments
ARG ENV=prod
ARG SRC=local
ARG TAG=latest
ARG TIME

RUN printf "Democart log\n - Argument ENV=${ENV}\n - Argument SRC=${SRC}\n - Argument TAG=${TAG}\n - Argument TIME=${TIME}\n" > /democart_build.log

#copy source from local
COPY ./ /data/democart/

#link nginx file
RUN if [ "${ENV}" = "prod" ]; then ln -s /data/democart/democart.conf /etc/nginx/vhosts.d/democart.conf; else ln -s /data/democart/democart-${ENV}.conf /etc/nginx/vhosts.d/democart.conf; fi

#copy pre-installed node_modules to frontend folder
RUN rsync -a /data/default_frontend_npm/node_modules /data/democart/

#npm install
RUN cd /data/democart/ && npm install

#write build log
RUN printf "{\"env\": \"${ENV}\", \"src\": \"${SRC}\", \"tag\": \"${TAG}\", \"buildtime\": \"${TIME}\"}" > /data/democart/webapp/build_log.json

#gulp build
RUN cd /data/democart && gulp build

RUN printf "\nBuild Success.\n" >> /democart_build.log
