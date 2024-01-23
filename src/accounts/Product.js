class Product {
  constructor(
    id,
    name,
    unit,
    price,
    discount,
    tax,
    details,
    batch_no,
    expiry_dat
  ) {
    this.id = id;
    this.name = name;
    this.unit = unit;
    this.price = price;
    this.discount = discount;
    this.tax = tax;
    this.sgst = tax / 2;
    this.cgst = tax / 2;
    this.details = details;
    this.expiry_dat = expiry_dat;
    this.batch_no = batch_no;
    //defaults
    this.quantity = 1;
    this.mass = 0.0;
  }
  setDiscountAmt(value) {
    this.discountAmt = value;
  }
  setName(value) {
    this.name = value;
  }
  setQuantity(value) {
    this.quantity = value;
  }
  setPrice(value) {
    this.price = value;
  }
  setUnit(value) {
    this.unit = value;
  }
  setDiscount(value) {
    this.discount = value;
  }
  setCgst(value) {
    this.cgst = value;
  }
  setSgst(value) {
    this.sgst = value;
  }
  setDetails(value) {
    this.value = value;
  }
  setExpiry(val) {
    this.expiry_dat = val;
  }
  setbatch(val) {
    this.batch_no = val;
  }

  setTax(value) {
    this.tax = value;
  }
  getTax() {
    return this.tax;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getQuantity() {
    return this.quantity;
  }
  getPrice() {
    return this.price;
  }
  getUnit() {
    return this.unit;
  }
  getDiscount() {
    return this.discount;
  }
  getDetails() {
    return this.details;
  }
  getexpiry() {
    return this.expiry_dat;
  }
  getbatch_no() {
    return this.batch_no;
  }
  getCgst() {
    return this.cgst;
  }
  getSgst() {
    return this.sgst;
  }
  getTotalPrice() {
    return this.quantity * this.price;
  }
  getTaxAmount() {
    var tax_per = this.tax / 100;
    var tax_amnt = (this.getTotalPrice() - this.getDiscountamount()) * tax_per;
    return Math.round(tax_amnt * 1e2) / 1e2;
  }
  getCgstAmount() {
    var tax_amt = this.cgst / 100;
    return this.getTotalPrice() * tax_amt;
  }
  getSgstAmount() {
    var tax_amt = this.sgst / 100;
    return this.getTotalPrice() * tax_amt;
  }
  getDiscountamount() {
    var discount_amt = (this.discount / 100) * this.getTotalPrice();
    return Math.round(discount_amt * 1e2) / 1e2;
  }
  getTotal() {
    console.log("this.discount....", typeof this.discount);
    //TODO include tax and any discount
    return (
      Math.round(
        (this.getTotalPrice() +
          this.getTaxAmount() -
          this.getDiscountamount()) *
          1e2
      ) / 1e2
    );
  }
}
