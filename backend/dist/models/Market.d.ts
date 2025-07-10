export interface Market {
    id: string;
    title: string;
    description: string;
    end_date: Date;
    total_liquidity: number;
    total_volume: number;
    status: 'active' | 'settled' | 'cancelled';
    outcome_a: string;
    outcome_b: string;
    created_at: Date;
    updated_at: Date;
}
export interface CreateMarketData {
    title: string;
    description: string;
    end_date: Date;
    outcome_a: string;
    outcome_b: string;
}
export declare class MarketModel {
    static create(data: CreateMarketData): Promise<Market>;
    static findAll(): Promise<Market[]>;
    static findById(id: string): Promise<Market | null>;
    static updateStatus(id: string, status: Market['status']): Promise<Market | null>;
    static updateLiquidity(id: string, liquidity: number): Promise<Market | null>;
    static updateVolume(id: string, volume: number): Promise<Market | null>;
}
//# sourceMappingURL=Market.d.ts.map