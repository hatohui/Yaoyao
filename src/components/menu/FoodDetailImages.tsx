import Image from "next/image";
import { FiImage } from "react-icons/fi";

type FoodDetailImagesProps = {
  imageUrl?: string | null;
  name: string;
};

const FoodDetailImages = ({ imageUrl, name }: FoodDetailImagesProps) => {
  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-lg overflow-hidden shadow-lg">
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
          <FiImage className="w-24 h-24 sm:w-32 sm:h-32 text-slate-300 dark:text-slate-500 mb-4" />
          <p className="text-slate-400 dark:text-slate-500 text-sm sm:text-base">
            No image available
          </p>
        </div>
      )}
    </div>
  );
};

export default FoodDetailImages;
