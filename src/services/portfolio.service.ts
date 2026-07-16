import axios from 'axios';
import { readCache, writeCache, isCacheFresh } from './cache.service.js';
import { setLastSync } from './config.service.js';
import type { Project, Experience, FAQ, Profile, SkillCategory } from '../types/index.js';

// ─── API Base URL ───────────────────────────────────────

const BASE_URL = 'https://m-zeeshan-haider.vercel.app/api';
const TIMEOUT = 8000;

// ─── Fallback Projects Data ─────────────────────────────
const FALLBACK_PROJECTS: Project[] = [
    {
        _id: "6a529a4ae5cdacbc5b9077aa",
        title: "TaasGrid",
        subtitle: "Talent as a Service",
        description: "An enterprise-grade SaaS platform actively developed for a production environment, where I contributed to multiple core modules across the application. Built with a scalable full-stack architecture featuring secure backend services, PostgreSQL, cloud media management, automated email workflows, and seamless Zoom integration to support business operations and client engagement.",
        tags: ["Next.js", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Cloudinary", "Zoom API", "Nodemailer"],
        image: "https://res.cloudinary.com/dtjenchhw/image/upload/v1783798345/portfolio/projects/taasgrid/sjdh450ozthc2auaov7m.webp",
        liveDemo: "https://taasgrid.com",
        githubRepo: "https://taasgrid.com",
        color: "#06b6d4",
        projectType: "Web App",
        order: 0
    },
    {
        _id: "6a529eb3e5cdacbc5b9077ad",
        title: "Chatly",
        subtitle: "Serverless Messaging Platform",
        description: "A production-ready serverless real-time messaging platform engineered with Next.js and Firebase, delivering instant messaging, hierarchical group management, push notifications, secure authentication, and live data synchronization. Built with a scalable architecture focused on performance, responsiveness, and a seamless cross-device communication experience.",
        tags: ["Next.js", "Firebase Firestore", "Firebase Cloud Messaging (FCM)", "Tailwind CSS", "Service Workers"],
        image: "https://res.cloudinary.com/dtjenchhw/image/upload/v1783799474/portfolio/projects/chatly/cisjcxzbgnmtrfnnie9y.webp",
        liveDemo: "https://chatly-stream.vercel.app/",
        githubRepo: "https://github.com/mzeeshanh-dev/chatly",
        color: "#08a16e",
        projectType: "Web App",
        order: 1
    },
    {
        _id: "6a529d74e5cdacbc5b9077ac",
        title: "HealthChain Pakistan",
        subtitle: "Digital Healthcare Platform",
        description: "A comprehensive healthcare management platform that digitizes patient services, appointment scheduling, medical records, and clinical workflows. Built as a secure full-stack application to streamline healthcare operations while improving accessibility, efficiency, and patient experience.",
        tags: ["Next.js", "Node.js", "Express.js", "MongoDB", "Cloudinary", "Nodemailer"],
        image: "https://res.cloudinary.com/dtjenchhw/image/upload/v1783799155/portfolio/projects/healthchain-pakistan/jtzxfwnjabnhnm3ogqvz.webp",
        liveDemo: "https://health-chain-pakistan.vercel.app/",
        githubRepo: "https://health-chain-pakistan.vercel.app/",
        color: "#3B82F6",
        projectType: "Web App",
        order: 2
    },
    {
        _id: "6a529ce8e5cdacbc5b9077ab",
        title: "Kasana Watches",
        subtitle: "Luxury Watch Marketplace",
        description: "A full-stack e-commerce platform built with Next.js, featuring customer authentication, product management, order processing, booking workflows, and a dedicated admin dashboard. Designed with server-side architecture, MongoDB, Cloudinary, Nodemailer integration, and a modern responsive interface enhanced with smooth user interactions.",
        tags: ["Next.js", "MongoDB", "Tailwind CSS", "Framer Motion", "Cloudinary"],
        image: "https://res.cloudinary.com/dtjenchhw/image/upload/v1783799015/portfolio/projects/kasana-watches/kt1apjm8o3kgo3sy01qf.webp",
        liveDemo: "https://kasana-watches-git.vercel.app/",
        githubRepo: "https://kasana-watches-git.vercel.app/",
        color: "#C7A96B",
        projectType: "Web App",
        order: 3
    }
];

// ─── Fallback Experience Data ───────────────────────────
// Hardcoded from live API response — used when API returns 401 or network fails

const FALLBACK_EXPERIENCE: Experience[] = [
    {
        _id: '6a5133e110fcf75b6abdba1e',
        company: 'Earth Scan Systems',
        role: 'Software Engineer (Full Stack)',
        startDate: 'March 2026',
        endDate: 'Present',
        description: 'Developing web-based Agritech applications using Next.js, Nest.js and TypeScript.\nBuilding scalable REST APIs and backend services for agricultural monitoring, crop advisory, and data-driven workflows.\nIntegrating GIS, Remote Sensing, and geospatial datasets into web applications to enable map-based visualization and analytics.\nDeveloping decision support systems by integrating IoT sensor data and optimizing backend services for reliable agricultural monitoring and analytics.',
        isEducation: false,
        order: 0,
        location: 'DHA Phase 5, Islamabad',
    },
    {
        _id: '6a51ca05d6ddd67e104dd1dc',
        company: 'NexMatrix',
        role: 'MERN Stack Developer',
        location: 'Remote',
        startDate: 'Jan 2026',
        endDate: 'June 2026',
        description: 'Developed and maintained full-stack web applications using React.js, Node.js, Express.js, MongoDB, and TypeScript.\nBuilt and integrated REST APIs with responsive frontend interfaces to improve user experience and system performance.\nCollaborated with cross-functional teams to deliver production-ready features in an Agile environment.',
        isEducation: false,
        order: 1,
    },
    {
        _id: '6a51ca45d6ddd67e104dd1dd',
        company: 'Freelancing (Project Based)',
        role: 'Backend Developer',
        location: 'Remote',
        startDate: 'July 2025',
        endDate: 'December 2025',
        description: 'Developed scalable backend applications and RESTful APIs using Node.js, Express.js, and TypeScript.\nWorked with SQL databases and AWS S3 for data management, file storage, and backend integrations.\nImproved application reliability and performance through backend optimization, middleware enhancements, and production support.',
        isEducation: false,
        order: 2,
    },
    {
        _id: '6a51cab1d6ddd67e104dd1de',
        company: 'PMAS Arid University Rawalpindi',
        role: 'BS Computer Science',
        location: '',
        startDate: 'Oct 2022',
        endDate: 'May 2026',
        description: '3.26 CGPA',
        isEducation: true,
        order: 3,
    },
];

// ─── Hardcoded Profile (not in API) ─────────────────────

const PROFILE: Profile = {
    name: 'M. Zeeshan Haider',
    title: 'Full Stack Software Engineer',
    roles: [
        'Software Engineer',
        'Scalable Platform Development',
        'Backend & System Design',
        'AI-Powered Applications',
        'Agritech & GIS Solutions',
    ],
    status: 'Available for Freelance',
    company: 'Earth Scan Systems',
    location: 'Islamabad, Pakistan',
    email: 'mzeeshanh.dev@gmail.com',
    phone: '+92 344 6864785',
    timezone: 'PKT (UTC+5)',
    availability: 'Open to Freelance',
    responseTime: 'Usually within 24 hours',
    github: 'https://github.com/mzeeshanh-dev',
    linkedin: 'https://linkedin.com/in/mzeeshanh-dev',
    portfolio: 'https://m-zeeshan-haider.vercel.app',
    resumeUrl: 'https://m-zeeshan-haider.vercel.app/api/resume/file',
};

// ─── Skills (hardcoded from portfolio Skills.tsx) ────────

const SKILLS: SkillCategory[] = [
    {
        title: 'Product Frontend Engineering',
        icon: '[Frontend]',
        description: 'Building type-safe, responsive interfaces for dashboards, portals, and business workflows.',
        skills: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'SASS/SCSS', 'Material UI', 'Shadcn/ui', 'Framer Motion', 'Redux/RTK', 'Axios'],
    },
    {
        title: 'Backend, APIs & Data',
        icon: '[Settings]',
        description: 'Designing APIs, authentication flows, database models, and server-side application logic.',
        skills: ['MongoDB', 'Express.js', 'Node.js', 'PostgreSQL', 'MySQL', 'Auth.js', 'Zod', 'JWT'],
    },
    {
        title: 'Agritech, GIS & DSS',
        icon: '[Domain]',
        description: 'Growing domain depth in Crop Advisory, Remote Sensing, IoT data, and Decision Support Systems.',
        skills: ['Crop Advisory', 'Decision Support Systems', 'GIS Concepts', 'Remote Sensing', 'NDVI', 'IoT Data', 'Carbon MRV Exposure', 'Agriculture Analytics'],
    },
    {
        title: 'Tools & Professional Workflow',
        icon: '[Tools]',
        description: 'Tools I use to ship, debug, collaborate, and keep delivery organized.',
        skills: ['Git', 'GitHub', 'Docker', 'TanStack Query', 'ESLint', 'Figma', 'Postman', 'Vercel'],
    },
];

