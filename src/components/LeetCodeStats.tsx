import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const MONO = "var(--font-jetbrains-mono), monospace";

/* Themeable color roles — resolved per active theme in globals.css */
const INK = "var(--text)";
const PAPER = "var(--bg)";
const ACCENT = "var(--accent)";
const MUTED = "var(--muted)";
const LINE = "var(--border)";

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

const eyebrowStyle: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 12,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: MUTED,
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      style={{
        flex: 1,
        width: "100%",
        background: PAPER,
        border: `1px solid ${LINE}`,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        justifyContent: "center",
      }}
    >
      {children}
    </motion.div>
  );
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
      <Shell>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 0",
          }}
        >
          <div
            style={{
              height: 32,
              width: 32,
              borderRadius: "50%",
              border: `2px solid ${LINE}`,
              borderTopColor: ACCENT,
              animation: "spin 0.8s linear infinite",
            }}
          />
          <style jsx>{`
            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      </Shell>
    );
  }

  if (error !== null || data === null) {
    return (
      <Shell>
        <div style={{ textAlign: "center", color: MUTED, fontFamily: MONO }}>
          {error ?? "Failed to load data"}
        </div>
      </Shell>
    );
  }

  const difficulty = [
    { label: "Total", value: data.totalSolved, color: ACCENT },
    { label: "Easy", value: data.easy, color: "#1F8A5B" },
    { label: "Medium", value: data.medium, color: "#C2871E" },
    { label: "Hard", value: data.hard, color: "#C0392B" },
  ];

  return (
    <Shell>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <h3
          style={{
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: INK,
          }}
        >
          LeetCode profile
        </h3>
        <div style={{ border: `1px solid ${LINE}`, padding: "8px 14px" }}>
          <p style={eyebrowStyle}>Contest rating</p>
          <p
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: ACCENT,
              marginTop: 2,
            }}
          >
            {data.contestRating || "N/A"}
          </p>
        </div>
      </div>

      {/* Difficulty grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          background: LINE,
          border: `1px solid ${LINE}`,
        }}
      >
        {difficulty.map((d) => (
          <div
            key={d.label}
            style={{ background: PAPER, padding: "18px 14px", textAlign: "center" }}
          >
            <span
              style={{
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: d.color,
              }}
            >
              {d.value}
            </span>
            <p style={{ ...eyebrowStyle, marginTop: 6 }}>{d.label}</p>
          </div>
        ))}
      </div>

      {/* Streak + global rank */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1,
          background: LINE,
          border: `1px solid ${LINE}`,
        }}
      >
        <div style={{ background: PAPER, padding: "18px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 26, fontWeight: 600, color: INK }}>
            🔥 {data.streak}
          </span>
          <p style={{ ...eyebrowStyle, marginTop: 6 }}>Day streak</p>
        </div>
        <div style={{ background: PAPER, padding: "18px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 26, fontWeight: 600, color: INK }}>
            {data.globalRanking > 0
              ? data.globalRanking.toLocaleString()
              : "N/A"}
          </span>
          <p style={{ ...eyebrowStyle, marginTop: 6 }}>Global rank</p>
        </div>
      </div>

      {/* Badges */}
      {data.badges.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={eyebrowStyle}>Badges</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {data.badges.map((badge, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  border: `1px solid ${LINE}`,
                  padding: "6px 11px",
                  fontSize: 12,
                  color: INK,
                }}
              >
                <span>{badge.icon}</span>
                <span>{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent submissions */}
      {data.recentSubmissions.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={eyebrowStyle}>Recent submissions</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {data.recentSubmissions.map((submission, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  borderTop: `1px solid ${LINE}`,
                  padding: "11px 0",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: INK }}>
                    {submission.title}
                  </p>
                  <p style={{ ...eyebrowStyle, marginTop: 2 }}>
                    {submission.date}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color:
                      submission.status === "Accepted" ? "#1F8A5B" : "#C0392B",
                  }}
                >
                  {submission.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile link */}
      <Link
        href="https://leetcode.com/u/utkarshpawade/"
        target="_blank"
        style={{
          alignSelf: "flex-start",
          fontFamily: MONO,
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: INK,
          textDecoration: "none",
          borderBottom: `2px solid ${ACCENT}`,
          paddingBottom: 4,
        }}
      >
        View full profile →
      </Link>
    </Shell>
  );
}
