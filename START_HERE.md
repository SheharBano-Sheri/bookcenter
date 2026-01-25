# 🚀 SETUP GUIDE - Start Here!

## What You Need to Do Now

Follow these steps in order to get your Book Center website running:

---

## Step 1: Install PostgreSQL Database ⚡

### For Windows:

1. **Download PostgreSQL:**
   - Go to: https://www.postgresql.org/download/windows/
   - Download the latest version (PostgreSQL 14, 15, or 16)
   - Run the installer

2. **During Installation:**
   - Set a password for the `postgres` user (REMEMBER THIS!)
   - Use default port: `5432`
   - Keep all default settings

3. **Verify Installation:**
   ```powershell
   # Open PowerShell and run:
   psql --version
   ```
   Should show: `psql (PostgreSQL) 16.x`

### Already Have PostgreSQL?

Check if it's running:
```powershell
# Check PostgreSQL service status
Get-Service -Name postgresql*

# If not running, start it:
Start-Service postgresql-x64-16  # Adjust version number
```

---

## Step 2: Create the Database 📊

### Option A: Using Command Line (Recommended)

```powershell
# Connect to PostgreSQL
psql -U postgres

# You'll be prompted for the password you set during installation
# Then run this command:
CREATE DATABASE bookcenter;

# Verify it was created:
\l

# Exit:
\q
```

### Option B: Using pgAdmin (GUI)

1. Open **pgAdmin** (installed with PostgreSQL)
2. Connect to your local server (password required)
3. Right-click "Databases" → "Create" → "Database"
4. Name it: `bookcenter`
5. Click "Save"

---

## Step 3: Configure Environment Variables 🔧

1. **Open the `.env` file** in your project folder (E:\Projects\bookcenter\.env)

2. **Update the DATABASE_URL** with your PostgreSQL password:

   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/bookcenter?schema=public"
   ```

   Replace `YOUR_PASSWORD` with the password you set for PostgreSQL.

   **Example:**
   ```env
   DATABASE_URL="postgresql://postgres:mypassword123@localhost:5432/bookcenter?schema=public"
   ```

3. **Save the file**

---

## Step 4: Setup Database Tables 🗄️

Open PowerShell in your project folder and run:

```powershell
# Navigate to project (if not already there)
cd E:\Projects\bookcenter

