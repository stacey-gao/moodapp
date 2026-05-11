import { __async, __spreadProps, __spreadValues } from "@nf-internal/chunk-WDMUDEB6";
// node_modules/@angular/platform-browser/fesm2022/_browser-chunk.mjs
import { \u0275DomAdapter as _DomAdapter, \u0275setRootDomAdapter as _setRootDomAdapter, \u0275parseCookieValue as _parseCookieValue, \u0275getDOM as _getDOM2, DOCUMENT as DOCUMENT2, CommonModule, XhrFactory, \u0275PLATFORM_BROWSER_ID as _PLATFORM_BROWSER_ID } from "@angular/common";
import * as i02 from "@angular/core";
import { \u0275global as _global, \u0275RuntimeError as _RuntimeError2, Injectable as Injectable2, Inject as Inject2, inject, InjectionToken as InjectionToken2, ApplicationModule, \u0275INJECTOR_SCOPE as _INJECTOR_SCOPE, ErrorHandler, RendererFactory2, \u0275TESTABILITY_GETTER as _TESTABILITY_GETTER, Testability, \u0275TESTABILITY as _TESTABILITY, \u0275internalCreateApplication as _internalCreateApplication, createPlatformFactory, platformCore, PLATFORM_ID as PLATFORM_ID2, PLATFORM_INITIALIZER, \u0275resolveComponentResources as _resolveComponentResources, \u0275setDocument as _setDocument, NgModule } from "@angular/core";
// node_modules/@angular/platform-browser/fesm2022/_dom_renderer-chunk.mjs
import { DOCUMENT, \u0275getDOM as _getDOM } from "@angular/common";
import * as i0 from "@angular/core";
import { Inject, Injectable, InjectionToken, \u0275RuntimeError as _RuntimeError, APP_ID, CSP_NONCE, PLATFORM_ID, Optional, ViewEncapsulation, \u0275TracingService as _TracingService, RendererStyleFlags2, \u0275allLeavingAnimations as _allLeavingAnimations } from "@angular/core";
var EventManagerPlugin = class {
    _doc;
    constructor(_doc) {
        this._doc = _doc;
    }
    manager;
};
var DomEventsPlugin = class _DomEventsPlugin extends EventManagerPlugin {
    constructor(doc) {
        super(doc);
    }
    supports(eventName) {
        return true;
    }
    addEventListener(element, eventName, handler, options) {
        element.addEventListener(eventName, handler, options);
        return () => this.removeEventListener(element, eventName, handler, options);
    }
    removeEventListener(target, eventName, callback, options) {
        return target.removeEventListener(eventName, callback, options);
    }
    static \u0275fac = function DomEventsPlugin_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || _DomEventsPlugin)(i0.\u0275\u0275inject(DOCUMENT));
    };
    static \u0275prov = /* @__PURE__ */ i0.\u0275\u0275defineInjectable({
        token: _DomEventsPlugin,
        factory: _DomEventsPlugin.\u0275fac
    });
};
(() => {
    i0.\u0275setClassMetadata(DomEventsPlugin, [{
            type: Injectable
        }], () => [{
            type: void 0,
            decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }]
        }], null);
})();
var EVENT_MANAGER_PLUGINS = new InjectionToken(true ? "EventManagerPlugins" : "");
var EventManager = class _EventManager {
    _zone;
    _plugins;
    _eventNameToPlugin = /* @__PURE__ */ new Map();
    constructor(plugins, _zone) {
        this._zone = _zone;
        plugins.forEach((plugin) => {
            plugin.manager = this;
        });
        const otherPlugins = plugins.filter((p) => !(p instanceof DomEventsPlugin));
        this._plugins = otherPlugins.slice().reverse();
        const domEventPlugin = plugins.find((p) => p instanceof DomEventsPlugin);
        if (domEventPlugin) {
            this._plugins.push(domEventPlugin);
        }
    }
    addEventListener(element, eventName, handler, options) {
        const plugin = this._findPluginFor(eventName);
        return plugin.addEventListener(element, eventName, handler, options);
    }
    getZone() {
        return this._zone;
    }
    _findPluginFor(eventName) {
        let plugin = this._eventNameToPlugin.get(eventName);
        if (plugin) {
            return plugin;
        }
        const plugins = this._plugins;
        plugin = plugins.find((plugin2) => plugin2.supports(eventName));
        if (!plugin) {
            throw new _RuntimeError(5101, `No event manager plugin found for event ${eventName}`);
        }
        this._eventNameToPlugin.set(eventName, plugin);
        return plugin;
    }
    static \u0275fac = function EventManager_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || _EventManager)(i0.\u0275\u0275inject(EVENT_MANAGER_PLUGINS), i0.\u0275\u0275inject(i0.NgZone));
    };
    static \u0275prov = /* @__PURE__ */ i0.\u0275\u0275defineInjectable({
        token: _EventManager,
        factory: _EventManager.\u0275fac
    });
};
(() => {
    i0.\u0275setClassMetadata(EventManager, [{
            type: Injectable
        }], () => [{
            type: void 0,
            decorators: [{
                    type: Inject,
                    args: [EVENT_MANAGER_PLUGINS]
                }]
        }, {
            type: i0.NgZone
        }], null);
})();
var APP_ID_ATTRIBUTE_NAME = "ng-app-id";
function removeElements(elements) {
    for (const element of elements) {
        element.remove();
    }
}
function createStyleElement(style, doc) {
    const styleElement = doc.createElement("style");
    styleElement.textContent = style;
    return styleElement;
}
function addServerStyles(doc, appId, inline, external) {
    const elements = doc.head?.querySelectorAll(`style[${APP_ID_ATTRIBUTE_NAME}="${appId}"],link[${APP_ID_ATTRIBUTE_NAME}="${appId}"]`);
    if (elements) {
        for (const styleElement of elements) {
            styleElement.removeAttribute(APP_ID_ATTRIBUTE_NAME);
            if (styleElement instanceof HTMLLinkElement) {
                external.set(styleElement.href.slice(styleElement.href.lastIndexOf("/") + 1), {
                    usage: 0,
                    elements: [styleElement]
                });
            }
            else if (styleElement.textContent) {
                inline.set(styleElement.textContent, {
                    usage: 0,
                    elements: [styleElement]
                });
            }
        }
    }
}
function createLinkElement(url, doc) {
    const linkElement = doc.createElement("link");
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("href", url);
    return linkElement;
}
var SharedStylesHost = class _SharedStylesHost {
    doc;
    appId;
    nonce;
    inline = /* @__PURE__ */ new Map();
    external = /* @__PURE__ */ new Map();
    hosts = /* @__PURE__ */ new Set();
    constructor(doc, appId, nonce, platformId = {}) {
        this.doc = doc;
        this.appId = appId;
        this.nonce = nonce;
        addServerStyles(doc, appId, this.inline, this.external);
        this.hosts.add(doc.head);
    }
    addStyles(styles, urls) {
        for (const value of styles) {
            this.addUsage(value, this.inline, createStyleElement);
        }
        urls?.forEach((value) => this.addUsage(value, this.external, createLinkElement));
    }
    removeStyles(styles, urls) {
        for (const value of styles) {
            this.removeUsage(value, this.inline);
        }
        urls?.forEach((value) => this.removeUsage(value, this.external));
    }
    addUsage(value, usages, creator) {
        const record = usages.get(value);
        if (record) {
            if (record.usage === 0) {
                record.elements.forEach((element) => element.setAttribute("ng-style-reused", ""));
            }
            record.usage++;
        }
        else {
            usages.set(value, {
                usage: 1,
                elements: [...this.hosts].map((host) => this.addElement(host, creator(value, this.doc)))
            });
        }
    }
    removeUsage(value, usages) {
        const record = usages.get(value);
        if (record) {
            record.usage--;
            if (record.usage <= 0) {
                removeElements(record.elements);
                usages.delete(value);
            }
        }
    }
    ngOnDestroy() {
        for (const [, { elements }] of [...this.inline, ...this.external]) {
            removeElements(elements);
        }
        this.hosts.clear();
    }
    addHost(hostNode) {
        this.hosts.add(hostNode);
        for (const [style, { elements }] of this.inline) {
            elements.push(this.addElement(hostNode, createStyleElement(style, this.doc)));
        }
        for (const [url, { elements }] of this.external) {
            elements.push(this.addElement(hostNode, createLinkElement(url, this.doc)));
        }
    }
    removeHost(hostNode) {
        this.hosts.delete(hostNode);
    }
    addElement(host, element) {
        if (this.nonce) {
            element.setAttribute("nonce", this.nonce);
        }
        if (typeof ngServerMode !== "undefined" && ngServerMode) {
            element.setAttribute(APP_ID_ATTRIBUTE_NAME, this.appId);
        }
        return host.appendChild(element);
    }
    static \u0275fac = function SharedStylesHost_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || _SharedStylesHost)(i0.\u0275\u0275inject(DOCUMENT), i0.\u0275\u0275inject(APP_ID), i0.\u0275\u0275inject(CSP_NONCE, 8), i0.\u0275\u0275inject(PLATFORM_ID));
    };
    static \u0275prov = /* @__PURE__ */ i0.\u0275\u0275defineInjectable({
        token: _SharedStylesHost,
        factory: _SharedStylesHost.\u0275fac
    });
};
(() => {
    i0.\u0275setClassMetadata(SharedStylesHost, [{
            type: Injectable
        }], () => [{
            type: Document,
            decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }]
        }, {
            type: void 0,
            decorators: [{
                    type: Inject,
                    args: [APP_ID]
                }]
        }, {
            type: void 0,
            decorators: [{
                    type: Inject,
                    args: [CSP_NONCE]
                }, {
                    type: Optional
                }]
        }, {
            type: void 0,
            decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }]
        }], null);
})();
var NAMESPACE_URIS = {
    "svg": "http://www.w3.org/2000/svg",
    "xhtml": "http://www.w3.org/1999/xhtml",
    "xlink": "http://www.w3.org/1999/xlink",
    "xml": "http://www.w3.org/XML/1998/namespace",
    "xmlns": "http://www.w3.org/2000/xmlns/",
    "math": "http://www.w3.org/1998/Math/MathML"
};
var COMPONENT_REGEX = /%COMP%/g;
var SOURCEMAP_URL_REGEXP = /\/\*#\s*sourceMappingURL=(.+?)\s*\*\//;
var PROTOCOL_REGEXP = /^https?:/;
var COMPONENT_VARIABLE = "%COMP%";
var HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
var CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
var REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT = true;
var REMOVE_STYLES_ON_COMPONENT_DESTROY = new InjectionToken(true ? "RemoveStylesOnCompDestroy" : "", {
    factory: () => REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT
});
function shimContentAttribute(componentShortId) {
    return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimHostAttribute(componentShortId) {
    return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimStylesContent(compId, styles) {
    return styles.map((s) => s.replace(COMPONENT_REGEX, compId));
}
function addBaseHrefToCssSourceMap(baseHref, styles) {
    if (!baseHref) {
        return styles;
    }
    const absoluteBaseHrefUrl = new URL(baseHref, "http://localhost");
    return styles.map((cssContent) => {
        if (!cssContent.includes("sourceMappingURL=")) {
            return cssContent;
        }
        return cssContent.replace(SOURCEMAP_URL_REGEXP, (_, sourceMapUrl) => {
            if (sourceMapUrl[0] === "/" || sourceMapUrl.startsWith("data:") || PROTOCOL_REGEXP.test(sourceMapUrl)) {
                return `/*# sourceMappingURL=${sourceMapUrl} */`;
            }
            const { pathname: resolvedSourceMapUrl } = new URL(sourceMapUrl, absoluteBaseHrefUrl);
            return `/*# sourceMappingURL=${resolvedSourceMapUrl} */`;
        });
    });
}
var DomRendererFactory2 = class _DomRendererFactory2 {
    eventManager;
    sharedStylesHost;
    appId;
    removeStylesOnCompDestroy;
    doc;
    ngZone;
    nonce;
    tracingService;
    rendererByCompId = /* @__PURE__ */ new Map();
    defaultRenderer;
    constructor(eventManager, sharedStylesHost, appId, removeStylesOnCompDestroy, doc, ngZone, nonce = null, tracingService = null) {
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.appId = appId;
        this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
        this.doc = doc;
        this.ngZone = ngZone;
        this.nonce = nonce;
        this.tracingService = tracingService;
        this.defaultRenderer = new DefaultDomRenderer2(eventManager, doc, ngZone, this.tracingService);
    }
    createRenderer(element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
        }
        if (typeof ngServerMode !== "undefined" && ngServerMode && (type.encapsulation === ViewEncapsulation.ShadowDom || type.encapsulation === ViewEncapsulation.ExperimentalIsolatedShadowDom)) {
            type = __spreadProps(__spreadValues({}, type), {
                encapsulation: ViewEncapsulation.Emulated
            });
        }
        const renderer = this.getOrCreateRenderer(element, type);
        if (renderer instanceof EmulatedEncapsulationDomRenderer2) {
            renderer.applyToHost(element);
        }
        else if (renderer instanceof NoneEncapsulationDomRenderer) {
            renderer.applyStyles();
        }
        return renderer;
    }
    getOrCreateRenderer(element, type) {
        const rendererByCompId = this.rendererByCompId;
        let renderer = rendererByCompId.get(type.id);
        if (!renderer) {
            const doc = this.doc;
            const ngZone = this.ngZone;
            const eventManager = this.eventManager;
            const sharedStylesHost = this.sharedStylesHost;
            const removeStylesOnCompDestroy = this.removeStylesOnCompDestroy;
            const tracingService = this.tracingService;
            switch (type.encapsulation) {
                case ViewEncapsulation.Emulated:
                    renderer = new EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, type, this.appId, removeStylesOnCompDestroy, doc, ngZone, tracingService);
                    break;
                case ViewEncapsulation.ShadowDom:
                    return new ShadowDomRenderer(eventManager, element, type, doc, ngZone, this.nonce, tracingService, sharedStylesHost);
                case ViewEncapsulation.ExperimentalIsolatedShadowDom:
                    return new ShadowDomRenderer(eventManager, element, type, doc, ngZone, this.nonce, tracingService);
                default:
                    renderer = new NoneEncapsulationDomRenderer(eventManager, sharedStylesHost, type, removeStylesOnCompDestroy, doc, ngZone, tracingService);
                    break;
            }
            rendererByCompId.set(type.id, renderer);
        }
        return renderer;
    }
    ngOnDestroy() {
        this.rendererByCompId.clear();
    }
    componentReplaced(componentId) {
        this.rendererByCompId.delete(componentId);
    }
    static \u0275fac = function DomRendererFactory2_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || _DomRendererFactory2)(i0.\u0275\u0275inject(EventManager), i0.\u0275\u0275inject(SharedStylesHost), i0.\u0275\u0275inject(APP_ID), i0.\u0275\u0275inject(REMOVE_STYLES_ON_COMPONENT_DESTROY), i0.\u0275\u0275inject(DOCUMENT), i0.\u0275\u0275inject(i0.NgZone), i0.\u0275\u0275inject(CSP_NONCE), i0.\u0275\u0275inject(_TracingService, 8));
    };
    static \u0275prov = /* @__PURE__ */ i0.\u0275\u0275defineInjectable({
        token: _DomRendererFactory2,
        factory: _DomRendererFactory2.\u0275fac
    });
};
(() => {
    i0.\u0275setClassMetadata(DomRendererFactory2, [{
            type: Injectable
        }], () => [{
            type: EventManager
        }, {
            type: SharedStylesHost
        }, {
            type: void 0,
            decorators: [{
                    type: Inject,
                    args: [APP_ID]
                }]
        }, {
            type: void 0,
            decorators: [{
                    type: Inject,
                    args: [REMOVE_STYLES_ON_COMPONENT_DESTROY]
                }]
        }, {
            type: Document,
            decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }]
        }, {
            type: i0.NgZone
        }, {
            type: void 0,
            decorators: [{
                    type: Inject,
                    args: [CSP_NONCE]
                }]
        }, {
            type: i0.\u0275TracingService,
            decorators: [{
                    type: Inject,
                    args: [_TracingService]
                }, {
                    type: Optional
                }]
        }], null);
})();
var DefaultDomRenderer2 = class {
    eventManager;
    doc;
    ngZone;
    tracingService;
    data = /* @__PURE__ */ Object.create(null);
    throwOnSyntheticProps = true;
    constructor(eventManager, doc, ngZone, tracingService) {
        this.eventManager = eventManager;
        this.doc = doc;
        this.ngZone = ngZone;
        this.tracingService = tracingService;
    }
    destroy() {
    }
    destroyNode = null;
    createElement(name, namespace) {
        if (namespace) {
            return this.doc.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
        }
        return this.doc.createElement(name);
    }
    createComment(value) {
        return this.doc.createComment(value);
    }
    createText(value) {
        return this.doc.createTextNode(value);
    }
    appendChild(parent, newChild) {
        const targetParent = isTemplateNode(parent) ? parent.content : parent;
        targetParent.appendChild(newChild);
    }
    insertBefore(parent, newChild, refChild) {
        if (parent) {
            const targetParent = isTemplateNode(parent) ? parent.content : parent;
            targetParent.insertBefore(newChild, refChild);
        }
    }
    removeChild(_parent, oldChild) {
        oldChild.remove();
    }
    selectRootElement(selectorOrNode, preserveContent) {
        let el = typeof selectorOrNode === "string" ? this.doc.querySelector(selectorOrNode) : selectorOrNode;
        if (!el) {
            throw new _RuntimeError(-5104, `The selector "${selectorOrNode}" did not match any elements`);
        }
        if (!preserveContent) {
            el.textContent = "";
        }
        return el;
    }
    parentNode(node) {
        return node.parentNode;
    }
    nextSibling(node) {
        return node.nextSibling;
    }
    setAttribute(el, name, value, namespace) {
        if (namespace) {
            name = namespace + ":" + name;
            const namespaceUri = NAMESPACE_URIS[namespace];
            if (namespaceUri) {
                el.setAttributeNS(namespaceUri, name, value);
            }
            else {
                el.setAttribute(name, value);
            }
        }
        else {
            el.setAttribute(name, value);
        }
    }
    removeAttribute(el, name, namespace) {
        if (namespace) {
            const namespaceUri = NAMESPACE_URIS[namespace];
            if (namespaceUri) {
                el.removeAttributeNS(namespaceUri, name);
            }
            else {
                el.removeAttribute(`${namespace}:${name}`);
            }
        }
        else {
            el.removeAttribute(name);
        }
    }
    addClass(el, name) {
        el.classList.add(name);
    }
    removeClass(el, name) {
        el.classList.remove(name);
    }
    setStyle(el, style, value, flags) {
        if (flags & (RendererStyleFlags2.DashCase | RendererStyleFlags2.Important)) {
            el.style.setProperty(style, value, flags & RendererStyleFlags2.Important ? "important" : "");
        }
        else {
            el.style[style] = value;
        }
    }
    removeStyle(el, style, flags) {
        if (flags & RendererStyleFlags2.DashCase) {
            el.style.removeProperty(style);
        }
        else {
            el.style[style] = "";
        }
    }
    setProperty(el, name, value) {
        if (el == null) {
            return;
        }
        this.throwOnSyntheticProps && checkNoSyntheticProp(name, "property");
        el[name] = value;
    }
    setValue(node, value) {
        node.nodeValue = value;
    }
    listen(target, event, callback, options) {
        this.throwOnSyntheticProps && checkNoSyntheticProp(event, "listener");
        if (typeof target === "string") {
            target = _getDOM().getGlobalEventTarget(this.doc, target);
            if (!target) {
                throw new _RuntimeError(5102, `Unsupported event target ${target} for event ${event}`);
            }
        }
        let wrappedCallback = this.decoratePreventDefault(callback);
        if (this.tracingService?.wrapEventListener) {
            wrappedCallback = this.tracingService.wrapEventListener(target, event, wrappedCallback);
        }
        return this.eventManager.addEventListener(target, event, wrappedCallback, options);
    }
    decoratePreventDefault(eventHandler) {
        return (event) => {
            if (event === "__ngUnwrap__") {
                return eventHandler;
            }
            const allowDefaultBehavior = typeof ngServerMode !== "undefined" && ngServerMode ? this.ngZone.runGuarded(() => eventHandler(event)) : eventHandler(event);
            if (allowDefaultBehavior === false) {
                event.preventDefault();
            }
            return void 0;
        };
    }
};
var AT_CHARCODE = (() => "@".charCodeAt(0))();
function checkNoSyntheticProp(name, nameKind) {
    if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new _RuntimeError(5105, `Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Make sure \`provideAnimationsAsync()\`, \`provideAnimations()\` or \`provideNoopAnimations()\` call was added to a list of providers used to bootstrap an application.
  - There is a corresponding animation configuration named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.dev/api/core/Component#animations).`);
    }
}
function isTemplateNode(node) {
    return node.tagName === "TEMPLATE" && node.content !== void 0;
}
var ShadowDomRenderer = class extends DefaultDomRenderer2 {
    hostEl;
    sharedStylesHost;
    shadowRoot;
    constructor(eventManager, hostEl, component, doc, ngZone, nonce, tracingService, sharedStylesHost) {
        super(eventManager, doc, ngZone, tracingService);
        this.hostEl = hostEl;
        this.sharedStylesHost = sharedStylesHost;
        this.shadowRoot = hostEl.attachShadow({
            mode: "open"
        });
        if (this.sharedStylesHost) {
            this.sharedStylesHost.addHost(this.shadowRoot);
        }
        let styles = component.styles;
        if (true) {
            const baseHref = _getDOM().getBaseHref(doc) ?? "";
            styles = addBaseHrefToCssSourceMap(baseHref, styles);
        }
        styles = shimStylesContent(component.id, styles);
        for (const style of styles) {
            const styleEl = document.createElement("style");
            if (nonce) {
                styleEl.setAttribute("nonce", nonce);
            }
            styleEl.textContent = style;
            this.shadowRoot.appendChild(styleEl);
        }
        const styleUrls = component.getExternalStyles?.();
        if (styleUrls) {
            for (const styleUrl of styleUrls) {
                const linkEl = createLinkElement(styleUrl, doc);
                if (nonce) {
                    linkEl.setAttribute("nonce", nonce);
                }
                this.shadowRoot.appendChild(linkEl);
            }
        }
    }
    nodeOrShadowRoot(node) {
        return node === this.hostEl ? this.shadowRoot : node;
    }
    appendChild(parent, newChild) {
        return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
    }
    insertBefore(parent, newChild, refChild) {
        return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
    }
    removeChild(_parent, oldChild) {
        return super.removeChild(null, oldChild);
    }
    parentNode(node) {
        return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
    }
    destroy() {
        if (this.sharedStylesHost) {
            this.sharedStylesHost.removeHost(this.shadowRoot);
        }
    }
};
var NoneEncapsulationDomRenderer = class extends DefaultDomRenderer2 {
    sharedStylesHost;
    removeStylesOnCompDestroy;
    styles;
    styleUrls;
    constructor(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, tracingService, compId) {
        super(eventManager, doc, ngZone, tracingService);
        this.sharedStylesHost = sharedStylesHost;
        this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
        let styles = component.styles;
        if (true) {
            const baseHref = _getDOM().getBaseHref(doc) ?? "";
            styles = addBaseHrefToCssSourceMap(baseHref, styles);
        }
        this.styles = compId ? shimStylesContent(compId, styles) : styles;
        this.styleUrls = component.getExternalStyles?.(compId);
    }
    applyStyles() {
        this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
    }
    destroy() {
        if (!this.removeStylesOnCompDestroy) {
            return;
        }
        if (_allLeavingAnimations.size === 0) {
            this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
        }
    }
};
var EmulatedEncapsulationDomRenderer2 = class extends NoneEncapsulationDomRenderer {
    contentAttr;
    hostAttr;
    constructor(eventManager, sharedStylesHost, component, appId, removeStylesOnCompDestroy, doc, ngZone, tracingService) {
        const compId = appId + "-" + component.id;
        super(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, tracingService, compId);
        this.contentAttr = shimContentAttribute(compId);
        this.hostAttr = shimHostAttribute(compId);
    }
    applyToHost(element) {
        this.applyStyles();
        this.setAttribute(element, this.hostAttr, "");
    }
    createElement(parent, name) {
        const el = super.createElement(parent, name);
        super.setAttribute(el, this.contentAttr, "");
        return el;
    }
};
// node_modules/@angular/platform-browser/fesm2022/_browser-chunk.mjs
var BrowserDomAdapter = class _BrowserDomAdapter extends _DomAdapter {
    supportsDOMEvents = true;
    static makeCurrent() {
        _setRootDomAdapter(new _BrowserDomAdapter());
    }
    onAndCancel(el, evt, listener, options) {
        el.addEventListener(evt, listener, options);
        return () => {
            el.removeEventListener(evt, listener, options);
        };
    }
    dispatchEvent(el, evt) {
        el.dispatchEvent(evt);
    }
    remove(node) {
        node.remove();
    }
    createElement(tagName, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createElement(tagName);
    }
    createHtmlDocument() {
        return document.implementation.createHTMLDocument("fakeTitle");
    }
    getDefaultDocument() {
        return document;
    }
    isElementNode(node) {
        return node.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(node) {
        return node instanceof DocumentFragment;
    }
    getGlobalEventTarget(doc, target) {
        if (target === "window") {
            return window;
        }
        if (target === "document") {
            return doc;
        }
        if (target === "body") {
            return doc.body;
        }
        return null;
    }
    getBaseHref(doc) {
        const href = getBaseElementHref();
        return href == null ? null : relativePath(href);
    }
    resetBaseElement() {
        baseElement = null;
    }
    getUserAgent() {
        return window.navigator.userAgent;
    }
    getCookie(name) {
        return _parseCookieValue(document.cookie, name);
    }
};
var baseElement = null;
function getBaseElementHref() {
    baseElement = baseElement || document.head.querySelector("base");
    return baseElement ? baseElement.getAttribute("href") : null;
}
function relativePath(url) {
    return new URL(url, document.baseURI).pathname;
}
var BrowserGetTestability = class {
    addToWindow(registry) {
        _global["getAngularTestability"] = (elem, findInAncestors = true) => {
            const testability = registry.findTestabilityInTree(elem, findInAncestors);
            if (testability == null) {
                throw new _RuntimeError2(5103, "Could not find testability for element.");
            }
            return testability;
        };
        _global["getAllAngularTestabilities"] = () => registry.getAllTestabilities();
        _global["getAllAngularRootElements"] = () => registry.getAllRootElements();
        const whenAllStable = (callback) => {
            const testabilities = _global["getAllAngularTestabilities"]();
            let count = testabilities.length;
            const decrement = function () {
                count--;
                if (count == 0) {
                    callback();
                }
            };
            testabilities.forEach((testability) => {
                testability.whenStable(decrement);
            });
        };
        if (!_global["frameworkStabilizers"]) {
            _global["frameworkStabilizers"] = [];
        }
        _global["frameworkStabilizers"].push(whenAllStable);
    }
    findTestabilityInTree(registry, elem, findInAncestors) {
        if (elem == null) {
            return null;
        }
        const t = registry.getTestability(elem);
        if (t != null) {
            return t;
        }
        else if (!findInAncestors) {
            return null;
        }
        if (_getDOM2().isShadowRoot(elem)) {
            return this.findTestabilityInTree(registry, elem.host, true);
        }
        return this.findTestabilityInTree(registry, elem.parentElement, true);
    }
};
var BrowserXhr = class _BrowserXhr {
    build() {
        return new XMLHttpRequest();
    }
    static \u0275fac = function BrowserXhr_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || _BrowserXhr)();
    };
    static \u0275prov = /* @__PURE__ */ i02.\u0275\u0275defineInjectable({
        token: _BrowserXhr,
        factory: _BrowserXhr.\u0275fac
    });
};
(() => {
    i02.\u0275setClassMetadata(BrowserXhr, [{
            type: Injectable2
        }], null, null);
})();
var MODIFIER_KEYS = ["alt", "control", "meta", "shift"];
var _keyMap = {
    "\b": "Backspace",
    "	": "Tab",
    "\x7F": "Delete",
    "\x1B": "Escape",
    "Del": "Delete",
    "Esc": "Escape",
    "Left": "ArrowLeft",
    "Right": "ArrowRight",
    "Up": "ArrowUp",
    "Down": "ArrowDown",
    "Menu": "ContextMenu",
    "Scroll": "ScrollLock",
    "Win": "OS"
};
var MODIFIER_KEY_GETTERS = {
    "alt": (event) => event.altKey,
    "control": (event) => event.ctrlKey,
    "meta": (event) => event.metaKey,
    "shift": (event) => event.shiftKey
};
var KeyEventsPlugin = class _KeyEventsPlugin extends EventManagerPlugin {
    constructor(doc) {
        super(doc);
    }
    supports(eventName) {
        return _KeyEventsPlugin.parseEventName(eventName) != null;
    }
    addEventListener(element, eventName, handler, options) {
        const parsedEvent = _KeyEventsPlugin.parseEventName(eventName);
        const outsideHandler = _KeyEventsPlugin.eventCallback(parsedEvent["fullKey"], handler, this.manager.getZone());
        return this.manager.getZone().runOutsideAngular(() => {
            return _getDOM2().onAndCancel(element, parsedEvent["domEventName"], outsideHandler, options);
        });
    }
    static parseEventName(eventName) {
        const parts = eventName.toLowerCase().split(".");
        const domEventName = parts.shift();
        if (parts.length === 0 || !(domEventName === "keydown" || domEventName === "keyup")) {
            return null;
        }
        const key = _KeyEventsPlugin._normalizeKey(parts.pop());
        let fullKey = "";
        let codeIX = parts.indexOf("code");
        if (codeIX > -1) {
            parts.splice(codeIX, 1);
            fullKey = "code.";
        }
        MODIFIER_KEYS.forEach((modifierName) => {
            const index = parts.indexOf(modifierName);
            if (index > -1) {
                parts.splice(index, 1);
                fullKey += modifierName + ".";
            }
        });
        fullKey += key;
        if (parts.length != 0 || key.length === 0) {
            return null;
        }
        const result = {};
        result["domEventName"] = domEventName;
        result["fullKey"] = fullKey;
        return result;
    }
    static matchEventFullKeyCode(event, fullKeyCode) {
        let keycode = _keyMap[event.key] || event.key;
        let key = "";
        if (fullKeyCode.indexOf("code.") > -1) {
            keycode = event.code;
            key = "code.";
        }
        if (keycode == null || !keycode)
            return false;
        keycode = keycode.toLowerCase();
        if (keycode === " ") {
            keycode = "space";
        }
        else if (keycode === ".") {
            keycode = "dot";
        }
        MODIFIER_KEYS.forEach((modifierName) => {
            if (modifierName !== keycode) {
                const modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
                if (modifierGetter(event)) {
                    key += modifierName + ".";
                }
            }
        });
        key += keycode;
        return key === fullKeyCode;
    }
    static eventCallback(fullKey, handler, zone) {
        return (event) => {
            if (_KeyEventsPlugin.matchEventFullKeyCode(event, fullKey)) {
                zone.runGuarded(() => handler(event));
            }
        };
    }
    static _normalizeKey(keyName) {
        return keyName === "esc" ? "escape" : keyName;
    }
    static \u0275fac = function KeyEventsPlugin_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || _KeyEventsPlugin)(i02.\u0275\u0275inject(DOCUMENT2));
    };
    static \u0275prov = /* @__PURE__ */ i02.\u0275\u0275defineInjectable({
        token: _KeyEventsPlugin,
        factory: _KeyEventsPlugin.\u0275fac
    });
};
(() => {
    i02.\u0275setClassMetadata(KeyEventsPlugin, [{
            type: Injectable2
        }], () => [{
            type: void 0,
            decorators: [{
                    type: Inject2,
                    args: [DOCUMENT2]
                }]
        }], null);
})();
function bootstrapApplication(rootComponent, options, context) {
    return __async(this, null, function* () {
        const config = __spreadValues({
            rootComponent
        }, createProvidersConfig(options, context));
        if (false) {
            yield resolveJitResources();
        }
        return _internalCreateApplication(config);
    });
}
function createApplication(options, context) {
    return __async(this, null, function* () {
        if (false) {
            yield resolveJitResources();
        }
        return _internalCreateApplication(createProvidersConfig(options, context));
    });
}
function createProvidersConfig(options, context) {
    return {
        platformRef: context?.platformRef,
        appProviders: [...BROWSER_MODULE_PROVIDERS, ...options?.providers ?? []],
        platformProviders: INTERNAL_BROWSER_PLATFORM_PROVIDERS
    };
}
function provideProtractorTestingSupport() {
    return [...TESTABILITY_PROVIDERS];
}
function initDomAdapter() {
    BrowserDomAdapter.makeCurrent();
}
function errorHandler() {
    return new ErrorHandler();
}
function _document() {
    _setDocument(document);
    return document;
}
var INTERNAL_BROWSER_PLATFORM_PROVIDERS = [{
        provide: PLATFORM_ID2,
        useValue: _PLATFORM_BROWSER_ID
    }, {
        provide: PLATFORM_INITIALIZER,
        useValue: initDomAdapter,
        multi: true
    }, {
        provide: DOCUMENT2,
        useFactory: _document
    }];
