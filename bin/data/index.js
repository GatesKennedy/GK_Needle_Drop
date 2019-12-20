const { Pool } = require('pg');
const { user, host, database, password, port } = require('../../ohnodamn/db_config');

const pool = new Pool({ user, host, database, password, port });

pool.query('SELECT COUNT(*) FROM tbl_library WHERE data_json @> \'{"artist": "Boone Howard"}\';', (err, res) => {
    if (err) return console.log(err);

    console.log(res);
});