"use client";

import { useEffect, useState } from "react";

export interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

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
  peakWeeklyVelocity: number;
  heatmapDays: HeatmapDay[];
  heatmapMonths: string[];
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

// Deterministic 140-day baseline heatmap (20 weeks x 7 days)
function generateInitialHeatmap(): HeatmapDay[] {
  const days: HeatmapDay[] = [];
  const baseDate = new Date();
  for (let i = 139; i >= 0; i--) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const count = isWeekend ? (i % 5 === 0 ? 3 : 0) : ((i * 7 + 3) % 11 > 4 ? ((i % 4) + 1) : 0);
    const level = (count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 7 ? 3 : 4) as 0 | 1 | 2 | 3 | 4;
    days.push({ date: dateStr, count, level });
  }
  return days;
}

function extractMonths(days: HeatmapDay[]): string[] {
  const months: string[] = [];
  days.forEach((d) => {
    try {
      const m = new Date(d.date + "T00:00:00").toLocaleDateString("en-US", { month: "short" });
      if (!months.includes(m)) months.push(m);
    } catch {
      // ignore parsing error
    }
  });
  return months.length > 0 ? months : ["May", "Jun", "Jul", "Aug", "Sep"];
}

const initialHeatmapDays = generateInitialHeatmap();
const initialHeatmapMonths = extractMonths(initialHeatmapDays);

export function useGitHubData(username: string = "dheeraj-srma") {
  const [stats, setStats] = useState<GitHubStats>({
    publicRepos: 9,
    followers: 1,
    following: 0,
    stars: 3,
    totalCommits: 165,
    commitsThisMonth: 99,
    activeStreak: 10,
    longestStreak: 15,
    weeklyVelocity: [
      { label: "W1", count: 1 },
      { label: "W2", count: 0 },
      { label: "W3", count: 0 },
      { label: "W4", count: 0 },
      { label: "W5", count: 0 },
      { label: "W6", count: 0 },
      { label: "W7", count: 6 },
      { label: "W8", count: 3 },
      { label: "W9", count: 0 },
      { label: "W10", count: 20 },
      { label: "W11", count: 38 },
      { label: "W12", count: 90 },
    ],
    peakWeeklyVelocity: 90,
    heatmapDays: initialHeatmapDays,
    heatmapMonths: initialHeatmapMonths,
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
    let isMounted = true;

    async function fetchGitHub() {
      try {
        const [userResult, reposResult, contribResult] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${username}`).then((r) => {
            if (!r.ok) throw new Error("User API error");
            return r.json();
          }),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=15`).then((r) => {
            if (!r.ok) throw new Error("Repos API error");
            return r.json();
          }),
          fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`).then((r) => {
            if (!r.ok) throw new Error("Contributions API error");
            return r.json();
          })
        ]);

        if (!isMounted) return;

        // Process User and Repos data if available
        let publicRepos = stats.publicRepos;
        let followers = stats.followers;
        let following = stats.following;
        let totalStars = stats.stars;
        let topLanguages = stats.topLanguages;
        let recentRepos = stats.recentRepos;

        if (userResult.status === "fulfilled" && userResult.value) {
          const u = userResult.value;
          publicRepos = u.public_repos ?? publicRepos;
          followers = u.followers ?? followers;
          following = u.following ?? following;
        }

        if (reposResult.status === "fulfilled" && Array.isArray(reposResult.value)) {
          const repos = reposResult.value;
          totalStars = repos.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);

          const langMap: Record<string, number> = {};
          let totalLangCount = 0;
          repos.forEach((repo: any) => {
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

          const calculatedLanguages = Object.entries(langMap)
            .map(([name, count]) => ({
              name,
              percentage: Math.round((count / (totalLangCount || 1)) * 100),
              color: langColors[name] || "#3B82F6"
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 4);

          if (calculatedLanguages.length > 0) {
            topLanguages = calculatedLanguages;
          }

          const calculatedRepos = repos.slice(0, 6).map((r: any) => ({
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

          if (calculatedRepos.length > 0) {
            recentRepos = calculatedRepos;
          }
        }

        // Process Real Contribution & Heatmap Data
        let totalCommits = stats.totalCommits;
        let commitsThisMonth = stats.commitsThisMonth;
        let activeStreak = stats.activeStreak;
        let longestStreak = stats.longestStreak;
        let weeklyVelocity = stats.weeklyVelocity;
        let peakWeeklyVelocity = stats.peakWeeklyVelocity;
        let heatmapDays = stats.heatmapDays;
        let heatmapMonths = stats.heatmapMonths;

        if (contribResult.status === "fulfilled" && contribResult.value?.contributions) {
          const contribData = contribResult.value;
          const contributions = contribData.contributions;

          if (contribData.total?.lastYear != null) {
            totalCommits = contribData.total.lastYear;
          }

          if (Array.isArray(contributions) && contributions.length > 0) {
            // Heatmap days: last 140 days (20 weeks x 7 days)
            const raw140 = contributions.slice(-140);
            heatmapDays = raw140.map((d: any) => ({
              date: d.date,
              count: d.count || 0,
              level: (d.level ?? 0) as 0 | 1 | 2 | 3 | 4
            }));
            heatmapMonths = extractMonths(heatmapDays);

            // Active streak calculation
            let currentActive = 0;
            for (let i = contributions.length - 1; i >= 0; i--) {
              if (contributions[i].count > 0) {
                currentActive++;
              } else if (i < contributions.length - 1) {
                break;
              }
            }
            activeStreak = currentActive;

            // Longest streak calculation
            let maxStreak = 0;
            let curStreak = 0;
            for (const d of contributions) {
              if (d.count > 0) {
                curStreak++;
                if (curStreak > maxStreak) maxStreak = curStreak;
              } else {
                curStreak = 0;
              }
            }
            longestStreak = Math.max(maxStreak, activeStreak);

            // Commits this month
            const latestDate = contributions[contributions.length - 1]?.date || new Date().toISOString().split("T")[0];
            const currentMonthPrefix = latestDate.substring(0, 7);
            commitsThisMonth = contributions
              .filter((d: any) => d.date && d.date.startsWith(currentMonthPrefix))
              .reduce((acc: number, d: any) => acc + (d.count || 0), 0);

            // 12-week velocity
            const calculatedVelocity: { label: string; count: number }[] = [];
            for (let w = 11; w >= 0; w--) {
              const end = contributions.length - (w * 7);
              const start = Math.max(0, end - 7);
              const slice = contributions.slice(start, end);
              const count = slice.reduce((sum: number, day: any) => sum + (day.count || 0), 0);
              calculatedVelocity.push({ label: `W${12 - w}`, count });
            }
            weeklyVelocity = calculatedVelocity;
            peakWeeklyVelocity = Math.max(...weeklyVelocity.map((w) => w.count), 1);
          }
        }

        setStats({
          publicRepos,
          followers,
          following,
          stars: totalStars,
          totalCommits,
          commitsThisMonth,
          activeStreak,
          longestStreak,
          weeklyVelocity,
          peakWeeklyVelocity,
          heatmapDays,
          heatmapMonths,
          topLanguages,
          recentRepos,
          loading: false,
          error: false
        });
      } catch (err) {
        console.info("Notice: Utilizing local cache for GitHub telemetry.");
        if (isMounted) {
          setStats((prev) => ({ ...prev, loading: false, error: false }));
        }
      }
    }

    fetchGitHub();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return stats;
}
