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
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import STAFF_OPTIONS from "@/assets/staff-options.json";

// —— Config ——
const WHATSAPP_DISPLAY = "+961 81 160 092";
const WHATSAPP_TEL = "96181160092";
const CONTACT_EMAIL = "info@wecaremed.org";

// Step 1 options
const SERVICE_TYPES = ["Home Healthcare", "Telemedicine"] as const;

// Step 2 mapping
const SERVICES: Record<typeof SERVICE_TYPES[number], string[]> = {
  "Home Healthcare": [
    "Physician",
    "Nurse",
    "Physiotherapist",
    "Occupational Health Therapist",
    "Speech Therapist",
  ],
  Telemedicine: [
    "Physician",
    "Psychologist / Mental Health Therapist",
    "Nutritionist",
    "Occupational Health Therapist",
    "Speech Therapist",
  ],
};

// Step 3 Nurse-specific options
const NURSE_TYPES = ["RN", "PN"] as const;
type NurseType = (typeof NURSE_TYPES)[number];

const NURSE_SERVICES: Record<NurseType, string[]> = {
  RN: [
    "Basic Nursing Care (Vital signs, wound care, injections)",
    "Advanced Nursing Care (IV therapy, catheter care, post-op care)",
    "IV Insertion/Cannulation",
    "Foley Catheter Insertion",
    "Bedsore Management",
    "Wound Dressing & Management",
    "Medication Administration (Oral/IV/IM/SC)",
    "Tracheostomy Care (Cleaning, suctioning, tube change)",
    "Blood Extraction (Lab Sampling)",
  ],
  PN: [
    "Basic Nursing Care (Vital signs, wound care, injections)",
    "Morning Care (Assistance with hygiene, grooming, toileting)",
    "Mobilization Assistance (Turning, repositioning, transfers)",
    "Medication Administration (Oral/IV/IM/SC)",
    "Blood Extraction (Lab Sampling)",
  ],
};

