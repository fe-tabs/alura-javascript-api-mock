import { api } from "./api.js";

const videosContainer = document.querySelector('ul.videos__container');

async function listVideos() {
  const videos = await api.listVideos();
  videos.forEach(video => {
    videosContainer.appendChild(createVideoCard(video));
  });
  console.log(videos);
}

listVideos();

function createVideoCard(data) {
  let video = document.createElement('li');
  video.classList.add('videos__item');
  video.id = `${data.id}`;
  video.innerHTML = `
    <iframe width="100%" height="72%" src="${data.url}"
      title="${data.imagem}" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
    <div class="descricao-video">
      <img src="${data.imagem}" alt="logo canal alura">
      <h3>${data.titulo}</h3>
      <p>${data.descricao}</p>
    </div>
  `;

  return video;
};
