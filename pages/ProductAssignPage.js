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
  async proceedToCheckout() {
    const proceedToCheckoutButton = this.page.getByText('Proceed To Checkout', { exact: true });
    await proceedToCheckoutButton.waitFor({ state: 'visible' });
    await proceedToCheckoutButton.click();
  }
  async placeOrder() {
    const placeOrderButton = this.page.getByText('Place Order', { exact: true });
    await placeOrderButton.waitFor({ state: 'visible' });
    await placeOrderButton.click();
  }
  async fillpaymentDetails(name, card_number, cvc, expiry_month, expiry_year) {

    const cardName = this.page.locator('input[name="name_on_card"]');
    await cardName.fill(name);

    const cardNumber = this.page.locator('input[name="card_number"]');
    await cardNumber.fill(card_number);

    const cvcField = this.page.locator('input[placeholder="ex. 311"]');
    await cvcField.fill(cvc);

    const expiryMonth = this.page.locator('input[placeholder="MM"]');
    await expiryMonth.fill(expiry_month);

    const expiryYear = this.page.locator('input[placeholder="YYYY"]');
    await expiryYear.fill(expiry_year);

    const payAndConfirmOrderButton = this.page.getByText(
        'Pay and Confirm Order',
        { exact: true }
    );

    await payAndConfirmOrderButton.waitFor({ state: 'visible' });
    await payAndConfirmOrderButton.click();
}
}

module.exports = ProductAssignPage;
