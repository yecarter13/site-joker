"use client";

import { useState } from "react";
import { FaTiktok, FaFacebook, FaShareAlt } from "react-icons/fa";

const TIKTOK_URL = "https://www.tiktok.com/@espace_habitat?_r=1&_t=ZS-97tEIgmfz8r";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61591218195078";

export default function FloatingSocialBubble() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-3">
      {open && (
        <>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            title="TikTok"
          >
            <FaTiktok size={20} />
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            title="Facebook"
          >
            <FaFacebook size={20} />
          </a>
        </>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all cursor-pointer"
        title="Réseaux sociaux"
      >
        <FaShareAlt size={20} className={open ? "" : "ml-1"} />
      </button>
    </div>
  );
}