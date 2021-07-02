const express = require('express')
const faker = require('faker')
const app = express()
const port = 3000

const config = {
     host: 'db',
     user: 'root',
     password: 'root',
     database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

// const sql = `INSERT INTO people(name) values('Everton')`
// connection.query(sql)
// connection.end()


app.get('/',(req,res) => {
    
    
    insertPeople()
    getNames(res)
    
    // res.send(`<h1>Full Cycle Rocks!</h1>  ${resultNames}`)
})


function insertPeople () {

    let name = faker.name.findName()
    connection.query(`INSERT INTO people(name) values('${name}')`)

    return
}


const getNames = (res) => {
    connection.query(`SELECT name FROM people`, (error,results,fields) =>{
        if (error) {
            throw error
        }

        // names +=  `<ol>${results.map(el => `<li>${el.name}</li>`).join('')}</ol>`
        res.send(`<h1>Full Cycle Rocks!</h1>
                        <ol>${results.map(el => `<li>${el.name}</li>`).join('')}</ol>`)
    })
}


app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})