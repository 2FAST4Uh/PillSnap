
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HeartPulse, Brain, Bone, Stethoscope as StethoscopeIcon, Phone, User } from "lucide-react";

const expertData = [
  {
    category: "Cardiology",
    Icon: HeartPulse,
    experts: [
      { name: "Dr. Evelyn Reed", phone: "555-0101" },
      { name: "Dr. Samuel Grant", phone: "555-0102" },
    ],
  },
  {
    category: "Neurology",
    Icon: Brain,
    experts: [
      { name: "Dr. Ava Nguyen", phone: "555-0107" },
      { name: "Dr. Liam Goldberg", phone: "555-0108" },
    ],
  },
  {
    category: "Orthopedics",
    Icon: Bone,
    experts: [
      { name: "Dr. Mason Patel", phone: "555-0106" },
      { name: "Dr. Chloe Kim", phone: "555-0109" },
    ],
  },
  {
    category: "General Practice",
    Icon: StethoscopeIcon,
    experts: [
        { name: "Dr. Olivia Chen", phone: "555-0103" },
        { name: "Dr. Benjamin Carter", phone: "555-0104" },
        { name: "Dr. Isabella Flores", phone: "555-0105" },
    ]
  }
];

export function ExpertList() {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="Cardiology">
      {expertData.map(({category, Icon, experts}) => (
        <AccordionItem value={category} key={category}>
          <AccordionTrigger className="text-lg font-semibold hover:no-underline">
            <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-primary"/>
                {category}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {experts.map((expert) => (
                <div
                  key={expert.name}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-md border p-4 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <User className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">{expert.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {category} Specialist
                      </p>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href={`tel:${expert.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
