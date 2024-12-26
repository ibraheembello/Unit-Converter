const { test, expect } = require('@playwright/test');

test('unit converter should convert length units', async ({ page }) => {
    await page.goto('file:///' + __dirname + '/../Unit Converter.html');
    await page.selectOption('#fromUnit', 'meter');
    await page.selectOption('#toUnit', 'kilometer');
    await page.fill('#inputValue', '1000');
    await page.click('button:text("Convert")');
    const result = await page.textContent('#result');
    expect(result).toBe('1000 meter = 1.0000 kilometer');
});

test('unit converter should handle invalid input', async ({ page }) => {
    await page.goto('file:///' + __dirname + '/../Unit Converter.html');
    await page.fill('#inputValue', 'invalid');
    await page.click('button:text("Convert")');
    const result = await page.textContent('#result');
    expect(result).toBe('Please enter a valid number');
});

test('unit converter should switch between unit types', async ({ page }) => {
    await page.goto('file:///' + __dirname + '/../Unit Converter.html');
    await page.click('#temperatureTab');
    const fromSelect = await page.textContent('#fromUnit');
    expect(fromSelect).toContain('Celsius');
    expect(fromSelect).toContain('Fahrenheit');
    expect(fromSelect).toContain('Kelvin');
});