export interface Liquidity {
    id: string;
    market_id: string;
    user_address: string;
    outcome: 'A' | 'B';
    amount: number;
    status: 'pending' | 'confirmed' | 'withdrawn';
    transaction_hash?: string;
    created_at: Date;
    updated_at: Date;
}
export interface CreateLiquidityData {
    market_id: string;
    user_address: string;
    outcome: 'A' | 'B';
    amount: number;
    transaction_hash?: string;
}
export declare class LiquidityModel {
    static create(data: CreateLiquidityData): Promise<Liquidity>;
    static findAll(): Promise<Liquidity[]>;
    static findByMarketId(marketId: string): Promise<Liquidity[]>;
    static findByUserAddress(userAddress: string): Promise<Liquidity[]>;
    static findById(id: string): Promise<Liquidity | null>;
    static updateStatus(id: string, status: Liquidity['status']): Promise<Liquidity | null>;
    static updateTransactionHash(id: string, transactionHash: string): Promise<Liquidity | null>;
    static getTotalLiquidityByMarket(marketId: string): Promise<number>;
    static getLiquidityByOutcome(marketId: string, outcome: 'A' | 'B'): Promise<number>;
}
//# sourceMappingURL=Liquidity.d.ts.map