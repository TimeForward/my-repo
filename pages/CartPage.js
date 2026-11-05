class CartPage {
  constructor(page) {
    this.itemNames = page.locator('.cart_item .inventory_item_name');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
