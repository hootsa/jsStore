let productData = [];

async function fetchFromServer() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  productData = data.products;

  // const newFilteredArray = filterProducts("Iphone");
  // console.log(newFilteredArray);

  printData(data.products);
}

fetchFromServer();

function printData(products) {
  for (let i = 0; i < products.length; i++) {
    // gather all data needed
    const productObj = products[i];
    const description = productObj.description.slice(0, 50) + "...";
    const discountPercentage = productObj.discountPercentage;
    const image = productObj.images[0];
    const price = productObj.price;
    const rate = productObj.rating;
    const title = productObj.title;

    const spanSale = mkElement("span");
    spanSale.classList.add("sale");
    spanSale.innerHTML = "sale";

    const divImgWrapper = mkElement("div", "img-wrapper");
    const img = mkElement("img");
    img.src = image;
    divImgWrapper.appendChild(img);

    const h5 = mkElement("h5", "product-name", title);

    const paragraph = mkElement("p", "product-discription", description);

    const spanStar = mkElement(
      "span",
      "star",
      "&starf; &bigstar; &bigstar; &bigstar; &star;"
    );

    const spanRate = mkElement("span", "rate", ` ${rate}`);

    // Footer
    const divFooter = mkElement("div", "footer");

    // Prices
    const divPrices = mkElement("div", "prices");

    const spanDiscount = mkElement("span", "discount-price");

    const calDiscountWithTwoDecimal = calDiscount(price, discountPercentage);

    if (discountPercentage !== 0) {
      spanDiscount.innerHTML = " $" + calDiscountWithTwoDecimal;
    }

    const spanPrimaryPrice = mkElement("span", "primary-price");

    if (discountPercentage !== 0) {
      spanPrimaryPrice.innerHTML = "$" + price;
    } else {
      spanPrimaryPrice.innerHTML = "";
    }
    divPrices.appendChild(spanDiscount);
    divPrices.appendChild(spanPrimaryPrice);

    const addBtn = mkElement("button", "add", " + Add ");
    divFooter.appendChild(divPrices);
    divFooter.appendChild(addBtn);

    const divBottom = mkElement("div", "bottom");
    divBottom.appendChild(spanStar);
    divBottom.appendChild(spanRate);
    divBottom.appendChild(divFooter);

    // each product container
    const eachProductContainerNode = mkElement("div", "each-product-container");
    if (discountPercentage > 0) {
      eachProductContainerNode.appendChild(spanSale);
    }

    eachProductContainerNode.appendChild(divImgWrapper);
    eachProductContainerNode.appendChild(h5);
    eachProductContainerNode.appendChild(paragraph);
    eachProductContainerNode.appendChild(divBottom);

    // add each product into html container
    const productContainerNode = document.getElementById("p-container");
    productContainerNode.appendChild(eachProductContainerNode);
  }
}

function mkElement(tagName, className, contentName) {
  const tag = document.createElement(tagName);
  if (Boolean(className)) {
    tag.classList.add(className);
  }
  if (!!contentName) {
    tag.innerHTML = contentName;
  }
  return tag;
}

function calDiscount(price, discountPercentage) {
  const cal = price - (price * discountPercentage) / 100;
  const calDiscountWithTwoDecimal = cal.toFixed(2);
  return calDiscountWithTwoDecimal;
}

const searchBtnElement = document.getElementById("productsSearch");
searchBtnElement.addEventListener("input", search);

function search() {
  // 1. get input value
  const searchValue = searchBtnElement.value;
  const newDataProduct = filterProducts(searchValue);
  console.log(newDataProduct);
  const productContainerNode = document.getElementById("p-container");
  productContainerNode.innerHTML = "";
  printData(newDataProduct);
  // 2. call filterProducts
}

// get: searchInput
// retusn: array of products ( productData) which includes that searchInput in their title
function filterProducts(searchInput) {
  let result = [];
  for (let i = 0; i < productData.length; i++) {
    const productObj = productData[i];
    const title = productObj.title;
    const lowCaseTitle = title.toLowerCase();
    const lowCaseSearchInput = searchInput.toLowerCase();
    const isContain = lowCaseTitle.includes(lowCaseSearchInput);

    if (isContain) {
      result.push(productObj);
    }
  }
  return result;
}
