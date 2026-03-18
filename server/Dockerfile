# Use minimal Node image
FROM node:18-alpine

WORKDIR /app

# Copy only dependency files first (better cache)
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev \
 && npm cache clean --force

# Copy project files
COPY . .

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "server.js"]