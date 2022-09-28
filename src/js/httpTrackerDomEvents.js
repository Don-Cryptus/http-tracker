const trackUrls = {
  urls: ['<all_urls>'],
};

const reqBodyHeaders = httpTracker.isFF
  ? ['requestBody']
  : ['requestBody', 'extraHeaders'];
const reqHeaders = httpTracker.isFF
  ? ['requestHeaders']
  : ['requestHeaders', 'extraHeaders'];
const reqHeadersBlocking = httpTracker.isFF
  ? ['blocking', 'requestHeaders']
  : ['blocking', 'requestHeaders', 'extraHeaders'];
const resHeaders = httpTracker.isFF
  ? ['responseHeaders']
  : ['responseHeaders', 'extraHeaders'];
const errorHeaders = ['extraHeaders'];
const r = httpTracker.browser.webRequest;

r.onResponseStarted.addListener(
  function (details) {
    details.callerName = 'onResponseStarted';
    details.requestIdEnhanced = details.requestId;
    eventTracker.logRequestDetails(details);
  },
  trackUrls,
  resHeaders
);

r.onCompleted.addListener(
  function (details) {
    details.callerName = 'onCompleted';
    details.requestIdEnhanced = details.requestId;
    eventTracker.logRequestDetails(details);
  },
  trackUrls,
  resHeaders
);

if (httpTracker.isFF) {
  r.onErrorOccurred.addListener(function (details) {
    details.callerName = 'onErrorOccurred';
    details.requestIdEnhanced = details.requestId;
    eventTracker.logRequestDetails(details);
  }, trackUrls);
} else {
  r.onErrorOccurred.addListener(
    function (details) {
      details.callerName = 'onErrorOccurred';
      details.requestIdEnhanced = details.requestId;
      eventTracker.logRequestDetails(details);
    },
    trackUrls,
    errorHeaders
  );
}
