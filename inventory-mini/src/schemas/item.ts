export type Category = "food" | "drink" | "other";
export type Item = {
    id: string;
    name: string;
    category: Category;
    price: number;
    stock: number;
    memo?: string;
}
export type ItemSummary = Pick< Item, "name" | "price" | "stock" >;
export type NewItem = Omit< Item, "id" >;

