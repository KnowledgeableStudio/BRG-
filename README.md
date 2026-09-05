# BRG Collection - Future Plush

A premium streetwear and gaming styled e-commerce website for the BRG Plush Hoodie Toy.

## Run Locally

```bash
npm install
npm run dev
```

## Deploy

```bash
npx vercel
```

## Pricing

- Base price: `$24.99`
- Default tax rate: `8.875%` (NYC combined: 4% state + 4.5% city + 0.375% MCTD)
- Configure tax with `NEXT_PUBLIC_TAX_RATE`, for example `NEXT_PUBLIC_TAX_RATE=0.0825`

Cart and checkout both calculate:

```text
Subtotal = 24.99 x quantity
Tax = subtotal x tax rate
Total = subtotal + tax
```
