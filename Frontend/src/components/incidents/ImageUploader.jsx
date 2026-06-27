import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const ImageUploader = ({ images = [], onImagesChange, maxImages = 4 }) => {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const validateAndAdd = (files) => {
    const incoming = Array.from(files);
    let combined = [...images];
    let localError = "";

    for (const file of incoming) {
      if (combined.length >= maxImages) {
        localError = `Maximum ${maxImages} images allowed`;
        break;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        localError = "Only JPEG, PNG and WebP images are allowed";
        continue;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        localError = `Each image must be under ${MAX_SIZE_MB}MB`;
        continue;
      }
      combined.push(file);
    }

    setError(localError);
    onImagesChange(combined.slice(0, maxImages));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) validateAndAdd(e.dataTransfer.files);
  };

  const handleRemove = (index) => {
    const next = images.filter((_, i) => i !== index);
    onImagesChange(next);
    setError("");
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-light text-neutral-300">
        Images (optional, max {maxImages})
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-8 cursor-pointer transition-colors ${
          dragOver
            ? "border-[#F5E9D7]/60 bg-[#F5E9D7]/5"
            : "border-white/10 hover:border-white/20 bg-white/5"
        }`}
      >
        <Upload size={20} className="text-neutral-400" />
        <p className="text-xs text-neutral-400 text-center">
          Drag and drop or click to browse
          <br />
          JPEG, PNG, WebP — up to {MAX_SIZE_MB}MB each
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) validateAndAdd(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-2 pt-1">
          {images.map((file, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-md border border-white/10"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`upload-${index}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;