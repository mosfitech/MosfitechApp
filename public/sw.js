/* import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching"; */
/* import {
  registerRoute,
  NavigationRoute,
  createHandlerBoundToURL,
} from "workbox-routing"; */

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      self.skipWaiting();
    }
  });
  
  self.addEventListener("install", (event) => {
    console.log(`¡Service Worker instalado!`);
  });
  
  self.addEventListener("activate", (event) => {
    console.log(`¡Service Worker activado y actualizado`);
  });
  
  /* // If the loader is already loaded, just stop.
  if (!self.define) {
    let registry = {};
  
    // Used for `eval` and `importScripts` where we can't get script URL by other means.
    // In both cases, it's safe to use a global var because those functions are synchronous.
    let nextDefineUri;
  
    const singleRequire = (uri, parentUri) => {
      uri = new URL(uri + ".js", parentUri).href;
      return (
        registry[uri] ||
        new Promise((resolve) => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        }).then(() => {
          let promise = registry[uri];
          if (!promise) {
            throw new Error(`Module ${uri} didn’t register its module`);
          }
          return promise;
        })
      );
    };
  
    self.define = (depsNames, factory) => {
      const uri =
        nextDefineUri ||
        ("document" in self ? document.currentScript.src : "") ||
        location.href;
      if (registry[uri]) {
        // Module is already loading or loaded.
        return;
      }
      let exports = {};
      const require = (depUri) => singleRequire(depUri, uri);
      const specialDeps = {
        module: { uri },
        exports,
        require,
      };
      registry[uri] = Promise.all(
        depsNames.map((depName) => specialDeps[depName] || require(depName))
      ).then((deps) => {
        factory(...deps);
        return exports;
      });
    };
  } */
  
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  /* precacheAndRoute(
    [
      {
        url: "registerSW.js",
        revision: "3ca0b8505b4bec776b69afdba2768812",
      },
      {
        revision: 2,
        url: "index.html",
      },
    ],
    {}
  );
  cleanupOutdatedCaches();
  registerRoute(
    new NavigationRoute(createHandlerBoundToURL("index.html"), {
      allowlist: [/^\/$/],
    })
  );
   */
  