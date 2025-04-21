function deepClone(obj){
    return JSON.parse(JSON.stringify(obj));
}
const obj1={
    name:undefined,
    age:null,
    a:{
        name:undefined,
        age:null,
        b:{
            c:()=>{
                console.log(123);
                
            }
        }
    }
}
let obj2=deepClone(obj1);
console.log(obj2);
