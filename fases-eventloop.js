const fs = require('fs');

// 4th Process: Close?
setImmediate( () => console.log(1) );

// 3rd Process: Close?
Promise.resolve().then( () => console.log(2) );

// 2nd Process: Check?
process.nextTick( () => console.log(3) );

// 5th Process: Pending?: 
fs.readFile("hola.txt", () => {
    // Inside this, the loop applies the same; 1st goes the Poll
    console.log(4);

    // 4th go the timers
    setTimeout( () => console.log(5) );
    setTimeout( () => console.log(6) );

    // 2nd goes the Check
    process.nextTick( () => console.log(7) );
});

// 1st Process: Poll
console.log(8);