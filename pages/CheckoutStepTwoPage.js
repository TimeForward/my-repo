class CheckoutStepTwoPage {
  constructor(page) {
    this.orderTotal = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutStepTwoPage };
