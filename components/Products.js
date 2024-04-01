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
    <a href="product.html?id=${product.id}" data-product-id="${product.id}">
      <div class="card" style="width: 18rem;" >
        <img src="${product.api_featured_image}" class="card-img-top" alt="${
      product.name
    }" style="height: 20rem;">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          
          <p class="card-text">${product.price_sign + product.price}</p>
          <p class="card-text">${product.category}</p>
          
                    <a href="#" class="btn btn-primary addToFavorites" data-product-id="${
                      product.id
                    }">
            <i class="bi bi-heart-fill"></i>
          </a>
          <a href="#" class="btn btn-primary addToBag" data-product-id="${
            product.id
          }" style="float: right;"><i class="bi bi-bag-fill"></i></a>
          
        </div>
      </div></a>
    </div>`;
  }

  html += `</div>`;
  return html;
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("addToFavorites")) {
    event.preventDefault();

    // Retrieve product ID from data attribute
    const productId = event.target.dataset.productId;

    if (productId) {
      // Fetch product data from the API
      fetch(`http://makeup-api.herokuapp.com/api/v1/products/${productId}.json`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch product data");
          }
          return response.json();
        })
        .then((product) => {
          addToFavorites(product);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    } else {
      console.error("Product ID is undefined");
    }
  }
});

function addToFavorites(product) {
  let favorites = localStorage.getItem("favorites");
  favorites = favorites ? JSON.parse(favorites) : [];
  try {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log("Product added to favorites:", product);
    console.log("Updated favorites:", favorites);
  } catch (error) {
    console.error("Error adding product to favorites:", error);
  }
}
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("addToBag")) {
    event.preventDefault();

    // Retrieve product ID from data attribute
    const productId = event.target.dataset.productId;

    if (productId) {
      // Fetch product data from the API
      fetch(`http://makeup-api.herokuapp.com/api/v1/products/${productId}.json`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch product data");
          }
          return response.json();
        })
        .then((product) => {
          addToBag(product);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    } else {
      console.error("Product ID is undefined");
    }
  }
});

function addToBag(product) {
  let bag = localStorage.getItem("bag");
  bag = bag ? JSON.parse(bag) : [];
  try {
    bag.push(product);
    localStorage.setItem("bag", JSON.stringify(bag));
    console.log("Product added to bag:", product);
    console.log("Updated bag:", bag);
  } catch (error) {
    console.error("Error adding product to bag:", error);
  }
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
