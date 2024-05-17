// export default async function getRepos(username) {
//   const response = await fetch(
//     `https://api.github.com/users/${username}/repos`,
//     {
//       cache: 'no-cache',
//     }
//   );
//   if (!response.ok) {
//     throw new Error('Failed to fetch repositories');
//   }
//   const repos = await response.json();
//   // Sort repositories by creation date in descending order
//   repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
//   // Get the latest two repositories
//   const latestRepos = repos.slice(0, 2);
//   return latestRepos;
// }
