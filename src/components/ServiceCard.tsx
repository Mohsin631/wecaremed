import { Card } from "@/components/ui/card";

interface ServiceCardProps {
  imageSrc: string;     
  title: string;
  description: string;
  className?: string;
}

const ServiceCard = ({ imageSrc, title, description, className = "" }: ServiceCardProps) => {
  return (
    <Card
      className={`w-96 h-96 mx-auto flex flex-col items-center justify-center p-10 bg-[#B5EEF0] text-black hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in ${className}`}
    >
      {/* Icon (no shade behind) */}
      <img
        src={imageSrc}
        alt={title}
        className="w-28 h-28 md:w-32 md:h-32 object-contain mb-6"
      />

      {/* Title + Description */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold text-black">{title}</h3>
        <p className="text-gray-700 text-base leading-relaxed">{description}</p>
      </div>
    </Card>
  );
};

export default ServiceCard;
