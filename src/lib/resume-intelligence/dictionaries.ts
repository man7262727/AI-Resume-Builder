export const ACTION_VERBS = [
    // Leadership & Management
    "Led", "Managed", "Orchestrated", "Spearheaded", "Directed", "Supervised", "Oversaw", "Guided", "Mentored", "Coached",
    // Development & Creation
    "Developed", "Engineered", "Designed", "Architected", "Built", "Created", "Formulated", "Constructed", "Implemented", "Established",
    // Improvement & Optimization
    "Optimized", "Enhanced", "Improved", "Streamlined", "Revamped", "Modernized", "Refined", "Accelerated", "Boosted", "Maximized",
    // Analysis & Solution
    "Analyzed", "Solved", "Resolved", "Diagnosed", "Identified", "Investigated", "Evaluated", "Assessed", "Audited", "Examined",
    // Communication & Collaboration
    "Collaborated", "Negotiated", "Presented", "Facilitated", "Communicated", "Coordinated", "Liaisoned", "Partnered", "Advocated", "Persuaded",
    // Achievement & Results
    "Achieved", "Delivered", "Exceeded", "Surpassed", "Generated", "Produced", "Yielded", "Awarded", "Secured", "Won",
    // Technical & Data
    "Programmed", "Coded", "Debugged", "Deployed", "Migrated", "Integrated", "Administered", "Configured", "Maintained", "Systematized",
    // Creative & Innovation
    "Innovated", "Pioneered", "Conceptualized", "Visualized", "Drafted", "Illustrated", "Rendered", "Authored", "Composed", "Storyboarded",
    // Financial & Quantitative
    "Budgeted", "Forecasted", "Calculated", "Audited", "Reconciled", "Reduced", "Saved", "Invested", "Allocated", "Projected",
    // Research & Strategy
    "Researched", "Investigated", "Surveyed", "Benchmarked", "Scouted", "Mapped", "Planned", "Strategized", "Forecasted", "Modeled"
];

export const WEAK_WORDS_MAP: Record<string, string[]> = {
    "worked on": ["Developed", "Engineered", "Implemented", "Collaborated on"],
    "helped": ["Assisted", "Facilitated", "Supported", "Contributed to"],
    "responsible for": ["Managed", "Oversaw", "Directed", "Accountable for"],
    "did": ["Executed", "Performed", "Completed", "Achieved"],
    "made": ["Created", "Built", "Established", "Generated"],
    "used": ["Utilized", "Leveraged", "Employed", "Applied"],
    "got": ["Obtained", "Secured", "Acquired", "Received"],
    "talked to": ["Communicated with", "Liaised with", "Negotiated with", "Consulted"],
    "handled": ["Managed", "Resolved", "Processed", "Addressed"],
    "watched": ["Monitored", "Observed", "Supervised", "Tracked"]
};

export const STOP_WORDS = new Set([
    "a", "an", "the", "and", "or", "but", "if", "then", "else", "when",
    "at", "by", "for", "from", "in", "of", "on", "to", "with", "about",
    "into", "through", "during", "before", "after", "above", "below",
    "up", "down", "out", "off", "over", "under", "again", "further",
    "once", "here", "there", "where", "why", "how", "all", "any",
    "both", "each", "few", "more", "most", "other", "some", "such",
    "no", "nor", "not", "only", "own", "same", "so", "than", "too",
    "very", "s", "t", "can", "will", "just", "don", "should", "now",
    "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you",
    "your", "yours", "yourself", "yourselves", "he", "him", "his",
    "himself", "she", "her", "hers", "herself", "it", "its", "itself",
    "they", "them", "their", "theirs", "themselves", "what", "which",
    "who", "whom", "this", "that", "these", "those", "am", "is", "are",
    "was", "were", "be", "been", "being", "have", "has", "had", "having",
    "do", "does", "did", "doing", "would", "should", "could", "ought",
    "i'm", "you're", "he's", "she's", "it's", "we're", "they're",
    "i've", "you've", "we've", "they've", "i'd", "you'd", "he'd", "she'd",
    "we'd", "they'd", "i'll", "you'll", "he'll", "she'll", "we'll", "they'll",
    "isn't", "aren't", "wasn't", "weren't", "hasn't", "haven't", "hadn't",
    "doesn't", "don't", "didn't", "won't", "wouldn't", "shan't", "shouldn't",
    "can't", "cannot", "couldn't", "mustn't", "let's", "that's", "who's",
    "what's", "here's", "there's", "when's", "where's", "why's", "how's"
]);

export const TECH_SKILLS = [
    // Programming Languages
    "Javascript", "Typescript", "Python", "Java", "C++", "C#", "Go", "Rust", "Swift", "Kotlin", "Ruby", "PHP", "HTML", "CSS", "SQL",
    // Frontend
    "React", "Angular", "Vue", "Svelte", "Next.js", "Nuxt", "Redux", "Tailwind CSS", "Bootstrap", "Material UI", "Webpack", "Vite",
    // Backend
    "Node.js", "Express", "NestJS", "Django", "Flask", "Spring Boot", "ASP.NET", "Ruby on Rails", "Laravel", "FastAPI",
    // Database
    "PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Cassandra", "DynamoDB", "Firebase", "Supabase", "Prisma",
    // Cloud & DevOps
    "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Jenkins", "GitLab CI", "GitHub Actions", "Terraform", "Ansible",
    // Mobile
    "React Native", "Flutter", "iOS", "Android", "Ionic", "Xamarin",
    // AI/ML
    "TensorFlow", "PyTorch", "Keras", "Scikit-learn", "Pandas", "NumPy", "OpenCV", "NLP", "LLM", "Generative AI",
    // Tools
    "Git", "Jira", "Trello", "Slack", "Figma", "Adobe XD", "Photoshop", "Illustrator", "Excel", "Power BI", "Tableau"
];

export const SOFT_SKILLS = [
    "Communication", "Teamwork", "Problem Solving", "Leadership", "Time Management",
    "Adaptability", "Creativity", "Critical Thinking", "Conflict Resolution", "Emotional Intelligence",
    "Project Management", "Public Speaking", "Negotiation", "Decision Making", "Mentoring",
    "Collaboration", "Organization", "Attention to Detail", "Work Ethic", "Interpersonal Skills"
];
