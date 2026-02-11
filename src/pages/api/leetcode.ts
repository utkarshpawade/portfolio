import { LeetCode } from "leetcode-query";
import type { NextApiRequest, NextApiResponse } from "next";

const USERNAME = "utkarshpawade";

function computeStreak(calendarJson: string): number {
  try {
    const map: Record<string, number> = JSON.parse(calendarJson) as Record<string, number>;
    const days = Object.keys(map)
      .map(Number)
      .sort((a, b) => b - a); // newest first

    if (days.length === 0) return 0;

    let streak = 0;
    const MS_PER_DAY = 86400;
    const todaySec = Math.floor(Date.now() / 1000);
    // Normalize to start-of-day UTC
    const todayStart = todaySec - (todaySec % MS_PER_DAY);

    for (let i = 0; i <= days.length; i++) {
      const targetDay = todayStart - i * MS_PER_DAY;
      // Allow ±1 day tolerance (LC timestamps may vary)
      const found = days.some((d) => Math.abs(d - targetDay) < MS_PER_DAY);
      if (found) {
        streak++;
      } else if (i > 0) {
        break; // streak broken
      }
      // i === 0 and not found: maybe didn't solve today yet, continue checking yesterday
    }
    return streak;
  } catch {
    return 0;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Set cache headers for 1 hour
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=7200",
  );

  try {
    const lc = new LeetCode();
    const user = await lc.user(USERNAME);

    const matched = user.matchedUser;
    if (!matched) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract submission counts by difficulty
    const acNums = matched.submitStats?.acSubmissionNum ?? [];
    const allCount = acNums.find((a) => a.difficulty === "All")?.count ?? 0;
    const easyCount = acNums.find((a) => a.difficulty === "Easy")?.count ?? 0;
    const medCount = acNums.find((a) => a.difficulty === "Medium")?.count ?? 0;
    const hardCount = acNums.find((a) => a.difficulty === "Hard")?.count ?? 0;

    // Total submissions (all difficulties)
    const totalNums = matched.submitStats?.totalSubmissionNum ?? [];
    const totalSubmissions =
      totalNums.find((a) => a.difficulty === "All")?.submissions ?? 0;

    // Profile info
    const profile = matched.profile;
    const ranking = profile?.ranking ?? 0;

    // Contest rating
    let contestRating = 0;
    try {
      const contestInfo = await lc.user_contest_info(USERNAME);
      contestRating = Math.round(contestInfo?.userContestRanking?.rating ?? 0);
    } catch {
      // contest info may not be available
    }

    // Streak computed from submissionCalendar
    const streak = computeStreak(matched.submissionCalendar ?? "{}");

    // Badges from LeetCode
    const badges = (matched.badges ?? []).slice(0, 6).map((b) => ({
      name: b.displayName || "Badge",
      icon: "🏅",
    }));

    // If no real badges, add some derived ones
    if (badges.length === 0) {
      if (allCount >= 100) badges.push({ name: "Century Club", icon: "💯" });
      if (easyCount >= 50) badges.push({ name: "Easy Crusher", icon: "🟢" });
      if (medCount >= 50) badges.push({ name: "Medium Slayer", icon: "🟡" });
      if (hardCount >= 20) badges.push({ name: "Hard Hitter", icon: "🔴" });
      if (streak >= 30) badges.push({ name: "Streak Master", icon: "🔥" });
      if (ranking <= 100000 && ranking > 0)
        badges.push({ name: "Top 100K", icon: "⚡" });
    }

    // Recent submissions
    const recentRaw = user.recentSubmissionList ?? [];
    const recentSubmissions = recentRaw.slice(0, 3).map((s) => ({
      title: s.title ?? "Unknown",
      difficulty: "Medium" as const,
      date: s.timestamp
        ? new Date(Number(s.timestamp) * 1000).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      status: s.statusDisplay ?? "Accepted",
    }));

    // Gamification: compute XP and level from total solved
    const totalXp = allCount * 10 + medCount * 5 + hardCount * 15;
    const xpPerLevel = 500;
    const level = Math.floor(totalXp / xpPerLevel) + 1;
    const xp = totalXp % xpPerLevel;
    const maxXp = xpPerLevel;

    // Rank string
    let rankTitle = "Noob";
    if (allCount >= 500) rankTitle = "Grandmaster";
    else if (allCount >= 300) rankTitle = "Master";
    else if (allCount >= 200) rankTitle = "Knight";
    else if (allCount >= 100) rankTitle = "Warrior";
    else if (allCount >= 50) rankTitle = "Apprentice";

    const data = {
      totalSolved: allCount,
      easy: easyCount,
      medium: medCount,
      hard: hardCount,
      streak,
      rank: rankTitle,
      globalRanking: ranking,
      contestRating,
      totalSubmissions,
      xp,
      level,
      maxXp,
      badges,
      recentSubmissions,
    };

    return res.status(200).json(data);
  } catch (err) {
    console.error("LeetCode API error:", err);
    return res.status(500).json({ error: "Failed to fetch LeetCode data" });
  }
}
