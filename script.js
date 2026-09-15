const button = document.getElementById("btn");

function moveRandomly() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const newLeft = Math.floor(Math.random() * (windowWidth - button.offsetWidth));
    const newTop = Math.floor(Math.random() * (windowHeight - button.offsetHeight));
    button.style.left = newLeft + "px";
    button.style.top = newTop + "px";
}

button.addEventListener("click", moveRandomly);

//Таймер
let interval;

function startTimer() {
    seconds = 0;
    interval = setInterval(() => {
        seconds += 0.01;
        document.getElementById("timer").textContent = seconds.toFixed(2);
    }, 10);
}

startTimer();

//Клик - остановка и результат 
document.getElementById("btn").addEventListener("click", () =>{
    clearInterval(interval);
    saveRecord(seconds);
    if (seconds < 0.7) document.body.style.background = "green";
    else if (seconds < 1.2) document.body.style.background = "yellow";
    else document.body.style.background = "red";

        setTimeout(() => {
        document.body.style.background = "";
        startTimer();
    }, 50);
});

function showRecords(){
    const records = JSON.parse(localStorage.getItem("records")) || [];//Json.parse(Превращает строку в массив)
    const list = document.getElementById("records");
    list.innerHTML = "";//Очищаем список, чтоб при повторном вызове было W.

    records.forEach(r => {
        const li = document.createElement("li");
        li.textContent = r.toFixed(2) + "сек";
        list.appendChild(li);//Добавляем <li> в <ul>.
    });
}


function saveRecord(time) {
    const records = JSON.parse(localStorage.getItem("records")) || [];
    records.push(time)//Добавляем новое время в конец массива, чтоб было WW.
    records.sort((a, b) => a - b);//Сортируем массив по возрастанию от меньшего к большему. (a, b) => a - b Потому что обычный sort() сортирует как строки типа "10" < "2", а нам нужно как числа.
    records.splice(5);
    localStorage.setItem("records", JSON.stringify(records));
    showRecords();
}

document.getElementById("resetRecords").addEventListener("click", () => {
    localStorage.removeItem("records");
    showRecords();
});


showRecords();
