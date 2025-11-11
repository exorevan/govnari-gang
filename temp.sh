#!/bin/bash

# Define the output file
output_file="dnd.gang.txt"
src_dir="src"

# Remove the output file if it exists
rm -f "$output_file"

# Find all Python files recursively and process them
find "$src_dir" -type f \( -name "*.js" -o -name "*.jsx" \) | sort | while IFS= read -r file; do
    # Write the module comment (keeping the .py extension)
    echo "# MODULE $file" >> "$output_file"
    
    # Write the file content
    cat "$file" >> "$output_file"
    
    # Add two newlines for separation
    echo -e "\n\n" >> "$output_file"
done