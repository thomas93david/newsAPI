const BASE_URL = "https://api.currentsapi.services/v1/";
const KEY = "apiKey=7JTqW9vfS6zyFzGR2zZosTWgtlsblwzFHMT6HP8DB5OeL5AN";

//fetches all categories
async function fetchAllCategories() {
  const url = `${BASE_URL}available/categories?${KEY}`;

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

//fetches all languages
async function fetchAllLanguages() {
  const url = `${BASE_URL}available/languages?${KEY}`;
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

//fetches all regions
async function fetchAllRegions() {
  const url = `${BASE_URL}available/regions?${KEY}`;
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
//populates the category, language, & region dropdowns
async function preFetchRestrictions() {
  try {
    const [categories, languages, regions] = await Promise.all([
      fetchAllCategories(),
      fetchAllLanguages(),
      fetchAllRegions(),
    ]);

    categories.forEach((categories) => {
      $("#select-categories").append(
        $(`<option value="${categories[1]}">${categories}</option>`)
      );
    });

    const dialect = Object.entries(languages);

    dialect.forEach((language) => {
      $("#select-language").append(
        `<option value="${language[1]}">${language[0]}</option>`
      );
    });

    const territory = Object.entries(regions);

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

// builds the new query string
function newsSearchString() {
  let cat = $("#select-categories").val();
  let reg = $("#select-region").val();
  let lang = $("#select-langauge").val();
  let keyword = $("#keywords").val();

  const enURL = encodeURI(
    `${BASE_URL}search?&categories=${cat}&languages=${lang}&regions=${reg}&keywords=${keyword}&${KEY}`
  );
  if (keywords === "") {
    return encodeURI(`${BASE_URL}latest-news`);
  } else {
    return enURL;
  }
}
newsSearchString();

$("#search").on("submit", async function (event) {
  event.preventDefault();
  try {
    const result = await fetch(newsSearchString());
    const { news } = await result.json();
  } catch (error) {
    console.error(error);
  }
});

function renderStories(news) {
  const { title, description, author, category, url, image } = news;

  const newsCard = $(`<div class ="stories">
  <header>
  <h2> ${title} </h2>
  <h4> ${author}</h3>
  </header>

  <p>${description}</p>
  <p>${category}</p>
  <a href="${url}"> See full article here</a>
  <img src="${image}></img>
  </div>`).data("news", news);
  return newsCard;
}

function renderArticlesList(articleList) {
  $(".results").empty();
  articleList.forEach(function (article) {
    $(".articles").append(renderStories(article));
  });
}

function updateStories(news, page) {
  const root = $("#results");
  const rootSearch = root.find("#articles");
  const selectNext = root.find(".next");
  const selectPrevious = root.find(".previous");
  rootSearch.empty();

  if (page >= 1) {
    selectNext.data("url", page).attr("disabled", false);
  } else {
    selectNext.data("url", null).attr("disabled", true);
  }

  if (page >= 2) {
    selectPrevious.data("url", sheet).attr("disabled", false);
  } else {
    selectPrevious.data("url", null).attr("disabled", true);
  }

  news.forEach(function (news) {
    rootSearch.append(renderArticles(news));
  });
}

//template
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
