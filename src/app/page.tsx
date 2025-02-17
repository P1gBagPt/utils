'use client';

import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const imageArray = [
    { src: "/json.png", path: "/json-comparer" },
    { src: "/path-to-image2.jpg", path: "/path2" },
    { src: "/path-to-image3.jpg", path: "/path3" },
    { src: "/path-to-image4.jpg", path: "/path4" },
    { src: "/path-to-image5.jpg", path: "/path5" },
    { src: "/path-to-image6.jpg", path: "/path6" },
    { src: "/path-to-image7.jpg", path: "/path7" },
    { src: "/path-to-image8.jpg", path: "/path8" },
    { src: "/path-to-image9.jpg", path: "/path9" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="grid grid-cols-3 gap-4 max-w-3xl w-full">
        {imageArray.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <Card className="w-40 h-40 relative">
              <Link href={image.path}>
                <Image
                  src={image.src}
                  alt={`Card ${index + 1}`}
                  layout="intrinsic"
                  width={100}
                  height={100}
                  className="object-contain w-full h-full group-hover:scale-110 transition-all duration-300"
                />
              </Link>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
