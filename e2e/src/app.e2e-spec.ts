import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have a data on the Home page', () => {
    page.navigateTo('');
    expect(page.getMenuText()).toEqual('Home');
    expect(page.getHomeLogo()).toContain('limehome-Logo.svg');
  });

  it('should have the map on the Map page with an iframe inside', () => {
    page.navigateTo('/map');
    expect(page.getMapIframe()).toEqual('iframe');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
