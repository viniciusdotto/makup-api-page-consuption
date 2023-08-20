function fetchJson(url, options) {
    return fetch(url, options)
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error(r.statusText);
        }
      })
      .catch((error) => {
        showError("Error loading data", error);
        throw error;
      });
  }
  
  const baseUrl = "http://makeup-api.herokuapp.com/api/v1/products.json";
  
  function listProducts() {
    return fetchJson(baseUrl);
  }

  function getProduct(id) {
    return fetchJson(`http://makeup-api.herokuapp.com/api/v1/products/${id}.json`);
  }
  
  function searchBrandOrType() {
    const selectedType = typeSelect.selectedOptions[0].value;
    const selectedBrand = brandSelect.selectedOptions[0].value;
    if (selectedType === '' && selectedBrand === '') {
      return fetchJson(baseUrl);
    } else {
      console.log("entrou");
      console.log(selectedType);
      console.log(selectedBrand);

      if (selectedType !== '' && selectedBrand === '') {
        console.log("1")
        return fetchJson(`${baseUrl}?product_type=${selectedType}`);
      } else if (selectedBrand !== '' && selectedType === '') {
        console.log("2")
        return fetchJson(`${baseUrl}?brand=${selectedBrand}`);
      } else {
        console.log("3")
        return fetchJson(`${baseUrl}?brand=${selectedBrand}&product_type=${selectedType}`);
      }
    }
  }