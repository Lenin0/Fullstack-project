import Image from "next/image";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="px-2 w-full">
      <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl">Page not Found</h2>
        <Image
          className="m-0 rounded-xl"
          src="/img/page-not-found.jpg"
          alt="cat image, whit page not found"
          width={600}
          height={600}
          priority={true}
          sizes="300px"
        />
      </div>
    </div>
  );
}
