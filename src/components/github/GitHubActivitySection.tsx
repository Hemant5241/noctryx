"use client";

import { useState, useEffect, useCallback } from "react";
import {
  GitFork,
  Star,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Clock,
  ShieldCheck,
  Search,
  FolderGit2,
} from "lucide-react";
import { gitHubIntegrationConfig } from "@/data/socials";
import type { PublicRepository } from "@/app/api/github/route";

interface GitHubApiResponse {
  status:
    | "success"
    | "unconfigured"
    | "not_found"
    | "rate_limited"
    | "upstream_error"
    | "network_error"
    | "invalid_username"
    | "empty";
  configured?: boolean;
  username?: string;
  rateLimitRemaining?: string;
  error?: string;
  message?: string;
  documentationNotice?: string;
  repos: PublicRepository[];
}

export function GitHubActivitySection() {
  const [activeUsername, setActiveUsername] = useState<string | null>(
    gitHubIntegrationConfig.verifiedUsername
  );
  const [testInput, setTestInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GitHubApiResponse | null>(null);

  const fetchGitHubData = useCallback((usernameToFetch: string | null) => {
    setLoading(true);
    const url = usernameToFetch
      ? `/api/github?username=${encodeURIComponent(usernameToFetch)}`
      : `/api/github`;

    fetch(url)
      .then((res) => res.json())
      .then((json: GitHubApiResponse) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setData({
          status: "network_error",
          error: err instanceof Error ? err.message : "Network failure",
          repos: [],
        });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let ignore = false;
    const url = activeUsername
      ? `/api/github?username=${encodeURIComponent(activeUsername)}`
      : `/api/github`;

    fetch(url)
      .then((res) => res.json())
      .then((json: GitHubApiResponse) => {
        if (!ignore) {
          setData(json);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setData({
            status: "network_error",
            error: err instanceof Error ? err.message : "Network failure",
            repos: [],
          });
        }
      });

    return () => {
      ignore = true;
    };
  }, [activeUsername]);

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testInput.trim()) return;
    setActiveUsername(testInput.trim());
  };

  const handleResetToDefault = () => {
    setTestInput("");
    setActiveUsername(gitHubIntegrationConfig.verifiedUsername);
  };

  return (
    <section className="w-full border-b-2 border-black bg-[#F4F1EA] py-16 sm:py-24 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-black pb-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF3B00] tracking-widest mb-2">
              <FolderGit2 className="w-4 h-4" />
              <span>PUBLIC REPOSITORY AUDIT {"//"} GITHUB TELEMETRY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-none">
              OPEN SOURCE ACTIVITY
            </h2>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[#FF3B00] font-bold block">
              {"// UNTRUSTED INPUT AUDITING"}
            </span>
            <span className="text-xs text-black/60">
              PUBLIC REPOSITORY API REVALIDATION
            </span>
          </div>
        </div>

        {/* Status / Notice Bar */}
        <div className="p-4 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#FF3B00] shrink-0" />
            <div className="text-xs text-black/80">
              <span className="font-black text-black uppercase">
                IDENTITY SEPARATION POLICY:
              </span>{" "}
              Developer/maintainer accounts are strictly isolated from Om Shinde&apos;s portfolio.
              Only verified public repositories for the configured account are displayed.
            </div>
          </div>

          {activeUsername && (
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-bold bg-black text-[#F4F1EA] px-2 py-1">
                TARGET: @{activeUsername}
              </span>
              <button
                type="button"
                onClick={() => fetchGitHubData(activeUsername)}
                disabled={loading}
                className="p-1 border border-black hover:bg-[#FF3B00] hover:text-white transition-colors cursor-pointer"
                aria-label="Refresh GitHub Telemetry"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          )}
        </div>

        {/* Unconfigured / Specimen State */}
        {(!activeUsername || data?.status === "unconfigured") && !loading && (
          <div className="p-8 sm:p-12 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner mb-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-black text-[#CCFF00] flex items-center justify-center shrink-0 border-2 border-black font-black text-xl">
                GH
              </div>
              <div className="space-y-2">
                <div className="inline-block px-2 py-0.5 bg-[#CCFF00] text-black text-[10px] font-bold border border-black">
                  AWAITING VERIFIED USERNAME
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-black uppercase">
                  GITHUB PROFILE INTEGRATION READY
                </h3>
                <p className="text-xs sm:text-sm font-sans text-black/80 max-w-2xl leading-relaxed">
                  The public repository module is implemented and connected to GitHub&apos;s REST
                  API with 1-hour cache revalidation. To display Om Shinde&apos;s verified public
                  repositories, set the verified handle in{" "}
                  <code className="bg-black/5 px-1.5 py-0.5 border border-black/20 text-[#FF3B00] font-mono text-xs font-bold">
                    src/data/socials.ts
                  </code>{" "}
                  or define the{" "}
                  <code className="bg-black/5 px-1.5 py-0.5 border border-black/20 text-[#FF3B00] font-mono text-xs font-bold">
                    NEXT_PUBLIC_GITHUB_USERNAME
                  </code>{" "}
                  environment variable.
                </p>
              </div>
            </div>

            {/* Interactive Handle Preview Form */}
            <div className="p-6 border-2 border-black bg-[#F4F1EA] space-y-4">
              <div className="text-xs font-bold text-black uppercase">
                TEST INTEGRATION WITH ANY PUBLIC GITHUB HANDLE:
              </div>
              <form onSubmit={handleTestSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-3 text-xs text-black/50 font-bold">@</span>
                  <input
                    type="text"
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    placeholder="e.g. torvalds or vercel"
                    className="w-full pl-7 pr-3 py-2.5 border-2 border-black bg-white text-xs font-mono font-bold text-black focus:outline-none focus:bg-white focus-visible:ring-2 focus-visible:ring-[#FF3B00]"
                    aria-label="GitHub username to test"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !testInput.trim()}
                  className="brutalist-button brutalist-button-primary shrink-0 py-2.5 px-6 flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FF3B00]"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>PREVIEW TELEMETRY</span>
                </button>
              </form>
              <p className="text-[10px] text-black/60">
                NOTE: This in-memory preview allows prospective employers to evaluate the live GitHub
                integration without committing unverified accounts.
              </p>
            </div>
          </div>
        )}

        {/* Loading State Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" aria-live="polite">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="p-6 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4 animate-pulse"
              >
                <div className="h-4 bg-black/15 w-3/4"></div>
                <div className="h-3 bg-black/10 w-full"></div>
                <div className="h-3 bg-black/10 w-5/6"></div>
                <div className="flex gap-4 pt-4 border-t border-black/10">
                  <div className="h-3 bg-black/15 w-16"></div>
                  <div className="h-3 bg-black/15 w-12"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rate-Limited / Error States */}
        {!loading && data?.status === "rate_limited" && (
          <div className="p-6 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(255,59,0,1)] mb-8 space-y-3">
            <div className="flex items-center gap-2 text-[#FF3B00] font-bold text-xs uppercase">
              <AlertCircle className="w-4 h-4" />
              <span>GITHUB API PUBLIC RATE LIMIT REACHED</span>
            </div>
            <p className="text-xs text-black/80 font-sans leading-relaxed">
              GitHub restricts unauthenticated requests to 60 queries per hour per IP. The server will
              re-enable requests once the hourly window resets.
            </p>
          </div>
        )}

        {!loading && data?.status === "not_found" && (
          <div className="p-6 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(255,59,0,1)] mb-8 space-y-3">
            <div className="flex items-center gap-2 text-[#FF3B00] font-bold text-xs uppercase">
              <AlertCircle className="w-4 h-4" />
              <span>USER NOT FOUND</span>
            </div>
            <p className="text-xs text-black/80 font-sans leading-relaxed">
              The requested GitHub username was not found on GitHub.
            </p>
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-xs font-bold text-[#FF3B00] underline"
            >
              Reset to baseline
            </button>
          </div>
        )}

        {/* Success Repository Grid */}
        {!loading && data?.status === "success" && data.repos.length > 0 && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold border-b border-black/15 pb-2">
              <span className="text-black">
                PUBLIC REPOSITORIES FOR @{data.username} [{data.repos.length}]
              </span>
              <div className="flex items-center gap-4 text-black/60 text-[11px]">
                <span>SORTED: RECENTLY UPDATED</span>
                {activeUsername !== gitHubIntegrationConfig.verifiedUsername && (
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="text-[#FF3B00] hover:underline cursor-pointer"
                  >
                    [RESET PREVIEW]
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.repos.map((repo) => (
                <div
                  key={repo.id}
                  className="p-6 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] crosshair-corner flex flex-col justify-between hover:shadow-[8px_8px_0px_0px_rgba(255,59,0,1)] transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-base font-black text-black group-hover:text-[#FF3B00] transition-colors truncate">
                        {repo.name}
                      </h4>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 border border-black/20 hover:border-black hover:bg-black hover:text-white transition-colors shrink-0"
                        aria-label={`Open repository ${repo.name} on GitHub`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <p className="text-xs font-sans text-black/75 line-clamp-2 leading-relaxed min-h-[32px]">
                      {repo.description || "No description provided."}
                    </p>

                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {repo.topics.slice(0, 3).map((topic, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[9px] font-bold px-1.5 py-0.2 bg-[#F4F1EA] border border-black/20 text-black"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-black/15 flex items-center justify-between text-[11px] text-black/60">
                    <div className="flex items-center gap-3">
                      {repo.language && (
                        <span className="flex items-center gap-1 font-bold text-black">
                          <span className="w-2 h-2 rounded-full bg-[#FF3B00]"></span>
                          <span>{repo.language}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#FF3B00]" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3 text-black/60" />
                        <span>{repo.forks_count}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px]">
                      <Clock className="w-3 h-3 text-black/40" />
                      <span>{new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty Repositories State */}
        {!loading && data?.status === "success" && data.repos.length === 0 && (
          <div className="p-10 border-2 border-dashed border-black/30 bg-white text-center">
            <p className="font-bold text-black text-sm uppercase">
              NO PUBLIC REPOSITORIES FOUND FOR @{data.username}
            </p>
            <p className="text-xs text-black/60 mt-1">
              This account does not currently host any public repositories.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
