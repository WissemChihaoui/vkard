// Autocomplete.jsx
import React, { useEffect, useRef, useState } from "react";
import Input from "../input/input";

/**
 * Props
 * - options: array of { value, label, [meta...] }
 * - value: for controlled single value (object or null)
 * - defaultValue: for uncontrolled single
 * - onChange: (value) => void
 * - multiple: boolean (tags mode)
 * - placeholder
 * - name
 * - label
 * - renderOption: (option) => ReactNode
 * - getOptionLabel: (option) => string
 * - disabled
 */
export default function Autocomplete({
  options = [],
  value,
  defaultValue = null,
  onChange,
  multiple = false,
  placeholder = "",
  name,
  label,
  renderOption,
  getOptionLabel = (o) => (o ? o.label ?? String(o.value ?? "") : ""),
  disabled = false,
}) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(
    multiple ? (defaultValue || []) : (defaultValue || null)
  );
  const selected = isControlled ? value : internalValue;

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const containerRef = useRef(null);

  // compute filtered options (case-insensitive)
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = options.filter((opt) =>
    getOptionLabel(opt).toLowerCase().includes(normalizedQuery)
  );

  useEffect(() => {
    function handleOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, []);

  function setValue(next) {
    if (!isControlled) setInternalValue(next);
    if (onChange) onChange(next);
  }

  function handleSelect(option) {
    if (multiple) {
      const already = Array.isArray(selected) && selected.find((s) => s.value === option.value);
      let next;
      if (already) {
        next = selected.filter((s) => s.value !== option.value);
      } else {
        next = Array.isArray(selected) ? [...selected, option] : [option];
      }
      setValue(next);
      setQuery("");
      setOpen(true);
      setActiveIndex(-1);
      if (inputRef.current) inputRef.current.focus();
    } else {
      setValue(option);
      setQuery(getOptionLabel(option));
      setOpen(false);
    }
  }

  function handleRemoveTag(option) {
    if (!multiple) return;
    const next = selected.filter((s) => s.value !== option.value);
    setValue(next);
  }

  function handleInputFocus() {
    setOpen(true);
    setActiveIndex(-1);
  }

  function handleInputChange(e) {
    const v = e.target.value;
    setQuery(v);
    setOpen(true);
    if (!multiple) setValue(null); // clear selected if typing in single mode
  }

  function handleKeyDown(e) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) setOpen(true);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      scrollIntoView(activeIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      scrollIntoView(activeIndex - 1);
    } else if (e.key === "Enter") {
      if (open && activeIndex >= 0 && filtered[activeIndex]) {
        e.preventDefault();
        handleSelect(filtered[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    } else if (e.key === "Backspace" && multiple && query === "") {
      // remove last tag when empty
      if (Array.isArray(selected) && selected.length) {
        const next = selected.slice(0, -1);
        setValue(next);
      }
    }
  }

  function scrollIntoView(idx) {
    // basic scroll logic
    const list = listRef.current;
    if (!list) return;
    const item = list.querySelector(`#ac-item-${idx}`);
    if (item) item.scrollIntoView({ block: "nearest" });
  }

  // show label for single selected
  useEffect(() => {
    if (!multiple) {
      const labelText = selected ? getOptionLabel(selected) : "";
      setQuery(labelText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* The Input with the same style */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* for multiple: render tags */}
        {multiple && Array.isArray(selected) && selected.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {selected.map((s) => (
              <span
                key={s.value}
                className="flex items-center gap-2 px-2 py-1 rounded-md bg-gray-800 text-sm text-gray-200"
              >
                <span className="truncate max-w-xs">{getOptionLabel(s)}</span>
                <button
                  type="button"
                  aria-label={`Remove ${getOptionLabel(s)}`}
                  onClick={() => handleRemoveTag(s)}
                  className="text-xs opacity-70 hover:opacity-100 ml-1"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <Input
            label={label}
            name={name}
            placeholder={placeholder}
            value={query}
            onFocus={handleInputFocus}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby={name}
          className="absolute z-50 mt-1 w-full max-h-48 overflow-auto rounded-md shadow-lg bg-gray-900 border border-gray-800"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gray-400">No results</li>
          ) : (
            filtered.map((opt, idx) => {
              const isActive = idx === activeIndex;
              return (
                <li
                  id={`ac-item-${idx}`}
                  key={opt.value}
                  role="option"
                  aria-selected={isActive}
                  onMouseDown={(e) => {
                    // use onMouseDown to prevent input blur before click
                    e.preventDefault();
                    handleSelect(opt);
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`cursor-pointer px-3 py-2 text-sm truncate ${
                    isActive ? "bg-gray-700 text-white" : "text-gray-200 hover:bg-gray-800"
                  }`}
                >
                  {renderOption ? renderOption(opt) : getOptionLabel(opt)}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
