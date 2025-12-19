"use strict";
const ga4SEOarray_1 = require("../helper/ga4SEOarray");
const detectIntent = (query) => {
    const q = query.toLowerCase();
    let hasSEO = false;
    let hasGA4 = false;
    if (ga4SEOarray_1.GA4_INTENT_KEYWORDS.some(k => q.includes(k))) {
        hasGA4 = true;
    }
    if (ga4SEOarray_1.SEO_INTENT_KEYWORDS.some(k => q.includes(k))) {
        hasSEO = true;
    }
    //console.log(`SEO Score: ${seoScore}, GA4 Score: ${ga4Score}`);
    if (hasSEO == true && hasGA4 == false) {
        return "SEO";
    }
    if (hasGA4 == true && hasSEO == false) {
        return "GA4";
    }
    if (hasGA4 == true && hasSEO == true) {
        return "MIXED";
    }
    return "UNKNOWN";
};
module.exports = detectIntent;
