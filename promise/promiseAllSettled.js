// Promise.allSettled() polyfill
// this method returns a promise that fullfills after all the promises have either fullfill or rejected,
// with an array of objects that each descirbes the outcome of each promise.

const allSettled = (taskList) => {
  let result = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    taskList.forEach((promise, index) => {
      promise.then(
        (data) => {
          result[index] = { status: "fulfilled", value: data };
          count++;
          if (count == taskList.length) {
            resolve(result);
          }
        },
        (err) => {
          result[index] = { status: "rejected", reason: err };
          count++;
          if (count == taskList.length) {
            resolve(result);
          }
        }
      );
    });
  });
};

const a = new Promise((resolve) =>
  setTimeout(() => {
    resolve(3);
  }, 200)
);
const b = new Promise((resolve, reject) => reject(9));
const c = new Promise((resolve) => resolve(5));

allSettled([a, b, c]).then((val) => console.log(val));

//output - [
//   { status: 'fulfilled', value: 3 },
//   { status: 'rejected', reason: 9 },
//   { status: 'fulfilled', value: 5 }
// ]
