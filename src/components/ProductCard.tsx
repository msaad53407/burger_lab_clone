"use client";

import QuantityCounter from "@/components/cart/QuantityCounter";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useCart from "@/hooks/useCart";
import {
  cn,
  formatPrice,
  removePropFromObject,
  textShortener,
} from "@/lib/utils";
import { CartItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import LikeButton from "./LikeButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";
import { XIcon } from "lucide-react";  
import { Button } from "./ui/button";
import useProductDescription from "@/hooks/useProductDescription";
import { cartItemKeys } from "@/lib/constants";
import { Item } from "@/models/Item";
import { Favorite } from "@/models/Favorites";
import ProductDescription from "@/app/product/components/ProductDescription";
import DescriptionModal from "./modals/DescriptionModal";

function ProductCard({
  product,
  className,
  favorites,
}: {
  product: Item;
  className?: string;
  favorites: Favorite[] | null | undefined;
}) {
  const { addItemToCart } = useCart();
  const [isFav, setIsFav] = useState(() => {
    return !!favorites?.some((favorite) => favorite.itemid === product.id);
  });
  const { item, totalPrice, quantityToAdd } = useProductDescription(product);

  const cartItem = removePropFromObject<CartItem>(cartItemKeys, product);
  return (
    <Card
      className={cn(
        "w-40 min-[500px]:w-52 min-h-[430px] max-h-[450px] rounded-2xl transition-colors border-2 hover:border-primaryOrange flex flex-col",
        className
      )}
    >
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex-1 cursor-pointer">
            <CardHeader title={product.name} className="relative p-2 max-w-[200px]">
              <div className="flex items-center w-full justify-center">
                <Image
                  src={"/cards-img2.jpeg"}
                  width={100}
                  height={100}
                  priority
                  alt="product-image"
                  className="rounded-2xl object-fill w-full h-auto"
                />
              </div>
              <LikeButton itemId={product.id} isFav={isFav} setIsFav={setIsFav} />
            </CardHeader>
            <CardContent
              title={product.description ?? ""}
              className="flex flex-col items-center justify-center py-3 min-h-[88px] px-2"
            >
              <h4 className="font-bold text-md text-center min-h-12 flex items-center justify-center">
                {product.name}
              </h4>
              {product.description ? (
                <p className="text-sm font-normal text-gray-500 text-center">
                  {textShortener(product.description, 40)}
                </p>
              ) : null}
            </CardContent>
          </div>
        </DialogTrigger>
        <DialogContent className="w-[95%] sm:w-[80%] max-w-full min-h-[80%] h-max sm:h-auto flex flex-col sm:flex-row p-0 gap-0 rounded-3xl border-0">
          <ProductDescription product={product} favorites={favorites || null} />
          <DialogClose className="bg-black/80 p-1 rounded-xl text-white right-2 top-2">
            <XIcon className="w-6 h-6" />
          </DialogClose>
        </DialogContent>
      </Dialog>
      <hr className="bg-categorySeparatorGradient w-[95%] mx-auto h-px my-1 block" />
      <CardFooter
        title="Add to cart"
        className="flex flex-col items-center justify-center gap-1 pt-5 pb-3"
      >
        <p className="text-md- text-center font-bold">
          {formatPrice(product.price)}
        </p>
        {/*
        If the item is not in cart, check whether it has add-ons or not, If it has add-ons, then display a DescriptionModal, else display a button to add to cart. And Finally display counter for quantity if the item is in cart
        */}
        {!item.isItemInCart ? (
          product.addOns ? (
            <DescriptionModal product={product} />
          ) : (
            <Button
              variant="outline"
              onClick={() =>
                addItemToCart({
                  ...cartItem,
                  quantity: quantityToAdd,
                  totalPerPriceWithAddOns: totalPrice,
                })
              }
              className={
                "p-4 font-bold text-black bg-[#fabf2c] rounded-3xl !hover:border-[#fabf2c]"
              }
            >
              Add to Cart
            </Button>
          )
        ) : (
          <QuantityCounter
            itemId={product.id}
            quantity={item.itemInCart!.quantity ?? 0}
            className="bg-accent rounded-2xl p-2 max-h-10"
          />
        )}
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
