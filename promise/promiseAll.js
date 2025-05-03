const myPromiseAll = function (taskList) {
  //to store results
  const results = [];

  //to track how many promises have completed
  let promiseCompleted = 0;

  //return new promise

  return new Promise((resolve, reject) => {
    taskList.forEach((promise, index) => {
      // if promise passes
      promise
        .then((data) => {
          //store its outcome and increase the count
          results[index] = data;
          promiseCompleted++;

          //if all pormises are completed
          if (promiseCompleted === taskList.length) {
            resolve(results);
          }
        })
        // if any promise fails, reject.
        .catch((err) => {
          reject(err);
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

myPromiseAll(taskList1)
  .then((data) => {
    console.log(data); // output - [1000,2000,500]
  })
  .catch((err) => {
    console.log(err);
  });

const taskList2 = [task(1000), task(4000), task(500)];

myPromiseAll(taskList2)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err); // output - 'Time out'
  });
