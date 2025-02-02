# Step 1: Use the official Node.js image as a base
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Expose port 5000 (backend API)
EXPOSE 5000

# Step 7: Start the backend server
CMD ["npm", "start"]
