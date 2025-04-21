function _sort(array) {
    for(let i=0;i<array.length;i++){
     for(let j=0;j<i;j++){
         if(array[i]>array[j]){
             let temp=array[i];
             array[i]=array[j];
             array[j]=array[i];
         }
     }
    }
    
}

console.log(_sort([1,2,3]));
