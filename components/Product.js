export function getProduct(id) {
  let api = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;

  return fetch(api)
    .then((response) => response.json())
    .then((data) => data);
}

export function composeProduct(product) {
  return `
    <div class="col-3">
      <div class="card" style="width: 18rem;">
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
          <a href="#" class="btn btn-primary addToBag " style="float: right;" data-product-id="${
            product.id
          }" >
            <i class="bi bi-bag-fill"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}
