declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare interface ITransaction {
  date?: string;
  description?: string;
  amount?: number;
  account?: string;
  institution?: string;
}
