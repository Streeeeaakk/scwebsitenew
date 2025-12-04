
'use client';

import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const scholarshipData = {
  entrance: [
    { title: 'COLLEGE ENTRANCE SCHOLARSHIP', description: 'Open to TOP 10 1st year College students, Gr 11 students, and Gr 7 for SY 2024-2025.', qualifications: [
      { rank: 'TOP 1', tfd: '100%', misc: '90%' },
      { rank: 'TOP 2', tfd: '75%', misc: '50%' },
      { rank: 'TOP 3-5', tfd: '50%', misc: '25%' },
      { rank: 'TOP 6-10', tfd: '25%', misc: '25%' },
    ]},
    { title: 'SHS, JHS ENTRANCE SCHOLARSHIP', description: 'Open to TOP 10 Gr 11 students and Gr 7 for SY 2024-2025.', qualifications: [
      { rank: 'TOP 1', tfd: '75%', misc: '50%' },
      { rank: 'TOP 2', tfd: '50%', misc: '50%' },
      { rank: 'TOP 3-10', tfd: '25%', misc: '25%' },
    ]},
  ],
  academic: [
    { title: 'COLLEGE and SHS Academic SCHOLARSHIP', description: 'Open to all college and SHS students who maintain strong academic performance and rank in the TOP 3 of their class in the immediately preceding semester.', qualifications: [
      { rank: 'TOP 1', tfd: '75%', misc: '' },
      { rank: 'TOP 2', tfd: '50%', misc: '' },
      { rank: 'TOP 3', tfd: '25%', misc: '' },
    ]},
    { title: 'JHS ACADEMIC SCHOLARSHIP', description: 'Open to JHS students who maintain strong academic performance and rank in the TOP 3 of their class in the immediately preceding school year.', qualifications: [
      { rank: 'TOP 1', tfd: '75%', misc: '' },
      { rank: 'TOP 2', tfd: '50%', misc: '' },
      { rank: 'TOP 3', tfd: '25%', misc: '' },
    ]},
  ],
  excellence: [
    { title: 'SPORTS AND CULTURAL EXCELLENCE SCHOLARSHIP', description: 'Open to athletes and cultural performers from all levels who won in competitions.', qualifications: [
      { level: 'International Level', place: '1st Place', benefit: 'Scholarship Grant' },
      { level: '', place: '2nd Place', benefit: 'Scholarship Grant' },
      { level: '', place: '3rd Place', benefit: 'Scholarship Grant' },
      { level: 'National Level', place: '1st Place', benefit: 'Scholarship Grant' },
      { level: '', place: '2nd Place', benefit: 'Scholarship Grant' },
      { level: '', place: '3rd Place', benefit: 'Scholarship Grant' },
      { level: 'Regional Level', place: '1st Place', benefit: 'Scholarship Grant' },
      { level: '', place: '2nd Place', benefit: 'Scholarship Grant' },
      { level: '', place: '3rd Place', benefit: 'Scholarship Grant' },
      { level: 'Provincial Level', place: '1st Place', benefit: 'Scholarship Grant' },
      { level: '', place: '2nd Place', benefit: 'Scholarship Grant' },
      { level: '', place: '3rd Place', benefit: 'Scholarship Grant' },
    ]},
  ],
  benefits: [
    { name: 'SSG BENEFIT', criteria: 'Elected SC SSG President or College Officer.', details: '50% for Presidents, 5% for College Officers.' },
    { name: 'SOUTH QUILL BENEFIT', criteria: 'College South Quill Editorial Staff.', details: '50% for Editor in Chief, 5% for Staff Writers.' },
    { name: 'CHURCH PASTOR/BIBLE WOMAN/CHURCH WORKER BENEFIT', criteria: 'Children of Baptist Church ministers/workers.', details: '50% for 1st child, 40% for 2nd, 30% for 3rd, 20% for 4th.' },
    { name: 'EMPLOYEES BENEFIT', criteria: 'Children of regular and permanent employees with satisfactory performance.', details: '100% for 1st child, 75% for 2nd, 50% for 3rd, 25% for 4th.' },
    { name: 'STUDENT ASSISTANT BENEFIT', criteria: 'College students able to work and study.', details: 'Hourly compensation.' },
    { name: 'SIBLINGS PRIVILEGE', criteria: '3 or more siblings currently enrolled.', details: '50% for 3, 75% for 4, 100% for 5 or more.' },
    { name: 'RETIRED MILITARY/ PNP PRIVILEGE', criteria: 'Parent is a retired Military or PNP personnel.', details: '5% for all levels.' },
    { name: 'BARKADAHAN PRIVILEGE', criteria: 'First-year college students from the same school (groups of 5+).', details: '5% for 5-6, 6% for 7-8, 7% for 9-10 members.' },
    { name: 'SC LOYALTY PRIVILEGE', criteria: 'First-year College students who completed SHS at Southland.', details: '50% discount.' },
    { name: 'TRANSFEREE PRIVILIGE', criteria: 'SHS and College students from other schools who transferred to Southland.', details: '100% Free Tuition for 1 year.' },
    { name: 'TEACHER EDUCATION PRIVILEGE', criteria: 'College students enrolled in Teacher Education Courses.', details: '100% Free Tuition for 1 year.' },
  ],
  government: [
    { name: 'CHED MERIT SCHOLARSHIP PROGRAM', criteria: 'Entering 1st year College students with GWA of 93%+, annual family income not exceeding a specified amount. Apply from March to May.', details: 'Full and Half Merit grants available.' },
    { name: 'CHED TERTIARY EDUCATIONAL SCHOLARSHIP', criteria: 'Bonafide students of Southland College. School applies for the students.', details: 'Yearly financial assistance.' },
    { name: 'CHED TULONG DUNONG PROGRAM', criteria: 'Bonafide students of Southland College. Apply through Congressional District Offices from March to May.', details: 'Yearly financial assistance.' },
    { name: 'EDUCATION SERVICE CONTRACTING (ESC) PROGRAM', criteria: 'Incoming Grade 7 students. Apply through the Scholarship Office.', details: 'Yearly financial grant.' },
    { name: 'SENIOR HIGH SCHOOL-VOUCHER PROGRAM (SHS-VP)', criteria: 'Incoming Grade 11 students. ESC grantees or from public schools.', details: 'Yearly voucher amount varies based on previous school.' },
    { name: 'GOV. EUGENIO V. LACSON EDUCATIONAL ASSISTANCE', criteria: 'Bonafide student of Southland College.', details: 'Yearly educational assistance.' },
    { name: 'CAUAYAN LGU SCHOLARS', criteria: 'Bonafide resident of Cauayan, Neg. Occ.', details: 'Yearly scholarship grant.' },
    { name: 'NEGROS OCCIDENTAL SCHOLARSHIP PROGRAM (NOSP) DEGREE COMPLETION', criteria: 'All college students from Southland College.', details: 'Full tuition, monthly allowance, and other benefits.' },
    { name: 'NEGROS OCCIDENTAL SCHOLARSHIP PROGRAM (NOSP) MIDWIFERY', criteria: 'Students in the BS in Midwifery program.', details: 'Full tuition, monthly allowance, and other benefits.' },
    { name: 'KCEAP SCHOLARS', criteria: 'Bonafide resident of Kabankalan City.', details: 'Yearly financial assistance for College and SHS.' },
    { name: 'GAD SCHOLARSHIP PROGRAM', criteria: 'Bonafide resident of Kabankalan City.', details: 'Yearly financial assistance for College.' },
    { name: 'DSWD EDUCATIONAL CASH ASSISTANCE', criteria: 'Bonafide resident of CHICKS area.', details: 'Yearly educational assistance.' },
    { name: 'REAL LIFE FOUNDATION SCHOLARSHIP', criteria: 'Bonafide student, apply through Victory Office-Kabankalan.', details: 'Semester-based financial support.' },
    { name: 'EDUCATIONAL ASSISTANCE PROGRAM (5th District)', criteria: 'Resident of Hinigaran, Isabela, Binalbagan, La Castellana, Moises Padilla, and Himamaylan City.', details: 'Yearly educational assistance.' },
  ],
};

