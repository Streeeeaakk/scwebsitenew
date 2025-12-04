
'use server';

import { 
  enrollmentSchema, 
  type EnrollmentFormData,
  type NewsItem,
  type WhyChooseUsFeature,
  whyChooseUsFeatureSchema,
  newsFormSchema,
  type NewsFormData,
  contactFormSchema,
  type ContactFormData,
  academicProgramSchema,
  type AcademicProgram,
  alumniUpdateSchema,
  type AlumniUpdateFormData,
  alumniStorySchema,
  type AlumniStoryFormData,
  jobPostingSchema,
  type JobPosting,
  type JobPostingFormData,
  homepageChannelItemSchema,
  type HomepageChannelItem,
  homepageChannelItemsSchema,
  type HomepageChannelItemsForm,
  studentLifeSectionSchema,
  type StudentLifeSection,
  studentLifeSectionsSchema,
  type StudentLifeSectionsForm,
} from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { db as adminDb, bucket, isInitialized as adminDbInitialized } from '@/lib/firebaseAdmin'; // Use Admin DB
import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { academicPrograms as defaultAcademicPrograms, createSlug as createProgramSlug } from '@/lib/academics-data';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { Users, Bike, Paintbrush, Heart, Briefcase, CalendarDays } from 'lucide-react';

// This is a simplified client-side representation for fetching.
// The actual Admin SDK initialization should be in a separate, server-only file
// or within API routes/server actions that use it.
let db: admin.firestore.Firestore;
if (adminDbInitialized) {
    db = adminDb;
} else {
    try {
        if (!getApps().length) {
            // This initialization is a fallback for environments where admin might not be pre-initialized.
            // @ts-ignore
            const serviceAccount = require('@/lib/serviceAccountKey.json');
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
            console.log('✅ Firebase Admin SDK initialized successfully for GET actions (fallback).');
        }
        db = admin.firestore();
    } catch (error: any) {
        console.error("🔴 FATAL: Failed to initialize Firebase Admin SDK in actions.ts for GET requests.");
        if (error.code === 'MODULE_NOT_FOUND') {
            console.error("🔴 REASON: The file 'src/lib/serviceAccountKey.json' could not be found.");
        } else {
            console.error("🔴 REASON: There was an issue parsing the service account key.", error);
        }
    }
}


