// promise.race() pollyfill
// The promise.race() method returns a promise that fullfills or reject as soon as one of the promise in an iterable fullfills or rejects,
// with the value or error from that promise

const race = function(taskList){
    return new Promise((resolve, reject)=>{
        taskList.forEach((promise)=>{
            promise.then((data)=>{
                // resolve when any of the input promise resolved
                resolve(data)
            }).catch((err)=>{
                // reject when any of the input promise rejects
                reject(err)
            })
        })
    })
}

// lets test

function task(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (time < 4000) {
          resolve(time);
        } else {
          reject(`Time out ${time}`);
        }
      }, [time]);
    });
  }
  
  const taskList1 = [task(1000), task(2000), task(500)];
  
  race(taskList1)
    .then((data) => {
      console.log(data); // output - 500
    })
    .catch((err) => {
      console.log(err);
    });
  
  const taskList2 = [task(7000), task(4000), task(9000)];
  
  race(taskList2)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err); // output -Time out 4000
    });
  
    