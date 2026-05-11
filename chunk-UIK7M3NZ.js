// src/app/components/weeklytrend/weeklytrend.ts
import { Component } from "@angular/core";
import * as i0 from "@angular/core";
var Weeklytrend = class _Weeklytrend {
  hoveredIndex = null;
  weekOffset = 0;
  get data() {
    return JSON.parse(localStorage.getItem("moodData") || "[]");
  }
  shiftDate(daysBack) {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - daysBack - this.weekOffset * 7);
    return d;
  }
  getDate(offset) {
    return this.shiftDate(offset).toISOString().split("T")[0];
  }
  getDayLabel(offset) {
    return this.shiftDate(offset).toLocaleDateString("en-US", { weekday: "short" });
  }
  getMood(offset) {
    const entry = this.data.find((x) => x.date === this.getDate(offset));
    return entry ? entry.value : 0;
  }
  getY(moodValue) {
    const chartHeight = 200;
    const maxMood = 10;
    return chartHeight - moodValue * (chartHeight / maxMood);
  }
  get path() {
    const points = [
      [0, this.getY(this.getMood(6))],
      [60, this.getY(this.getMood(5))],
      [120, this.getY(this.getMood(4))],
      [180, this.getY(this.getMood(3))],
      [240, this.getY(this.getMood(2))],
      [300, this.getY(this.getMood(1))],
      [360, this.getY(this.getMood(0))]
    ];
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];
      const cp1x = x1 + (x2 - x1) / 2;
      const cp2x = x1 + (x2 - x1) / 2;
      d += ` C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`;
    }
    return d;
  }
  get areaPath() {
    return `${this.path} L 360 200 L 0 200 Z`;
  }
  get hasData() {
    return this.data.length > 0;
  }
  get weekLabel() {
    const start = this.shiftDate(6);
    const end = this.shiftDate(0);
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  }
  prevWeek() {
    this.weekOffset++;
  }
  nextWeek() {
    if (this.weekOffset > 0)
      this.weekOffset--;
  }
  setHover(i) {
    this.hoveredIndex = i;
  }
  static \u0275fac = function Weeklytrend_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Weeklytrend)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _Weeklytrend, selectors: [["app-weeklytrend"]], decls: 42, vars: 22, consts: [[1, "chart-container"], [1, "empty", 3, "hidden"], [1, "controls"], [3, "click"], [3, "hidden"], ["width", "360", "height", "200", 1, "chart"], ["id", "gradient"], ["offset", "0%", "stop-color", "#4f46e5", "stop-opacity", "0.4"], ["offset", "100%", "stop-color", "#4f46e5", "stop-opacity", "0"], ["fill", "url(#gradient)"], [1, "line"], ["cx", "0", "r", "5", 3, "mouseenter", "mouseleave"], ["cx", "60", "r", "5", 3, "mouseenter", "mouseleave"], ["cx", "120", "r", "5", 3, "mouseenter", "mouseleave"], ["cx", "180", "r", "5", 3, "mouseenter", "mouseleave"], ["cx", "240", "r", "5", 3, "mouseenter", "mouseleave"], ["cx", "300", "r", "5", 3, "mouseenter", "mouseleave"], ["cx", "360", "r", "5", 3, "mouseenter", "mouseleave"], [1, "tooltip", 3, "hidden"], [1, "labels"]], template: function Weeklytrend_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275domElementStart(0, "div", 0)(1, "div", 1);
      i0.\u0275\u0275text(2, " No mood data yet \u2014 start logging your mood! ");
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(3, "div", 2)(4, "button", 3);
      i0.\u0275\u0275domListener("click", function Weeklytrend_Template_button_click_4_listener() {
        return ctx.prevWeek();
      });
      i0.\u0275\u0275text(5, "\u2190");
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(6, "span");
      i0.\u0275\u0275text(7);
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(8, "button", 3);
      i0.\u0275\u0275domListener("click", function Weeklytrend_Template_button_click_8_listener() {
        return ctx.nextWeek();
      });
      i0.\u0275\u0275text(9, "\u2192");
      i0.\u0275\u0275domElementEnd()();
      i0.\u0275\u0275domElementStart(10, "div", 4);
      i0.\u0275\u0275namespaceSVG();
      i0.\u0275\u0275domElementStart(11, "svg", 5)(12, "defs")(13, "linearGradient", 6);
      i0.\u0275\u0275domElement(14, "stop", 7)(15, "stop", 8);
      i0.\u0275\u0275domElementEnd()();
      i0.\u0275\u0275domElement(16, "path", 9)(17, "path", 10);
      i0.\u0275\u0275domElementStart(18, "circle", 11);
      i0.\u0275\u0275domListener("mouseenter", function Weeklytrend_Template_circle_mouseenter_18_listener() {
        return ctx.setHover(6);
      })("mouseleave", function Weeklytrend_Template_circle_mouseleave_18_listener() {
        return ctx.setHover(null);
      });
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(19, "circle", 12);
      i0.\u0275\u0275domListener("mouseenter", function Weeklytrend_Template_circle_mouseenter_19_listener() {
        return ctx.setHover(5);
      })("mouseleave", function Weeklytrend_Template_circle_mouseleave_19_listener() {
        return ctx.setHover(null);
      });
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(20, "circle", 13);
      i0.\u0275\u0275domListener("mouseenter", function Weeklytrend_Template_circle_mouseenter_20_listener() {
        return ctx.setHover(4);
      })("mouseleave", function Weeklytrend_Template_circle_mouseleave_20_listener() {
        return ctx.setHover(null);
      });
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(21, "circle", 14);
      i0.\u0275\u0275domListener("mouseenter", function Weeklytrend_Template_circle_mouseenter_21_listener() {
        return ctx.setHover(3);
      })("mouseleave", function Weeklytrend_Template_circle_mouseleave_21_listener() {
        return ctx.setHover(null);
      });
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(22, "circle", 15);
      i0.\u0275\u0275domListener("mouseenter", function Weeklytrend_Template_circle_mouseenter_22_listener() {
        return ctx.setHover(2);
      })("mouseleave", function Weeklytrend_Template_circle_mouseleave_22_listener() {
        return ctx.setHover(null);
      });
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(23, "circle", 16);
      i0.\u0275\u0275domListener("mouseenter", function Weeklytrend_Template_circle_mouseenter_23_listener() {
        return ctx.setHover(1);
      })("mouseleave", function Weeklytrend_Template_circle_mouseleave_23_listener() {
        return ctx.setHover(null);
      });
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(24, "circle", 17);
      i0.\u0275\u0275domListener("mouseenter", function Weeklytrend_Template_circle_mouseenter_24_listener() {
        return ctx.setHover(0);
      })("mouseleave", function Weeklytrend_Template_circle_mouseleave_24_listener() {
        return ctx.setHover(null);
      });
      i0.\u0275\u0275domElementEnd()();
      i0.\u0275\u0275namespaceHTML();
      i0.\u0275\u0275domElementStart(25, "div", 18);
      i0.\u0275\u0275text(26);
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(27, "div", 19)(28, "span");
      i0.\u0275\u0275text(29);
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(30, "span");
      i0.\u0275\u0275text(31);
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(32, "span");
      i0.\u0275\u0275text(33);
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(34, "span");
      i0.\u0275\u0275text(35);
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(36, "span");
      i0.\u0275\u0275text(37);
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(38, "span");
      i0.\u0275\u0275text(39);
      i0.\u0275\u0275domElementEnd();
      i0.\u0275\u0275domElementStart(40, "span");
      i0.\u0275\u0275text(41);
      i0.\u0275\u0275domElementEnd()()()();
    }
    if (rf & 2) {
      i0.\u0275\u0275advance();
      i0.\u0275\u0275domProperty("hidden", ctx.hasData);
      i0.\u0275\u0275advance(6);
      i0.\u0275\u0275textInterpolate(ctx.weekLabel);
      i0.\u0275\u0275advance(3);
      i0.\u0275\u0275domProperty("hidden", !ctx.hasData);
      i0.\u0275\u0275advance(6);
      i0.\u0275\u0275attribute("d", ctx.areaPath);
      i0.\u0275\u0275advance();
      i0.\u0275\u0275attribute("d", ctx.path);
      i0.\u0275\u0275advance();
      i0.\u0275\u0275attribute("cy", ctx.getY(ctx.getMood(6)));
      i0.\u0275\u0275advance();
      i0.\u0275\u0275attribute("cy", ctx.getY(ctx.getMood(5)));
      i0.\u0275\u0275advance();
      i0.\u0275\u0275attribute("cy", ctx.getY(ctx.getMood(4)));
      i0.\u0275\u0275advance();
      i0.\u0275\u0275attribute("cy", ctx.getY(ctx.getMood(3)));
      i0.\u0275\u0275advance();
      i0.\u0275\u0275attribute("cy", ctx.getY(ctx.getMood(2)));
      i0.\u0275\u0275advance();
      i0.\u0275\u0275attribute("cy", ctx.getY(ctx.getMood(1)));
      i0.\u0275\u0275advance();
      i0.\u0275\u0275attribute("cy", ctx.getY(ctx.getMood(0)));
      i0.\u0275\u0275advance();
      i0.\u0275\u0275domProperty("hidden", ctx.hoveredIndex === null);
      i0.\u0275\u0275advance();
      i0.\u0275\u0275textInterpolate2(" ", ctx.getDayLabel(ctx.hoveredIndex), ": ", ctx.getMood(ctx.hoveredIndex), "/10 ");
      i0.\u0275\u0275advance(3);
      i0.\u0275\u0275textInterpolate(ctx.getDayLabel(6));
      i0.\u0275\u0275advance(2);
      i0.\u0275\u0275textInterpolate(ctx.getDayLabel(5));
      i0.\u0275\u0275advance(2);
      i0.\u0275\u0275textInterpolate(ctx.getDayLabel(4));
      i0.\u0275\u0275advance(2);
      i0.\u0275\u0275textInterpolate(ctx.getDayLabel(3));
      i0.\u0275\u0275advance(2);
      i0.\u0275\u0275textInterpolate(ctx.getDayLabel(2));
      i0.\u0275\u0275advance(2);
      i0.\u0275\u0275textInterpolate(ctx.getDayLabel(1));
      i0.\u0275\u0275advance(2);
      i0.\u0275\u0275textInterpolate(ctx.getDayLabel(0));
    }
  }, styles: ["\n.chart-container[_ngcontent-%COMP%] {\n  width: 380px;\n  margin: 2rem auto;\n  text-align: center;\n  position: relative;\n}\n.line[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #4f46e5;\n  stroke-width: 3;\n  stroke-linecap: round;\n  animation: _ngcontent-%COMP%_draw 1s ease-in-out;\n}\ncircle[_ngcontent-%COMP%] {\n  fill: #4f46e5;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n.labels[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 8px;\n  font-size: 12px;\n  color: #555;\n}\n.tooltip[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  font-size: 14px;\n  color: #222;\n}\n.empty[_ngcontent-%COMP%] {\n  padding: 2rem;\n  color: #777;\n  font-style: italic;\n}\n@keyframes _ngcontent-%COMP%_draw {\n  from {\n    stroke-dasharray: 400;\n    stroke-dashoffset: 400;\n  }\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n.controls[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n.controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=weeklytrend.css.map */"] });
};
(() => {
  i0.\u0275setClassDebugInfo(Weeklytrend, { className: "Weeklytrend", filePath: "src/app/components/weeklytrend/weeklytrend.ts", lineNumber: 11 });
})();

export {
  Weeklytrend
};
//# sourceMappingURL=chunk-UIK7M3NZ.js.map
