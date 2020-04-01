const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function() {

    //criar tab
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT, 
            link TEXT
        );
    `)

/*
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
        "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        "Meditação",
        "Mentalidade",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid, dignissimos.",
        "https://www.saberviver.pt/bem-estar/meditacao-guiada-videos-e-apps-para-praticar/"
    ]

    db.run(query, values, function(err) {
        if (err) return console.log(err)

        console.log(this)
    })


    //eliminar dados
    //db.run(`DELETE FROM ideas WHERE id = ?`, [4], function(err) {
    //    if (err) return console.log(err)
    //
    //    console.log("Eliminou os dados", this)
    //})


    //consultar dados
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) return console.log(err)

        console.log(rows)
    })
*/

})

module.exports = db
