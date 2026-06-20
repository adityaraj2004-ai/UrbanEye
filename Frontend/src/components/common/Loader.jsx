// Centered loading spinner with cream (#F5E9D7) accent
// fullScreen = true → fills viewport, false → centers in parent

const sizeMap = {
  sm: "h-6 w-6 border-2",
  md: "h-10 w-10 border-[3px]",
  lg: "h-14 w-14 border-4",
};

const Loader = ({ size = "md", fullScreen = false, text }) => {
  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`rounded-full border-[#F5E9D7] border-t-transparent animate-spin ${sizeMap[size]}`}
        aria-hidden="true"
      />
      {text && (
        <p className="text-sm text-neutral-400">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center h-screen">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full py-12">
      {spinner}
    </div>
  );
};

export default Loader;