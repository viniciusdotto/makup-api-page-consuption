let items = [];
const types = [];
const brands = [];
const container = document.getElementById('makeup-list');
const brandSelect = document.getElementById('brand');
const typeSelect = document.getElementById('type');
const filter = document.getElementById('filter');
const input = document.querySelector("input");

// Obtenha os elementos necessários
const modal = document.getElementById('myModal');
const modalContent = document.querySelector('.modal-content');
const closeBtn = document.querySelector('.close');

async function init() {
  items = await listProducts();
  getConstants();
  sortByRating(); // Ordenar por rating ao inicializar
  renderData(items);
}
init();

function getConstants() {
  for (const item of items) {
    if (item.name === null) {item.name = ''};
    if (item.rating === null) { item.rating = 0.0 };
    if (item.price === null) {item.price = 0.0};
    item.price = (parseFloat(item.price) * 5.5).toFixed(2);
    if (!brands.find(element => element === item.brand) && item.brand != null) {brands.push(item.brand)};
    if (!types.find(element => element === item.product_type) && item.product_type != null) {types.push(item.product_type)};
  }
  brands.sort();
  types.sort();
}

filter.addEventListener('change', function() {
  const selectedValue = parseInt(this.value); // Converter para número inteiro
  switch (selectedValue) {
    case 0:
      sortByRating();
      break;
    case 1:
      sortByPrice(1);
      break;
    case 2:
      sortByPrice(2);
      break;
    case 3:
      sortByName(1);
      break;
    case 4:
      sortByName(2);
      break;
  }
  renderData(items);
});

brandSelect.addEventListener('change', async function() {
  items = await searchBrandOrType();
  renderData(items);
});

typeSelect.addEventListener('change', async function() {
  items = await searchBrandOrType();
  renderData(items);
});

function sortByRating() {
  items.sort(function(a, b) {
    return parseFloat(b.rating) - parseFloat(a.rating);
  });
}

function sortByPrice(x) {
  items.sort(function(a, b) {
    const priceDiff = (parseFloat(a.price) - parseFloat(b.price));
    return x === 1 ? priceDiff : -priceDiff; // Inverter a ordem se x for 2
  });
}

function sortByName(x) {
  items.sort(function(a, b) {
    const nameComp = a.name.localeCompare(b.name);
    return x === 1 ? nameComp : -nameComp; // Inverter a ordem se x for 2
  });
}

function renderData(selectedItems) {
  container.innerHTML = ''; // Limpar o conteúdo antes de renderizar
  for (const brand of brands) {
    const brandOption = document.createElement("option");
    brandOption.value = brand;
    brandOption.textContent = brand;
    brandSelect.appendChild(brandOption);
  }
  for (const type of types) {
    const typeOption = document.createElement("option");
    typeOption.value = type;
    typeOption.textContent = type;
    typeSelect.appendChild(typeOption);
  }
  for (const item of selectedItems) {
    const li = document.createElement("li");
    li.addEventListener('click', async function() {
      const productId = this.querySelector('.product-id');
      const product = await getProduct(productId.textContent);
      product.price = (parseFloat(product.price) * 5.5).toFixed(2);
      const modaImage = modal.querySelector('#modal-img');
      const modalTitle = modal.querySelector('#modal-product-name');
      const brandSubtitle = modal.querySelector('#brand-subtitle');
      const priceSubtitle = modal.querySelector('#price-subtitle');
      const brandDetails = modal.querySelector('#brand-details');
      const priceDetails = modal.querySelector('#price-details');
      const ratingDetails = modal.querySelector('#rating-details');
      const categoryDetails = modal.querySelector('#category-details');
      const typeDetails = modal.querySelector('#type-details');
      modaImage.src = product.image_link;
      modaImage.addEventListener('error', () => {
        modaImage.src = 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg';
      })
      modalTitle.textContent = product.name;
      brandSubtitle.textContent = product.brand;
      priceSubtitle.textContent = `R$ ${product.price}`;
      brandDetails.textContent = product.brand;
      priceDetails.textContent = product.price;
      ratingDetails.textContent = product.rating;
      categoryDetails.textContent = product.category;
      typeDetails.textContent = product.product_type;
      modal.style.display = 'block';
    });
    const productId = document.createElement('span');
    const img = document.createElement("img");
    const imgContainer = document.createElement("div");
    const name = document.createElement("h2");
    const pContainer = document.createElement("div");
    const brand = document.createElement("p");
    const price = document.createElement("p");

    productId.classList = 'product-id';
    productId.textContent = item.id;
    imgContainer.classList = 'image-container';
    img.src = item.image_link;
    img.addEventListener('error', () => {
      img.src = 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'
    })
    name.textContent = item.name;
    pContainer.classList = 'p-container'
    brand.textContent = item.brand;
    price.classList = 'price'
    price.textContent = `R$ ${item.price}`;

    container.appendChild(li);
    li.appendChild(imgContainer);
    li.appendChild(productId);
    imgContainer.appendChild(img);
    li.appendChild(name);
    li.appendChild(pContainer);
    pContainer.appendChild(brand);
    pContainer.appendChild(price);
  }
}

input.addEventListener("input", withDelay(onQueryChange, 500));

function searchByName() {
  console.log(input.value);
  return items.filter(item => item.name.includes(input.value));
}

function onQueryChange() {
  filtered_items = searchByName();
  renderData(filtered_items);
}

function withDelay(fn, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

// Feche a modal quando o botão '×' for clicado
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Feche a modal quando o usuário clicar fora da modal
window.addEventListener('click', event => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});