import { Metadata } from "next";
import { TranslatedFood } from "@/types/models/food";
import { getFoodById } from "@/repositories/food-repo";
import FoodDetailContent from "@/components/menu/FoodDetailContent";
import { cookies } from "next/headers";
import { Language, SUPPORTED_LANGS } from "@/common/language";
import { mapFoodToResponse } from "@/utils/mapFoodToResponse";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Get current locale from cookies or default to 'en'
async function getCurrentLocale(): Promise<Language> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value as Language | undefined;
  return SUPPORTED_LANGS.includes(cookieLocale as Language)
    ? (cookieLocale as Language)
    : "en";
}

// Fetch food data for metadata only (server-side)
async function getFoodDataForMetadata(
  id: string,
  locale: Language
): Promise<TranslatedFood | null> {
  try {
    // Use the repository directly on the server side with proper locale
    const food = await getFoodById(id, locale);
    if (!food) return null;
    // Map the response to extract translated fields
    const mappedFood = mapFoodToResponse(food as TranslatedFood);
    return mappedFood;
  } catch (error) {
    console.error("Error fetching food data for metadata:", error);
    return null;
  }
}

// Generate metadata for Open Graph tags (server-side only)
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
  const priceText = firstPrice ? ` - ${firstPrice} RM` : "";

  return {
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

// Main page component (server component for metadata)
export default async function FoodDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Pass the ID to the client component
  return <FoodDetailContent foodId={id} />;
}
