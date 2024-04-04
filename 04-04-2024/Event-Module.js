const EventEmitter= require("events");
 const event= new EventEmitter();

 const Sandeep = ()=>{
  console.log("smart person")
 };

 event.on ("Hello event",Sandeep)

 event.emit("Hello event")

const TechDay = ()=>{
  console.log("Have Fun")
};

event.on("wonderful", TechDay);

event.emit("wonderful")