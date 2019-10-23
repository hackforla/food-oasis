---
name: 'Lighthouse: Cross-origin destinations are unsafe'
about: Instructions for addressing the cross-origin linking vulnerabilities
title: 'Lighthouse Issue: Cross-origin destinations are unsafe'
labels: ''
assignees: ''

---

### Overview
Links to cross-origin destinations are unsafe both from a security and performance perspective.  

### Action Item
Run [Lighthouse](https://developers.google.com/web/tools/lighthouse/) and then follow the instructions in [cross-origin destinations are unsafe]
(https://developers.google.com/web/tools/lighthouse/audits/noopener) .   

## Summary of instructions
When using *target=_blank* also adding *rel="noopener"* to the tag ensures that new page runs in a separate process.
