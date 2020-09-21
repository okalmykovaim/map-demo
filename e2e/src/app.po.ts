import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(path: string): Promise<unknown> {
    return browser.get(`${browser.baseUrl}${path}`) as Promise<unknown>;
  }

  getHomeLogo(): Promise<string> {
    return element(by.css('img')).getAttribute('src') as Promise<string>;
  }

  getMapIframe(): Promise<string> {
    return element(by.css('agm-map iframe')).getTagName() as Promise<string>;
  }

  getMenuText(): Promise<string> {
    return element(by.css('.menu-burger span')).getText() as Promise<string>;
  }
}
