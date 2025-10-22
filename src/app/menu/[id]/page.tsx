import { Metadata } from "next";
import { TranslatedFood } from "@/types/models/food";
import { getFoodById } from "@/repositories/food-repo";
import FoodDetailContent from "@/components/menu/food-details/FoodDetailContent";
import { cookies } from "next/headers";
import { Language, SUPPORTED_LANGS } from "@/common/language";
import { mapFoodToResponse } from "@/utils/mappers/mapFoodToResponse";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getCurrentLocale(): Promise<Language> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value as Language | undefined;
  return SUPPORTED_LANGS.includes(cookieLocale as Language)
    ? (cookieLocale as Language)
    : "en";
}

async function getFoodDataForMetadata(
  id: string,
  locale: Language
): Promise<TranslatedFood | null> {
  try {
    const food = await getFoodById(id, locale);
    if (!food) return null;
    const mappedFood = mapFoodToResponse(food as TranslatedFood);
    return mappedFood;
  } catch (error) {
    console.error("Error fetching food data for metadata:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const locale = await getCurrentLocale();
  const food = await getFoodDataForMetadata(id, locale);

  if (!food) {
    return {
      title: "Food Not Found",
      description: "The requested food item could not be found.",
    };
  }

  const foodName = food.name;
  const foodDescription =
    food.description || "View this delicious dish from our menu";
  const foodImage = food.imageUrl || "/default-food-image.jpg";

  const firstPrice = food.variants?.[0]?.price;
  const priceText = firstPrice
    ? ` - ${firstPrice} ${food.variants?.[0]?.currency || "RM"}`
    : "";

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    ),
    title: `${foodName}${priceText} | Menu`,
    description: foodDescription,
    openGraph: {
      title: `${foodName}${priceText}`,
      description: foodDescription,
      images: [
        {
          url: foodImage,
          width: 1200,
          height: 630,
          alt: foodName,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${foodName}${priceText}`,
      description: foodDescription,
      images: [foodImage],
    },
  };
}

export default async function FoodDetailPage({ params }: PageProps) {
  const { id } = await params;

  return <FoodDetailContent foodId={id} />;
}
