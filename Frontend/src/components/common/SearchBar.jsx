import { X, Search } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// Debounced search input with dark theme styling
// Calls onSearch 400ms after user stops typing

const SearchBar = ({ value, onChange, onSearch, placeholder = "Search..." }) => {
  const [internalValue, setInternalValue] = useState(value || "");

  // Sync internal value with external prop
  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(internalValue);
    }, 400);

    return () => clearTimeout(timer);
  }, [internalValue, onSearch]);

  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  }, [onChange]);

  const handleClear = useCallback(() => {
    setInternalValue("");
    onChange?.("");
    onSearch?.("");
  }, [onChange, onSearch]);

  return (
    <div className="relative w-full">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
        size={18}
      />
      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-11 pl-10 pr-10 rounded-md bg-[#111111] text-white text-sm placeholder:text-[#F5E9D7]/40 border border-white/[0.08] transition-colors duration-200 focus:outline-none focus:border-[#F5E9D7]"
      />
      {internalValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;