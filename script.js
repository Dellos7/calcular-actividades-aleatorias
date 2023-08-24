function stringToHash(string) {
    let hash = 0;
     
    if (string.length == 0) return hash;
     
    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
     
    return hash;
}

function obtenerOpcionesAleatorias( idAlu, idAct, cantidad, minimo ){
    let str = `${idAlu}${idAct}`;
    let hash = Math.abs(stringToHash(str));
    let comienzo = hash%cantidad;
    let esPar = hash%2 == 0;
    //console.log(comienzo, esPar);
    let asignadas = 0;
    let opcionesAsignadas = [];
    let i = comienzo;
    while( asignadas < minimo ){
        opcionesAsignadas.push(i+1);
        asignadas++;
        if( esPar ){
            i = (i+1)%cantidad;
        } else{
            i = i-1;
            if( i < 0 ) i = cantidad-1;
        }
    }
    return opcionesAsignadas;
}

function prueba(){
    let ejemploNia = "10752077";
    let ejemploIdAct = "4eso-sa1-act1";
    let cantidadOpciones = 5;
    let minimo = 3;
    [ "10752077", "10752231", "10756539", "10752210", "10752070",
    "10479718", "10752052", "10783211", "10752103", "10755331",
    "10711950", "10752218", "10753155", "10755995", "10711671",
    "12715547", "10752758", "10752738", "10752141", "10752116",
    "10717182" ].map( (nia) => {
        let opcionesAsignadas = obtenerOpcionesAleatorias(nia, ejemploIdAct, cantidadOpciones, minimo);
        console.log(nia, opcionesAsignadas);
    });
    return false;
}

function obtenerActividadesARealizar(){
    eliminarOpcionesAnteriores();
    const niaEl = document.getElementById("nia");
    const idActividadEl = document.getElementById("id_actividad");
    const cantidadOpcionesEl = document.getElementById("canitdad_opciones");
    const numeroOpcionesRealizarEl = document.getElementById("numero_opciones_realizar");
    let nia = niaEl.value;
    let idActividad = idActividadEl.value;
    let cantidad = Number.parseInt(cantidadOpcionesEl.value);
    let minimo = Number.parseInt(numeroOpcionesRealizarEl.value);
    if( !nia || !idActividad || !cantidad || !minimo ||
        minimo > cantidad ){
        mostrarError();
    } else{
        let opcionesAsignadas = obtenerOpcionesAleatorias( nia, idActividad, cantidad, minimo );
        //console.log(nia, opcionesAsignadas);
        mostrarActividadesARealizar(opcionesAsignadas);
    }
    return false;
}

function mostrarError(){
    alert("Datos incorrectos");
}

function eliminarOpcionesAnteriores(){
    const resultadoOpcionesAsignadasEl = document.querySelector(".resultado-opciones-asignadas");
    resultadoOpcionesAsignadasEl.classList.add("oculto");
    document.querySelector(".opciones").innerHTML = "";
}

function mostrarActividadesARealizar( actividades ){
    const resultadoOpcionesAsignadasEl = document.querySelector(".resultado-opciones-asignadas");
    resultadoOpcionesAsignadasEl.classList.remove("oculto");
    const opcionesEl = document.querySelector(".opciones");
    for( let act of actividades ){
        let opcionEl = document.createElement("li");
        opcionEl.innerText = `Actividad ${act}`;
        opcionesEl.appendChild(opcionEl);
    }
}