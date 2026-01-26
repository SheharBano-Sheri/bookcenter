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
          const categoryName = product.productType || product.categoryName;
          let category = await prisma.category.findUnique({
            where: { name: categoryName.trim() },
          });

          if (!category) {
            category = await prisma.category.create({
              data: {
                name: categoryName.trim(),
                description: product.categoryDescription || null,
                slug: categoryName.trim().toLowerCase().replace(/\s+/g, '-'),
              },
            });
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

        // Create product with all fields
        await prisma.product.create({
          data: {
            title: product.title.trim(),
            isbn: product.isbn?.trim() || product.barcode?.trim() || null,
            description: product.description || null,
            
            price: parseFloat(product.price),
            originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : null,
            
            available: product.available !== undefined ? parseBoolean(product.available) : true,
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
            requiresShipping: product.requiresShipping !== undefined ? parseBoolean(product.requiresShipping) : true,
            
            url: product.url?.trim() || null,
            handle: product.handle?.trim() || product.title.trim().toLowerCase().replace(/\s+/g, '-'),
            
            variantTitle: product.variantTitle?.trim() || 'Default Title',
          },
        });

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
