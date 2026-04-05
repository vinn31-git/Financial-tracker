# Financial Tracker

A responsive personal finance dashboard built with React and Vite.

## Live Demo

http://my-finance-hub-five.vercel.app/


## Project Overview

This project is a frontend finance dashboard that helps users:

- view income, expenses, and total balance
- explore charts and transaction insights
- switch between Viewer and Admin modes
- add and delete transactions in Admin mode
- navigate between Dashboard, About, Services, and Contact pages
- use light and dark mode

## Repository Structure

The actual app lives inside the [`my-finance-app`](./my-finance-app) folder.

```text
financial-dashboard/
  my-finance-app/
    src/
    public/
    package.json
```

## Tech Stack

- React
- Vite
- JavaScript (JSX)
- CSS

## Run Locally

```bash
cd my-finance-app
npm install
npm run dev
```

## Build for Production

```bash
cd my-finance-app
npm run build
```

## Deployment

This app is deployed from the `my-finance-app` subfolder.

Recommended settings for Vercel:

- Root Directory: `my-finance-app`
- Build Command: `npm run build`
- Output Directory: `dist`

## Features

- Dashboard summary cards
- Interactive charts
- Transaction table with search and filters
- Admin transaction modal
- Insights section
- Static About, Services, and Contact pages
- Mobile navigation menu
- Dark mode toggle

## Notes

- Data is currently mocked on the frontend.
- There is no backend or database yet.
- Some repository files at the root are extra workspace files and can be cleaned later.

## Future Improvements

- connect to a real backend
- persist transactions in a database
- improve icons and polish
- add authentication
- add form validation and notifications
- clean the repo root structure
<img width="1900" height="872" alt="image" src="https://github.com/user-attachments/assets/df31acd5-7fb1-4e1f-838e-525a4a903c74" />

