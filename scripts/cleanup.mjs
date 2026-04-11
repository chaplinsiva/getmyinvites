import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function deleteFolderRecursive(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    console.log(`Deleting ${directoryPath}...`);
    fs.readdirSync(directoryPath).forEach((file) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  } else {
    console.log(`Folder not found (already deleted): ${directoryPath}`);
  }
}

// Target the routes
const appTemplatesDir = path.join(__dirname, '..', 'src', 'app', 'templates');
const publicTemplatesDir = path.join(__dirname, '..', 'public', 'templates');

// Perform Cleanup
try {
  console.log("Cleaning up old wedding templates...");
  
  if (fs.existsSync(appTemplatesDir)) {
      // We keep the main folder but delete everything inside to start from scratch
      fs.readdirSync(appTemplatesDir).forEach((file) => {
        const fullPath = path.join(appTemplatesDir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            deleteFolderRecursive(fullPath);
        } else {
            fs.unlinkSync(fullPath);
        }
      });
  }

  if (fs.existsSync(publicTemplatesDir)) {
      fs.readdirSync(publicTemplatesDir).forEach((file) => {
        const fullPath = path.join(publicTemplatesDir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            deleteFolderRecursive(fullPath);
        } else {
            fs.unlinkSync(fullPath);
        }
      });
  }

  console.log("Cleanup complete! The project is now an empty slate for your new HTML templates.");
} catch (e) {
  console.error("Error during cleanup:", e);
}
