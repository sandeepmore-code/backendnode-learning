const { error } = require("console")
const fs = require("fs")

// fs.writeFile("Hello.txt","wellcome board",(error)=>{
//   if(error){
//     console.log(error);
//   }else{
//     console.log("File created Successfully")
//   }
// })

// READ FILE

fs.readFile("Hello.txt","utf8",(error,data)=>{
  if(error) throw error;
  console.log(data)
})