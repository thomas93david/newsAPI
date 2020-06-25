const BASE_URL = "https://api.currentsapi.services";
const KEY = "apiKey=7JTqW9vfS6zyFzGR2zZosTWgtlsblwzFHMT6HP8DB5OeL5AN";

async function fetchNewsArticles() {
  const url = `${BASE_URL}/v1/latest-news?${KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
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
    const { categories } = await response.json();
    localStorage.setItem("categories", JSON.stringify(categories));
    return categories;
  } catch (error) {
    console.error(error);
  }
}
// fetchAllCategories();
// fetchAllCategories();

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

    categories.forEach((categories) => {
      $("#select-categories").append(
        $(`<option value="${categories.name}">${categories.name}</option>`)
      );
    });
    console.log(categories);
    console.log(languages);
    console.log(regions);

    languages.forEach((language) => {
      $("#select-language").append(
        $(`<option value="${language.name}">${language.name}</option>`)
      );
    });

    regions.forEach((region) => {
      $("#select-region").append(
        $(`<option value="${region.name}">${region.name}</option>`)
      );
    });
  } catch (error) {
    console.error(error);
  }
}

preFetchRestrictions();

function renderArticles(news) {
  return $(".results").append(
    $(` <div class="result-card">
        <header>
            <h2>${news.title}</h2>
            <h3>${news.author}</h3>
            <p> ${news.published}</p>
        </header>
        <p> ${news.description} </p>
        <p> ${news.url} </p>       
   </div> `)
  );
}
function renderArticlesList(articleList) {
  $(".results").empty();
  articleList.forEach(function (article) {
    $(".results").append(renderArticles(article));
  });
}

function clear() {
  localStorage.clear();
}
