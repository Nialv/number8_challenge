import React, { useState, useEffect, useRef } from "react";

const ImageWithFetch: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (isInitialMount.current || !imageSrc) {
      fetchImage();
      isInitialMount.current = false;
    }

    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [src, imageSrc]);

  return imageSrc ? (
    <img className={className} src={imageSrc} alt={alt} />
  ) : null;
};

export default ImageWithFetch;