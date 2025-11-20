import { test, expect } from "fixtures/page.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";

test.describe("Add product → delete product", () => {
  test("Create, verify, delete, verify removed", async ({
    loginPage,
    homePage,
    productsListPage,
    addNewProductPage,
  }) => {
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

    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

    const deleteBtn = productsListPage.deleteButton(productData.name);
    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();

    await productsListPage.deleteModal.waitForOpened();
    await productsListPage.deleteModal.confirmDelete();
    await productsListPage.deleteModal.waitForClosed();

    await expect(
      productsListPage.tableRowByName(productData.name)
    ).toBeHidden();
  });
});
