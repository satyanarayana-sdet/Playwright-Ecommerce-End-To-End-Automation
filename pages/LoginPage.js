const { BasePage } = require('./basePage');
class LoginPage extends BasePage {


  constructor(page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Email Address').first();
    this.passwordInput = page.getByPlaceholder('Password').first();
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loginErrorMessage = page.getByText('Your email or password is incorrect!', { exact: true });

  }

  async open() {
    await this.goto('/login');

    // Check whether the user is already logged in
    const loggedIn = this.page.getByText('Logged in as');

    if (await loggedIn.isVisible()) {
      await this.page.getByRole('link', { name: /Logout/ }).click();
    }

    // Wait for login form
    await this.usernameInput.waitFor({
      state: 'visible'
    });

    await this.passwordInput.waitFor({
      state: 'visible'
    });
  }
  
  async login(username, password) {
    await this.open();
    await this.submitLogin(username, password);

    await this.page.getByText('Logged in as').waitFor({
      state: 'visible'
    });

    console.log('Login done');
  }

  async submitLogin(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    await this.loginButton.click();
  }

  getLoginErrorMessage() {
    return this.loginErrorMessage;
  }

  async isLoggedIn() {
    return await this.page.getByText('Logged in as').isVisible();
  }

}
module.exports = LoginPage;