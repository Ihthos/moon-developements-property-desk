# Moon Developements Inc. Property Desk — Project Handoff

This brief captures the client context and requirements shared so far. It is a starting point for building the actual application; unresolved items are called out rather than assumed.

## Company and manager

- Company name as provided: **Moon Developements Inc.**
- Manager: **Morshed Hossain**
- The manager handles day-to-day real estate administration: tracking apartments and leases, collecting rent, and logging payments and expenses. He is not the company owner.
- The manager currently uses FreshBooks, which does not fit this workflow. The goal is a custom, convenient, lower-cost tool built around his needs.
- The primary user is not very technical, so the interface should feel clear and easy to use.

## Portfolio size and organization

- Approximately **4 buildings, 100 apartments, and 150 tenants**.
- Organize and find information by tenant/client name, building, apartment/unit, rent and payment, invoice, and expense.
- The manager should be able to see which tenant belongs to which building and unit, along with rent, lease dates, and account status.

## Requested workflows

### Dashboard and attention items

- Show important lease follow-ups and overdue rent prominently.
- List overdue tenants with the amount owed.
- Make upcoming work easy to scan without requiring the manager to navigate through many screens.

### Lease follow-ups

- Show tenants whose leases are ending soon, especially leases ending within the next week. A longer view (for example, the next 60 days) is also useful.
- Each row should show the tenant name, building, apartment/unit, lease end date, and the date the manager needs to contact the tenant or send the relevant notice/list.
- Lease notice timing varies by tenant/lease; do not assume one universal notice period. The manager needs to see when to act for each lease.
- The manager should be able to track whether a follow-up has been handled.

### Rent and overdue balances

- Track rent payments, outstanding rent, and how overdue an amount is.
- Make current-month rent and prior unpaid rent understandable.
- The requested invoice behavior includes a current-month invoice and a total-overdue amount that can include prior months plus the current month. Confirm the exact invoice and balance rules with the manager before implementing them.

### Invoices

- Build an invoice flow around the manager's existing invoice template so he does not have to recreate invoices manually in Word.
- Automatically fill in available tenant, property/unit, and invoice details; allow the manager to enter or adjust the amount and other necessary fields.
- Support invoice follow-ups/reminders and clear overdue status.
- Preserve the intended distinction between a single month's rent invoice and an accumulated overdue balance, after confirming how those should be issued and paid.

### Payments

- Let the manager record/log rent payments and see the resulting balance.
- Stripe was mentioned as a possible future payment integration. The user said they will handle Stripe setup later; no Stripe credentials or account configuration have been provided.

### Property expenses

- Record expenses against a building and, when applicable, an apartment/unit.
- Include repairs and purchases such as a refrigerator or oven, along with a description, amount, and relevant date/vendor information.
- Make expenses easy to review by property/building and category.

## Interface direction

- Keep the product minimal, with roughly two or three clear primary choices in the left navigation.
- Use plain labels and straightforward forms for a non-technical manager.
- Prioritize useful lists and action dates over dense accounting screens.

## Existing demo and repository

- Public source repository: <https://github.com/Ihthos/moon-developements-property-desk>
- GitHub Pages demo: <https://ihthos.github.io/moon-developements-property-desk/>
- The demo uses generated placeholder tenants, buildings, leases, invoices, payments, and expenses. It demonstrates the dashboard, rent roll, invoice/payment entry, expenses, and lease follow-up views, including 7-day and 60-day lease windows.
- Demo edits are stored in that visitor's browser only. They are not shared with the manager or other visitors and are not saved to a server.
- Demo reminder actions only mark/show a reminder action; they do not send email or text messages.
- Demo invoices are manually created, and its sample dates are fixed around September 28, 2026. It does not automatically generate future monthly invoices.
- Stripe is not connected.
- Treat the demo as a workflow prototype, not as the operational record system.

## Source documents mentioned

The user referenced these local files as examples/data sources:

- `Invoice 4336.pdf` — the existing invoice template.
- `Rent Roll for Moon 701 Ave C-1.pdf` — an example rent roll.

These files are not included in this repository. Ask the user to provide them to the implementation environment before extracting real fields or importing real tenant/property data. Review tenant information before placing either document in a public repository.

## Decisions to confirm with the manager

1. Which exact fields, wording, and layout from the invoice PDF must be preserved? What invoice numbering and due-date rules should apply?
2. When a tenant has multiple unpaid months, should the system create one invoice per month, a separate cumulative invoice, or both? How should payments be allocated across those balances?
3. Should new monthly rent invoices be generated automatically? If so, on what date and with what due date/grace period?
4. Which lease notice periods are used, where are they stored, and what does “send them the list” mean in the manager's workflow (who receives it and by what channel)?
5. Should reminders be email, text, or in-app only? Who receives them, how often, and should they be sent automatically or manually?
6. What payment details must be recorded, and when should Stripe be added?
7. Who will use the actual application, and what access, backup, and data-retention needs apply?
8. Which columns and filters are required for tenant, building, payment, and expense lists? Are exports needed beyond the rent roll?

## Initial acceptance checks for the actual application

- The manager can quickly find a tenant by name, building, or apartment/unit.
- The dashboard shows upcoming lease actions and overdue balances with names and amounts.
- Lease follow-up rows include the lease end date and an actionable contact-by date for each tenant.
- Rent, invoices, payment entries, and expenses are linked to the right tenant/property records and remain available across sessions and devices for authorized users.
- Invoice totals and overdue balances follow rules confirmed by the manager.
- The interface remains simple enough for the manager to use without accounting-software training.
