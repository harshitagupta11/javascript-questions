/*
Problem statement -->
You must be familier with browser history and its functionality where you can navigate through the browsed history.
Implement the same with following functionality
1. visit(url): Navigates to a new URL and clear forward history.
2. back(): Goes back to the previous url.
3. forward(): Goes forward to the next url.
4. current(): Return the url of the current page
*/

function BrowserHistory(){
    // track history use array
    this.history = [];
    this.index = -1;

    //add new url at next index

    this.visit = function(url){
        this.index++;
        this.history[this.index] = url
    }

    // return the url of the current page
    this.current = function(){
        return this.history[this.index];
    }

    // go to previous url
    this.backward= function(){
        this.index = Math.min(0, --this.index); // to avoid underflow of the index
    }

    // go to next url 
    this.forward = function(){
        this.index = Math.max(this.history.length-1, ++this.index);
    }
}

// Test Cases -->>

const bh = new BrowserHistory();
bh.visit('A');
bh.visit('B');
console.log(bh.current())
bh.backward();
console.log(bh.current());

// output -->
// B]
// A