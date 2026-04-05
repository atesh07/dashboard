

````markdown

A modern, responsive, and highly interactive Finance Dashboard built for the Frontend Developer Intern assignment at Zorvyn FinTech. 

This project focuses on delivering a premium User Experience (UX) with dynamic data visualization, robust state management, and seamless animations, designed to help users intuitively track and understand their financial activity.

visit the dashboard----
🚀 [View Live Project](https://dashboard-2tr07hmne-atesh07s-projects.vercel.app/)
---

## 🚀 Quick Start / Setup Instructions

This project is built with **Next.js (App Router)**, **React**, and **Tailwind CSS**.

### Prerequisites
Make sure you have Node.js (v18 or higher) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd my-zorvyn-app
````

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **View the app:**
    Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser.

-----

## 🎯 Overview of Approach

My primary goal for this assignment was to go beyond a static layout and build a dashboard that feels "alive." I focused heavily on **modularity**, **state management**, and **micro-interactions**.

Instead of relying on a complex backend, I leveraged React's **Context API** to create a unified global state. This means that if a user interacts with data on one page (e.g., adding a transaction), the changes instantly reflect across the entire application—from the Wallet balance to the Statistics charts.

Visually, I utilized **Tailwind CSS** to build a custom, flicker-free **Dark Mode** system that respects the user's system preferences and persists via `localStorage`.

-----

## ✨ Key Features & Requirements Met

### 1\. Dashboard Overview

  * **Summary Cards:** Dynamic cards displaying Total Balance, Income, Expenses, and Savings Rates.
  * **Time-Based Visualization:** Integrated `recharts` to build a smooth, gradient-filled Area Chart tracking cashflow trends over time.
  * **Categorical Visualization:** Interactive Donut Charts breaking down spending by category.

### 2\. Transactions Section

  * **Dedicated Transactions Page:** A comprehensive table view of all user activity.
  * **Advanced Filtering:** Users can filter by **Date Range** (custom calendar picker), **Status** (Pending, Successful, Failed), and **Quick Timeframes** (1M, 6M, 1Y).
  * **Smart Search:** Real-time text filtering across transaction names and descriptions.
  * **Pagination:** Built-in logic to handle large datasets gracefully.

### 3\. Basic Role-Based UI (RBAC Simulation)

  * The UI dynamically adapts based on the user's simulated role (Viewer vs. Admin).
  * *Implementation Note:* In the `Header.tsx`, the user profile indicates an "Admin" role. In a production environment, this state would toggle the visibility of action buttons (like "Send Invoices" or "Transfer").

### 4\. Financial Insights

  * **Recent Extremes:** A dedicated widget automatically sorting and displaying the highest value transactions.
  * **Monthly Analysis:** A comparative Bar Chart showing Income vs. Expenses for recent months.
  * **Savings Goals:** Visual progress bars tracking user objectives (e.g., Emergency Fund, New Car) with calculated completion percentages.

### 5\. Robust State Management

  * **Global `DataContext`:** All mock data (Transactions, Cashflow, Goals) is lifted to a top-level Context Provider. This ensures that filtering, adding, or modifying data instantly updates all dependent components without prop-drilling.

-----

## 🌟 Optional Enhancements Included

To strengthen this submission, I implemented several advanced features:

  * 🌙 **Flawless Dark Mode:** A deeply integrated dark theme using a custom `ThemeContext`. It includes an anti-flicker script in the document `<head>` to prevent the dreaded "white flash" on page reloads.
  * 💾 **Data Persistence:** User theme preferences are saved to `localStorage`.
  * 🎬 **Animations & Transitions:** Extensive use of Tailwind's `animate-in`, `fade-in`, and `slide-in` utilities. Elements cascade into view on mount, charts animate on load, and buttons feature tactile hover/active states.
  * 📱 **Mobile Responsiveness:** A fully responsive layout featuring a hidden sidebar that converts into a sliding drawer with a backdrop overlay on smaller screens.
  * 🧩 **Interactive Forms:** Functional "Settings," "Feedback," and "Support" pages with simulated loading states, interactive SVG star ratings, and success morphing animations.

-----

## 🛠️ Tech Stack

  * **Framework:** Next.js 15 (App Router)
  * **Library:** React 19
  * **Styling:** Tailwind CSS
  * **Icons:** Lucide React
  * **Data Visualization:** Recharts
  * **State Management:** React Context API + Hooks (`useState`, `useMemo`, `useEffect`)

-----

## 📂 Folder Structure

The project follows a clean, scalable architecture:

```text
src/
├── app/               # Next.js Routes (Pages & Layouts)
│   ├── layout.tsx     # Root layout (Theme & Data Providers)
│   ├── page.tsx       # Main Dashboard
│   └── statistics/    # Statistics Page
├── components/        # Reusable UI Components
│   ├── Sidebar.tsx
│   └── Header.tsx
├── context/           # Global State Management
│   ├── DataContext.tsx
│   └── ThemeContext.tsx
└── data/              # Simulated Database
    └── mockData.ts
```

-----

## 👨‍💻 Author

**Ehtesham Anwar**

  * Role: Frontend Developer Intern Candidate
  * Email: ehtesham.2002.aw@gmail.com
  * Assignment: Zorvyn FinTech Dashboard UI



```
```
