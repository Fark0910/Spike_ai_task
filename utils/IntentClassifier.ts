import { SEO_INTENT_KEYWORDS, GA4_INTENT_KEYWORDS, EXPLICIT_MIXED_SIGNALS,GA4_HARD_SIGNALS,SEO_HARD_SIGNALS} from "../helper/ga4SEOarray";
import intent_unknown from "../helper/IntentUnknown";
import { Intent } from "../types/api";

const detectIntent=(query: string): Intent =>{
  const q = query.toLowerCase();
 
  let hasSEO:Boolean=false;
  let hasGA4:Boolean=false;

  if (GA4_INTENT_KEYWORDS.some(k => q.includes(k))) {
    hasGA4=true;
  }
  if (SEO_INTENT_KEYWORDS.some(k => q.includes(k))) {
    hasSEO=true;
  }
 
  //console.log(`SEO Score: ${seoScore}, GA4 Score: ${ga4Score}`);
  if (hasSEO==true && hasGA4==false) {
    return "SEO";
  }
  if (hasGA4 == true && hasSEO == false) {
    return "GA4";
  }
  if (hasGA4 == true && hasSEO == true) {
    return "MIXED";
  }
  return "UNKNOWN";
}
export= detectIntent ;
