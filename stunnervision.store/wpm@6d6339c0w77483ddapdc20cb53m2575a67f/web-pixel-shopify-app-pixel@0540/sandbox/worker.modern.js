function initWebPixel() {
    (function(shopify) {
        shopify.extend('WebPixel::Render', function(api) {
            var analytics = api.analytics,
                browser = api.browser,
                init = api.init;
            var e = api._pixelInfo ? api._pixelInfo.runtimeContext : null,
                n = api._pixelInfo ? api._pixelInfo.type : null;
            analytics.subscribe("all_standard_events", (function(i) {
                var l, o;
                l = i.name, o = i, browser.localStorage.getItem("shopify-pixel-mode").then((function(i) {
                    "debug" === i && console.log(`[shopify-pixel][${n}][${e}] ${l}`, o)
                })).catch((function() {}))
            }));
        });

    })(self.webPixelsManager.createShopifyExtend('shopify-app-pixel', 'app'));
}
importScripts('https://cdn.shopify.com/s6d6339c0w77483ddapdc20cb53m2575a67fm.js');