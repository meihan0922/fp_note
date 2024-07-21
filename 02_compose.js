function double(num) {
  return num * 2;
}
function pow(num) {
  return num ** 2;
}

const mix1 = double(pow(1));
const mix2 = double(pow(2));
const mix3 = double(pow(3));

// 建立 compose 函式讓函式重複調用
function compose(...fnArrs) {
  return (args) => fnArrs.reduceRight((acc, cur) => cur(acc), args);
}

const composeFn = compose(double, pow);
console.log(composeFn(1));
console.log(composeFn(3));