// ONE-TIME SETUP
export async function setupInitialData() {
    if (!adminDbInitialized) {
        console.warn("Skipping initial data setup: Admin DB not initialized.");
        return { success: false, message: 'Admin DB not initialized.' };
    }
    
    const batch = adminDb.batch();
    
    try {
        // --- Setup Academics ---
        const academicsCollection = adminDb.collection('academics');
        const academicsSnapshot = await academicsCollection.limit(1).get();

        if (academicsSnapshot.empty) {
            console.log("Firestore 'academics' collection is empty. Populating with initial data...");
            
            defaultAcademicPrograms.forEach((program, index) => {
                const docRef = academicsCollection.doc(); // Auto-generate ID
                const dataWithOrder = {
                    ...program,
                    order: index, // Add an order field
                    id: docRef.id,
                    slug: createProgramSlug(program.school),
                };
                batch.set(docRef, dataWithOrder);
            });
            
            console.log("Successfully populated 'academics' collection with initial data.");
        } else {
            console.log("Firestore 'academics' collection already contains data. Skipping population.");
        }
        
        // --- Setup Homepage Channel ---
        const homepageContentRef = adminDb.collection('siteContent').doc('homepage');
        const homepageSnapshot = await homepageContentRef.get();
        
        if (!homepageSnapshot.exists || !homepageSnapshot.data()?.channelItems) {
            console.log("Firestore 'homepage' channel items are missing. Populating with initial data...");
            
            const defaultChannelItems: HomepageChannelItem[] = [
                { id: '1', title: 'Championship Highlights', description: 'Relive the best moments from our historic championship win.', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070&auto=format&fit=crop', imagePath: '', order: 0 },
                { id: '2', title: 'Annual Arts Festival', description: 'A celebration of creativity and talent from our student artists.', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop', imagePath: '', order: 1 },
                { id: '3', title: 'Theater Club Presents: Hamlet', description: 'A stunning modern take on a classic tragedy.', image: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?q=80&w=2070&auto=format&fit=crop', imagePath: '', order: 2 },
                { id: '4', title: 'Debate Team National Finals', description: 'Watch our debate team argue their way to victory.', image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop', imagePath: '', order: 3 },
                { id: '5', title: 'Science Fair Innovations', description: 'See the amazing projects from our future scientists.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop', imagePath: '', order: 4 },
                { id: '6', title: 'Community Service Day', description: 'Our students giving back to the local community.', image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop', imagePath: '', order: 5 },
            ];
            
            batch.set(homepageContentRef, { channelItems: defaultChannelItems }, { merge: true });
            console.log("Successfully populated 'homepage' channel items.");
        } else {
             console.log("Firestore 'homepage' channel items already exist. Skipping population.");
        }

        // --- Setup Student Life ---
        const studentLifeRef = adminDb.collection('siteContent').doc('studentLife');
        const studentLifeSnapshot = await studentLifeRef.get();
        if (!studentLifeSnapshot.exists || !studentLifeSnapshot.data()?.sections) {
            console.log("Firestore 'studentLife' sections are missing. Populating with initial data...");
            const defaultStudentLifeSections: Omit<StudentLifeSection, 'id' | 'imagePath'>[] = [
                {
                    title: 'Student Organizations', description: 'Find your community from over 50 student-led clubs and organizations. Develop leadership skills, pursue your passions, and make lifelong friends.', icon: 'Users', href: '/student-life/student-organizations', cta: 'Explore Clubs', storageKey: 'studentLifeOrgs', imageHint: 'group of students', image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop', order: 0
                },
                {
                    title: 'Athletics & Recreation', description: 'Stay active and show your school spirit. Join one of our varsity teams or participate in intramural sports and fitness classes.', icon: 'Bike', href: '/student-life/athletics-and-recreation', cta: 'View Teams', storageKey: 'studentLifeAthletics', imageHint: 'basketball game', image: 'https://images.unsplash.com/photo-1541250848049-b9f71362cb36?q=80&w=2070&auto=format&fit=crop', order: 1
                },
                {
                    title: 'Arts & Culture', description: "Express your creativity and immerse yourself in the arts. From theater productions to art exhibitions, there's always something to inspire you.", icon: 'Paintbrush', href: '/student-life/arts-and-culture', cta: 'Discover Arts', storageKey: 'studentLifeArts', imageHint: 'painting art class', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=2073&auto=format&fit=crop', order: 2
                },
                {
                    title: 'Health & Wellness', description: 'Your well-being is our priority. Access a range of services including counseling, health workshops, and wellness programs to support a healthy mind and body.', icon: 'Heart', href: '/student-life/health-and-wellness', cta: 'Learn More', storageKey: 'studentLifeWellness', imageHint: 'yoga wellness', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop', order: 3
                },
                {
                    title: 'Career Services', description: 'Prepare for your future with our dedicated career services team. Get help with resumes, interviews, and connecting with top employers for internships and jobs.', icon: 'Briefcase', href: '/student-life/career-services', cta: 'Plan Your Career', storageKey: 'studentLifeCareers', imageHint: 'job interview', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop', order: 4
                },
                {
                    title: 'Campus Events', description: "There's always something happening at Southland. Check out our full calendar to find events, workshops, and important dates.", icon: 'CalendarDays', isModal: true, cta: 'View Full Calendar', storageKey: 'studentLifeCalendar', imageHint: 'event calendar', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop', order: 5
                },
            ];

            const sectionsWithIds = defaultStudentLifeSections.map(section => ({
                ...section,
                id: adminDb.collection('siteContent').doc().id,
                imagePath: '',
            }));

            batch.set(studentLifeRef, { sections: sectionsWithIds }, { merge: true });
            console.log("Successfully populated 'studentLife' sections.");
        } else {
            console.log("Firestore 'studentLife' sections already exist. Skipping population.");
        }
        
        await batch.commit();

        return { success: true, message: "Initial data setup complete." };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred during initial data setup.';
        console.error('🔴 Error during initial data setup:', errorMessage);
        return { success: false, message: errorMessage };
    }
}


// IMAGE CONTENT MANAGEMENT
export async function getSiteImages(): Promise<Record<string, string>> {
    if (!db) {
        console.error("🔴 Firestore is not initialized. Cannot fetch site images.");
        return {};
    }
    const docRef = db.collection('siteContent').doc('images');
    const doc = await docRef.get();

    if (!doc.exists) {
        return {};
    }

    return doc.data() || {};
}

export async function setSiteImage(key: string, url: string) {
    if (!adminDbInitialized) {
        return { success: false, message: "Admin Firestore is not initialized." };
    }
    if (!key || !url) {
        return { success: false, message: "Image key and URL are required." };
    }

    try {
        const docRef = adminDb.collection('siteContent').doc('images');
        await docRef.set({ [key]: url }, { merge: true });

        // Revalidate paths where this image might be used.
        // This is a broad revalidation, could be more specific if needed.
        revalidatePath('/', 'layout');
        
        return { success: true, message: `Image for ${key} updated successfully.` };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
        return { success: false, message: errorMessage };
    }
}


export async function getWhyChooseUsFeatures(): Promise<WhyChooseUsFeature[]> {
    if (!db) {
        console.error("🔴 Firestore is not initialized. Cannot fetch features.");
        return [];
    }
    const docRef = db.collection('siteContent').doc('homepage');
    const doc = await docRef.get();

    if (!doc.exists) {
        return [];
    }

    const data = doc.data();
    return data?.whyChooseUsFeatures || [];
}

export async function updateWhyChooseUsFeatures(features: WhyChooseUsFeature[]) {
  const featuresSchema = z.array(whyChooseUsFeatureSchema);
  const validation = featuresSchema.safeParse(features);

  if (!validation.success) {
    return { success: false, message: "Invalid data format.", errors: validation.error.format() };
  }

  if (!adminDbInitialized) {
    return { success: false, message: 'Admin DB is not initialized.' };
  }

  try {
    const docRef = adminDb.collection('siteContent').doc('homepage');
    await docRef.set({ whyChooseUsFeatures: validation.data }, { merge: true });
    revalidatePath('/'); // Revalidate the homepage
    return { success: true, message: "Homepage features updated successfully." };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return { success: false, message: errorMessage };
  }
}

// HOMEPAGE CHANNEL MANAGEMENT
export async function getHomepageChannelItems(): Promise<HomepageChannelItem[]> {
    if (!db) {
        console.error("🔴 Firestore is not initialized. Cannot fetch channel items.");
        return [];
    }
    const docRef = db.collection('siteContent').doc('homepage');
    const doc = await docRef.get();

    if (!doc.exists) {
        return [];
    }

    const data = doc.data();
    const items = data?.channelItems || [];
    
    // Sort by order property
    return items.sort((a: HomepageChannelItem, b: HomepageChannelItem) => (a.order ?? 0) - (b.order ?? 0));
}

export async function addOrUpdateHomepageChannelItems(formData: HomepageChannelItemsForm) {
    const validation = homepageChannelItemsSchema.safeParse(formData);

    if (!validation.success) {
        return { success: false, message: "Invalid data format.", errors: validation.error.format() };
    }

    if (!adminDbInitialized) {
        return { success: false, message: "Admin DB is not initialized." };
    }

    try {
        const docRef = adminDb.collection('siteContent').doc('homepage');
        await docRef.set({ channelItems: validation.data.items }, { merge: true });
        revalidatePath('/'); // Revalidate the homepage
        return { success: true, message: "Homepage channel items updated successfully." };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
        return { success: false, message: errorMessage };
    }
}


// NEWS / ARTICLES MANAGEMENT
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export async function getNewsArticles(): Promise<NewsItem[]> {
    if (!db) {
        console.error("🔴 Firestore is not initialized. Cannot fetch news articles.");
        return [];
    }
    const newsCollection = await db.collection('news').orderBy('date', 'desc').get();
    
    return newsCollection.docs.map(doc => {
        const data = doc.data();
        const date = (data.date as Timestamp).toDate();
        return {
            id: doc.id,
            ...data,
            date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        } as NewsItem;
    });
}

export async function getArticle(slug: string): Promise<NewsItem | null> {
    if (!db) {
        console.error("🔴 Firestore is not initialized. Cannot fetch article.");
        return null;
    }
    const articles = await db.collection('news').where('slug', '==', slug).limit(1).get();
    
    if (articles.empty) {
        return null;
    }
    
    const doc = articles.docs[0];
    const data = doc.data();
    const date = (data.date as Timestamp).toDate();
    
    return {
        id: doc.id,
        ...data,
        date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    } as NewsItem;
}

export async function addOrUpdateArticle(articleData: NewsFormData & { id?: string }) {
    if (!adminDbInitialized) {
        return { success: false, message: "Admin DB not initialized." };
    }
    const validatedFields = newsFormSchema.safeParse(articleData);

    if (!validatedFields.success) {
        return { success: false, message: 'Invalid form data.', errors: validatedFields.error.format() };
    }

    const data: any = {
        ...validatedFields.data,
        date: Timestamp.fromDate(new Date(validatedFields.data.date)),
        slug: validatedFields.data.slug || createSlug(validatedFields.data.title),
    };

    const id = articleData.id || null;

    try {
        const newsCollection = adminDb.collection('news');
        await adminDb.runTransaction(async t => {
            if (data.isFeatured) {
                const featuredSnapshot = await newsCollection.where('isFeatured', '==', true).get();
                featuredSnapshot.forEach(doc => {
                    if (doc.id !== id) {
                        t.update(doc.ref, { isFeatured: false });
                    }
                });
            }

            if (id) {
                const articleRef = newsCollection.doc(id);
                const doc = await t.get(articleRef);

                if (doc.exists) {
                    const oldData = doc.data() as NewsItem;
                    if (oldData.imagePath && oldData.imagePath !== data.imagePath) {
                        try {
                            const oldFile = bucket.file(oldData.imagePath);
                            const [exists] = await oldFile.exists();
                            if (exists) {
                                await oldFile.delete();
                            }
                        } catch (e) {
                            console.warn(`Could not delete old image ${oldData.imagePath}, continuing...`, e);
                        }
                    }
                }
                t.update(articleRef, data);
            } else {
                const newArticleRef = newsCollection.doc();
                t.set(newArticleRef, data);
            }
        });

        revalidatePath('/admin/settings/news');
        revalidatePath('/news');
        if (data.slug) {
            revalidatePath(`/news/${data.slug}`);
        }
        revalidatePath('/');
        
        return { success: true, message: `Article ${id ? 'updated' : 'added'} successfully!`, slug: data.slug };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, message: errorMessage };
    }
}

export async function deleteArticle(id: string) {
    if (!adminDbInitialized) {
        return { success: false, message: "Admin DB not initialized." };
    }
    try {
        const articleRef = adminDb.collection('news').doc(id);
        const doc = await articleRef.get();

        if (!doc.exists) {
            return { success: false, message: 'Article not found.' };
        }

        const data = doc.data() as NewsItem;
        if (data.imagePath) {
            try {
                const file = bucket.file(data.imagePath);
                const [exists] = await file.exists();
                if (exists) {
                    await file.delete();
                }
            } catch (storageError: any) {
                console.warn(`Could not delete image ${data.imagePath}: ${storageError.message}. Continuing with db deletion.`);
            }
        }

        await articleRef.delete();
        revalidatePath('/admin/settings/news');
        revalidatePath('/news');
        if (data.slug) {
            revalidatePath(`/news/${data.slug}`);
        }
        revalidatePath('/');

        return { success: true, message: 'Article deleted successfully.', slug: data.slug };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, message: errorMessage };
    }
}


// ACADEMICS MANAGEMENT
export async function getAcademicPrograms(): Promise<AcademicProgram[]> {
    if (!db) {
        console.error("🔴 Firestore is not initialized. Cannot fetch academic programs.");
        return [];
    }
    const programsCollection = await db.collection('academics').orderBy('order').get();
    
    if (programsCollection.empty) {
        return [];
    }

    return programsCollection.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data(),
        } as AcademicProgram;
    });
}

