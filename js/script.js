// manjeador de click del busqueda de post
const handleClickPost = () => {
  const etiquetaSearch = document.getElementById("busqueda");
  if (!etiquetaSearch) return;

  const idPost = Number(etiquetaSearch.value);
  getPostById(idPost);
};

// obtener usuario
function getPostById(idPost = 0) {
  if (!idPost || typeof idPost !== "number" || isNaN(idPost)) {
    document.getElementById("response").innerHTML = "Id no válido";
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const container = document.getElementById("response");
      if (!container) return;
      container.innerHTML = "";

      const { title, body } = JSON.parse(this.response);

      container.innerHTML = `
        <div class="col-lg-5 py-2">
          <div class="shadow px-2 py-3 h-100 rounded-4">
            <h6 class="fs-5 text-center">
                ${title}
            </h6>
            <p class="saltos-linea">
              ${body}
            <p/>
          </div>
        </div>
      `;
    }
  };
  xhr.open("GET", `https://jsonplaceholder.typicode.com/posts/${idPost}`, true);
  xhr.send();
}

// obtener comida
function getComida() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const container = document.getElementById("container-comida");
      if (!container) return;
      container.innerHTML = "";

      const { meals } = JSON.parse(this.response);

      // recorrer items
      meals.forEach((meal) => {
        const { strMeal, strMealThumb } = meal;

        container.innerHTML += `
            <div class="col-lg-3 py-2">
              <div class="shadow px-2 py-3 h-100 rounded-4">
                <img
                  src=${strMealThumb}
                  alt=${strMeal}
                  class="d-block m-auto img-fluid rounded-4"
                />
                <h6 class="fs-5 text-center">
                    ${strMeal}
                </h6>
              </div>
            </div>
          `;
      });
    }
  };
  xhr.open(
    "GET",
    "https://www.themealdb.com/api/json/v1/1/search.php?f=b",
    true
  );
  xhr.send();
}

// manjeador de click del a busqueda de youtube
const handleClickSearch = () => {
  const etiquetaSearch = document.getElementById("busqueda");
  if (!etiquetaSearch) return;

  const search = etiquetaSearch.value;
  getSearchYoutube(search);
};

// obtener busqueda de youtube
function getSearchYoutube(search = "") {
  const apikey = "AIzaSyBljEoVi6i1w2mO4inq_4Qr8tW14aj3PKQ";
  const url = "https://www.googleapis.com/youtube/v3/search";
  const busqueda = search.trim().length >= 1 ? search.trim() : "tendencias";
  const type = "video";
  const part = "snippet";
  const maxResults = 15;

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const container = document.getElementById("container-search");
      if (!container) return;
      container.innerHTML = "";

      const { items } = JSON.parse(this.response);

      // recorrer items
      items.forEach((item) => {
        container.innerHTML += `
            <div class="col-lg-4 py-2">
              <div class="shadow px-2 py-3 h-100 rounded-4">
                <img
                  src=${item.snippet.thumbnails.medium.url}
                  alt=""
                  class="d-block m-auto img-fluid rounded-4"
                />
                <h6 class="fs-5">
                  <a
                    href="https://www.youtube.com/watch?v=${item.id.videoId}"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="color: inherit; text-decoration: none"
                  >
                    ${item.snippet.title}
                  </a>
                </h6>
                <h6 class="fs-6 text-black-50">
                  <a
                    href="https://www.youtube.com/channel/${item.snippet.channelId}"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="color: inherit; textDecoration: none"
                  >
                    ${item.snippet.channelTitle}
                  </a>
                </h6>
              </div>
            </div>
          `;
      });
    }
  };
  xhr.open(
    "GET",
    `${url}?key=${apikey}&q=${busqueda}&type=${type}&part=${part}&maxResults=${maxResults}`,
    true
  );
  xhr.send();
}

// manjeador de click del a busqueda de youtube
const handleClickPelicula = () => {
  const etiquetaSearch = document.getElementById("busqueda");
  if (!etiquetaSearch) return;

  const search = etiquetaSearch.value;
  getPeliculas(search);
};

// obtener peliculas
function getPeliculas(search = "") {
  const apikey = "ea27c41cbd532d19174d71429927e158";
  const url = "https://api.themoviedb.org/3/discover/movie";
  const urlSearch = "https://api.themoviedb.org/3/search/movie";
  const language = "es-es";
  const sortBy = "popularity.desc";
  const page = 1;
  const busqueda = search.trim().length >= 1 ? search.trim() : "";

  let apiUrl = busqueda
    ? `${urlSearch}?api_key=${apikey}&query=${busqueda}`
    : `${url}?api_key=${apikey}&language=${language}&sort_by=${sortBy}&page=${page}`;

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const container = document.getElementById("container-peliculas");
      if (!container) return;
      container.innerHTML = "";

      const { results } = JSON.parse(this.response);

      // recorrer items
      results.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        if (!poster_path) return;

        container.innerHTML += `
            <div class="col-lg-3 py-2">
              <div class="shadow px-2 py-3 h-100 rounded-4">
                <img
                  src="https://image.tmdb.org/t/p/w1280${poster_path}"
                  alt=${title}
                  class="d-block m-auto img-fluid rounded-4"
                />
                <h6 class="fs-5 text-center">
                    ${title}
                </h6>
                <h6 class="fs-5 fw-bold text-black-50 text-end">
                    ${vote_average}
                </h6>
              </div>
            </div>
          `;
      });
    }
  };

  xhr.open("GET", apiUrl, true);
  xhr.send();
}

getSearchYoutube();
getPeliculas();
