export interface LedgerEntry {
  id: string;
  accountId: string;
  amount: number;
  reason: string;
  createdAt: string;
}

export class InternalLedger {
  private entries: LedgerEntry[] = [];

  register(accountId: string, amount: number, reason: string): LedgerEntry {
    const entry: LedgerEntry = {
      id: `ledger_${this.entries.length + 1}`,
      accountId,
      amount,
      reason,
      createdAt: new Date().toISOString(),
    };
    this.entries.push(entry);
    return entry;
  }

  listByAccount(accountId: string): LedgerEntry[] {
    return this.entries.filter((e) => e.accountId === accountId);
  }
}
