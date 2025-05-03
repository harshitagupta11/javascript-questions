/*problem statement -: 
Create a function that accepts a fucntion as input and a count and executes that input function once for a given count count of calls. Known as  a sampling function.
*/

const sampler = (inputFunc, count, context)=>{

    let current = 0;
    return (...args)=>{
        current++;
        context = this?? context;
        if(current==count){
            current=0;
            inputFunc.apply(context,args );
        }else{
            console.log('not yet')
        }
    }
}

function message (){
    console.log('hello');
}

const sample = sampler(message, 3);
sample();
sample();
sample();
sample();
sample();
sample();
