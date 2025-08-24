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
    <section
      className="w-full relative rounded-xl overflow-hidden"
      style={{ height: `${height}px` }}
    >
      {/* Responsive Image */}
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        priority
      />

      {(title || buttonText) && (
        <div className="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-6 lg:px-10">
          {title && (
          <h1 className="text-xl sm:text-1xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-white drop-shadow-lg mb-3 sm:mb-4 leading-tight">
          {title}
        </h1>
          )}

          {buttonText && (
            <button className="px-4 sm:px-6 py-2 sm:py-3 bg-[#304EA1] text-white text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:bg-blue-700 transition">
              {buttonText}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
