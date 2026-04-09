# 💸 Troca - High-Integrity Remittance System

A robust financial backend engine designed to handle international remittances with a focus on data integrity and concurrency control. This system serves as a core module within the **Centralized Multi-Tenant Government Kernel**, ensuring secure cash-flow reconciliation between international managers and local agents.

## 🚀 Engineering Highlights & Business Value

* **Concurrency & Race Condition Prevention:** Implemented **PostgreSQL Pessimistic Locking (`select_for_update`)** to ensure that balance settlements are thread-safe, preventing double-spending or incorrect ledger entries during simultaneous transactions.
* **ACID-Compliant Transactions:** Utilized **Django Atomic Transactions** to guarantee that complex multi-step financial operations (debit/credit) either succeed entirely or fail safely without data corruption.
* **Financial Data Consistency:** Designed to provide 100% accuracy for government-level audits, ensuring that all state transitions in the financial database are resilient to system failures.
* **Performance Optimized:** Optimized database throughput for high-frequency transaction tables using strategic **B-Tree indexing** and execution plan analysis via **EXPLAIN ANALYZE**.

## 🛠️ Tech Stack

* **Backend:** Python & Django REST Framework (DRF)
* **Database:** PostgreSQL (Transaction Isolation & Locking)
* **DevOps:** Railway, Docker

## ⚙️ Core Logic Overview

The system architecture follows strict financial engineering principles:
1. **Validation:** Deep verification of agent balances and transaction limits.
2. **Locking:** Row-level locking on the accounts involved using `select_for_update` to prevent concurrent state changes.
3. **Execution:** Atomic execution of the transfer logic within a database transaction block.
4. **Finalization:** Committing the new state to the database only after all integrity checks pass.

---
*Developed by Edmilbe Ramos - Specialist in Secure Web Architectures 📍 Norfolk, UK*
