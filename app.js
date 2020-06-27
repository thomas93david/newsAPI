const BASE_URL = "https://api.currentsapi.services";
const KEY = "apiKey=7JTqW9vfS6zyFzGR2zZosTWgtlsblwzFHMT6HP8DB5OeL5AN";

let search = "/v1/search";
let language = "/v1/available/languages";
let region = "/v1/available/regions";
let category = "/v1/available/categories";

//builds the new query string
function newsQueryString() {
  let url = `${BASE_URL}${search}${language}${region}${category}${KEY}`;
  console.log(url);
  return url;
}
//fetches all categories
async function fetchAllCategories() {
  const url = `${BASE_URL}/v1/available/categories?${KEY}`;
  if (localStorage.getItem("categories")) {
    return JSON.parse(localStorage.getItem("categories"));
  }
  try {
    const response = await fetch(url);
    const { categories } = await response.json();
    localStorage.setItem("categories", JSON.stringify(categories));
    return categories;
  } catch (error) {
    console.error(error);
  }
}
// fetchAllCategories();

//fetches all languages
async function fetchAllLanguages() {
  const url = `${BASE_URL}/v1/available/languages?${KEY}`;
  if (localStorage.getItem("languages")) {
    return JSON.parse(localStorage.getItem("languages"));
  }
  try {
    const response = await fetch(url);
    const { languages } = await response.json();
    localStorage.setItem("languages", JSON.stringify(languages));
    return languages;
  } catch (error) {
    console.error(error);
  }
}
// fetchAllLanguages();

//fetches all regions
async function fetchAllRegions() {
  const url = `${BASE_URL}/v1/available/regions?${KEY}`;
  if (localStorage.getItem("regions")) {
    return JSON.parse(localStorage.getItem("regions"));
  }
  try {
    const response = await fetch(url);
    const { regions } = await response.json();
    localStorage.setItem("regions", JSON.stringify(regions));
    return regions;
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

// $("#search").on("submit", async function (event) {
//   event.preventDefault();
//   try {
//     const response = await fetch(newsQueryString());
//     const { news } = await response.json();
//     console.log(news);
//   } catch (error) {
//     console.error(error);
//   }
// });

$("#keywords").on("change", function () {
  event.preventDefault();
  let keys = $("#keywords").val();
  search = `keyword=${keys}&`;
  newsQueryString();
});

$("#select-language").on("change", function () {
  let lang = $("#select-language").val();
  language = `language=${lang}&`;
  newsQueryString();
});

$("#select-region").on("change", function () {
  let reg = $("#select-region").val();
  region = `region=${reg}&`;
  newsQueryString();
});

$("#select-categories").on("change", function () {
  let cat = $("#select-categories").val();
  category = `category=${cat}&`;
  newsQueryString();
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

// async function fetchNewsArticles() {
//   const url = `${BASE_URL}/v1/latest-news?${KEY}`;
//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// fetchNewsArticles().then((x) => console.log(x));

function clear() {
  localStorage.clear();
}
