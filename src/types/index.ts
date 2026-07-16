
// ─── Interfaces ─────────────────────────────────────────

export interface Profile {
    name: string;
    title: string;
    company: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolio: string;
    resumeUrl: string;
    availability: string;
    responseTime: string;
    timezone: string;
    status: string;
}

export interface Experience {
    _id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
    skills: string[];
    location: string;
    isEducation: boolean;
    order: number;
}

export interface Project {
    _id: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    liveDemo: string;
    githubRepo: string;
    image: string;
    color?: string;
}

export interface SkillCategory {
    title: string;
    description: string;
    skills: string[];
}

export interface FAQ {
    question: string;
    answer: string;
}

// ─── GitHub API Types ───────────────────────────────────

export interface GitHubProfile {
    login: string;
    name: string;
    avatarUrl: string;
    url: string;
    domain: string;
    publicRepos: number;
    followers: number;
}

export interface GitHubLanguage {
    name: string;
    count: number;
}

export interface GitHubTotals {
    stars: number;
    forks: number;
    repositories: number;
    contributions: number;
}

export interface GitHubData {
    profile: GitHubProfile;
    languages: GitHubLanguage[];
    totals: GitHubTotals;
}

// ─── Config Types ───────────────────────────────────────

export interface CLIConfig {
    lastSync: string | null;
}
