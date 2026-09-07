"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Buscar museu por nome, categoria ou palavra-chave...",
  className = "",
  autoFocus = false,
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-deep">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full pl-12 pr-10 py-3.5 bg-white border border-stone rounded-none text-night placeholder-stone-dark text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-200 shadow-sm"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-dark hover:text-night transition-colors"
          aria-label="Limpar busca"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
