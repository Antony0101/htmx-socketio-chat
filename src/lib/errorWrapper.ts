// /**
//  *
//  * @param {*} fn
//  * @returns
//  */
/**  handles errors inside every req */
import { Request, Response, NextFunction } from "express";

export type ControllerFunction = (
    req: Request,
    res: Response,
    next?: NextFunction,
) => Promise<unknown>;

const expressWrapper = (fn: ControllerFunction) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (err:any) {
            // next(err);
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.message,
              data: null,
            });
        }
    };
};

export default expressWrapper;
