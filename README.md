# fp_note 函數式編程 Functional Programming

是程式設計的其中一種方式，相對於物件導向，react 也是使用 FP 來開發的。

### 關於函數式編程常提到的概念

- <u>函式是一等公民(First-class)</u>：一等公民的概念是指 **可作為韓式的參數、函式返回值、賦值給變量**，在 JS 中函式就是一等公民。
- <u>高階函式(higher-order functions)</u>：滿足其中之一條件
  - 可將函式作為參數傳入另一函式當中
  - 可當作另一個函式的返回值
- <u>純函式(Pure Functions)</u>：output 只取決於 input
  - function 的一種，將相同的輸入放入函式，永遠有相同的輸出，沒有任何的副作用。函式內部有完全獨立的環境，不受外部影響交互改變內部。（`slice` ⭕️，`splice` ❌，會改變原輸入）
  - 好處是，結果是
    - 可緩存(永遠有相同的輸出)、可預測的
    - 可組合（可移植性，用參數的方式注入依賴，想要怎麼組合都可以）
    - 容易 unit test
    - 並行代碼（可並行運行任意純函數，不會因副作用變成競態 race condition
- <u>副作用(Side Effects)</u>： 改變 scope 以外的狀態
  - 更改外部環境的變數或是物件屬性
  - 寫入 `console.log`、檔案
  - 觸發外部的流程（發送 HTTP Request、Rendering screen、DOM 操作）
  - 呼叫任何有副作用的函式（`splice`）
- <u>Immutability</u>：
  - 只要有變數，變數可被更改，就很難有把握『它在哪被更動』『被更動成什麼樣子』，尤其是在回圈當中
  - 在很多程式語言的設計讓修改變數變得很麻煩，盡可能讓你不修改
- <u>Recursion 遞迴</u>：
  - 為什麼在 FP 當中鼓勵使用遞迴 > 回圈呢？
    - 回圈和 mutation 息息相關，和 Immutability 相悖
    - 遞迴是利用執行上下文堆棧的執行環境產生閉包保留
    - 為了可讀性，還是會用 filter, map 等來取代遞迴
- <u>Immutability, no Loop, Pure Functions --> Declarative 宣告式編程</u>：
  - <u>Declarative vs. Imperative</u>：
    - 宣告式編程 Declarative：
      **著重在 <u>WHAT</u>**，描述該在哪做什麼、資料流，邏輯為用較為抽象的程式碼。==告訴程式碼想要達到怎樣的目標，通常是個單純的運算過程，簡化為一個值返回（表達式）==（比方用 JS 預設 prototype FP 的方法，易讀，且可重複使用。）
    - 指令式編程 Imperative：
      **著重在 <u>HOW</u>**，該怎麼做、流程控制，==具體表達程式碼該做什麼才能達到目標，程式**一步一步**按著順序指示執行==。程用基本語句 如: for, if, while, switch。
  - 重點不在於程式碼的長短，==Declarative 著重在**簡化**！==

---

### FP 的疑問？

#### 可以做到每個 function 都是 Pure 的嗎？

通常我們寫程式都是為了操作某個東西，比方說 DB、控制數據等等，在過程中也無可避免的會 console 來排查錯誤。在真實世界中要做到完全的 Pure 幾乎不可能。

#### 那 FP 如何處理 side effects?

我們只能盡可能的讓 side effects 在可控範圍內發生。
使用 monad 把 impure 的部分推到邊界，盡可能讓程式都是 pure 的。

#### 有效能的問題嗎？

比方説 Immutability，為了不修改原始的變數，必須複製變數；
比方說 使用遞迴的方式，是不是會讓記憶體不足，產生效能問題。

FP 著重在表達邏輯，記憶體的操作和優化，不是特別著重，都交給 complier 去做了，complier 也可以幫忙做某些程度的優化，效能問題並沒有那麼嚴重，但程式碼卻乾淨很多！

### 章節目錄

- 0. [實作帕斯卡三角形 來理解 FP](/blob/main/00_pascal.md)
- 1. [currying](/blob/main/01_currying.md)
- 2. [compose & pipe](/blob/main/02_compose.md)

### 學習資料

- [JS 函数式编程指南中文版](https://jigsawye.gitbooks.io/mostly-adequate-guide/content/)
- [2020 IT 鐵人賽之 — 開始用 javaScript 學 Functional Programming 囉](https://medium.com/hannah-lin/2020-it-鐵人賽之-開始用-javascript-學-functional-programming-囉-f7b050a60406)
- [走歪的工程師 James - Functional Programming](https://www.youtube.com/playlist?list=PLz-S_Wd1N3strXFgvAt4fCSiafDk8xsLq)
