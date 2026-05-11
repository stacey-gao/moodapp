// src/app/components/logmood/logmood.ts
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function Logmood_div_62_Template(rf, ctx) {
  if (rf & 1) {
    i0.\u0275\u0275elementStart(0, "div", 13);
    i0.\u0275\u0275text(1, " Selected Mood: ");
    i0.\u0275\u0275elementStart(2, "strong");
    i0.\u0275\u0275text(3);
    i0.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = i0.\u0275\u0275nextContext();
    i0.\u0275\u0275advance(3);
    i0.\u0275\u0275textInterpolate1("", ctx_r0.selectedMood, "/10");
  }
}
function Logmood_div_67_div_6_Template(rf, ctx) {
  if (rf & 1) {
    i0.\u0275\u0275elementStart(0, "div", 18);
    i0.\u0275\u0275text(1);
    i0.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const mood_r3 = i0.\u0275\u0275nextContext().$implicit;
    i0.\u0275\u0275advance();
    i0.\u0275\u0275textInterpolate1(" ", mood_r3.note, " ");
  }
}
function Logmood_div_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = i0.\u0275\u0275getCurrentView();
    i0.\u0275\u0275elementStart(0, "div", 14)(1, "div", 15)(2, "span");
    i0.\u0275\u0275text(3);
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(4, "span");
    i0.\u0275\u0275text(5);
    i0.\u0275\u0275elementEnd()();
    i0.\u0275\u0275template(6, Logmood_div_67_div_6_Template, 2, 1, "div", 16);
    i0.\u0275\u0275elementStart(7, "button", 17);
    i0.\u0275\u0275listener("click", function Logmood_div_67_Template_button_click_7_listener() {
      const mood_r3 = i0.\u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = i0.\u0275\u0275nextContext();
      return i0.\u0275\u0275resetView(ctx_r0.deleteMood(mood_r3.id));
    });
    i0.\u0275\u0275text(8, "\u274C");
    i0.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const mood_r3 = ctx.$implicit;
    i0.\u0275\u0275advance(3);
    i0.\u0275\u0275textInterpolate1("", mood_r3.value, "/10");
    i0.\u0275\u0275advance(2);
    i0.\u0275\u0275textInterpolate(mood_r3.date);
    i0.\u0275\u0275advance();
    i0.\u0275\u0275property("ngIf", mood_r3.note);
  }
}
var Logmood = class _Logmood {
  emojis = ["\u{1F62D}", "\u{1F622}", "\u{1F61F}", "\u{1F615}", "\u{1F610}", "\u{1F642}", "\u{1F60A}", "\u{1F604}", "\u{1F601}", "\u{1F929}"];
  selectedMood = null;
  selectedDate = "";
  note = "";
  moods = [];
  ngOnInit() {
    this.loadMoods();
    this.selectedDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  }
  selectMood(mood) {
    this.selectedMood = mood;
    this.saveMood(mood);
  }
  saveMood(mood) {
    if (!this.selectedDate)
      return;
    const existing = JSON.parse(localStorage.getItem("moodData") || "[]");
    const filtered = existing.filter((x) => x.date !== this.selectedDate);
    const newEntry = {
      id: Date.now(),
      date: this.selectedDate,
      value: mood,
      note: this.note
    };
    filtered.push(newEntry);
    localStorage.setItem("moodData", JSON.stringify(filtered));
    this.moods = filtered;
    this.note = "";
  }
  loadMoods() {
    this.moods = JSON.parse(localStorage.getItem("moodData") || "[]");
  }
  deleteMood(id) {
    this.moods = this.moods.filter((m) => m.id !== id);
    localStorage.setItem("moodData", JSON.stringify(this.moods));
  }
  clearAllMoods() {
    localStorage.removeItem("moodData");
    this.moods = [];
  }
  static \u0275fac = function Logmood_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Logmood)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _Logmood, selectors: [["app-logmood"]], decls: 70, vars: 14, consts: [[1, "mood-container"], [1, "date-input"], ["type", "date", 3, "ngModelChange", "ngModel"], [1, "mood-grid"], [1, "mood-btn", 3, "click"], [1, "emoji"], [1, "value"], [1, "note-input"], ["placeholder", "Add a note about your day...", 3, "ngModelChange", "ngModel"], ["class", "result", 4, "ngIf"], [1, "history"], ["class", "entry", 4, "ngFor", "ngForOf"], [1, "clear", 3, "click"], [1, "result"], [1, "entry"], [1, "entry-main"], ["class", "entry-note", 4, "ngIf"], [3, "click"], [1, "entry-note"]], template: function Logmood_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275elementStart(0, "div", 0)(1, "h2");
      i0.\u0275\u0275text(2, "How are you feeling today?");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(3, "div", 1)(4, "label");
      i0.\u0275\u0275text(5, "Select Date:");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(6, "input", 2);
      i0.\u0275\u0275twoWayListener("ngModelChange", function Logmood_Template_input_ngModelChange_6_listener($event) {
        i0.\u0275\u0275twoWayBindingSet(ctx.selectedDate, $event) || (ctx.selectedDate = $event);
        return $event;
      });
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(7, "div", 3)(8, "button", 4);
      i0.\u0275\u0275listener("click", function Logmood_Template_button_click_8_listener() {
        return ctx.selectMood(1);
      });
      i0.\u0275\u0275elementStart(9, "span", 5);
      i0.\u0275\u0275text(10);
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(11, "span", 6);
      i0.\u0275\u0275text(12, "1");
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(13, "button", 4);
      i0.\u0275\u0275listener("click", function Logmood_Template_button_click_13_listener() {
        return ctx.selectMood(2);
      });
      i0.\u0275\u0275elementStart(14, "span", 5);
      i0.\u0275\u0275text(15);
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(16, "span", 6);
      i0.\u0275\u0275text(17, "2");
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(18, "button", 4);
      i0.\u0275\u0275listener("click", function Logmood_Template_button_click_18_listener() {
        return ctx.selectMood(3);
      });
      i0.\u0275\u0275elementStart(19, "span", 5);
      i0.\u0275\u0275text(20);
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(21, "span", 6);
      i0.\u0275\u0275text(22, "3");
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(23, "button", 4);
      i0.\u0275\u0275listener("click", function Logmood_Template_button_click_23_listener() {
        return ctx.selectMood(4);
      });
      i0.\u0275\u0275elementStart(24, "span", 5);
      i0.\u0275\u0275text(25);
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(26, "span", 6);
      i0.\u0275\u0275text(27, "4");
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(28, "button", 4);
      i0.\u0275\u0275listener("click", function Logmood_Template_button_click_28_listener() {
        return ctx.selectMood(5);
      });
      i0.\u0275\u0275elementStart(29, "span", 5);
      i0.\u0275\u0275text(30);
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(31, "span", 6);
      i0.\u0275\u0275text(32, "5");
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(33, "button", 4);
      i0.\u0275\u0275listener("click", function Logmood_Template_button_click_33_listener() {
        return ctx.selectMood(6);
      });
      i0.\u0275\u0275elementStart(34, "span", 5);
      i0.\u0275\u0275text(35);
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(36, "span", 6);
      i0.\u0275\u0275text(37, "6");
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(38, "button", 4);
      i0.\u0275\u0275listener("click", function Logmood_Template_button_click_38_listener() {
        return ctx.selectMood(7);
      });
      i0.\u0275\u0275elementStart(39, "span", 5);
      i0.\u0275\u0275text(40);
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(41, "span", 6);
      i0.\u0275\u0275text(42, "7");
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(43, "button", 4);
      i0.\u0275\u0275listener("click", function Logmood_Template_button_click_43_listener() {
        return ctx.selectMood(8);
      });
      i0.\u0275\u0275elementStart(44, "span", 5);
      i0.\u0275\u0275text(45);
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(46, "span", 6);
      i0.\u0275\u0275text(47, "8");
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(48, "button", 4);
      i0.\u0275\u0275listener("click", function Logmood_Template_button_click_48_listener() {
        return ctx.selectMood(9);
      });
      i0.\u0275\u0275elementStart(49, "span", 5);
      i0.\u0275\u0275text(50);
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(51, "span", 6);
      i0.\u0275\u0275text(52, "9");
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275elementStart(53, "button", 4);
      i0.\u0275\u0275listener("click", function Logmood_Template_button_click_53_listener() {
        return ctx.selectMood(10);
      });
      i0.\u0275\u0275elementStart(54, "span", 5);
      i0.\u0275\u0275text(55);
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(56, "span", 6);
      i0.\u0275\u0275text(57, "10");
      i0.\u0275\u0275elementEnd()()();
      i0.\u0275\u0275element(58, "br");
      i0.\u0275\u0275elementStart(59, "div", 7)(60, "textarea", 8);
      i0.\u0275\u0275twoWayListener("ngModelChange", function Logmood_Template_textarea_ngModelChange_60_listener($event) {
        i0.\u0275\u0275twoWayBindingSet(ctx.note, $event) || (ctx.note = $event);
        return $event;
      });
      i0.\u0275\u0275text(61, "    ");
      i0.\u0275\u0275elementEnd()();
      i0.\u0275\u0275template(62, Logmood_div_62_Template, 4, 1, "div", 9);
      i0.\u0275\u0275element(63, "br");
      i0.\u0275\u0275elementStart(64, "h3");
      i0.\u0275\u0275text(65, "History");
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(66, "div", 10);
      i0.\u0275\u0275template(67, Logmood_div_67_Template, 9, 3, "div", 11);
      i0.\u0275\u0275elementEnd();
      i0.\u0275\u0275elementStart(68, "button", 12);
      i0.\u0275\u0275listener("click", function Logmood_Template_button_click_68_listener() {
        return ctx.clearAllMoods();
      });
      i0.\u0275\u0275text(69, " Clear All ");
      i0.\u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      i0.\u0275\u0275advance(6);
      i0.\u0275\u0275twoWayProperty("ngModel", ctx.selectedDate);
      i0.\u0275\u0275advance(4);
      i0.\u0275\u0275textInterpolate(ctx.emojis[0]);
      i0.\u0275\u0275advance(5);
      i0.\u0275\u0275textInterpolate(ctx.emojis[1]);
      i0.\u0275\u0275advance(5);
      i0.\u0275\u0275textInterpolate(ctx.emojis[2]);
      i0.\u0275\u0275advance(5);
      i0.\u0275\u0275textInterpolate(ctx.emojis[3]);
      i0.\u0275\u0275advance(5);
      i0.\u0275\u0275textInterpolate(ctx.emojis[4]);
      i0.\u0275\u0275advance(5);
      i0.\u0275\u0275textInterpolate(ctx.emojis[5]);
      i0.\u0275\u0275advance(5);
      i0.\u0275\u0275textInterpolate(ctx.emojis[6]);
      i0.\u0275\u0275advance(5);
      i0.\u0275\u0275textInterpolate(ctx.emojis[7]);
      i0.\u0275\u0275advance(5);
      i0.\u0275\u0275textInterpolate(ctx.emojis[8]);
      i0.\u0275\u0275advance(5);
      i0.\u0275\u0275textInterpolate(ctx.emojis[9]);
      i0.\u0275\u0275advance(5);
      i0.\u0275\u0275twoWayProperty("ngModel", ctx.note);
      i0.\u0275\u0275advance(2);
      i0.\u0275\u0275property("ngIf", ctx.selectedMood !== null);
      i0.\u0275\u0275advance(5);
      i0.\u0275\u0275property("ngForOf", ctx.moods);
    }
  }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, FormsModule, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel], styles: ["\n.mood-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 2rem;\n  font-family: Arial, sans-serif;\n}\nh2[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n  color: #333;\n}\n.mood-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: 1rem;\n}\n.mood-btn[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 70px;\n  height: 70px;\n  border: 2px solid #ddd;\n  border-radius: 12px;\n  background: #fff;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.mood-btn[_ngcontent-%COMP%]   .emoji[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n}\n.mood-btn[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  margin-top: 4px;\n  color: #555;\n}\n.mood-btn[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n  border-color: #aaa;\n}\n.mood-btn.selected[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  border-color: #4f46e5;\n  color: white;\n}\n.mood-btn.selected[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: white;\n}\n.result[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  font-size: 1.1rem;\n  color: #222;\n}\n.note-input[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  margin-bottom: 1rem;\n}\n.note-input[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 70px;\n  padding: 0.5rem;\n  border-radius: 8px;\n  border: 1px solid #ddd;\n  resize: none;\n}\n.entry[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 0.5rem;\n  border-bottom: 1px solid #eee;\n}\n.entry-main[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\n.entry-note[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #555;\n  margin-top: 0.3rem;\n}\n.date-input[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.date-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin-left: 0.5rem;\n  padding: 0.3rem;\n}\n.history[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  width: 100%;\n  max-width: 400px;\n}\n.entry[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 0.5rem;\n  border-bottom: 1px solid #eee;\n}\n.clear[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 0.5rem 1rem;\n  background: #ef4444;\n  color: white;\n  border: none;\n  border-radius: 6px;\n}\n/*# sourceMappingURL=logmood.css.map */"] });
};
(() => {
  i0.\u0275setClassDebugInfo(Logmood, { className: "Logmood", filePath: "src/app/components/logmood/logmood.ts", lineNumber: 11 });
})();
export {
  Logmood
};
//# sourceMappingURL=LogMood.js.map
