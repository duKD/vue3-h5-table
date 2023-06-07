import { defineComponent, h, openBlock, createElementBlock, Fragment, renderList, normalizeClass, normalizeStyle, unref, createBlock, ref, createCommentVNode, pushScopeId, popScopeId, createElementVNode, reactive, watch, onUnmounted, onMounted, computed, watchEffect, withDirectives, vShow, createVNode, toDisplayString, renderSlot } from "vue";
const h5TableCell = defineComponent({
  name: "H5TableCell",
  props: ["render", "dataItem", "dataValue", "slotKey", "slots"],
  setup(props) {
    return () => {
      if (props.slots && props.slotKey && props.slots[props.slotKey]) {
        return props.slots[props.slotKey](props.dataItem);
      }
      if (props.render) {
        return props.render(h, props.dataItem);
      }
      return h("div", { class: "cell", innerHTML: props.dataValue });
    };
  }
});
const pxtorem = (x) => {
  const rmSize = Number(document.documentElement.style.fontSize.replace("px", ""));
  return x / rmSize / 2 + "rem";
};
const cpxtorem = (x) => {
  const rmSize = Number(document.documentElement.style.fontSize.replace("px", ""));
  return x / rmSize + "rem";
};
const cellSize = (size) => {
  if (!size) {
    return pxtorem(60);
  }
  return pxtorem(size);
};
const _hoisted_1$2 = { class: "table-row" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "h5-table-row",
  props: {
    column: { default: () => [] },
    dataItem: null,
    height: null,
    slots: null
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(props.column, (item, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["table-row-column", index === 0 ? "first-table-row-column" : ""]),
            style: normalizeStyle({
              width: unref(cellSize)(item.width),
              height: unref(cellSize)(props.height),
              textAlign: item.align || "center"
            })
          }, [
            (openBlock(), createBlock(unref(h5TableCell), {
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
const h5TableRow_vue_vue_type_style_index_0_scoped_cbb6ff6c_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const H5TableRow = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-cbb6ff6c"]]);
const _withScopeId$1 = (n) => (pushScopeId("data-v-982288d3"), n = n(), popScopeId(), n);
const _hoisted_1$1 = ["onClick"];
const _hoisted_2$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("i", { class: "sort-caret ascending" }, null, -1));
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("i", { class: "sort-caret descending" }, null, -1));
const _hoisted_4$1 = [
  _hoisted_2$1,
  _hoisted_3$1
];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "h5-table-header",
  props: {
    column: { default: () => [] },
    height: { default: 60 },
    slots: null
  },
  emits: ["handleHeadSortClick"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const sortStatus = ref({});
    const titleRef = ref(null);
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
      return openBlock(), createElementBlock("div", {
        ref_key: "titleRef",
        ref: titleRef,
        class: "title"
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(props.column, (item, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["table-row-column", index === 0 ? "first-table-row-column" : ""]),
            style: normalizeStyle({
              width: unref(cellSize)(item.width),
              height: unref(cellSize)(props.height),
              textAlign: item.align || "center"
            }),
            onClick: ($event) => changeSortStatus(item)
          }, [
            (openBlock(), createBlock(unref(h5TableCell), {
              key: index,
              dataValue: item.title,
              slotKey: item.slotTitleKey,
              slots: props.slots
            }, null, 8, ["dataValue", "slotKey", "slots"])),
            item.sortable && item.dataIndex ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass([
                "table-caret-wrapper",
                sortStatus.value[item.dataIndex] === 1 ? "is-ascending" : "",
                sortStatus.value[item.dataIndex] === 2 ? "is-descending" : ""
              ])
            }, _hoisted_4$1, 2)) : createCommentVNode("", true)
          ], 14, _hoisted_1$1);
        }), 256))
      ], 512);
    };
  }
});
const h5TableHeader_vue_vue_type_style_index_0_scoped_982288d3_lang = "";
const H5TableHeader = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-982288d3"]]);
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
  const distanX = ref(0);
  const distanY = ref(0);
  const start = reactive({
    x: 0,
    y: 0
  });
  const end = reactive({
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
  watch(target, () => {
    if (target.value) {
      let targetDom = target.value;
      targetDom.addEventListener("touchstart", startHandle);
      targetDom.addEventListener("touchmove", moveHandle);
      targetDom.addEventListener("touchend", endHandle);
    }
  });
  onUnmounted(() => {
    if (target.value) {
      target.value.removeEventListener("touchstart", startHandle);
      target.value.removeEventListener("touchmove", moveHandle);
      target.value.removeEventListener("touchend", endHandle);
    }
  });
  return [distanX, distanY];
}
function useGetTransformX(target, tablewidth, tableContent, disable, bottomLoadEvent, offset, stopPropagation = true) {
  const previousX = ref(0);
  const transformX = ref(0);
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
  onMounted(() => {
    handleBottom();
  });
  const [distanX, distanY] = useTouchMoveLeftAndRight(target, {
    touchmove,
    touchend
  });
  return [transformX, distanX, distanY];
}
const _withScopeId = (n) => (pushScopeId("data-v-842bb3ea"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "table-header" };
const _hoisted_2 = { class: "fixed-title-more" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "mark" }, null, -1));
const _hoisted_4 = [
  _hoisted_3
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "h5-table",
  props: {
    minTableHeight: { default: 600 },
    rowNum: { default: 6 },
    headerHeight: { default: 60 },
    rowHeight: { default: 100 },
    column: null,
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
    offset: { default: 10 }
  },
  emits: ["rowClick", "handleHeadSortClick", "update:loading", "update:error", "load"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const distanTableX = ref("");
    const tableHeight = ref(600);
    const tablewidth = ref(0);
    const tablecontent = ref(0);
    const tableRef = ref(null);
    const tableContainerRef = ref(null);
    const disable = computed(() => props.disable);
    const moreMark = ref(false);
    const loading = computed({
      get() {
        return props.loading;
      },
      set(val) {
        emits("update:loading", val);
      }
    });
    const error = computed({
      get() {
        return props.error;
      },
      set(val) {
        emits("update:error", val);
      }
    });
    const loadingText = computed(() => {
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
        const tabelDom = tableRef.value;
        const firstColumn2 = (tabelDom == null ? void 0 : tabelDom.querySelector(".table-header .first-column")) || null;
        const targetDom = (firstColumn2 == null ? void 0 : firstColumn2.children[index + 1]) || null;
        if (targetDom) {
          targetDom.style.marginBottom = pxtorem(height);
          pre_doms.push(targetDom);
        }
        const rowDom = (_a = tabelDom == null ? void 0 : tabelDom.querySelector(".table-content")) == null ? void 0 : _a.children[index];
        const rowTarget = rowDom == null ? void 0 : rowDom.children;
        if (rowTarget) {
          Array.from(rowTarget).forEach((item) => {
            item.style.marginBottom = pxtorem(height);
            pre_doms.push(item);
          });
        }
      };
    };
    const firstColumn = computed(() => {
      return props.column[0];
    });
    const [transformX, distanX, distanY] = useGetTransformX(
      tableRef,
      tablewidth,
      tablecontent,
      disable,
      bottomEvent,
      props.offset
    );
    watchEffect(() => {
      if (tableRef.value) {
        tablewidth.value = tableRef.value.clientWidth;
      }
    });
    watchEffect(() => {
      distanTableX.value = cpxtorem(transformX.value);
    });
    watchEffect(() => {
      if (tableRef.value && transformX.value !== 0) {
        let temp = tablecontent.value - (tableRef.value.clientWidth - transformX.value);
        if (temp >= 0 && temp < 10) {
          moreMark.value = false;
        } else {
          moreMark.value = true;
        }
      }
    });
    watch(tableContainerRef, () => {
      if (tableContainerRef.value && tableContainerRef.value.titleRef) {
        let children = tableContainerRef.value.titleRef.children;
        if (children.length > 0) {
          let count = 0;
          Array.from(children).forEach((val) => {
            count += val.clientWidth;
          });
          tablecontent.value = count;
          moreMark.value = tablecontent.value > window.screen.width;
        }
      }
    });
    watchEffect(() => {
      if (props.tableDatas.length >= props.rowNum) {
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
      return openBlock(), createElementBlock("div", {
        ref_key: "tableRef",
        ref: tableRef,
        class: "table",
        style: normalizeStyle({
          height: unref(cellSize)(tableHeight.value)
        })
      }, [
        createElementVNode("section", _hoisted_1, [
          props.fixedHeader ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "fixed-title-mark",
            style: normalizeStyle({
              width: unref(cellSize)(unref(firstColumn).width),
              height: unref(cellSize)(props.headerHeight),
              textAlign: unref(firstColumn).align || "center"
            })
          }, [
            (openBlock(), createBlock(unref(h5TableCell), {
              key: Math.random(),
              dataValue: unref(firstColumn).title,
              slotKey: unref(firstColumn).slotTitleKey,
              slots: _ctx.$slots
            }, null, 8, ["dataValue", "slotKey", "slots"]))
          ], 4)) : createCommentVNode("", true),
          withDirectives(createElementVNode("div", _hoisted_2, _hoisted_4, 512), [
            [vShow, moreMark.value]
          ]),
          createVNode(H5TableHeader, {
            ref_key: "tableContainerRef",
            ref: tableContainerRef,
            column: props.column,
            class: normalizeClass(["title-header", { fixedHeader: props.fixedHeader }]),
            style: normalizeStyle({
              transform: `translateX(${distanTableX.value})`,
              transition: "none"
            }),
            onHandleHeadSortClick: handleHeadSortClick,
            slots: _ctx.$slots
          }, null, 8, ["column", "class", "style", "slots"]),
          props.fixedHeader ? (openBlock(), createElementBlock("section", {
            key: 1,
            style: normalizeStyle({
              height: unref(cellSize)(props.headerHeight)
            })
          }, null, 4)) : createCommentVNode("", true),
          createElementVNode("section", {
            class: "first-column",
            style: normalizeStyle({
              width: unref(cellSize)(unref(firstColumn).width)
            })
          }, [
            createElementVNode("div", {
              class: normalizeClass(["table-row-column", "first-table-row-column"]),
              style: normalizeStyle({
                width: unref(cellSize)(unref(firstColumn).width),
                height: unref(cellSize)(props.headerHeight),
                borderBottom: "none",
                textAlign: unref(firstColumn).align || "center"
              })
            }, [
              (openBlock(), createBlock(unref(h5TableCell), {
                key: Math.random(),
                dataValue: unref(firstColumn).title,
                style: normalizeStyle({
                  ...props.fixedHeader && {
                    visibility: "hidden"
                  }
                })
              }, null, 8, ["dataValue", "style"]))
            ], 4),
            (openBlock(true), createElementBlock(Fragment, null, renderList(props.tableDatas, (item, index) => {
              return openBlock(), createElementBlock("div", {
                class: normalizeClass(["table-row-column", "first-table-row-column"]),
                style: normalizeStyle({
                  width: unref(cellSize)(unref(firstColumn).width),
                  height: unref(cellSize)(props.rowHeight),
                  textAlign: unref(firstColumn).align || "center"
                })
              }, [
                (openBlock(), createBlock(unref(h5TableCell), {
                  key: index,
                  dataValue: unref(firstColumn).dataIndex ? item[unref(firstColumn).dataIndex] : "",
                  dataItem: item,
                  render: unref(firstColumn).render,
                  slotKey: unref(firstColumn).slotKey,
                  slots: _ctx.$slots
                }, null, 8, ["dataValue", "dataItem", "render", "slotKey", "slots"]))
              ], 4);
            }), 256))
          ], 4)
        ]),
        createElementVNode("section", {
          class: "table-content",
          style: normalizeStyle(`transform: translateX(${distanTableX.value});transition:none`)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.tableDatas, (item, index) => {
            return openBlock(), createBlock(H5TableRow, {
              key: index,
              "data-item": item,
              column: props.column,
              height: props.rowHeight,
              slots: _ctx.$slots,
              onTouchend: ($event) => handleClick(item, index)
            }, null, 8, ["data-item", "column", "height", "slots", "onTouchend"]);
          }), 128))
        ], 4),
        withDirectives(createElementVNode("section", {
          class: "loading",
          onClick: tryAgain
        }, toDisplayString(unref(loadingText)), 513), [
          [vShow, props.disable && unref(loadingText).length > 0]
        ]),
        renderSlot(_ctx.$slots, "rowDownMark", {}, void 0, true)
      ], 4);
    };
  }
});
const h5Table_vue_vue_type_style_index_0_scoped_842bb3ea_lang = "";
const h5Table = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-842bb3ea"]]);
export {
  h5Table as H5Table
};
