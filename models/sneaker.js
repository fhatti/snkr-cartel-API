class Sneaker {
    constructor(name, price, rating, reviewsNr, imgUrl, stock , brand)
    {
        this.name = name;
        this.price = price;
        this.rating= rating;
        this.reviewsNr = reviewsNr;
        this.imgUrl = imgUrl;
        this.stock =  stock;
        this.brand= brand;
    }

    toPlainObject()
    {
        return {
            name:this.name,
            price:this.price,
            rating:this.rating,
            reviewsNr: this.reviewsNr,
            imgUrl : this.imgUrl,
            stock :this.stock,
            brand : this.brand,
        }
    }
}

module.exports = Sneaker