const names: Array<string> = [];

names[0].split(' ');

const promise: Promise<number> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});

promise.then((data) => {
  // Since, the promise returns a number then we can't apply
  // split function.
  // data.split(' ');
});
