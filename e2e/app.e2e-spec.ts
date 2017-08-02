import { NpmDownloadCounterPage } from './app.po';

describe('npm-download-counter App', () => {
  let page: NpmDownloadCounterPage;

  beforeEach(() => {
    page = new NpmDownloadCounterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
