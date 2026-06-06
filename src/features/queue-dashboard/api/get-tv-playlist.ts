export async function getTvPlaylist() {
  const res = await fetch("/api/tv-playlist");

  const data = await res.json();

  return data;
}
