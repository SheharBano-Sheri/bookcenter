# CSV Field Guide - Book Center Import

## Quick Reference for CSV Product Import

This guide explains each field you can use when importing products via CSV.

---

## Required Fields (2)

### 1. title
- **Type**: Text
- **Required**: ✅ YES
- **Description**: The name/title of your product
- **Example**: `"The Great Gatsby"`, `"A4 Notebook Set"`, `"School Backpack"`
- **Notes**: This is what customers see as the product name

### 2. price
- **Type**: Number (decimal)
- **Required**: ✅ YES
- **Description**: Current selling price
- **Example**: `29.99`, `15.50`, `199.00`
- **Notes**: Use decimal point (.), not comma (,)

---

## Optional Fields (20+)

### Identification Fields

#### 3. isbn
- **Type**: Text
- **Required**: ❌ No
- **Description**: International Standard Book Number
- **Example**: `"978-0743273565"`, `"9780743273565"`
- **Best For**: Books, textbooks, novels
- **Notes**: Indexed for fast searching

#### 4. sku
- **Type**: Text
- **Required**: ❌ No
- **Description**: Stock Keeping Unit - Your internal product code
- **Example**: `"BOOK-001"`, `"STAT-PEN-12"`, `"BAG-SCH-BLUE"`
- **Notes**: Must be unique across all products, indexed for fast searching

### Pricing Fields

#### 5. originalPrice
- **Type**: Number (decimal)
- **Required**: ❌ No
- **Description**: Original price before discount
- **Example**: `39.99` (when current price is 29.99)
- **Display**: Shows strikethrough with "SALE" badge
- **Notes**: Only show if higher than current price

### Availability Fields

#### 6. available
- **Type**: Boolean
- **Required**: ❌ No (defaults to true)
- **Description**: Whether product is available for sale
- **Values**: `true`, `false`, `1`, `0`, `yes`, `no`
- **Example**: `true`, `1`
- **Notes**: Even if stock > 0, if available=false, product won't be sold

#### 7. stock
- **Type**: Integer
- **Required**: ❌ No (defaults to 0)
- **Description**: Quantity available
- **Example**: `50`, `100`, `0`
- **Notes**: Products with stock=0 show "Out of Stock"

### Image Fields

#### 8. mainImageUrl
- **Type**: URL
- **Required**: ❌ No
- **Description**: Primary product image
- **Example**: `"https://example.com/images/product.jpg"`
- **Notes**: Shown in product cards and detail page

#### 9. allImageUrls
- **Type**: Text (pipe-separated URLs)
- **Required**: ❌ No
- **Description**: Multiple product images
- **Example**: `"https://example.com/img1.jpg|https://example.com/img2.jpg|https://example.com/img3.jpg"`
- **Format**: Separate multiple URLs with `|` (pipe character)
- **Future**: Will be used for image gallery

### Categorization Fields

#### 10. productType
- **Type**: Text
- **Required**: ❌ No
- **Description**: Product category
- **Example**: `"Books"`, `"Stationery"`, `"Bags"`, `"Textbooks"`
- **Notes**: Auto-creates category if doesn't exist
- **Alternative**: Use existing category system

#### 11. tags
- **Type**: Text (comma-separated)
- **Required**: ❌ No
- **Description**: Keywords for searching and filtering
- **Example**: `"fiction,bestseller,classic"`, `"school,supplies,kids"`
- **Format**: Separate tags with commas
- **Display**: Shown as badges on product detail page
- **Search**: Searchable in future versions

### Publishing Information

#### 12. vendor
- **Type**: Text
- **Required**: ❌ No
- **Description**: Publisher, brand, or manufacturer
- **Example**: `"Penguin Random House"`, `"Pilot"`, `"Oxford"`
- **Best For**: Books (publisher), products (brand)
- **Display**: Shown on product detail page

#### 13. publishedAt
- **Type**: Date/DateTime
- **Required**: ❌ No (defaults to now)
- **Description**: When product was/will be published
- **Format**: `YYYY-MM-DD` or `YYYY-MM-DD HH:MM:SS`
- **Example**: `"2024-01-15"`, `"2024-01-15 10:30:00"`
- **Notes**: Used for sorting newest products

### Shipping Fields

#### 14. weight
- **Type**: Text
- **Required**: ❌ No
- **Description**: Human-readable weight
- **Example**: `"500g"`, `"1.2kg"`, `"2 lbs"`
- **Display**: Shown on product detail page
- **Notes**: For customer information

#### 15. weightGrams
- **Type**: Integer
- **Required**: ❌ No
- **Description**: Numeric weight in grams
- **Example**: `500`, `1200`, `2000`
- **Future Use**: Shipping calculations
- **Notes**: For automated systems

#### 16. requiresShipping
- **Type**: Boolean
- **Required**: ❌ No (defaults to true)
- **Description**: Whether product needs to be shipped
- **Values**: `true`, `false`, `1`, `0`
- **Example**: `true`
- **Future Use**: Digital products (e-books) would be false

### URL & SEO Fields

#### 17. url
- **Type**: URL
- **Required**: ❌ No
- **Description**: Full product page URL
- **Example**: `"https://mybookstore.com/products/great-gatsby"`
- **Notes**: For reference or linking

#### 18. handle
- **Type**: Text (URL-friendly)
- **Required**: ❌ No (auto-generated from title)
- **Description**: URL-friendly slug
- **Example**: `"great-gatsby"`, `"a4-notebook-set"`
- **Format**: Lowercase, hyphens, no spaces
- **Auto-Generated**: If not provided, created from title
- **Notes**: Future use for SEO-friendly URLs

