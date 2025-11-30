"use client";
import Image from "next/image";
import { FiImage } from "react-icons/fi";
// import { useCopyToClipboard } from "@/hooks/common/useCopyToClipboard";
import { useSearchParams } from "next/navigation";
import { mergeQueryParams } from "@/utils/params/mergeQueryParams";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

type FoodCardProps = {
  food: {
    id: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    available: boolean;
    variants?: Array<{
      label: string;
      price?: number | null;
      currency?: string | null;
      isSeasonal?: boolean;
      available?: boolean;
    }>;
  };
  translatedName: string;
  translatedDescription?: string | null;
  t: (key: string) => string;
};

const FoodCard = ({
  food,
  translatedName,
  translatedDescription,
  t,
}: FoodCardProps) => {
  // const { copied, copyToClipboard } = useCopyToClipboard();
  const searchParams = useSearchParams();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  // const handleCopyLink = async (e: React.MouseEvent) => {
  //   e.preventDefault();

  //   // Generate URL with preserved query params (especially lang)
  //   const queryString = mergeQueryParams(searchParams, {});
  //   const foodUrl = `${
  //     typeof window !== "undefined" ? window.location.origin : ""
  //   }/menu/${food.id}${queryString ? `?${queryString}` : ""}`;

  //   await copyToClipboard(foodUrl);
  // };

  const handleMouseEnter = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  return (
    <Link
      href={`/menu/${food.id}?${mergeQueryParams(searchParams, {})}`}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      className={`bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer border border-main/10 dark:border-slate-700 hover:border-main/30 dark:hover:border-main/50 relative group flex flex-col h-full`}
    >
      {/* Fixed Height Image */}
      <div
        ref={imageRef}
        className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 flex-shrink-0 overflow-hidden"
      >
        {food.imageUrl ? (
          <Image
            src={food.imageUrl}
            alt={translatedName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FiImage className="w-16 h-16 text-slate-300 dark:text-slate-500" />
          </div>
        )}

        {/* Copy Link Indicator - Shows on hover and when copied */}
        {/* <div
          className={`absolute top-2 left-2 px-2.5 py-1 text-white text-xs font-semibold rounded-full shadow-lg transition-all ${
            copied
              ? "bg-green-500 dark:bg-green-600 opacity-100"
              : "bg-main/80 dark:bg-main/70 opacity-0 group-hover:opacity-100"
          }`}
        >
          {copied ? (
            <span className="flex items-center gap-1">
              <FiCheck className="w-3 h-3" />
              {t("linkCopied")}
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <FiLink className="w-3 h-3" />
              {t("clickToCopyLink")}
            </span>
          )}
        </div> */}
      </div>

      {/* Content - Fixed layout */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-bold mb-1 line-clamp-2 text-slate-900 dark:text-slate-100">
          {translatedName}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 flex-grow mb-3">
          {translatedDescription || " "}
        </p>

        {/* Variants/Prices - Bottom aligned */}
        <div className="mt-auto">
          {food.variants && food.variants.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-main/10 dark:border-slate-700">
              {food.variants.map((variant, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-sm text-darkest dark:text-slate-300 font-medium truncate">
                    {variant.label || t("price")}:
                  </span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {variant.price && (
                      <span className="text-base font-bold text-main dark:text-main whitespace-nowrap">
                        {variant.price} {variant.currency || "RM"}
                      </span>
                    )}
                    <div className="flex gap-1">
                      {variant.isSeasonal && (
                        <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-medium rounded whitespace-nowrap">
                          {t("seasonal")}
                        </span>
                      )}
                      {!variant.available && (
                        <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-medium rounded whitespace-nowrap">
                          {t("unavailable")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FoodCard;
