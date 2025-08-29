import { Card } from "@/components/ui/card";

interface HowItWorksCardProps {
  step: number;
  title: string;
  description: string;
  iconSrc: string;
  delay?: number;
}

const HowItWorksCard = ({ step, title, description, iconSrc, delay = 0 }: HowItWorksCardProps) => {
  return (
    <Card
      className="relative p-8 hover:shadow-medium transition-all duration-300 hover:scale-[1.02] animate-fade-in mx-4 overflow-hidden"
      style={{
        animationDelay: `${delay}ms`,
        background: "#B5EEF0", // ✅ card background
      }}
    >
      {/* 2-column layout: text on left, icon on right */}
      <div className="grid grid-cols-1 md:[grid-template-columns:1fr_auto] gap-6 items-center">
        {/* Left: Step + Title + Description */}
        <div className="min-w-0 pr-4">
          <div className="flex items-center gap-4 mb-4">
            {/* Step circle */}
            <div
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: "#12262A" }} // ✅ step circle color
            >
              {step}
            </div>
            <h3
              className="text-xl font-semibold"
              style={{ color: "#12262A" }} // ✅ heading color
            >
              {title}
            </h3>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Right: Icon */}
        <div className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-2xl flex items-center justify-center">
          <img
            src={iconSrc}
            alt={`${title} icon`}
            className="w-full h-full object-contain p-2"
          />
        </div>
      </div>
    </Card>
  );
};

export default HowItWorksCard;
