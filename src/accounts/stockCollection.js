class stockCollection {
  constructor(product_name, product_group, product_tax, product_type) {
    this.product_name = product_name;
    this.product_group = product_group;
    this.product_tax = product_tax;
    this.product_type = product_type;
    this.stockarr = [];
  }
  getProductName() {
    return this.product_name;
  }
  getProductGropu() {
    return this.product_group;
  }
  getProductTax() {
    return this.product_tax;
  }
  setProductName(value) {
    this.product_name = value;
  }
  setProductGroup(value) {
    this.product_group = value;
  }
  setProductTax(value) {
    this.product_tax = value;
  }
  setProductType(value) {
    this.product_group = value;
  }
  returnStockArray() {
    return this.stockarr;
  }
  setStockArray(value) {
    this.stockarr.push(value);
  }
}