export async function updateAcademicProgram(programData: AcademicProgram) {
    const validation = academicProgramSchema.safeParse(programData);

    if (!validation.success) {
        return { success: false, message: "Invalid data format.", errors: validation.error.format() };
    }

    if (!adminDbInitialized) {
      return { success: false, message: "Admin DB not initialized" };
    }

    try {
        const { id, ...dataToSave } = validation.data;
        const docRef = adminDb.collection('academics').doc(id);
        await docRef.update(dataToSave);
        
        revalidatePath('/admin/settings/academics');
        revalidatePath('/academics');
        revalidatePath(`/academics/${dataToSave.slug}`);

        return { success: true, message: "Academic program updated successfully." };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
        return { success: false, message: errorMessage };
    }
}

// CAREERS MANAGEMENT
export async function getJobPostings(): Promise<JobPosting[]> {
    if (!db) {
        console.error("🔴 Firestore is not initialized. Cannot fetch job postings.");
        return [];
    }
    const jobsCollection = await db.collection('careers').orderBy('order', 'asc').get();
    
    return jobsCollection.docs.map(doc => {
        const data = doc.data();
        const date = (data.date as Timestamp).toDate();
        return {
            id: doc.id,
            ...data,
            date: date.toISOString().split('T')[0],
        } as JobPosting;
    });
}

