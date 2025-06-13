# Use the official Node.js image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["npm", "start"]
