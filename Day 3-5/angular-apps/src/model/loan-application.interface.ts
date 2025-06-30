export interface LoanApplication {
  no: number;
  name: string;
  amount: number;
  tenor: number;
  krediturName?: string;
  loanAmount?: number;
  loanTerm?: number;
  interestRate?: number;
  applicationDate?: Date;
}
