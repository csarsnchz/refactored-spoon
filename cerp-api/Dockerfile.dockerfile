# Use the official Node.js 14 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY --chown=node:node package*.json ./

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

# Creates a "dist" folder with the production build
RUN npm run build

# Assign an environment variable to the NODE_ENV environment variable
ENV NODE_ENV production

# Expose the port on which the NestJS application will run
EXPOSE 5000

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

# This line generates the Prisma client code based on the schema defined in the application.
RUN npx prisma generate 

# Start the NestJS application
CMD [ "npm", "run","start:prod" ]