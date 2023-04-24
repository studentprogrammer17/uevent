import db from '../config/db.connection.js';

export default class RoleService {
    async selectAll() {
        let sql = "SELECT * FROM `roles`";
        const [row] = await db.execute(sql);
        return row;
    }

    async selectById(id) {
        let sql = `SELECT * FROM roles WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async create(body) {
        var sql = `INSERT INTO roles (title) VALUES ('${body.title}')`;
        const [row] = await db.execute(sql);
        return row;
    }

    async update(body, id) {
        if(Object.entries(body).length !== 0){
            await Object.entries(body).filter(([key, value]) => value).map(([key, value]) => db.execute(`UPDATE roles SET ${key} = '${value}' WHERE id = ${id}`))
        }
	}

    async deleteById(id) {
        var sql = `DELETE FROM roles WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
	}
    
    async isExist(field, value) {
        var sql = `SELECT * FROM roles WHERE ${field} = '${value}'`;
        const [row] = await db.execute(sql);
        return row.length !== 0;
    }
}