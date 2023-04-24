import db from '../config/db.connection.js';

export default class LocationService {
    async selectAll() {
        let sql = "SELECT * FROM `location`";
        const [row] = await db.execute(sql);
        return row;
    }

    async selectById(id) {
        let sql = `SELECT * FROM location WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async create(body) {
        var sql = `INSERT INTO location (title, description, country, city, street, house, location_pic) VALUES ('${body.title}', '${body.description}', '${body.country}', '${body.city}', '${body.street}', '${body.house}', '${body.location_pic}')`;
        const [row] = await db.execute(sql);
        return row;
    }

    async update(body, id) {
        if(Object.entries(body).length !== 0){
            await Object.entries(body).filter(([key, value]) => value).map(([key, value]) => db.execute(`UPDATE location SET ${key} = '${value}' WHERE id = ${id}`))
        }
	}

    async update_pic(path, location_id) {
        var sql = `UPDATE location SET location_pic = '${path}' WHERE id = ${location_id}`;
        const [row] = await db.execute(sql);
        return row;
	}

    async deleteById(id) {
        var sql = `DELETE FROM location WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
	}
    
    async isExist(field, value) {
        var sql = `SELECT * FROM location WHERE ${field} = '${value}'`;
        const [row] = await db.execute(sql);
        return row.length !== 0;
    }
}