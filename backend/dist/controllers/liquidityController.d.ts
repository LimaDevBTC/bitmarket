import { Request, Response } from 'express';
export declare const getLiquidity: (req: Request, res: Response) => Promise<void>;
export declare const getLiquidityByMarket: (req: Request, res: Response) => Promise<void>;
export declare const getLiquidityByUser: (req: Request, res: Response) => Promise<void>;
export declare const addLiquidity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateLiquidityStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const confirmLiquidity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMarketStats: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=liquidityController.d.ts.map