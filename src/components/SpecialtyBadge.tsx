interface SpecialtyBadgeProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

const SpecialtyBadge = ({ name, className = "", style }: SpecialtyBadgeProps) => {
  return (
    <div className={`px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-soft border border-teal/20 ${className}`} style={style}>
      <span className="text-sm font-medium text-teal-dark">{name}</span>
    </div>
  );
};

export default SpecialtyBadge;