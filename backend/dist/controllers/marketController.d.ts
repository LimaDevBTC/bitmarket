import { Request, Response } from 'express';
export declare const getMarkets: (req: Request, res: Response) => Promise<void>;
export declare const getMarketById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createMarket: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateMarketStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=marketController.d.ts.map