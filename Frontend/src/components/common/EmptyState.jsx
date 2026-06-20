import { Button } from "../ui/Button";

// Empty state for lists with no items
// Dark theme, muted icon, optional action button

const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16">
      {Icon && (
        <div className="mb-5">
          <Icon size={48} className="text-[#A1A1A1]" strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-neutral-400 max-w-xs mb-6">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button variant="filled" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;