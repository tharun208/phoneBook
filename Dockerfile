FROM node:8-slim
WORKDIR /usr/src/app
EXPOSE 3000
ENV PORT 3000
ENV NODE_ENV production
COPY node_modules ./node_modules
COPY dist ./dist
CMD ["node", "--expose-gc", "dist/index.js"]
