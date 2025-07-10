import { Request, Response } from 'express';
export declare const getBets: (req: Request, res: Response) => Promise<void>;
export declare const getBetsByMarket: (req: Request, res: Response) => Promise<void>;
export declare const getBetsByUser: (req: Request, res: Response) => Promise<void>;
export declare const createBet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateBetStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const confirmBet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=betController.d.ts.map