
export type NewsItem = {
    slug: string;
    image: string;
    hint: string;
    title: string;
    date: string;
    description: string;
    fullContent: string;
};

export const newsItems: NewsItem[] = [
    {
        slug: "commencement-ceremony-2024",
        image: "https://placehold.co/600x400",
        hint: "students graduation",
        title: "Southland College Celebrates 100th Commencement Ceremony",
        date: "May 25, 2024",
        description: "A historic day as we honor the graduating class of 2024. The ceremony featured an inspiring speech from guest speaker Dr. Jane Goodall.",
        fullContent: "The recent commencement ceremony was a landmark event for Southland College, filled with joy, pride, and a sense of accomplishment as we celebrated our centennial graduating class. Families, friends, and faculty gathered under a brilliant blue sky to celebrate the achievements of our graduates, who have worked tirelessly to reach this significant milestone. The ceremony was made even more memorable by an inspiring keynote address from world-renowned primatologist Dr. Jane Goodall, who urged graduates to use their knowledge and passion to make a positive impact on the world. The event concluded with a spectacular fireworks display, marking a memorable end to the academic year and the beginning of a new chapter for the Class of 2024."
    },
    {
        slug: "new-science-wing-opens",
        image: "https://placehold.co/600x400",
        hint: "science laboratory",
        title: "New Science & Technology Wing Opens for Fall Semester",
        date: "May 18, 2024",
        description: "Our new state-of-the-art facility is now open, providing students with cutting-edge labs and collaborative research spaces.",
        fullContent: "The new Science & Technology Wing is officially open for the fall semester, marking a significant investment in our commitment to STEM education. This 50,000-square-foot, state-of-the-art facility includes advanced laboratories for biology, chemistry, and physics, as well as collaborative research spaces designed to foster innovation and interdisciplinary projects. The building also features a new computer lab with high-performance workstations for our computer science and engineering students, a dedicated robotics arena, and several smart classrooms. A grand opening ceremony was held, attended by faculty, students, and local dignitaries who praised the college's forward-thinking vision."
    },
    {
        slug: "eagles-win-championship",
        image: "https://placehold.co/600x400",
        hint: "basketball game",
        title: "Southland Eagles Win National Championship",
        date: "May 12, 2024",
        description: "A thrilling victory for our basketball team, bringing home the championship trophy for the first time in school history.",
        fullContent: "In a nail-biting final that will be remembered for years to come, the Southland Eagles have clinched the national championship for the first time in the college's history. The team fought hard throughout the tournament, demonstrating incredible resilience and skill. Their dedication paid off in a thrilling 78-75 victory over our rivals, the Northwood Tigers. The final seconds of the game were intense, with a game-winning three-point shot as the buzzer sounded, sending the crowd into a frenzy. The campus is buzzing with excitement, and a parade is planned for this Friday to celebrate our champions. This historic win is a testament to their teamwork, perseverance, and indomitable spirit."
    },
    {
        slug: "student-art-exhibition",
        image: "https://placehold.co/600x400",
        hint: "art students painting",
        title: "Annual Student Art Exhibition Showcases Incredible Talent",
        date: "May 5, 2024",
        description: "The gallery was filled with stunning works from our fine arts students, ranging from classical painting to modern digital installations.",
        fullContent: "The annual Student Art Exhibition was a resounding success, showcasing the incredible and diverse talent of our fine arts students. The Harrison Art Gallery was filled with visitors all week, admiring a collection of works that spanned numerous mediums, including classical painting, intricate sculpture, evocative photography, and immersive digital media. The 'Best in Show' award went to third-year student, Maria Rodriguez, for her thought-provoking installation on environmental issues, which combined recycled materials with interactive video projections. The exhibition, a highlight of the academic calendar, is open to the public for the next two weeks and serves as a powerful reminder of the creativity thriving within our community."
    },
    {
        slug: "community-outreach-program",
        image: "https://placehold.co/600x400",
        hint: "community service",
        title: "Community Outreach Program Exceeds Annual Goals",
        date: "April 28, 2024",
        description: "Southland students volunteered over 5,000 hours this year, making a significant impact on local charities and organizations.",
        fullContent: "We are thrilled to announce that our Community Outreach Program has not only met but exceeded its annual goals for the fifth consecutive year. Our students dedicated over 5,000 volunteer hours to various local charities and community organizations. Key projects this year included building homes with Habitat for Humanity, mentoring underprivileged youth at the local community center, organizing city-wide food drives that collected over two tons of non-perishables, and participating in environmental cleanup initiatives along the riverfront. This incredible effort demonstrates our students' unwavering commitment to service and making a positive, tangible difference in the world around them."
    },
    {
        slug: "professor-chen-grant",
        image: "https://placehold.co/600x400",
        hint: "university research",
        title: "Professor Chen Receives Prestigious Research Grant",
        date: "April 21, 2024",
        description: "Dr. Samuel Chen from the School of Engineering has been awarded a grant to further his groundbreaking research in renewable energy.",
        fullContent: "Congratulations to Dr. Samuel Chen of the School of Engineering, who has been awarded a prestigious $1.2 million research grant from the National Science Foundation. The grant will support his groundbreaking research into developing more efficient and cost-effective perovskite solar panel technology. Dr. Chen's work has the potential to make a significant contribution to the field of renewable energy, helping to address critical global challenges. We are incredibly proud to have him as a member of our esteemed faculty, and we look forward to the innovative discoveries that will emerge from his research."
    },
];
