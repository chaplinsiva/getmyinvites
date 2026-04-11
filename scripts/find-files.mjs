import fs from "fs";
import path from "path";

function findFiles(dir, matchExt, arrayOfFiles) {
  arrayOfFiles = arrayOfFiles || [];
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file === "node_modules" || file === ".next" || file === ".git") continue;
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        arrayOfFiles = findFiles(fullPath, matchExt, arrayOfFiles);
      } else {
        if (fullPath.endsWith(matchExt)) {
          arrayOfFiles.push(fullPath);
        }
      }
    }
  } catch (e) {
    // ignore
  }
  return arrayOfFiles;
}

const htmlFiles = findFiles("d:/makemyinvites", ".html");
console.log("HTML Files:");
console.log(htmlFiles);

const psdFiles = findFiles("d:/makemyinvites", ".psd");
console.log("PSD Files:");
console.log(psdFiles);

const pdfFiles = findFiles("d:/makemyinvites", ".pdf");
console.log("PDF Files:");
console.log(pdfFiles);
