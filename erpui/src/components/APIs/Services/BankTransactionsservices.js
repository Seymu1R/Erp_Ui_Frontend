import { HttpClient } from "../HttpClient/Index";

class BankTransactionServices extends HttpClient {
  constructor() {
    super("https://localhost:7192/api/BankTransactions");
  }

  getBankTransaction(id) {
    return this.get(`GetBankTransaction?transactionId=${id}`);
  }

  getAllBankTransactions() {
    return this.getall("GetAllBankTransactions");
  }

  deleteBankTransaction(id) {
    return this.delete(`DeleteBankTransaction?banktransactionId=${id}`);
  }

  createBankTransaction(body) {
    return this.post("CreateBankTransaction", body);
  }

  updateBankTransaction(body) {
    return this.put("UpdateBankTransaction", body);
  }
}

export const banktransactionservices = new BankTransactionServices();
