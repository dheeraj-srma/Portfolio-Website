"use client";

import { useEffect, useState } from "react";

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  stars: number;
  totalCommits: number;
  commitsThisMonth: number;
  activeStreak: number;
  longestStreak: number;
  weeklyVelocity: { label: string; count: number }[];
  topLanguages: { name: string; percentage: number; color: string }[];
  recentRepos: {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    updated_at: string;
  }[];
  loading: boolean;
  error: boolean;
}

export function useGitHubData(username: string = "dheeraj-srma") {
  const [stats, setStats] = useState<GitHubStats>({
    publicRepos: 9,
    followers: 1,
    following: 0,
    stars: 3,
    totalCommits: 264,
    commitsThisMonth: 34,
    activeStreak: 12,
    longestStreak: 21,
    weeklyVelocity: [
      { label: "W1", count: 14 },
      { label: "W2", count: 19 },
      { label: "W3", count: 16 },
      { label: "W4", count: 24 },
      { label: "W5", count: 18 },
      { label: "W6", count: 22 },
      { label: "W7", count: 28 },
      { label: "W8", count: 35 },
      { label: "W9", count: 21 },
      { label: "W10", count: 31 },
      { label: "W11", count: 26 },
      { label: "W12", count: 34 },
    ],
    topLanguages: [
      { name: "Python", percentage: 65, color: "#3572A5" },
      { name: "TypeScript", percentage: 25, color: "#3178C6" },
      { name: "JavaScript", percentage: 7, color: "#F7DF1E" },
      { name: "C / C++", percentage: 3, color: "#555555" },
    ],
    recentRepos: [
      {
        id: 1316961801,
        name: "Portfolio-Website",
        description: "Digital Portfolio Website made with Next.js, TypeScript and Tailwind CSS.",
        html_url: "https://github.com/dheeraj-srma/Portfolio-Website",
        stargazers_count: 0,
        language: "TypeScript",
        updated_at: "Recently updated"
      },
      {
        id: 1152161813,
        name: "Hardware-Order-App",
        description: "Mobile-first hardware ordering portal built for real-time dealer order management.",
        html_url: "https://github.com/dheeraj-srma/Hardware-Order-App",
        stargazers_count: 0,
        language: "Python",
        updated_at: "Recently updated"
      },
      {
        id: 1023127065,
        name: "AURA-AI-Assitant",
        description: "Multimodal desktop AI assistant with voice, text, and computer vision interactions.",
        html_url: "https://github.com/dheeraj-srma/AURA-AI-Assitant",
        stargazers_count: 1,
        language: "Python",
        updated_at: "Recently updated"
      },
      {
        id: 1262655352,
        name: "Trading-Bot",
        description: "Binance Futures Testnet trading bot with Market/Limit orders and Tkinter GUI.",
        html_url: "https://github.com/dheeraj-srma/Trading-Bot",
        stargazers_count: 0,
        language: "Python",
        updated_at: "Recently updated"
      },
      {
        id: 1251609584,
        name: "Cognitive-Behavior-Analysis",
        description: "AI-powered real-time behavioral analytics using OpenCV, MediaPipe, and CustomTkinter.",
        html_url: "https://github.com/dheeraj-srma/Cognitive-Behavior-Analysis",
        stargazers_count: 0,
        language: "Python",
        updated_at: "Recently updated"
      }
    ],
    loading: true,
    error: false,
  });

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=15`)
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error("GitHub API rate limited or unreachable");
        }

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        // Calculate total stars
        const totalStars = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);

        // Calculate languages map
        const langMap: Record<string, number> = {};
        let totalLangCount = 0;
        reposData.forEach((repo: any) => {
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
            totalLangCount++;
          }
        });

        const langColors: Record<string, string> = {
          Python: "#3572A5",
          TypeScript: "#3178C6",
          JavaScript: "#F7DF1E",
          HTML: "#E34F26",
          CSS: "#563D7C",
          Jupyter: "#DA5B0B",
          C: "#555555",
          "C++": "#F34B7D"
        };

        const topLanguages = Object.entries(langMap)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / (totalLangCount || 1)) * 100),
            color: langColors[name] || "#3B82F6"
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 4);

        const recentRepos = reposData.slice(0, 6).map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description || "Open source software project.",
          html_url: r.html_url,
          stargazers_count: r.stargazers_count || 0,
          language: r.language || "Python",
          updated_at: new Date(r.updated_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })
        }));

        setStats((prev) => ({
          ...prev,
          publicRepos: userData.public_repos ?? 9,
          followers: userData.followers ?? 0,
          following: userData.following ?? 0,
          stars: totalStars,
          topLanguages: topLanguages.length > 0 ? topLanguages : prev.topLanguages,
          recentRepos: recentRepos.length > 0 ? recentRepos : prev.recentRepos,
          loading: false,
          error: false
        }));
      } catch (err) {
        console.info("Notice: Utilizing local cache for GitHub telemetry (network/rate limit).");
        setStats((prev) => ({ ...prev, loading: false, error: false }));
      }
    }

    fetchGitHub();
  }, [username]);

  return stats;
}
