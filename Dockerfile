FROM node:7

COPY package.json /data/example-api/package.json
COPY node_modules/ /data/example-api/node_modules
RUN cd /data/example-api && npm prune --production=true

COPY dist/ /data/example-api/dist

EXPOSE 4003

USER root
WORKDIR /data/example-api
ENV NODE_ENV production

CMD ["npm", "run", "start:production"]
