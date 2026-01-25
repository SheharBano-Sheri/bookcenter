# 🚀 Quick Start Guide - Book Center

## Prerequisites ✅
- PostgreSQL database installed and running
- Node.js 18+ installed

## Setup Instructions (5 minutes)

### Step 1: Database Setup
Make sure PostgreSQL is running on your machine. Create a database named `bookcenter`:

```sql
CREATE DATABASE bookcenter;
```

### Step 2: Configure Environment
The `.env` file is already created. Update the `DATABASE_URL` with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/bookcenter?schema=public"
```

Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your PostgreSQL credentials.

### Step 3: Run Database Migrations
```bash
npx prisma migrate dev --name init
```

### Step 4: Seed Database with Sample Data
```bash
npx prisma db seed
```

This creates:
- 1 admin account (admin@bookcenter.com / admin123)
- 4 product categories
- 10 sample products

### Step 5: Start Development Server
```bash
npm run dev
```

## Access the Application 🌐

**Customer Store:** http://localhost:3000
- Browse products
- Add to cart
- Place orders without login

**Admin Panel:** http://localhost:3000/admin/login
- Email: admin@bookcenter.com
- Password: admin123

## What You Can Do

### As a Customer:
✅ Browse all products
✅ Filter by category
✅ Search products
✅ View product details
✅ Add items to cart
✅ Place orders without signup
✅ Get order confirmation

### As an Admin:
✅ Login to dashboard
✅ View statistics
✅ Add/Edit/Delete products
✅ Create categories
✅ View all orders
✅ Update order status
✅ Manage inventory

## Troubleshooting

**Database connection error?**
- Make sure PostgreSQL is running
- Check your DATABASE_URL in `.env`
- Verify database exists

**Build errors?**
- Run `npm install` to ensure all dependencies are installed
- Delete `.next` folder and rebuild

**Port already in use?**
- Change port: `npm run dev -- -p 3001`

## Next Steps

1. **Customize Products:** Login to admin and add your own products
2. **Change Images:** Update product image URLs to your own
3. **Modify Styling:** Edit Tailwind classes in components
4. **Add Features:** Extend with payment gateway, email notifications, etc.

## File Structure Overview

```
bookcenter/
├── app/                  # Next.js pages and API routes
│   ├── page.tsx         # Home page
│   ├── products/        # Product pages
│   ├── cart/            # Shopping cart
│   ├── checkout/        # Checkout page
│   ├── admin/           # Admin dashboard
│   └── api/             # API endpoints
├── components/          # Reusable components
├── lib/                 # Utilities and helpers
├── prisma/             # Database schema and seed
└── public/             # Static assets
```

## Support

For issues or questions, refer to the [README.md](README.md) for detailed documentation.

---

**Happy Building! 🎉**