# Create database tables from Prisma schema
npx prisma migrate dev --name init
```

**What this does:**
- Creates all tables (Admin, Product, Category, Order, OrderItem)
- Sets up relationships
- Prepares database for use

**Expected output:**
```
✔ Generated Prisma Client
✔ The database is now in sync with your schema
```

---

## Step 5: Add Sample Data 🌱

```powershell
# Seed database with sample products
npx prisma db seed
```

**What this creates:**
- ✅ 1 admin account (admin@bookcenter.com / admin123)
- ✅ 4 categories (Books, Stationery, Bags, Accessories)
- ✅ 10 sample products with images

**Expected output:**
```
✅ Admin user created
✅ Categories created
✅ Sample products created
🎉 Database seed completed successfully!
```

---

## Step 6: Start the Development Server 🚀

```powershell
npm run dev
```

**Expected output:**
```
▲ Next.js 15.5.9
- Local:        http://localhost:3000
✓ Ready in 2.5s
```

---

## Step 7: Access Your Website 🌐

### Customer Store:
Open browser: **http://localhost:3000**

You should see:
- Beautiful home page
- Featured products
- Categories
- Navigation menu

### Admin Panel:
Open browser: **http://localhost:3000/admin/login**

**Login credentials:**
- Email: `admin@bookcenter.com`
- Password: `admin123`

---

## Step 8: Explore Features 🎯

### As a Customer:
1. ✅ Browse products on home page
2. ✅ Click on products to see details
3. ✅ Add items to cart
4. ✅ Go to cart and checkout
5. ✅ Place an order (no login needed!)

### As Admin:
1. ✅ Login to admin panel
2. ✅ View dashboard statistics
3. ✅ Go to "Products" - see sample products
4. ✅ Go to "Import CSV" - try bulk import
5. ✅ Go to "Categories" - manage categories
6. ✅ Go to "Orders" - view customer orders

---

## Step 9: Import Your Product Catalog 📊

### Option 1: Test with Template

1. Login to admin panel
2. Go to **"Import CSV"**
3. Click **"Download CSV Template"**
4. Open the downloaded file
5. Add a few products
6. Upload and import

### Option 2: Prepare Your Real Data

1. Create a CSV file with your products:
   ```csv
   name,categoryName,price,stock,description,image
   Your Book Title,Books,29.99,100,Description here,https://imageurl.com
   ```

2. Go to admin panel → Import CSV
3. Upload your file
4. Review preview
5. Click import

**See [CSV_IMPORT_GUIDE.md](CSV_IMPORT_GUIDE.md) for detailed CSV instructions.**

---

## 🎯 Quick Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `bookcenter` created
- [ ] `.env` file updated with your PostgreSQL password
- [ ] Ran `npx prisma migrate dev --name init`
- [ ] Ran `npx prisma db seed`
- [ ] Started server with `npm run dev`
- [ ] Accessed http://localhost:3000
- [ ] Logged into admin panel
- [ ] Explored features

---

## 🐛 Troubleshooting

### Problem: "Can't reach database server at localhost:5432"

**Solutions:**
1. Check PostgreSQL is running:
   ```powershell
   Get-Service -Name postgresql*
   ```

2. Start the service if stopped:
   ```powershell
   Start-Service postgresql-x64-16
   ```

3. Verify your password in `.env` is correct

4. Test database connection:
   ```powershell
   psql -U postgres -d bookcenter
   ```

### Problem: "Migration failed"

**Solution:**
```powershell
# Reset and try again
npx prisma migrate reset
npx prisma migrate dev --name init
```

### Problem: "Module not found"

**Solution:**
```powershell
# Reinstall dependencies
npm install
```

### Problem: "Port 3000 already in use"

**Solution:**
```powershell
# Use different port
npm run dev -- -p 3001
# Then visit: http://localhost:3001
```

---

## 📞 Need Help?

1. **Check error messages** - they usually tell you what's wrong
2. **Read documentation:**
   - [README.md](README.md) - Complete documentation
   - [CSV_IMPORT_GUIDE.md](CSV_IMPORT_GUIDE.md) - CSV import help
   - [DEVELOPER.md](DEVELOPER.md) - Technical details

3. **Common fixes:**
   - Restart PostgreSQL service
   - Check `.env` file
   - Run `npm install` again
   - Delete `.next` folder and rebuild

---

## 🎨 What's Next?

After setup is complete:

### Immediate Tasks:
1. **Change admin password** (create new admin in admin panel)
2. **Delete sample products** (if you don't need them)
3. **Add your real categories**
4. **Import your product catalog** via CSV

### Customization:
1. **Update colors** - edit `tailwind.config.ts`
2. **Change logo/branding** - edit `components/Header.tsx`
3. **Modify footer** - edit `components/Footer.tsx`
4. **Add more pages** - create new routes in `app/`

### Production Deployment:
1. **Get a domain name**
2. **Deploy to Vercel/Netlify** (free hosting)
3. **Use production database** (like Supabase or Railway)
4. **Set up payment gateway** (Stripe/PayPal)
5. **Add email notifications**

---

## ✅ Success Indicators

You know everything is working when:

- ✅ Website loads at http://localhost:3000
- ✅ You can browse products
- ✅ You can add items to cart
- ✅ Admin login works
- ✅ You can see dashboard statistics
- ✅ CSV import feature is accessible
- ✅ Orders are created successfully

---

## 📚 Documentation Files

All guides in your project:

1. **START_HERE.md** (this file) - Setup guide
2. **README.md** - Complete project documentation
3. **QUICKSTART.md** - 5-minute quick start
4. **CSV_IMPORT_GUIDE.md** - Detailed CSV import instructions
5. **DEVELOPER.md** - Technical documentation
6. **CSV_FEATURE_SUMMARY.md** - CSV feature overview

---

## 🎉 You're All Set!

Once you complete the steps above, your Book Center e-commerce website will be:

- ✅ Fully functional
- ✅ Ready for data import
- ✅ Professional looking
- ✅ Better than most commercial platforms
- ✅ Ready for production

**Now go ahead and start importing your product catalog!** 🚀📚

---

**Current Time:** January 25, 2026  
**Your Project:** E:\Projects\bookcenter  
**Start Here:** Follow steps 1-9 above in order

Good luck! 🎯
