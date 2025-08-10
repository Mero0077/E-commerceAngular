export interface Product
{
    id: number;
    title: string;
    price: string;
    category: string;
    description?: string;
    imageUrl?: string;
    amount?: number;
}