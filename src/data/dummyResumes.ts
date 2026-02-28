import { ResumeData } from '@/types/resume';

interface DummyDataEntry {
    resume: ResumeData;
    jobDescription: string;
    label: string;
}

export const dummyResumes: Record<string, DummyDataEntry> = {
    'java-full-stack': {
        label: 'Java Full Stack Dev',
        resume: {
            personalInfo: {
                fullName: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                phone: '+91 98765 43210',
                location: 'Bangalore, India',
                linkedin: 'linkedin.com/in/rahulsharma',
                website: 'github.com/rahulsharma',
                summary: 'Senior Full Stack Java Developer with 6+ years of experience constructing scalable enterprise applications. Proficient in Spring Boot, Microservices architecture, and React.js frontend development. Proven track record of optimizing application performance by 40% and leading agile teams of 5+ developers to successful project delivery.',
            },
            experiences: [
                {
                    id: '1',
                    company: 'TechSolutions India',
                    position: 'Senior Java Developer',
                    startDate: '2021-03',
                    endDate: 'Present',
                    current: true,
                    description: 'Leading the backend development team for a high-traffic e-commerce platform processing 50k+ daily transactions.',
                    highlights: [
                        'Architected and implemented microservices using Spring Boot and Spring Cloud, handling 50,000+ daily requests with 99.9% uptime.',
                        'Optimized database queries and implemented Redis caching, reducing API latency by 40%.',
                        'Mentored 4 junior developers and established code quality standards using SonarQube, reducing bugs by 25%.',
                        'Collaborated with frontend teams to integrate React.js UI with RESTful APIs, improving user engagement by 15%.',
                    ],
                },
                {
                    id: '2',
                    company: 'Infosys',
                    position: 'Software Engineer',
                    startDate: '2018-06',
                    endDate: '2021-02',
                    current: false,
                    description: 'Worked on multiple banking domain projects focusing on secure transaction processing and regulatory compliance.',
                    highlights: [
                        'Developed robust REST APIs for payment processing using Java 8 and Spring MVC, handling $1M+ in daily transactions.',
                        'Implemented automated unit tests using JUnit and Mockito, achieving 85% code coverage and reducing regression bugs by 30%.',
                        'Participated in daily stand-ups and sprint planning as part of an Agile Scrum team, delivering features 10% ahead of schedule.',
                    ],
                },
            ],
            education: [
                {
                    id: '1',
                    institution: 'Indian Institute of Technology, Madras',
                    degree: 'B.Tech',
                    field: 'Computer Science',
                    startDate: '2014',
                    endDate: '2018',
                    gpa: '8.5/10',
                },
            ],
            skills: [
                { id: '1', name: 'Java', level: 'expert' },
                { id: '2', name: 'Spring Boot', level: 'expert' },
                { id: '3', name: 'Microservices', level: 'advanced' },
                { id: '4', name: 'Hibernate', level: 'advanced' },
                { id: '5', name: 'React.js', level: 'intermediate' },
                { id: '6', name: 'SQL', level: 'advanced' },
                { id: '7', name: 'AWS', level: 'intermediate' },
                { id: '8', name: 'Docker', level: 'intermediate' },
            ],
            projects: [
                {
                    id: '1',
                    name: 'E-Commerce Platform Redesign',
                    description: 'Led the backend migration from monolith to microservices architecture.',
                    technologies: ['Java 17', 'Spring Boot', 'Kafka', 'PostgreSQL'],
                    link: 'github.com/rahulsharma/ecommerce-microservices',
                },
                {
                    id: '2',
                    name: 'Banking API Gateway',
                    description: 'Developed a secure API gateway for a fintech application.',
                    technologies: ['Spring Cloud Gateway', 'OAUTH2', 'Redis'],
                    link: 'github.com/rahulsharma/secure-gateway',
                },
            ],
        },
        jobDescription: `We are looking for a Senior Java Full Stack Developer to join our engineering team. 
        Responsibilities:
        - Design and develop scalable microservices using Spring Boot and Java 17.
        - Build responsive frontend user interfaces using React.js.
        - Optimize application performance and ensure high availability.
        - Mentor junior developers and conduct code reviews.
        - Work with AWS cloud infrastructure and Docker containers.
        - Collaborate with cross-functional teams in an Agile environment.
        Requirements:
        - 5+ years of experience in Java development.
        - Strong knowledge of Spring Boot, Microservices, and Hibernate.
        - Experience with React.js and frontend technologies.
        - Proficiency in SQL and database optimization.
        - Familiarity with AWS services and Docker.
        - Excellent problem-solving skills and ability to lead teams.`
    },
    'ai-engineer': {
        label: 'AI Engineer',
        resume: {
            personalInfo: {
                fullName: 'Priya Patel',
                email: 'priya.patel@example.com',
                phone: '+1 (555) 123-4567',
                location: 'San Francisco, CA',
                linkedin: 'linkedin.com/in/priyapatel-ai',
                website: 'priya-ai-portfolio.com',
                summary: 'Innovative AI Engineer with a Master’s in Data Science and 4 years of experience developing and deploying machine learning models. Specialized in Natural Language Processing (NLP) and Computer Vision. Passionate about building ethical and explainable AI solutions that solve real-world problems and drive business growth.',
            },
            experiences: [
                {
                    id: '1',
                    company: 'DeepMind Solutions',
                    position: 'AI Engineer',
                    startDate: '2022-01',
                    endDate: 'Present',
                    current: true,
                    description: 'Developing LLM-based applications for customer support automation using state-of-the-art NLP models.',
                    highlights: [
                        'Fine-tuned GPT-3.5 models on custom datasets, improving chatbot accuracy by 25% and reducing resolution time by 30%.',
                        'Built an end-to-end RAG (Retrieval-Augmented Generation) pipeline for document analysis, processing 10,000+ documents daily.',
                        'Deployed models to production using Docker and Kubernetes on AWS SageMaker, ensuring 99.9% availability.',
                        'Researched and implemented state-of-the-art NLP techniques for sentiment analysis, achieving 90% F1 score.',
                    ],
                },
                {
                    id: '2',
                    company: 'DataCorp',
                    position: 'Data Scientist',
                    startDate: '2019-06',
                    endDate: '2021-12',
                    current: false,
                    description: 'Worked on predictive maintenance models for manufacturing clients to reduce downtime.',
                    highlights: [
                        'Developed computer vision models for defect detection on assembly lines using TensorFlow, reducing defects by 15%.',
                        'Performed exploratory data analysis (EDA) on large datasets (1TB+) to identify key trends and business insights.',
                        'Collaborated with domain experts to feature engineer critical variables, improving model prediction accuracy by 20%.',
                    ],
                },
            ],
            education: [
                {
                    id: '1',
                    institution: 'Stanford University',
                    degree: 'M.S.',
                    field: 'Data Science',
                    startDate: '2017',
                    endDate: '2019',
                    gpa: '3.9/4.0',
                },
            ],
            skills: [
                { id: '1', name: 'Python', level: 'expert' },
                { id: '2', name: 'TensorFlow', level: 'advanced' },
                { id: '3', name: 'PyTorch', level: 'advanced' },
                { id: '4', name: 'NLP', level: 'expert' },
                { id: '5', name: 'Computer Vision', level: 'advanced' },
                { id: '6', name: 'SQL', level: 'intermediate' },
                { id: '7', name: 'Docker', level: 'intermediate' },
                { id: '8', name: 'AWS SageMaker', level: 'intermediate' },
            ],
            projects: [
                {
                    id: '1',
                    name: 'Medical Image Diagnosis',
                    description: 'Built a CNN model to detect pneumonia from chest X-rays with 95% accuracy.',
                    technologies: ['Python', 'PyTorch', 'OpenCV'],
                    link: 'github.com/priyapatel/xray-vision',
                },
                {
                    id: '2',
                    name: 'Legal Document Summarizer',
                    description: 'Developed an NLP tool to summarize long legal contracts using BART.',
                    technologies: ['Hugging Face Transformers', 'FastAPI', 'React'],
                    link: 'github.com/priyapatel/legal-nlp',
                },
            ],
        },
        jobDescription: `We are seeking a talented AI Engineer to build next-generation AI solutions.
        Responsibilities:
        - Develop and deploy machine learning models using Python, TensorFlow, and PyTorch.
        - Specialize in NLP and Computer Vision tasks.
        - Build and maintain data pipelines for model training and inference.
        - Deploy models to cloud platforms like AWS SageMaker using Docker.
        - Collaborate with data scientists and engineers to integrate AI into products.
        Requirements:
        - Master's degree in Data Science, Computer Science, or related field.
        - 3+ years of experience in AI/ML development.
        - Strong proficiency in Python and deep learning frameworks (TensorFlow, PyTorch).
        - Experience with NLP (LLMs, RAG) and Computer Vision.
        - Knowledge of cloud deployment and containerization (AWS, Docker, Kubernetes).`
    },
    'mern-stack': {
        label: 'MERN Stack Developer',
        resume: {
            personalInfo: {
                fullName: 'Alex Johnson',
                email: 'alex.j@example.com',
                phone: '(555) 987-6543',
                location: 'New York, NY',
                linkedin: 'linkedin.com/in/alexjohnson-dev',
                website: 'alexj.dev',
                summary: 'Passionate MERN Stack Developer with 3 years of experience building responsive and user-centric web applications. Extensive experience with React.js, Node.js, and MongoDB. Adept at translating UI/UX designs into pixel-perfect code and optimizing frontend performance by 25%.',
            },
            experiences: [
                {
                    id: '1',
                    company: 'StartupHub',
                    position: 'Full Stack Developer',
                    startDate: '2021-08',
                    endDate: 'Present',
                    current: true,
                    description: 'Core developer for a social networking platform for entrepreneurs connecting 10k+ users.',
                    highlights: [
                        'Developed the entire frontend using React.js, Redux Toolkit, and Tailwind CSS, ensuring a mobile-responsive design.',
                        'Implemented real-time chat functionality using Socket.io and Node.js, supporting 500+ concurrent users.',
                        'Designed and optimized MongoDB schemas for efficient data retrieval, reducing query time by 30%.',
                        'Integrated Stripe API for subscription payments and subscription management, driving $50k in monthly revenue.',
                    ],
                },
                {
                    id: '2',
                    company: 'WebSolutions Agency',
                    position: 'Frontend Developer',
                    startDate: '2020-05',
                    endDate: '2021-07',
                    current: false,
                    description: 'Built custom websites and dashboards for various clients in retail and hospitality.',
                    highlights: [
                        'Converted Figma designs into responsive HTML/CSS/React components with 100% fidelity.',
                        'Optimized website performance, achieving 90+ Lighthouse scores for SEO and accessibility.',
                        'Implemented server-side rendering (SSR) using Next.js for improved SEO and 40% faster initial load times.',
                    ],
                },
            ],
            education: [
                {
                    id: '1',
                    institution: 'University of California, Berkeley',
                    degree: 'B.S.',
                    field: 'Computer Science',
                    startDate: '2016',
                    endDate: '2020',
                    gpa: '3.7/4.0',
                },
            ],
            skills: [
                { id: '1', name: 'JavaScript (ES6+)', level: 'expert' },
                { id: '2', name: 'React.js', level: 'expert' },
                { id: '3', name: 'Node.js', level: 'advanced' },
                { id: '4', name: 'Express.js', level: 'advanced' },
                { id: '5', name: 'MongoDB', level: 'advanced' },
                { id: '6', name: 'Tailwind CSS', level: 'expert' },
                { id: '7', name: 'Redux', level: 'advanced' },
                { id: '8', name: 'Next.js', level: 'intermediate' },
            ],
            projects: [
                {
                    id: '1',
                    name: 'Task Management App',
                    description: 'A Trello-clone application with drag-and-drop functionality.',
                    technologies: ['MERN Stack', 'React DnD', 'Socket.io'],
                    link: 'github.com/alexj/task-master',
                },
                {
                    id: '2',
                    name: 'Food Delivery Dashboard',
                    description: 'Real-time analytics dashboard for a food delivery service.',
                    technologies: ['React', 'Chart.js', 'Node.js'],
                    link: 'github.com/alexj/food-analytics',
                },
            ],
        },
        jobDescription: `Join our dynamic team as a MERN Stack Developer.
        Responsibilities:
        - Design and implement full-stack web applications using MongoDB, Express, React, and Node.js.
        - Create responsive and interactive UIs with React and Tailwind CSS.
        - Build RESTful APIs and integrate third-party services like Stripe.
        - Optimize application for maximum speed and scalability.
        - Troubleshoot and debug issues across the stack.
        Requirements:
        - Strong proficiency in JavaScript (ES6+), React.js, and Node.js.
        - Experience with MongoDB and database design.
        - detailed knowledge of Redux for state management.
        - Familiarity with Next.js is a plus.
        - Experience with real-time technologies like Socket.io.`
    },
    'software-developer': {
        label: 'Software Developer',
        resume: {
            personalInfo: {
                fullName: 'Emily Chen',
                email: 'emily.chen@example.com',
                phone: '(415) 555-0123',
                location: 'Seattle, WA',
                linkedin: 'linkedin.com/in/emilychen-sw',
                website: 'emilychen.io',
                summary: 'Versatile Software Developer with a strong foundation in computer science principles and algorithms. Experienced in C++, Python, and system-level programming. Passionate about writing clean, maintainable code and solving complex algorithmic challenges to improve system efficiency by 20%.',
            },
            experiences: [
                {
                    id: '1',
                    company: 'CloudSystems Inc.',
                    position: 'Software Developer II',
                    startDate: '2020-09',
                    endDate: 'Present',
                    current: true,
                    description: 'Working on distributed storage systems and cloud infrastructure optimization.',
                    highlights: [
                        'Optimized data compression algorithms in C++, reducing storage costs by 15% and saving the company $50k annually.',
                        'Developed multi-threaded applications for high-throughput data processing, handling 1GB/s data streams.',
                        'Contributed to the design and implementation of internal developer tools used by 200+ engineers.',
                        'Participated in code reviews and advocated for best practices in C++ development to ensure code quality.',
                    ],
                },
                {
                    id: '2',
                    company: 'GameTech Studios',
                    position: 'Junior Programmer',
                    startDate: '2018-07',
                    endDate: '2020-08',
                    current: false,
                    description: 'Developed gameplay mechanics and engine tools for a AAA game title played by 1M+ users.',
                    highlights: [
                        'Implemented enemy AI behaviors using state machines in C++, enhancing game difficulty balance.',
                        'Debugged and fixed crash issues in the game engine renderer, improving stability by 40%.',
                        'Collaborated with game designers to iterate on player mechanics and controls.',
                    ],
                },
            ],
            education: [
                {
                    id: '1',
                    institution: 'University of Washington',
                    degree: 'B.S.',
                    field: 'Computer Engineering',
                    startDate: '2014',
                    endDate: '2018',
                    gpa: '3.8/4.0',
                },
            ],
            skills: [
                { id: '1', name: 'C++', level: 'expert' },
                { id: '2', name: 'Python', level: 'advanced' },
                { id: '3', name: 'Algorithms', level: 'expert' },
                { id: '4', name: 'Data Structures', level: 'expert' },
                { id: '5', name: 'Linux', level: 'advanced' },
                { id: '6', name: 'Git', level: 'advanced' },
                { id: '7', name: 'System Design', level: 'intermediate' },
            ],
            projects: [
                {
                    id: '1',
                    name: 'Custom Memory Allocator',
                    description: 'Implemented a high-performance memory allocator in C++ for embedded systems.',
                    technologies: ['C++', 'OS Internals'],
                    link: 'github.com/emilychen/memory-allocator',
                },
                {
                    id: '2',
                    name: 'Distributed File System',
                    description: 'Built a simplified distributed file system inspired by GFS.',
                    technologies: ['Go', 'RPC', 'Consensus Algorithms'],
                    link: 'github.com/emilychen/mini-dfs',
                },
            ],
        },
        jobDescription: `We are hiring a generalist Software Developer to solve hard problems.
        Responsibilities:
        - Design, develop, and test efficient code in C++ and Python.
        - Work on system-level programming and performance optimization.
        - Solve complex algorithmic problems and data structure challenges.
        - Collaborate with other engineers on system design and architecture.
        - Maintain and improve existing codebase and developer tools.
        Requirements:
        - Bachelor's degree in Computer Science or Engineering.
        - Strong proficiency in C++ and Python.
        - Deep understanding of algorithms and data structures.
        - Experience with Linux/Unix environments and Git.
        - Familiarity with system design concepts.
        - Passion for writing clean and efficient code.`
    },
    'automation-engineer': {
        label: 'Automation Engineer',
        resume: {
            personalInfo: {
                fullName: 'David Smith',
                email: 'david.smith@example.com',
                phone: '+44 7700 900077',
                location: 'London, UK',
                linkedin: 'linkedin.com/in/davidsmith-qa',
                website: 'davidsmith-qa.com',
                summary: 'Detail-oriented Automation Engineer with 5 years of experience in QA and test automation. Expert in Selenium, Cypress, and CI/CD integration. Dedicated to ensuring software quality through robust automated testing frameworks and continuous improvement of processes, reducing release cycles by 20%.',
            },
            experiences: [
                {
                    id: '1',
                    company: 'FinTech Corp',
                    position: 'Senior QA Automation Engineer',
                    startDate: '2021-04',
                    endDate: 'Present',
                    current: true,
                    description: 'Leading the QA automation efforts for the core banking platform ensuring 100% compliance.',
                    highlights: [
                        'Designed and implemented a hybrid test automation framework using Java and Selenium, covering 500+ test cases.',
                        'Integrated automated tests into the Jenkins CI/CD pipeline, reducing regression testing time by 60%.',
                        'Mentored junior QA engineers on automation best practices and coding standards.',
                        'Collaborated with developers to reproduce and resolve complex defects, ensuring zero critical bugs in production.',
                    ],
                },
                {
                    id: '2',
                    company: 'RetailWeb Ltd',
                    position: 'QA Engineer',
                    startDate: '2019-02',
                    endDate: '2021-03',
                    current: false,
                    description: 'Responsible for manual and automated testing of e-commerce web applications.',
                    highlights: [
                        'Automated end-to-end user flows using Cypress and JavaScript, increasing test coverage to 80%.',
                        'Performed API testing using Postman and RestAssured to validate backend logic.',
                        'Logged and tracked bugs using JIRA, ensuring timely resolution of 200+ tickets.',
                    ],
                },
            ],
            education: [
                {
                    id: '1',
                    institution: 'Imperial College London',
                    degree: 'B.Eng',
                    field: 'Software Engineering',
                    startDate: '2015',
                    endDate: '2019',
                    gpa: 'First Class Honours',
                },
            ],
            skills: [
                { id: '1', name: 'Selenium WebDriver', level: 'expert' },
                { id: '2', name: 'Java', level: 'advanced' },
                { id: '3', name: 'Cypress', level: 'advanced' },
                { id: '4', name: 'Jenkins', level: 'intermediate' },
                { id: '5', name: 'API Testing', level: 'advanced' },
                { id: '6', name: 'SQL', level: 'intermediate' },
                { id: '7', name: 'Git', level: 'intermediate' },
                { id: '8', name: 'JIRA', level: 'expert' },
            ],
            projects: [
                {
                    id: '1',
                    name: 'Automated Testing Framework',
                    description: 'Created a modular Keyword Driven Framework for cross-browser testing.',
                    technologies: ['Java', 'Selenium', 'TestNG', 'Maven'],
                    link: 'github.com/davidsmith/selenium-framework',
                },
                {
                    id: '2',
                    name: 'Performance Testing Suite',
                    description: 'Developed scripts for load testing using JMeter.',
                    technologies: ['JMeter', 'Groovy'],
                    link: 'github.com/davidsmith/jmeter-suite',
                },
            ],
        },
        jobDescription: `We are looking for a skilled Automation Engineer to ensure the quality of our software products.
        Responsibilities:
        - Design, develop, and execute automated test scripts using Selenium and Java.
        - Implement and maintain test automation frameworks.
        - Integrate automated tests into Jenkins CI/CD pipelines.
        - Perform API testing and validate backend services.
        - Identify, record, and track bugs using JIRA.
        - Collaborate with development teams to ensure software quality.
        Requirements:
        - 4+ years of experience in QA automation.
        - Strong knowledge of Selenium WebDriver, Java, and Cypress.
        - Experience with API testing (Postman, RestAssured).
        - Familiarity with CI/CD tools like Jenkins.
        - Solid understanding of SQL and Git.
        - Excellent attention to detail and trouble-shooting skills.`
    },
};
