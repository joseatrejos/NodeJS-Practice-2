const fs = require('fs');

// 2nd Process: Check.
setImmediate( () => console.log(1) );

// Microtask queue, which is executed between processes (in this case between Poll and Check). rejects and resolves go after nextTick.
Promise.resolve().then( () => console.log(2) );

// Microtask queue, which is executed between processes (in this case between Poll and Check). nextTick executes before resolves and rejects.
process.nextTick( () => console.log(3) );

// Once the eventLoop is finished, this is done in the Poll process. | *NOTE* the processes 3-5 (Close, Timers, and Pending) weren't used.
fs.readFile("hola.txt", () => {
    // Inside this, the loop applies the same; 1st goes the Poll.
    console.log(4);

    // Finally, the timers are executed (Process number 4).
    setTimeout( () => console.log(5) );
    setTimeout( () => console.log(6) );

    // 2nd goes the Microtask queue between processes
    process.nextTick( () => console.log(7) );
});

// 1st Process: Poll.
console.log(8);