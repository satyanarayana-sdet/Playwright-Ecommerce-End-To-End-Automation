const { BasePage } = require('./basePage');

class ProductAssignPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async selectCategory(category, subCategory) {
    await this.page.locator(`a[href="#${category}"]`).click();
    await this.page.getByRole('link', { name: subCategory, exact: true }).click();
  }

  async addToCart(productName) {
    const products = this.page.locator('.productinfo.text-center');
    console.log(await products.locator('p').allTextContents()); // Ensure all products are loaded
    const product = productName
      ? products.filter({ has: this.page.getByText(productName, { exact: true }) }).first()
      : products.first();
    const selectedProductName = (await product.locator('p').innerText()).trim();
    await product.getByText('Add to cart', { exact: true }).click();
    await this.page.getByText('Your product has been added to cart.', { exact: true }).waitFor();
    await this.page.getByRole('button', { name: 'Continue Shopping', exact: true }).click();

    return selectedProductName;
  }
}

module.exports = ProductAssignPage;
