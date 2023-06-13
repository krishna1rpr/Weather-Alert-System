import { Request, Response, NextFunction } from "express";

function Logger(req: Request, res: Response, next: NextFunction) {
    const date = new Date();
    console.log(
        `${date.toLocaleString()} [server] : ${req.method} - ${req.path} - ${
            req.ip
        }`
    );
    next();
}

export default Logger;
