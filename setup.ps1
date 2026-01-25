# 🚀 Quick Setup Script for Book Center

Write-Host "📚 Book Center - Setup Script" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check if .env exists
if (-Not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env file created. Please update DATABASE_URL with your PostgreSQL credentials.`n" -ForegroundColor Green
    Write-Host "Exiting... Please configure .env and run this script again." -ForegroundColor Yellow
    exit
}

Write-Host "1️⃣  Installing dependencies..." -ForegroundColor Blue
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed`n" -ForegroundColor Green

Write-Host "2️⃣  Running Prisma migrations..." -ForegroundColor Blue
npx prisma migrate dev --name init
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Migration failed. Please check your DATABASE_URL in .env" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Database migrated`n" -ForegroundColor Green

Write-Host "3️⃣  Seeding database with sample data..." -ForegroundColor Blue
npx prisma db seed
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Seeding failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Database seeded`n" -ForegroundColor Green

Write-Host "🎉 Setup completed successfully!`n" -ForegroundColor Green
Write-Host "📝 Admin Login Credentials:" -ForegroundColor Cyan
Write-Host "   Email: admin@bookcenter.com" -ForegroundColor White
Write-Host "   Password: admin123`n" -ForegroundColor White

Write-Host "🚀 To start the development server, run:" -ForegroundColor Cyan
Write-Host "   npm run dev`n" -ForegroundColor White

Write-Host "Then visit: http://localhost:3000" -ForegroundColor Green
Write-Host "Admin panel: http://localhost:3000/admin/login`n" -ForegroundColor Green
