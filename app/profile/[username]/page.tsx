import { getGitHubUser , getUserRepos } from "../../utils/github"

export default async function ProfilePage({ params }: { params: { username: string } }) {

    const user = await getGitHubUser(params.username)

    return (
        <>
        <div className="p-8 text-center text-white">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-32 h-32 rounded-full mx-auto"
        />
        <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
        <p className="text-gray-500">@{user.login}</p>
        <p className="mt-2">Repos: {user.public_repos}</p>

      </div>
      <div className="bg-slate-900/80 rounded-lg shadow-lg m-4 text-white p-4">
        <h2 className="text-xl font-bold mb-4 text-center">Latest Repositories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8 ">
          {await Promise.all((await getUserRepos(params.username)).map(async (repo: any) => (
            <div key={repo.id} className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-bold text-lg">
                {repo.name}
              </a>
              <p className="text-gray-700 mt-2">{repo.description}</p>
              <p className="text-sm text-gray-500 mt-2">Updated at: {new Date(repo.updated_at).toLocaleDateString()}</p>
            </div>
          )))}
        </div>
      </div></>
    )
  } 

