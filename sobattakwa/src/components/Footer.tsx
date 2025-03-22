// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="right-0 font-light left-0 bottom-0 text-center py-24">
      <span>
        Dibangun oleh{" "}
        <a
          href="https://github.com/kyyril"
          className="text-blue-800 hover:text-secondary underline"
        >
          Kyyril
        </a>
        <a> dengan❤️</a>
      </span>
      <hr className="mt-5" />
    </footer>
  );
};

export default Footer;
