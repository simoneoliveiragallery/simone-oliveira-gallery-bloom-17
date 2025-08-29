interface SimpleArtworkImageProps {
  src: string;
  alt: string;
  className?: string;
}

const SimpleArtworkImage = ({ src, alt, className = "" }: SimpleArtworkImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-64 object-cover ${className}`}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
          parent.innerHTML = `
            <div class="w-full h-64 bg-gentle-green/10 flex items-center justify-center">
              <span class="text-deep-black/50 font-helvetica text-sm">Erro ao carregar imagem</span>
            </div>
          `;
        }
      }}
    />
  );
};

export default SimpleArtworkImage;