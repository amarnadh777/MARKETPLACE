import Image from "next/image";

interface BannerProps {
  image: string;
  alt?: string;
  title?: string;
  height?: number;
  buttonText?: string;
}

export default function Banner({
  image,
  alt = "Banner",
  title = "",
  height = 400,
  buttonText,
}: BannerProps) {
  return (
    <section className="w-full relative">
      <Image
        src={image}
        alt={alt}
        width={1200}
        height={height}
        className="w-full object-cover rounded-xl"
        style={{ height: `${height}px` }}
      />

      {(title || buttonText) && (
        <div className="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-6 lg:px-10">
          {title && (
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white drop-shadow-lg mb-3 sm:mb-4 leading-tight">
              {title}
            </h1>
          )}

          {buttonText && (
            <button
              className="px-4 sm:px-6 py-2 sm:py-3 bg-[#304EA1] text-white text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:bg-blue-700 transition"
            >
              {buttonText}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
