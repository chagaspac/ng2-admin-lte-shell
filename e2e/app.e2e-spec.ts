import { Ng2AdminLteShellPage } from './app.po';

describe('ng2-admin-lte-shell App', function() {
  let page: Ng2AdminLteShellPage;

  beforeEach(() => {
    page = new Ng2AdminLteShellPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
