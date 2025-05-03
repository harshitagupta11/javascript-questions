/*

Given multi dimensional arrays , create a filter funtion that takes a callback fucntion as input and returns a new array with all elements
that have passed the test implemented in the callback function.
*/


const filter = (arr, fn)=>{

    const result = [];

    for(let a of arr){
        if(Array.isArray(a)){
            result.push(filter(a,fn))
        }else{
            if(fn(a)){
                result.push(a);
            }
            
        }
    }
    return result;

}


const count = (arr, fn)=>{

    const result = [];

    for(let a of arr){
        if(Array.isArray(a)){
            result.push(filter(a,fn))
        }else{
            if(fn(a)){
                result.push(a);
            }
            
        }
    }
    return result;

}

const arr = [[1,2,[3,'foo',{a:1,b:2}]],'bar'];
console.log(filter(arr,(e)=> e>=2));
console.log(filter(arr,(e)=> typeof e==='string'));