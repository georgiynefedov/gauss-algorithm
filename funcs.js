function test() {

    let result = new Matrix4x4([
        [-1, 2, 5, -2, 0],
        [-2, 4, 10, -2, 4],
        [-1, 2, 2, -2, -3],
        [2, -4, -7, 5, 5]
    ]);
    for (let i = 1; i <= result.height(); i++){
        let line = '';
        for (let j = 1; j <= result.width(); j++){
            line += result.at(i, j) + " "
        }
        console.log(line);
    }
    result = result.gauss4x4();
    console.log("gauss");
    for (let i = 0; i < result.length; i++){
        let line = '';
        for (let j = 0; j < result[i].length; j++){
            line += result[i][j] + " "
        }
        console.log(line);
    }
}

function calculate(){
    let result = new Matrix4x4(readMatrix()).gauss4x4();
    for (let i = 0; i < result.length; i++){
        let line = '';
        for (let j = 0; j < result[i].length; j++){
            line += result[i][j] + " "
        }
        console.log(line);
    }
    printResultMatrix(result);
}

/**
 * @param {int[][]} matrix
 */
function printResultMatrix(matrix) {
    document.getElementById("sa1").innerHTML = String(matrix[0][0]);
    document.getElementById("sa2").innerHTML = String(matrix[0][1]);
    document.getElementById("sa3").innerHTML = String(matrix[0][2]);
    document.getElementById("sa4").innerHTML = String(matrix[0][3]);
    document.getElementById("sa5").innerHTML = String(matrix[0][4]);

    document.getElementById("sb1").innerHTML = String(matrix[1][0]);
    document.getElementById("sb2").innerHTML = String(matrix[1][1]);
    document.getElementById("sb3").innerHTML = String(matrix[1][2]);
    document.getElementById("sb4").innerHTML = String(matrix[1][3]);
    document.getElementById("sb5").innerHTML = String(matrix[1][4]);

    document.getElementById("sc1").innerHTML = String(matrix[2][0]);
    document.getElementById("sc2").innerHTML = String(matrix[2][1]);
    document.getElementById("sc3").innerHTML = String(matrix[2][2]);
    document.getElementById("sc4").innerHTML = String(matrix[2][3]);
    document.getElementById("sc5").innerHTML = String(matrix[2][4]);

    document.getElementById("sd1").innerHTML = String(matrix[3][0]);
    document.getElementById("sd2").innerHTML = String(matrix[3][1]);
    document.getElementById("sd3").innerHTML = String(matrix[3][2]);
    document.getElementById("sd4").innerHTML = String(matrix[3][3]);
    document.getElementById("sd5").innerHTML = String(matrix[3][4]);
}

/**
 * return int[][]
 */
function readMatrix() {
    let matrix = [];
    for (let i = 0; i < 4; i++){
        matrix[i] = [];
    }

    matrix[0][0] = parseInt(document.getElementById("a1").value);
    matrix[0][1] = parseInt(document.getElementById("a2").value);
    matrix[0][2] = parseInt(document.getElementById("a3").value);
    matrix[0][3] = parseInt(document.getElementById("a4").value);
    matrix[0][4] = parseInt(document.getElementById("a5").value);

    matrix[1][0] = parseInt(document.getElementById("b1").value);
    matrix[1][1] = parseInt(document.getElementById("b2").value);
    matrix[1][2] = parseInt(document.getElementById("b3").value);
    matrix[1][3] = parseInt(document.getElementById("b4").value);
    matrix[1][4] = parseInt(document.getElementById("b5").value);

    matrix[2][0] = parseInt(document.getElementById("c1").value);
    matrix[2][1] = parseInt(document.getElementById("c2").value);
    matrix[2][2] = parseInt(document.getElementById("c3").value);
    matrix[2][3] = parseInt(document.getElementById("c4").value);
    matrix[2][4] = parseInt(document.getElementById("c5").value);

    matrix[3][0] = parseInt(document.getElementById("d1").value);
    matrix[3][1] = parseInt(document.getElementById("d2").value);
    matrix[3][2] = parseInt(document.getElementById("d3").value);
    matrix[3][3] = parseInt(document.getElementById("d4").value);
    matrix[3][4] = parseInt(document.getElementById("d5").value);
    return matrix;
}

class Matrix4x4 {

    /**
     * @return {int[][]} matrix after gauss
     */
    gauss4x4(){

        for (let i = 1; i <= this.width() - 2; i++){
            for (let j = i + 1; j <= this.height(); j++){
                if (!this.zeroAt(i, j)){
                    console.log('adding row ' + i + ' to row ' + j)
                    let factor = - (this.at(j, i) / this.at(i, i));
                    this.matrix = this.addRowMultipliedBy(j, i, factor, this.matrix);
                }
            }
        }

        return this.asArray();
    }

    /**
     * @param {int[][]} matrix
     */
    constructor(matrix) {
        this.matrix = matrix;
    }

    width(){
        return this.matrix[0].length;
    }

    height(){
        return this.matrix.length;
    }

    /**
     * return {int[][]}
     */
    asArray(){
        return this.matrix;
    }

    /**
     * @param {int} row
     * @param {int} rowToAdd
     * @param {int} factor
     * @param {int[][]} mm
     */
    addRowMultipliedBy(row, rowToAdd, factor, mm){
        for (let i = 0; i < mm[0].length; i++){
            if (factor !== -Infinity && factor !== Infinity && !isNaN(factor)){
                //console.log('was at ' + row + ' ' + (i+1) + ' ::: ' + mm[row - 1][i])
                mm = this.add(row - 1, i, (factor * mm[rowToAdd-1][i]), mm) ;
                console.log('replaced at ' + row + ' ' + (i+1) + ' to ' + mm[row - 1][i] + ' factor: ' + factor)
            }
        }
        return mm;
    }

    /**
     * @param {int} x
     * @param {int} y
     * @param {int} value
     * @param {int[][]}matrix
     * @return {int[][]}
     */
    add(x, y, value, matrix){
        let result = [];
        for (let i = 0; i < matrix.length; i++){
            result[i] = [];
            for (let j = 0; j < matrix[i].length; j++){
                result[i][j] = matrix[i][j];
                if (i === x && j === y){
                    result[i][j] = result[i][j] + value;
                    //console.log('added ' + value)
                }
            }
        }
        return result
    }

    /**
     * @param {int} row
     */
    rowEmpty(row){
        if (row > this.matrix[0].length) throw "row out of bounds";
        for (let i = 0; i < this.matrix.length; i++){
            if (this.matrix[i][row - 1] !== 0){
                return false;
            }
        }
        return true;
    }

    /**
     * @param {int} x
     * @param {int} y
     * @return boolean
     */
    zeroAt(x, y){
        return (Math.abs(this.matrix[x-1][y-1]) < 0.0001);
    }

    /**
     * @param {int} x
     * @param {int} y
     * @return int
     */
    at(x, y) {
        return this.matrix[x-1][y-1];
    }
}