const requirementsData = [
    { title: 'COLLEGE ENTRANCE SCHOLARSHIP', items: ['Certificate of Ranking', 'Certificate of Enrollment'] },
    { title: 'SPORTS AND CULTURAL EXCELLENCE SCHOLARSHIP', items: ['Proof/ Evidence/Certificates of Competition', 'Certificate of Enrollment', 'Endorsement from Coach or Coordinator', 'Certificate of Grades/Photocopy of Report Card'] },
    { title: 'CHURCH PASTOR/BIBLE WOMAN/CHURCH WORKER BENEFIT', items: ['Certification from Pastor', 'Certificate of Enrollment', 'Certificate of Grades/Photocopy of Report Card'] },
    { title: 'STUDENT ASSISTANT BENEFIT', items: ['Resume', 'Application Letter', 'Certificate of Enrollment', 'Photocopy of Report Card', 'Photocopy Good Moral'] },
    { title: 'SIBLINGS PRIVILEGE', items: ['Certificate of Enrollment/Assessment of Enrolled Siblings'] },
    { title: 'RETIRED MILITARY/ PNP PRIVILEGE', items: ['Retirement Order of Parent', 'Certificate of Enrollment', 'Photocopy of Report Card'] },
    { title: 'BARKADAHAN PRIVILEGE', items: ['Certificate of Enrollment/Assessment of Enrolled Schoolmates', 'Photocopy of Report Card', 'Note: (Only 1 student will apply per group)'] },
    { title: 'SC LOYALTY PRIVILEGE', items: ['Certificate of Enrollment', 'Photocopy of Report Card'] },
    { title: 'TRANSFEREE PRIVILIGE', items: ['Certificate of Enrollment/Assessment', 'Photocopy of TOR'] },
    { title: 'TEACHER EDUCATION PRIVILEGE', items: ['No need to apply. This will be automatically credited in your account'] },
    { title: 'CHED MERIT SCHOLARSHIP PROGRAM', items: ['CHED Facebook Page will announce the Requirements'] },
    { title: 'CHED TERTIARY EDUCATIONAL SCHOLARSHIP', items: ['No requirements just patiently wait for the opening of application. To be announce by the Scholarship Office'] },
    { title: 'CHED TULONG DUNONG PROGRAM', items: ['Requirements will be given by the Brgy or the CHED District Office'] },
    { title: 'EDUCATION SERVICE CONTRACTING (ESC) PROGRAM', items: ['For Grade 7:', '1. Accomplished ESC Forms. Requirements is already stated in the Forms', 'For Transferee FAPE Grantee:', '2. ESC Certificate'] },
    { title: 'SENIOR HIGH SCHOOL-VOUCHER PROGRAM (SHS-VP) Grade 11 and Grade 12', items: ['From Public School:', '1. Long white folder with cover', '2. Photocopy Report Card', '3. Photocopy of PSA', 'From Private School:', '1. ESC Certificate', '2. Long white folder with cover', '3. Photocopy Report Card', '4. Photocopy of PSA'] },
    { title: 'GOV. EUGENIO V. LACSON EDUCATIONAL ASSISTANCE', items: ['For New and Transferee Students:', '1. Photocopy Report Card/TOR', '2. Certificate of Enrollment – Blue Signature of Registrar', '3. Brgy. Indigency – Blue Signature of Brgy. Captain', '4. Photocopy ID Front and Back w/ 3 blue signatures', 'Note: Submit the hardcopy of requirements only during the interview'] },
    { title: 'CAUAYAN LGU SCHOLARS', items: ['Cauayan LGU will conduct the selection process.', 'For Qualified Scholars:', '1. Original Brgy. Indigency'] },
    { title: 'NEGROS OCCIDENTAL SCHOLARSHIP PROGRAM (NOSP) DEGREE COMPLETION', items: ['Negros Occidental Provincial Office will conduct the selection process.'] },
    { title: 'NEGROS OCCIDENTAL SCHOLARSHIP PROGRAM (NOSP) MIDWIFERY', items: ['Negros Occidental Provincial Office will conduct the selection process.'] },
    { title: 'KCEAP SCHOLARS', items: ['Kabankalan City LGU will conduct the selection process.'] },
    { title: 'GAD SCHOLARSHIP PROGRAM', items: ['Kabankalan City LGU will conduct the selection process.'] },
    { title: 'DSWD EDUCATIONAL CASH ASSISTANCE', items: ['City LGU will conduct the selection process.'] },
    { title: 'REAL LIFE FOUNDATION SCHOLARSHIP', items: ['RLFI will conduct the selection process, but the school provides endorsement for scholars.'] },
    { title: 'EDUCATIONAL ASSISTANCE PROGRAM (For 5th District)', items: ['District 5 LGU will conduct the selection process, but the school provides endorsement for scholars.'] },
];

