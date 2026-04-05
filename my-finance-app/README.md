# FinanceHub App

FinanceHub is a responsive personal finance dashboard built with React and Vite.

## Features

- Dashboard with total balance, income, and expenses
- Line chart and category chart
- Transactions table with search, filters, and sorting
- Admin mode to add and delete transactions
- Insights cards
- About, Services, and Contact pages
- Light and dark mode
- Mobile hamburger navigation

## Tech Stack

- React
- Vite
- JSX
- CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

For Vercel:

- Root Directory: `my-finance-app`
- Build Command: `npm run build`
- Output Directory: `dist`

## Current Limitations

- Uses mock frontend data
- No backend/database yet
- No authentication yet

## Folder Notes

- `src/App.jsx` contains the main app shell and navigation
- `src/cards.jsx` contains dashboard cards and chart components
- `src/table.jsx` contains the transaction table and insights
- `src/elements.jsx` contains static page sections
- `src/mockApi.jsx` contains mocked transaction data and helper functions
