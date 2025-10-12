import { test, expect } from "@playwright/test";

test.describe("[smoke registration form]", () => {
    const url = "https://anatoly-karpovich.github.io/demo-registration-form/";
    enum HEADERS{
        SUCCESS = "Registration Details",
    };

    interface ICredentials{
        firstName: string;
        lastName: string;
        address: string;
        email: string;
        phone: string;
        country: "USA" | "Canada" | "UK";
        gender: "male" | "female";
        hobby: "Reading" | "Music" | "Traveling" | "Gaming" | "Dancing";
        language: string;
        skill: string;
        year: string;
        month: string;
        day: string;
        password: string;
    };

    const credentials: ICredentials = {
        firstName: "denis",
        lastName: "denisov",
        address: "tailand dom 3",
        email: "denis@gmail.com",
        phone: "12423423",
        country: "USA",
        gender: "male",
        hobby: "Dancing",
        language: "english",
        skill: "JavaScript",
        year: "1997",
        month: "December",
        day: "19",
        password: "denis123123",
    };

    test("shoeld register with credentials", async ({ page }) => {

        await page.goto(url);

        const inputFirstName = page.locator("#firstName");
        const inputLastName = page.locator("#lastName");
        const inputAddress = page.locator("#address");
        const inputEmail = page.locator("#email");
        const inputPhone = page.locator("#phone");
        const selectCountry = page.locator("#country");
        const genderType = page.locator(`input[name="gender"][value="${credentials.gender}"]`);
        const hobbyCheckBox = page.locator(`input.hobby[value="${credentials.hobby}"]`);
        const inputLanguage = page.locator("#language");
        const selectSkills = page.locator("#skills");
        const selectYearOfBirth = page.locator("#year"); 
        const selectMonthOfBirth = page.locator("#month");
        const selectDayOfBirth = page.locator("#day");
        const inputPassword = page.locator("#password");
        const inputConfirmPassword = page.locator("#password-confirm");
        const buttonSubmit = page.locator('button[type="submit"]');
        const registrationHeader = page.locator("h2.text-center");

        await inputFirstName.fill(credentials.firstName);
        await inputLastName.fill(credentials.lastName);
        await inputAddress.fill(credentials.address);
        await inputEmail.fill(credentials.email);
        await inputPhone.fill(credentials.phone);
        await selectCountry.selectOption(credentials.country);

        await page.waitForSelector(`input[name="gender"][value="${credentials.gender}"]`, { state: "visible" });
        await genderType.check();
        await page.waitForSelector(`input.hobby[value="${credentials.hobby}"]`, { state: "attached" });
        await hobbyCheckBox.check();

        await inputLanguage.fill(credentials.language);
        await selectSkills.selectOption({ label: credentials.skill });
        await selectYearOfBirth.selectOption({ label: credentials.year });
        await selectMonthOfBirth.selectOption({ label: credentials.month });
        await selectDayOfBirth.selectOption({ label: credentials.day });

        await inputPassword.fill(credentials.password);
        await inputConfirmPassword.fill(credentials.password);

        await buttonSubmit.click();

        await expect(registrationHeader).toBeVisible();
        await expect(registrationHeader).toHaveText("Registration Details");

        await expect(page.locator("#fullName")).toHaveText(`${credentials.firstName} ${credentials.lastName}`);
        await expect(page.locator("#address")).toHaveText(credentials.address);
        await expect(page.locator("#email")).toHaveText(credentials.email);
        await expect(page.locator("#phone")).toHaveText(credentials.phone);
        await expect(page.locator("#country")).toHaveText(credentials.country);
        await expect(page.locator("#gender")).toHaveText(credentials.gender);
        await expect(page.locator("#language")).toHaveText(credentials.language);
        await expect(page.locator("#skills")).toHaveText(credentials.skill);
        await expect(page.locator("#hobbies")).toHaveText(credentials.hobby);
        await expect(page.locator("#dateOfBirth")).toHaveText(`${credentials.day} ${credentials.month} ${credentials.year}`);
        await expect(page.locator("#password")).toHaveText("*".repeat(credentials.password.length));
  });

})