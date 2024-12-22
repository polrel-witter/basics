// Valid sudoku
//
// make sure a sudoku board is valid by ensuring it adheres to the following rules:
//
// - each row and column must contain either a '.' or 1 - 9 w/o repeitition.
// - each of the 3 x 3 sub-grids must contain either a '.' or 1 - 9 w/o repeitition
//
// distilled:
// - the board is 9 x 9, so a fixed 81 slots.
// - input will be a matrix (an array of an array of strings) so the outer array's index will represent the rows and inner index will point to columns.
// - the inefficent brute force method would be to scan each row, comparing each index to the values at other indicies within the same row, then pulling each column value and doing a similar operation. however, this does not cover the 3x3 sub-grid validation.
// - then, rather than going through all rows, then columns, then sub-grids, causing an O(a * b * c) runtime, the function should progress without needing to go backward so it scans each row in full, validating the row as it progresses, populating a map for rows, columns, and subGrids. at each new populated cell we'll first check if it already exists in either the rows, columns, or subGrids map. if 1 already exists, it outputs false and stops, else it continues to the end, producing true.
// - each key in all 3 maps point to a set of numbers that have already been logged.
// - finally, all we need to know is whether the board is valid or not so if at any point there's a repeat entry, we'll output false.
//
// function:
// + initialize a map of a numbers set for rows, columns, and subGrids
// - iterate over the input matrix:
//    + make note of the column, search it for repeat number
//    + note the row, search it
//    + derrive subGrid index with (row // 3) * 3 + (col // 3)
//    + search the subGrid for a repeat; number.
// + if at any point there's a match, return false
// + else if entirely consumed, return true
//
function validateSudoku(matrix: string[][]): boolean {
    const numMap = new Map<number, Set<string>>();

    // init validation containers
    let rows = numMap;
    let cols = numMap;
    let subs = numMap;

    // for each row iteration, iterate across its column axis
    for (let i = 0; i < matrix.length; i++) {

        for (let j = 0; j < matrix[i].length; j++) {
            // skip non-number values
            if (matrix[i][j] === '.') continue;

            // derrive subGrid key from current index
            let k = Math.floor(i / 3) * 3 + Math.floor(j / 3)

            // get sets of already mapped numbers
            let colNums: Set<string> | undefined = cols.get(j);
            let rowNums: Set<string> | undefined = rows.get(i);
            let subNums: Set<string> | undefined = subs.get(k);

            // TODO refactor
            // for each set: if no key, set it, else check if it repeats
            if (colNums === undefined) {
                let newColSet = new Set<string>();
                cols.set(j, newColSet.add(matrix[i][j]));
            } else {
                if (colNums.has(matrix[i][j])) {
                    return false;
                }
            }

            if (rowNums === undefined) {
                let newRowSet = new Set<string>();
                rows.set(i, newRowSet.add(matrix[i][j]));
            } else {
                if (rowNums.has(matrix[i][j])) {
                    return false;
                }
            }

            if (subNums === undefined) {
                let newSubSet = new Set<string>();
                subs.set(k, newSubSet.add(matrix[i][j]));
            } else {
                if (subNums.has(matrix[i][j])) {
                    return false;
                }
            }
        }
    }
    return true;
}


const board1: string[][] = [
  ["5","3",".",".","7",".",".",".","."],
  ["3",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
const board2: string[][] = [
  ["5","3",".",".","7",".",".",".","."],
  ["2",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]


console.log(validateSudoku(board1));
console.log(validateSudoku(board2));

