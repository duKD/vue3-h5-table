(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue")) : typeof define === "function" && define.amd ? define(["exports", "vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.h5table = {}, global.Vue));
})(this, function(exports2, vue) {
  "use strict";
  const h5TableCell = vue.defineComponent({
    name: "H5TableCell",
    props: ["render", "dataItem", "dataValue", "slotKey", "slots"],
    setup(props) {
      return () => {
        if (props.slots && props.slotKey && props.slots[props.slotKey]) {
          return props.slots[props.slotKey](props.dataItem);
        }
        if (props.render) {
          return props.render(vue.h, props.dataItem);
        }
        return vue.h("div", { class: "cell", innerHTML: props.dataValue });
      };
    }
  });
  const pxtorem = (x, rootValue) => {
    return x / rootValue + "rem";
  };
  const cellSize = (size, rootValue) => {
    if (!size) {
      return pxtorem(60, rootValue);
    }
    return pxtorem(size, rootValue);
  };
  const _hoisted_1$2 = { class: "table-row" };
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "h5-table-row",
    props: {
      column: { default: () => [] },
      dataItem: null,
      height: null,
      slots: null,
      rootValue: null
    },
    setup(__props) {
      const props = __props;
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("section", _hoisted_1$2, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.column, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              class: vue.normalizeClass(["table-row-column", index === 0 ? "first-table-row-column" : ""]),
              style: vue.normalizeStyle({
                width: vue.unref(cellSize)(item.width, props.rootValue),
                height: vue.unref(cellSize)(props.height, props.rootValue),
                textAlign: item.align || "center"
              })
            }, [
              (vue.openBlock(), vue.createBlock(vue.unref(h5TableCell), {
                key: index,
                dataValue: item.dataIndex ? props.dataItem[item.dataIndex] : "",
                dataItem: props.dataItem,
                render: item.render,
                slotKey: item.slotKey,
                slots: props.slots
              }, null, 8, ["dataValue", "dataItem", "render", "slotKey", "slots"]))
            ], 6);
          }), 256))
        ]);
      };
    }
  });
  const h5TableRow_vue_vue_type_style_index_0_scoped_2d7b65cf_lang = "";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const H5TableRow = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-2d7b65cf"]]);
  const _withScopeId$1 = (n) => (vue.pushScopeId("data-v-e3bb5d1c"), n = n(), vue.popScopeId(), n);
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
      slots: null,
      rootValue: null
    },
    emits: ["handleHeadSortClick"],
    setup(__props, { expose, emit: emits }) {
      const props = __props;
      const sortStatus = vue.ref({});
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
      expose({
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
              class: vue.normalizeClass(["table-row-column", index === 0 ? "first-table-row-column" : ""]),
              style: vue.normalizeStyle({
                width: vue.unref(cellSize)(item.width, props.rootValue),
                height: vue.unref(cellSize)(props.height, props.rootValue),
                textAlign: item.align || "center"
              }),
              onClick: ($event) => changeSortStatus(item)
            }, [
              (vue.openBlock(), vue.createBlock(vue.unref(h5TableCell), {
                key: index,
                dataValue: item.title,
                slotKey: item.slotTitleKey,
                slots: props.slots
              }, null, 8, ["dataValue", "slotKey", "slots"])),
              item.sortable && item.dataIndex ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 0,
                class: vue.normalizeClass([
                  "table-caret-wrapper",
                  sortStatus.value[item.dataIndex] === 1 ? "is-ascending" : "",
                  sortStatus.value[item.dataIndex] === 2 ? "is-descending" : ""
                ])
              }, _hoisted_4$1, 2)) : vue.createCommentVNode("", true)
            ], 14, _hoisted_1$1);
          }), 256))
        ], 512);
      };
    }
  });
  const h5TableHeader_vue_vue_type_style_index_0_scoped_e3bb5d1c_lang = "";
  const H5TableHeader = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e3bb5d1c"]]);
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
        targetDom.addEventListener("touchstart", startHandle);
        targetDom.addEventListener("touchmove", moveHandle);
        targetDom.addEventListener("touchend", endHandle);
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
  function useGetTransformX(target, tablewidth, tableContent, disable, bottomLoadEvent, offset, handleTransform, stopPropagation = true) {
    const previousX = vue.ref(0);
    const transformX = vue.ref(0);
    const handleBottom = () => {
      if (target.value) {
        if (target.value.scrollHeight - target.value.scrollTop < target.value.clientHeight + offset) {
          disable.value && bottomLoadEvent();
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
      if (direction) {
        event.cancelable && event.preventDefault();
        const max = tableContent.value - tablewidth.value;
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
      if (distanY.value <= 0) {
        handleBottom();
      }
    };
    vue.onMounted(() => {
      handleBottom();
    });
    const [distanX, distanY] = useTouchMoveLeftAndRight(target, {
      touchmove,
      touchend
    });
    return [distanX, distanY];
  }
  function useHandleScroll(max, count, rowHeight, rootValue, tableRef, disable, optimized) {
    const changeNum = 30;
    const showRange = vue.ref([0, max + changeNum * 2]);
    const rem = Number(document.documentElement.style.fontSize.replace("px", ""));
    const realRowHeight = rowHeight / rootValue * rem;
    const scrollStart = vue.ref(0);
    const scrollEnd = vue.ref(0);
    const hasDistance = vue.ref(0);
    const curIndex = vue.ref(0);
    const needOptimized = () => {
      if (disable.value || !optimized)
        return false;
      if (count.value <= max + changeNum * 2)
        return false;
      return true;
    };
    const setIndex = (index) => {
      showRange.value = [index, index + max + changeNum * 2];
    };
    const isShowRow = (index) => {
      if (disable.value || !optimized)
        return true;
      return index >= showRange.value[0] && index <= showRange.value[1];
    };
    const startChangeShowRange = () => {
      if (!needOptimized())
        return;
      scrollStart.value = tableRef.value ? tableRef.value.scrollTop : 0;
      tableRef.value.style.overflowY = "auto";
    };
    const endChangeShowRange = () => {
      if (!needOptimized())
        return;
      tableRef.value.style.overflowY = "hidden";
      scrollEnd.value = tableRef.value ? tableRef.value.scrollTop : 0;
      hasDistance.value += scrollEnd.value - scrollStart.value;
      curIndex.value = Math.ceil(hasDistance.value / realRowHeight);
      let distanY = (scrollEnd.value - scrollStart.value) / realRowHeight;
      const hasScrollIndex = (distanY > 0 ? Math.ceil(distanY) : Math.floor(distanY)) + curIndex.value;
      if (hasScrollIndex <= changeNum) {
        setIndex(0);
      } else if (hasScrollIndex > changeNum && hasScrollIndex < count.value - max) {
        setIndex(hasScrollIndex - changeNum);
      } else {
        setIndex(count.value - max - changeNum);
      }
    };
    vue.watch(tableRef, () => {
      if (tableRef.value && optimized) {
        let targetDom = tableRef.value;
        targetDom.addEventListener("touchstart", startChangeShowRange, {
          passive: true
        });
        targetDom.addEventListener("touchend", endChangeShowRange, {
          passive: true
        });
      }
    });
    vue.onUnmounted(() => {
      if (tableRef.value && optimized) {
        tableRef.value.removeEventListener("touchstart", startChangeShowRange);
        tableRef.value.removeEventListener("touchend", endChangeShowRange);
      }
    });
    return { isShowRow };
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
  const _withScopeId = (n) => (vue.pushScopeId("data-v-2508346c"), n = n(), vue.popScopeId(), n);
  const _hoisted_1 = { class: "table-header" };
  const _hoisted_2 = { class: "fixed-title-more" };
  const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "mark" }, null, -1));
  const _hoisted_4 = [
    _hoisted_3
  ];
  const _hoisted_5 = {
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
      column: null,
      tableDates: { default: () => [] },
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
      rootValue: { default: 75 },
      optimized: { type: Boolean, default: false }
    },
    emits: ["rowClick", "handleHeadSortClick", "update:loading", "update:error", "load"],
    setup(__props, { expose, emit: emits }) {
      const props = __props;
      const tableHeight = vue.ref(600);
      const tableWidth = vue.ref(0);
      const tableContent = vue.ref(0);
      const tableRef = vue.ref(null);
      const tableContainerRef = vue.ref(null);
      const rem = Number(document.documentElement.style.fontSize.replace("px", ""));
      const tableContentEL = vue.ref(null);
      const rowDownMarkTop = vue.ref(0);
      vue.onMounted(() => {
        tableContentEL.value = document.querySelector("#table-content");
      });
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
        rowDownMarkTop.value = 0;
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
          if (index === -1)
            return;
          const tableDom = tableRef.value;
          const firstColumn2 = (tableDom == null ? void 0 : tableDom.querySelector(".table-header .first-column")) || null;
          const targetDom = (firstColumn2 == null ? void 0 : firstColumn2.children[index + 1]) || null;
          if (targetDom) {
            targetDom.style.marginBottom = pxtorem(height, props.rootValue);
            pre_doms.push(targetDom);
          }
          const rowDom = (_a = tableDom == null ? void 0 : tableDom.querySelector(".table-content")) == null ? void 0 : _a.children[index];
          const rowTarget = rowDom == null ? void 0 : rowDom.children;
          if (rowTarget) {
            Array.from(rowTarget).forEach((item) => {
              item.style.marginBottom = pxtorem(height, props.rootValue);
              pre_doms.push(item);
            });
          }
          const top = rowDom.getBoundingClientRect().top - tableContentEL.value.getBoundingClientRect().top;
          rowDownMarkTop.value = top + (props.rowHeight + height) / props.rootValue * rem;
        };
      };
      const firstColumn = vue.computed(() => {
        return props.column[0];
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
      const [distanX, distanY] = useGetTransformX(
        tableRef,
        tableWidth,
        tableContent,
        disable,
        bottomEvent,
        props.offset,
        (val) => {
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
        }
      );
      const count = vue.computed(() => props.tableDates.length);
      const { isShowRow } = useHandleScroll(
        40,
        count,
        props.rowHeight,
        props.rootValue,
        tableRef,
        disable,
        props.optimized
      );
      vue.watchEffect(() => {
        if (tableRef.value) {
          tableWidth.value = tableRef.value.clientWidth;
        }
      });
      vue.watch(tableContainerRef, () => {
        if (tableContainerRef.value && tableContainerRef.value.titleRef) {
          let children = tableContainerRef.value.titleRef.children;
          if (children.length > 0) {
            let count2 = 0;
            props.column.forEach((item) => {
              count2 += item.width;
            });
            tableContent.value = count2 / props.rootValue * rem;
            moreMark.value = count2 / props.rootValue * rem > window.screen.width;
          }
        }
      });
      vue.watchEffect(() => {
        if (props.tableDates.length >= props.rowNum) {
          tableHeight.value = Math.max(
            props.rowHeight * props.rowNum + props.headerHeight,
            props.minTableHeight
          );
        }
      });
      expose({
        handleDom: handleDom(),
        tableRef
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "tableRef",
          ref: tableRef,
          class: "table",
          style: vue.normalizeStyle({
            height: handleCellSize(tableHeight.value)
          })
        }, [
          vue.createElementVNode("section", _hoisted_1, [
            props.fixedHeader ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: "fixed-title-mark",
              style: vue.normalizeStyle({
                width: handleCellSize(vue.unref(firstColumn).width),
                height: handleCellSize(props.headerHeight),
                textAlign: vue.unref(firstColumn).align || "center"
              })
            }, [
              (vue.openBlock(), vue.createBlock(vue.unref(h5TableCell), {
                key: Math.random(),
                dataValue: vue.unref(firstColumn).title,
                slotKey: vue.unref(firstColumn).slotTitleKey,
                slots: _ctx.$slots
              }, null, 8, ["dataValue", "slotKey", "slots"]))
            ], 4)) : vue.createCommentVNode("", true),
            vue.withDirectives(vue.createElementVNode("div", _hoisted_2, _hoisted_4, 512), [
              [vue.vShow, moreMark.value]
            ]),
            vue.createVNode(H5TableHeader, {
              ref_key: "tableContainerRef",
              ref: tableContainerRef,
              column: props.column,
              class: vue.normalizeClass(["title-header", { fixedHeader: props.fixedHeader }]),
              onHandleHeadSortClick: handleHeadSortClick,
              slots: _ctx.$slots,
              rootValue: props.rootValue
            }, null, 8, ["column", "class", "slots", "rootValue"]),
            props.fixedHeader ? (vue.openBlock(), vue.createElementBlock("section", {
              key: 1,
              style: vue.normalizeStyle({
                height: handleCellSize(props.headerHeight)
              })
            }, null, 4)) : vue.createCommentVNode("", true),
            vue.createElementVNode("section", {
              class: "first-column",
              style: vue.normalizeStyle({
                width: handleCellSize(vue.unref(firstColumn).width)
              })
            }, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(["table-row-column", "first-table-row-column"]),
                style: vue.normalizeStyle({
                  width: handleCellSize(vue.unref(firstColumn).width),
                  height: handleCellSize(props.headerHeight),
                  borderBottom: "none",
                  textAlign: vue.unref(firstColumn).align || "center"
                })
              }, [
                (vue.openBlock(), vue.createBlock(vue.unref(h5TableCell), {
                  key: Math.random(),
                  dataValue: vue.unref(firstColumn).title,
                  style: vue.normalizeStyle({
                    ...props.fixedHeader && {
                      visibility: "hidden"
                    }
                  })
                }, null, 8, ["dataValue", "style"]))
              ], 4),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.tableDates, (item, index) => {
                return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                  vue.unref(isShowRow)(index) ? (vue.openBlock(), vue.createElementBlock("div", {
                    key: 0,
                    class: vue.normalizeClass(["table-row-column", "first-table-row-column"]),
                    style: vue.normalizeStyle({
                      width: handleCellSize(vue.unref(firstColumn).width),
                      height: handleCellSize(props.rowHeight),
                      textAlign: vue.unref(firstColumn).align || "center"
                    })
                  }, [
                    (vue.openBlock(), vue.createBlock(vue.unref(h5TableCell), {
                      key: index,
                      dataValue: vue.unref(firstColumn).dataIndex ? item[vue.unref(firstColumn).dataIndex] : "",
                      dataItem: item,
                      render: vue.unref(firstColumn).render,
                      slotKey: vue.unref(firstColumn).slotKey,
                      slots: _ctx.$slots
                    }, null, 8, ["dataValue", "dataItem", "render", "slotKey", "slots"]))
                  ], 4)) : vue.createCommentVNode("", true)
                ], 64);
              }), 256))
            ], 4)
          ]),
          vue.createElementVNode("section", _hoisted_5, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.tableDates, (item, index) => {
              return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                vue.unref(isShowRow)(index) ? (vue.openBlock(), vue.createBlock(H5TableRow, {
                  key: index,
                  "data-item": item,
                  column: props.column,
                  height: props.rowHeight,
                  slots: _ctx.$slots,
                  rootValue: props.rootValue,
                  onTouchend: ($event) => handleClick(item, index)
                }, null, 8, ["data-item", "column", "height", "slots", "rootValue", "onTouchend"])) : vue.createCommentVNode("", true)
              ], 64);
            }), 256))
          ]),
          vue.withDirectives(vue.createElementVNode("section", {
            class: "loading",
            onClick: tryAgain
          }, vue.toDisplayString(vue.unref(loadingText)), 513), [
            [vue.vShow, props.disable && vue.unref(loadingText).length > 0]
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
        ], 4);
      };
    }
  });
  const h5Table_vue_vue_type_style_index_0_scoped_2508346c_lang = "";
  const h5Table = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2508346c"]]);
  exports2.H5Table = h5Table;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
