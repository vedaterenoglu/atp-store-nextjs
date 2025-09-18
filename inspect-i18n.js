const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to admin dashboard create-admin page...');
  await page.goto('http://localhost:3081/admin/dashboard/create-admin');

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  console.log('\n=== I18N INSPECTION REPORT ===\n');

  // Get page title
  const title = await page.title();
  console.log('Page Title:', title);

  // Check for language toggle
  const languageToggle = await page.locator('[data-testid="language-toggle"], button:has-text("EN"), button:has-text("TR")').first();
  const hasLanguageToggle = await languageToggle.isVisible().catch(() => false);
  console.log('Language Toggle Present:', hasLanguageToggle);

  // Get all visible text content
  const textContent = await page.evaluate(() => {
    const texts = [];
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (parent.offsetHeight === 0) return NodeFilter.FILTER_REJECT;
          if (node.textContent.trim() === '') return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    while (node = walker.nextNode()) {
      texts.push(node.textContent.trim());
    }
    return texts.filter(t => t.length > 0);
  });

  console.log('\nVisible Text Elements Found:', textContent.length);
  console.log('\nSample Text Content (first 20):');
  textContent.slice(0, 20).forEach((text, i) => {
    console.log(`  ${i + 1}. "${text}"`);
  });

  // Check for translation keys (common patterns)
  const translationKeyPatterns = [
    /^[a-z]+\.[a-z]+(\.[a-z]+)*$/i, // e.g., "admin.createAdmin.title"
    /^t\(/,                           // t() function calls
    /^\{\{.+\}\}$/,                   // Template syntax
  ];

  const possibleUntranslatedKeys = textContent.filter(text =>
    translationKeyPatterns.some(pattern => pattern.test(text))
  );

  if (possibleUntranslatedKeys.length > 0) {
    console.log('\n⚠️  Possible Untranslated Keys Found:');
    possibleUntranslatedKeys.forEach(key => {
      console.log(`  - "${key}"`);
    });
  } else {
    console.log('\n✅ No obvious translation keys found in visible text');
  }

  // Check for form labels and placeholders
  const formElements = await page.evaluate(() => {
    const elements = [];

    // Check inputs
    document.querySelectorAll('input, select, textarea').forEach(el => {
      const label = el.labels ? el.labels[0]?.textContent : null;
      const placeholder = el.placeholder;
      const ariaLabel = el.getAttribute('aria-label');

      elements.push({
        type: el.tagName.toLowerCase(),
        name: el.name || el.id || 'unnamed',
        label: label?.trim(),
        placeholder: placeholder?.trim(),
        ariaLabel: ariaLabel?.trim()
      });
    });

    return elements;
  });

  if (formElements.length > 0) {
    console.log('\n📝 Form Elements I18N Status:');
    formElements.forEach(el => {
      console.log(`  ${el.type}[${el.name}]:`);
      if (el.label) console.log(`    Label: "${el.label}"`);
      if (el.placeholder) console.log(`    Placeholder: "${el.placeholder}"`);
      if (el.ariaLabel) console.log(`    Aria-Label: "${el.ariaLabel}"`);
    });
  }

  // Check buttons
  const buttons = await page.evaluate(() => {
    const btns = [];
    document.querySelectorAll('button').forEach(btn => {
      if (btn.offsetHeight > 0) {
        btns.push({
          text: btn.textContent.trim(),
          ariaLabel: btn.getAttribute('aria-label')
        });
      }
    });
    return btns;
  });

  if (buttons.length > 0) {
    console.log('\n🔘 Button Text:');
    buttons.forEach(btn => {
      console.log(`  - "${btn.text}"${btn.ariaLabel ? ` (aria-label: "${btn.ariaLabel}")` : ''}`);
    });
  }

  // Check page headers
  const headers = await page.evaluate(() => {
    const hdrs = [];
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      if (h.offsetHeight > 0) {
        hdrs.push({
          level: h.tagName,
          text: h.textContent.trim()
        });
      }
    });
    return hdrs;
  });

  if (headers.length > 0) {
    console.log('\n📄 Page Headers:');
    headers.forEach(h => {
      console.log(`  ${h.level}: "${h.text}"`);
    });
  }

  // Try to switch language if toggle exists
  if (hasLanguageToggle) {
    console.log('\n🔄 Attempting Language Switch...');

    // Get initial language
    const currentLang = await page.evaluate(() => document.documentElement.lang || 'unknown');
    console.log('Current Language:', currentLang);

    // Click language toggle
    await languageToggle.click();
    await page.waitForTimeout(1000);

    // Check if language changed
    const newLang = await page.evaluate(() => document.documentElement.lang || 'unknown');
    console.log('Language After Toggle:', newLang);

    if (currentLang !== newLang) {
      console.log('✅ Language switch successful');

      // Check if text content changed
      const newTitle = await page.title();
      if (title !== newTitle) {
        console.log(`  Title changed: "${title}" → "${newTitle}"`);
      }
    } else {
      console.log('⚠️  Language did not change after toggle');
    }
  }

  console.log('\n=== END OF I18N INSPECTION ===\n');

  // Keep browser open for manual inspection
  console.log('Browser will remain open for manual inspection.');
  console.log('Press Ctrl+C to exit...');

  // Keep the script running
  await new Promise(() => {});
})();