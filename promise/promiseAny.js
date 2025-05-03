// Promise.any() polyfill
// it is just opposite of promise.all(),
//  if any of the promise resolve first, it returns the promise with resolved value,
// otherwise it returned promise is rejected with AggreagetError, a new subclass of Error that groups together individual errors.

const myPromiseAny = function (taskList) {
  //to store erorrs
  const promiseErrors = new Array(taskList.length);

  //to track how many promises have rejected
  let rejectCount = 0;

  //return new promise

  return new Promise((resolve, reject) => {
    taskList.forEach((promise, index) => {
      // if promise passes
      promise
        .then((data) => {
          // resolve as first promise passes
          resolve(data);

          //   //if all pormises are completed
          //   if (promiseCompleted === taskList.length) {
          //     resolve(results);
          //   }
        })
        // if any promise fails, reject.
        .catch((err) => {
          promiseErrors[rejectCount] = err;
          rejectCount++;
          if (rejectCount === taskList.length) {
            //all promises rejected, reject outer promise with array of errors
            reject(promiseErrors);
          }
        });
    });
  });
};

// lets test

function task(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (time < 4000) {
        resolve(time);
      } else {
        reject("Time out");
      }
    }, [time]);
  });
}

const taskList1 = [task(1000), task(2000), task(500)];

myPromiseAny(taskList1)
  .then((data) => {
    console.log(data); // output - 500
  })
  .catch((err) => {
    console.log(err);
  });

const taskList2 = [task(7000), task(4000), task(9000)];

myPromiseAny(taskList2)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err); // output - [ 'Time out', 'Time out', 'Time out' ]
  });
