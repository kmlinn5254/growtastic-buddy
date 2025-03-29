
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does the AI plant checker work?",
    answer: "Our AI plant checker analyzes your plant's image or your description to identify potential diseases, nutrient deficiencies, or growth issues. It compares visual patterns and symptoms against a database of common plant conditions to provide accurate diagnoses and care recommendations."
  },
  {
    question: "How accurate is the plant analysis?",
    answer: "The AI provides a reasonably accurate assessment based on visible symptoms and provided information. However, for critical plant health issues, we recommend consulting with a professional botanist or plant specialist for confirmation."
  },
  {
    question: "What types of plants can I analyze?",
    answer: "Our system works with most common houseplants, garden plants, and agricultural crops. The more common the plant species, the more accurate the analysis will be."
  },
  {
    question: "How can I get the best analysis results?",
    answer: "For images: Take clear, well-lit photos that show the affected areas of the plant. Include both healthy and unhealthy parts for comparison. For text descriptions: Be specific about symptoms, including color changes, texture, growth patterns, and any recent changes in care."
  },
  {
    question: "Where are my analysis results saved?",
    answer: "Your analysis results are saved in your account and can be accessed from the Plant Guides section. If you're not logged in, results are temporarily stored in your browser and will be available until you clear your browser data."
  },
  {
    question: "Can I track my plant's health over time?",
    answer: "Yes! We recommend saving your analyses and taking periodic photos to track changes. The history section shows your past analyses, allowing you to monitor improvement or decline in your plant's health."
  }
];

const PlantCheckerFAQ = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <HelpCircle className="mr-2 h-5 w-5 text-plant-primary" />
          Frequently Asked Questions
        </CardTitle>
        <CardDescription>
          Common questions about our AI plant checker
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default PlantCheckerFAQ;
