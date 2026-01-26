# 📚 Book Center - Quick Reference Card

## 🎯 Project Status
✅ **Ready for Database Migration**  
✅ Build: Successful  
✅ Code: Updated with 30+ product fields  
✅ Documentation: Complete  

---

## 🚀 5-Minute Setup

```powershell
# 1. Create database
psql -U postgres -c "CREATE DATABASE bookcenter;"

# 2. Create .env file
echo DATABASE_URL="postgresql://postgres:password@localhost:5432/bookcenter" > .env

# 3. Run migration
npx prisma migrate dev

# 4. Seed data
npx prisma db seed

# 5. Start
npm run dev
```

Visit: http://localhost:3000

---

## 📥 CSV Import Quick Guide

### Minimum CSV:
```csv
title,price
Product Name,29.99
```

### Recommended CSV:
```csv
title,isbn,sku,price,originalPrice,stock,mainImageUrl,productType,vendor
The Book,978-123,BOOK-01,29.99,39.99,50,https://image.jpg,Books,Publisher
```

### Upload:
1. Login: http://localhost:3000/admin/login (admin@bookcenter.com / admin123)
2. Go to: Import CSV
3. Download template
4. Fill your data
5. Upload & Import!

---

## 🔑 Key Fields

| Field | Required | Example | Purpose |
|-------|----------|---------|---------|
| title | ✅ | "Math Book" | Product name |
| price | ✅ | 29.99 | Selling price |
| isbn | ❌ | 978-0123456789 | Book identifier |
| sku | ❌ | BOOK-001 | Your product code |
| originalPrice | ❌ | 39.99 | Shows discount |
| mainImageUrl | ❌ | https://... | Product image |
| stock | ❌ | 50 | Quantity |
| productType | ❌ | "Books" | Auto-creates category |
| vendor | ❌ | "Publisher" | Brand/Publisher |
| tags | ❌ | "fiction,sale" | Keywords |

---

## 📖 Documentation

| File | When to Read |
|------|--------------|
| `QUICK_START_AFTER_UPDATE.md` | **First!** Setup in 5 min |
| `CSV_FIELD_GUIDE.md` | Before importing CSV |
| `DATABASE_MIGRATION_GUIDE.md` | For detailed setup |
| `READY_TO_MIGRATE.md` | Complete status report |

---

## 🎨 New Features

✅ **Sale Pricing**: Show original price crossed out  
✅ **Sale Badges**: "SALE" tag on product images  
✅ **ISBN/SKU Search**: Find products by code  
✅ **Rich Details**: Vendor, weight, tags, variants  
✅ **Flexible Import**: Only 2 required fields  
✅ **Multiple Images**: Support for image galleries  

---

## 🔗 Quick URLs

After running `npm run dev`:

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Products | http://localhost:3000/products |
| Admin Login | http://localhost:3000/admin/login |
| Import CSV | http://localhost:3000/admin/import |
| Products Admin | http://localhost:3000/admin/products |
| DB Studio | Run: `npx prisma studio` |

---

## 👤 Admin Access

**Email**: admin@bookcenter.com  
**Password**: admin123  

*(Created automatically by seed script)*

---

## ⚠️ Troubleshooting

| Error | Solution |
|-------|----------|
| Can't reach database | `net start postgresql-x64-14` |
| Database doesn't exist | `psql -U postgres -c "CREATE DATABASE bookcenter;"` |
| .env missing | Create file with DATABASE_URL |
| Migration fails | Check PostgreSQL is running |
| CSV import 0 success | Ensure title & price columns exist |

---

## 🎓 Sample Product (From Seed)

```
Math Textbook Grade 10
├─ ISBN: 978-0123456789
├─ SKU: BOOK-MATH-10  
├─ Price: $29.99 (was $34.99) ← 14% OFF!
├─ Vendor: McGraw-Hill Education
├─ Stock: 50 ✓ Available
├─ Tags: math, textbook, grade-10
├─ Weight: 800g
└─ Category: Books
```

---

## 📊 Field Statistics

- **Total Fields**: 30+
- **Required**: 2 (title, price)
- **Recommended**: 8 (isbn, sku, image, stock, description, vendor, type, tags)
- **Optional**: 12+ (weight, variants, urls, etc.)
- **Nullable**: 28 (all except id, price, timestamps)

---

## 🏗️ Project Structure

```
bookcenter/
├── app/                    # Next.js pages
│   ├── page.tsx           # Home (✅ updated)
│   ├── products/          # Product pages (✅ updated)
│   └── admin/             # Admin panel (⚠️ form needs update)
├── components/            # Reusable components (✅ updated)
├── prisma/
│   ├── schema.prisma      # Database schema (✅ 30+ fields)
│   └── seed.ts            # Sample data (✅ updated)
├── lib/                   # Utilities
└── public/                # Static files
```

---

## 🎯 Next Actions

1. **NOW**: Read `QUICK_START_AFTER_UPDATE.md`
2. **THEN**: Install PostgreSQL
3. **AFTER**: Run 5-minute setup
4. **FINALLY**: Import your CSV data

---

## 💾 Backup Reminder

Before importing real data:
```powershell
# Backup database
pg_dump -U postgres bookcenter > backup.sql

# Restore if needed
psql -U postgres bookcenter < backup.sql
```

---

## 📞 Help Priority

1. Check documentation files
2. Review error message carefully
3. Check PostgreSQL is running
4. Verify .env file
5. Try `npx prisma studio` to inspect DB

---

**🎉 Everything is ready! Time to set up PostgreSQL and migrate!**

*Print this card for quick reference while setting up!*
