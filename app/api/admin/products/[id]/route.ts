import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const { 
      title, 
      description, 
      price, 
      mainImageUrl, 
      stock, 
      categoryId,
      isbn,
      sku,
      originalPrice,
      available,
      productType,
      vendor,
      tags,
      weight,
      variantTitle
    } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price: parseFloat(price),
        mainImageUrl,
        stock: parseInt(stock),
        categoryId,
        isbn: isbn || null,
        sku: sku || null,
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        available: available !== undefined ? available : true,
        productType: productType || null,
        vendor: vendor || null,
        tags: tags || null,
        weight: weight || null,
        variantTitle: variantTitle || null,
      },
      include: { category: true },
    });

    return NextResponse.json(product);
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
