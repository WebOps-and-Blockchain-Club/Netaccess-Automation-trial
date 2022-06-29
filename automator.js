const express = require('express');
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express()
require("chromedriver");
let swd = require("selenium-webdriver");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

router.get('/start', (req, res) => {
    const tab = new swd.Builder().forBrowser("chrome").build();
    const Opentab = tab.get("https://netaccess.iitm.ac.in/");
    Opentab
        .then(() => tab.manage().setTimeouts({ implicit: 10000 }))
        .then(() => { for (var i = 0; i < 1000000000; i++); })
        .then(() => tab.findElement(swd.By.xpath('/html/body/div[2]/div/form/div[1]/input')))
        .then((usernameBox) => usernameBox.sendKeys(process.env.ROLLNO))
        .then(() => { for (var i = 0; i < 1000000000; i++); })
        .then(() => tab.findElement(swd.By.xpath('/html/body/div[2]/div/form/div[2]/input')))
        .then((passwordBox) => passwordBox.sendKeys(process.env.PASSWORD))
        .then(() => { for (var i = 0; i < 1000000000; i++); })
        .then(() => tab.findElement(swd.By.xpath('//*[@id="submit"]')))
        .then((signInBtn) => signInBtn.click())
        .then(() => { for (var i = 0; i < 1000000000; i++); })
        .then(() => tab.findElement(swd.By.xpath('/html/body/div[2]/div/div[1]/div[2]/a')))
        .then((approveBtn) => approveBtn.click())
        .then(() => { for (var i = 0; i < 1000000000; i++); })
        .then(() => tab.findElement(swd.By.xpath('/html/body/div[2]/div/div[1]/form/div[2]/label/input')))
        .then((oneHr) => oneHr.click())
        .then(() => { for (var i = 0; i < 1000000000; i++); })
        .then(() => tab.findElement(swd.By.xpath('/html/body/div[2]/div/div[1]/form/div[4]/button')))
        .then((oneHr) => oneHr.click())
        .then(() => { for (var i = 0; i < 1000000000; i++); })
        .then(() => { for (var i = 0; i < 1000000000; i++); })
        .then(() => tab.close())
        .then(() => res.send("Automation has been done successfully :)"))
        .catch((err) => {
            tab.close()
            console.log(err)
            res.send("Some Error has occured :( ")
        });
})

module.exports = app