export async function addOrUpdateJobPosting(jobData: JobPostingFormData & { id?: string, order?: number }) {
    if (!adminDbInitialized) {
        return { success: false, message: "Admin DB not initialized." };
    }

    const validatedFields = jobPostingSchema.safeParse(jobData);
    if (!validatedFields.success) {
        return { success: false, message: 'Invalid form data.', errors: validatedFields.error.format() };
    }
    
    const { id, ...data } = validatedFields.data;
    
    try {
        const jobsCollection = adminDb.collection('careers');
        let docRef;
        
        if (id) {
            docRef = jobsCollection.doc(id);
            await docRef.update({
                ...data,
                date: Timestamp.fromDate(new Date(data.date)),
            });
        } else {
            docRef = jobsCollection.doc();
            const snapshot = await jobsCollection.orderBy('order', 'desc').limit(1).get();
            const lastOrder = snapshot.empty ? -1 : (snapshot.docs[0].data().order || 0);

            await docRef.set({
                ...data,
                date: Timestamp.fromDate(new Date(data.date)),
                order: lastOrder + 1,
            });
        }

        revalidatePath('/admin/settings/careers');
        revalidatePath('/careers');
        
        return { success: true, message: `Job posting ${id ? 'updated' : 'added'} successfully!`, id: docRef.id };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, message: errorMessage };
    }
}

