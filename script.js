document.addEventListener("DOMContentLoaded", () => {

let array = [];
let size = 30;
let comparisons = 0;
let startTime = 0;

// ---------- Utility ----------
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetComparisons() {
    comparisons = 0;
    document.getElementById("comparisons").innerText = comparisons;
}

function setComplexity(text) {
    document.getElementById("complexity").innerText =
        "Time Complexity: " + text;
}

function startTimer() {
    startTime = performance.now();
}

function stopTimer() {
    const endTime = performance.now();
    document.getElementById("time").innerText =
        Math.floor(endTime - startTime);
}

function disableButtons(disable) {
    document.querySelectorAll("button").forEach(btn => {
        btn.disabled = disable;
    });
}

// ---------- Array Generators ----------
function generateArray() {
    array = [];
    document.getElementById("array").innerHTML = "";
    resetComparisons();
    setComplexity("—");
    document.getElementById("time").innerText = "0";

    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 300) + 20;
        array.push(value);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value + "px";
        document.getElementById("array").appendChild(bar);
    }
}

function generateBestCase() {
    array = [];
    document.getElementById("array").innerHTML = "";
    resetComparisons();
    setComplexity("Best Case");
    document.getElementById("time").innerText = "0";

    for (let i = 0; i < size; i++) {
        let value = 20 + i * 5; // ascending
        array.push(value);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value + "px";
        document.getElementById("array").appendChild(bar);
    }
}

function generateWorstCase() {
    array = [];
    document.getElementById("array").innerHTML = "";
    resetComparisons();
    setComplexity("Worst Case");
    document.getElementById("time").innerText = "0";

    for (let i = size; i > 0; i--) {
        let value = 20 + i * 5; // descending
        array.push(value);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value + "px";
        document.getElementById("array").appendChild(bar);
    }
}

function updateSize(value) {
    size = value;
    generateArray();
}

// ---------- Bubble Sort ----------
async function bubbleSort() {
    resetComparisons();
    setComplexity("O(n²)");
    startTimer();
    disableButtons(true);

    const bars = document.getElementsByClassName("bar");
    const speed = document.getElementById("speed").value;

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            bars[j].style.background = "red";
            bars[j + 1].style.background = "red";

            comparisons++;
            document.getElementById("comparisons").innerText = comparisons;

            await sleep(speed);

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = array[j] + "px";
                bars[j + 1].style.height = array[j + 1] + "px";
            }

            bars[j].style.background = "#38bdf8";
            bars[j + 1].style.background = "#38bdf8";
        }
        bars[array.length - i - 1].style.background = "green";
    }

    stopTimer();
    disableButtons(false);
}

// ---------- Merge Sort ----------
async function mergeSortStart() {
    resetComparisons();
    setComplexity("O(n log n)");
    startTimer();
    disableButtons(true);

    await mergeSort(array, 0, array.length - 1);

    stopTimer();
    disableButtons(false);
}

async function mergeSort(arr, left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
}

async function merge(arr, left, mid, right) {
    const bars = document.getElementsByClassName("bar");
    const speed = document.getElementById("speed").value;

    let temp = [];
    let i = left, j = mid + 1;

    while (i <= mid && j <= right) {
        comparisons++;
        document.getElementById("comparisons").innerText = comparisons;

        if (arr[i] < arr[j]) temp.push(arr[i++]);
        else temp.push(arr[j++]);
    }

    while (i <= mid) temp.push(arr[i++]);
    while (j <= right) temp.push(arr[j++]);

    for (let k = left; k <= right; k++) {
        arr[k] = temp[k - left];
        bars[k].style.height = arr[k] + "px";
        bars[k].style.background = "orange";
        await sleep(speed);
        bars[k].style.background = "#38bdf8";
    }
}

// ---------- Quick Sort ----------
async function quickSortStart() {
    resetComparisons();
    setComplexity("Avg: O(n log n), Worst: O(n²)");
    startTimer();
    disableButtons(true);

    await quickSort(array, 0, array.length - 1);

    stopTimer();
    disableButtons(false);
}

async function quickSort(arr, low, high) {
    if (low < high) {
        const pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    const bars = document.getElementsByClassName("bar");
    const speed = document.getElementById("speed").value;

    const pivot = arr[high];
    let i = low - 1;

    bars[high].style.background = "purple";

    for (let j = low; j < high; j++) {
        bars[j].style.background = "red";

        comparisons++;
        document.getElementById("comparisons").innerText = comparisons;

        await sleep(speed);

        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            bars[i].style.height = arr[i] + "px";
            bars[j].style.height = arr[j] + "px";
        }

        bars[j].style.background = "#38bdf8";
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    bars[i + 1].style.height = arr[i + 1] + "px";
    bars[high].style.height = arr[high] + "px";

    bars[high].style.background = "#38bdf8";
    bars[i + 1].style.background = "green";

    return i + 1;
}

// ---------- Initial Load ----------
generateArray();
});

