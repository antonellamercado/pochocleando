//!Funcion para renderizar formulario en el modal
const formulario = document.getElementById("rootForm");
const modalForm = document.getElementById('crearPeliModal');
formulario.classList.add('bg-color1');
formulario.classList.add('color3');

function createForm() {
    const headerForm = document.createElement('div');
    headerForm.innerHTML = `
<div class="modal-header">
<h5 class="modal-title text-center" id="exampleModalLabel">Nueva pelicula</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
 `
    const bodyForm = document.createElement('div');
    bodyForm.innerHTML = `
<div class="modal-body">
<div  class="my-1">
<label>Nombre:</label>
<input type=text id=nombreInput class="formulario_input inputEfect" required >
</div>
<br>
<div  class="my-1">
<label>Descripcion:</label><br>
<textarea id=descripcionInput class="formulario_input inputEfect" required></textarea>
</div>
<br>
<div  class="my-1">
<label>Genero:</label>
<select id="generoInput" name="opciones" class="formulario_input_select inputEfect" required>
  <option value="1">Acción</option>
  <option value="2">Drama</option>
  <option value="3">Comedia</option>
  <option value="4">Ciencia Ficcion</option>
  <option value="4">Suspenso</option>
  <option value="4">Terror</option>
</select>
</div>
<br>
<div class="my-1">
<label class="mr-2">Director:</label>
<input type=text id=directorInput class="formulario_input inputEfect" required>
</div>
<br>
<div class="my-1">
<label>Categoria:</label>
<input type="text" id=categoriaInput class="formulario_input inputEfect" required>
</div>
<br>
<div class="my-1">
<label>Año:</label>
<input type="text" id=anioInput class="formulario_input inputEfect" required>
</div>
<br>
<div class="my-1">
<label>Imagen (link):</label>
<input type="text" id="imagenInput" class="formulario_input inputEfect" value="" required>
</div>
<br>
<div class="my-1">
<label>Video (link):</label>
<input type="text" id="videoInput" class="formulario_input inputEfect" value="" required>
</div>
<br>
<div class="custom-control custom-switch form-group form-check my-1">
  <input type="checkbox" class="custom-control-input color3" id="publicadaInput">
  <label class="custom-control-label" for="publicadaInput">Publicada</label>
</div>
<div class="custom-control custom-switch form-group form-check my-1">
  <input type="checkbox" class="custom-control-input color3" id="destacadaInput">
  <label class="custom-control-label" for="destacadaInput">Destacada</label>
</div>
</div>
`
    const footerForm = document.createElement('div');
    footerForm.innerHTML = `<div class="modal-footer">
 <button  type="submit" class="btn bg-color2 color3 buttonCM">Crear</button>
</div>
`
    formulario.appendChild(headerForm);
    formulario.appendChild(bodyForm);
    formulario.appendChild(footerForm);

}

createForm();

//!Capturar datos de los inputs y enviar datos a db
formulario.addEventListener('submit', e => {
        e.preventDefault();
        const nombrePeli = document.getElementById('nombreInput').value;
        const descripcionPeli = document.getElementById('descripcionInput').value;
        const directorPeli = document.getElementById('directorInput').value;
        const selectGenero = document.getElementById("generoInput");
        const generoPeli = selectGenero.options[selectGenero.selectedIndex].text;
        const categoriaPeli = document.getElementById('categoriaInput').value;
        const anioPeli = document.getElementById('anioInput').value;
        const inputCheck = document.getElementById('publicadaInput');
        let publicadaPeli = inputCheck.checked;
        const inputCheckDestacada = document.getElementById('destacadaInput');
        let destacadaPeli = inputCheckDestacada.checked;
        const imagenPeli = document.getElementById('imagenInput').value;
        const videoPeli = document.getElementById('videoInput').value;


        /*   let publicadaPeli = '';
           if (inputCheck.checked == true) {
               publicadaPeli = 'true';
           } else {
               publicadaPeli = 'false';
           }
           */
        const data = {
            nombre: nombrePeli,
            descripcion: descripcionPeli,
            director: directorPeli,
            genero: generoPeli,
            categoria: categoriaPeli,
            anio: anioPeli,
            publicada: publicadaPeli,
            destacada: destacadaPeli,
            imagen: imagenPeli,
            video: videoPeli
        };
        console.log(data);
        postNewMovie(data);
    })
    //! Realiza post con la nueva pelicula
async function postNewMovie({ nombre, descripcion, director, genero, categoria, anio, publicada, destacada, imagen, video }) {
    const url = 'http://localhost:3000/peliculas';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, descripcion, director, genero, categoria, anio, publicada, destacada, imagen, video })
    })
    const newMovie = await response.json();
    console.log(newMovie);
    modalForm.modal('hide');

}