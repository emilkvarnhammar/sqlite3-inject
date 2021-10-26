var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

const runInsertConcat = (db, name, email) => {
    var sql = "INSERT INTO user (name, email) VALUES ('" + name + "','" + email + "')";
    db.run(sql);
}

const runInsertTemplateLiterals = (db, name, email) => {
    var sql = `INSERT INTO user (name, email) VALUES ('${name}','${email}')`;
    db.run(sql);
}


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log("Table already created");
            }else{
                // Table just created, creating some rows
                var user = 'Emil';
                var email = 'emil@colint.io';
                runInsertConcat(db, user, email);
                runInsertTemplateLiterals(db, user, email);
            }
        });  
    }
});


module.exports.db = db
module.exports.runInsertConcat = runInsertConcat
module.exports.runInsertTemplateLiterals = runInsertTemplateLiterals