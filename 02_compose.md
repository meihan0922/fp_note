# Composition function

如果重複調用 A(B(C))，那是否可以將函數封裝成一個，再重複使用，但 compose 需要注意順序性！
ps. 在 redux 的 middlewares 包裹 dispatch 也有使用到！

> 組合 像是管道一樣，把不同的函式接在一起，數據在其中流動。

- 好處是：

  - 結合律，任何函式都可以分組，再被組裝，複用性高，可隨意組裝新增
    - compose(compose(A, B), C) === compose(A, B, C) === compose(A, compose(B, C))
  - debug 方便

- pipe：pipe 是**反向**執行順序的 compose（reduce ＆ reduceRight）

![compose](./assets/compose&pipe.jpeg)

- 🌰：

  ```js
  const compose = function (g, f) {
    return function (x) {
      return g(f(x));
    };
  };
  ```

## 實作

```js
/**
 * 使用方式會是
 * 原先 Afn(Bfn(Cfn(123)))
 * const composeFn = compose(Afn, Bfn, Cfn)
 * composeFn(123)
 *  */
function compose(...fns) {
  return (args) => fns.reduceRight((v, f) => f(v), args);
}

// 變成箭頭函式
const compose =
  (...fns) =>
  (args) =>
    fns.reduceRight((v, f) => f(v), args);

// 不用reduce寫的話
function compose(...funcs) {
  return (args) => {
    let result = args;
    for (let i = funcs.length - 1; i > 0; i--) {
      result = funcs[i](result);
    }
    return result;
  };
}

const pipe =
  (...fns) =>
  (args) =>
    fns.reduceRight((v, f) => f(v), args);
```

## Pointfree

放入組合函式中的函式們，不用關心實際數據裡面有什麼，只要做好自己的小功能就好。
可以測試函式們是否都是接受輸入返回輸出的表達式，像是 while 就不能返回組合。
但不是每個地方都適合！要小心使用。

- 🌰：

  ```js
  // 非 pointfree，因為我們提到資料：word
  const snakeCase = function (word) {
    return word.toLowerCase().replace(/\s+/gi, "_");
  };

  // pointfree，有點像是工廠裡面的機器，只要知道送來的東西是可處理的
  const pointfreeSnakeCase = compose(replace(/\s+/gi, "_"), toLowerCase);

  const initals = (name) =>
    name.split(" ").map(compose(toUpperCase, head)).join(". ");

  const pointfreeInitals = compose(
    intercalate("."), // 3. 用點分開的函式
    map(compose(toUppercase, head)), // 2. 首字母大寫
    split(" ") // 1. 切分空格
  );
  ```

## DeBug

雖然組合函式很方便，但假設 args 參數不一致，組合的函式中有一個僅接受單一參數或是型別不一怎麼辦？

```js
const R = require("ramda");
const data = ["frog", "eyes"];

let exclaim = (x) => x + "!";
let toUpperCase = (x) => x.toUpperCase();

// 將參數限定在“字串”的函式 組合
let angry = compose(exclaim, toUpperCase);
// 組了參數限定在“陣列”的函式
const latin = compose(angry, map);
latin(data); // ❌

// R.map 回傳一個 fn 接受一個 arr 作為參數，內部迭代 調用 angry 方法
const latin = compose(R.map(angry), reverse);
latin(data); //[ 'EYES!', 'FROG!' ]
```

## Trace

在組合函式執行的過程中，會不好找出錯誤！有沒有可能，組合的中間安插一個可以 `console.log` 的函式，看是在執行到哪個函式出錯的？

```js
// ps. 這也涉及到一個概念叫做特殊狀態映射 identity，trace 本質上就是 const fn = x => x;
// 所以 compose(fn, a) === compose(a, fn) === a 是成立的
function trace(tipText) {
  return function (args) {
    console.log("tipText:", args);
    return args;
  };
}
----> 是不是等於前一章用到的 currying
----> 把參數拆開來，回傳一個新函式

const trace = curry(function(tipText, args) {
  console.log("tipText", args);
  return x;
});

const latin = compose(
                angry,
                trace('after reverse data :'),
                reverse
              );

latin(data)
```
