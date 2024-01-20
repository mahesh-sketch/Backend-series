// You have to write a Node.js program to clear clutter inside of a directory and organize the contents of that directory into different folders

import file from "fs/promises";
import fsn from "fs";
import path from "path";

const basefilepath = "D:\\Backend Series\\File System\\Task";
let files = await file.readdir(basefilepath);

for (const item of files) {
    let ext = item.split(".")[item.split(".").length - 1];
    if (fsn.existsSync(path.join(basefilepath, ext))) {
        //move the file to this directory
        if (ext != "js" && ext != "json" && item.split(".").length > 1) {
          file.rename(
            path.join(basefilepath, item),
            path.join(basefilepath, ext, item)
          );
        }
      } else {
        file.mkdir(ext);
        file.rename(
          path.join(basefilepath, item),
          path.join(basefilepath, ext, item)
        );
      }
}