export async function deleteJobPosting(id: string) {
    if (!adminDbInitialized) {
        return { success: false, message: "Admin DB not initialized." };
    }
    try {
        const jobRef = adminDb.collection('careers').doc(id);
        const doc = await jobRef.get();

        if (!doc.exists) {
            return { success: false, message: 'Job posting not found.' };
        }

        const data = doc.data() as JobPosting;
        if (data.imagePath) {
            try {
                const file = bucket.file(data.imagePath);
                const [exists] = await file.exists();
                if (exists) await file.delete();
            } catch (storageError: any) {
                console.warn(`Could not delete image ${data.imagePath}: ${storageError.message}.`);
            }
        }
        await jobRef.delete();
        revalidatePath('/admin/settings/careers');
        revalidatePath('/careers');

        return { success: true, message: 'Job posting deleted successfully.' };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
        return { success: false, message: errorMessage };
    }
}

export async function updateJobPostingOrder(jobs: { id: string; order: number }[]) {
  if (!adminDbInitialized) {
    return { success: false, message: 'Admin DB not initialized.' };
  }

  const batch = adminDb.batch();
  jobs.forEach(job => {
    const docRef = adminDb.collection('careers').doc(job.id);
    batch.update(docRef, { order: job.order });
  });

  try {
    await batch.commit();
    revalidatePath('/careers');
    revalidatePath('/admin/settings/careers');
    return { success: true, message: 'Job posting order updated.' };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return { success: false, message: errorMessage };
  }
}

