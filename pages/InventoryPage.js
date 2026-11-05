class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.sort = page.locator('[data-test="product-sort-container"]');
    this.items = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async getPageTitle() {
    return (await this.title.textContent()).trim();
  }

  async addItemToCart(itemName) {
    const item = this.items.filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async addMostExpensiveItemToCart() {
    await this.sort.selectOption('hilo');
    const firstItem = this.items.first();
    const name = (await firstItem.locator('.inventory_item_name').textContent()).trim();
    await firstItem.getByRole('button', { name: 'Add to cart' }).click();
    return name;
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
