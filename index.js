

// COSAS DEL HTML QUE NECESITO AQUÍ


// Barra de Navegación/Vida
const puntos = document.getElementById("puntos")
const vidas = document.getElementById("vidas")

const exit = document.getElementById("exit")
const restart = document.getElementById("restart")


// Mapa
const gameMap = document.getElementById("map")
const pared1 = document.getElementById("pared1")
const pared2 = document.getElementById("pared2")
const pared3 = document.getElementById("pared3")
const pared4 = document.getElementById("pared4")
const pared5 = document.getElementById("pared5")
const pared6 = document.getElementById("pared6")
const pared7 = document.getElementById("pared7")
const pared8 = document.getElementById("pared8")
const pared9 = document.getElementById("pared9")



// Elementos fijos
const dineros = document.getElementById("dineros")
const dineros2 = document.getElementById("dineros2")
const dineros3 = document.getElementById("dineros3")
const dineros4 = document.getElementById("dineros4")
const dineros5 = document.getElementById("dineros5")

const cor = document.getElementById("cor")
const cor2 = document.getElementById("cor2")

const espada = document.getElementById("espada")
const espada2 = document.getElementById("espada2")
const espada3 = document.getElementById("espada3")


// Elementos móviles
const personaje = document.getElementById("personaje")
const enemigo = document.getElementById("enemigo")



// PUNTUACIÓN Y VIDAS - IMPORTANTE: necesitaré un trigger que no sea click 
                    // para que se activen las funciones SÓLO al pasar el personaje 
                    // --> ¿con una función que compruebe las posiciones? ¿?¿?¿

let points = 0;
let life = 3;

// --> SUMAR PUNTOS

function puntosPlus(){
    if(points < 10){
        points++
        puntos.innerText = points
    }
    else if(points >= 10){
        alert("¡OLE TÚ!")
     }

}

// dineros.addEventListener("click",puntosPlus)

// --> SUMAR VIDA

function vidaPlus(){
    if(life < 5){
       life++   
       vidas.innerText = life
    }
}

// cor.addEventListener("click",vidaPlus)

// --> RESTAR vidas/puntos ESPADA

function hurt(){
    life -= 0.25
    vidas.innerText = life
    
    if(points > 0){
    points -= 0.25
    puntos.innerText = points}

    if(life <= 0){
       alert("Game Over")
    }
}

// espada.addEventListener("click", hurt)
// espada2.addEventListener("click", hurt)

// --> RESTAR vidas ENEMIGO

function kill(){
    life--
    vidas.innerText = life

    if(life <= 0){
       alert("Game Over")
    }
}

// enemigo.addEventListener("click",kill)


// Debería hacer un RESPAWN ¿?¿? Probemos

function respawn(gameMap, variable){
    

    let x = Math.random()*(gameMap.clientWidth - variable.width)
    let y = Math.random()*(gameMap.clientHeight -variable.height)

    getLocation(variable, x, y)
}

// EL TIMER TE ESTÁ LLAMANDO FORTÍSMO


// BOTONES MENÚ: EXIT Y RESTART/reposicionar (pausa si me vengo arriba y pongo timer)

function out(){
   let fuera = confirm("¿Ya te vas?")
if(fuera){
    alert("Con Dios")
    window.close()
}else{
    alert("¡VAMOS EQUIPO!")
}
}

exit.addEventListener("click",out)


function restartGame(){
   life = 3
   vidas.innerText = life

   points = 0
   puntos.innerText = points

   getLocation(personaje, 100, 500)
   getLocation(enemigo, 525, 200)
   
   getLocation(espada, 330, 110)
   getLocation(espada2, 225, 350)
   getLocation(espada3, 800, 180)

   getLocation(cor, 80, 120)
   getLocation(cor2, 815, 30)

   getLocation(dineros, 700, 400)
   getLocation(dineros2, 60, 290)
   getLocation(dineros3, 0, 110)
   getLocation(dineros4, 550, 80)
   getLocation(dineros5, 425, 500)
}

restart.addEventListener("click", restartGame)



// MAPA Y  MOVIMIENTO  -    NECESITO: un equivalente a getLocation 
// --> función general

function getLocation(variable, x, y){
    variable.style.left = x + "px"
    variable.style.top = y + "px"
}

// --> ELEMENTOS ESTÁTICOS ¿respawn o cada uno por lo suyo?
// ESPADA
getLocation(espada, 330, 110)
getLocation(espada2, 225, 350)
getLocation(espada3, 800, 180)

// COR
getLocation(cor, 80, 120)
getLocation(cor2, 815, 30)
   
// MONEDAS
getLocation(dineros, 700, 400)
getLocation(dineros2, 60, 290)
getLocation(dineros3, 0, 110)
getLocation(dineros4, 550, 80)
getLocation(dineros5, 425, 500)


// --> WASD 
// PERSONAJE - NECESITO: posición del personaje, hacia dónde va, ¿velocidad?
// ¿es la velocidad la cantidad de pixels recorridos?

let x= 100
let y= 500
let speed = 20 

getLocation(personaje, x, y)

