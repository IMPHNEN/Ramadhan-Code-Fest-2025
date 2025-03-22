"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowUpIcon } from "@radix-ui/react-icons";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 150) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-10 right-5">
      {isVisible && (
        <Button
          onClick={scrollToTop}
          variant="outline"
          className="backdrop-blur-sm rounded-xl py-6 mb-10 px-4 shadow-lg size-lg"
        >
          <ArrowUpIcon />
        </Button>
      )}
    </div>
  );
};

export default BackToTopButton;
