# Pattern Pal

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A fiber artist and garment designer's best friend! The goal of this project is to make creating custom pixel-based patterns fun and easy for fiber artists with a love of crochet and/or knitting 🧶.

Use our chart editor to create a custom grid-based design by hand. Once you're happy with the way your design looks, save it to your account.

## ✨ Features

*   **User Authentication:** Secure sign-up and login with Clerk.
*   **Pixel Chart Editor:** Create and customize grid-based patterns.
*   **Save Your Work:** Store your charts and patterns in your personal account.
*   **Responsive Design:** Works on desktop and mobile devices.

## 🛠 Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Authentication:** [Clerk](https://clerk.com/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/) (via [Supabase](https://supabase.com/))
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **Deployment:** [Netlify](https://www.netlify.com/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [pnpm](https://pnpm.io/installation)
*   A [Supabase](https://supabase.com/) account for the PostgreSQL database.
*   A [Clerk](https://clerk.com/) account for authentication.

### Installation & Setup

1.  **Fork and Clone the repository**
    ```bash
    git clone https://github.com/YOUR_USERNAME/pattern-pal.git
    cd pattern-pal
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

### Environment Variables

1.  Create a `.env.local` file by copying the example file.
    ```bash
    cp .env.local.example .env.local
    ```

2.  **Database Setup**
    *   Create a new project on Supabase.
    *   Go to your project's **Settings** > **Database**.
    *   Under **Connection string**, copy the URI.
    *   Paste this URI as the value for `DATABASE_URL` in your `.env.local` file. It should look like this:
        ```env
        DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-HOST]:5432/postgres"
        ```

3.  **Authentication Setup**
    *   Create a new application on Clerk.
    *   Navigate to your Clerk application's dashboard and find your API Keys.
    *   Add the following keys to your `.env.local` file:
        ```env
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
        CLERK_SECRET_KEY=sk_test_...
        
        NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
        NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/editor
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/new-user
        ```
    > **Note:** The `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` should point to a page that triggers the `createNewUser` server action. This is necessary to sync the Clerk user with your application's database.

### Database Setup
### `prisma generate`

Generates the Prisma Client based on the `schema.prisma` file. This creates a fully-typed, auto-generated database client in `node_modules/@prisma/client`, allowing you to interact with your database using type-safe queries.

Run after modifying your Prisma schema or installing dependencies:

```bash
npx prisma generate
```

### Migrations

Apply the Prisma schema to the database. This will create the `User` and `Chart` tables.
```bash
pnpm prisma migrate dev
```

### `pnpm prisma studio`

View and edit database tables in a web-based GUI. Use it to inspect your tables, create or edit records, and debug data easily during development.

Run it with:

```bash
pnpm prisma studio
```

### Running the Development Server

Start the development server.
```bash
pnpm dev
```
Open http://localhost:3000 with your browser to see the result.

## 🚢 Deployment

This project is configured for deployment on Netlify.

1.  Push your code to a GitHub repository.
2.  Connect your repository to a new site on Netlify.
3.  Configure the build settings:
    *   **Build command:** `pnpm build`
    *   **Publish directory:** `.next`
4.  Add your environment variables (`DATABASE_URL`, Clerk keys, etc.) to the Netlify site's environment settings.
5.  Deploy!

## Contributing

Once you're happy with your changes, please submit a PR with a detailed description of the changes you've made.

## Bug reports

If you discover any bugs, feel free to create an issue on GitHub. Please add as much information as possible to help us in fixing the potential bug. We also encourage you to help even more by forking and submitting a pull request.

https://github.com/gbmyt/pattern-pal/issues

# Maintainers

-   Gabriela Taylor - Github

# License

This project is licensed under the terms of the **MIT license**. Copyright 2023 Gabriela Taylor.

