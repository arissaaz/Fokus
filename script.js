const html = document.querySelector('html');
const focusBt = document.querySelector('.app__card-button--foco')
const shortBt = document.querySelector('.app__card-button--curto')
const longBt = document.querySelector('.app__card-button--longo')
const startBt = document.querySelector('.app__card-primary-button')
const buttons = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const startOrPauseBt = document.querySelector('#start-pause span')
const icon = document.querySelector('.app__card-primary-butto-icon')
const screenTimer = document.querySelector('#timer')

const music = new Audio('sons/luna-rise-part-one.mp3')
const playM = new Audio('sons/play.wav')
const pauseM = new Audio('sons/pause.mp3')
const endM = new Audio('sons/beep.mp3')
const btMusic = document.querySelector('#alternar-musica')

const timer = document.querySelector('#timer')
const banner = document.querySelector('.app__image')
const title = document.querySelector('.app__title')

let timePassedInSeconds = 1500
let intervaloId = null

const focusT = 1500
const shortT = 300
const longT = 900

music.loop = true
btMusic.addEventListener('change', () => {
    if (music.paused) {
        music.play()
    } else {
        music.pause()
    }
})

focusBt.addEventListener('click', () => {
    timePassedInSeconds = 1500
    alterarContexto('foco')
    focusBt.classList.add('active')
})

shortBt.addEventListener('click', () => {
    timePassedInSeconds = 300
    alterarContexto('descanso-curto')
    shortBt.classList.add('active')
})

longBt.addEventListener('click', () => {
    timePassedInSeconds = 900
    alterarContexto('descanso-longo')
    longBt.classList.add('active')
})

function alterarContexto(contexto) {
    showTime()
    buttons.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    
    switch (contexto) {
        case "foco":
            title.innerHTML = 
            `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case "descanso-curto":
            title.innerHTML =
            `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`    
            break;

        case "descanso-longo":
            title.innerHTML =
            `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`    
            break;
        default:
            break;
    }
}

const countdown = () => { //se o tempo for 0, finaliza
    if (timePassedInSeconds <= 0) {
        endM.play()
        alert('Tempo finalizado! :)')
        zerar()
        return
    }
    timePassedInSeconds -= 1 //senão vai diminuindo 1 e mostrando no console
    showTime()
}

startPauseBt.addEventListener('click', startOrPause)

function startOrPause() {
    if (intervaloId) { 
        pauseM.play()
        zerar()
        return
    }
        playM.play()
        intervaloId = setInterval(countdown, 1000)
        startOrPauseBt.textContent = "Pausar"
        icon.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId)
    startOrPauseBt.textContent = "Começar"
    icon.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null
}

function showTime() {
    const tempo = new Date(timePassedInSeconds * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    screenTimer.innerHTML= `${tempoFormatado}`
}

showTime()