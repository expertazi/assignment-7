const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      
      <div class="card h-100">
                          <div class="card-head">
                            <img class="product-image img-fluid" src=${image}></img>
                          </div>
                            <div class="card-body">
                                <h3 class="card-title">${product.title}</h3>
                                <p class="card-text">
                                  <p>Category: ${product.category}</p>
                                </p>
                            </div>
                            <div class="card-footer">
                              <h3>Price: $ ${product.price}</h3>
                              <p><i class="fas fa-star"></i>Avarage Rating: ${product.rating.rate} rated by ${product.rating.count} People</p>
                              <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-outline-dark">add to cart</button>
                              <button onclick="detailsBtn()" data-bs-toggle="modal" data-bs-target="#exampleModal" id="details-btn" class="btn btn-color btn-success">See Full Details</button>
                            </div>
                        </div>
      
        `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const subTotal = convertedOldPrice + convertPrice;
  const total = subTotal.toFixed(2);
  document.getElementById(id).innerText = total;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value.toFixed(2));
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const productPriceText = document.getElementById("price").innerText;
  const productPrice = parseFloat(productPriceText);

  const dileveryChargeText =
    document.getElementById("delivery-charge").innerText;
  const dileveryCharge = parseFloat(dileveryChargeText);

  const totalTaxText = document.getElementById("total-tax").innerText;
  const totaltax = parseFloat(totalTaxText);

  const grandTotal = productPrice + dileveryCharge + totaltax;

  console.log(grandTotal);
  const finalGrandTotal = grandTotal.toFixed(2);
  document.getElementById("total").innerText = finalGrandTotal;
};

// Details Button Here

let detailsBtn = (products) => {
  const takeModal = document.querySelector(".modal-content");
  const div = document.createElement("div");

  div.innerHTML = `

    <div class="modal-header">
    <h2>Products Details</h2>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <h3>Please Check Again Later.We will Update it soon </h3>
    <h5> Thank You</h5>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>

    `;
  takeModal.appendChild(div);
};

// const allProducts = products.map((pd) => pd);
// console.log(allProducts);
// console.log(loadProducts);

//   const detailsBtn = (product) => {
//     const takeModal = document.querySelector(".modal-content");

//     takeModal.innerHTML = `
// <div class="modal-content">
// <div class="modal-header">
// <img class="product-image img-fluid" src=${image}></img>
// <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
// </div>
// <div class="modal-body">
// <h3 class="card-title">${product.title}</h3>
// <p>Category: ${product.category}</p>
// <h3>Price: $ ${product.price}</h3>
// <p><i class="fas fa-star"></i>Avarage Rating: ${product.rating.rate} rated by ${product.rating.count} People</p>
// </div>
// <div class="modal-footer">
// <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
// </div>
// </div>
// `;
//     document.querySelector(".modal-content").appendChild(takeModal);
//   };
