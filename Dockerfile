FROM node:16-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
#COPY package-lock.json .
RUN npm install -g npm@8.13.1
RUN npm install --legacy-peer-deps
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]