// New: Physician specialties
const MEDICAL_SPECIALTIES = [
  "Family Medicine",
  "Internal Medicine",
  "Pediatrics",
  "Neonatology",
  "General Practice(GP)",
  "General Surgery",
  "Cardiothoracic Surgery",
  "Colon and Rectal Surgery",
  "Breast Surgery",
  "Neurological Surgery (Neurosurgery)",
  "Ophthalmology",
  "Oral and Maxillofacial Surgery",
  "Orthopedic Surgery",
  "Otolaryngology (ENT - Ear, Nose, and Throat)",
  "Urology",
  "Vascular Surgery",
  "Allergy and Immunology",
  "Cardiology",
  "Critical Care Medicine (Intensive Care Medicine)",
  "Dermatology",
  "Endocrinology, Diabetes, and Metabolism",
  "Gastroenterology",
  "Geriatric Medicine (Geriatrics)",
  "Hematology",
  "Infectious Disease",
  "Nephrology",
  "Neurology",
  "Oncology (Medical Oncology)",
  "Psychiatry",
  "Pulmonology (Respiratory Medicine)",
  "Rheumatology",
  "Adolescent Medicine",
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type StepId = 1 | 2 | 3 | 4 | 5 | 6;

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [handoffShown, setHandoffShown] = useState(false);

  const [formData, setFormData] = useState({
    type: "",
    service: "",
    nurseType: "" as "" | NurseType,
    nurseService: "",
    specialty: "",
    staff: "",
    name: "",
    phone: "",
    date: "",
  });

  const { toast } = useToast();

  const clearAndClose = () => {
    setCurrentStep(1);
    setHandoffShown(false);
    setFormData({
      type: "",
      service: "",
      nurseType: "",
      nurseService: "",
      specialty: "",
      staff: "",
      name: "",
      phone: "",
      date: "",
    });
    onClose();
  };

  // WhatsApp message preview
  const whatsAppMessage = useMemo(() => {
    const lines = [
      `Hello We Care 👋`,
      `I'd like to book an appointment.`,
      ``,
      `Type: ${formData.type || "-"}`,
      `Service: ${formData.service || "-"}`,
      ...(formData.service === "Physician" && formData.specialty
        ? [`Specialty: ${formData.specialty}`]
        : []),
      ...(formData.service === "Nurse" && formData.nurseType
        ? [`Nurse Type: ${formData.nurseType}`]
        : []),
      ...(formData.service === "Nurse" && formData.nurseService
        ? [`Nurse Service: ${formData.nurseService}`]
        : []),
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
    setCurrentStep(6);
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(whatsAppMessage);
      toast({ title: "Copied!", description: "The message was copied to clipboard." });
    } catch {
      toast({ title: "Copy failed", description: "Select and copy manually.", variant: "destructive" });
    }
  };

  // Steps
  const steps = [
    {
      id: 1 as StepId,
      title: "Choose a Type of Service",
      subtitle: "Home Healthcare or Telemedicine",
      icon: <UserCheck className="w-6 h-6" />,
      content: (
        <Select
          value={formData.type}
          onValueChange={(value) =>
            setFormData({ ...formData, type: value, service: "", nurseType: "", nurseService: "", specialty: "" })
          }
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_TYPES.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
      isValid: () => !!formData.type,
    },
    {
      id: 2 as StepId,
      title: "Choose a Service",
      subtitle: "Based on chosen type",
      icon: <CalendarIcon className="w-6 h-6" />,
      content: (
        <Select
          value={formData.service}
          onValueChange={(value) =>
            setFormData({ ...formData, service: value, nurseType: "", nurseService: "", specialty: "" })
          }
          disabled={!formData.type}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            {(SERVICES[formData.type as keyof typeof SERVICES] || []).map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
      isValid: () => !!formData.service,
    },
    {
      id: 3 as StepId,
      title: "Choose Medical Specialty",
      subtitle: "For physician services only",
      icon: <UserCheck className="w-6 h-6" />,
      content: (
        <Select
          value={formData.specialty}
          onValueChange={(value) => setFormData({ ...formData, specialty: value })}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select medical specialty" />
          </SelectTrigger>
          <SelectContent>
            {MEDICAL_SPECIALTIES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
      isValid: () =>
        formData.service === "Physician" ? !!formData.specialty : true,
    },
    {
      id: 4 as StepId,
      title: "Choose Nurse Type & Service",
      subtitle: "Only for Nurse category",
      icon: <UserCheck className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <Select
            value={formData.nurseType}
            onValueChange={(v) => setFormData({ ...formData, nurseType: v as NurseType, nurseService: "" })}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select RN or PN" />
            </SelectTrigger>
            <SelectContent>
              {NURSE_TYPES.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {formData.nurseType && (
            <Select
              value={formData.nurseService}
              onValueChange={(value) => setFormData({ ...formData, nurseService: value })}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select nurse service" />
              </SelectTrigger>
              <SelectContent>
                {NURSE_SERVICES[formData.nurseType].map((srv) => (
                  <SelectItem key={srv} value={srv}>{srv}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      ),
      isValid: () =>
        formData.service === "Nurse"
          ? !!(formData.nurseType && formData.nurseService)
          : true,
    },
    {
      id: 5 as StepId,
      title: "Choose Staff",
      subtitle: "Pick your preferred provider",
      icon: <Clock className="w-6 h-6" />,
      content: (() => {
        let key = "";

        if (formData.service === "Nurse") {
          if (formData.nurseType && formData.nurseService) {
            if (formData.nurseType === "RN") {
              if (formData.nurseService.includes("Basic")) key = "Basic Nursing Care (RN)";
              else if (formData.nurseService.includes("Advanced")) key = "Advanced Nursing Care (RN)";
              else if (formData.nurseService.includes("IV")) key = "IV Insertion/Cannulation";
              else if (formData.nurseService.includes("Foley")) key = "Foley Catheter Insertion (RN)";
              else if (formData.nurseService.includes("Bedsore")) key = "Bedsore Management (RN)";
              else if (formData.nurseService.includes("Wound")) key = "Wound Dressing & Management (RN)";
              else if (formData.nurseService.includes("Medication")) key = "Medication Administration (RN)";
              else if (formData.nurseService.includes("Tracheostomy")) key = "Tracheostomy Care (RN)";
              else key = "Blood Extraction (RN)";
            } else {
              if (formData.nurseService.includes("Basic")) key = "Basic Nursing Care (PN)";
              else if (formData.nurseService.includes("Morning")) key = "Morning Care (PN)";
              else if (formData.nurseService.includes("Mobilization")) key = "Mobilization Assistance (PN)";
              else if (formData.nurseService.includes("Medication")) key = "Medication Administration (PN)";
              else key = "Blood Extraction (PN)";
            }
          }
        } else if (formData.service === "Physician") {
  key =
    formData.type === "Telemedicine"
      ? "Physician - Telemedicine"
      : "Physician - Home Healthcare";
} else {
          if (formData.type === "Home Healthcare") {
            key = `${formData.service} (Home Healthcare)`;
          } else if (formData.type === "Telemedicine") {
            if (formData.service === "Occupational Health Therapist") key = "Occupational Health Therapist (Telemedicine)";
            else if (formData.service === "Speech Therapist") key = "Speech Therapist (Telemedicine)";
            else key = formData.service!;
          }
        }

        const staffList = (STAFF_OPTIONS as Record<string, string[]>)[key] || [];

        return (
          <Select
            value={formData.staff}
            onValueChange={(value) => setFormData({ ...formData, staff: value })}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Choose staff" />
            </SelectTrigger>
            <SelectContent>
              {staffList.length ? (
                staffList.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)
              ) : (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  No staff available for this category yet
                </div>
              )}
            </SelectContent>
          </Select>
        );
      })(),
      isValid: () => !!formData.staff,
    },
    {
      id: 6 as StepId,
      title: "Fill the short form",
      subtitle: "Enter details & appointment date",
      icon: <FileText className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-12 mt-1"
            />
          </div>
          <div>
            <Label htmlFor="date">Preferred Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="h-12 mt-1"
            />
          </div>

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

    if (formData.service === "Physician" && currentStep === 2) {
      setCurrentStep(3);
      return;
    }

    if (formData.service === "Physician" && currentStep === 3) {
      setCurrentStep(5);
      return;
    }

    if (formData.service !== "Nurse" && formData.service !== "Physician" && currentStep === 2) {
      setCurrentStep(5);
      return;
    }

    if (formData.service === "Nurse" && currentStep === 2) {
      setCurrentStep(4);
      return;
    }

    if (currentStep < 6) {
      setCurrentStep((s) => (s + 1) as StepId);
    } else {
      openWhatsApp();
    }
  };

  const handleBack = () => {
    if (currentStep === 5 && formData.service === "Physician") {
      setCurrentStep(3);
      return;
    }

    if (currentStep === 5 && formData.service !== "Nurse" && formData.service !== "Physician") {
      setCurrentStep(2);
      return;
    }

    if (currentStep === 4 && formData.service === "Nurse") {
      setCurrentStep(2);
      return;
    }

    if (currentStep > 1) {
      setCurrentStep((s) => (s - 1) as StepId);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) clearAndClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[560px] p-0 overflow-hidden bg-background">
        {/* Header */}
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
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="animate-slide-up">{step.content}</div>

          {/* Footer */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>

            {currentStep === 6 ? (
              <Button onClick={openWhatsApp} className="bg-primary hover:bg-primary/90">
                Send via WhatsApp
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
