import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import Header from "@/components/header";
import { 
  MessageCircle, 
  Phone,
  MapPin,
} from "lucide-react";

// Images
import Icon1 from "@/assets/works/1.png";
import Icon2 from "@/assets/works/2.png";
import Icon3 from "@/assets/works/3.png";
import Icon4 from "@/assets/works/4.png";
import Why1 from "@/assets/why/1.png";
import Why2 from "@/assets/why/2.png";
import Why3 from "@/assets/why/3.png";
// You can keep/replace these three if you want different art for the new services section
import Service1 from "@/assets/services/1.png";
import Service2 from "@/assets/services/2.png";
import Service3 from "@/assets/services/3.png";
import CTA1 from "@/assets/CTA/1.png";
import CTA2 from "@/assets/CTA/2.png";
import CTA3 from "@/assets/CTA/3.png";
import CTA4 from "@/assets/CTA/4.png";
import CTA5 from "@/assets/CTA/5.png";
import CTA6 from "@/assets/CTA/6.png";

// Logo
import logoImg from "@/assets/logo.svg";

import BookingModal from "@/components/BookingModal";
import ServiceCard from "@/components/ServiceCard";
import FeatureCard from "@/components/FeatureCard";
import HowItWorksCard from "@/components/HowItWorksCard";
import SpecialtyBadge from "@/components/SpecialtyBadge";
import doctorImage from "@/assets/doctor-hero.svg";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // 👇 Ref to Services section
  const servicesRef = useRef<HTMLDivElement | null>(null);

  const handleExploreClick = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section (you commented out Header) */}
      <header className="relative overflow-hidden bg-gradient-to-br from-background to-teal/5">
        <div className="container mx-auto px-4 py-8 lg:py-5">

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 animate-fade-in text-center lg:text-left">
        {/* Logo */}
        <div className="flex items-center justify-center lg:justify-start">
          <img
            src={logoImg}
            alt="We Care Logo"
            className="w-40 h-28 sm:w-48 sm:h-32 lg:w-60 lg:h-40 object-contain"
          />
        </div>

        {/* Main Heading */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
            Your Personal<br />
            <span className="text-primary">Health Universe</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
            We merge cutting-edge tech with world-class medical expertise to
            give you faster, smarter, and more personal health care.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-center lg:justify-start">
          <Button
            onClick={() => setIsBookingOpen(true)}
            className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-medium hover:shadow-strong transition-all duration-300"
          >
            Book an Appointment
          </Button>
          <Button
            variant="outline"
            onClick={handleExploreClick}
            className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            Explore Services
          </Button>
        </div>
      </div>

            {/* Right Content - Doctor Image with Specialties */}
            <div className="relative animate-slide-up lg:py-10">
              <div className="relative bg-gradient-hero rounded-3xl p-18 overflow-hidden">
                <img
                  src={doctorImage}
                  alt="Professional healthcare doctor"
                  className="w-full h-[700px] object-fill rounded-2xl"
                />

                {/* Sticker-style Specialty Badges */}
                <div className="absolute inset-x-0 bottom-3 h-28 md:h-32 lg:h-36 pointer-events-none">
                  <div className="relative h-full">
                    {/* Row 1 */}
                    <div className="absolute bottom-2 left-[6%] rotate-[-14deg] pointer-events-auto">
                      <SpecialtyBadge name="Home Visit" />
                    </div>
                    <div className="absolute bottom-3 left-[28%] rotate-[-6deg] pointer-events-auto">
                      <SpecialtyBadge name="Telemedicine" />
                    </div>
                    <div className="absolute bottom-4 right-[20%] rotate-[8deg] pointer-events-auto">
                      <SpecialtyBadge name="Physiotherapy" />
                    </div>
                    {/* Row 2 */}
                    <div className="absolute bottom-8 left-[10%] rotate-[-10deg] pointer-events-auto">
                      <SpecialtyBadge name="Registered Nurse" />
                    </div>
                    <div className="absolute bottom-9 left-[40%] rotate-[-4deg] pointer-events-auto">
                      <SpecialtyBadge name="Practical Nurse" />
                    </div>
                    <div className="absolute bottom-8 right-[8%] rotate-[10deg] pointer-events-auto">
                      <SpecialtyBadge name="Pediatrics" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Right */}
          </div>
        </div>
      </header>

      

      {/* How it Works Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="font-bold leading-tight"
              style={{ fontSize: "64px", color: "#12262A" }}
            >
              How it <span className="text-primary">Works</span>
            </h2>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 auto-rows-fr">
            <div className="lg:col-span-3">
              <HowItWorksCard
                step={1}
                title="Choose a Category"
                description="Pick the type of care you need, from primary health to specialty service"
                iconSrc={Icon1}
                delay={0}
              />
            </div>
            <div className="lg:col-span-2">
              <HowItWorksCard
                step={2}
                title="Choose Service"
                description="Select the service you need, we have all the services available"
                iconSrc={Icon2}
                delay={200}
              />
            </div>
            <div className="lg:col-span-2">
              <HowItWorksCard
                step={3}
                title="Choose Staff"
                description="Pick the professional and get appointment details and choose our specialist"
                iconSrc={Icon3}
                delay={400}
              />
            </div>
            <div className="lg:col-span-3">
              <HowItWorksCard
                step={4}
                title="Fill the short form"
                description="Enter your details and appointment time and confirm on whatsapp"
                iconSrc={Icon4}
                delay={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
<section id="about" className="py-16 lg:py-24 bg-gradient-to-br from-background to-teal/5">
  <div className="container mx-auto px-4">
    {/* Heading */}
    <div className="max-w-3xl mx-auto text-center mb-14">
      <h2
        className="font-bold leading-tight"
        style={{ fontSize: "48px", color: "#12262A" }}
      >
        About <span className="text-primary">Us</span>
      </h2>
      <p className="mt-4 text-muted-foreground">
        Care that’s personal, accessible, and built entirely around you.
      </p>
    </div>

    {/* Mission (hero card) */}
    <div className="mb-10">
      <Card className="rounded-3xl overflow-hidden">
        <div className="relative">
          {/* Soft decorative halo */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        </div>

        <div className="relative grid lg:grid-cols-12 gap-8 p-8 lg:p-12">
          {/* Badge column */}
          <div className="lg:col-span-3 flex lg:block items-start">
            <div className="inline-flex items-center gap-3 rounded-full px-4 py-2 bg-white shadow-sm ring-1 ring-black/5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#12262A" }}>
                {/* Heart icon */}
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth="2">
                  <path d="M20.8 11.4c0 4.6-6.8 8-8.8 9-2-1-8.8-4.4-8.8-9a5.2 5.2 0 0 1 9-3.4 5.2 5.2 0 0 1 8.6 3.4z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-semibold" style={{ color: "#12262A" }}>Our Mission</span>
            </div>
          </div>

          {/* Content column */}
          <div className="lg:col-span-9 space-y-4">
            <h3 className="text-2xl lg:text-3xl font-bold" style={{ color: "#12262A" }}>
              Making healthcare accessible & truly patient-centric
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              At We Care, our mission is to make healthcare more accessible and centered around the needs of each
              individual. We provide <strong>home healthcare</strong>—licensed staff visit patients at their homes—
              and <strong>telemedicine</strong> via phone or video for those who prefer remote care or face
              challenges reaching a clinic.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Both services reduce barriers to care and help patients manage their health with greater comfort and
              flexibility. With just a few clicks, our licensed medical professionals will be at your service—making
              access to care not only possible, but easy.
            </p>

            {/* Quick highlights */}
            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              {[
                { label: "Home Visits", sub: "Licensed professionals" },
                { label: "Telemedicine", sub: "Phone & video consults" },
                { label: "Market Rates", sub: "No extra convenience fees" },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur-sm p-4">
                  <div className="text-sm font-semibold" style={{ color: "#12262A" }}>{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>

    {/* 3 columns: Approach, Vision, Values */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Approach */}
      <Card className="rounded-3xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#12262A" }}>
            {/* UserCheck */}
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="m16 11 2 2 4-4" />
            </svg>
          </span>
          <h4 className="text-xl font-bold" style={{ color: "#12262A" }}>Our Approach to Care</h4>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Feeling safe starts with choosing who cares for you. We offer a diverse network of healthcare workers so
          you can select a provider who fits your preferences, language, and background. Healthcare that feels less
          clinical and more personal—built on trust, familiarity, and genuine care.
        </p>
      </Card>

      {/* Vision */}
      <Card className="rounded-3xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#12262A" }}>
            {/* Activity */}
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 12h-4l-3 9-6-18-3 9H2" />
            </svg>
          </span>
          <h4 className="text-xl font-bold" style={{ color: "#12262A" }}>Our Vision</h4>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          To meet the needs of patients across the Middle East as the region’s most trusted provider of home-based
          and virtual care—delivering safe, accessible, and reliable healthcare through a growing network of highly
          qualified physicians and nurses.
        </p>
      </Card>

      {/* Values */}
      <Card className="rounded-3xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#12262A" }}>
            {/* Shield/Heart combo look via simple heart */}
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth="2">
              <path d="M20.8 11.4c0 4.6-6.8 8-8.8 9-2-1-8.8-4.4-8.8-9a5.2 5.2 0 0 1 9-3.4 5.2 5.2 0 0 1 8.6 3.4z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h4 className="text-xl font-bold" style={{ color: "#12262A" }}>Our Values</h4>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We’re guided by three core values—patient satisfaction, reliability, and personalized care.
        </p>
        <ul className="space-y-2">
          {[
            { title: "Patient Satisfaction", desc: "Every interaction should leave patients feeling seen and supported." },
            { title: "Reliability", desc: "We show up on time and follow through—consistently." },
            { title: "Personalized Care", desc: "Care shaped around preferences, background, and comfort." },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#12262A" }} />
              <div>
                <div className="font-semibold" style={{ color: "#12262A" }}>{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  </div>
</section>


{/* Our Services Section */}
<section
  id="services"
  ref={servicesRef}
  className="py-16 lg:py-24 bg-muted/30 scroll-mt-24"
>
  <div className="container mx-auto px-4">
    <div className="max-w-3xl mx-auto text-center mb-14">
      <h2
        className="font-bold leading-tight"
        style={{ fontSize: "48px", color: "#12262A" }}
      >
        Our <span className="text-primary">Services</span>
      </h2>
    </div>

    {/* Responsive: horizontal scroll on mobile, grid on desktop */}
    <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
      <ServiceCard
        imageSrc={Service1}
        title="Rehabilitation & Therapy"
        description="Physiotherapist • Occupational Therapist • Speech Therapist • Nutritionist"
        className="min-w-[85%] sm:min-w-[70%] md:min-w-0" // wider on mobile, resets in grid
      />
      <ServiceCard
        imageSrc={Service2}
        title="Physiotherapist"
        description="Personalized programs to restore movement, reduce pain, and improve function."
        className="min-w-[85%] sm:min-w-[70%] md:min-w-0"
      />
      <ServiceCard
        imageSrc={Service3}
        title="Occupational / Speech / Nutrition"
        description="Daily-living support, speech & language therapy, and tailored nutrition plans."
        className="min-w-[85%] sm:min-w-[70%] md:min-w-0"
      />
    </div>
  </div>
</section>


      {/* Bottom CTA Section */}
      <section className="py-12 lg:py-16 relative overflow-visible">
        <div className="container mx-auto px-4">
          <div className="relative">
            <Card className="bg-gradient-hero p-8 lg:p-12 rounded-3xl overflow-visible">
              <div className="relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Left: Copy + Button */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-lg mb-2" style={{ color: "#12262A" }}>
                        Need Care ?
                      </p>
                      <h3
                        className="font-bold mb-4 leading-tight"
                        style={{ fontSize: "32px", color: "#12262A" }}
                      >
                        Book Your Appointment Today
                      </h3>
                      <p className="text-lg" style={{ color: "#12262A" }}>
                        Get medical care at home or online in just a few clicks. Fast, safe, and reliable.
                      </p>
                    </div>
                    
                    <Button 
                      onClick={() => setIsBookingOpen(true)}
                      className="px-8 py-6 text-lg font-semibold transition-all duration-300 hover:opacity-90"
                      style={{ backgroundColor: "#12262A", color: "#fff" }}
                    >
                      Book Now
                    </Button>
                  </div>

                  {/* Right: Rings + avatars */}
                    <div className="relative h-56 lg:h-72 overflow-visible hidden lg:block">
                    <div className="absolute inset-0 flex items-center justify-center overflow-visible">
                      <div className="relative w-[720px] h-[720px] -translate-y-12 lg:-translate-y-20 pointer-events-none">
                        {[240, 360, 480, 680].map((d, i) => (
                          <div
                            key={`ring-${i}`}
                            className="absolute inset-0 m-auto rounded-full border-2 border-dashed"
                            style={{
                              width: `${d}px`,
                              height: `${d}px`,
                              borderColor:
                                i === 0 ? "rgba(18,38,42,0.35)" :
                                i === 1 ? "rgba(18,38,42,0.30)" :
                                i === 2 ? "rgba(18,38,42,0.25)" :
                                          "rgba(18,38,42,0.22)",
                            }}
                          />
                        ))}

                        {[
                          { src: CTA1, ringDiameter: 240, angle: 85  },
                          { src: CTA2, ringDiameter: 360, angle: 200 },
                          { src: CTA3, ringDiameter: 360, angle: 340 },
                          { src: CTA4, ringDiameter: 480, angle: 35  },
                          { src: CTA5, ringDiameter: 480, angle: 270 },
                          { src: CTA6, ringDiameter: 680, angle: 150 },
                        ].map((item, i) => {
                          const r = item.ringDiameter / 2;
                          return (
                            <div
                              key={`img-${i}`}
                              className="absolute top-1/2 left-1/2 pointer-events-auto"
                              style={{
                                transform: `translate(-50%, -50%) rotate(${item.angle}deg) translateY(-${r}px) rotate(-${item.angle}deg)`,
                              }}
                            >
                              <div className="bg-white rounded-full p-1 ring-1 ring-black/10 shadow-md">
                                <img
                                  src={item.src}
                                  alt={`Avatar ${i + 1}`}
                                  className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {/* /Right */}
                </div>
              </div>

              {/* Subtle accents */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 right-10 w-32 h-32 border border-[#12262A]/30 rounded-full" />
                <div className="absolute bottom-10 left-10 w-24 h-24 border border-[#12262A]/30 rounded-full" />
                <div className="absolute top-32 left-20 w-16 h-16 border border-[#12262A]/30 rounded-full" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo Section */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src={logoImg}  // ✅ use imported logo
                  alt="We Care Logo"
                  className="w-40 h-40 object-fill"
                />
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4" style={{ color: "#131313" }}>
                Quick Links
              </h4>
              <ul className="space-y-2" style={{ color: "#131313" }}>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); handleExploreClick(); }}>Services</a></li>
                {/* <li><a href="#contact">Contact Us</a></li> */}
              </ul>
            </div>
            
            {/* Contact Details */}
            <div>
              <h4 className="font-semibold text-lg mb-4" style={{ color: "#131313" }}>
                Contact Details
              </h4>
              <div className="space-y-2" style={{ color: "#131313" }}>
              <div className="flex items-center space-x-2">
  <Phone className="w-4 h-4" style={{ color: "#131313" }} />
  <a 
    href="tel:+96181160092" 
    className="hover:underline" 
    style={{ color: "#131313" }}
  >
    +961 81 160 092
  </a>
</div>

<div className="flex items-center space-x-2">
  <MessageCircle className="w-4 h-4" style={{ color: "#131313" }} />
  <a 
    href="mailto:info@wecaremed.org" 
    className="hover:underline" 
    style={{ color: "#131313" }}
  >
    info@wecaremed.org
  </a>
</div>

                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" style={{ color: "#131313" }} />
                  <span>Lebanon</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="border-t border-[#131313]/20 pt-6 mt-8 text-center" style={{ color: "#131313" }}>
            <p>Copyright © 2025 Wecare</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </div>
  );
};

export default Index;
