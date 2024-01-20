import { error, log } from "console";
import file from "fs"

//Sync 
const result = file.readFileSync("./File System/read file/info.txt", "utf-8")
console.log(result);

//Async
file.readFile("./File System/read file/info.txt", "utf-8", (result, error)=>{
    if(error){
        console.log(error);
    }else{
        console.log(result);
    }
})