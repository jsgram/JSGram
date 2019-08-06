import {Response, Request, NextFunction} from "express";

/**
 *This method shows http method, url, http status code, page load time
 */
const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.info(`${req.method} ${req.originalUrl}`);
    const start = new Date().getTime();
    res.on('finish', () => {
        const elapsed = new Date().getTime() - start;
        console.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}`);
    });
    next();
};

export {requestLoggerMiddleware};
