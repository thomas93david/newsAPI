const BASE_URL = "https://api.currentsapi.services";
const KEY = "apikey=yf496iX_gIago9u2bX_qlSNVdtXrsQhdv2gjRCqpYXJzVte0";

function fetchData(url) {
  return fetch(url)
    .then(function (res) {
      return res.json();
    })
    .catch(function (error) {
      console.error(error);
    });
}

async function fetchArticles() {
  return fetchData(`${BASE_URL}/v1/latest-news?${KEY}`);
  //   const url = `${BASE_URL}/v1/latest-news?${KEY}`;
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     console.log(data);
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
}
fetchArticles();

function renderArticles(articles) {
  return $(".results").append(
    $(` <div class="result-card">
        <header>
            <h2>${articles.title}</h2>
            <h3>${articles.author}</h3>
            <p> ${articles.published}</p>
        </header>
        <p> ${articles.description} </p>
        <p> ${articles.url} </p>       
   </div> `)
  );
}

function renderArticlesList(articleList) {
  $(".results").empty();
  articleList.forEach(function (article) {
    $(".results").append(renderArticles(article));
  });
}
