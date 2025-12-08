

//promises .then

function f(t){
    return new Promise ((resolve) => {
        console.log('sleeping .......')
        setTimeout(() => {
            resolve();
        } ,t * 1000)
    })

}

const result = f(5)

result.then(() => {
    console.log('done')
})

// Note: return the promise to use .then() syntax



//promises async/await

async function Sleep(t){
    const promise = new Promise((resolve) => {
        console.log(`sleeping for ${t} seconds......`);
        setTimeout( () => {
            resolve('resolved!')
        }, t*1000)
    })

    const result = await promise;
    console.log(result)
}

Sleep(4)

//Note: make an async function 
//      define a promise.
//      await the result.
//do not forget to call the async function at bottom.








