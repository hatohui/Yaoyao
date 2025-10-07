import useFoods from "@/hooks/useFoods";
import React from "react";

export type FoodGalleryProps = {
  className?: string;
  category?: string | null;
};

const FoodGallery = ({ className, category }: FoodGalleryProps) => {
  const { data: foods, isLoading } = useFoods(category);

  if (isLoading) return <div>Loading...</div>;
  if (!foods || foods.length === 0) return <div>No foods available.</div>;

  return (
    <div className={className}>
      <h2>Food Gallery</h2>
      {category && <p>Category: {category}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {foods.map((food) => (
          <div key={food.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">{food.name}</h3>
            <p className="text-sm text-gray-600">{food.description}</p>
            <div className="mt-2">
              {food.variants?.map((variant, index) => (
                <div key={index} className="text-sm">
                  {variant.label ? (
                    <span className="font-medium">{variant.label}: </span>
                  ) : (
                    <span className="font-medium">Price: </span>
                  )}
                  {variant.price && (
                    <span>
                      {variant.price} {variant.currency}
                    </span>
                  )}
                  {variant.isSeasonal && (
                    <span className="ml-2 text-xs text-green-600">
                      (Seasonal)
                    </span>
                  )}
                  {!variant.available && (
                    <span className="ml-2 text-xs text-red-600">
                      (Unavailable)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodGallery;
