async function fetchFromServer() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  //   console.log(data.products);
  printData(data.products);
}

fetchFromServer();

function printData(products) {
  for (let i = 0; i < products.length; i++) {
    const eachProductContainerNode = mkElement("div", "each-product-container");
    const productObj = products[i];
    const description = productObj.description.slice(0, 50) + "...";
    const discountPercentage = productObj.discountPercentage;
    const image = productObj.images[0];
    const price = productObj.price;
    const rate = productObj.rating;
    const title = productObj.title;

    const spanSale = mkElement("span");

    if (discountPercentage > 0) {
      spanSale.classList.add("sale");
      spanSale.innerHTML = "sale";
    }

    const img = mkElement("img");
    img.src = image;

    const h5 = mkElement("h5", "product-name", title);

    const paragraph = mkElement("p", "product-discription", description);

    const divBottom = mkElement("div", "bottom");

    const spanStar = mkElement(
      "span",
      "star",
      "&starf; &bigstar; &bigstar; &bigstar; &star;"
    );

    const spanRate = mkElement("span", "rate", ` ${rate}`);

    const divFooter = mkElement("div", "footer");

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

    const addBtn = mkElement("button", "add", " + Add ");

    const productContainerNOde = document.getElementById("p-container");
    divFooter.appendChild(divPrices);
    divFooter.appendChild(spanDiscount);
    divFooter.appendChild(spanPrimaryPrice);
    divFooter.appendChild(addBtn);
    divBottom.appendChild(spanStar);
    divBottom.appendChild(spanRate);
    divBottom.appendChild(divFooter);
    eachProductContainerNode.appendChild(spanSale);
    eachProductContainerNode.appendChild(img);
    eachProductContainerNode.appendChild(h5);
    eachProductContainerNode.appendChild(paragraph);
    eachProductContainerNode.appendChild(divBottom);
    productContainerNOde.appendChild(eachProductContainerNode);
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
