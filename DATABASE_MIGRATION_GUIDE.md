# Database Migration Guide - Updated Schema

## Overview
This guide helps you migrate to the new comprehensive product schema with 30+ fields matching your Book Center requirements.

## What Changed

### Old Schema (Simple)
- name, description, price, stock, image, categoryId

### New Schema (Comprehensive)
- **Identification**: title, isbn, sku
- **Pricing**: price, originalPrice
- **Availability**: available (boolean), stock
- **Images**: mainImageUrl, allImageUrls (multiple images)
- **Categorization**: productType, categoryId, tags
- **Publishing**: vendor, publishedAt
- **Shipping**: weight, weightGrams, requiresShipping
- **URLs**: url, handle
- **Content**: description, variantTitle

## Migration Steps

### 1. Install PostgreSQL (if not done)
```powershell
# Download from: https://www.postgresql.org/download/windows/
# Or use Chocolatey:
choco install postgresql

# Start PostgreSQL service
net start postgresql-x64-14
```

### 2. Create Database
```powershell
# Open PostgreSQL command line
psql -U postgres

# In PostgreSQL console:
CREATE DATABASE bookcenter;
CREATE USER bookadmin WITH ENCRYPTED PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE bookcenter TO bookadmin;
\q
```

### 3. Update Environment Variables
Create or update `.env` file in project root:
```env
DATABASE_URL="postgresql://bookadmin:yourpassword@localhost:5432/bookcenter"
```

### 4. Generate Prisma Client
```powershell
npx prisma generate
```

### 5. Run Migration
```powershell
# Create and apply migration
npx prisma migrate dev --name add_comprehensive_product_fields

# This will:
# - Create the migration SQL
# - Apply it to your database
# - Generate the Prisma client
```

### 6. Seed Database (Optional)
```powershell
npx prisma db seed
```

### 7. Verify Migration
```powershell
# Open Prisma Studio to see your data
npx prisma studio
```

## CSV Import Format

Your CSV files should now use these column headers (only **title** and **price** are required):

### Required Columns
- `title` - Product name (e.g., "The Great Gatsby")
- `price` - Current selling price (e.g., 29.99)

### Optional Columns
- `isbn` - International Standard Book Number
- `sku` - Stock Keeping Unit code
- `originalPrice` - Original price before discount
- `available` - true/false or 1/0
- `stock` - Quantity available (default: 0)
- `mainImageUrl` - Primary product image URL
- `allImageUrls` - Multiple images separated by | (e.g., url1|url2|url3)
- `productType` - Category type (auto-creates category if doesn't exist)
- `vendor` - Publisher or brand name
- `tags` - Comma-separated keywords (e.g., "fiction,bestseller,classic")
- `weight` - Human-readable weight (e.g., "500g")
- `weightGrams` - Numeric weight in grams
- `requiresShipping` - true/false (default: true)
- `url` - Product page URL
- `handle` - URL-friendly slug (auto-generated from title if not provided)
- `variantTitle` - Product variant (e.g., "Paperback", "Hardcover")
- `description` - Full product description

### Example CSV
```csv
title,isbn,sku,price,originalPrice,available,stock,mainImageUrl,productType,vendor,tags,weight,description
The Great Gatsby,978-0743273565,BOOK-001,12.99,15.99,true,50,https://example.com/gatsby.jpg,Books,Scribner,"fiction,classic,american",200g,A classic novel set in the Jazz Age
Pilot G2 Pen Set,,STAT-PEN-01,8.99,10.99,true,200,https://example.com/pen.jpg,Stationery,Pilot,"pens,stationery,office",100g,Smooth gel ink pens in pack of 12
```

## Updated Components

The following files have been updated to use the new schema:

### Frontend Components
- ✅ `/components/ProductCard.tsx` - Shows title, originalPrice, mainImageUrl, sale badges
- ✅ `/app/page.tsx` - Home page product listings
- ✅ `/app/products/page.tsx` - Product search and filtering
- ✅ `/app/products/[id]/page.tsx` - Full product details with ISBN, SKU, tags, etc.

### Admin Pages
- ⚠️ `/app/admin/products/page.tsx` - NEEDS UPDATE for new fields
- ✅ `/app/admin/import/page.tsx` - CSV import with new field support

### API Routes
- ✅ `/app/api/admin/import/route.ts` - Handles all new CSV fields
- ⚠️ `/app/api/admin/products/route.ts` - May need update for create/edit
- ✅ `/app/api/products/[id]/route.ts` - Works with new schema

## Schema Features

### Indexes
For better query performance, these fields are indexed:
- `categoryId` - Fast category filtering
- `sku` - Quick SKU lookups
- `isbn` - Fast ISBN searches

### Nullable Fields
Almost all fields (except id, price, and timestamps) are nullable, allowing:
- Gradual data migration
- Flexible CSV imports
- Missing field handling

### Default Values
- `available` - Defaults to `true`
- `stock` - Defaults to `0`
- `requiresShipping` - Defaults to `true`
- `variantTitle` - Defaults to `"Default Title"`
- `handle` - Auto-generated from title if not provided

## Troubleshooting

### Error: "Can't reach database server"
- Ensure PostgreSQL is running: `net start postgresql-x64-14`
- Check connection string in `.env`
- Verify database exists: `psql -U postgres -l`

### Error: "Unique constraint failed"
- Product handles must be unique
- Category names must be unique
- Admin emails must be unique

### Migration Fails
```powershell
# Reset database (CAUTION: Deletes all data)
npx prisma migrate reset

# Then run migration again
npx prisma migrate dev
```

### Import Errors
- Check CSV encoding (use UTF-8)
- Ensure required columns (title, price) are present
- Verify number formats (use . for decimals, not ,)
- Boolean values: true/false or 1/0

## Next Steps

1. ✅ PostgreSQL installed and running
2. ✅ Database created and configured
3. ✅ Migration applied
4. ✅ Seed data loaded
5. ⚠️ Update admin product management forms
6. ✅ Test CSV import with new fields
7. ⚠️ Update seed.ts with new field structure

## Testing Checklist

- [ ] Can create products with new fields via admin
- [ ] CSV import works with new column structure
- [ ] Product cards show sale prices correctly
- [ ] Product detail page shows ISBN, SKU, tags
- [ ] Search works with ISBN and SKU
- [ ] Category filtering still works
- [ ] Shopping cart still functional
- [ ] Checkout process unaffected

## Support

If you encounter issues:
1. Check this guide first
2. Review START_HERE.md for setup steps
3. Check CSV_IMPORT_GUIDE.md for CSV specifics
4. Verify .env database connection
5. Check Prisma logs for detailed errors
