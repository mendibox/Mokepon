const express = require("express")
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const jugadores= []
class Jugador{
    constructor(id) {
        this.id = id
    }
    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }
}
class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}
app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(id)
})
app.post('/mokepon/:jugadorID', (req, res) => {
    const jugadorID = req.params.jugadorID || ''
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorID === jugador.id)

    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    console.log(jugadores)
    console.log(jugadorID)
    res.end()
})

app.listen(8000, () => {
    console.log('App server is running')
})