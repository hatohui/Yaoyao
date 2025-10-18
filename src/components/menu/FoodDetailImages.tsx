import Image from "next/image";
import { FiImage } from "react-icons/fi";

type FoodDetailImagesProps = {
  imageUrl?: string | null;
  name: string;
};

const FoodDetailImages = ({ imageUrl, name }: FoodDetailImagesProps) => {
  return (
    <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-lg overflow-hidden shadow-md">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          priority
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <FiImage className="w-16 h-16 sm:w-20 sm:h-20 text-slate-300 dark:text-slate-500 mb-2" />
          <p className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm">
            No image available
          </p>
        </div>
      )}
    </div>
  );
};

export default FoodDetailImages;
