const ArtworkSkeleton = () => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl shadow-elegant bg-soft-beige animate-pulse">
        <div className="w-full h-64 bg-gentle-green/10" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="h-6 bg-gentle-green/20 rounded mb-2" />
          <div className="h-4 bg-gentle-green/15 rounded w-3/4 mb-1" />
          <div className="h-3 bg-gentle-green/10 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default ArtworkSkeleton;