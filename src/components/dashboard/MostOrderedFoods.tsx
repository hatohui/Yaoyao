"use client";
import useMostOrderedFoods from "@/hooks/food/useMostOrderedFoods";
import Loading from "@/components/common/Loading";

type Props = {
  limit?: number;
};

const MostOrderedFoods = ({ limit = 7 }: Props) => {
  const { data, isLoading, isError } = useMostOrderedFoods(limit);

  if (isLoading) {
    return (
      <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div className="text-sm text-red-600 dark:text-red-400">
          Failed to load
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
        Most ordered foods
      </h3>
      {data && data.length > 0 ? (
        <ul className="space-y-2">
          {data.map((item) => (
            <li key={item.foodId} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                  {item.food?.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.food.imageUrl}
                      alt={item.food.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-xs text-slate-500">No image</div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {item.food?.name ?? item.foodId}
                  </div>
                  <div className="text-xs text-slate-500">
                    {item.food?.variants?.[0]?.label ?? ""}
                  </div>
                </div>
              </div>

              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {item.quantity}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-slate-500">No orders yet</div>
      )}
    </div>
  );
};

export default MostOrderedFoods;
