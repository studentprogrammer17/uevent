import jwt from 'jsonwebtoken';
import response from './response.middleware.js';

export const isAccessUserService = (Service) => async (req, res, next) => {
    const service = new Service();
    const result = await service.selectById(req.params.id);
    const userData = jwt.verify(req.params.token, 'jwt-key');
    if (result.id !== userData.userId) {
        return response(403, { message: 'access denied' }, res);
    }
    next();
};

export const isAccess = (Service) => async (req, res, next) => {
    const service = new Service();
    const result = await service.selectById(req.params.id);
    const userData = jwt.verify(req.params.token, 'jwt-key');
    if (result.user_id !== userData.userId) {
        return response(403, { message: 'access denied' }, res);
    }
    next();
};

export const isAdmin = (req, res, next) => {
    const userData = jwt.verify(req.params.token, 'jwt-key');
    if (userData.role !== 'admin') {
        return response(403, { message: 'access denied' }, res);
    }
    next();
}

export const isAccessOrAdmin = (Service) => async (req, res, next) => {
    const service = new Service();
    const result = await service.selectById(req.params.id);
    const userData = jwt.verify(req.params.token, 'jwt-key');
    if (result.user_id !== userData.userId && userData.role !== 'admin') {
        return response(403, { message: 'access denied' }, res);
    }
    next();
}

export const isAccessOrAdminUserService = (Service) => async (req, res, next) => {
    const service = new Service();
    const result = await service.selectById(req.params.id);
    const userData = jwt.verify(req.params.token, 'jwt-key');
    if (result.id !== userData.userId && userData.role !== 'admin') {
        return response(403, { message: 'access denied' }, res);
    }
    next();
};

export const isAccessCompanyOrAdmin = (Service) => async (req, res, next) => {
    const service = new Service();
    let result;
    let userlist;
    if (!req.body.company_id) {
        result = await service.selectById(req.params.company_id);
        userlist = await service.selectUsersByCompanyId(req.params.company_id);
    }
    else {
        result = await service.selectById(req.body.company_id);
        userlist = await service.selectUsersByCompanyId(req.body.company_id);
    }    

    const userData = jwt.verify(req.params.token, 'jwt-key');

    let check = false;
    // userlist.forEach(async (element) => {
        
    //     if (element.user_id !== userData.userId) {
    //         check = true;
    //     }
    // });

    if (result.user_id !== userData.userId && userData.role !== 'admin') {
        return response(403, { message: 'access denied' }, res);
    }
    next();
}