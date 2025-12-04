
import { z } from 'zod';

// Forms

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const enrollmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional(),
  program: z.string({ required_error: "Please select a program." }),
  message: z.string().optional(),
});

export type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

export const alumniUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  graduationYear: z.string().regex(/^\d{4}$/, "Please enter a valid 4-digit year."),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
});

export type AlumniUpdateFormData = z.infer<typeof alumniUpdateSchema>;

export const alumniStorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  graduationYear: z.string().regex(/^\d{4}$/, "Please enter a valid 4-digit year."),
  story: z.string().min(50, "Your story must be at least 50 characters long."),
});

export type AlumniStoryFormData = z.infer<typeof alumniStorySchema>;

export const alumniSignInSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string().min(1, { message: "Password is required." }),
});

export type AlumniSignInData = z.infer<typeof alumniSignInSchema>;

export const alumniSignUpSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    graduationYear: z.string().regex(/^\d{4}$/, "Please enter a valid 4-digit year."),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export type AlumniSignUpData = z.infer<typeof alumniSignUpSchema>;


// Chatbot
const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.array(z.object({ text: z.string() })),
});

export const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
  message: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.object({
  message: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;


// News / Articles

export const newsFormSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters.'),
  slug: z.string().optional(),
  date: z.string().min(1, 'Date is required.'),
  category: z.string().min(3, 'Category must be at least 3 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  fullContent: z.string().min(50, 'Full content must be at least 50 characters.'),
  image: z.string().min(1, 'Please upload an image.'),
  hint: z.string().min(3, 'Hint must be at least 3 characters.'),
  imagePath: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

export type NewsFormData = z.infer<typeof newsFormSchema>;

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  description: string;
  fullContent: string;
  image: string;
  hint: string;
  imagePath?: string;
  isFeatured?: boolean;
};

// Careers
export const jobPostingSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  date: z.string().min(1, 'Date is required.'),
  image: z.string().url("Please upload an image.").min(1, 'Please upload an image.'),
  imagePath: z.string().optional(),
  order: z.number().optional(),
});

export type JobPostingFormData = z.infer<typeof jobPostingSchema>;

export type JobPosting = {
  id: string;
  title: string;
  date: string;
  image: string;
  imagePath?: string;
  order: number;
};


// Editable Site Content

export const whyChooseUsFeatureSchema = z.object({
  icon: z.string().min(1, "Icon is required."),
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
});

export type WhyChooseUsFeature = z.infer<typeof whyChooseUsFeatureSchema>;


export const homepageChannelItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  image: z.string().url("Image URL is required."),
  imagePath: z.string().optional(),
  order: z.number(),
});

export type HomepageChannelItem = z.infer<typeof homepageChannelItemSchema>;

export const homepageChannelItemsSchema = z.object({
  items: z.array(homepageChannelItemSchema),
});
export type HomepageChannelItemsForm = z.infer<typeof homepageChannelItemsSchema>;


// Academics

const facultyMemberSchema = z.object({
  name: z.string().min(1, "Name is required."),
  title: z.string().min(1, "Title is required."),
  image: z.string().url("Must be a valid URL.").optional().or(z.literal('')),
});

export const academicProgramSchema = z.object({
  id: z.string(),
  slug: z.string(),
  icon: z.string(),
  school: z.string().min(1, "School name is required."),
  description: z.string().min(1, "Description is required."),
  mission: z.string().min(1, "Mission is required."),
  image: z.string().url("Must be a valid URL.").optional().or(z.literal('')),
  courses: z.array(z.string()),
  faculty: z.array(facultyMemberSchema),
  order: z.number().optional(),
});

export type AcademicProgram = z.infer<typeof academicProgramSchema>;
export type FacultyMember = z.infer<typeof facultyMemberSchema>;

// Student Life
export const studentLifeSectionSchema = z.object({
    id: z.string(),
    title: z.string().min(1, 'Title is required.'),
    description: z.string().min(1, 'Description is required.'),
    icon: z.string().min(1, 'Icon name is required.'),
    href: z.string().optional(),
    cta: z.string().min(1, 'CTA text is required.'),
    storageKey: z.string().min(1, 'Storage key is required.'),
    imageHint: z.string().min(1, 'Image hint is required.'),
    image: z.string().url('Image URL must be a valid URL.'),
    imagePath: z.string().optional(),
    isModal: z.boolean().optional(),
    order: z.number(),
});
export type StudentLifeSection = z.infer<typeof studentLifeSectionSchema>;

export const studentLifeSectionsSchema = z.object({
  sections: z.array(studentLifeSectionSchema),
});
export type StudentLifeSectionsForm = z.infer<typeof studentLifeSectionsSchema>;
