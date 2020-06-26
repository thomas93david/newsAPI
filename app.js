const BASE_URL = "https://api.currentsapi.services";
const KEY = "apiKey=7JTqW9vfS6zyFzGR2zZosTWgtlsblwzFHMT6HP8DB5OeL5AN";

async function fetchNewsArticles() {
  const url = `${BASE_URL}/v1/latest-news?${KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

fetchNewsArticles();

async function fetchAllCategories() {
  const url = `${BASE_URL}/v1/available/categories?${KEY}`;
  if (localStorage.getItem("categories")) {
    return JSON.parse(localStorage.getItem("categories"));
  }
  try {
    const response = await fetch(url);
    const { news } = await response.json();
    localStorage.setItem("categories", JSON.stringify(news));
    return news;
  } catch (error) {
    console.error(error);
  }
}
// fetchAllCategories();

async function fetchAllLanguages() {
  const url = `${BASE_URL}/v1/available/languages?${KEY}`;
  if (localStorage.getItem("languages")) {
    return JSON.parse(localStorage.getItem("languages"));
  }
  try {
    const response = await fetch(url);
    const { news } = await response.json();
    localStorage.setItem("languages", JSON.stringify(news));
    return news;
  } catch (error) {
    console.error(error);
  }
}
// fetchAllLanguages();

async function fetchAllRegions() {
  const url = `${BASE_URL}/v1/available/regions?${KEY}`;
  if (localStorage.getItem("regions")) {
    return JSON.parse(localStorage.getItem("regions"));
  }
  try {
    const response = await fetch(url);
    const { news } = await response.json();
    localStorage.setItem("regions", JSON.stringify(news));
    return news;
  } catch (error) {
    console.error(error);
  }
}

// fetchAllRegions();

async function preFetchRestrictions() {
  try {
    const [categories, languages, regions] = await Promise.all([
      fetchAllCategories(),
      fetchAllLanguages(),
      fetchAllRegions(),
    ]);

    // console.log(categories);
    categories.forEach((categories) => {
      $("#select-categories").append(
        $(`<option value="${categories[1]}">${categories}</option>`)
      );
    });

    const dialect = Object.entries(languages);
    // console.log(dialect);
    dialect.forEach((language) => {
      $("#select-language").append(
        `<option value="${language[1]}">${language[0]}</option>`
      );
    });

    const territory = Object.entries(regions);
    // console.log(territory);
    territory.forEach((region) => {
      $("#select-region").append(
        $(`<option value="${region[1]}">${region[0]}</option>`)
      );
    });
  } catch (error) {
    console.error(error);
  }
}

preFetchRestrictions();

function searchQueryString() {
  const base = `${BASE_URL}/v1/search?${KEY}`;
  const body = [...$("#search select")]
    .map(function (element) {
      return `${$(element).attr("name")}=${$(element).val()}}`;
    })
    .join("&");
  const keyWords = `keyword=${$("#keywords").val()}`;
  const url = encodeURI(`${base}&${body}&${keyWords}`);
  return url;
}

$("#search").on("submit", async function (event) {
  event.preventDefault();
  try {
    const response = await fetch(searchQueryString);
    const { news } = await response.json();
    console.log(news);
  } catch (error) {
    console.error(error);
  }
});

// function renderArticles(news) {
//   return $(".results").append(
//     $(` <div class="result-card">
//         <header>
//             <h2>${news.title}</h2>
//             <h3>${news.author}</h3>
//             <p> ${news.published}</p>
//         </header>
//         <p> ${news.description} </p>
//         <p> ${news.url} </p>
//    </div> `)
//   );
// }
// function renderArticlesList(articleList) {
// $("#news-app section.active").removeClass("active");
//   $(".results").empty();
//   articleList.forEach(function (article) {
//     $(".results").append(renderArticles(article));
//   });
// }

function clear() {
  localStorage.clear();
}
