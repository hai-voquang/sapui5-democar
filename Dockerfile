FROM codekoalas/nginx-node
EXPOSE 80 443
RUN npm config set proxy http://proxy:8080
#pre npm install
RUN npm install -g eslint gulp-cli hdb karma-cli
RUN mkdir -p /data/workspace/default_frontend_npm
COPY ./package.json /data/workspace/default_frontend_npm/package.json
RUN cd /data/workspace/default_frontend_npm/ && npm install

#Build arguments
ARG ENV=prod
ARG SRC=local
ARG TAG=latest
ARG TIME

RUN printf "Democart log\n - Argument ENV=${ENV}\n - Argument SRC=${SRC}\n - Argument TAG=${TAG}\n - Argument TIME=${TIME}\n" > /democart_build.log

#copy source from local
COPY ./ /data/workspace/democart/

#RUN if [ ! -d "$/etc/nginx/vhosts.d" ]; then mkdir -p /ect/nginx/vhosts.d; fi
#RUN ls -l /etc/nginx
#link nginx file
RUN if [ "${ENV}" = "prod" ]; then ln -s /data/workspace/democart/democart.conf /etc/nginx/conf.d/democart.conf; else ln -s /data/workspace/democart/democart-${ENV}.conf /etc/nginx/conf.d/democart.conf; fi

#copy pre-installed node_modules to frontend folder
#RUN rsync -a /data/workspace/default_frontend_npm/node_modules /data/workspace/democart/
RUN cp -r /data/workspace/default_frontend_npm/node_modules /data/workspace/democart/

#npm install
RUN cd /data/workspace/democart/ && npm install

#write build log
RUN printf "{\"env\": \"${ENV}\", \"src\": \"${SRC}\", \"tag\": \"${TAG}\", \"buildtime\": \"${TIME}\"}" > /data/workspace/democart/webapp/build_log.json

#gulp build
RUN cd /data/workspace/democart && gulp build

RUN printf "\nBuild Success.\n" >> /democart_build.log
