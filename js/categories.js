const container = document.getElementById("root");
const containerImage = document.getElementById("rootImage");

function renderName(datos) {

    const nombres = datos.map(dato => {
        const list = document.createElement('li');
        const list2 = document.createElement('img');
        list.innerHTML = `${dato.nombre}`
        list2.setAttribute('src', dato.imagen);
        container.appendChild(list, list2);
    });

}

fetch("http://localhost:3000/peliculas")
    .then(response => response.json())
    .then(data => renderName(data))