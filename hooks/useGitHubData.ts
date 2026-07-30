"use client";

import { useEffect, useState } from "react";

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  stars: number;
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
    publicRepos: 38,
    followers: 12,
    following: 15,
    stars: 45,
    topLanguages: [
      { name: "Python", percentage: 54, color: "#3572A5" },
      { name: "TypeScript", percentage: 22, color: "#3178C6" },
      { name: "JavaScript", percentage: 14, color: "#F7DF1E" },
      { name: "HTML/CSS", percentage: 10, color: "#E34F26" },
    ],
    recentRepos: [
      {
        id: 1,
        name: "Order-App",
        description: "Salesman Order Portal & Business Management ERP System",
        html_url: `https://github.com/${username}/Order-App`,
        stargazers_count: 12,
        language: "Python",
        updated_at: "Recently updated"
      },
      {
        id: 2,
        name: "ai-assistant",
        description: "Autonomous Agent & Voice Intelligence System",
        html_url: `https://github.com/${username}/ai-assistant`,
        stargazers_count: 18,
        language: "Python",
        updated_at: "Recently updated"
      },
      {
        id: 3,
        name: "portfolio",
        description: "Personal brand website & AI Engineer showcase",
        html_url: `https://github.com/${username}/portfolio`,
        stargazers_count: 8,
        language: "TypeScript",
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
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error("Failed to fetch GitHub API");
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

        const recentRepos = reposData.slice(0, 3).map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description || "No description provided.",
          html_url: r.html_url,
          stargazers_count: r.stargazers_count,
          language: r.language || "TypeScript",
          updated_at: new Date(r.updated_at).toLocaleDateString()
        }));

        setStats({
          publicRepos: userData.public_repos || 38,
          followers: userData.followers || 12,
          following: userData.following || 15,
          stars: totalStars || 45,
          topLanguages: topLanguages.length > 0 ? topLanguages : stats.topLanguages,
          recentRepos: recentRepos.length > 0 ? recentRepos : stats.recentRepos,
          loading: false,
          error: false
        });
      } catch (err) {
        console.warn("Using fallback GitHub data due to API rate limit or network status.", err);
        setStats((prev) => ({ ...prev, loading: false, error: true }));
      }
    }

    fetchGitHub();
  }, [username]);

  return stats;
}
