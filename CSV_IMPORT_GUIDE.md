# 📊 CSV Import Guide - Bulk Product Upload

## Overview

The CSV import feature allows you to bulk upload hundreds or thousands of products at once, perfect for migrating data from other systems or adding large product catalogs.

## CSV Format Requirements

### Required Columns
Your CSV file **must** include these columns:
- `name` - Product name
- `categoryName` - Category name (will be auto-created if doesn't exist)
- `price` - Product price (numeric, e.g., 29.99)

### Optional Columns
- `categoryDescription` - Description for category (used when auto-creating)
- `stock` - Stock quantity (defaults to 0)
- `description` - Product description
- `image` - Image URL (use external image hosting like Unsplash, Imgur, etc.)

## CSV Template Example

```csv
name,categoryName,categoryDescription,price,stock,description,image
Math Textbook Grade 10,Books,Educational books,29.99,100,Comprehensive mathematics textbook,https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500
Premium Gel Pens Set,Stationery,Writing supplies,12.99,250,Pack of 12 smooth gel pens,https://images.unsplash.com/photo-1586281009004-2d0c2c3f8e1f?w=500
School Backpack,Bags,School bags and backpacks,54.99,75,Durable backpack with laptop sleeve,https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500
Scientific Calculator,Accessories,Educational accessories,28.50,150,240+ functions calculator,https://images.unsplash.com/photo-1611867967695-f46a33e91fb3?w=500
```

## How to Use

### Step 1: Prepare Your CSV File

1. **Use Excel or Google Sheets** to organize your data
2. **Include all required columns**: name, categoryName, price
3. **Format prices** as numbers without currency symbols
4. **Save as CSV** (comma-separated values)

### Step 2: Access Import Tool

1. Login to admin panel: http://localhost:3000/admin/login
2. Navigate to **"Import CSV"** in the sidebar
3. Click **"Download CSV Template"** for reference

### Step 3: Upload & Import

1. Click **"Choose a CSV file"** or drag and drop
2. **Preview** the data (first 10 rows shown)
3. Verify the data looks correct
4. Click **"Import X Products"**
5. Wait for import to complete

### Step 4: Review Results

The system will show:
- ✅ **Successful imports** - Products added to database
- ❌ **Failed imports** - Errors with specific row numbers
- 📋 **Error details** - What went wrong and how to fix

## Tips for Success

### 1. Data Preparation
- **Remove duplicate rows** before importing
- **Clean up product names** (remove extra spaces, special characters)
- **Validate prices** (must be numeric, use dots for decimals)
- **Check category names** (consistent spelling and capitalization)

### 2. Image URLs
- Use **direct image URLs** (ending in .jpg, .png, etc.)
- **Free image sources:**
  - Unsplash: https://unsplash.com
  - Pexels: https://pexels.com
  - Pixabay: https://pixabay.com
- Format: `https://domain.com/image.jpg?w=500`

### 3. Categories
- Categories are **auto-created** if they don't exist
- Use **consistent naming** (e.g., "Books" not "books" or "BOOKS")
- **Pre-create categories** in the Categories page for better control

### 4. Large Imports
- Test with **small file first** (10-20 products)
- For **1000+ products**, split into multiple files
- Import during **low-traffic times**

## Common Errors & Solutions

### Error: "Missing required fields"
**Problem:** CSV is missing name, categoryName, or price columns  
**Solution:** Ensure your CSV has all three required columns

### Error: "Invalid price format"
**Problem:** Price contains letters or special characters  
**Solution:** Use only numbers and decimal points (e.g., 29.99 not $29.99)

### Error: "Duplicate product"
**Problem:** Product with same name already exists  
**Solution:** Either delete existing product or rename the new one

### Error: "Category not found"
**Problem:** (Only if auto-creation disabled)  
**Solution:** Create category manually first or let system auto-create

## Advanced: Scraping Website Data

### For Saleem Book Depot or Similar Sites

If you want to extract data from existing websites:

1. **Manual Method** (Recommended for small datasets):
   - Visit each product page
   - Copy product details to spreadsheet
   - Save as CSV

2. **Browser Extensions**:
   - **Web Scraper** (Chrome extension)
   - **Data Miner** (Chrome/Firefox)
   - Configure selectors for product data

3. **Python Script** (For developers):
```python
import pandas as pd
import requests
from bs4 import BeautifulSoup

# Example scraper (adjust selectors for target site)
products = []
# ... scraping code here ...

df = pd.DataFrame(products)
df.to_csv('products.csv', index=False)
```

**⚠️ Important:** Always check the website's terms of service before scraping!

## Example: Full Product Catalog

Here's a complete example with 20 products:

```csv
name,categoryName,categoryDescription,price,stock,description,image
English Grammar Book,Books,Language learning books,24.99,80,Complete English grammar guide,https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500
Math Workbook Grade 5,Books,Educational books,18.50,120,Practice problems and exercises,https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500
Science Encyclopedia,Books,Reference books,45.00,50,Comprehensive science reference,https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500
Ballpoint Pens (Box of 50),Stationery,Writing supplies,19.99,300,Blue ink ballpoint pens,https://images.unsplash.com/photo-1586281009004-2d0c2c3f8e1f?w=500
A4 Spiral Notebooks (Pack of 5),Stationery,Notebooks and pads,18.99,200,200 pages each,https://images.unsplash.com/photo-1517842645767-c639042777db?w=500
Highlighter Set (6 colors),Stationery,Writing supplies,8.99,400,Fluorescent highlighters,https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500
Art Supplies Kit,Stationery,Art supplies,39.99,60,Complete painting kit,https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500
Geometry Set,Stationery,Math supplies,12.50,150,Compass ruler protractor,https://images.unsplash.com/photo-1586281009004-2d0c2c3f8e1f?w=500
Waterproof School Backpack,Bags,School bags,54.99,90,Laptop compartment included,https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500
Kids Lunch Box,Bags,Lunch boxes,22.99,200,Insulated thermal bag,https://images.unsplash.com/photo-1625736946883-17c1e2ed68d8?w=500
Trolley School Bag,Bags,School bags,89.99,40,Rolling backpack with wheels,https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500
Pencil Case Large,Bags,Pencil cases,9.99,250,Multi-compartment organizer,https://images.unsplash.com/photo-1584996541613-fc8c7e2e0000?w=500
Scientific Calculator,Accessories,Electronics,28.50,180,240+ functions,https://images.unsplash.com/photo-1611867967695-f46a33e91fb3?w=500
Desk Organizer Set,Accessories,Office supplies,24.99,100,Complete desk organization,https://images.unsplash.com/photo-1584996541613-fc8c7e2e0000?w=500
Bookmarks Set (30 pieces),Accessories,Reading accessories,6.99,500,Colorful page markers,https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500
Sticky Notes Pack,Accessories,Office supplies,11.99,350,6 colors 100 sheets each,https://images.unsplash.com/photo-1584996541613-fc8c7e2e0000?w=500
Whiteboard Markers (12 pack),Stationery,Writing supplies,15.99,220,Erasable dry erase,https://images.unsplash.com/photo-1586281009004-2d0c2c3f8e1f?w=500
Correction Tape (10 pack),Stationery,Office supplies,13.50,280,Easy correction,https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500
Book Cover Sheets (50 pack),Accessories,Book protection,14.99,190,Transparent book covers,https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500
Name Labels Stickers,Accessories,School supplies,7.99,450,Personalized name tags,https://images.unsplash.com/photo-1584996541613-fc8c7e2e0000?w=500
```

## Database Impact

### What Happens During Import:
1. **Categories**: Auto-created if they don't exist
2. **Products**: Created with all provided data
3. **Stock**: Set to specified amount (or 0 if not provided)
4. **Images**: URLs stored as-is (must be accessible)

### Data Validation:
- ✅ Duplicate checking
- ✅ Price format validation
- ✅ Required field verification
- ✅ Category auto-creation
- ✅ Error handling per row

## Post-Import Tasks

After importing:

1. **Verify Products** in the Products page
2. **Check Categories** were created correctly
3. **Update Images** if using placeholders
4. **Adjust Stock** levels if needed
5. **Edit Descriptions** for better SEO

## Support

For help with CSV import:
- Check error messages for specific issues
- Download template for reference
- Test with small file first
- Contact support if issues persist

---

**Ready to import your catalog? Login to the admin panel and start uploading!** 📊
