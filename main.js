async function fetchFromServer() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  //   console.log(data.products);
  printData(data.products);
}

fetchFromServer();

function printData(products) {
  for (let i = 0; i < products.length; i++) {
    const eachProductContainerNode = document.createElement("div");
    eachProductContainerNode.classList.add("each-product-container");

    const productObj = products[i];
    const description = productObj.description.slice(0, 50) + "...";
    const discountPercentage = productObj.discountPercentage;
    const image = productObj.images[0];
    const price = productObj.price;
    const rate = productObj.rating;
    const title = productObj.title;

    const spanSale = document.createElement("span");

    if (discountPercentage > 0) {
      spanSale.classList.add("sale");
      spanSale.innerHTML = "sale";
    }

    const img = document.createElement("img");
    img.src = image;

    const h5 = document.createElement("h5");
    h5.classList.add("product-name");
    h5.innerHTML = title;

    const paragraph = document.createElement("p");
    paragraph.classList.add("product-discription");
    paragraph.innerHTML = description;

    const divBottom = document.createElement("div");
    divBottom.classList.add("bottom");

    const spanStar = document.createElement("span");
    spanStar.classList.add("star");
    spanStar.innerHTML = " &starf; &bigstar; &bigstar; &bigstar; &star;";

    const spanRate = document.createElement("span");
    spanRate.classList.add("rate");
    spanRate.innerHTML = " " + rate;

    // <div class="footer"></div>
    const divFooter = document.createElement("div");
    divFooter.classList.add("footer");

    // <div class="prices"></div<>
    const divPrices = document.createElement("div");
    divPrices.classList.add("prices");

    // <span class="discount-price">$18</span>
    const spanDiscount = document.createElement("span");
    spanDiscount.classList.add("discount-price");
    const calDiscount = price - (price * discountPercentage) / 100;
    const calDiscountWithTwoDecimal = calDiscount.toFixed(2);
    console.log("xxxx", {
      title: title,
      discountPercentage: discountPercentage,
      calDiscount: calDiscount,
      price: price,
    });
    console.log(typeof discountPercentage);
    console.log(discountPercentage !== 0);
    if (discountPercentage !== 0) {
      spanDiscount.innerHTML = " $" + calDiscountWithTwoDecimal;
    }
    // <span class="primary-price"> $24</span>
    const spanPrimaryPrice = document.createElement("span");
    spanPrimaryPrice.classList.add("primary-price");
    if (discountPercentage !== 0) {
      spanPrimaryPrice.innerHTML = "$" + price;
    } else {
      spanPrimaryPrice.innerHTML = "";
    }

    const addBtn = document.createElement("button");
    addBtn.classList.add("add");
    addBtn.innerHTML = " + Add ";

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
    // console.log(eachProductContainerNode);
    // productContainerNOde.appendChild("p-container");
  }
}
// function saleTage(products) {
//   for (let i = 0; i < products.length; i++) {
//     const productObj = products[i];
//     const discountRate = productObj.discountPercentage;

//     if(discountRate >0){

//     }
//   }
// }
