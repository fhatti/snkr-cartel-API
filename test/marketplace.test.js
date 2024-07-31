describe("basicMa", () => {
  test("1 + 1 should equal 2", () => {
    expect(1 + 1).toBe(2);
  });
});

describe("shop", () => {
  test("/shop-items/create should post in the shop db", () => {
    //Arrange
    const urlPost = "http://localhost:3001/shop-items/create  ";
    const newItem = {
      name: "Adidas Campus 00s Sneaker",
      price: "119,99 €",
      rating: 4.9,
      reviewsNr: 213,
      imgUrl:
        "https://hypeone.de/cdn/shop/files/31aaa635-b97a-471a-9637-81f188846627.png?v=1706127568",
      stock: 8,
      brand:
        "https://i.pinimg.com/736x/25/4c/af/254caf5489701f4dfe4bdb1455a83e2f.jpg",
    };

    const customHeaders = {
      "Content-Type": "application/json",
    };

    //Act
    fetch(urlPost, {
      method: "POST",
      headers: customHeaders,
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((data) => {
        const urlRead = `http://localhost:3001/read/shop-items/${data._path.segments[1]}`;
        fetch(urlRead)
          .then((res) => res.json())
          .then((data) => {
            let actualName = data.name;
            let expectedName = newItem.name;
            //Assert
            expect(actualName).toBe(expectedName);
          });
      });
  });
});
