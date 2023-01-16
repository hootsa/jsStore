async function fetchFromServer() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  //   console.log(data.products);
  printData(data.products);
}

fetchFromServer();

function printData(products) {
  for (let i = 0; i < products.length; i++) {
    const eachProductContainerNode = tagClassMaker(
      "div",
      "each-product-container",
      ""
    );
    const productObj = products[i];
    const description = productObj.description.slice(0, 50) + "...";
    const discountPercentage = productObj.discountPercentage;
    const image = productObj.images[0];
    const price = productObj.price;
    const rate = productObj.rating;
    const title = productObj.title;

    const spanSale = tagClassMaker("span", "", "");

    if (discountPercentage > 0) {
      spanSale.classList.add("sale");
      spanSale.innerHTML = "sale";
    }

    const img = tagClassMaker("img", "", "");
    img.src = image;

    const h5 = tagClassMaker("h5", "product-name", title);

    const paragraph = tagClassMaker("p", "product-discription", description);

    const divBottom = tagClassMaker("div", "bottom");

    const spanStar = tagClassMaker(
      "span",
      "star",
      "&starf; &bigstar; &bigstar; &bigstar; &star;"
    );

    const spanRate = tagClassMaker("span", "rate", " " + rate);

    const divFooter = tagClassMaker("div", "footer");
    console.log(divBottom);

    const divPrices = tagClassMaker("div", "prices");

    const spanDiscount = tagClassMaker("span", "discount-price");

    const calDiscountWithTwoDecimal = calDiscount(price, discountPercentage);

    if (discountPercentage !== 0) {
      spanDiscount.innerHTML = " $" + calDiscountWithTwoDecimal;
    }

    const spanPrimaryPrice = tagClassMaker("span", "primary-price");

    if (discountPercentage !== 0) {
      spanPrimaryPrice.innerHTML = "$" + price;
    } else {
      spanPrimaryPrice.innerHTML = "";
    }

    const addBtn = tagClassMaker("button", "add", " + Add ");

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

// Boolean('')
// 0
// false
// undefined
// null

function tagClassMaker(tagName, className, contentName) {
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
