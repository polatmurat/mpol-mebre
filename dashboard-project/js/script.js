let todos = JSON.parse(localStorage.getItem("todos")) || [];

const API_KEY = 'a90fcdbdae9cff06e04cbbd22a55c965';


function updateClock() {
    const now = new Date();

    document.getElementById("clock").textContent = now.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    document.getElementById("date").textContent = now.toLocaleDateString("tr-TR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

}

setInterval(updateClock, 1000);
updateClock();

function addTodo() {
    const input = document.getElementById("todo-input");
    const value = input.value.trim();
    if (value) {
        todos.push(value);
        input.value = "";
        saveTodos();
    }

}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}

function renderTodos() {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";
    todos.forEach((todo, i) => {
        const li = document.createElement("li");
        li.className = "bg-white/20 px-4 py-2 rounded-xl flex items-center justify-between capitalize";
        li.innerHTML = `
            <span>${todo}</span>
            <button onclick="removeTodo(${i})" class="text-sm text-red-300 hover:text-red-500">Sil</button>
        `;
        list.appendChild(li);
    });
}

function removeTodo(index) {
    todos.splice(index, 1);
    saveTodos();
}


async function fetchWeather() {


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                try {
                    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=tr`;
                    const response = await fetch(url);
                    console.log(response);

                    const data = await response.json();
                    const iconCode = data.weather[0].icon;
                    const iconUrl = `https://api.openweathermap.org/img/w/${iconCode}.png`;
                    document.getElementById("city").querySelector("img").src = iconUrl;
                    document.getElementById("city").querySelector("span").textContent = '' + data.name;
                    document.getElementById("temperature").textContent = '' + data.main.temp.toFixed(1) + '°C';
                    document.getElementById("description").textContent = '' + data.weather[0].description;
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }


            },
            (error) => {
                console.log("Konum getirilirken hata oluştu!");
            }
        )
    }

}

async function main() {
    await fetchWeather();
}


function startListening() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Tarayıcınız Web Speech API desteklemiyor.");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "tr-TR";
    recognition.start();

    recognition.onresult = function (event) {
        console.log(event);

        const command = event.results[0][0].transcript.toLowerCase();

        if(command.includes("sil") || command.includes("tamamlandı") || command.includes("tamam") || command.includes("iptal") ) {
            const willBeDeleted = parseInt(command);
            if(willBeDeleted) {
                removeTodo(willBeDeleted - 1);
            } else {
                todos.push(command);
                saveTodos();
            }
        } else {
            todos.push(command);
            saveTodos();
        }


    };

    recognition.onerror = function () {
        output.innerHTML = "Hata: Ses algılanamadı.";
    };
}


main();

renderTodos();

