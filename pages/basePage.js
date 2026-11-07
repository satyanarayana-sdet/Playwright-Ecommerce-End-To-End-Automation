// ─────────────────────────────────────────────────────────────
// pages/BasePage.js  –  Parent class for all Page Objects
// ─────────────────────────────────────────────────────────────
const fs = require('fs');

class BasePage {

  constructor(page) {
    this.page = page;
  }

  async goto(path) {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForVisible(locator, timeout = 20000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async screenshot(name) {
    if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');
    const ts   = new Date().toISOString().replace(/[:.]/g, '-');
    const path = `screenshots/${name}-${ts}.png`;
    await this.page.screenshot({ path, fullPage: false });
    console.log(`${path}`);
  }
}

module.exports = { BasePage };
