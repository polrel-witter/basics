// Zero matrix
//
// If an element in an MxN matrix is 0, its entire row and column is set to zero
//
// Example
//
// so this ...
// [6 9 8 9 2 9 5]
// [6 9 8 9 2 9 5]
// [6 9 8 0 2 9 5]
// [6 9 8 9 2 9 5]
//
// becomes this:
//
// [6 9 8 0 2 9 5]
// [6 9 8 0 2 9 5]
// [0 0 0 0 0 0 0]
// [6 9 8 0 2 9 5]
//
// Brute force:
//
// going to need to look at all of the values, which brings our runtime to O(n)
// once we reach a 0, we need to know what its column and row indicies are then populate them with 0.
//
// how do we derrive an indicie's coresponding indicies as showing in the example above?
//
// the above zero originally appears in [3, 4]
// we then just need to know how many rows and columns there are and populate zeros along each column in row 3, and each row in column 4. we can derrive the rows/columns from matrix.length and matrix[0].length.
//
// Algorthm:
//
// get row and column length
// create a skeleton copy
// iterate over matrix, checking for zeros,
// if one is hit, populate corresponding indicies with zeros in skeleton copy
// otherwise, continue until the entire matrix has been checked
//
function createMatrix(rows: number, cols: number): number[][] {
    return Array(rows).fill(1).map(() => Array(cols).fill(1));
}

function crossZeros(matrix: number[][]): number[][] {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let newMatrix: number[][] = createMatrix(rows, cols);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === 0) {
              addZeros(newMatrix, i, j);
            } else if (newMatrix[i][j] !== 0) {
                newMatrix[i][j] = matrix[i][j];
            }
        }
    }

    function addZeros(matrix: number[][], row: number, col: number): void {
        const rows = matrix.length;
        const cols = matrix[0].length;

        for (let i = 0; i <= rows - 1; i++) {
            matrix[i][col] = 0; // add 0 along rows
        }
        for (let j = 0; j <= cols - 1; j++) {
            matrix[row][j] = 0; // add 0 along columns
        }
    }

    return newMatrix;
}

// exmaple input
const matrix: number[][] = [
    [ 6, 9, 8, 9 ],
    [ 6, 9, 8, 9 ],
    [ 6, 9, 8, 9 ],
    [ 6, 9, 0, 9 ],
    [ 6, 9, 8, 9 ],
    [ 6, 9, 8, 9 ]
];

// test cases
console.log(crossZeros(matrix));

// Review:
//
// While this works, it's not the best solution as its runtime is O(n^2). You could have implemented something with O(n) or even O(1). Given that you don't need to know the exact location of a zero, all you need to know is whether an entire row or column needs to be zeroed out, you could have implemented a simpler algo that just checks for a zero, and if so, marks that column/row to a boolean true, which is then later used to modify the entire row/column of the same matrix.
