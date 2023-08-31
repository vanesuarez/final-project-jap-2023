document.addEventListener("DOMContentLoaded", function () {

  const productList = document.getElementById("product-list");
  const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"; // URL del JSON de productos

  // Función inicial para mostrar los productos en la página
  function displayProducts(products) {
    productList.innerHTML = ""; // limpia la lista de productos existente

    // Iterar a través de los productos y crear elementos HTML para cada uno
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const divText = document.createElement("div");
      divText.classList.add("divForText");

      const divImg = document.createElement("div");
      divImg.classList.add("divForImg");

      // Crear elementos para cada propiedad del producto
      const productName = document.createElement("h4");
      productName.textContent = product.name;

      const productDescription = document.createElement("p");
      productDescription.textContent = product.description;

      const productPrice = document.createElement("h5");
      productPrice.textContent = `Precio: USD ${product.cost}`;

      const productSold = document.createElement("p");
      productSold.textContent = ` ${product.soldCount} vendidos`;

      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = product.name;

      productDiv.appendChild(divText);
      productDiv.appendChild(divImg);

      // Agregar elementos al contenedor del producto
      divText.appendChild(productName);
      divText.appendChild(productDescription);
      divText.appendChild(productPrice);
      divText.appendChild(productSold);
      divImg.appendChild(productImage);

      // Agregar el contenedor del producto a la lista de productos
      productList.appendChild(productDiv);
    });
  }

  // Realizar la petición GET usando Fetch API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayProducts(data.products);

      // ENTREGA 2 - ORDENAR ALFABÉTICAMENTE ASCENDENTE
      document.getElementById("sortAsc").addEventListener("click", function () {
        let asc = data.products.sort((x, y) => x.name.localeCompare(y.name));
        displayProducts(asc);
      });

      // ENTREGA 2 - ORDENAR ALFABÉTICAMENTE DESCENDENTE
      document
        .getElementById("sortDesc")
        .addEventListener("click", function () {
          let desc = data.products.sort((x, y) => y.name.localeCompare(x.name));
          displayProducts(desc);
        });

      // ENTREGA 2 - ORDENAR POR PRECIO
      document
        .getElementById("sortByCount")
        .addEventListener("click", function () {
          let sortCount = data.products.sort(
            (x, y) => parseInt(y.soldCount) - parseInt(x.soldCount)
          );
          displayProducts(sortCount);
        });

      // ENTREGA 2 - FILTRAR POR PRECIO

      const filterButton = document.getElementById("rangeFilterCount");
      filterButton.addEventListener("click", filterProducts);

      function filterProducts() {
        const minPriceInput = document.getElementById("rangeFilterCountMin");
        const maxPriceInput = document.getElementById("rangeFilterCountMax");

        const minPrice = parseFloat(minPriceInput.value);
        const maxPrice = parseFloat(maxPriceInput.value);

        // Obtén todos los productos
        const products = document.querySelectorAll(".product");

        // Itera sobre los productos y muestra solo los que están en el rango de precio
        products.forEach((product) => {
          const productPrice = product.querySelector("h5");
          const productPriceValue = parseFloat(
            productPrice.textContent.replace("Precio: USD ", "")
          );

          if (
            (isNaN(minPrice) || productPriceValue >= minPrice) &&
            (isNaN(maxPrice) || productPriceValue <= maxPrice)
          ) {
            product.style.display = "block"; // Muestra el producto
          } else {
            product.style.display = "none"; // Oculta el producto
          }
        });
      }

      // LIMPIAR
      document
        .getElementById("clearRangeFilter")
        .addEventListener("click", function () {
          document.getElementById("rangeFilterCountMin").value = "";
          document.getElementById("rangeFilterCountMax").value = "";
          displayProducts(data.products);
        });
      // ENTREGA 2 - DESAFIATE

      // Almacenamos todos los elementos de producto en un array
      const products = Array.from(document.querySelectorAll(".product")); // se seleccionan todos los elementos con la clase products y lo convertimos en un array utilizando array.from()

      // Manejamos el evento de filtro en tiempo real
      const inputFilter = document.getElementById("inputFilter");
      inputFilter.addEventListener("input", function () {
        // agregamos evento de escucha , cuando el usuario escribe en el tecelado el codigo se ejecutara
        const filterText = inputFilter.value.toLowerCase().trim(); // accedemos al texto que escribio el usuario y le hacemos validaciones
        products.forEach((product) => {
          // recorremos el array que creamos en la linea 54
          const productName = product
            .querySelector("h4")
            .textContent.toLowerCase()
            .trim(); // obtenemos el nombre del producto y le hacemos sus validaciones (convertir texto en minuscula y eliminar espacios)
          const productDescription = product
            .querySelector("p")
            .textContent.toLowerCase()
            .trim(); // obtenemos la descripcion del producto y le hacemos sus validaciones (convertir texto en minuscula y eliminar espacios)

          if (
            productName.includes(filterText) ||
            productDescription.includes(filterText)
          ) {
            // utilizamos includes y verificamos si hay texto ingresado relacionado con el titulo o || la descripcion del producto
            product.style.display = "block"; // si se cumple va a mostrar los productos
          } else {
            product.style.display = "none"; // va a ocultar los productos que no cumplan
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error al cargar los productos:", error);
    });
});
