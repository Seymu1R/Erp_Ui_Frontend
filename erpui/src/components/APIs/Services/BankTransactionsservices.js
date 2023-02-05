import { HttpClient } from "../HttpClient/Index";

class BankTransactionServices extends HttpClient {
  constructor() {
    super("https://localhost:7192/api/BankTransactions");
  }

  getBankTransaction(id) {
    return this.get(`GetBankTransaction?transactionId=${id}`);
  }

  getAllBankTransactions(headers) {
    return this.getall("GetAllBankTransactions", headers);
  }

  deleteBankTransaction(id, headers) {
    return this.delete(`DeleteBankTransaction?banktransactionId=${id}`, headers);
  }

  createBankTransaction(body, headers) {
    return this.post("CreateBankTransaction", body, headers);
  }

  updateBankTransaction(body, headers) {
    return this.put("UpdateBankTransaction", body, headers);
  }
}

export const banktransactionservices = new BankTransactionServices();
