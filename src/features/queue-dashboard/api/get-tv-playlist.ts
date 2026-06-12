export async function getTvPlaylist() {
  const res = await fetch("/api/youtube");

  const data = await res.json();

  return data;
}
