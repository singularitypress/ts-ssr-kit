export interface ITransaction {
  description?: string;
  amount?: number;
  date?: string;
};

export interface IRes {
  data?: {
    transactions?: ITransaction[]
  }
}