function wasd(event){
    if(event.key === "w"){
        y -= speed
    } else if(event.key === "s"){
        y += speed
    } else if (event.key === "a"){
        x -= speed
    } else if(event.key === "d"){
        x += speed
    }

    if (x <= 0 || x >= gameMap.clientWidth - personaje.width){
        x = Math.max(0, Math.min(gameMap.clientWidth - personaje.width,x))
    
    } else if (y <= 0 || y >= gameMap.clientHeight - personaje.height){
        y= Math.max(0, Math.min(gameMap.clientHeight - personaje.height,y))
    }

    if (!persiguiendo) { 
        persiguiendo = true;
        persecucion = setInterval(chase, 100);
    }


if(trigger(personaje,dineros)){
    puntosPlus()
    respawn(gameMap,dineros)
}

if(trigger(personaje,dineros2)){
    puntosPlus()
    respawn(gameMap,dineros2)
}

if(trigger(personaje,dineros3)){
    puntosPlus()
    respawn(gameMap,dineros3)
}

if(trigger(personaje,dineros4)){
    puntosPlus()
    respawn(gameMap,dineros4)
}

if(trigger(personaje,dineros5)){
    puntosPlus()
    respawn(gameMap,dineros5)
}

if(trigger(personaje,cor)){
    vidaPlus()
    cor.remove()
}

if(trigger(personaje,cor2)){
    vidaPlus()
    cor2.remove()
}

if(trigger(personaje,espada)){
    hurt()
    respawn(gameMap, espada)
}

if(trigger(personaje,espada2)){
    hurt()
    respawn(gameMap,espada2)
}

if(trigger(personaje,espada3)){
    hurt()
    respawn(gameMap,espada3)
}


if(trigger(personaje,enemigo)){
    kill()
}


getLocation(personaje, x, y)
}


document.addEventListener("keydown", wasd)


// ENEMIGO - NECESITO: que se mueva libremente por el canvas ¿?¿?
// ¿mejor crear un patrón...? --> puedo usar la función que cree del getLocation 
// y crear un patrón que no dependa de WASD y se ejecute por sí mismo en un loop --> setInterval + math.random ¿?

let xEne= 525
let yEne= 200

let speedX= Math.random() * 10 - 5
let speedY= Math.random() * 10 - 5

getLocation(enemigo, xEne, yEne)

let persiguiendo = false
let persecucion 

function chase(){

if(!persiguiendo){
}
    
xEne += speedX
yEne += speedY

if (xEne <= 0 || xEne >= gameMap.clientWidth - enemigo.width){
    speedX =(Math.random() * 10 - 5)
    xEne = Math.max(0, Math.min(gameMap.clientWidth - enemigo.width, xEne))

} else if (yEne <= 0 || yEne >= gameMap.clientHeight - enemigo.height){
    speedY =(Math.random() * 10 - 5)
    yEne = Math.max(0, Math.min(gameMap.clientHeight - enemigo.height, yEne))
}


for (let i = 0; i < maze.length; i++) {
    
    if (trigger(enemigo, maze[i].element)) {
    
    const enemigoSize = enemigo.getBoundingClientRect();
    const muros = maze[i].element.getBoundingClientRect();

    if (Math.abs(enemigoSize.right - (muros.left+1)) <= Math.abs(enemigoSize.top -(muros.bottom+1)) ||
        Math.abs(enemigoSize.left - (muros.right+1)) <= Math.abs(enemigoSize.bottom - (muros.top+1))){
                
        speedX = -speedX
        xEne += speedX * 2
    } else { speedY = -speedY
                yEne += speedY * 2
    }
    
        
// for(let i = 0; i < maze.length; i++){
//  if(trigger(enemigo, maze[i].element)){
    
//     speedX = -speedX
//     speedY = -speedY
//     xEne += speedX  *2
//     yEne += speedY *2
//     break
// }
// }
}
}
getLocation(enemigo, xEne, yEne)
}





// ¿?¿?¿ POSIBLE FUNCIÓN DE PAUSA ¿?¿?¿?

function stop(event){
if(event.key === "p"){
  clearInterval(persecucion)
//   persecucion = null
}

}
document.addEventListener("keydown", stop)

// function dale(event){
//     if (event.key === "r") { 
//      if(!persecucion){
//     persecucion = setInterval(chase, 100)}
// }
// }
// document.addEventListener("keydowm",dale)



// MAPA MAZE    necesito que esto sea referencia de choque 
// OJO QUE UNA FUNCIÓN  GENÉRICA TIPO TRIGGER LO MISMO ES PRÁCTICA 
// --> DENTRO DEL MAPA QUE SE TE VA EL BICHO

function trigger(variable1, variable2){
    const v1 = variable1.getBoundingClientRect()
    const v2 = variable2.getBoundingClientRect()
    const mapita = gameMap.getBoundingClientRect()

    if(v1.left < mapita.left || v1.right > mapita.right || v1.top <  mapita.top || v1.bottom > mapita.bottom ||
        v2.left < mapita.left || v2.right > mapita.right || v2.top <  mapita.top || v2.bottom > mapita.bottom
    ){
        return false
    }

    return !(v1.top > v2.bottom || v1.bottom < v2.top || v1.left > v2.right || v1.right < v2.left)
}


function medidas(variable, x,y){
    getLocation(variable, x,y)
  
    const fit = variable.getBoundingClientRect()
   
    return{
        element : variable,
        x: x,
        y: y,
        width: fit.width,
        height: fit.height
    }
}



const maze= [
medidas(pared1, 0, 335),
medidas(pared2, 330, 335),
medidas(pared3, 485, 435),
medidas(pared4, 685, 435),

medidas(pared5, 650, 100),

medidas(pared6, 0, 0),
medidas(pared7, 0, 150),
medidas(pared8, 250, 0),
medidas(pared9, 250, 150),
]




