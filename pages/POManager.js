const LoginPage = require('../pages/LoginPage');
const ProductAssignPage = require('../pages/ProductAssignPage');
class POManager {
  constructor(page) {
    this.loginPage = new LoginPage(page);
    this.productAssignPage = new ProductAssignPage(page);
  }
  getLoginPage() {
    return this.loginPage;
  } 
    getProductAssignPage() {
    return this.productAssignPage;
  }
}
module.exports = POManager;