// ALUMNI & ANALYTICS
export async function getAlumniCount(): Promise<number> {
    if (!db) {
        console.error("🔴 Firestore is not initialized. Cannot fetch alumni count.");
        return 0;
    }
    try {
        const snapshot = await db.collection('alumni').count().get();
        return snapshot.data().count;
    } catch (error) {
        console.error("Error fetching alumni count:", error);
        return 0;
    }
}

export async function getSiteVisits(): Promise<number> {
    if (!db) {
        console.error("🔴 Firestore is not initialized. Cannot fetch site visits.");
        return 0;
    }
    try {
        const docRef = db.collection('siteContent').doc('analytics');
        const doc = await docRef.get();
        if (!doc.exists) {
            return 0;
        }
        return doc.data()?.visits || 0;
    } catch (error) {
        console.error("Error fetching site visits:", error);
        return 0;
    }
}

export async function incrementSiteVisit() {
    if (!adminDbInitialized) {
        console.warn("Skipping site visit increment: Admin DB not initialized.");
        return;
    }
    try {
        const docRef = adminDb.collection('siteContent').doc('analytics');
        await docRef.set({
            visits: FieldValue.increment(1)
        }, { merge: true });
    } catch (error) {
        // We don't want to throw an error to the client for this,
        // so we'll just log it on the server.
        console.error("🔴 Error incrementing site visit counter:", error);
    }
}


// FORM SUBMISSIONS

export async function submitEnrollmentInquiry(data: EnrollmentFormData) {
  const validatedFields = enrollmentSchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, message: "Invalid form data." };
  }
  
  if (!adminDbInitialized) {
    return { success: false, message: "Server not configured for submissions." };
  }

  try {
    await adminDb.collection('enrollment_inquiries').add({
      ...validatedFields.data,
      submittedAt: FieldValue.serverTimestamp(),
    });
    return {
      success: true,
      message: "Thank you for your inquiry! Our admissions team will be in touch with you shortly.",
    };
  } catch (error) {
    console.error("Error submitting enrollment inquiry to Firestore:", error);
    return { success: false, message: "Could not submit your inquiry. Please try again later." };
  }
}

async function sendEmail(subject: string, text: string, recipientEmail: string, replyTo?: { email: string; name: string }) {
    if (!process.env.MAILERSEND_API_KEY) {
        console.error('🔴 MailerSend API key is not set.');
        throw new Error('Server is not configured for sending emails.');
    }

    const mailerSend = new MailerSend({ apiKey: process.env.MAILERSEND_API_KEY });
    
    const sentFrom = new Sender('noreply@southlandcollege.edu.ph', 'Southland College');
    const recipients = [new Recipient(recipientEmail)];
    
    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject(subject)
        .setHtml(text)
        .setText(text);
        
    if (replyTo) {
        emailParams.setReplyTo(replyTo);
    }

    await mailerSend.email.send(emailParams);
}

