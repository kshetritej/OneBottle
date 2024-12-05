# Use official .NET 8.0 SDK image for backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the backend project files
COPY ./server/OneBottle.csproj ./OneBottle.csproj
RUN dotnet restore "./OneBottle.csproj"

# Copy all backend files
COPY ./server/. ./

# Build and publish the backend project
RUN dotnet build "OneBottle.csproj" -c Release -o /app/build
RUN dotnet publish "OneBottle.csproj" -c Release -o /app/publish

# Setup MSSQL Server
FROM mcr.microsoft.com/mssql/server:2019-latest AS mssql
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=YourStrong!Passw0rd

# Create database and apply migrations
COPY ./server/setup-db.sh /setup-db.sh
RUN chmod +x /setup-db.sh && /setup-db.sh

# Copy backend and frontend files to final container
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copy backend publish files from build
COPY --from=build /app/publish .

# Install Node.js, pnpm, and set up the frontend
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    lsb-release \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm

# Copy frontend and install dependencies
COPY ./client/package.json ./client/pnpm-lock.yaml /app/client/
WORKDIR /app/client
RUN pnpm install

# Expose port 3000 for frontend
EXPOSE 3000

# Expose port 5000 for backend
EXPOSE 5000

# Start backend and frontend in parallel
CMD /bin/bash -c "dotnet /app/OneBottle.dll && pnpm dev --filter client"
