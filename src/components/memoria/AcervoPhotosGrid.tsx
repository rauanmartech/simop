"use client";

import React, { useState } from "react";
import { MemoriaPhoto } from "@/types/memoria";
import { MemoriaPhotoCard } from "./MemoriaPhotoCard";
import { PhotoLightboxModal } from "./PhotoLightboxModal";

interface AcervoPhotosGridProps {
  photos: MemoriaPhoto[];
}

export const AcervoPhotosGrid: React.FC<AcervoPhotosGridProps> = ({ photos }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {photos.map((photo, index) => (
          <MemoriaPhotoCard
            key={photo.id}
            photo={photo}
            aspectRatio="aspect-[4/3]"
            showCaption={true}
            onClick={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      <PhotoLightboxModal
        photos={photos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </>
  );
};
