import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { products } = body;

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: 'Invalid data format. Expected array of products.' },
        { status: 400 }
      );
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Process each product
    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      try {
        // Validate required fields (only title and price are required now)
        if (!product.title || !product.price) {
          results.failed++;
          results.errors.push(`Row ${i + 1}: Missing required fields (title or price)`);
          continue;
        }

        // Find or create category (if provided)
        let categoryId: string | null = null;
        if (product.productType || product.categoryName) {
          const categoryName = (product.productType || product.categoryName).trim();

          // Helper for basic singularization to merge "Books" and "Book"
          const singularize = (str: string) => {
            const lower = str.toLowerCase();
            if (lower.endsWith('ies') && !lower.endsWith('eies') && lower.length > 3) return str.slice(0, -3) + 'y'; // Babies -> Baby
            if (lower.endsWith('ess') || lower.endsWith('ss') || lower.endsWith('us')) return str; // Glass, Virus
            if (lower.endsWith('s') && lower.length > 3) return str.slice(0, -1); // Books -> Book
            return str;
          };

          const singularName = singularize(categoryName);
          const slug = singularName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

          // Check by Slug (primary de-dupe) OR Name (insensitive)
          let category = await prisma.category.findFirst({
            where: {
              OR: [
                { slug: slug },
                { name: { equals: categoryName, mode: 'insensitive' } },
                { name: { equals: singularName, mode: 'insensitive' } } // Also check singular form directly
              ]
            }
          });

          if (!category) {
            try {
              // Create with the Title Cased version of the incoming name or just as is? 
              // Using "singularName" for creation might be cleaner (Book) than "Books". 
              // Let's use the singularized form for the Name if it was plural, to standardize.
              // We'll capitalize the first letter for display.
              const formattedName = singularName.charAt(0).toUpperCase() + singularName.slice(1);

              category = await prisma.category.create({
                data: {
                  name: formattedName, // Store "Book" instead of "Books"
                  description: product.categoryDescription || null,
                  slug: slug,
                },
              });
            } catch (error) {
              // Double check if it failed due to race condition
              category = await prisma.category.findFirst({
                where: { OR: [{ slug: slug }, { name: categoryName.trim() }] }
              });

              if (!category) throw error;
            }
          }
          categoryId = category.id;
        }

        // Parse boolean fields
        const parseBoolean = (value: any): boolean => {
          if (typeof value === 'boolean') return value;
          if (typeof value === 'string') {
            const lower = value.toLowerCase().trim();
            return lower === 'true' || lower === '1' || lower === 'yes';
          }
          return false;
        };

        // Generate handle if missing
        const handle = product.handle?.trim() || product.title.trim().toLowerCase().replace(/\s+/g, '-');
        const title = product.title.trim();

        // Check availability
        const available = product.available !== undefined ? parseBoolean(product.available) : true;
        const requiresShipping = product.requiresShipping !== undefined ? parseBoolean(product.requiresShipping) : true;

        // Find existing product by handle OR title (case insensitive check for title would be better but simple OR is a good start)
        const existingProduct = await prisma.product.findFirst({
          where: {
            OR: [
              { handle: handle },
              { title: { equals: title, mode: 'insensitive' } }
            ]
          }
        });

        const productData = {
          title: title,
          isbn: product.isbn?.trim() || product.barcode?.trim() || null,
          description: product.description || null,

          price: parseFloat(product.price),
          originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : null,

          available: available,
          stock: product.stock ? parseInt(product.stock) : 0,
          sku: product.sku?.trim() || null,

          mainImageUrl: product.mainImageUrl || product.image || null,
          allImageUrls: product.allImageUrls || null,

          productType: product.productType?.trim() || null,
          categoryId: categoryId,
          tags: product.tags?.trim() || null,

          vendor: product.vendor?.trim() || null,
          publishedAt: product.publishedAt ? new Date(product.publishedAt) : new Date(),

          weight: product.weight?.trim() || null,
          weightGrams: product.weightGrams ? parseInt(product.weightGrams) : null,
          requiresShipping: requiresShipping,

          url: product.url?.trim() || null,
          handle: handle,

          variantTitle: product.variantTitle?.trim() || 'Default Title',
        };

        if (existingProduct) {
          // Update existing product
          await prisma.product.update({
            where: { id: existingProduct.id },
            data: productData,
          });
        } else {
          // Create new product
          await prisma.product.create({
            data: productData,
          });
        }

        results.success++;
      } catch (error: any) {
        results.failed++;
        results.errors.push(`Row ${i + 1}: ${error.message}`);
      }
    }

    return NextResponse.json({
      message: 'Import completed',
      results,
    });
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('CSV import error:', error);
    return NextResponse.json(
      { error: 'Failed to import products' },
      { status: 500 }
    );
  }
}
