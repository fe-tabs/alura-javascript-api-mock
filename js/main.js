import { api } from "./api.js";

const videosContainer = document.querySelector('ul.videos__container');
const formulario = document.querySelector('[data-formulario]');
const searchBtn = document.querySelector('.pesquisar__botao');

listVideos();

async function addVideo(e) {
  e.preventDefault();

  const titulo = document.querySelector('[data-titulo]').value;
  const imagem = document.querySelector('[data-imagem]').value;
  const url = document.querySelector('[data-url]').value;
  const descricao = Math.floor(Math.random() * 10).toString();

  try {
    await api.addVideo(
      titulo,
      descricao,
      url,
      imagem
    );
  
    window.location.href = '../pages/envio-concluido.html';    
  } catch (error) {
    alert(e);
  }
}

searchBtn.addEventListener("click", e => {
  console.log('clicked')
  searchVideo(e);
});

formulario.addEventListener("submit", e => addVideo(e));

async function searchVideo(e) {
  e.preventDefault();

  try {
    const search = document.querySelector('.pesquisar__input').value;
    const videos = await api.searchVideo(search);
  
    while (videosContainer.firstChild) {
      videosContainer.removeChild(videosContainer.firstChild);
    }
  
    videos.forEach(video => {
      videosContainer.appendChild(createVideoCard(video));
    });

    if (videos.length == 0) {
      videosContainer.innerHTML = `
        <h2 class="mensagem__titulo">Não existem vídeos com esse termo</h2>
      `;
    }
  } catch (error) {
    videosContainer.innerHTML = `
      <h2 class="mensagem__titulo">
        Não foi possível carregar os vídeos!
      </h2>
    `;
  }
}

async function listVideos() {
  try {
    const videos = await api.listVideos();
    videos.forEach(video => {
      videosContainer.appendChild(createVideoCard(video));
    });
  } catch (error) {
    videosContainer.innerHTML = `
      <h2 class="mensagem__titulo">
        Não foi possível carregar os vídeos!
      </h2>
    `;
  }
}

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
