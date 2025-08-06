
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Stethoscope, Pill, ShieldCheck, Soup } from 'lucide-react';

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
