import { test, expect } from "@playwright/test";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";

import { LoginPage } from "ui/pages/login.page";
import { HomePage } from "ui/pages/home.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";

test.describe("[e2e test Add New Product] [Products]", () => {
  test("Add new product", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);

    await loginPage.open();
    await loginPage.fillCredentials();
    await loginPage.clickOnLoginButton();
    await homePage.waitForOpened();

    await homePage.clickOnViewModule("products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();

    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();

    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(
      NOTIFICATIONS.PRODUCT_CREATED
    );

    const actual = await productsListPage.getFirstRowProductData();
    const expectedPriceText = `$${productData.price}`;

    await expect(actual.name).toEqual(productData.name);
    await expect(actual.price).toEqual(expectedPriceText);
    await expect(actual.manufacturer).toEqual(productData.manufacturer);

    await expect(productsListPage.firstRow).toBeVisible();
  });
});
