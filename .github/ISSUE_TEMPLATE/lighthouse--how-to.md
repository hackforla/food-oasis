---
name: 'Lighthouse: How To'
about: Provides overview of how to use Lighthouse and links to additional resources
title: 'Lighthouse: How To'
labels: ''
assignees: ''

---

### Overview
Lighthouse is an open-source, automated tool for improving the quality of web pages. You can run it against any web page, public or requiring authentication. It has audits for performance, accessibility, progressive web apps, and more.  Hack For LA recommends that you run the tests and evaluate what changes you might want to make on your website to improve performance and accessability.

### How To Use
Lighthouse is in the Audits panel of the Chrome DevTools. To run a report:

1. Download Google Chrome for Desktop.
2. In Google Chrome, go to the URL you want to audit. You can audit any URL on the web.
3. Open Chrome DevTools.
4. Click the Audits tab.
5. Click Perform an audit. DevTools shows you a list of audit categories. Leave them all enabled.
6. Click Run audit. After 60 to 90 seconds, Lighthouse gives you a report on the page.

For more information go to :
https://developers.google.com/web/tools/lighthouse/

### Tip
You will want to re-run lighthouse on any code changes before integrating them into your site.  Sometimes the specific suggestions it makes, do not actually result in improved performance or can actually harm performance.
