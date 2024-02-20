const mysql = require('mysql2')
const {faker} = require('@faker-js/faker')

try {
    const cnx = mysql.createConnection({
        user: 'root',
        password: 'acard',
        port: 3306,
        database: 'blog',
        host: 'localhost'
    })
    console.log('Vous êtes connecté à la DB') 
    cnx.query(`insert into categories (theme) value (1)`)
    cnx.query(`insert into categories (theme) value (2)`)
    cnx.query(`insert into categories (theme) value (3)`)
    for (let i = 1; i <= 3; i++) {
        //insert into users (email, password, role) value ('salut', 'resalut', 2);
        cnx.query(`insert into users (email, password) values (?, ?)`, [faker.internet.email(), faker.internet.password()], (err, result) => {
            if(err){
                console.log(err)
            }
        })
        for (let j = 1; j < 3; j++) {
            cnx.query(`insert into articles (title, content, user_id) value (?, ?, ?)`, [faker.lorem.word(2), faker.lorem.paragraph(3), i ], (err, result) => {
                if(err){
                    console.log(err)
                }
            }) 
            cnx.query(`insert into article_has_category (article_id, category_id) value (?, ?)`, [j, 1], (err, result) => {
                if(err){
                    console.log(err)
                }
            })

            for (let k = 1; k < 3; k++) {
                cnx.query(`insert into comments (title, content, article_id, user_id) value (?, ?, ?, ?)`, [faker.lorem.word(2), faker.lorem.paragraph(3), j, i], (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                }) 
            }
        }
    }
} catch (err) {
    console.log(err)
}

