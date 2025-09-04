import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ items: [] });
  }

  const res = await fetch(`https://api.github.com/search/users?q=${query}&per_page=5`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "GitHub API error" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
