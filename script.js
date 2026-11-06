const textInput = document.getElementById("textInput");
const keys = document.querySelectorAll(".key");
const charCount = document.getElementById("charCount"); 
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
let shiftActive = false; 
let capsActive = false;

function updateCount() { charCount.textContent = $
    {textInput.value.length} characters; }

function insertText(character) {
const start = textInput.selectionStart;
const end = textInput.selectionEnd;

textInput.setRangeText(
    character,
    start,
    end,
    "end"
);

updateCount();
}

function backspace() {
const start = textInput.selectionStart;
const end = textInput.selectionEnd;

if (start === end && start > 0) {

    textInput.setRangeText(
        "",
        start - 1,
        end,
        "end"
    );

} else {

    textInput.setRangeText(
        "",
        start,
        end,
        "end"
    );

}

updateCount();
}

function resetShift() {
shiftActive = false;
updateModifiers();
}

function updateModifiers() {
document.querySelectorAll('[data-key="Shift"]')
    .forEach(key => {
        key.classList.toggle("pressed", shiftActive);
    });

document.querySelectorAll('[data-key="CapsLock"]')
    .forEach(key => {
        key.classList.toggle("pressed", capsActive);
    });
}

function handleKey(key) {
if (key === "Backspace") {
    backspace();
    return;
}

if (key === "Enter") {
    insertText("\n");
    resetShift();
    return;
}

if (key === " ") {
    insertText(" ");
    resetShift();
    return;
}

if (key === "Tab") {
    insertText("    ");
    resetShift();
    return;
}

if (key === "CapsLock") {
    capsActive = !capsActive;
    updateModifiers();
    return;
}

if (key === "Shift") {
    shiftActive = !shiftActive;
    updateModifiers();
    return;
}

if (key === "Control" || key === "Alt") {
    return;
}


const symbols = {
    "`": "~",
    "1": "!",
    "2": "@",
    "3": "#",
    "4": "$",
    "5": "%",
    "6": "^",
    "7": "&",
    "8": "*",
    "9": "(",
    "0": ")",
    "-": "_",
    "=": "+",
    "[": "{",
    "]": "}",
    "\\": "|",
    ";": ":",
    "'": '"',
    ",": "<",
    ".": ">",
    "/": "?"
};

let character = key;


if (/^[a-z]$/i.test(key)) {

    const uppercase = capsActive !== shiftActive;

    character = uppercase
        ? key.toUpperCase()
        : key.toLowerCase();

} else if (shiftActive) {

    character = symbols[key] || key;

}


insertText(character);

resetShift();
}

keys.forEach(key => {
key.addEventListener("click", function() {

    const value = this.dataset.key;

    textInput.focus({ preventScroll: true });

    handleKey(value);

    if (value !== "Shift" && value !== "CapsLock") {

        this.classList.add("pressed");

        setTimeout(() => {
            this.classList.remove("pressed");
        }, 120);

    }

});
});

textInput.addEventListener("input", updateCount);

clearBtn.addEventListener("click", function() {
textInput.value = "";

updateCount();

textInput.focus();
});

copyBtn.addEventListener("click", async function() {
if (!textInput.value) {
    alert("Nothing to copy!");
    return;
}

try {

    await navigator.clipboard.writeText(textInput.value);

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
        copyBtn.textContent = "Copy Text";
    }, 1500);

} catch (error) {

    textInput.select();

    const copied = document.execCommand("copy");

    copyBtn.textContent = copied ? "Copied!" : "Copy failed";

    setTimeout(() => {
        copyBtn.textContent = "Copy Text";
    }, 1500);

}
});