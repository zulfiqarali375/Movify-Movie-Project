export const CardSkeleton = () => {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-gray-800 animate-pulse aspect-[2/3]">
      <div className="w-full h-full bg-gray-700"></div>
    </div>
  );
};

export const BannerSkeleton = () => {
  return (
    <div className="w-full h-[60vh] md:h-[80vh] bg-gray-800 animate-pulse relative">
      <div className="absolute bottom-1/4 left-4 md:left-12 space-y-4 w-3/4 md:w-1/2">
        <div className="h-12 bg-gray-700 rounded w-3/4"></div>
        <div className="space-y-2 mt-4">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded w-4/6"></div>
        </div>
        <div className="flex space-x-3 mt-6">
          <div className="w-32 h-10 bg-gray-700 rounded"></div>
          <div className="w-32 h-10 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};
