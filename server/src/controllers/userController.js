import UserService from "../services/user.service.js";
import * as jwt from 'jsonwebtoken';

export class UserController {
    constructor (service) {
        this.service = new UserService();
    }

    async selectAll(req, res) {
        const result = await this.service.selectAll();
        return result;
    }

    async selectById(req, res) {
        const result = await this.service.selectById(req.params.id);
        return result;
    }

    async selectByEventId(req, res) {
        const result = await this.service.selectByEventId(req.params.id);
        return result;
    }
    
    async create(req, res) {
        await this.service.create(req.body);
    }

    async update_avatar(req, res) { 
        const pathFile = req.file.filename;
        const token = req.params.token;  
        const userData = jwt.verify(token, "jwt-key");
        await this.service.update_avatar(pathFile, userData.userId);
    }

    async update(req, res){
        await this.service.update(req.body, req.params.id);
    }

    async deleteById(req, res) {
        await this.service.deleteById(req.params.id);
    }
}

const userController = new UserController(new UserService());
export default userController;
