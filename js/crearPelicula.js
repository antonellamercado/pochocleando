//!Funcion para renderizar formulario en el modal
const formulario = document.getElementById("rootForm");
const modalForm = document.getElementById('crearPeliModal');
formulario.classList.add('styleForm');

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
<label>Nombre:</label>
<input type=text id=nombreInput class=campos required>
<br>
<label>Descripcion:</label><br>
<textarea id=descripcionInput class=campos required></textarea>
<br>
<label>Genero:</label>
<select id="generoInput" name="opciones" class=campos required>
  <option value="1">Accion</option>
  <option value="2">Drama</option>
  <option value="3">Comedia</option>
  <option value="4">Ciencia ficcion</option>
</select>
<br>
<br>
<label class="mr-2">Director:</label>
<input type=text id=directorInput class=campos required>
<br>
<label>Categoria:</label>
<input type="text" id=categoriaInput class=campos required>
<br>
<label>Año:</label>
<input type="text" id=anioInput class=campos required>
<br>
<div class="custom-control custom-switch form-group form-check">
  <input type="checkbox" class="custom-control-input" id="publicadaInput" required>
  <label class="custom-control-label" for="publicadaInput">Publicada</label>
</div>
</div>
`
    const footerForm = document.createElement('div');
    footerForm.innerHTML = `<div class="modal-footer">
 <button  type="submit" class="btn btn-primary colorButton">Crear</button>
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
        let publicadaPeli = '';
        if (inputCheck.checked == true) {
            publicadaPeli = 'true';
        } else {
            publicadaPeli = 'false';
        }
        const data = {
            nombre: nombrePeli,
            descripcion: descripcionPeli,
            director: directorPeli,
            genero: generoPeli,
            categoria: categoriaPeli,
            anio: anioPeli,
            publicada: publicadaPeli
        };
        postNewMovie(data);
    })
    //! Realiza post con la nueva pelicula
async function postNewMovie({ nombre, descripcion, director, genero, categoria, anio, publicada }) {
    const url = 'http://localhost:3000/peliculas';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, descripcion, director, genero, categoria, anio, publicada })
    })
    const newMovie = await response.json();
    console.log(newMovie);
    modalForm.modal('hide');

}