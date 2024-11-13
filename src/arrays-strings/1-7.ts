// Rotate matrix
//
// example:
//
// 0: [0, 1, 2]
// 1: [0, 1, 2]
// 2: [0, 1, 2]
// 3: [0, 1, 2]
// 4: [0, 1, 2]
//
// where the values represent the indices (the pixel contents of the matrix doesn't matter in the rotation algo), our result would look like this:
//
// 0: [0, 1, 2, 3, 4]
// 1: [0, 1, 2, 3, 4]
// 2: [0, 1, 2, 3, 4]
//
// english solution:
//
// the original to rotated matrix correlation can be derrived by taking the length of the matrix, n, (i.e. the number of rows), and then iterating through each one, assigning original values to the rotated matrix, where the original column j becomes the new row, and the new column becomes n-1-old_row. at least for a 90 degree, right rotation.
//
// so the function should take the input matrix, generate an equivelant 90 degree skeleton, then map the bytes to the appropriate index
//
// optimization:
//
// a more efficient method would be to move the value as you convert the indices, which would just make the runtime O(n) by having to iterate over the entire matrix once. Otherwise, you're looking at O(n^2) by having to implement a lookup and insert algo.
//
//  since we're not making any changes to the pixels themselves, we're just going to define Pixel as a number, so we can better track the indicies shifts.
//

function createMatrix(rows: number, cols: number): number[][] {
    return Array(rows).fill(0).map(() => Array(cols).fill(0));
}

function rotateMatrix90(matrix: number[][]): number[][] {
    const n = matrix.length;
    let rotatedMatrix: number[][] =  createMatrix(n, n);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          rotatedMatrix[j][n-1-i] = matrix[i][j];
        }
    }
    return rotatedMatrix;
}

const image: number[][] = [
    [ 11, 12, 13],
    [ 21, 22, 23],
    [ 31, 32, 33],
    [ 41, 42, 43]
];

console.log(rotateMatrix90(image));