var platformBrowser = createPlatformFactory(platformCore, "browser", INTERNAL_BROWSER_PLATFORM_PROVIDERS);
var BROWSER_MODULE_PROVIDERS_MARKER = new InjectionToken2(true ? "BrowserModule Providers Marker" : "");
var TESTABILITY_PROVIDERS = [{
        provide: _TESTABILITY_GETTER,
        useClass: BrowserGetTestability
    }, {
        provide: _TESTABILITY,
        useClass: Testability
    }, {
        provide: Testability,
        useClass: Testability
    }];
var BROWSER_MODULE_PROVIDERS = [{
        provide: _INJECTOR_SCOPE,
        useValue: "root"
    }, {
        provide: ErrorHandler,
        useFactory: errorHandler
    }, {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: DomEventsPlugin,
        multi: true
    }, {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: KeyEventsPlugin,
        multi: true
    }, DomRendererFactory2, SharedStylesHost, EventManager, {
        provide: RendererFactory2,
        useExisting: DomRendererFactory2
    }, {
        provide: XhrFactory,
        useClass: BrowserXhr
    }, true ? {
        provide: BROWSER_MODULE_PROVIDERS_MARKER,
        useValue: true
    } : []];
var BrowserModule = class _BrowserModule {
    constructor() {
        if (true) {
            const providersAlreadyPresent = inject(BROWSER_MODULE_PROVIDERS_MARKER, {
                optional: true,
                skipSelf: true
            });
            if (providersAlreadyPresent) {
                throw new _RuntimeError2(5100, `Providers from the \`BrowserModule\` have already been loaded. If you need access to common directives such as NgIf and NgFor, import the \`CommonModule\` instead.`);
            }
        }
    }
    static \u0275fac = function BrowserModule_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || _BrowserModule)();
    };
    static \u0275mod = /* @__PURE__ */ i02.\u0275\u0275defineNgModule({
        type: _BrowserModule
    });
    static \u0275inj = /* @__PURE__ */ i02.\u0275\u0275defineInjector({
        providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS],
        imports: [CommonModule, ApplicationModule]
    });
};
(() => {
    i02.\u0275setClassMetadata(BrowserModule, [{
            type: NgModule,
            args: [{
                    providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS],
                    exports: [CommonModule, ApplicationModule]
                }]
        }], () => [], null);
})();
// node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs
import { \u0275getDOM as _getDOM3, DOCUMENT as DOCUMENT3 } from "@angular/common";
import { \u0275getDOM } from "@angular/common";
import * as i03 from "@angular/core";
import { Inject as Inject3, Injectable as Injectable3, \u0275global as _global2, ApplicationRef, InjectionToken as InjectionToken3, Injector as Injector2, Optional as Optional2, \u0275Console as _Console, NgModule as NgModule2, \u0275RuntimeError as _RuntimeError3, \u0275XSS_SECURITY_URL as _XSS_SECURITY_URL, SecurityContext, \u0275allowSanitizationBypassAndThrow as _allowSanitizationBypassAndThrow, \u0275unwrapSafeValue as _unwrapSafeValue, \u0275_sanitizeUrl as __sanitizeUrl, \u0275_sanitizeHtml as __sanitizeHtml, \u0275bypassSanitizationTrustHtml as _bypassSanitizationTrustHtml, \u0275bypassSanitizationTrustStyle as _bypassSanitizationTrustStyle, \u0275bypassSanitizationTrustScript as _bypassSanitizationTrustScript, \u0275bypassSanitizationTrustUrl as _bypassSanitizationTrustUrl, \u0275bypassSanitizationTrustResourceUrl as _bypassSanitizationTrustResourceUrl, forwardRef, makeEnvironmentProviders, provideStabilityDebugging, \u0275withDomHydration as _withDomHydration, \u0275withEventReplay as _withEventReplay, \u0275withI18nSupport as _withI18nSupport, \u0275withIncrementalHydration as _withIncrementalHydration, ENVIRONMENT_INITIALIZER, inject as inject2, \u0275IS_ENABLED_BLOCKING_INITIAL_NAVIGATION as _IS_ENABLED_BLOCKING_INITIAL_NAVIGATION, \u0275formatRuntimeError as _formatRuntimeError, Version } from "@angular/core";
import { \u0275withHttpTransferCache as _withHttpTransferCache } from "@angular/common/http";
var Meta = class _Meta {
    _doc;
    _dom;
    constructor(_doc) {
        this._doc = _doc;
        this._dom = _getDOM3();
    }
    addTag(tag, forceCreation = false) {
        if (!tag)
            return null;
        return this._getOrCreateElement(tag, forceCreation);
    }
    addTags(tags, forceCreation = false) {
        if (!tags)
            return [];
        return tags.reduce((result, tag) => {
            if (tag) {
                result.push(this._getOrCreateElement(tag, forceCreation));
            }
            return result;
        }, []);
    }
    getTag(attrSelector) {
        if (!attrSelector)
            return null;
        return this._doc.querySelector(`meta[${attrSelector}]`) || null;
    }
    getTags(attrSelector) {
        if (!attrSelector)
            return [];
        const list = this._doc.querySelectorAll(`meta[${attrSelector}]`);
        return list ? [].slice.call(list) : [];
    }
    updateTag(tag, selector) {
        if (!tag)
            return null;
        selector = selector || this._parseSelector(tag);
        const meta = this.getTag(selector);
        if (meta) {
            return this._setMetaElementAttributes(tag, meta);
        }
        return this._getOrCreateElement(tag, true);
    }
    removeTag(attrSelector) {
        this.removeTagElement(this.getTag(attrSelector));
    }
    removeTagElement(meta) {
        if (meta) {
            this._dom.remove(meta);
        }
    }
    _getOrCreateElement(meta, forceCreation = false) {
        if (!forceCreation) {
            const selector = this._parseSelector(meta);
            const elem = this.getTags(selector).filter((elem2) => this._containsAttributes(meta, elem2))[0];
            if (elem !== void 0)
                return elem;
        }
        const element = this._dom.createElement("meta");
        this._setMetaElementAttributes(meta, element);
        const head = this._doc.getElementsByTagName("head")[0];
        head.appendChild(element);
        return element;
    }
    _setMetaElementAttributes(tag, el) {
        Object.keys(tag).forEach((prop) => el.setAttribute(this._getMetaKeyMap(prop), tag[prop]));
        return el;
    }
    _parseSelector(tag) {
        const attr = tag.name ? "name" : "property";
        return `${attr}="${tag[attr]}"`;
    }
    _containsAttributes(tag, elem) {
        return Object.keys(tag).every((key) => elem.getAttribute(this._getMetaKeyMap(key)) === tag[key]);
    }
    _getMetaKeyMap(prop) {
        return META_KEYS_MAP[prop] || prop;
    }
    static \u0275fac = function Meta_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || _Meta)(i03.\u0275\u0275inject(DOCUMENT3));
    };
    static \u0275prov = /* @__PURE__ */ i03.\u0275\u0275defineInjectable({
        token: _Meta,
        factory: _Meta.\u0275fac,
        providedIn: "root"
    });
};
(() => {
    i03.\u0275setClassMetadata(Meta, [{
            type: Injectable3,
            args: [{
                    providedIn: "root"
                }]
        }], () => [{
            type: void 0,
            decorators: [{
                    type: Inject3,
                    args: [DOCUMENT3]
                }]
        }], null);
})();
var META_KEYS_MAP = {
    httpEquiv: "http-equiv"
};
var Title = class _Title {
    _doc;
    constructor(_doc) {
        this._doc = _doc;
    }
    getTitle() {
        return this._doc.title;
    }
    setTitle(newTitle) {
        this._doc.title = newTitle || "";
    }
    static \u0275fac = function Title_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || _Title)(i03.\u0275\u0275inject(DOCUMENT3));
    };
    static \u0275prov = /* @__PURE__ */ i03.\u0275\u0275defineInjectable({
        token: _Title,
        factory: _Title.\u0275fac,
        providedIn: "root"
    });
};
(() => {
    i03.\u0275setClassMetadata(Title, [{
            type: Injectable3,
            args: [{
                    providedIn: "root"
                }]
        }], () => [{
            type: void 0,
            decorators: [{
                    type: Inject3,
                    args: [DOCUMENT3]
                }]
        }], null);
})();
function exportNgVar(name, value) {
    if (typeof COMPILED === "undefined" || !COMPILED) {
        const ng = _global2["ng"] = _global2["ng"] || {};
        ng[name] = value;
    }
}
var ChangeDetectionPerfRecord = class {
    msPerTick;
    numTicks;
    constructor(msPerTick, numTicks) {
        this.msPerTick = msPerTick;
        this.numTicks = numTicks;
    }
};
var AngularProfiler = class {
    appRef;
    constructor(ref) {
        this.appRef = ref.injector.get(ApplicationRef);
    }
    timeChangeDetection(config) {
        const record = config && config["record"];
        const profileName = "Change Detection";
        if (record && "profile" in console && typeof console.profile === "function") {
            console.profile(profileName);
        }
        const start = performance.now();
        let numTicks = 0;
        while (numTicks < 5 || performance.now() - start < 500) {
            this.appRef.tick();
            numTicks++;
        }
        const end = performance.now();
        if (record && "profileEnd" in console && typeof console.profileEnd === "function") {
            console.profileEnd(profileName);
        }
        const msPerTick = (end - start) / numTicks;
        console.log(`ran ${numTicks} change detection cycles`);
        console.log(`${msPerTick.toFixed(2)} ms per check`);
        return new ChangeDetectionPerfRecord(msPerTick, numTicks);
    }
};
var PROFILER_GLOBAL_NAME = "profiler";
function enableDebugTools(ref) {
    exportNgVar(PROFILER_GLOBAL_NAME, new AngularProfiler(ref));
    return ref;
}
function disableDebugTools() {
    exportNgVar(PROFILER_GLOBAL_NAME, null);
}
var By = class {
    static all() {
        return () => true;
    }
    static css(selector) {
        return (debugElement) => {
            return debugElement.nativeElement != null ? elementMatches(debugElement.nativeElement, selector) : false;
        };
    }
    static directive(type) {
        return (debugNode) => debugNode.providerTokens.indexOf(type) !== -1;
    }
};
function elementMatches(n, selector) {
    if (_getDOM3().isElementNode(n)) {
        return n.matches && n.matches(selector) || n.msMatchesSelector && n.msMatchesSelector(selector) || n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
    }
    return false;
}
var EVENT_NAMES = {
    "pan": true,
    "panstart": true,
    "panmove": true,
    "panend": true,
    "pancancel": true,
    "panleft": true,
    "panright": true,
    "panup": true,
    "pandown": true,
    "pinch": true,
    "pinchstart": true,
    "pinchmove": true,
    "pinchend": true,
    "pinchcancel": true,
    "pinchin": true,
    "pinchout": true,
    "press": true,
    "pressup": true,
    "rotate": true,
    "rotatestart": true,
    "rotatemove": true,
    "rotateend": true,
    "rotatecancel": true,
    "swipe": true,
    "swipeleft": true,
    "swiperight": true,
    "swipeup": true,
    "swipedown": true,
    "tap": true,
    "doubletap": true
};
var HAMMER_GESTURE_CONFIG = new InjectionToken3(true ? "HammerGestureConfig" : "");
var HAMMER_LOADER = new InjectionToken3(true ? "HammerLoader" : "");
var HammerGestureConfig = class _HammerGestureConfig {
    events = [];
    overrides = {};
    options;
    buildHammer(element) {
        const mc = new Hammer(element, this.options);
        mc.get("pinch").set({
            enable: true
        });
        mc.get("rotate").set({
            enable: true
        });
        for (const eventName in this.overrides) {
            mc.get(eventName).set(this.overrides[eventName]);
        }
        return mc;
    }
    static \u0275fac = function HammerGestureConfig_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || _HammerGestureConfig)();
    };
    static \u0275prov = /* @__PURE__ */ i03.\u0275\u0275defineInjectable({
        token: _HammerGestureConfig,
        factory: _HammerGestureConfig.\u0275fac
    });
};
(() => {
    i03.\u0275setClassMetadata(HammerGestureConfig, [{
            type: Injectable3
        }], null, null);
})();
var HammerGesturesPlugin = class _HammerGesturesPlugin extends EventManagerPlugin {
    _config;
    _injector;
    loader;
    _loaderPromise = null;
    constructor(doc, _config, _injector, loader) {
        super(doc);
        this._config = _config;
        this._injector = _injector;
        this.loader = loader;
    }
    supports(eventName) {
        if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
            return false;
        }
        if (!window.Hammer && !this.loader) {
            if (true) {
                const _console = this._injector.get(_Console);
                _console.warn(`The "${eventName}" event cannot be bound because Hammer.JS is not loaded and no custom loader has been specified.`);
            }
            return false;
        }
        return true;
    }
    addEventListener(element, eventName, handler) {
        const zone = this.manager.getZone();
        eventName = eventName.toLowerCase();
        if (!window.Hammer && this.loader) {
            this._loaderPromise = this._loaderPromise || zone.runOutsideAngular(() => this.loader());
            let cancelRegistration = false;
            let deregister = () => {
                cancelRegistration = true;
            };
            zone.runOutsideAngular(() => this._loaderPromise.then(() => {
                if (!window.Hammer) {
                    if (true) {
                        const _console = this._injector.get(_Console);
                        _console.warn(`The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
                    }
                    deregister = () => {
                    };
                    return;
                }
                if (!cancelRegistration) {
                    deregister = this.addEventListener(element, eventName, handler);
                }
            }).catch(() => {
                if (true) {
                    const _console = this._injector.get(_Console);
                    _console.warn(`The "${eventName}" event cannot be bound because the custom Hammer.JS loader failed.`);
                }
                deregister = () => {
                };
            }));
            return () => {
                deregister();
            };
        }
        return zone.runOutsideAngular(() => {
            const mc = this._config.buildHammer(element);
            const callback = function (eventObj) {
                zone.runGuarded(function () {
                    handler(eventObj);
                });
            };
            mc.on(eventName, callback);
            return () => {
                mc.off(eventName, callback);
                if (typeof mc.destroy === "function") {
                    mc.destroy();
                }
            };
        });
    }
    isCustomEvent(eventName) {
        return this._config.events.indexOf(eventName) > -1;
    }
    static \u0275fac = function HammerGesturesPlugin_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || _HammerGesturesPlugin)(i03.\u0275\u0275inject(DOCUMENT3), i03.\u0275\u0275inject(HAMMER_GESTURE_CONFIG), i03.\u0275\u0275inject(i03.Injector), i03.\u0275\u0275inject(HAMMER_LOADER, 8));
    };
    static \u0275prov = /* @__PURE__ */ i03.\u0275\u0275defineInjectable({
        token: _HammerGesturesPlugin,
        factory: _HammerGesturesPlugin.\u0275fac
    });
};
(() => {
    i03.\u0275setClassMetadata(HammerGesturesPlugin, [{
            type: Injectable3
        }], () => [{
            type: void 0,
            decorators: [{
                    type: Inject3,
                    args: [DOCUMENT3]
                }]
        }, {
            type: HammerGestureConfig,
            decorators: [{
                    type: Inject3,
                    args: [HAMMER_GESTURE_CONFIG]
                }]
        }, {
            type: i03.Injector
        }, {
            type: void 0,
            decorators: [{
                    type: Optional2
                }, {
                    type: Inject3,
                    args: [HAMMER_LOADER]
                }]
        }], null);
})();
var HammerModule = class _HammerModule {
    static \u0275fac = function HammerModule_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || _HammerModule)();
    };
    static \u0275mod = /* @__PURE__ */ i03.\u0275\u0275defineNgModule({
        type: _HammerModule
    });
    static \u0275inj = /* @__PURE__ */ i03.\u0275\u0275defineInjector({
        providers: [{
                provide: EVENT_MANAGER_PLUGINS,
                useClass: HammerGesturesPlugin,
                multi: true,
                deps: [DOCUMENT3, HAMMER_GESTURE_CONFIG, Injector2, [new Optional2(), HAMMER_LOADER]]
            }, {
                provide: HAMMER_GESTURE_CONFIG,
                useClass: HammerGestureConfig
            }]
    });
};
(() => {
    i03.\u0275setClassMetadata(HammerModule, [{
            type: NgModule2,
            args: [{
                    providers: [{
                            provide: EVENT_MANAGER_PLUGINS,
                            useClass: HammerGesturesPlugin,
                            multi: true,
                            deps: [DOCUMENT3, HAMMER_GESTURE_CONFIG, Injector2, [new Optional2(), HAMMER_LOADER]]
                        }, {
                            provide: HAMMER_GESTURE_CONFIG,
                            useClass: HammerGestureConfig
                        }]
                }]
        }], null, null);
})();
var DomSanitizer = class _DomSanitizer {
    static \u0275fac = function DomSanitizer_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || _DomSanitizer)();
    };
    static \u0275prov = /* @__PURE__ */ i03.\u0275\u0275defineInjectable({
        token: _DomSanitizer,
        factory: function DomSanitizer_Factory(__ngFactoryType__) {
            let __ngConditionalFactory__ = null;
            if (__ngFactoryType__) {
                __ngConditionalFactory__ = new (__ngFactoryType__ || _DomSanitizer)();
            }
            else {
                __ngConditionalFactory__ = i03.\u0275\u0275inject(DomSanitizerImpl);
            }
            return __ngConditionalFactory__;
        },
        providedIn: "root"
    });
};
(() => {
    i03.\u0275setClassMetadata(DomSanitizer, [{
            type: Injectable3,
            args: [{
                    providedIn: "root",
                    useExisting: forwardRef(() => DomSanitizerImpl)
                }]
        }], null, null);
})();
var DomSanitizerImpl = class _DomSanitizerImpl extends DomSanitizer {
    _doc;
    constructor(_doc) {
        super();
        this._doc = _doc;
    }
    sanitize(ctx, value) {
        if (value == null)
            return null;
        switch (ctx) {
            case SecurityContext.NONE:
                return value;
            case SecurityContext.HTML:
                if (_allowSanitizationBypassAndThrow(value, "HTML")) {
                    return _unwrapSafeValue(value);
                }
                return __sanitizeHtml(this._doc, String(value)).toString();
            case SecurityContext.STYLE:
                if (_allowSanitizationBypassAndThrow(value, "Style")) {
                    return _unwrapSafeValue(value);
                }
                return value;
            case SecurityContext.SCRIPT:
                if (_allowSanitizationBypassAndThrow(value, "Script")) {
                    return _unwrapSafeValue(value);
                }
                throw new _RuntimeError3(5200, "unsafe value used in a script context");
            case SecurityContext.URL:
                if (_allowSanitizationBypassAndThrow(value, "URL")) {
                    return _unwrapSafeValue(value);
                }
                return __sanitizeUrl(String(value));
            case SecurityContext.RESOURCE_URL:
                if (_allowSanitizationBypassAndThrow(value, "ResourceURL")) {
                    return _unwrapSafeValue(value);
                }
                throw new _RuntimeError3(5201, `unsafe value used in a resource URL context (see ${_XSS_SECURITY_URL})`);
            default:
                throw new _RuntimeError3(5202, `Unexpected SecurityContext ${ctx} (see ${_XSS_SECURITY_URL})`);
        }
    }
    bypassSecurityTrustHtml(value) {
        return _bypassSanitizationTrustHtml(value);
    }
    bypassSecurityTrustStyle(value) {
        return _bypassSanitizationTrustStyle(value);
    }
    bypassSecurityTrustScript(value) {
        return _bypassSanitizationTrustScript(value);
    }
    bypassSecurityTrustUrl(value) {
        return _bypassSanitizationTrustUrl(value);
    }
    bypassSecurityTrustResourceUrl(value) {
        return _bypassSanitizationTrustResourceUrl(value);
    }
    static \u0275fac = function DomSanitizerImpl_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || _DomSanitizerImpl)(i03.\u0275\u0275inject(DOCUMENT3));
    };
    static \u0275prov = /* @__PURE__ */ i03.\u0275\u0275defineInjectable({
        token: _DomSanitizerImpl,
        factory: _DomSanitizerImpl.\u0275fac,
        providedIn: "root"
    });
};
(() => {
    i03.\u0275setClassMetadata(DomSanitizerImpl, [{
            type: Injectable3,
            args: [{
                    providedIn: "root"
                }]
        }], () => [{
            type: void 0,
            decorators: [{
                    type: Inject3,
                    args: [DOCUMENT3]
                }]
        }], null);
})();
var HydrationFeatureKind;
(function (HydrationFeatureKind2) {
    HydrationFeatureKind2[HydrationFeatureKind2["NoHttpTransferCache"] = 0] = "NoHttpTransferCache";
    HydrationFeatureKind2[HydrationFeatureKind2["HttpTransferCacheOptions"] = 1] = "HttpTransferCacheOptions";
    HydrationFeatureKind2[HydrationFeatureKind2["I18nSupport"] = 2] = "I18nSupport";
    HydrationFeatureKind2[HydrationFeatureKind2["EventReplay"] = 3] = "EventReplay";
    HydrationFeatureKind2[HydrationFeatureKind2["IncrementalHydration"] = 4] = "IncrementalHydration";
})(HydrationFeatureKind || (HydrationFeatureKind = {}));
function hydrationFeature(\u0275kind, \u0275providers = [], \u0275options = {}) {
    return {
        \u0275kind,
        \u0275providers
    };
}
function withNoHttpTransferCache() {
    return hydrationFeature(HydrationFeatureKind.NoHttpTransferCache);
}
function withHttpTransferCacheOptions(options) {
    return hydrationFeature(HydrationFeatureKind.HttpTransferCacheOptions, _withHttpTransferCache(options));
}
function withI18nSupport() {
    return hydrationFeature(HydrationFeatureKind.I18nSupport, _withI18nSupport());
}
function withEventReplay() {
    return hydrationFeature(HydrationFeatureKind.EventReplay, _withEventReplay());
}
function withIncrementalHydration() {
    return hydrationFeature(HydrationFeatureKind.IncrementalHydration, _withIncrementalHydration());
}
function provideEnabledBlockingInitialNavigationDetector() {
    return [{
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => {
                const isEnabledBlockingInitialNavigation = inject2(_IS_ENABLED_BLOCKING_INITIAL_NAVIGATION, {
                    optional: true
                });
                if (isEnabledBlockingInitialNavigation) {
                    const console2 = inject2(_Console);
                    const message = _formatRuntimeError(5001, "Configuration error: found both hydration and enabledBlocking initial navigation in the same application, which is a contradiction.");
                    console2.warn(message);
                }
            },
            multi: true
        }];
}
function provideClientHydration(...features) {
    const providers = [];
    const featuresKind = /* @__PURE__ */ new Set();
    for (const { \u0275providers, \u0275kind } of features) {
        featuresKind.add(\u0275kind);
        if (\u0275providers.length) {
            providers.push(\u0275providers);
        }
    }
    const hasHttpTransferCacheOptions = featuresKind.has(HydrationFeatureKind.HttpTransferCacheOptions);
    if (featuresKind.has(HydrationFeatureKind.NoHttpTransferCache) && hasHttpTransferCacheOptions) {
        throw new _RuntimeError3(5001, "Configuration error: found both withHttpTransferCacheOptions() and withNoHttpTransferCache() in the same call to provideClientHydration(), which is a contradiction.");
    }
    return makeEnvironmentProviders([true ? provideEnabledBlockingInitialNavigationDetector() : [], true ? provideStabilityDebugging() : [], _withDomHydration(), featuresKind.has(HydrationFeatureKind.NoHttpTransferCache) || hasHttpTransferCacheOptions ? [] : _withHttpTransferCache({}), providers]);
}
var VERSION = /* @__PURE__ */ new Version("21.2.9");
export { BrowserModule, By, DomSanitizer, EVENT_MANAGER_PLUGINS, EventManager, EventManagerPlugin, HAMMER_GESTURE_CONFIG, HAMMER_LOADER, HammerGestureConfig, HammerModule, HydrationFeatureKind, Meta, REMOVE_STYLES_ON_COMPONENT_DESTROY, Title, VERSION, bootstrapApplication, createApplication, disableDebugTools, enableDebugTools, platformBrowser, provideClientHydration, provideProtractorTestingSupport, withEventReplay, withHttpTransferCacheOptions, withI18nSupport, withIncrementalHydration, withNoHttpTransferCache, BrowserDomAdapter as \u0275BrowserDomAdapter, BrowserGetTestability as \u0275BrowserGetTestability, DomEventsPlugin as \u0275DomEventsPlugin, DomRendererFactory2 as \u0275DomRendererFactory2, DomSanitizerImpl as \u0275DomSanitizerImpl, HammerGesturesPlugin as \u0275HammerGesturesPlugin, KeyEventsPlugin as \u0275KeyEventsPlugin, SharedStylesHost as \u0275SharedStylesHost, \u0275getDOM };
/*! Bundled license information:

@angular/platform-browser/fesm2022/_dom_renderer-chunk.mjs:
@angular/platform-browser/fesm2022/_browser-chunk.mjs:
@angular/platform-browser/fesm2022/platform-browser.mjs:
  (**
   * @license Angular v21.2.9
   * (c) 2010-2026 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
//# sourceMappingURL=_angular_platform_browser.BKyOW6Yqo4-dev.js.map
