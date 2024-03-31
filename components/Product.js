export function getProduct(id) {
  let api = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;

  return fetch(api)
    .then((response) => response.json())
    .then((data) => data);
}
export function composeProduct(product) {
  return `
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
    </div>
  `;
}
