class stock {
  constructor(
    brand,
    batch_no,
    expiry_date,
    HSN_code,
    manufacture,
    // barcode,
    as_of_date,
    discount,
    unit,
    prchase_price,
    sales_price,
    quantity,
    low_stock,
    high_stock,
    opening_stock,
    item_code,
    current_stock,
    description
    // stock_keeping_unit
  ) {
    this.brand = brand;
    this.batch_no = batch_no;
    this.expiry_date = expiry_date;
    this.HSN_code = HSN_code;
    this.manufacture = manufacture;
    // this.barcode = barcode;
    this.as_of_date = as_of_date;
    this.discount = discount;
    this.unit = unit;
    this.prchase_price = prchase_price;
    this.sales_price = sales_price;
    this.quantity = quantity;
    this.low_stock = low_stock;
    this.high_stock = high_stock;
    this.opening_stock = opening_stock;
    this.item_code = item_code;
    this.current_stock = current_stock;
    this.description = description;
    // this.stock_keeping_unit = stock_keeping_unit;
  }

  getBrand() {
    return this.brand;
  }
  getBatchNo() {
    return this.batch_no;
  }
  getExpiryDate() {
    return this.expiry_date;
  }
  getHSNCode() {
    return this.HSN_code;
  }
  getManufacture() {
    return this.manufacture;
  }
  // getBarCode() {
  //   return this.barcode;
  // }
  getAsOFDate() {
    return this.as_of_date;
  }
  getDiscount() {
    return this.discount;
  }
  getUnit() {
    return this.unit;
  }
  getPurchasePrice() {
    return this.prchase_price;
  }
  getSalesPrice() {
    return this.sales_price;
  }
  getQuantity() {
    return this.quantity;
  }
  getLowStock() {
    return this.low_stock;
  }
  getOpeningStock() {
    return this.opening_stock;
  }
  getItemCode() {
    return this.item_code;
  }
  getCurrentStock() {
    return this.current_stock;
  }
  getDescription() {
    return this.description;
  }
  getHighStock() {
    return this.high_stock;
  }
  // getStockKeepingUnit() {
  //   return this.stock_keeping_unit;
  // }
  //
  setBrand(value) {
    this.brand;
  }
  setBatchNo(value) {
    this.batch_no;
  }
  setExpiryDate(value) {
    this.expiry_date;
  }
  setHSNCode(value) {
    this.HSN_code;
  }
  setManufacture(value) {
    this.manufacture;
  }
  // setBarCode(value) {
  //   this.barcode;
  // }
  setProductType(value) {
    this.product_type;
  }
  setAsOFDate(value) {
    this.as_of_date;
  }
  setDiscount(value) {
    this.discount;
  }
  setUnit(value) {
    this.unit;
  }
  setPurchasePrice(value) {
    this.prchase_price;
  }
  setSalesPrice(value) {
    this.sales_price;
  }
  setQuantity(value) {
    this.quantity;
  }
  setLowStock(value) {
    this.low_stock;
  }
  setOpeningStock(value) {
    this.opening_stock;
  }
  setItemCode(value) {
    this.item_code;
  }
  setCurrentStock(value) {
    this.current_stock;
  }
  setDescription(value) {
    this.description;
  }
  setHighStock(value) {
    this.high_stock;
  }
}
