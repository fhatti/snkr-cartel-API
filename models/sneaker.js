class Sneaker {
  constructor(name, price, rating, reviewsNr, imgUrl, stock, brand, userId, email, image) {
    this.name = name;
    this.price = price;
    this.rating = rating;
    this.reviewsNr = reviewsNr;
    this.imgUrl = imgUrl;
    this.stock = stock;
    this.brand = brand;
    this.userId = userId;
    this.email = email;
    this.image = image;

  }

  toPlainObject() {
    const plainObject = {
      name: this.name,
      price: this.price,
      rating: this.rating,
      reviewsNr: this.reviewsNr,
      imgUrl: this.imgUrl,
      stock: this.stock,
      brand: this.brand,
      userId : this.userId,
      email : this.email,
      image: this.image,
    };
    return Object.fromEntries(Object.entries(plainObject).filter(([_, v]) => v !== undefined));
  }
}

module.exports = Sneaker;
