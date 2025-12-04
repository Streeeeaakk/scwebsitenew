
import { BookOpen, Briefcase, HeartPulse, Building2, School } from 'lucide-react';

export const createSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/ & /g, ' and ') // handle ampersand
        .replace(/[.,()]/g, '') // remove punctuation
        .replace(/ and /g, ' ')
        .replace(/\s+/g, '-') // convert spaces to hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
}

export const academicPrograms = [
  {
    slug: 'school-of-engineering-computer-studies-and-architecture',
    icon: 'Building2',
    school: 'School of Engineering, Computer Studies, and Architecture',
    description: 'Fostering innovation and practical skills in the tech leaders of tomorrow.',
    mission: 'To provide a world-class education in engineering, computer science, and architecture, equipping students with the theoretical knowledge and practical skills needed to solve complex problems, drive technological advancement, and design sustainable solutions for a global society.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
    courses: [
      'Bachelor of Science in Information Technology (BSIT)',
      'Bachelor of Science in Architecture (BSARCH)',
      'Bachelor of Science in Mechanical Engineering (BSME)',
      'Bachelor of Science in Civil Engineering (BSCE)',
      'Bachelor of Science in Electrical Engineering (BSEE)',
    ],
    faculty: [
        { name: 'Nolan E. Fernandez, RME, M.Eng', title: 'Dean', image: 'https://placehold.co/100x100.png' },
        { name: 'David M. Mueller, EE, ME', title: 'Program Head - EE', image: 'https://placehold.co/100x100.png' },
        { name: 'Daniel Tagulalac Jr., A.', title: 'Faculty', image: 'https://placehold.co/100x100.png' },
        { name: 'Charess V. Gendran, RME, M.Eng', title: 'Faculty', image: 'https://placehold.co/100x100.png' },
        { name: 'Lance V. Arellano', title: 'Faculty', image: 'https://placehold.co/100x100.png' },
        { name: 'Ma. Cassandra Sicapore', title: 'Faculty', image: 'https://placehold.co/100x100.png' }
    ]
  },
  {
    slug: 'school-of-business-and-accountancy',
    icon: 'Briefcase',
    school: 'School of Business and Accountancy',
    description: 'Developing ethical and effective leaders for the global marketplace.',
    mission: 'To cultivate the next generation of business leaders and accounting professionals through a curriculum that emphasizes ethical practices, strategic thinking, and entrepreneurial spirit. We are dedicated to providing students with the skills to navigate the dynamic world of commerce.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2134&auto=format&fit=crop',
    courses: [
      'Bachelor of Science in Accountancy (BSA)',
      'Bachelor of Science in Business Administration (BSBA)',
      'Bachelor of Science in Accounting Information System (BSAIS)',
    ],
    faculty: [
        { name: 'Rene Talanquines, PhD', title: 'Dean - SBA', image: 'https://placehold.co/100x100.png' },
        { name: 'Jan Mark P. Cahilig, CPA, MBA', title: 'Program Head - BSA', image: 'https://placehold.co/100x100.png' },
        { name: 'Edwin J. Banarjee, MBA', title: 'Program Head - BSBA', image: 'https://placehold.co/100x100.png' },
        { name: 'Jonalyn Torremoro', title: 'OIC-Program Head - BSBA', image: 'https://placehold.co/100x100.png' },
        { name: 'Kate Cent Lim, LPT', title: 'Faculty', image: 'https://placehold.co/100x100.png' },
        { name: 'Joey B. Orcena', title: 'Faculty', image: 'https://placehold.co/100x100.png' },
        { name: 'Daneilla T. Gelasan', title: 'Faculty', image: 'https://placehold.co/100x100.png' },
        { name: 'Jeramie D. Sabrin', title: 'Faculty', image: 'https://placehold.co/100x100.png' },
        { name: 'Mariel Ann L. Guiljon, CPA', title: 'Faculty-New', image: 'https://placehold.co/100x100.png' },
        { name: 'Raybelle M. Flores', title: 'Faculty-New', image: 'https://placehold.co/100x100.png' },
        { name: 'Shyrlene H. Buatag', title: 'Faculty-New', image: 'https://placehold.co/100x100.png' },
    ]
  },
  {
    slug: 'school-of-hospitality-and-tourism-management',
    icon: 'Briefcase',
    school: 'School of Hospitality and Tourism Management',
    description: 'Crafting world-class experiences in the vibrant tourism industry.',
    mission: 'To prepare students for leadership roles in the global hospitality and tourism industry through hands-on training, international exposure, and a focus on service excellence. We inspire a passion for creating unforgettable guest experiences.',
    image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=1935&auto=format&fit=crop',
    courses: [
      'Bachelor of Science in Hospitality Management (BSHM)',
      'Bachelor of Science in Tourism Management (BSTM)',
    ],
    faculty: [
        { name: 'Maverick Soriano', title: 'OIC-Program Head - SHTM', image: 'https://placehold.co/100x100.png' },
        { name: 'Maria Luisa P. Macariola', title: 'Faculty', image: 'https://placehold.co/100x100.png' },
        { name: 'Jessa Mae C. Deguitos', title: 'Faculty', image: 'https://placehold.co/100x100.png' },
    ]
  },
  {
    slug: 'school-of-education-arts-and-sciences',
    icon: 'BookOpen',
    school: 'School of Education, Arts and Sciences',
    description: 'Exploring the depths of human knowledge and creativity.',
    mission: 'To foster intellectual curiosity, critical thinking, and creative expression through a broad-based liberal arts and sciences education. We aim to prepare thoughtful, engaged citizens and educators who can inspire future generations.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop',
    courses: [
      'Bachelor of Elementary Education (BEED)',
      'Bachelor of Secondary Education (BSED)',
      'Bachelor of Arts in Political Science (AB PolSci)',
    ],
    faculty: [
        { name: 'Mello Jane G. Dedosin, LPT, MAEd', title: 'Program Head', image: 'https://placehold.co/100x100.png' },
        { name: 'Razel G. Taquiso, LPT, MAEd', title: 'Faculty', image: 'https://placehold.co/100x100.png' },
        { name: 'Marla Joy T. Lucerna, LPT, MASPEd', title: 'Faculty', image: 'https://placehold.co/100x100.png' },
        { name: 'Edwin P. Taquiso', title: 'Faculty', image: 'https://placehold.co/100x100.png' },
        { name: 'Ammie B. Ladios, LPT', title: 'Faculty', image: 'https://placehold.co/100x100.png' },
        { name: 'Reyland H. Carriedo, LPT', title: 'Faculty', image: 'https://placehold.co/100x100.png' },
        { name: 'Melchie Marie C. Mediadero, LPT', title: 'Faculty-New', image: 'https://placehold.co/100x100.png' },
        { name: 'Precious Thea E. Lamela, LPT, MAEd', title: 'Faculty-New', image: 'https://placehold.co/100x100.png' },
        { name: 'Romeo Antonio', title: 'NSTP Coordinator', image: 'https://placehold.co/100x100.png' },
    ]
  },
  {
    slug: 'school-of-midwifery-and-radiologic-technology',
    icon: 'HeartPulse',
    school: 'School of Midwifery and Radiologic Technology',
    description: 'Training the next generation of healthcare professionals with compassion and skill.',
    mission: 'To provide exemplary education and clinical training in midwifery and radiologic technology, grounded in compassionate care, ethical practice, and the latest medical advancements. Our graduates are prepared to be competent and caring healthcare professionals.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
    courses: [
        'Bachelor of Science in Radiologic Technology',
        'Diploma in Midwifery',
    ],
    faculty: [
        { name: 'Juan Antonio Z. Villaluz, RN, PHD', title: 'Dean', image: 'https://placehold.co/100x100.png' },
        { name: 'Rene P. Barredo, RM', title: 'Clinical Instructor', image: 'https://placehold.co/100x100.png' },
        { name: 'Jairus O. Ternora, RM', title: 'Clinical Instructor', image: 'https://placehold.co/100x100.png' },
        { name: 'Renee Victoria T. Villanoche', title: 'Faculty-New', image: 'https://placehold.co/100x100.png' },
        { name: 'Ezza Mae S. Mongcal', title: 'Sec, SMART Department', image: 'https://placehold.co/100x100.png' }
    ]
  },
  {
    slug: 'basic-education-department',
    icon: 'School',
    school: 'Basic Education Department',
    description: 'Nurturing young minds and building a strong foundation for lifelong learning.',
    mission: 'To provide a holistic and nurturing basic education that fosters intellectual, social, emotional, and physical development. We are committed to creating a safe and stimulating environment where young learners can discover their potential and build a strong foundation for future academic success and responsible citizenship.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop',
    courses: [
      'Preschool',
      'Elementary',
      'Junior High School',
      'Senior High School',
    ],
    faculty: [
        { name: 'Dr. Imelda M. Patricio, LPT', title: 'Principal', image: 'https://placehold.co/100x100.png' },
        { name: 'Mrs. Jane Doe', title: 'Preschool Coordinator', image: 'https://placehold.co/100x100.png' },
        { name: 'Mr. John Smith', title: 'Elementary Head Teacher', image: 'https://placehold.co/100x100.png' },
        { name: 'Ms. Emily White', title: 'High School Head Teacher', image: 'https://placehold.co/100x100.png' }
    ]
  },
];

export const getProgramBySlug = (slug: string) => {
    return academicPrograms.find(p => p.slug === slug);
}
