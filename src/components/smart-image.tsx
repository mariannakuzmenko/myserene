import { useEffect, useState } from "react";
import { FALLBACK_IMAGE } from "@/lib/images";

/**
 * Image with a guaranteed visual: soft gradient placeholder while loading,
 * curated fallback photo if the source ever fails. Never leaves a blank box.
 */
export function SmartImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
}: {
  src?: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}) {
  const [current, setCurrent] = useState(src || FALLBACK_IMAGE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCurrent(src || FALLBACK_IMAGE);
    setLoaded(false);
  }, [src]);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-gradient-to-br from-sky-ice to-sky-mist ${wrapperClassName}`}>
      <img
        src={current}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (current !== FALLBACK_IMAGE) setCurrent(FALLBACK_IMAGE);
          setLoaded(true);
        }}
        className={`h-full w-full object-cover object-center transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </div>
  );
}
