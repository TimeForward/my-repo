const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutStepOnePage } = require('../pages/CheckoutStepOnePage');
const { CheckoutStepTwoPage } = require('../pages/CheckoutStepTwoPage');
const { CheckoutCompletePage } = require('../pages/CheckoutCompletePage');

test('ДЗ 11: заказ самого дорогого товара через POM @ui', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const stepOne = new CheckoutStepOnePage(page);
  const stepTwo = new CheckoutStepTwoPage(page);
  const complete = new CheckoutCompletePage(page);

  await login.open();
  await login.login('standard_user', 'secret_sauce');
  await expect(inventory.title).toHaveText('Products');

  const itemName = await inventory.addMostExpensiveItemToCart();
  await expect(inventory.cartBadge).toHaveText('1');
  await inventory.openCart();
  await expect(cart.itemNames).toHaveText([itemName]);

  await cart.goToCheckout();
  await stepOne.fillUserInfo('Test', 'User', '12345');
  await expect(stepTwo.orderTotal).toContainText('Total:');
  await stepTwo.finishCheckout();
  await expect(complete.completeTitle).toHaveText('Thank you for your order!');
});
