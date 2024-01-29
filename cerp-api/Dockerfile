# Use the official Node.js 14 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the NestJS application will run
EXPOSE 5000

# This line generates the Prisma client code based on the schema defined in the application.
RUN npx prisma generate 

# Start the NestJS application
#CMD [ "npm", "run","start:prod" ]
CMD [ "node", "dist/main.js" ]