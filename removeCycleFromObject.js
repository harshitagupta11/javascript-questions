const removalCycle = (obj) =>{
    const set = new WeakSet();

    function recursive(obj){
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                if(typeof obj[key] == 'object'){
                    if(set.has(obj[key])){
                        delete obj[key];
                    }
                    else{
                        set.add(obj[key]);
                        recursive(obj[key])
                    }
                }
            }
        }
    }
}

