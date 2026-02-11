import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface LeetCodeData {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  streak: number;
  rank: string;
  globalRanking: number;
  contestRating: number;
  totalSubmissions: number;
  xp: number;
  level: number;
  maxXp: number;
  badges: Array<{ name: string; icon: string }>;
  recentSubmissions: Array<{
    title: string;
    difficulty: string;
    date: string;
    status: string;
  }>;
}

export default function LeetCodeStats() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/leetcode")
      .then((res) => res.json())
      .then((data: LeetCodeData | { error: string }) => {
        if ("error" in data) {
          setError(data.error);
        } else {
          setData(data);
        }
        setLoading(false);
      })
      .catch((_err) => {
        setError("Failed to load LeetCode data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex w-full flex-1 flex-col justify-center rounded-lg bg-white/5 p-6 backdrop-blur"
      >
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        </div>
      </motion.div>
    );
  }

  if (error !== null || data === null) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex w-full flex-1 flex-col justify-center rounded-lg bg-white/5 p-6 backdrop-blur"
      >
        <div className="text-center text-muted-foreground">
          {error ?? "Failed to load data"}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex w-full flex-1 flex-col justify-center space-y-6 rounded-lg bg-white/5 p-6 backdrop-blur"
    >
      {/* Header with Level and Rank */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="clash-grotesk text-gradient text-2xl font-bold">
            Leetcode Profile
          </h3>
          {/* <p className="text-sm text-muted-foreground">{data.rank}</p> */}
        </div>
        <div className="rounded-lg bg-white/10 px-4 py-2">
          <p className="text-xs text-muted-foreground">Contest Rating</p>
          <p className="clash-grotesk text-gradient text-xl font-bold">
            {data.contestRating ?? "N/A"}
          </p>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="space-y-2">
        {/* <div className="flex justify-between text-sm"> */}
          {/* <span className="text-muted-foreground">XP Progress</span> */}
          {/* <span className="text-muted-foreground">
            {data.xp} / {data.maxXp}
          </span> */}
        {/* </div> */}
        {/* <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${(data.xp / data.maxXp) * 100}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-blue-500"
          />
        </div> */}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-white/5 p-4 text-center">
          <span className="clash-grotesk text-gradient text-2xl font-bold">
            {data.totalSolved}
          </span>
          <p className="text-xs text-muted-foreground">Total Solved</p>
        </div>
        <div className="rounded-lg bg-white/5 p-4 text-center">
          <span className="clash-grotesk text-2xl font-bold text-green-500">
            {data.easy}
          </span>
          <p className="text-xs text-muted-foreground">Easy</p>
        </div>
        <div className="rounded-lg bg-white/5 p-4 text-center">
          <span className="clash-grotesk text-2xl font-bold text-yellow-500">
            {data.medium}
          </span>
          <p className="text-xs text-muted-foreground">Medium</p>
        </div>
        <div className="rounded-lg bg-white/5 p-4 text-center">
          <span className="clash-grotesk text-2xl font-bold text-red-500">
            {data.hard}
          </span>
          <p className="text-xs text-muted-foreground">Hard</p>
        </div>
      </div>

      {/* Streak and Ranking */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-white/5 p-4 text-center">
          <span className="clash-grotesk text-gradient text-2xl font-bold">
            🔥 {data.streak}
          </span>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </div>
        <div className="rounded-lg bg-white/5 p-4 text-center">
          <span className="clash-grotesk text-gradient text-2xl font-bold">
            {data.globalRanking > 0 ? data.globalRanking.toLocaleString() : "N/A"}
          </span>
          <p className="text-xs text-muted-foreground">Global Rank</p>
        </div>
      </div>

      {/* Badges */}
      {data.badges.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground">Badges</p>
          <div className="flex flex-wrap gap-2">
            {data.badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs"
              >
                <span>{badge.icon}</span>
                <span>{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Submissions */}
      {data.recentSubmissions.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground">
            Recent Submissions
          </p>
          <div className="space-y-2">
            {data.recentSubmissions.map((submission, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-white/5 p-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{submission.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {submission.date}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold ${
                    submission.status === "Accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {submission.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Link to Profile */}
      <div className="text-center">
        <Link
          href="https://leetcode.com/u/utkarshpawade/"
          target="_blank"
          className="text-sm text-primary underline hover:text-primary/80"
        >
          View Full Profile →
        </Link>
      </div>
    </motion.div>
  );
}
