import { Metadata } from "next";
import { TranslatedFood } from "@/types/models/food";
import { getFoodById } from "@/repositories/food-repo";
import FoodDetailContent from "@/components/menu/FoodDetailContent";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Fetch food data for metadata only (server-side)
async function getFoodDataForMetadata(
  id: string
): Promise<TranslatedFood | null> {
  try {
    // Use the repository directly on the server side
    const food = await getFoodById(id, "en");
    return food as TranslatedFood | null;
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
  const food = await getFoodDataForMetadata(id);

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

  // Get first variant price for display
  const firstPrice = food.variants?.[0]?.price;
  const priceText = firstPrice ? ` - ${firstPrice} RM` : "";

  return {
    title: `${foodName}${priceText} | Yaoyao Dinner`,
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
