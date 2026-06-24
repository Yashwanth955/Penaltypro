import React from "react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/assets/logo/logo_PP.png"
        alt="PenaltyPro"
        title="PenaltyPro"
        className="h-8 sm:h-10 md:h-12 w-auto max-w-[280px] mr-4 object-contain"
      />
    </div>
  );
}
