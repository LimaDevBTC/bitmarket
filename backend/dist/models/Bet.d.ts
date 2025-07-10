export interface Bet {
    id: string;
    market_id: string;
    user_address: string;
    outcome: 'A' | 'B';
    amount: number;
    odds: number;
    status: 'pending' | 'confirmed' | 'settled' | 'cancelled';
    transaction_hash?: string;
    created_at: Date;
    updated_at: Date;
}
export interface CreateBetData {
    market_id: string;
    user_address: string;
    outcome: 'A' | 'B';
    amount: number;
    odds: number;
    transaction_hash?: string;
}
export declare class BetModel {
    static create(data: CreateBetData): Promise<Bet>;
    static findAll(): Promise<Bet[]>;
    static findByMarketId(marketId: string): Promise<Bet[]>;
    static findByUserAddress(userAddress: string): Promise<Bet[]>;
    static findById(id: string): Promise<Bet | null>;
    static updateStatus(id: string, status: Bet['status']): Promise<Bet | null>;
    static updateTransactionHash(id: string, transactionHash: string): Promise<Bet | null>;
    static getTotalVolumeByMarket(marketId: string): Promise<number>;
}
//# sourceMappingURL=Bet.d.ts.map