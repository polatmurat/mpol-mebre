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

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const API_KEY = 'a90fcdbdae9cff06e04cbbd22a55c965';

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
        li.className = "bg-white/20 px-4 py-2 rounded-xl flex items-center justify-between";
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
                    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
                    const response = await fetch(url);
                    console.log(response);

                    const data = await response.json();
                    document.getElementById("city").textContent = '' + data.name;
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

main();

renderTodos();

