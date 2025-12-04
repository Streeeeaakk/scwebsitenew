
'use client';

import { useState } from 'react';
import { CheckCircle2, ArrowRightCircle, Mail, Phone, UserCheck, BookOpen, User, Info, Building, GraduationCap, FileText, Bot } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/lib/chat-store';
import { AskAiButton } from '@/components/AskAiButton';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const RequirementList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3 text-muted-foreground">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

type RequirementCategory = 'college' | 'basicEd' | 'other';

const SectionWrapper = ({ query, children, title }: { query: string; children: React.ReactNode; title: string }) => {
    return (
        <div className="relative group p-6 rounded-xl border border-transparent bg-transparent hover:bg-card hover:border-border hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">{title}</h3>
                <AskAiButton query={query} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {children}
        </div>
    )
}

export default function AdmissionsPage() {
    const [activeCategory, setActiveCategory] = useState<RequirementCategory>('college');

  const requirements = {
    basicEd: {
      new: [
        'Accomplished Registration and Admissions Form',
        'School Form 9 (Report Card)',
        'Photocopy of Live Birth Certificate (NSO / PSA Copy)',
      ],
      continuing: [
        'Accomplished Registration and Admissions Form',
        'School Form 9 (Report Card)',
      ],
    },
    college: {
      new: [
        'Accomplished Registration and Admissions Form',
        'School Form 9 (Report card)',
        'Photocopy of Live Birth Certificate (NSO / PSA Copy)',
      ],
      continuing: ['Accomplished Registration and Admissions Form', 'Prospectus with Grades'],
      transferee: [
        'Accomplished Registration and Admissions Form',
        'Official Transcript of Records',
        'Certificate of Transfer Credential',
        'Photocopy of Live Birth Certificate (NSO / PSA Copy)',
        'Advice slip from Dean/Program Head',
      ],
      foreign: [
        'Accomplished Registration and Admissions Form',
        'Scholastic Records',
        'Travel Documents',
        'Photocopy of Live Birth Certificate (NSO / PSA Copy)',
        'ACR - I-CARD',
      ],
    },
  };

  const academicLoad = {
      steps: [
          "Pay the Academic Load Revision at the Cashier's Office",
          "Present the Official Receipt to the Registrar's Office",
          "Fill out the needed information and secure the signature of Program Head, and Dean",
          "Submit the form to the Registrar's Office for load revision and wait for the new enrollment printout",
          "A student should carry the number of units or academic work prescribed for the degree and level each semester as stipulated in the prospectus",
          "Overloading is only applicable if the student is attending the last semester prior to completion of degree and only 6 units in maximum"
      ],
      crossEnrollment: [
          "Cross-enrollment in another Academic Institution is allowed on a case-to-case basis.",
          "Expressed permission from the proper school Dean is required before the Registrar issues the permit."
      ]
  }

  const admissionSteps = [
    "Choose your desired program from our Academics page.",
    "Prepare all the required documents based on your student type (see below).",
    "Visit the Registrar's Office on campus to submit your documents and fill out the final forms.",
    "Once processed, you will receive your official enrollment assessment to complete the process."
  ]

  const requirementCategories = [
    { id: 'college', label: 'College', icon: GraduationCap },
    { id: 'basicEd', label: 'Basic Education', icon: BookOpen },
    { id: 'other', label: 'Other Info', icon: Info },
  ];

  return (
    <div className="bg-background">
      <PageHeader 
        title="Admissions"
        description="Find all the necessary information and forms to begin your journey at Southland College. We've organized the requirements by department to make it easier for you."
        storageKey="admissionsPageHeader"
        defaultImage="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"
        imageHint="students in classroom"
      />
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto space-y-16">

              <Card className="p-6 rounded-2xl bg-secondary shadow-lg">
                <div className="flex items-center gap-3 text-2xl font-bold text-foreground mb-2">
                    <UserCheck className="h-8 w-8 text-primary" />
                    <h2>Admission Process &amp; Inquiries</h2>
                </div>
                 <p className="text-muted-foreground ml-11">
                      Follow these steps to join the Southland community. For any questions, our Registrar's Office is ready to assist you.
                  </p>
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div className="relative group p-6 rounded-xl border bg-card transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                           <h3 className="font-semibold text-foreground">Application Steps</h3>
                           <AskAiButton query="Can you walk me through the application steps?" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      <ol className="space-y-4 text-muted-foreground">
                        {admissionSteps.map((step, index) => (
                            <li key={step} className="flex items-start gap-4">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0 mt-[-2px]">
                                    {index + 1}
                                </div>
                                <span>{step}</span>
                            </li>
                        ))}
                      </ol>
                  </div>
                  <div className="relative group p-6 rounded-xl border bg-card transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                           <h3 className="font-semibold text-foreground">Contact the Registrar</h3>
                           <AskAiButton query="How can I contact the registrar?" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                       <p className="text-muted-foreground mb-4 text-sm">For questions about requirements, application status, or any other admission-related concerns, please contact:</p>
                       <div className="space-y-3">
                          <div className="flex items-center gap-3">
                              <Mail className="h-4 w-4 text-primary" />
                              <a href="mailto:registrar@southlandcollege.edu.ph" className="text-muted-foreground hover:text-primary">registrar@southlandcollege.edu.ph</a>
                          </div>
                           <div className="flex items-center gap-3">
                              <Phone className="h-4 w-4 text-primary" />
                              <a href="tel:0347467297" className="text-muted-foreground hover:text-primary">(034) 746 7297 (ext. 102)</a>
                          </div>
                       </div>
                  </div>
                </div>
              </Card>
            
              <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center justify-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        Admission Requirements
                    </h2>
                    <p className="mt-2 text-lg text-muted-foreground">Select a category to view the detailed requirements for your application.</p>
                  </div>

                  <div className="flex justify-center gap-2 sm:gap-4 border-b pb-4">
                      {requirementCategories.map(({ id, label, icon: Icon }) => (
                          <Button
                              key={id}
                              variant={activeCategory === id ? 'default' : 'outline'}
                              size="lg"
                              className="transition-all duration-200"
                              onClick={() => setActiveCategory(id as RequirementCategory)}
                          >
                              <Icon className="mr-2 h-5 w-5" />
                              {label}
                          </Button>
                      ))}
                  </div>

                  <div className="pt-6 min-h-[500px]">
                      {activeCategory === 'college' && (
                          <div className="grid sm:grid-cols-2 gap-8 animate-fade-up">
                                <SectionWrapper query="What are the admission requirements for new college students?" title="FOR NEW / RETURNING STUDENTS">
                                    <RequirementList items={requirements.college.new} />
                                </SectionWrapper>
                                <SectionWrapper query="What are the admission requirements for continuing college students?" title="FOR CONTINUING STUDENTS">
                                    <RequirementList items={requirements.college.continuing} />
                                </SectionWrapper>
                                <SectionWrapper query="What are the admission requirements for transferee students?" title="FOR TRANSFEREE STUDENTS">
                                    <RequirementList items={requirements.college.transferee} />
                                </SectionWrapper>
                                <SectionWrapper query="What are the admission requirements for foreign students?" title="FOR FOREIGN STUDENTS">
                                    <RequirementList items={requirements.college.foreign} />
                                </SectionWrapper>
                           </div>
                      )}
                       {activeCategory === 'basicEd' && (
                           <div className="grid sm:grid-cols-2 gap-8 animate-fade-up">
                                <SectionWrapper query="What are the admission requirements for new basic education students?" title="FOR NEW / RETURNING STUDENTS">
                                    <RequirementList items={requirements.basicEd.new} />
                                </SectionWrapper>
                                <SectionWrapper query="What are the admission requirements for continuing basic education students?" title="FOR CONTINUING STUDENTS">
                                    <RequirementList items={requirements.basicEd.continuing} />
                                </SectionWrapper>
                            </div>
                       )}
                       {activeCategory === 'other' && (
                           <div className="grid sm:grid-cols-2 gap-8 animate-fade-up">
                                <SectionWrapper query="How do I revise my academic load?" title="ACADEMIC LOAD REVISION">
                                <ol className="space-y-4 text-muted-foreground">
                                    {academicLoad.steps.map((step, index) => (
                                        <li key={step} className="flex items-start gap-4">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0 mt-[-2px]">
                                                {index + 1}
                                            </div>
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </SectionWrapper>
                            <SectionWrapper query="What is the policy on cross-enrollment?" title="CROSS-ENROLLMENT">
                                    <ul className="space-y-3 text-muted-foreground">
                                        {academicLoad.crossEnrollment.map(item => (
                                        <li key={item} className="flex items-start gap-3">
                                            <ArrowRightCircle className="h-5 w-5 text-primary/80 mt-0.5 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                        ))}
                                </ul>
                            </SectionWrapper>
                           </div>
                       )}
                  </div>
              </div>

          </div>
      </div>
    </div>
  );
}
