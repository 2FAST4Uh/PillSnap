
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Stethoscope, Pill, ShieldCheck, Soup, Waves, Activity, AlertCircle } from 'lucide-react';
import type { SVGProps } from "react";

const CrampsIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
        <path d="M12 12.5a2.5 2.5 0 0 0-5 0c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5z"/>
        <path d="M12 12.5a2.5 2.5 0 0 1 5 0c0 1.38-1.12 2.5-2.5 2.5S12 13.88 12 12.5z"/>
        <path d="M7.5 10a2.5 2.5 0 0 0 0-5c-1.38 0-2.5 1.12-2.5 2.5S6.12 10 7.5 10z"/>
        <path d="M16.5 10a2.5 2.5 0 0 0 0-5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5z"/>
    </svg>
);

const symptomData = [
  {
    symptom: "Headache",
    Icon: Stethoscope,
    causes: "Common causes include stress, dehydration, lack of sleep, or vision problems.",
    remedies: "Rest in a quiet, dark room, drink water, and take over-the-counter pain relievers like ibuprofen or acetaminophen if necessary. A cold compress can also help.",
  },
  {
    symptom: "Common Cold",
    Icon: Soup,
    causes: "Caused by various rhinoviruses, highly contagious through airborne droplets or direct contact.",
    remedies: "Get plenty of rest, stay hydrated with water or warm broth, and use a humidifier. Decongestants and pain relievers can ease symptoms. Consult a doctor if symptoms persist.",
  },
  {
    symptom: "Upset Stomach",
    Icon: Pill,
    causes: "Can result from indigestion, food poisoning, or a stomach virus.",
    remedies: "Stick to bland foods like bananas, rice, and toast (BRAT diet). Avoid spicy, fatty, or acidic foods. Drink clear fluids and consider over-the-counter antacids.",
  },
  {
    symptom: "Allergies",
    Icon: ShieldCheck,
    causes: "An immune system reaction to a foreign substance (allergen) like pollen, dust mites, or pet dander.",
    remedies: "Avoid known allergens, use over-the-counter antihistamines, and keep indoor air clean with filters. Saline nasal sprays can help clear congestion.",
  },
  {
    symptom: "Cramps",
    Icon: CrampsIcon,
    causes: "Often caused by muscle strain, dehydration, or menstruation. Can sometimes indicate an underlying condition.",
    remedies: "Gently stretch the affected muscle. Apply heat or a cold pack. Stay hydrated and ensure adequate mineral intake (e.g., potassium, magnesium). Over-the-counter pain relievers can also help.",
  },
    {
    symptom: "Nausea",
    Icon: Waves,
    causes: "Can be triggered by motion sickness, infections, migraines, or certain foods.",
    remedies: "Try sipping clear fluids, eating bland foods, and getting fresh air. Ginger and peppermint may help soothe the stomach. Avoid strong smells and greasy foods.",
  },
  {
    symptom: "Diarrhea",
    Icon: AlertCircle,
    causes: "Commonly caused by viral or bacterial infections, food intolerances, or medication side effects.",
    remedies: "Stay hydrated with water, broth, or rehydration solutions. Follow the BRAT diet (bananas, rice, applesauce, toast). Avoid dairy, fatty foods, and caffeine.",
  },
  {
    symptom: "Migraine",
    Icon: Activity,
    causes: "A neurological condition often triggered by stress, hormonal changes, certain foods, or sensory stimuli.",
    remedies: "Rest in a dark, quiet room. Apply a cold compress to your forehead. Take over-the-counter or prescription migraine medication as advised by a doctor.",
  },
];

export function SymptomChecker() {
  return (
    <Card className="border-0 shadow-none">
        <CardHeader className="p-1">
            <CardTitle className="flex items-center gap-2 text-base">
                <Stethoscope className="h-5 w-5 text-primary" />
                Symptom Checker
            </CardTitle>
            <CardDescription className="text-xs">
                Quick insights into common symptoms. Not a substitute for professional medical advice.
            </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
            {symptomData.map(({symptom, Icon, causes, remedies}) => (
                <AccordionItem value={symptom} key={symptom}>
                <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2">
                    <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-accent"/>
                        {symptom}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-3 pt-1 pb-2 pl-8">
                        <div>
                            <h4 className="font-semibold text-xs mb-1">Potential Causes</h4>
                            <p className="text-xs text-muted-foreground">{causes}</p>
                        </div>
                         <div>
                            <h4 className="font-semibold text-xs mb-1">Suggested Remedies</h4>
                            <p className="text-xs text-muted-foreground">{remedies}</p>
                        </div>
                    </div>
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </CardContent>
    </Card>
  );
}
