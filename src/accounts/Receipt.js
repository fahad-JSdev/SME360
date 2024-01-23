class Receipt {
  constructor(receiptNo, date) {
    this.receiptno = receiptNo;
    this.date = date;
    this.products = [];
    this.discount = 0;
    this.packagecost = 0;
  }
  setReceipt(value) {
    this.receiptno = value;
  }
  setDate(value) {
    this.date = value;
  }
  addproduct(product) {
    this.products[this.products.length] = product;
  }
  getProducts() {
    return this.products;
  }
  deleteProduct(index) {
    this.products.splice(index, 1);
  }
  setDiscount(value) {
    this.discount = value;
  }
  setPackageCost(value) {
    this.packagecost = value;
  }
  getReceipt() {
    return this.receiptno;
  }
  getTotal() {
    var total = 0;
    for (var i = 0; i < this.products.length; i++) {
      total += this.products[i].getTotal();
    }
    return total;
  }
  getGrandTotal() {
    return (
      Math.round((this.getTotal() - this.discount + this.packagecost) * 1e2) /
      1e2
    );
  }
}
