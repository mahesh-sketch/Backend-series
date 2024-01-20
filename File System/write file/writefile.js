import { error } from "console";
import file from "fs";

//Sync method
file.writeFileSync("./File System/write file/Syncmahesh.txt", "Hello Sync Mahesh");

//Async method
file.writeFile(
  "./File System/write file/ASyncmahesh.txt",
  "Hello Async mahesh ",
  (error) => {}
);
