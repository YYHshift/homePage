## Yuhe Yang – Personal Homepage

Next.js App Router + Tailwind v4 single-page resume site. Data is stored directly in a local SQLite database (`data/resume.db`) so that edits can be made without spinning up external services.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components)
- **Styling**: Tailwind CSS v4, Geist font family
- **Data Layer**: `better-sqlite3` for runtime reads, `sql.js` for generating seed data
- **Assets**: `public/portrait.png` (avatar), `public/Yuhe_Yang_Resume.pdf` (downloadable resume)

## Requirements

```
node>=20.11
npm>=10.2
better-sqlite3==12.8.0
sql.js==1.14.1
```

## Getting Started

```bash
# install dependencies
npm install

# (optional) regenerate data/resume.db from the seed script
npm run seed:db

# start the dev server
npm run dev
# -> http://localhost:3000
```

### SQLite Data Maintenance

- Database file: `data/resume.db`
- Use any SQLite GUI (DB Browser, TablePlus, etc.) to modify tables directly.
- To restore the reference data set, run `npm run seed:db` which executes `scripts/seed-db.mjs`.
- Data access helpers live in `src/lib/resume.ts`; type definitions are in `src/types/database.ts`.

## Build & Deploy

```bash
npm run lint
npm run build
npm run start   # verify the production build locally
```

Deploying to Vercel:
1. Push this folder (`site/`) to GitHub as the repository root (or set Vercel’s root directory to `site`).
2. In Vercel, create a project from that repo. Default build commands (`npm install`, `npm run build`) work out of the box.
3. Ensure `data/resume.db` is tracked in Git so it ships with each deployment. Because `better-sqlite3` runs on the Node Runtime, the data file is read from the bundle.

## Project Layout

```
site/
├── data/
│   └── resume.db           # SQLite data store
├── public/
│   ├── portrait.png
│   └── Yuhe_Yang_Resume.pdf
├── scripts/
│   └── seed-db.mjs         # uses sql.js to generate resume.db
├── src/
│   ├── app/                # Next.js App Router pages
│   ├── lib/                # SQLite query helpers
│   └── types/              # TypeScript interfaces
├── package.json
├── requirements.txt
└── README.md
```

## Customization Guide

1. **Update content**: edit `data/resume.db` tables. If the schema changes, update `src/types/database.ts` and `src/lib/resume.ts`, then rerun `npm run seed:db` if you want the seed script aligned.
2. **Swap assets**: replace `public/portrait.png` or `public/Yuhe_Yang_Resume.pdf` with new files using the same names.
3. **CI/CD**: default Node.js pipelines work without extra commands. Run `npm run seed:db` during CI only if you need to regenerate the database.

### Resume Download Notes

- The downloadable resume lives at `public/Yuhe_Yang_Resume.pdf`.
- The site links to `/Yuhe_Yang_Resume.pdf`; replacing that file (same filename) updates the download in deployments.
