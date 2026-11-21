
/*
 * Name: Joseph Ramos Molina Jr.
 * Section: IV-BSIT B
 * Activity: N3 - File Manager with fs and path
 * Date: November 21, 2026
 */

// Import the built-in Node.js modules
const fs = require("fs");
const path = require("path");

// Set the location where text files will be stored
const filesFolder = path.join(__dirname, "files");

// Get the command and information from the terminal
const command = process.argv[2];
const filename = process.argv[3];
const content = process.argv.slice(4).join(" ");

// Create a new text file
if (command === "create") {

    if (!filename || process.argv.length < 5) {
        console.log("Usage: node index.js create notes.txt \"Hello\"");
    }
    else if (
        path.basename(filename) !== filename ||
        path.extname(filename) !== ".txt"
    ) {
        console.log("Error: Enter a valid .txt filename.");
    }
    else {
        const filePath = path.join(filesFolder, filename);

        try {
            fs.writeFileSync(filePath, content, {
                encoding: "utf8",
                flag: "wx"
            });

            console.log(`File created successfully: ${filename}`);

        } catch (error) {
            if (error.code === "EEXIST") {
                console.log("Error: File already exists.");
            } else {
                console.log(`Error: ${error.message}`);
            }
        }
    }


} else if (command === "read") {

    // Check if the user provided a filename
    if (!filename) {
        console.log("Usage: node index.js read notes.txt");
    }

    // Check if the filename is valid
    else if (
        path.basename(filename) !== filename ||
        path.extname(filename) !== ".txt"
    ) {
        console.log("Error: Enter a valid .txt filename.");
    }

    else {
        const filePath = path.join(filesFolder, filename);

        try {
            // Read the contents of the text file
            const fileContent = fs.readFileSync(filePath, "utf8");

            console.log(`Contents of ${filename}:`);
            console.log(fileContent);

        } catch (error) {
            if (error.code === "ENOENT") {
                console.log(`Error: File not found: ${filename}`);
            } else {
                console.log(`Error: ${error.message}`);
            }
        }
    }


} else if (command === "update") {

    // Check if the user provided a filename and content
    if (!filename || !content.trim()) {
        console.log('Usage: node index.js update notes.txt "New text"');
    }

    // Check if the filename is valid
    else if (
        path.basename(filename) !== filename ||
        path.extname(filename) !== ".txt"
    ) {
        console.log("Error: Enter a valid .txt filename.");
    }

    else {
        const filePath = path.join(filesFolder, filename);

        try {
            // Check if the file exists before updating
            if (!fs.existsSync(filePath)) {
                console.log(`Error: File not found: ${filename}`);
            } else {

                // Append new text on a new line
                fs.appendFileSync(filePath, "\n" + content, "utf8");

                console.log(`File updated successfully: ${filename}`);
            }

        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }


} else if (command === "delete") {

    // Check if the user provided a filename
    if (!filename) {
        console.log("Usage: node index.js delete notes.txt");
    }

    // Check if the filename is valid
    else if (
        path.basename(filename) !== filename ||
        path.extname(filename) !== ".txt"
    ) {
        console.log("Error: Enter a valid .txt filename.");
    }

    else {
        const filePath = path.join(filesFolder, filename);

        try {
            // Delete the specified text file
            fs.unlinkSync(filePath);

            console.log(`File deleted successfully: ${filename}`);

        } catch (error) {
            if (error.code === "ENOENT") {
                console.log(`Error: File not found: ${filename}`);
            } else {
                console.log(`Error: ${error.message}`);
            }
        }
    }


} else if (command === "list") {

    try {
        // Get the text files inside the files folder
        const files = fs.readdirSync(filesFolder, {
            withFileTypes: true
        }).filter(file =>
            file.isFile() &&
            path.extname(file.name) === ".txt"
        );

        // Check if the folder contains text files
        if (files.length === 0) {
            console.log("No text files found.");
        } else {
            console.log("\n--- FILE LIST ---");

            // Display information about each file
            for (const file of files) {

                const filePath = path.join(filesFolder, file.name);
                const fileName = path.basename(filePath);
                const extension = path.extname(filePath);
                const fileContent = fs.readFileSync(filePath, "utf8");

                console.log(`\nFull Path: ${filePath}`);
                console.log(`Filename: ${fileName}`);
                console.log(`Extension: ${extension}`);
                console.log("Contents:");
                console.log(fileContent);
                console.log("-----------------------------");
            }
        }

    } catch (error) {
        console.log(`Error: ${error.message}`);
    }

} else {
    console.log("Unknown command.");
}


