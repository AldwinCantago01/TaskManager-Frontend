# Task Manager Frontend

This repository works as the front-end of the task manager app

## Tech Stack

- [Vue 3](https://vuejs.org/) + TypeScript
- [Pinia](https://pinia.vuejs.org/) for state
- SCSS styling (BEM Methodology)
- JWT authentication

## Features

- User login/register
- Auth bootstrap on app startup
- Protected routes (`/tasks`, `/tasks/add`, `/tasks/edit/:id`)

## Prerequisites

- Node.js `^20.19.0 || >=22.12.0` (from [package.json](package.json))
- npm

## Environment

Create a `.env` file in project root:

```env
VITE_API_URL=http://localhost:3000
```

Notes:

- During local dev, `/api` is proxied via [vite.config.ts](vite.config.ts).
- In Docker/Nginx, `/api` is forwarded using [nginx.conf](nginx.conf).

## Install & Run (dev)

```bash
npm install
npm run dev
```

App runs with Vite dev server (default: `http://localhost:5173`).
