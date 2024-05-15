(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue")) : typeof define === "function" && define.amd ? define(["exports", "vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.h5table = {}, global.Vue));
})(this, function(exports2, vue) {
  "use strict";
  const H5TableCell = (props) => {
    if (props.slots && props.slotKey && props.slots[props.slotKey]) {
      return props.slots[props.slotKey]({ item: props.dataItem, index: props.dataIndex });
    }
    if (props.render) {
      return props.render(vue.h, props.dataItem);
    }
    return vue.h("div", { class: "cell", innerHTML: props.dataValue });
  };
  const pxtorem = (x, rootValue) => {
    return x / rootValue + "rem";
  };
  const cellSize = (size, rootValue) => {
    return pxtorem(size, rootValue);
  };
  const _hoisted_1$2 = { class: "table-row" };
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "h5-table-row",
    props: {
      column: { default: () => [] },
      dataIndex: {},
      dataItem: {},
      height: {},
      slots: {},
      rootValue: {}
    },
    setup(__props) {
      const props = __props;
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("section", _hoisted_1$2, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.column, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              key: "table-row-column_" + index,
              class: vue.normalizeClass(["table-row-column", index === 0 ? "first-table-row-column" : ""]),
              style: vue.normalizeStyle({
                width: vue.unref(cellSize)(item.width, props.rootValue),
                height: vue.unref(cellSize)(props.height, props.rootValue),
                textAlign: item.align || "center"
              })
            }, [
              (vue.openBlock(), vue.createBlock(vue.unref(H5TableCell), {
                key: index,
                dataValue: item.dataIndex ? props.dataItem[item.dataIndex] : "",
                dataIndex: props.dataIndex,
                dataItem: props.dataItem,
                render: item.render,
                slotKey: item.slotKey,
                slots: props.slots
              }, null, 8, ["dataValue", "dataIndex", "dataItem", "render", "slotKey", "slots"]))
            ], 6);
          }), 128))
        ]);
      };
    }
  });
  const h5TableRow_vue_vue_type_style_index_0_scoped_98d9cd3a_lang = "";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const H5TableRow = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-98d9cd3a"]]);
  const _withScopeId$1 = (n) => (vue.pushScopeId("data-v-e6fda73f"), n = n(), vue.popScopeId(), n);
  const _hoisted_1$1 = ["onClick"];
  const _hoisted_2$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "sort-caret ascending" }, null, -1));
  const _hoisted_3$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "sort-caret descending" }, null, -1));
  const _hoisted_4$1 = [
    _hoisted_2$1,
    _hoisted_3$1
  ];
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "h5-table-header",
    props: {
      column: { default: () => [] },
      height: { default: 60 },
      slots: {},
      rootValue: {}
    },
    emits: ["handleHeadSortClick"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const sortStatus = vue.ref({});
      const props = __props;
      const emits = __emit;
      const titleRef = vue.ref(null);
      const changeSortStatus = (item) => {
        if (!item.dataIndex || !item.sortable)
          return;
        if (!sortStatus.value[item.dataIndex]) {
          sortStatus.value = {
            [item.dataIndex]: 0
          };
        }
        sortStatus.value[item.dataIndex] = (sortStatus.value[item.dataIndex] + 1) % 3;
        emits(
          "handleHeadSortClick",
          item.dataIndex,
          sortStatus.value[item.dataIndex]
        );
      };
      __expose({
        titleRef
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "titleRef",
          ref: titleRef,
          class: "title"
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.column, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              key: index,
              class: vue.normalizeClass(["table-row-column", index === 0 ? "first-table-row-column" : ""]),
              style: vue.normalizeStyle({
                width: vue.unref(cellSize)(item.width, props.rootValue),
                height: vue.unref(cellSize)(props.height, props.rootValue),
                textAlign: item.align || "center"
              }),
              onClick: ($event) => changeSortStatus(item)
            }, [
              (vue.openBlock(), vue.createBlock(vue.unref(H5TableCell), {
                key: index,
                dataIndex: index,
                dataValue: item.title,
                slotKey: item.slotTitleKey,
                slots: props.slots
              }, null, 8, ["dataIndex", "dataValue", "slotKey", "slots"])),
              item.sortable && item.dataIndex ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 0,
                class: vue.normalizeClass([
                  "table-caret-wrapper",
                  sortStatus.value[item.dataIndex] === 1 ? "is-ascending" : "",
                  sortStatus.value[item.dataIndex] === 2 ? "is-descending" : ""
                ])
              }, _hoisted_4$1, 2)) : vue.createCommentVNode("", true)
            ], 14, _hoisted_1$1);
          }), 128))
        ], 512);
      };
    }
  });
  const h5TableHeader_vue_vue_type_style_index_0_scoped_e6fda73f_lang = "";
  const H5TableHeader = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e6fda73f"]]);
  const getAngle = (x, y) => {
    return Math.atan2(y, x) * 180 / Math.PI;
  };
  const getTouchDirection = (x, y) => {
    if (Math.abs(x) > 5) {
      let angle = getAngle(x, y);
      if (angle >= -45 && angle <= 45) {
        return "right";
      } else if (angle >= 135 && angle <= 180 || angle >= -180 && angle < -135) {
        return "left";
      }
    } else {
      return "";
    }
  };
  function useTouchMoveLeftAndRight(target, options) {
    const distanX = vue.ref(0);
    const distanY = vue.ref(0);
    const start = vue.reactive({
      x: 0,
      y: 0
    });
    const end = vue.reactive({
      x: 0,
      y: 0
    });
    const startHandle = (event) => {
      var _a;
      let touch = event.touches[0];
      if (touch) {
        start.x = touch.pageX;
        start.y = touch.pageY;
        (_a = options == null ? void 0 : options.touchstart) == null ? void 0 : _a.call(options, event);
      }
    };
    const moveHandle = (event) => {
      var _a;
      let touch = event.touches[0];
      if (touch) {
        end.x = touch.pageX;
        end.y = touch.pageY;
        let direction = getTouchDirection(end.x - start.x, end.y - start.y);
        distanX.value = end.x - start.x;
        distanY.value = end.y - start.y;
        (_a = options == null ? void 0 : options.touchmove) == null ? void 0 : _a.call(options, event, direction);
      }
    };
    const endHandle = (event) => {
      var _a;
      let touch = event.changedTouches[0];
      if (touch) {
        end.x = touch.pageX;
        end.y = touch.pageY;
        (_a = options == null ? void 0 : options.touchend) == null ? void 0 : _a.call(options, event);
      }
    };
    vue.watch(target, () => {
      if (target.value) {
        let targetDom = target.value;
        targetDom.addEventListener("touchstart", startHandle, { passive: false });
        targetDom.addEventListener("touchmove", moveHandle, { passive: false });
        targetDom.addEventListener("touchend", endHandle, { passive: false });
      }
    });
    vue.onUnmounted(() => {
      if (target.value) {
        target.value.removeEventListener("touchstart", startHandle);
        target.value.removeEventListener("touchmove", moveHandle);
        target.value.removeEventListener("touchend", endHandle);
      }
    });
    return [distanX, distanY];
  }
  function useScroll(target, handelScroll) {
    const handelScrollBase = () => {
      handelScroll();
    };
    vue.watch(target, () => {
      if (target.value) {
        let targetDom = target.value;
        targetDom.addEventListener("scroll", handelScrollBase, {
          passive: false
        });
      }
    });
    vue.onUnmounted(() => {
      if (target.value) {
        target.value.removeEventListener("scroll", handelScrollBase);
      }
    });
    return [];
  }
  function useGetTransformX(target, tablewidth, tableContent, disable, bottomLoadEvent, offset, handleTransform, stopPropagation = true) {
    const previousX = vue.ref(0);
    const transformX = vue.ref(0);
    const resetMove = () => {
      previousX.value = 0;
      transformX.value = 0;
      handleTransform(0);
    };
    const handleBottom = () => {
      if (target.value) {
        if (target.value.scrollHeight - target.value.scrollTop < target.value.clientHeight + offset) {
          bottomLoadEvent();
        }
      }
    };
    const touchend = () => {
      previousX.value = transformX.value;
      distanX.value = 0;
      distanY.value = 0;
    };
    const touchmove = (event, direction) => {
      var _a;
      console.log(direction, tableContent.value, tablewidth.value);
      if (direction) {
        event.cancelable && event.preventDefault();
        const max = tableContent.value - tablewidth.value;
        console.log(max);
        if (max > 0) {
          const temp = Math.min(previousX.value + distanX.value, 0);
          const res = Math.max(-max, temp);
          transformX.value = res;
          handleTransform(transformX.value);
        }
      }
      if (stopPropagation) {
        if (((_a = target.value) == null ? void 0 : _a.scrollTop) !== 0) {
          event.stopPropagation();
        }
      }
    };
    useScroll(target, () => {
      if (distanY.value <= 0) {
        disable.value && handleBottom();
      }
    });
    vue.onMounted(() => {
      handleBottom();
    });
    const [distanX, distanY] = useTouchMoveLeftAndRight(target, {
      touchmove,
      touchend
    });
    return { distanX, distanY, resetMove };
  }
  function useDebounce(fn, delay) {
    const timer = vue.ref(null);
    const debounce = (...args) => {
      if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
      }
      timer.value = setTimeout(() => {
        fn(...args);
      }, delay);
    };
    vue.onUnmounted(() => {
      if (timer.value) {
        clearTimeout(timer.value);
      }
    });
    return debounce;
  }
  function useResize(fn) {
    vue.onMounted(() => {
      fn.forEach((item) => {
        window.addEventListener("resize", item);
      });
    });
    vue.onBeforeUnmount(() => {
      fn.forEach((item) => {
        window.removeEventListener("resize", item);
      });
    });
  }
  const _withScopeId = (n) => (vue.pushScopeId("data-v-3910fb11"), n = n(), vue.popScopeId(), n);
  const _hoisted_1 = { class: "table-header" };
  const _hoisted_2 = { class: "fixed-title-header" };
  const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "mark" }, null, -1));
  const _hoisted_4 = [
    _hoisted_3
  ];
  const _hoisted_5 = { class: "first-column-wrapper" };
  const _hoisted_6 = {
    id: "table-content",
    class: "table-content"
  };
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "h5-table",
    props: {
      minTableHeight: { default: 600 },
      rowNum: { default: 6 },
      headerHeight: { default: 60 },
      rowHeight: { default: 100 },
      column: {},
      tableDatas: { default: () => [] },
      fixedHeader: { type: Boolean, default: true },
      isClick: { type: Boolean, default: true },
      disable: { type: Boolean, default: false },
      error: { type: Boolean, default: false },
      loading: { type: Boolean, default: false },
      finish: { type: Boolean, default: false },
      loadingText: { default: "加载中..." },
      errorText: { default: "出错了" },
      finishedText: { default: "到底了" },
      offset: { default: 10 },
      rootValue: { default: 75 }
    },
    emits: ["rowClick", "handleHeadSortClick", "update:loading", "update:error", "load"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const tableHeight = vue.ref(600);
      const tableWidth = vue.ref(0);
      const tableContent = vue.ref(0);
      const tableRef = vue.ref(null);
      const tableContainerRef = vue.ref(null);
      const tableContentEL = vue.ref(null);
      const rowDownMarkTop = vue.ref(0);
      const props = __props;
      const emits = __emit;
      const disable = vue.computed(() => props.disable);
      const moreMark = vue.ref(false);
      const handleCellSize = (num) => {
        return cellSize(num, props.rootValue);
      };
      const loading = vue.computed({
        get() {
          return props.loading;
        },
        set(val) {
          emits("update:loading", val);
        }
      });
      const error = vue.computed({
        get() {
          return props.error;
        },
        set(val) {
          emits("update:error", val);
        }
      });
      const loadingText = vue.computed(() => {
        let str = "";
        if (loading.value) {
          str = props.loadingText;
        }
        if (props.finish) {
          str = props.finishedText;
        }
        if (error.value) {
          str = props.errorText;
        }
        return str;
      });
      const bottomEvent = () => {
        if (props.finish)
          return;
        if (!loading.value) {
          loading.value = true;
          emits("load");
        }
      };
      const tryAgain = () => {
        if (error.value) {
          error.value = false;
          emits("load");
        }
      };
      const handleClick = (item, index) => {
        if (!props.isClick)
          return;
        if (Math.abs(distanX.value) < 20 && Math.abs(distanY.value) < 20) {
          emits("rowClick", item, index);
        }
      };
      const handleHeadSortClick = (propKey, type) => {
        realHandleDom(0, -1);
        emits("handleHeadSortClick", propKey, type);
      };
      const handleDom = () => {
        let pre_doms = [];
        return (height, index) => {
          var _a;
          if (pre_doms.length > 0) {
            pre_doms.forEach((item) => {
              item.style.marginBottom = 0;
            });
            pre_doms = [];
          }
          if (index === -1) {
            rowDownMarkTop.value = 0;
            return;
          }
          const tableDom = tableRef.value;
          const firstColumn2 = (tableDom == null ? void 0 : tableDom.querySelector(".table .first-column")) || null;
          const targetDom = (firstColumn2 == null ? void 0 : firstColumn2.children[index]) || null;
          if (targetDom) {
            targetDom.style.marginBottom = pxtorem(height, props.rootValue);
            pre_doms.push(targetDom);
          }
          const rowDom = (_a = tableDom == null ? void 0 : tableDom.querySelector("#table-content")) == null ? void 0 : _a.children[index];
          const rowTarget = rowDom == null ? void 0 : rowDom.children;
          if (rowTarget) {
            Array.from(rowTarget).forEach((item) => {
              item.style.marginBottom = pxtorem(height, props.rootValue);
              pre_doms.push(item);
            });
          }
          let rem = Number(getComputedStyle(document.documentElement).fontSize.replace("px", ""));
          const top = rowDom.getBoundingClientRect().top - tableContentEL.value.getBoundingClientRect().top;
          rowDownMarkTop.value = top + props.rowHeight / props.rootValue * rem;
        };
      };
      const realHandleDom = handleDom();
      const firstColumn = vue.computed(() => {
        return props.column.filter((item) => item.fixedLeft);
      });
      const handleTouchBottom = useDebounce((distanceX) => {
        if (tableRef.value) {
          let temp = tableContent.value - (tableRef.value.clientWidth - distanceX);
          if (temp >= 0 && temp < 10) {
            moreMark.value = false;
          } else {
            moreMark.value = true;
          }
        }
      }, 200);
      const handleTransform = (val) => {
        var _a;
        if ((_a = tableContainerRef.value) == null ? void 0 : _a.titleRef) {
          let dom = tableContainerRef.value.titleRef;
          dom.style.transform = `translateX(${val}px)`;
        }
        if (tableContentEL.value) {
          let dom = tableContentEL.value;
          dom.style.transform = `translateX(${val}px)`;
        }
        handleTouchBottom(val);
      };
      const { distanX, distanY, resetMove } = useGetTransformX(
        tableRef,
        tableWidth,
        tableContent,
        disable,
        bottomEvent,
        props.offset,
        handleTransform
      );
      const realRowHeight = vue.ref(100);
      const calculateTableContent = () => {
        if (tableContainerRef.value && tableContainerRef.value.titleRef) {
          let rem = Number(getComputedStyle(document.documentElement).fontSize.replace("px", ""));
          console.log(getComputedStyle(document.documentElement).fontSize);
          let children = tableContainerRef.value.titleRef.children;
          if (children.length > 0) {
            let count = 0;
            props.column.forEach((item) => {
              count += item.width;
            });
            tableContent.value = count / props.rootValue * rem;
            moreMark.value = tableContent.value > window.screen.width;
          }
        }
      };
      const calculateTableWidth = () => {
        if (tableRef.value) {
          tableWidth.value = tableRef.value.clientWidth;
        }
      };
      const calculateRealRowHeight = () => {
        const rem = Number(getComputedStyle(document.documentElement).fontSize.replace("px", ""));
        realRowHeight.value = props.rowHeight / props.rootValue * rem;
      };
      vue.onMounted(() => {
        tableContentEL.value = document.querySelector("#table-content");
        calculateTableContent();
        calculateTableWidth();
        calculateRealRowHeight();
      });
      const recoverHandleDom = () => {
        realHandleDom(props.rowHeight, -1);
      };
      useResize([
        calculateTableContent,
        calculateTableWidth,
        calculateRealRowHeight,
        recoverHandleDom,
        resetMove
      ]);
      vue.watchEffect(() => {
        if (props.tableDatas.length >= props.rowNum) {
          tableHeight.value = Math.max(
            props.rowHeight * props.rowNum,
            props.minTableHeight
          );
        }
      });
      vue.watch(
        () => props.column,
        () => {
          calculateTableContent();
          calculateTableWidth();
          calculateRealRowHeight();
          recoverHandleDom();
          resetMove();
        },
        { deep: true }
      );
      __expose({
        handleDom: realHandleDom,
        tableRef
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("section", _hoisted_1, [
            vue.createElementVNode("div", _hoisted_2, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(firstColumn.value, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("div", {
                  class: "fixed-title-mark",
                  key: index,
                  style: vue.normalizeStyle({
                    width: handleCellSize(item.width),
                    height: handleCellSize(props.headerHeight),
                    textAlign: item.align || "center"
                  })
                }, [
                  (vue.openBlock(), vue.createBlock(vue.unref(H5TableCell), {
                    key: Math.random(),
                    dataValue: item.title,
                    slotKey: item.slotTitleKey,
                    slots: _ctx.$slots
                  }, null, 8, ["dataValue", "slotKey", "slots"]))
                ], 4);
              }), 128))
            ]),
            vue.withDirectives(vue.createElementVNode("div", {
              class: "fixed-title-more",
              style: vue.normalizeStyle({
                height: handleCellSize(props.headerHeight)
              })
            }, _hoisted_4, 4), [
              [vue.vShow, moreMark.value]
            ]),
            vue.createVNode(H5TableHeader, {
              ref_key: "tableContainerRef",
              ref: tableContainerRef,
              column: props.column,
              class: vue.normalizeClass(["title-header"]),
              onHandleHeadSortClick: handleHeadSortClick,
              slots: _ctx.$slots,
              height: props.headerHeight,
              rootValue: props.rootValue
            }, null, 8, ["column", "slots", "height", "rootValue"])
          ]),
          vue.createElementVNode("div", {
            ref_key: "tableRef",
            ref: tableRef,
            class: "table",
            style: vue.normalizeStyle({
              height: handleCellSize(tableHeight.value)
            })
          }, [
            vue.createElementVNode("div", _hoisted_5, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(firstColumn.value, (fcItem, index) => {
                return vue.openBlock(), vue.createElementBlock("section", {
                  class: "first-column",
                  key: index,
                  style: vue.normalizeStyle({
                    width: handleCellSize(fcItem.width)
                  })
                }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.tableDatas, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("div", {
                      key: "table-row-column_" + index2,
                      class: vue.normalizeClass(["table-row-column", "first-table-row-column"]),
                      style: vue.normalizeStyle({
                        width: handleCellSize(fcItem.width),
                        height: handleCellSize(props.rowHeight),
                        textAlign: fcItem.align || "center"
                      })
                    }, [
                      (vue.openBlock(), vue.createBlock(vue.unref(H5TableCell), {
                        key: index2,
                        dataValue: fcItem.dataIndex ? item[fcItem.dataIndex] : "",
                        dataItem: item,
                        dataIndex: index2,
                        render: fcItem.render,
                        slotKey: fcItem.slotKey,
                        slots: _ctx.$slots
                      }, null, 8, ["dataValue", "dataItem", "dataIndex", "render", "slotKey", "slots"]))
                    ], 4);
                  }), 128))
                ], 4);
              }), 128))
            ]),
            vue.createElementVNode("section", _hoisted_6, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.tableDatas, (item, index) => {
                return vue.openBlock(), vue.createBlock(H5TableRow, {
                  key: index,
                  "data-item": item,
                  "data-index": index,
                  column: props.column,
                  height: props.rowHeight,
                  slots: _ctx.$slots,
                  rootValue: props.rootValue,
                  onTouchend: ($event) => handleClick(item, index)
                }, null, 8, ["data-item", "data-index", "column", "height", "slots", "rootValue", "onTouchend"]);
              }), 128))
            ]),
            vue.withDirectives(vue.createElementVNode("section", {
              class: "loading",
              onClick: tryAgain
            }, vue.toDisplayString(loadingText.value), 513), [
              [vue.vShow, props.disable]
            ]),
            vue.withDirectives(vue.createElementVNode("div", {
              class: "rowMarkContainer",
              style: vue.normalizeStyle({
                top: rowDownMarkTop.value + "px"
              })
            }, [
              vue.renderSlot(_ctx.$slots, "rowDownMark", {}, void 0, true)
            ], 4), [
              [vue.vShow, rowDownMarkTop.value > 0]
            ])
          ], 4)
        ], 64);
      };
    }
  });
  const h5Table_vue_vue_type_style_index_0_scoped_3910fb11_lang = "";
  const h5Table = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3910fb11"]]);
  exports2.H5Table = h5Table;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
