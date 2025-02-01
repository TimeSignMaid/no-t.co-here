// ==UserScript==
// @name         fuck t.co Links on X
// @namespace    https://github.com/TimeSignMaid/no-t.co-here
// @version      1.0
// @description  Automatically bypass t.co links on X (Twitter) and replace them with real URLs.
// @author       MaidTSy
// @match        https://*.twitter.com/*
// @match        https://*.x.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function bypassTcoLinks() {
        document.querySelectorAll('a[href*="t.co"]').forEach(a => {
            if (!a.dataset.bypassed) { // Prevent multiple runs
                const realLink = a.textContent.trim();
                if (realLink.startsWith("http")) { // Ensure it's a valid URL
                    a.href = realLink;
                    a.dataset.bypassed = "true";
                }
            }
        });
    }

    // Run on page load and observe for dynamically loaded content
    const observer = new MutationObserver(bypassTcoLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    bypassTcoLinks(); // Initial run
})();
