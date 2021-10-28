const API_URL =
  "https://gnews.io/api/v4/top-headlines?token=cc6fc0e8e404fe5ef84c8686e3ccddf7";

const container = document.querySelector(".container");

const SEARCH_API = "https://gnews.io/api/v4/search?q=example&token=cc6fc0e8e404fe5ef84c8686e3ccddf7";

const search = document.getElementById("search");

const form = document.getElementById("form");

const getSearchedPost = async (searchQuery) => {
  const data = await fetch(
    `https://gnews.io/api/v4/search?q=${searchQuery}&token=cc6fc0e8e404fe5ef84c8686e3ccddf7`
  );
  const response = await data.json();
  // console.log(response);
  showNews(response.articles)
};

// ------------fetch API
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(search.value);
  const searchVal = search.value;
  getSearchedPost(searchVal);
});

getNews(API_URL);

async function getNews(url) {
  const res = await fetch(url);
  const data = await res.json(url);
  showNews(data.articles);
}

function showNews(articles) {
  container.innerHTML = "";
  articles.forEach((item, i) => {
    const { title, description, image, url, publishedAt } = item;
    const newsEL = document.createElement("div");
    newsEL.classList.add("news-container");

    newsEL.innerHTML = `
  <div class="card mb-3 my-3 container-md">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${image}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                        <p class="card-text"><small class="text-muted">${publishedAt}</small></p>
                        <a href="${url}" class="btn btn-primary">Read Full News</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    container.appendChild(newsEL);
  });
}


