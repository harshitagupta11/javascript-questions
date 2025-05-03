/* 
Problem Statement: 
Create a toggle function that accepts a list of arguments and toggles each of them when invoked in a cycle.


toggle function jo function return karega usko call karenge to vo toggle function ke list of arguments mein se one by one return karega , aur jab end par pahuch jayega jab phir se call kiya to starting se start hoga

example -: 
let onOff = toggle("on","off");
onOff(); // 'on'
onff(); //'off'
onOff(); // 'on'

*/

const toggle = (...list)=>{
 // to track the cycle
 let current = -1;
 const len = list.length;

 return ()=>{
    current = (current+1)%len; // moves to next element. reset to 0 when current>len
    return list[current]
 }
}

const hello = toggle('1','2','3');
console.log(hello()); //'1'
console.log(hello()); // '2'
console.log(hello()); // '3'
console.log(hello()); // '1'

