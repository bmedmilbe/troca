# 💸 Troca - Remittance Interface

This is the dedicated frontend application for the **International Remittance Module**, part of the **Centralized Multi-Tenant Government Kernel**. It provides a professional, high-integrity interface for managers and local agents to execute and monitor financial settlements across different jurisdictions.

## 🚀 Engineering Highlights (Frontend)

* **Multi-Tenant Integration:** Architected as a tenant-specific client that communicates with a centralized Django API. It utilizes custom headers to ensure that financial data is strictly isolated per tenant.
* **Responsive Financial UI:** Developed using **Bootstrap 5**, ensuring a clean, corporate-ready dashboard that is fully responsive for agents working in the field or in office environments.
* **Concurrency Awareness:** Designed to interface with the backend's **Pessimistic Locking (`select_for_update`)** strategy, providing robust state handling to prevent duplicate transaction submissions.
* **Type-Safe Integrity:** Leveraged **TypeScript** to define strict interfaces for complex financial objects, such as remittance ledgers and agent balance sheets, ensuring zero-error data rendering.

## 🛠️ Tech Stack

* **Framework:** React.js / Next.js
* **Styling:** Bootstrap 5 (Clean, fast, and professional UI)
* **Language:** TypeScript
* **State Management:** Hooks-based integration with the Multi-tenant Kernel API

## ⚙️ Architectural Role

The **Troca** frontend serves as the visualization and execution layer for the Kernel's financial logic:
1. **Tenant Isolation:** The UI dynamically adapts based on the tenant context provided by the Backend Middleware.
2. **Transaction Security:** Communicates with **ACID-compliant** endpoints to ensure that balance changes are atomic and resilient.
3. **Data Flow:** Fetches real-time statistics and growth metrics, similar to the architecture used in the CECAB platform.

---
*Developed by Edmilbe Ramos - Specialist in Secure Web Architectures 📍 Norfolk, UK*
