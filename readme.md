# SaaS Contracts Dashboard


React + Tailwind SPA implementing the UI/UX assignment: contracts list, filters, contract detail, upload modal, mock API, and authentication.


## Tech stack
- React (hooks, functional components)
- Vite
- Tailwind CSS
- Context API for state (Auth + Contracts)
- Plain fetch for mock API


## Setup
1. Clone repo
2. `npm install`
3. `npm run dev`
4. Open `http://localhost:5173` (Vite default)


## Build
`npm run build`


## Deployment
This app is deployed to Vercel. Build output is in `dist/`.


## Assumptions
- Mock API served from `public/contracts.json`.
- Any username allowed; password must be `test123` (per spec).
- JWT is mocked and saved in `localStorage` under `mock_jwt`.


## Decisions / Notes
- Used Context API for auth + contract state to keep dependencies minimal.
- Components split to be reusable and testable.
- Accessibility: semantic elements and ARIA attributes for interactive controls.