const LABOUR_EXPENSE =
  "SELECT site.site_name,site.site_id,labour.labour_name,labour.designation,labour_account.wage,labour_account.ot_wage,labour_account.no_of_days,labour_account.ot_hour,labour_account.ta_da,labour_account.advance,to_char(labour_account.lab_dat,'DD-MM-YYYY') as lab_dat,labour_account.labour_account_id  FROM labour_account LEFT JOIN labour ON labour.labour_id = labour_account.labour_f_key LEFT JOIN site ON site.site_id = labour_account.site_f_key WHERE labour_account.user_perm = '1' AND labour_account.is_deleted= '0'ORDER BY labour_account.labour_account_id ;";
const LABOUR_PENDING =
  "SELECT site.site_name,site.site_id,labour.labour_name,labour.designation,labour_account.wage,labour_account.ot_wage,labour_account.no_of_days,labour_account.ot_hour,labour_account.ta_da,labour_account.advance,to_char(labour_account.lab_dat,'DD-MM-YYYY') as lab_dat,labour_account.labour_account_id FROM labour_account LEFT JOIN labour ON labour.labour_id = labour_account.labour_f_key LEFT JOIN site ON site.site_id = labour_account.site_f_key WHERE labour_account.user_perm = '0' AND labour_account.is_deleted= '0' ORDER BY labour_account.labour_account_id ;";
const PURCHASE_ORDER = "SELECT personid,vendor_name FROM vendor ;";
const PURCHASE_ORDER_ITEM = "SELECT stock_id,stock_name FROM stock ;";
const PURCHASE_ORDER_HOME =
  "SELECT vendor.vendor_name,purchase_order.order_id,purchase_order.po_date,purchase_order.due_date,purchase_order.total_amount,purchase_order.payment_method,purchase_order.status FROM purchase_order left join  vendor on vendor.PersonID = purchase_order.vendor_f_id WHERE purchase_order.is_deleted = '0' AND status = 'pending' ;";
const PROJECT_EXPENSE =
  "SELECT site.site_name,site.site_id,site.owner_name,employee.designation,site_expense.expense_amount,site_expense.previous_advance,site_expense.advance_required,to_char(site_expense.exp_dat,'DD-MM-YYYY') as exp_dat,site_expense.site_exp_id  FROM site_expense LEFT JOIN site ON site.site_id=site_expense.site_f_key LEFT JOIN employee ON employee.empid=site_expense.employee_f_key WHERE site_expense.user_perm = '1' AND site_expense.is_deleted= '0'ORDER BY site_expense.site_exp_id ;";
const PROJECT_PENDING =
  "SELECT site.site_name,site.site_id,site.owner_name,employee.designation,site_expense.expense_amount,site_expense.previous_advance,site_expense.advance_required,to_char(site_expense.exp_dat,'DD-MM-YYYY') as exp_dat,site_expense.site_exp_id FROM site_expense LEFT JOIN site ON site.site_id=site_expense.site_f_key LEFT JOIN employee ON employee.empid=site_expense.employee_f_key WHERE site_expense.user_perm = '0' AND site_expense.is_deleted= '0'ORDER BY site_expense.site_exp_id ;";

const STOCK_DATA =
  "select stock_collection.product_id,stock_collection.product,stock_collection.category,stock.item_description,stock.purchase_price,stock.sales_price,stock.brand,stock.expiry FROM stock_collection left join stock on stock_collection.product_id=stock.stock_f_id order by stock_collection.product_id ;";
const STOCK_LIST = "SELECT DISTINCT category FROM stock_collection ;";
const LABOUR_SITE = "SELECT site.site_name FROM site ;";
const LABOUR_INSERT = "SELECT labour_id,labour_name FROM labour ;";
const LABOUR_FORM = "SELECT site_id,site_name FROM site ;";
const PLOTTY_DATA = "SELECT amount FROM payment_out ;";

module.exports = {
  PURCHASE_ORDER,
  PROJECT_EXPENSE,
  LABOUR_EXPENSE,
  STOCK_LIST,
  LABOUR_PENDING,
  PROJECT_PENDING,
  STOCK_DATA,
  LABOUR_SITE,
  PURCHASE_ORDER_HOME,
  PURCHASE_ORDER_ITEM,
  LABOUR_INSERT,
  LABOUR_FORM,
  PLOTTY_DATA,
};
