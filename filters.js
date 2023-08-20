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