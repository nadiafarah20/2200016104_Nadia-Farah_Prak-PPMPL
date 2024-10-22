const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using selenium', function () {
    this.timeout(30000); //set timeout for mocha test
    let driver;

    //inisialisasi webDriver sebelum menjalankan test case
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    //tutup webDriver setelah semua test selesai
    after(async function() {
        await driver.quit();
    });

    it('should load the login page', async function() {
        await driver.get('C:/Users/ASUS/Documents/SEMESTER 5/PRAK PPMPL/selenium-ui-test/login.html');
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should input username and password', async function() {
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');
        const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button', async function() {
        await driver.findElement(By.id('loginButton')).click();
    });

    // 1. Test Case: Simulasikan login gagal
    it('should display an error message when login fails', async function() {
        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('password')).clear();
        await driver.findElement(By.id('username')).sendKeys('wronguser');
        await driver.findElement(By.id('password')).sendKeys('wrongpassword');
        await driver.findElement(By.id('loginButton')).click();

        // Tunggu hingga elemen pesan error muncul
        const errorMessage = await driver.wait(until.elementLocated(By.id('error')), 5000).getText();
        expect(errorMessage).to.equal('Invalid username or password');
    });


    // 2. Test Case: Menggunakan CSS selector dan XPath
    it('should input using CSS selector and XPath', async function() {
        await driver.findElement(By.css('#username')).clear();
        await driver.findElement(By.xpath('//*[@id="password"]')).clear();
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');

        const usernameValue = await driver.findElement(By.css('#username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.xpath('//*[@id="password"]')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    // 3. Test Case: Memeriksa apakah tombol login dan input field terlihat di layar
    it('should validate if the login button and input fields are displayed', async function() {
        const isLoginButtonDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
        const isUsernameFieldDisplayed = await driver.findElement(By.id('username')).isDisplayed();
        const isPasswordFieldDisplayed = await driver.findElement(By.id('password')).isDisplayed();

        expect(isLoginButtonDisplayed).to.be.true;
        expect(isUsernameFieldDisplayed).to.be.true;
        expect(isPasswordFieldDisplayed).to.be.true;
    });
});
