#!/bin/bash

# Set variables
IMAGE_NAME=habitcoach-frontend
TAR_NAME=habitcoach-frontend.tar

# Step 3: Build Docker image
docker build --platform=linux/amd64 -t $IMAGE_NAME -f Dockerfile .

# Step 4: Save image to tar
docker save -o $TAR_NAME $IMAGE_NAME


echo "✅ Frontend build complete. File: $TAR_NAME"