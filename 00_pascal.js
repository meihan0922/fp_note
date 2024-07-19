function generatePascalArr(numRows) {
  if (numRows == 0) return [];
  let result = [[1]];
  for (let i = 1; i < numRows; i++) {
    let lastRow = result[i - 1]; // 上一排
    let arr = [1]; //第一位一定為1
    for (let j = 1; j < i; j++) {
      // 上一排的數字 開始加總
      arr.push([lastRow[j - 1] + lastRow[j]]);
    }
    arr.push([1]); //最後一位一定為1
    result.push(arr);
  }
  return result;
}

function nextRow(prevRow) {
  const row = [1];
  for (let i = 1; i < prevRow.length; i++) {
    row.push(prevRow[i - 1] + prevRow[i]);
  }
  row.push(1);
  return row;
}

function generatePascalArr(numRows) {
  let result = [];
  for (let i = 0; i < numRows; i++) {
    if (i === 0) {
      result.push([1]);
    } else {
      result.push(nextRow(result[i - 1]));
    }
  }
  return result;
}
