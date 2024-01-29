# Use the official Node.js 14 image as the base image
FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install

# Use the official Node.js 14 image as the base image
FROM node:18-alpine as runner
COPY --from=builder /app /app

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory


#Check the files in the working directory

#RUN cat /app/package.json

# Install the project dependencies


# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the NestJS application will run
EXPOSE 5000

# This line generates the Prisma client code based on the schema defined in the application.
RUN npx prisma generate 

# Start the NestJS application
CMD [ "npm", "run","start:prod" ]