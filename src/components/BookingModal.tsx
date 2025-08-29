import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  ChevronRight,
  ChevronLeft,
  UserCheck,
  Calendar as CalendarIcon,
  Clock,
  FileText,
  CheckCircle2,
  Copy,
  Phone,
  Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// —— Config ——
const WHATSAPP_DISPLAY = "+961 81 160 092";
const WHATSAPP_TEL = "96181160092";
const CONTACT_EMAIL = "info@wecaremed.org";

// Physicians (list as services under Physicians)
const PHYSICIANS = {
  "Family Medicine": [],
  "Internal Medicine": [],
  Pediatrics: [],
  Neonatology: [],
  "General Practice (GP)": [],
  "General Surgery": [],
  "Cardiothoracic Surgery": [],
  "Colon and Rectal Surgery": [],
  "Breast Surgery": [],
  "Neurological Surgery (Neurosurgery)": [],
  Ophthalmology: [],
  "Oral and Maxillofacial Surgery": [],
  "Orthopedic Surgery": [],
  "Otolaryngology (ENT)": [],
  Urology: [],
  "Vascular Surgery": [],
  "Allergy and Immunology": [],
  Cardiology: [],
  "Critical Care Medicine (Intensive Care Medicine)": [],
  Dermatology: [],
  "Endocrinology, Diabetes, and Metabolism": [],
  Gastroenterology: [],
  "Geriatric Medicine (Geriatrics)": [],
  Hematology: [],
  "Infectious Disease": [],
  Nephrology: [],
  Neurology: [],
  "Oncology (Medical Oncology)": [],
  Psychiatry: [],
  "Pulmonology (Respiratory Medicine)": [],
  Rheumatology: [],
};

// Nurses (RN/PN with services)
const NURSE_TYPES = ["RN", "PN"] as const;
type NurseType = (typeof NURSE_TYPES)[number];

const NURSE_SERVICES: Record<NurseType, string[]> = {
  RN: [
    "Medical-Surgical Nursing",
    "Pediatric / Neonatal Nursing",
    "Critical Care Nursing",
    "Oncology Nursing",
  ],
  PN: ["General Practical Nursing"],
};

