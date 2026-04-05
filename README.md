```md
# FinanceHub

A responsive personal finance dashboard developed as an internship assignment to demonstrate frontend development skills, UI thinking, and clean project delivery.

## Live Demo

https://my-finance-hub-five.vercel.app/

## Assignment Summary

FinanceHub is a modern frontend dashboard for tracking personal finances. The goal of my project was to build a clean, user-friendly interface that presents financial data clearly while supporting common dashboard interactions such as filtering, role-based actions, navigation, responsiveness, and theme switching.

This project was built to showcase:

- React component-based architecture
- clean and responsive UI implementation
- state management with React hooks
- reusable components
- user-focused dashboard design
- deployment workflow using GitHub and Vercel

## Key Features

- Dashboard summary cards for total balance, income, and expenses
- Interactive financial charts
- MockAPI Integration
- Transactions table with search, filtering, and sorting
- Admin mode for adding and deleting transactions
- Insights section for quick financial summaries
- Multi-page navigation: Dashboard, About, Services, Contact
- Dark mode / light mode toggle
- Mobile-friendly navigation with hamburger menu
- Deployed production version

## Tech Stack

- React
- Vite
- JavaScript (JSX)
- CSS
- HTML

## What makes my project objective-oriented and stand-out

- Focuses on both functionality and presentation
- Includes responsive design for desktop and mobile screens
- Separates UI into reusable components
- Demonstrates practical frontend skills instead of only static pages
- Shows end-to-end workflow: development, GitHub version control, and deployment

## Project Structure

The actual application is inside the `my-finance-app` folder.

```text
financial-dashboard/
  my-finance-app/
    src/
    public/
    package.json
```

## Local Setup

```bash
cd my-finance-app
npm install
npm run dev
```

## Production Build

```bash
cd my-finance-app
npm run build
```

## Deployment

This project is deployed from the `my-finance-app` subfolder.

Vercel settings:

- Root Directory: `my-finance-app`
- Build Command: `npm run build`
- Output Directory: `dist`

## Main Functional Areas

### 1. Dashboard

Displays key financial metrics and charts to help users quickly understand their current financial overview.

### 2. Transactions Management

Users can browse transactions, search records, apply filters, and sort entries. In Admin mode, transactions can also be added or removed.

### 3. Informational Pages

The About, Services, and Contact sections extend the project beyond a single dashboard screen and show multi-page UI handling inside a React app.

### 4. UI/UX Enhancements

The project includes dark mode support, mobile navigation, clean card layouts, and structured visual hierarchy for improved usability.

## What I Learned

Through this assignment, I practiced:

- structuring a React project into multiple components
- debugging import/export and rendering issues
- handling local mock data flows
- improving UI responsiveness and navigation behavior
- preparing a project for deployment
<img width="1912" height="863" alt="image" src="https://github.com/user-attachments/assets/7917fcae-1fcd-4a99-8d81-06e675397dd7" />
  

## Current Limitations

- Uses mock data instead of a real backend
- Transactions are not persisted in a database
- Authentication is not implemented yet

## Future Improvements

- connect the dashboard to a backend API
- store transactions in a database
- add edit transaction functionality
- improve chart interactions further
- add authentication and protected admin access
- enhance notifications and form validation


## Internship Note

This project was created as part of an internship assignment to demonstrate practical frontend engineering ability, problem-solving, and product-focused UI implementation.
```

