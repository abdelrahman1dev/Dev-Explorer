// utils/github.ts
export async function getUserRepos(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  })

  if (res.status === 404) {
    throw new Error("User not found")
  }

  if (!res.ok) {
    throw new Error("Failed to fetch repositories")
  }

  return res.json()
}
export async function getGitHubUser(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch user")
  }

  return res.json()
}

