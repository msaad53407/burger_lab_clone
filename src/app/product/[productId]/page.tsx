import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import ProductDescription from "../components/ProductDescription";
import { Metadata } from "next";
import RelatedProducts from "../components/RelatedProducts";
import notFound from "@/app/not-found";
import { Item } from "@/models/Item";
import LoadingSpinner from "@/components/LoadingSpinner";
import ServiceError from "@/components/ServiceError";
import { getAllFavorites } from "@/functions";

export async function generateMetadata({
  params: { productId },
}: {
  params: { productId?: number };
}): Promise<Metadata> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/item/get/${productId}`
    );
    response;
    const product: Item = await response.json();

    return {
      title: `${product ? product.name : "Product Not Found"} - Burger Lab`,
    };
  } catch (error) {
    return {
      title: "Burger Lab | Online Ordering",
    };
  }
}

interface ProductPageProps {
  params: { productId?: number };
}

export default async function ProductPage({
  params: { productId },
}: ProductPageProps) {
  //TODO Temporary
  const userId = 80;
  if (!productId) {
    return notFound();
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/item/get/${productId}`,
      {
        cache: "no-store",
      }
    );
    const product: Item | null = await response.json();

    if (!product) {
      return notFound();
    }

    const { favorites } = await getAllFavorites(userId);

    return (
      <main className="mt-5 mb-10 flex flex-col items-center w-full h-auto gap-5">
        <section className="w-[90%] mx-auto p-4 pt-2 bg-white rounded-lg shadow-md">
          <div className="flex item-center gap-1 w-full h-auto">
            <Link
              className="text-xs font-normal text-gray-500 hover:underline"
              href="/"
            >
              Home
            </Link>
            <ChevronRight className="text-gray-500" size={15} />
            <p className="text-xs font-normal text-[#fabf2c]">{product.name}</p>
          </div>
          <ProductDescription product={product} favorites={favorites} />
        </section>
        <div className="w-[90%] mx-auto relative min-h-12">
          <hr className="bg-categorySeparatorGradient absolute inset-0 w-[30%] min-[400px]:w-[34%] md:w-[37%] my-auto h-px block" />
          <h3 className="text-sm sm:text-lg lg:text-xl font-bold absolute inset-0 w-1/2 mx-auto flex items-center justify-center">{`More in ${product.cat_name}`}</h3>
          <hr className="bg-categorySeparatorGradient absolute inset-0 w-[30%] min-[400px]:w-[34%] md:w-[37%] my-auto ml-auto h-px block" />
        </div>
        <section className="w-[90%] mx-auto p-4 pt-2 bg-white rounded-lg shadow-md">
          <Suspense
            fallback={<LoadingSpinner className="w-full min-h-[500px]" />}
          >
            <RelatedProducts
              categoryId={product.category_id}
              productId={product.id}
              favorites={favorites}
            />
          </Suspense>
        </section>
      </main>
    );
  } catch (error) {
    return <ServiceError />;
  }
}
