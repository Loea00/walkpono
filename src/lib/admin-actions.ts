"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------- Articles ----------

export async function createArticle(formData: FormData) {
  const session = await requireAdmin();
  const title = str(formData, "title");
  const slug = str(formData, "slug") || slugify(title);
  const published = formData.get("published") === "on";

  await prisma.article.create({
    data: {
      title,
      slug,
      excerpt: str(formData, "excerpt") || null,
      content: str(formData, "content"),
      coverImage: str(formData, "coverImage") || null,
      published,
      publishedAt: published ? new Date() : null,
      authorId: session.user.id,
    },
  });

  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  redirect("/admin/articles");
}

export async function updateArticle(id: string, formData: FormData) {
  await requireAdmin();
  const title = str(formData, "title");
  const slug = str(formData, "slug") || slugify(title);
  const published = formData.get("published") === "on";

  const existing = await prisma.article.findUnique({ where: { id } });

  await prisma.article.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt: str(formData, "excerpt") || null,
      content: str(formData, "content"),
      coverImage: str(formData, "coverImage") || null,
      published,
      publishedAt: published ? (existing?.publishedAt ?? new Date()) : null,
    },
  });

  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/articles");
  revalidatePath("/articles");
}

// ---------- Products ----------

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const name = str(formData, "name");
  const slug = str(formData, "slug") || slugify(name);
  const image = str(formData, "image");

  await prisma.product.create({
    data: {
      name,
      slug,
      description: str(formData, "description"),
      priceCents: Math.round(Number(str(formData, "price")) * 100),
      images: image ? [image] : [],
      active: formData.get("active") === "on",
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/store");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();
  const name = str(formData, "name");
  const slug = str(formData, "slug") || slugify(name);
  const image = str(formData, "image");

  await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      description: str(formData, "description"),
      priceCents: Math.round(Number(str(formData, "price")) * 100),
      images: image ? [image] : [],
      active: formData.get("active") === "on",
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/store");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/store");
}

// ---------- Workshops ----------

export async function createWorkshop(formData: FormData) {
  await requireAdmin();
  const title = str(formData, "title");
  const slug = str(formData, "slug") || slugify(title);
  const priceStr = str(formData, "price");

  await prisma.workshop.create({
    data: {
      title,
      slug,
      description: str(formData, "description"),
      coverImage: str(formData, "coverImage") || null,
      priceCents: priceStr ? Math.round(Number(priceStr) * 100) : null,
      startAt: new Date(str(formData, "startAt")),
      location: str(formData, "location") || null,
      capacity: str(formData, "capacity") ? Number(str(formData, "capacity")) : null,
      published: formData.get("published") === "on",
    },
  });

  revalidatePath("/admin/workshops");
  revalidatePath("/workshops");
  redirect("/admin/workshops");
}

export async function updateWorkshop(id: string, formData: FormData) {
  await requireAdmin();
  const title = str(formData, "title");
  const slug = str(formData, "slug") || slugify(title);
  const priceStr = str(formData, "price");

  await prisma.workshop.update({
    where: { id },
    data: {
      title,
      slug,
      description: str(formData, "description"),
      coverImage: str(formData, "coverImage") || null,
      priceCents: priceStr ? Math.round(Number(priceStr) * 100) : null,
      startAt: new Date(str(formData, "startAt")),
      location: str(formData, "location") || null,
      capacity: str(formData, "capacity") ? Number(str(formData, "capacity")) : null,
      published: formData.get("published") === "on",
    },
  });

  revalidatePath("/admin/workshops");
  revalidatePath("/workshops");
  redirect("/admin/workshops");
}

export async function deleteWorkshop(id: string) {
  await requireAdmin();
  await prisma.workshop.delete({ where: { id } });
  revalidatePath("/admin/workshops");
  revalidatePath("/workshops");
}
