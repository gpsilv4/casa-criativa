//express pra criar e configurar o servidor
const express = require('express')
const server = express()

const db = require("./db")

/*
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
*/

//config arquivos estáticos (css, scripts, imagens...)
server.use(express.static('public'))

//habilitar o uso do req.body
server.use(express.urlencoded( {extended: true} ))

//config nunjucks
const nunjucks = require('nunjucks')

nunjucks.configure("views", {
    express:server,
    noCache: true
})

//criar rota e capturar o pedido do cliente para responder
server.get("/", function (req, res) {   
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro na BD!")
        }

        const reverseIdeas = [...rows].reverse()

        const lastIdeas = []
        for (let idea of reverseIdeas) {
            if (lastIdeas.length < 3) {
                lastIdeas.push(idea);
            }   
        }
    
        return res.render("index.html", { ideas: lastIdeas })
    })
})

server.get("/ideias", function (req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro na BD!")
        }

        const reverseIdeas = [...rows].reverse()
        return res.render("ideias.html", {ideas: reverseIdeas})
    })
})

server.post("/", function (req, res) {
    //inserir dados
    const query =`
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro na BD!")
        }

        return res.redirect("/ideias")
    })
})

//ligar o servidor na porta 3000
server.listen(3000)
