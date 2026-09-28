# Moon Developements Inc. Property Desk

A client-shareable prototype for tracking apartment rent, lease follow-ups,
invoices, payment entries, and property expenses.

## Run locally

```sh
npm ci
npm run dev
```

The finished demo is in `public/property-desk-demo.html` and opens at `/` through
the site shell. `npm run build` creates the Sites deployment output.

## Demo data

The app uses generated sample tenants, properties, lease dates, invoices, and
expenses. Changes made in the demo are saved in that browser's local storage;
they are not shared with other visitors or connected to payment services.
