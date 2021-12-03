function randoGen(size, max) {
    let result = new Uint32Array(size);
    for (let i = 0; i < size; i++) {
        result[i] = Math.floor(Math.random() * max);
    }
    return result;
}

function quicksort(inputArray) {
    let array = inputArray.slice();
    if (array.length <= 1) {
        return array;
    }
    let pivot = array.pop();
    let left = array.filter((x) => x <= pivot);
    let right = array.filter((x) => x > pivot);
    return quicksort(left).concat(pivot).concat(quicksort(right));
}

//radix sort
//create buckets 0-9
//sort by ones digit
//repop array
//repeat for next digit until sorted

//returns 0-indexed digit from the right
//figure out a way to generate an array of divisors
//or otherwise eliminate some operations
function thisDigit(num, digit) {
    let temp = Math.floor(num / 10 ** digit);
    return temp % 10;
}

//returns 'length' of a number
function numLength(num) {
    let count = 0;
    while (num) {
        num = Math.floor(num / 10);
        count++;
    }
    return count;
}

// function numLength(num) {
//     let comp = 1;
//     let count = 0;
//     while (num >= comp) {
//         comp *= 10;
//         count++;
//     }
//     return count;
// }

function radixSort(inputArray) {
    let array = inputArray.slice();
    let inputLength = inputArray.length;
    let sortingHat = [];
    //find longest number
    let len = numLength(array.reduce((a, b) => Math.max(a, b)));
    //loop len times
    for (let i = 0; i < len; i++) {
        //prepare the sortingHat each loop
        for (let j = 0; j < 10; j++) {
            sortingHat.push([]);
        }
        //sort by ith digit
        for (let j = 0; j < array.length; j++) {
            sortingHat[thisDigit(array[j], i)].push(array[j]);
        }
        array = new Uint32Array(inputLength);
        //debugger
        //repopulate array from sortingHat
        let count = 0;
        for (let j = 0; j < 10; j++) {
            for (let k = 0; k < sortingHat[j].length; k++) {
                array[count] = sortingHat[j][k];
                count++;
            }
        }
        sortingHat = [];
    }
    return array;
}

// let t0 = performance.now();
console.log(radixSort(randoGen(100000000, 99999999)));
// //num of digits affects time dramatically
// let t1 = performance.now();
// console.log(`time = ${t1 - t0} ms`);
