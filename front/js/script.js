fetch ("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (kanaps) {
    console.log(kanaps);
    let eltItems = document.getElementById("items");
    for (let kanap of kanaps) {
      let eltA = document.createElement("a");
      let eltArticle = document.createElement("article");
      let eltImg = document.createElement("img");
      let eltTitle = document.createElement("h3");
      let eltDescription = document.createElement("p");

      eltItems.appendChild(eltA);
      eltA.appendChild(eltArticle);
      eltArticle.appendChild(eltImg);
      eltArticle.appendChild(eltTitle);
      eltArticle.appendChild(eltDescription);

      eltA.href += "product.html?id=" + kanap._id;
      eltImg.src = kanap.imageUrl;
      eltTitle.innerHTML = kanap.name;
      eltDescription.innerHTML = kanap.description;
    }
  })
  .catch(function(err) {
    console.error(err)
  });





