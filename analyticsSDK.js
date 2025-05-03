/*
Problem Statement-
Implement an analytics SDK that exposes log events. It takes events and queue them and then starts sending the events.

1. Send each event after a delay of 1 sec and this loging fails every n%5 times.
2. Send the next event only after the previous one resolves.
3. When the failure occurs, attempt a retry.
*/

class SDK {
  constructor() {
    // hold the events in queue
    this.queue = [];
    // track the count
    this.count = 1;
  }

  //push the events in the queue
  logEvent(event) {
    this.queue.push(event);
  }

  // function to delay the execution
  wait = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject every n%5 time
        if (this.count % 5 == 0) {
          reject();
        } else {
          resolve();
        }
      }, 1000);
    });
  };

  // to send analytics
  // recursively send the events

  sendAnalytics = async () => {
    // base condition for recursion
    // if there is no events in the queue, stop execution
    if (this.queue.length == 0) return;

    // get the first element from queue
    let current = this.queue.shift();

    try {
      // delay of 1 sec
      await this.wait();

      // print the event
      console.log("Analytics sent " + current);
      //increase the count
      this.count++;
    } catch (error) {
      // if execution fails
      console.log("------------------------------");
      console.log("Failed to send event " + current);
      console.log("Retrying sending " + current);
      console.log("-------------------------------");

      // reset the count
      this.count = 1;
      // push current event again at the same place i.e. start of the queue
      this.queue.unshift(current);
    } finally {
      // call again the same function to send the remaining
      this.sendAnalytics();
    }
  };

  // to start the execution
  send = async function () {
    this.sendAnalytics();
  };
}

// Test cases -->>

const sdk = new SDK();

sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7");
sdk.logEvent("event 8");
sdk.logEvent("event 9");
sdk.logEvent("event 10");
sdk.logEvent("event 11");
sdk.logEvent("event 12");
sdk.logEvent("event 13");
sdk.logEvent("event 14");
sdk.logEvent("event 15");
sdk.logEvent("event 16");
sdk.logEvent("event 17");

sdk.send();

/* Output --->>
Analytics sent event 1
Analytics sent event 2
Analytics sent event 3
Analytics sent event 4
------------------------------
Failed to send event event 5
Retrying sending event 5
-------------------------------
Analytics sent event 5
Analytics sent event 6
Analytics sent event 7
Analytics sent event 8
------------------------------
Failed to send event event 9
Retrying sending event 9
-------------------------------
Analytics sent event 9
Analytics sent event 10
Analytics sent event 11
Analytics sent event 12
------------------------------
Failed to send event event 13
Retrying sending event 13
-------------------------------
Analytics sent event 13
Analytics sent event 14
Analytics sent event 15
Analytics sent event 16
PS C:\Users\Asus\OneDrive\Desktop\javascript-questions> node .\analyticsSDK.js
Analytics sent event 1
Analytics sent event 2
Analytics sent event 3
Analytics sent event 4
------------------------------
Failed to send event event 5
Retrying sending event 5
-------------------------------
Analytics sent event 5
Analytics sent event 6
Analytics sent event 7
Analytics sent event 8
------------------------------
Failed to send event event 9
Retrying sending event 9
-------------------------------
Analytics sent event 9
Analytics sent event 10
Analytics sent event 11
Analytics sent event 12
------------------------------
Failed to send event event 13
Retrying sending event 13
-------------------------------
Analytics sent event 13
Analytics sent event 14
Analytics sent event 15
Analytics sent event 16
------------------------------
Failed to send event event 17
Retrying sending event 17
-------------------------------
Analytics sent event 17

*/