### Content Fields

#### 19. description
- **Type**: Text (long)
- **Required**: ❌ No
- **Description**: Full product description
- **Example**: `"A classic American novel set in the Jazz Age, following the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan."`
- **Notes**: Shown on product detail page

#### 20. variantTitle
- **Type**: Text
- **Required**: ❌ No (defaults to "Default Title")
- **Description**: Product variant specification
- **Example**: `"Paperback"`, `"Hardcover"`, `"Large"`, `"Blue"`
- **Best For**: Books (format), products (size/color)
- **Display**: Shown on product detail if not "Default Title"

---

## Legacy/Compatibility Fields

#### categoryName
- **Alternative to**: productType
- **Notes**: Still supported for backward compatibility
- **Recommendation**: Use `productType` instead

#### categoryDescription
- **Type**: Text
- **Use**: Description for auto-created categories
- **Example**: `"Educational books for all ages"`

#### image
- **Alternative to**: mainImageUrl
- **Notes**: Fallback if mainImageUrl not provided

#### barcode
- **Alternative to**: isbn
- **Notes**: Alias for isbn field

---

## CSV Format Examples

### Minimal (Required Only)
```csv
title,price
The Great Gatsby,12.99
Pilot G2 Pen Set,8.99
School Backpack,45.00
```

### Basic (Common Fields)
```csv
title,price,stock,mainImageUrl,productType,description
The Great Gatsby,12.99,50,https://example.com/gatsby.jpg,Books,Classic American novel
Pilot G2 Pen Set,8.99,200,https://example.com/pen.jpg,Stationery,Smooth gel ink pens
School Backpack,45.00,30,https://example.com/bag.jpg,Bags,Durable school bag
```

### Complete (All Fields for Books)
```csv
title,isbn,sku,price,originalPrice,available,stock,mainImageUrl,allImageUrls,productType,vendor,tags,weight,weightGrams,requiresShipping,url,handle,variantTitle,description,publishedAt
The Great Gatsby,978-0743273565,BOOK-001,12.99,15.99,true,50,https://example.com/gatsby.jpg,https://example.com/gatsby1.jpg|https://example.com/gatsby2.jpg,Books,Scribner,"fiction,classic,american",200g,200,true,https://mybookstore.com/great-gatsby,great-gatsby,Paperback,"A classic American novel set in the Jazz Age, following the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan.",1925-04-10
```

---

## Tips & Best Practices

### General
1. **Use UTF-8 encoding** for your CSV file
2. **Use double quotes** for text fields with commas or special characters
3. **Use decimal point** (.) not comma (,) for numbers
4. **Leave fields empty** if not applicable (don't use N/A or null)
5. **Test with small batch** first (5-10 products)

### Pricing
- Always include `price`
- Only add `originalPrice` if product is on sale
- Ensure `originalPrice` > `price` for sale badge to show

### Images
- Use direct image URLs (not Google Drive links)
- Test URLs in browser first
- For `allImageUrls`, separate with `|` (pipe), no spaces

### Categorization
- Use `productType` to auto-create categories
- Keep category names consistent (e.g., always "Books" not sometimes "Book")
- Use `tags` for more specific classification

### Identification
- Add `isbn` for all books
- Add `sku` for inventory tracking
- Ensure SKUs are unique across all products

### Weights
- Use both `weight` (readable) and `weightGrams` (numeric) when possible
- Consistent format: "500g" or "1.2kg"
- 1 kg = 1000 grams

### Descriptions
- Write customer-facing descriptions
- Include key features and benefits
- Mention any unique selling points
- Keep formatting simple (no HTML)

---

## Common Errors & Solutions

### Error: "Missing required fields (title or price)"
**Solution**: Ensure your CSV has columns named exactly `title` and `price`

### Error: "Row X: Unique constraint failed on 'sku'"
**Solution**: SKU already exists in database, use different SKU or remove duplicate

### Error: "Invalid price format"
**Solution**: Use decimal point (29.99) not comma (29,99)

### Error: "CSV file is empty"
**Solution**: Ensure CSV has data rows, not just headers

### Import Shows "0 success"
**Solution**: Check required fields are present, check for errors in results panel

---

## Download CSV Template

Visit `/admin/import` page and click **"Download CSV Template"** to get a pre-formatted example file with all fields.

---

## Field Priority for Display

When customer views product:

1. **Product Card (Listing)**:
   - title
   - mainImageUrl
   - price
   - originalPrice (if exists, shows crossed out)
   - available & stock (out of stock badge)

2. **Product Detail Page**:
   - All above fields PLUS:
   - isbn
   - sku
   - vendor
   - weight
   - variantTitle
   - tags (as badges)
   - description (full text)
   - category name

3. **Search**:
   - Searches in: title, description, isbn, sku

---

## Import Process

1. Prepare CSV file with required fields
2. Go to `/admin/import`
3. Upload CSV file
4. Preview shows first 10 products
5. Click "Import X Products"
6. View results (success/failed counts)
7. Check errors if any failed
8. Verify products in `/admin/products`

---

## Questions?

- See `DATABASE_MIGRATION_GUIDE.md` for database setup
- See `SCHEMA_UPDATE_SUMMARY.md` for technical details
- See `CSV_IMPORT_GUIDE.md` for import process details
- See `START_HERE.md` for general project setup
