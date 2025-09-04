"use client"; // <- Important for client components

import { useState } from "react";
import { Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy");
    }

    setTimeout(() => setCopySuccess(""), 2000);
  };

  return (
    <div className="flex flex-col items-center">
   <button className="p-1 bg-white/20 rounded border border-gray-500 cursor-pointer flex gap-3 transition-all items-center justify-center" onClick={handleCopy} >
   
   {copySuccess ? <span className="text-green-400 text-sm transition-all">{copySuccess}</span> : <Copy className="w-3 h-3" />}
   </button>
      
    </div>
  );
}
