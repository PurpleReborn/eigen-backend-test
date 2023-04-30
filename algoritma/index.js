const algoritma = () => {

  //#region variable
  const word = "NEGIE1 123";
  const word2 = "Saya sangat senang mengerjakan soal algoritma";

  const INPUT = ["xc", "dz", "bbb", "dz"];
  const QUERY = ["bbb", "ac", "dz"];

  const matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9],
  ];
  //#endregion variable

  const reverseString = (str) => {
    const res = str.split("").reverse().join("");
    return res;
  };
  console.log(reverseString(word))

  const longestString = (str) => {
    const arrWords = str.split(" ");

    let longestWord = "";
    for (let i = 0; i < arrWords.length; i++) {
      if (arrWords[i].length > longestWord.length) {
        longestWord = arrWords[i];
      }
    }
    return `${longestWord}: ${longestWord?.length} character`;
  };
  console.log(longestString(word2))

  const findDoubleArray = (arr1, arr2) => {
    const res = arr1.map((q) => {
      const count = arr2.filter((i) => i === q).length;
      return count;
    });
    return res
  }
  console.log(findDoubleArray(QUERY, INPUT))

  const findDiagonal = (matrix) => {
    let diagonal1 = 0;
    let diagonal2 = 0;

    for (let i = 0; i < matrix.length; i++) {
      diagonal1 += matrix[i][i];
      diagonal2 += matrix[i][matrix.length - i - 1];
    }
    const res = diagonal1 - diagonal2;
    return res;
  }
  console.log(findDiagonal(matrix))
}

module.exports = algoritma;