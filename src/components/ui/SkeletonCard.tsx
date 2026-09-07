import React from "react";

export const SkeletonCard: React.FC = () => {
  return (
    <div className="clay-card overflow-hidden flex flex-col h-full animate-pulse">
      <div className="w-full h-56 bg-stone/40" />
      <div className="p-6 flex flex-col flex-grow justify-between gap-4">
        <div className="space-y-3">
          <div className="h-4 w-20 bg-stone/50 rounded-none" />
          <div className="h-6 w-3/4 bg-stone/60 rounded" />
          <div className="h-4 w-full bg-stone/30 rounded" />
          <div className="h-4 w-2/3 bg-stone/30 rounded" />
        </div>
        <div className="h-10 w-32 bg-stone/40 rounded-none" />
      </div>
    </div>
  );
};