// ─── Fetch Helpers ──────────────────────────────────────

async function fetchWithCache<T>(
    endpoint: string,
    cacheKey: string,
    forceLatest: boolean = false,
): Promise<T | null> {
    // Try cache first (unless --latest)
    if (!forceLatest && isCacheFresh(cacheKey)) {
        const cached = readCache<T>(cacheKey);
        if (cached) return cached;
    }

    // Fetch from API
    try {
        const response = await axios.get<T>(`${BASE_URL}${endpoint}`, {
            timeout: TIMEOUT,
            headers: { 'User-Agent': 'zeeshan-cli/1.0.0' },
        });

        const data = response.data;
        writeCache(cacheKey, data);
        setLastSync(new Date().toISOString());
        return data;
    } catch {
        // Fallback to stale cache
        const cached = readCache<T>(cacheKey);
        if (cached) return cached;
        return null;
    }
}

// ─── Public API ─────────────────────────────────────────

export function getProfile(): Profile {
    return PROFILE;
}

export function getSkills(): SkillCategory[] {
    return SKILLS;
}

export async function getProjects(forceLatest: boolean = false): Promise<Project[]> {
    const data = await fetchWithCache<Project[]>('/projects', 'projects', forceLatest);
    return data || FALLBACK_PROJECTS;
}

export async function getExperience(forceLatest: boolean = false): Promise<Experience[]> {
    const data = await fetchWithCache<Experience[]>('/experience', 'experience', forceLatest);
    return data || FALLBACK_EXPERIENCE;
}

export async function getFaqs(forceLatest: boolean = false): Promise<FAQ[]> {
    const data = await fetchWithCache<FAQ[]>('/faqs', 'faqs', forceLatest);
    return data || [];
}

export async function syncAll(forceLatest: boolean = true): Promise<{
    projects: number;
    experience: number;
    faqs: number;
    github: boolean;
}> {
    const [projects, experience, faqs] = await Promise.allSettled([
        getProjects(forceLatest),
        getExperience(forceLatest),
        getFaqs(forceLatest),
    ]);

    return {
        projects: projects.status === 'fulfilled' ? projects.value.length : 0,
        experience: experience.status === 'fulfilled' ? experience.value.length : 0,
        faqs: faqs.status === 'fulfilled' ? faqs.value.length : 0,
        github: true,
    };
}
