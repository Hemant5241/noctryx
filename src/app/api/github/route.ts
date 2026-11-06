import { NextRequest, NextResponse } from "next/server";
import { gitHubIntegrationConfig } from "@/data/socials";

export interface PublicRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestedUsername =
    searchParams.get("username") || gitHubIntegrationConfig.verifiedUsername;

  // If no username is provided or it's an unverified placeholder
  if (
    !requestedUsername ||
    requestedUsername.trim() === "" ||
    requestedUsername.includes("placeholder") ||
    requestedUsername.includes("example")
  ) {
    return NextResponse.json(
      {
        status: "unconfigured",
        configured: false,
        message:
          "GitHub integration is awaiting verified username configuration in src/data/socials.ts or NEXT_PUBLIC_GITHUB_USERNAME.",
        documentationNotice: gitHubIntegrationConfig.documentationNotice,
        repos: [],
      },
      { status: 200 }
    );
  }

  // Validate GitHub username format (max 39 characters, alphanumeric with single hyphens)
  const usernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
  if (!usernameRegex.test(requestedUsername)) {
    return NextResponse.json(
      {
        status: "invalid_username",
        error: "Malformed GitHub username format provided.",
        repos: [],
      },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(
        requestedUsername
      )}/repos?sort=updated&per_page=6&type=public`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "OmShindePortfolio-PublicVerification/2.0",
        },
        next: { revalidate: 3600 }, // Cache public responses for 1 hour to preserve rate limits
      }
    );

    const rateLimitRemaining = res.headers.get("x-ratelimit-remaining");

    if (res.status === 404) {
      return NextResponse.json(
        {
          status: "not_found",
          error: `GitHub user "${requestedUsername}" not found.`,
          repos: [],
        },
        { status: 404 }
      );
    }

    if (res.status === 403 || res.status === 429) {
      return NextResponse.json(
        {
          status: "rate_limited",
          error: "GitHub API public rate limit reached (60 req/hr unauthenticated limit).",
          rateLimitRemaining: "0",
          repos: [],
        },
        { status: 429 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          status: "upstream_error",
          error: `GitHub API returned HTTP ${res.status}`,
          repos: [],
        },
        { status: res.status }
      );
    }

    const rawData = await res.json();

    if (!Array.isArray(rawData)) {
      return NextResponse.json(
        {
          status: "empty",
          repos: [],
        },
        { status: 200 }
      );
    }

    // Sanitize and pluck ONLY safe public fields
    const sanitizedRepos: PublicRepository[] = rawData.map((item: Record<string, unknown>) => ({
      id: Number(item.id),
      name: String(item.name || ""),
      description: item.description ? String(item.description) : null,
      html_url: String(item.html_url || ""),
      language: item.language ? String(item.language) : null,
      stargazers_count: Number(item.stargazers_count || 0),
      forks_count: Number(item.forks_count || 0),
      updated_at: String(item.updated_at || ""),
      topics: Array.isArray(item.topics) ? item.topics.map(String) : [],
    }));

    return NextResponse.json(
      {
        status: "success",
        configured: true,
        username: requestedUsername,
        rateLimitRemaining: rateLimitRemaining || "unknown",
        repos: sanitizedRepos,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "network_error",
        error: error instanceof Error ? error.message : "Failed to connect to GitHub API",
        repos: [],
      },
      { status: 502 }
    );
  }
}
