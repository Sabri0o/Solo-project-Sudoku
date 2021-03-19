var checkSudoku = function (p) {
  function CheckSudokuColumn(i, p) {
    for (var j = 0; j < p.length - 1; j++) {
      if (p[0][i] == p[j + 1][i]) {
        return false;
      }
    }
    return true;
  }
  ////////////////////

  function CheckSudokuRow(i, p) {
    for (var j = i; j < p.length - 1; j++) {
      if (p[0][i] == p[0][j + 1]) {
        return false;
      }
    }
    return true;
  }
  ///////////////////

  function check(i, p) {
    for (var j = 0; j <= p.length - 1; j++) {
      if (
        !p[j].includes(p[0][i]) ||
        ![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(p[0][i]) ||
        p[0][i] > p.length
      ) {
        return false;
      }
    }
    return true;
  }

  ////////////////////////////

  for (var k = 0; k < p.length - 1; k++) {
    if (!(CheckSudokuColumn(k, p) && CheckSudokuRow(k, p) && check(k, p))) {
      return false;
    }
  }
  return true;
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function square3x3(rowx, columnj, x) {
  var res = [];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      res.push(
        x[i + Math.floor(rowx / 3) * 3][j + Math.floor(columnj / 3) * 3]
      );
    }
  }
  return res;
}

var diff = function (arr1, arr2) {
  return arr1.filter((x) => !arr2.includes(x));
};

var colx = function (arr, col) {
  res = [];
  for (var i = 0; i < arr.length; i++) {
    res.push(arr[i][col]);
  }
  return res;
};

var resetRow = function (arr, row) {
  for (var i = 0; i < 9; i++) {
    arr[row][i] = 0;
  }
};

var y = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var temporary = [
  [7, 2, 3, 1, 6, 5, 4, 9, 8],
  [8, 1, 4, 9, 7, 3, 6, 5, 2],
  [6, 5, 9, 8, 2, 4, 3, 1, 7],
  [4, 9, 2, 7, 8, 1, 5, 3, 6],
  [3, 6, 5, 2, 4, 9, 8, 7, 1],
  [1, 7, 8, 5, 3, 6, 2, 4, 9],
  [9, 4, 1, 6, 5, 2, 7, 8, 3],
  [5, 8, 6, 3, 1, 7, 9, 2, 4],
  [2, 3, 7, 4, 9, 8, 1, 6, 5],
];

var fill = function (arr0, row, column) {
  for (var i = row; i < arr0.length; i++) {
    for (var j = column; j < arr0.length; j++) {
      var square = square3x3(i, j, arr0);
      //console.log(square)
      if (checkSudoku(arr0)) {
        return arr0;
      }
      var limits = diff(
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        arr0[i].concat(square).concat(colx(arr0, j))
      );
      var randNum = limits[Math.floor(Math.random() * limits.length)];
      //console.log(limits)
      //console.log(randNum)
      //console.log(i,j)

      if (
        square.includes(randNum) ||
        arr0[i].includes(randNum) ||
        colx(arr0, j).includes(randNum)
      ) {
        fill(arr0, row, column);
      } else {
        arr0[i][j] = randNum;
        row = i;
        column = j;
      }
      if (randNum === undefined) {
        resetRow(arr0, row);
        fill(arr0, row, 0);
      }
      //console.log(arr0)
      else if (j === 8 && i === 8) {
        return;
      } else if (j === 8) {
        row = i + 1;
        column = 0;
        fill(arr0, row, column);
      } else {
        fill(arr0, row, column + 1);
      }
    }
  }
};

var solution = JSON.parse(JSON.stringify(fill(y, 0, 0)));

var randomIndex = function (setLength) {
  var res = {};
  var limits = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  while (Object.keys(res).length < setLength) {
    var row = limits[Math.floor(Math.random() * limits.length)];
    var column = limits[Math.floor(Math.random() * limits.length)];
    var key = String([row, column]);
    if (!res.hasOwnProperty(key)) {
      res[key] = [row, column];
    }
  }
  return Object.values(res);
};

var initiate = function (solved, difficulty) {
  var init = solved.slice();
  var set = { difficult: 40, medium: 30, easy: 1 };
  var randomClear = randomIndex(set[difficulty]);
  //console.log(randomClear)
  for (var i = 0; i < randomClear.length; i++) {
    //console.log(randomClear[i][0],randomClear[i][1])
    //console.log(solution)
    init[randomClear[i][0]][randomClear[i][1]] = 0;
  }
  return init;
};

var newGame = initiate(solution, "difficult");

var flat = function (arr) {
  var res = [];
  for (var i = 0; i < 9; i++) {
    res.push(...arr[i]);
  }
  return res;
};

var newGameflat = flat(newGame);
var inputs = document.getElementsByTagName("input");

//var flatTemporary = flat(temporary)

var setpuzzle = function (set = newGameflat) {
  $("input").css("background-color", "white");

  for (var i = 0; i < 81; i++) {
    if (set[i] === 0) {
      inputs[i].disabled = false;
      inputs[i].value = "";
    } else {
      inputs[i].value = set[i];
    }
  }
  $("input:disabled").css("background-color", "#bbdefb");
};

var checker = function (set = y) {
  var c = flat(set);
  for (var i = 0; i < 81; i++) {
    if (Number(inputs[i].value) != c[i] || inputs[i].value === "") {
      return false;
    }
  }
  return true;
};
