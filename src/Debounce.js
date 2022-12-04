export const useDebounceFunction = (func, delay) => {
  let timer;
  return function () {
    let self = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(self, args);
    }, delay);
  };
};
*************
  const useDebounceFunction = (cb, delay) => {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      cb(...args)
    }, delay);
  };
};
  // Usage
handleChange= useDebounceFunction((event)=>{
console.log(event.target.value)
},1000)
