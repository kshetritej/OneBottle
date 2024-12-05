#!/bin/bash
cd server && dotnet run &

cd client && pnpm dev 

