import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const root = process.cwd();

function readJson(path) {
  return JSON.parse(readFileSync(join(root, path), 'utf8'));
}

function readText(path) {
  return readFileSync(join(root, path), 'utf8');
}

describe('project smoke checks', () => {
  it('has the minimum files needed by Astro', () => {
    [
      'package.json',
      'astro.config.mjs',
      'src/pages/index.astro',
      'src/pages/[locale]/index.astro',
      'src/pages/404.astro',
      'src/pages/manifest.webmanifest.ts',
      'src/pages/robots.txt.ts',
      'src/layouts/BaseLayout.astro',
      'src/config/site.ts',
      'src/i18n/ui.ts',
      'src/i18n/translations/es.json',
      'src/i18n/translations/en.json',
      'src/styles/global.css',
    ].forEach((path) => {
      assert.equal(existsSync(join(root, path)), true, `${path} should exist`);
    });
  });

  it('keeps template metadata files available', () => {
    ['.nvmrc', '.env.example', '.gitignore', '.prettierrc', '.prettierignore', 'README.md'].forEach(
      (path) => {
        assert.equal(existsSync(join(root, path)), true, `${path} should exist`);
      }
    );
  });

  it('keeps the expected npm scripts available', () => {
    const pkg = readJson('package.json');

    assert.equal(pkg.name, 'facilimg');
    assert.equal(pkg.scripts?.dev, 'astro dev');
    assert.equal(pkg.scripts?.build, 'astro build');
    assert.equal(pkg.scripts?.preview, 'astro preview');
    assert.ok(pkg.scripts?.test?.includes('node --test'));
    assert.ok(pkg.scripts?.clean?.includes('scripts/clean.mjs'));
  });

  it('keeps basic template components available', () => {
    ['Button', 'Container', 'Footer', 'Header', 'ImageStudio'].forEach((component) => {
      assert.equal(
        existsSync(join(root, `src/components/${component}.astro`)),
        true,
        `${component}.astro should exist`
      );
    });
  });

  it('keeps Astro i18n enabled and documented', () => {
    const astroConfig = readText('astro.config.mjs');
    const readme = readText('README.md');

    assert.match(astroConfig, /i18n/);
    assert.match(astroConfig, /defaultLocale: 'es'/);
    assert.match(astroConfig, /locales: \['es', 'en'\]/);
    assert.match(readme, /Traducciones e idiomas/);
    assert.match(readme, /src\/i18n\/translations/);
  });

  it('keeps translation files aligned', () => {
    const es = readJson('src/i18n/translations/es.json');
    const en = readJson('src/i18n/translations/en.json');

    assert.deepEqual(Object.keys(en).sort(), Object.keys(es).sort());
    assert.ok(es['home.title']);
    assert.ok(en['home.title']);
    assert.ok(es['editor.download']);
    assert.ok(en['editor.download']);
  });

  it('includes the browser image editor on both home pages', () => {
    const home = readText('src/pages/index.astro');
    const localizedHome = readText('src/pages/[locale]/index.astro');
    const studio = readText('src/components/ImageStudio.astro');

    assert.match(home, /ImageStudio/);
    assert.match(localizedHome, /ImageStudio/);
    assert.match(studio, /canvas/);
    assert.match(studio, /toBlob/);
  });

  it('includes GitHub workflows for CI and Pages', () => {
    const pagesWorkflow = readText('.github/workflows/pages.yml');
    const ciWorkflow = readText('.github/workflows/ci.yml');

    assert.match(pagesWorkflow, /actions\/deploy-pages@v4/);
    assert.match(pagesWorkflow, /npm run build/);
    assert.match(pagesWorkflow, /npm test/);
    assert.match(ciWorkflow, /pull_request/);
    assert.match(ciWorkflow, /npm run build/);
    assert.match(ciWorkflow, /npm test/);
  });

  it('documents how to reuse the template', () => {
    const readme = readText('README.md');

    assert.match(readme, /GitHub Pages/);
    assert.match(readme, /src\/config\/site\.ts/);
    assert.match(readme, /manifest\.webmanifest\.ts/);
    assert.match(readme, /npm run build/);
  });
});
