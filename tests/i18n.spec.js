const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const repo = 'career-guidance-for-civil-servants';
const screenshotDir = path.join(process.cwd(), 'qa-screenshots', repo);

async function openWithConsoleGuard(page, locale) {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.AppI18n && window.AppI18n.ready);
  await expect(page.locator('[data-testid="language-toggle"]')).toHaveCount(1);
  await expect(page.locator('[data-testid="language-toggle"]')).toBeVisible();
  return errors;
}

async function expectEnglish(page) {
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { name: /Career Guidance Test/i })).toBeVisible();
  await expect(page.getByText('Calculate result')).toBeVisible();
  await expect(page.getByText(/How strongly do you agree/i)).toBeVisible();
  await expect(page.getByTestId('language-toggle')).toHaveText('RU');
}

async function expectRussian(page) {
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.getByRole('heading', { name: /Профориентационный тест/i })).toBeVisible();
  await expect(page.getByText('Рассчитать результат')).toBeVisible();
  await expect(page.getByText(/Насколько Вы согласны/i)).toBeVisible();
  await expect(page.getByTestId('language-toggle')).toHaveText('EN');
}

test.describe('EN/RU interface', () => {
  test.beforeAll(() => fs.mkdirSync(screenshotDir, { recursive: true }));

  test('defaults to English for non-Russian devices and persists toggles', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Desktop-only EN default check.');
    const errors = await openWithConsoleGuard(page, 'en-US');
    await expectEnglish(page);
    await page.screenshot({ path: path.join(screenshotDir, 'desktop-en.png'), fullPage: true });

    await page.getByTestId('language-toggle').click();
    await expectRussian(page);
    await expect(page.evaluate(() => localStorage.getItem('lang'))).resolves.toBe('ru');
    await page.reload({ waitUntil: 'networkidle' });
    await expectRussian(page);
    await page.screenshot({ path: path.join(screenshotDir, 'desktop-ru.png'), fullPage: true });

    await page.getByTestId('language-toggle').click();
    await expectEnglish(page);
    await expect(page.evaluate(() => localStorage.getItem('lang'))).resolves.toBe('en');
    expect(errors).toEqual([]);
  });

  test('defaults to Russian for Russian devices and mobile screenshots stay clean', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'Mobile-only RU default check.');
    const errors = await openWithConsoleGuard(page, 'ru-RU');
    await expectRussian(page);
    await page.screenshot({ path: path.join(screenshotDir, 'mobile-ru.png'), fullPage: true });

    await page.getByTestId('language-toggle').click();
    await expectEnglish(page);
    await page.screenshot({ path: path.join(screenshotDir, 'mobile-en.png'), fullPage: true });
    expect(errors).toEqual([]);
  });
});
