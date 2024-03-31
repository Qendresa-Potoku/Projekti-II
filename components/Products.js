export function getProducts({ page, search }) {
  let api = `http://makeup-api.herokuapp.com/api/v1/products.json?${
    page == undefined ? "" : `&page=${page}`
  }`;

  if (search != undefined && search.length > 0) {
    api = `http://makeup-api.herokuapp.com/api/v1/products.json?product_category=${search}`;
  }

  return fetch(api)
    .then((response) => response.json())
    .then((data) => data);
}

export function composeProducts(products, limit = null) {
  const products_categ = limit == null ? products : products.slice(0, limit);
  console.log("Products:", products);
  let html = `<div class="row">`;
  for (let product of products_categ) {
    html += `
    <div class="col-3">
    <a href="product.html?id=${product.id}">
      <div class="card" style="width: 18rem;" >
        <img src="${product.api_featured_image}" class="card-img-top" alt="${
      product.name
    }" style="height: 20rem;">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          
          <p class="card-text">${product.price_sign + product.price}</p>
          <p class="card-text">${product.category}</p>
          
          <a href="product.html?id=${
            product.id
          }" class="btn btn-primary"><i class="bi bi-heart-fill"></i></a>
          <a href="product.html?id=${
            product.id
          }" class="btn btn-primary" style="float: right;"><i class="bi bi-bag-fill"></i></a>
          
        </div>
      </div></a>
    </div>`;
  }

  html += `</div>`;
  return html;
}

export function getUniqueCategories(products) {
  const categories = new Set();
  products.forEach((product) => {
    categories.add(product.category);
  });
  return Array.from(categories);
}

export function composeCategoryList(categories, products) {
  let html = '<div class="category-list">';
  categories.forEach((category) => {
    html += `<div class="category-style" data-category="${category}" >${category}</div>`;
  });
  html += "</div>";

  const container = document.createElement("div");
  container.innerHTML = html;

  container.querySelectorAll(".category-style").forEach((categoryElement) => {
    categoryElement.addEventListener("click", () => {
      const category = categoryElement.getAttribute("data-category");
      const filteredProducts = products.filter(
        (product) => product.category === category
      );
      document.querySelector("#products").innerHTML = composeProducts(
        filteredProducts,
        20
      );
    });
  });

  return container;
}
