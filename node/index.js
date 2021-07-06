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


app.get('/',(req,res) => {

    insertPeople()
    getNames(res)

})


function insertPeople () {

    createTable()

    let name = faker.name.findName()
    connection.query(`INSERT INTO people(name) values('${name}')`)

    return
}


const getNames = (res) => {
    connection.query(`SELECT name FROM people`, (error,results,fields) =>{
        if (error) {
            throw error
        }

        res.send(`<h1>Full Cycle Rocks!</h1>
                        <ol>${results.map(el => `<li>${el.name}</li>`).join('')}</ol>`)
    })
}

const createTable = () => {

    connection.query(`CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL)`)
}


app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})