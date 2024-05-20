async function listVideos() {
  const videos = await fetch('http://localhost:3000/videos')
    .then(res => res.json());
  
  return videos;
}

export const api = {
  listVideos
};