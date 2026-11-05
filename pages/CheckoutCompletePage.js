class CheckoutCompletePage {
  constructor(page) {
    this.completeTitle = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async getCompletionMessage() {
    return (await this.completeTitle.textContent()).trim();
  }
}

module.exports = { CheckoutCompletePage };