const ScholarshipTable = ({ title, description, qualifications, headers }: { title: string, description: string, qualifications: any[], headers: string[] }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        {headers.map(header => <TableHead key={header}>{header}</TableHead>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {qualifications.map((q, i) => (
                        <TableRow key={i}>
                            {Object.values(q).map((val: any, j: number) => <TableCell key={j}>{val}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
)

const RequirementsCard = ({ title, items }: { title: string, items: string[] }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </CardContent>
    </Card>
)

export default function ScholarshipsPage() {
    return (
        <div className="bg-background">
            <PageHeader 
                title="Scholarships & Grants"
                description="Explore a wide range of financial assistance programs available to help you achieve your academic goals at Southland College."
                storageKey="scholarshipBackground"
                defaultImage="https://images.unsplash.com/photo-1529148492464-3e721b96582e?q=80&w=1974&auto=format&fit=crop"
                imageHint="student studying"
            />
            <Breadcrumbs />
            <div className="container mx-auto px-4 py-24">
                <div className="max-w-6xl mx-auto space-y-16">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground mb-8">Entrance Scholarships</h2>
                        <div className="space-y-8">
                            {scholarshipData.entrance.map(s => (
                                <ScholarshipTable key={s.title} {...s} headers={['Rank/Qualification', 'Tuition Fee Discount (TFD)', 'Miscellaneous Fee Discount']} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground mb-8">Academic Scholarships</h2>
                         <div className="space-y-8">
                            {scholarshipData.academic.map(s => (
                                <ScholarshipTable key={s.title} {...s} headers={['Rank/Qualification', 'Tuition Fee Discount (TFD)', 'Miscellaneous Fee Discount']} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground mb-8">Excellence Scholarships</h2>
                         <div className="space-y-8">
                            {scholarshipData.excellence.map(s => (
                                <ScholarshipTable key={s.title} {...s} headers={['Level', 'Place', 'Benefit']} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground mb-8">Benefits & Privileges</h2>
                        <Card>
                            <CardContent className="pt-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Benefit/Privilege</TableHead>
                                            <TableHead>Criteria</TableHead>
                                            <TableHead>Details</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {scholarshipData.benefits.map(b => (
                                            <TableRow key={b.name}>
                                                <TableCell className="font-medium">{b.name}</TableCell>
                                                <TableCell>{b.criteria}</TableCell>
                                                <TableCell>{b.details}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>

                     <div>
                        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground mb-8">Government & Private Scholarships</h2>
                        <Card>
                            <CardContent className="pt-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Program Name</TableHead>
                                            <TableHead>Criteria</TableHead>
                                            <TableHead>Details</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {scholarshipData.government.map(b => (
                                            <TableRow key={b.name}>
                                                <TableCell className="font-medium">{b.name}</TableCell>
                                                <TableCell>{b.criteria}</TableCell>
                                                <TableCell>{b.details}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground mb-8">Scholarship Requirements</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {requirementsData.map(req => (
                                <RequirementsCard key={req.title} title={req.title} items={req.items} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
