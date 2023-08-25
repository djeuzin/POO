"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
class Account {
    constructor(newId, newOwner) {
        this.balance = 0.0;
        this.id = newId;
        this.owner = newOwner;
    }
    credit(creditValue) {
        this.balance += creditValue;
    }
    debit(debitValue) {
        this.balance -= debitValue;
    }
}
exports.Account = Account;