export async function submitContactForm(data: ContactFormData) {
  const validatedFields = contactFormSchema.safeParse(data);
  const recipientEmail = "wesleyhans.platil@southlandcollege.edu.ph";

  if (!validatedFields.success) {
    return { success: false, message: "Invalid form data.", errors: validatedFields.error.format() };
  }
  
  if (!adminDbInitialized) {
    return { success: false, message: "Server not configured for submissions." };
  }
  
  const { name, email, subject, message } = validatedFields.data;

  try {
    // 1. Save to Firestore
    await adminDb.collection('contact_submissions').add({
      ...validatedFields.data,
      submittedAt: FieldValue.serverTimestamp(),
    });

    // 2. Send email
    const emailHtml = `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;
    await sendEmail(
        `New Contact Form Message: ${subject}`, 
        emailHtml, 
        recipientEmail,
        { email, name }
    );
    
    return { success: true, message: 'Message sent successfully!' };

  } catch (error: any) {
    console.error('🔴 Error in submitContactForm:', error);
    let errorMessage = 'An unknown server error occurred.';
    if (error.body?.message) {
        errorMessage = `Could not send email. Reason: ${error.body.message}`;
    }
    return { success: false, message: errorMessage };
  }
}

export async function submitAlumniUpdate(data: AlumniUpdateFormData) {
  const validatedFields = alumniUpdateSchema.safeParse(data);
  const recipientEmail = "wesleyhans.platil@southlandcollege.edu.ph";

  if (!validatedFields.success) {
    return { success: false, message: "Invalid form data.", errors: validatedFields.error.format() };
  }
  
  if (!adminDbInitialized) {
    return { success: false, message: "Server not configured for submissions." };
  }
  
  const { name, email, graduationYear, company, jobTitle } = validatedFields.data;

  try {
    // 1. Save to Firestore
    await adminDb.collection('alumni_updates').add({
      ...validatedFields.data,
      submittedAt: FieldValue.serverTimestamp(),
    });
    
    // 2. Send email
    const emailHtml = `
      <h1>Alumni Information Update</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Graduation Year:</strong> ${graduationYear}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Job Title:</strong> ${jobTitle || 'Not provided'}</p>
    `;
    await sendEmail(
        `Alumni Info Update for ${name}`, 
        emailHtml,
        recipientEmail,
        { email, name }
    );

    return { success: true, message: 'Your information has been updated successfully!' };
  } catch (error: any) {
    console.error('🔴 Error in submitAlumniUpdate:', error);
    let errorMessage = 'An unknown server error occurred.';
    if (error.body?.message) {
        errorMessage = `Could not send email. Reason: ${error.body.message}`;
    }
    return { success: false, message: errorMessage };
  }
}

export async function submitAlumniStory(data: AlumniStoryFormData) {
  const validatedFields = alumniStorySchema.safeParse(data);
  const recipientEmail = "wesleyhans.platil@southlandcollege.edu.ph";

  if (!validatedFields.success) {
    return { success: false, message: "Invalid form data.", errors: validatedFields.error.format() };
  }
  
  if (!adminDbInitialized) {
    return { success: false, message: "Server not configured for submissions." };
  }

  const { name, email, graduationYear, story } = validatedFields.data;

  try {
    // 1. Save to Firestore
    await adminDb.collection('alumni_stories').add({
      ...validatedFields.data,
      submittedAt: FieldValue.serverTimestamp(),
    });
    
    // 2. Send email
    const emailHtml = `
      <h1>New Alumni Story Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Graduation Year:</strong> ${graduationYear}</p>
      <p><strong>Story:</strong></p>
      <p>${story}</p>
    `;
    await sendEmail(
        `New Alumni Story from ${name}`, 
        emailHtml,
        recipientEmail,
        { email, name }
    );

    return { success: true, message: 'Thank you for sharing your story!' };
  } catch (error: any) {
    console.error('🔴 Error in submitAlumniStory:', error);
    let errorMessage = 'An unknown server error occurred.';
    if (error.body?.message) {
        errorMessage = `Could not send email. Reason: ${error.body.message}`;
    }
    return { success: false, message: errorMessage };
  }
}

// STUDENT LIFE MANAGEMENT
export async function getStudentLifeSections(): Promise<StudentLifeSection[]> {
    if (!db) {
        console.error("🔴 Firestore is not initialized. Cannot fetch student life sections.");
        return [];
    }
    const docRef = db.collection('siteContent').doc('studentLife');
    const doc = await docRef.get();

    if (!doc.exists) {
        return [];
    }

    const data = doc.data();
    const items = data?.sections || [];
    
    return items.sort((a: StudentLifeSection, b: StudentLifeSection) => (a.order ?? 0) - (b.order ?? 0));
}

export async function updateStudentLifeSections(formData: StudentLifeSectionsForm) {
    const validation = studentLifeSectionsSchema.safeParse(formData);

    if (!validation.success) {
        return { success: false, message: "Invalid data format.", errors: validation.error.format() };
    }

    if (!adminDbInitialized) {
        return { success: false, message: "Admin DB is not initialized." };
    }

    try {
        const docRef = adminDb.collection('siteContent').doc('studentLife');
        await docRef.set({ sections: validation.data.sections }, { merge: true });
        revalidatePath('/student-life');
        revalidatePath('/admin/settings/student-life');
        return { success: true, message: "Student Life sections updated successfully." };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
        return { success: false, message: errorMessage };
    }
}
