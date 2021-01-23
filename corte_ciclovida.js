const t1 = setTimeout( () => {
    console.log('t1');
}, 5000);

const t2 = setTimeout( () => {
    console.log('t2');
}, 10000);

// Con unref sí se podrá utilizar el setTimeout con un proceso externo
t1.unref();

// ClearTimeout garantiza que no se ejecute el proceso
clearTimeout(t2);
