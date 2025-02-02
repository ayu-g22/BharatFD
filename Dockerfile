# Step 1: Build the React frontend
FROM node:16 AS frontend-build

WORKDIR /app

# Copy the frontend package.json and package-lock.json
COPY faq_frontend/package.json faq_frontend/package-lock.json /app/

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend app source code
COPY faq_frontend /app

# Build the React app
RUN npm run build

# Step 2: Setup the backend Node.js app
FROM node:16 AS backend

WORKDIR /app

# Copy the backend package.json and package-lock.json
COPY faq-api/package.json faq-api/package-lock.json /app/

# Install backend dependencies
RUN npm install

# Copy the backend source code
COPY faq-api /app

# Copy the built frontend from the previous step into the backend's public directory
COPY --from=frontend-build /app/build /app/public

# Step 3: Production image
FROM node:16 AS production

WORKDIR /app

# Copy the backend code and the built frontend from the previous stage
COPY --from=backend /app /app

# Expose the app's port
EXPOSE 3000

# Command to run the backend
CMD ["npm", "start"]
