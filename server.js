//express pra criar e configurar o servidor
const express = require('express')
const server = express()


const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Curso de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid, dignissimos.",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Sáude",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid, dignissimos.",
        url: "https://www.exercicioemcasa.com.br/"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid, dignissimos.",
        url: "https://www.saberviver.pt/bem-estar/meditacao-guiada-videos-e-apps-para-praticar/"
    },    
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "karaoke",
        category: "Diversão em família",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid, dignissimos.",
        url: "https://www.karaokeparty.com/"
    },
    {
        img: "https://image.flaticon.com/icons/svg/1157/1157969.svg",
        title: "Pintura",
        category: "Criatividade",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid, dignissimos.",
        url: "https://www.amopintar.com/"
    },
]



//config arquivos estáticos (css, scripts, imagens...)
server.use(express.static('public'))

//config nunjucks
const nunjucks = require('nunjucks')

nunjucks.configure("views", {
    express:server,
    noCache: true
})

//criar rota e capturar o pedido do cliente para responder
server.get("/", function (req, res) {

    const reverseIdeas = [...ideas].reverse()

    const lastIdeas = []
    for (let idea of reverseIdeas) {
        if (lastIdeas.length < 3) {
            lastIdeas.push(idea);
        }   
    }

    return res.render("index.html", { ideas: lastIdeas })
})

server.get("/ideias", function (req, res) {

    const reverseIdeas = [...ideas].reverse()

    return res.render("ideias.html", {ideas: reverseIdeas})
})

//ligar o servidor na porta 3000
server.listen(3000)
