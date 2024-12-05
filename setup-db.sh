#!/bin/bash
# Wait for MSSQL server to start
echo "Waiting for SQL Server to start..."
sleep 30s

# Create the database
echo "Creating database..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -Q "CREATE DATABASE OneBottle;"

# Apply migrations (Make sure you have the EF Core CLI tools installed)
cd /server/OneBottle.Server
dotnet ef migrations add InitialMigration --context ApplicationDbContext
dotnet ef database update --context ApplicationDbContext

echo "Database setup and migrations complete."
