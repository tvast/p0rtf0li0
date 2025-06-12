#!/bin/bash

# Set the desired prefix and extension
prefix=""
extension="jpeg"

# Get all JPG files and sort them
files=($(ls *.$extension | sort))

# Pad length (e.g., 2 digits -> 01, 02, ..., 99)
pad_length=2

# Counter for new filenames
counter=1

for file in "${files[@]}"; do
  # Generate new padded filename (e.g., 01.jpg)
  new_filename=$(printf "%${pad_length}d.%s" $counter "$extension")

  # Rename file if it’s not already named correctly
  if [[ "$file" != "$new_filename" ]]; then
    mv "$file" "$new_filename"
    echo "Renamed '$file' → '$new_filename'"
  fi

  ((counter++))
done