// Rehab & Therapy
const REHAB_THERAPY = [
  "Physiotherapist",
  "Occupational Therapist",
  "Speech Therapist",
  "Nutritionist",
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type StepId = 1 | 2 | 3 | 4 | 5; // 5 = thank-you

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [handoffShown, setHandoffShown] = useState(false);

  const [formData, setFormData] = useState({
    category: "",            // "Physicians" | "Nurses" | "Rehabilitation & Therapy"
    service: "",             // depends on category
    nurseType: "" as "" | NurseType, // for Nurses only
    staff: "",
    name: "",
    phone: "",
    date: "",                // <-- date only; no time slot
  });

  const { toast } = useToast();

  const clearAndClose = () => {
    setCurrentStep(1);
    setHandoffShown(false);
    setFormData({
      category: "",
      service: "",
      nurseType: "",
      staff: "",
      name: "",
      phone: "",
      date: "",
    });
    onClose();
  };

  // Build category options
  const categoryOptions = ["Physicians", "Nurses", "Rehabilitation & Therapy"] as const;

  // Build service options based on category (and nurseType for Nurses)
  const serviceOptions = useMemo(() => {
    if (formData.category === "Physicians") {
      return Object.keys(PHYSICIANS);
    }
    if (formData.category === "Nurses") {
      const t = formData.nurseType as NurseType | "";
      return t ? NURSE_SERVICES[t] : [];
    }
    if (formData.category === "Rehabilitation & Therapy") {
      return REHAB_THERAPY;
    }
    return [];
  }, [formData.category, formData.nurseType]);

  // Provide simple staff placeholders derived from the chosen service/type
  const staffOptions = useMemo(() => {
    const s = formData.service || "";
    if (!s) return [];
    if (formData.category === "Nurses") {
      return [
        `Nurse (${formData.nurseType})`,
      ];
    }
    if (formData.category === "Rehabilitation & Therapy") {
      return [`${s} • Senior`, `${s} • Junior`, `${s} • Home-Visit Specialist`];
    }
    // Physicians
    return [`Dr. ${s} • Consultant`, `Dr. ${s} • Specialist`, `Dr. ${s} • Resident`];
  }, [formData.category, formData.service, formData.nurseType]);

  // Prefilled WhatsApp message (no time)
  const whatsAppMessage = useMemo(() => {
    const lines = [
      `Hello We Care 👋`,
      `I'd like to book an appointment.`,
      ``,
      `Category: ${formData.category || "-"}`,
      ...(formData.category === "Nurses" && formData.nurseType ? [`Nurse Type: ${formData.nurseType}`] : []),
      `Service: ${formData.service || "-"}`,
      `Preferred Staff: ${formData.staff || "-"}`,
      `Date: ${formData.date || "-"}`,
      ``,
      `Patient Name: ${formData.name || "-"}`,
      `Phone: ${formData.phone || "-"}`,
    ];
    return lines.join("\n");
  }, [formData]);

  const openWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_TEL}?text=${encodeURIComponent(whatsAppMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setHandoffShown(true);
    setCurrentStep(5); // jump to thank-you
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(whatsAppMessage);
      toast({ title: "Copied!", description: "The message was copied to clipboard." });
    } catch {
      toast({ title: "Copy failed", description: "Select and copy manually.", variant: "destructive" });
    }
  };

  // ——— Steps ———
  const steps = [
    {
      id: 1 as StepId,
      title: "Choose a Category",
      subtitle: "Pick the type of care you need",
      icon: <UserCheck className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <Select
            value={formData.category}
            onValueChange={(value) => {
              setFormData({ ...formData, category: value, service: "", nurseType: "" });
            }}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border max-h-72">
              {categoryOptions.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Nurses: pick RN/PN */}
          {formData.category === "Nurses" && (
            <div className="space-y-2">
              <Label className="text-foreground">Nurse Type</Label>
              <Select
                value={formData.nurseType}
                onValueChange={(v) =>
                  setFormData({ ...formData, nurseType: v as NurseType, service: "" })
                }
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select RN or PN" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  {NURSE_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t === "RN" ? "Registered Nurse (RN)" : "Practical Nurse (PN)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      ),
      isValid: () => {
        if (!formData.category) return false;
        if (formData.category === "Nurses" && !formData.nurseType) return false;
        return true;
      },
    },
    {
      id: 2 as StepId,
      title: "Choose Service",
      subtitle: "Select the service you need",
      icon: <CalendarIcon className="w-6 h-6" />,
      content: (
        <Select
          value={formData.service}
          onValueChange={(value) => setFormData({ ...formData, service: value })}
          disabled={
            (formData.category === "Nurses" && !formData.nurseType) || !formData.category
          }
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent className="bg-background border-border max-h-72">
            {serviceOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                Select a category{formData.category === "Nurses" ? " and nurse type" : ""} first
              </div>
            ) : (
              serviceOptions.map((srv) => (
                <SelectItem key={srv} value={srv}>
                  {srv}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      ),
      isValid: () => !!formData.service,
    },
    {
      id: 3 as StepId,
      title: "Choose Staff",
      subtitle: "Select your preferred provider",
      icon: <Clock className="w-6 h-6" />,
      content: (
        <Select
          value={formData.staff}
          onValueChange={(value) => setFormData({ ...formData, staff: value })}
          disabled={!formData.service}
        >
          <SelectTrigger className="h-12">
            <SelectValue
              placeholder={
                staffOptions.length ? "Choose your provider" : "Select a service first"
              }
            />
          </SelectTrigger>
          <SelectContent className="bg-background border-border max-h-72">
            {staffOptions.length ? (
              staffOptions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                No staff yet — select a service first
              </div>
            )}
          </SelectContent>
        </Select>
      ),
      isValid: () => !!formData.staff,
    },
    {
      id: 4 as StepId,
      title: "Fill the short form",
      subtitle: "Enter your details and appointment date",
      icon: <FileText className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-foreground">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-foreground">
              Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-12 mt-1"
            />
          </div>
          <div>
            <Label htmlFor="date" className="text-foreground">
              Preferred Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="h-12 mt-1"
            />
          </div>

          {/* WhatsApp preview & actions */}
          <div className="mt-2 rounded-2xl border border-black/10 bg-muted/30 p-3">
            <div className="text-xs text-muted-foreground mb-2">
              Preview WhatsApp message
            </div>
            <pre className="text-xs whitespace-pre-wrap leading-relaxed max-h-40 overflow-auto">
              {whatsAppMessage}
            </pre>
            <div className="flex gap-2 mt-3">
              <Button type="button" variant="outline" onClick={copyMessage} className="gap-2">
                <Copy className="w-4 h-4" /> Copy
              </Button>
              <Button type="button" onClick={openWhatsApp} className="bg-primary hover:bg-primary/90">
                Send via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      ),
      isValid: () => !!(formData.name && formData.phone && formData.date),
    },
    {
      id: 5 as StepId,
      title: "Thank you!",
      subtitle: "If WhatsApp didn’t open, use the details below.",
      icon: <CheckCircle2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            We’ve prepared your message. If WhatsApp didn’t open, you can{" "}
            <button onClick={copyMessage} className="underline underline-offset-4">
              copy it
            </button>{" "}
            and send it manually, or contact us directly:
          </p>
          <div className="rounded-2xl border border-black/10 p-4 bg-white/60 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a className="hover:underline" href={`tel:+${WHATSAPP_TEL}`}>
                {WHATSAPP_DISPLAY}
              </a>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Mail className="w-4 h-4" />
              <a className="hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={openWhatsApp} className="bg-primary hover:bg-primary/90">
              Open WhatsApp Again
            </Button>
            <Button variant="outline" onClick={copyMessage} className="gap-2">
              <Copy className="w-4 h-4" /> Copy Message
            </Button>
          </div>
        </div>
      ),
      isValid: () => true,
    },
  ];

  const step = steps.find((s) => s.id === currentStep)!;

  const handleNext = () => {
    const valid = step.isValid();
    if (!valid) {
      toast({
        title: "Please complete this step",
        description: "Fill in all required fields before continuing",
        variant: "destructive",
      });
      return;
    }
    if (currentStep < 4) {
      setCurrentStep((s) => (s + 1) as StepId);
    } else {
      // If user clicks "Next" on step 4, still hand off to WhatsApp
      openWhatsApp();
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep !== 5) {
      setCurrentStep((s) => (s - 1) as StepId);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) clearAndClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[560px] p-0 overflow-hidden bg-background">
        {/* Header / progress */}
        <div className="bg-gradient-hero p-6 text-white">
          <DialogHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">{step.icon}</div>
              <div>
                <DialogTitle className="text-xl font-semibold text-white">
                  {step.title}
                </DialogTitle>
                <p className="text-sm text-white/90 mt-1">{step.subtitle}</p>
              </div>
            </div>
          </DialogHeader>

          {/* Progress Bar (hide on thank-you) */}
          {currentStep !== 5 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white/80">Step {currentStep} of 4</span>
                <span className="text-sm text-white/80">
                  {Math.round((currentStep / 4) * 100)}%
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="animate-slide-up">{step.content}</div>

          {/* Footer actions */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1 || currentStep === 5}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>

            {currentStep === 4 ? (
              <div className="flex gap-2">
                <Button variant="outline" onClick={copyMessage} className="gap-2">
                  <Copy className="w-4 h-4" /> Copy
                </Button>
                <Button
                  onClick={openWhatsApp}
                  className="flex items-center space-x-2 bg-primary hover:bg-primary/90"
                >
                  <span>Send via WhatsApp</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ) : currentStep === 5 ? (
              <Button onClick={clearAndClose} className="bg-primary hover:bg-primary/90">
                Close
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="flex items-center space-x-2 bg-primary hover:bg-primary/90"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Tiny note after handoff */}
          {handoffShown && currentStep === 5 && (
            <p className="mt-4 text-xs text-muted-foreground">
              If WhatsApp doesn’t open, you can reach us at{" "}
              <a className="underline" href={`tel:+${WHATSAPP_TEL}`}>
                {WHATSAPP_DISPLAY}
              </a>{" "}
              or{" "}
              <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
