// Завдання №1
const body = document.querySelector('body');
let isValid = 1;
let errorFields = [];
let answers = [];
const answerDiv = document.createElement('div');
const task1 = document.getElementById('task1');

function onSubmit() {
    clearData();
    checkAndAnalyze('name', 'ПІБ', /^([A-Z]|[А-Я])([a-z]|[а-я])+ ([A-Z]|[А-Я]|І)\. ([A-Z]|[А-Я]|І)\.$/);
    checkAndAnalyze('variant', 'Варіант', /^(\d{1}|\d{2})$/);
    checkAndAnalyze('group', 'Група', /^([A-Z]|[А-Я]|І){2}-\d{2}$/);
    checkAndAnalyze('faculty', 'Факультет', /^([A-Z]|[А-Я]|І){4}$/);
    checkAndAnalyze('birthday', 'Дата народження', /^\d{4}-\d{2}-\d{2}$/);
    if (isValid) {
        answers.forEach(answer => answerDiv.appendChild(answer));
        task1.appendChild(answerDiv);
    } else {
        errorFields.forEach(errorField => {
            const field = document.getElementById(errorField);
            field.style.border = '2px red solid';
        });
    }
   }
function clearData() {
    while (answerDiv.firstChild) answerDiv.removeChild(answerDiv.firstChild);
    if (task1.querySelector('.answerDiv')) task1.removeChild(answerDiv);
    errorFields.forEach(errorField => {
        const field = document.getElementById(errorField);
        field.style.border = '2px gray solid';
    });
    isValid = 1;
    errorFields = [];
    answers = [];
}

function checkAndAnalyze(type, text, regex, additionalCheck = () => true) {
    const valueFromElement = document.getElementById(type).value;
    if (regex.test(valueFromElement) && additionalCheck(valueFromElement)) {
        const answer = document.createElement('h3');
        answer.innerHTML = `${text}: ` + valueFromElement;
        answers.push(answer);
    } else {
        isValid *= 0;
        errorFields.push(type);
    }
}

function onMouseOverRandomBg(element) {
    element.style.background = getRandomColorStyle();
}
function onMouseLeaveClearBg(element) {
    element.style.background = '#FFF';
}
function getRandomInt() {
    return Math.floor(Math.random() * 255);
}
function getRandomColorStyle() {
    return 'rgb(' + getRandomInt() + ',' + getRandomInt() + ',' + getRandomInt() + ')';
}

// Завдання №2
const VARIANT = 4;

for (let row = 0; row < 6; row++) {
    const rowElement = document.createElement('tr');
    for (let data = 0; data < 6; data++) {
        const index = String(data + 1 + (row * 6));
        const dataElement = document.createElement('td');
        dataElement.innerHTML = index;
        dataElement.id = index;
        rowElement.appendChild(dataElement);
        body.appendChild(rowElement);
    }
}

function onMouseClickCell(element) {
    element.style.background = document.getElementById('color_input').value;
}

function onDoubleClickCell() {
    const startColumn = VARIANT % 6;
    let i = 6;
    while(i <= 31) {
        const currentElement = document.getElementById(String(i));
        i += 5;
        currentElement.style.background = document.getElementById('color_input').value;
    }
}
   

const elementByVariant = document.getElementById(String(VARIANT));
elementByVariant.onmouseover = () => {
    onMouseOverRandomBg(elementByVariant);
};

elementByVariant.onmouseup = () => {
    onMouseClickCell(elementByVariant);
};

elementByVariant.ondblclick = () => {
    onDoubleClickCell();
};
