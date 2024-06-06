async function addVideo( 
  titulo,
  descricao,
  url,
  imagem
) {
  const newVideo = await fetch('http://localhost:3000/videos', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      titulo: titulo,
      descricao: `${descricao} visualizações`,
      url: url,
      imagem: imagem
    })
  })
    .then(res => res.json());

  if (!newVideo) {
    throw new Error('Não foi possível salvar o vídeo');
  }
}

async function searchVideo(search) {
  const videos = await fetch(`http://localhost:3000/videos?q=${search}`)
    .then(res => res.json());
  
  return videos;
}

async function listVideos() {
  const videos = await fetch('http://localhost:3000/videos')
    .then(res => res.json());
  
  return videos;
}

export const api = {
  addVideo,
  listVideos,
  searchVideo
};