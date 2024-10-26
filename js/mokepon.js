//Video 78
//Se asignan const porque los elementos HTML no cambian durante la ejecución del programa
/*Principio DRY: Identificar todo aquel código que se esté repitiendo para evitarlo y
así conseguir escalabilidad y mantenimiento*/

const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

//Se utiliza let debido a que estas variables cambiarán de valor durante la ejecución
let jugadorID = null
let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonTierra
let botonFuego
let botonAgua
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.webp'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoMapa = 350

if (anchoDelMapa > anchoMaximoMapa) {
    anchoDelMapa = anchoMaximoMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

/*Clases: Es un segmento de código donde se deben modelar los atributos comunes a todos los objetos pertenecientes a dicha clase*/

//Declaración de la clase Mokepon junto con el método constructor y parámetros
class Mokepon {
    constructor(nombre, imagen, vidas, fotoMapa) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.vidas = vidas;
        //Propiedades literales
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaImagen = new Image()
        this.mapaImagen.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaImagen,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

/*Una vez que haya sido declarada la clase podemos crear, instanciar o ejemplarizar objetos pertenecientes a alguna clase existente*/

//Las siguientes líneas son la creación de objetos tipo Mokepon mediante variables objeto
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.webp')
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.webp')
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.webp')

const HIPODOGUE_ATAQUES = [
    {
        id: 'boton-agua',
        nombre: '💧'
    },
    {
        id: 'boton-agua',
        nombre: '💧'
    },
    {
        id: 'boton-agua',
        nombre: '💧'
    },
    {
        id: 'boton-tierra',
        nombre: '🌱'
    },
    {
        id: 'boton-fuego',
        nombre: '🔥'
    }
]
//Para poder guardar los objetos recién creados podemos utilizar un arreglo y su método push
mokepones.push(hipodoge, capipepo, ratigueya)

//Para acceder a una propiedad de un objeto se utiliza la nomenclatura del . Esto significa que se debe escribir "objeto.propiedad"

//También existen propiedades literales que son igual a las propiedades de un objeto pero no requieren ser inicializadas en la declaración de la clase. Si la propiedad es un objeto, se puede acceder a sus propiedades siguiendo la misma nomenclatura del . como a continuación se muestra
hipodoge.ataques.push(...HIPODOGUE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    {
        id: 'boton-tierra',
        nombre: '🌱'
    },
    {
        id: 'boton-tierra',
        nombre: '🌱'
    },
    {
        id: 'boton-tierra',
        nombre: '🌱'
    },
    {
        id: 'boton-fuego',
        nombre: '🔥'
    },
    {
        id: 'boton-agua',
        nombre: '💧'
    }
]
capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    {
        id: 'boton-fuego',
        nombre: '🔥'
    },
    {
        id: 'boton-fuego',
        nombre: '🔥'
    },
    {
        id: 'boton-fuego',
        nombre: '🔥'
    },
    {
        id: 'boton-agua',
        nombre: '💧'
    },
    {
        id: 'boton-tierra',
        nombre: '🌱'
    }
]
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

hipodogeEnemigo.ataques.push(...HIPODOGUE_ATAQUES)

capipepoEnemigo.ataques.push(...CAPIPEPO_ATAQUES)

ratigueyaEnemigo.ataques.push(...RATIGUEYA_ATAQUES )

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    /*Plantillas literales: se utilizan para manipular el DOM mediante inyección de código HTML y variables en el documento JS. Para crear un template se debe utilizar el método forEach como se muestra a continuación */

    mokepones.forEach((mokepon) => {
        opcionMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.imagen} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionMokepones
        inputCapipepo = document.getElementById('Capipepo')
        inputHipodoge = document.getElementById('Hipodoge')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch('http://127.0.0.1:8000/unirse')
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorID = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'

    if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascota')
    }
    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://127.0.0.1:8000/mokepon/${jugadorID}`, {
        method: 'post',
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {

    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('Fuego')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = 'true'
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('Agua')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = 'true'
            } else {
                ataqueJugador.push('Tierra')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = 'true'
            }
            ataqueAleatorioEnemigo()
        })
    })

}

function seleccionarMascotaEnemigo(enemigo) {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1)
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('Fuego')
    }
    else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('Agua')
    }
    else { ataqueEnemigo.push('Tierra') }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("Empate")
        } else if (ataqueJugador[index] === 'Agua' && ataqueEnemigo[index] === 'Fuego') {
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'Tierra' && ataqueEnemigo[index] === 'Agua') {
            indexAmbosOponentes(index, index)
            crearMensaje('Ganaste')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'Fuego' && ataqueEnemigo[index] == 'Tierra') {
            indexAmbosOponentes(index, index)
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje('Pierdes batalla')
            victoriasEnemigo--
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal('Empate')
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('Haz ganado la batalla')
    } else {
        crearMensajeFinal('Haz perdido la batalla')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() { location.reload() }
function aleatorio(min, max) { return Math.floor(Math.random() * (max - min + 1) + min) }

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    mascotaJugadorObjeto.pintarMokepon()
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()

    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8000/mokepon/${jugadorID}/posicion`, {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ enemigos }) {
                        console.log(enemigos)
                        enemigos.forEach(function (enemigo){
                            let mokeponEnemigo = null
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            if (mokeponNombre === "Hipodoge") {
                                mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.webp')
                            } else if (mokeponNombre === "Capipepo") {
                                mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.webp')
                            } else if (mokeponNombre === "Ratigueya") {
                                mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.webp')
                            }
                            mokeponEnemigo.pintarMokepon()
                        })
                    })
            }
        })
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        default:
            break;
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoTecla)
    window.addEventListener('keyup', detenerMovimiento)

}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x
    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)