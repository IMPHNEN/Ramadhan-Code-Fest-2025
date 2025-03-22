// src/app/error.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after 3 seconds
    const timer = setTimeout(() => {
      router.push("/quran");
    }, 3000);

    // Clear timer if component is unmounted
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Terjadi Kesalahan!</h1>
      <a href="/quran" className="mt-4 bg-secondary text-xl rounded-full">
        👈🏻Go Back
      </a>
    </div>
  );
};

export default ErrorPage;
