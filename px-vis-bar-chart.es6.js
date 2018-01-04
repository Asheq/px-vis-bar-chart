const behaviours = [
  PxVisBehavior.observerCheck,
  PxVisBehavior.baseSize,
  PxVisBehavior.margins,
  PxVisBehavior.dataset,
  PxVisBehavior.completeSeriesConfig,
  PxVisBehavior.muteUnmuteSeries,
  PxVisBehavior.tooltipData,
  PxVisBehavior.extentsData,
  PxVisBehavior.commonMethods,
  PxVisBehavior.zoomSelection,
  PxVisBehavior.chartExtents,
  PxVisBehavior.dataExtents,
  PxVisBehavior.events,
  PxVisBehaviorD3.svg,
  PxVisBehaviorD3.svgLower,
  PxVisBehaviorD3.axes,
  PxVisBehaviorD3.clipPath,
  PxVisBehaviorChart.chartCommon,
  PxVisBehaviorChart.saveImage,
  PxVisBehaviorD3.domainUpdate,
  PxVisBehaviorChart.subConfiguration,
  PxVisBehaviorChart.registerConfigs,
  PxVisBehaviorChart.axisConfigs,
  PxVisBehaviorChart.registerPositioning,
  PxVisBehaviorChart.chartAutoResize,
  PxVisBehavior.thresholds,
  PxVisBehaviorChart.layers,
  PxVisBehaviorChart.navigatorConfig,
  PxVisBehavior.dynamicMenuConfig,
  PxColorsBehavior.dataVisColorTheming,
  PxVisBehavior.axisTypes,
  PxVisBehaviorScale.scale,
  PxVisBehavior.actionConfig,
  PxVisBehaviorChart.zooming,
  PxVisBehaviorChart.actionRequest,
  PxVisBehaviorChart.toolbarSubConfig,
  PxVisBehaviorChart.noDebounceOnPanning,
  PxVisBehaviorChart.chartToolbarConfig,
  PxVisBehaviorChart.showTooltip,
  // PxVisBehaviorChart.sizeVerticalRegister,
  // PxVisBehaviorChart.tooltipFollowMouseCalculation,
  PxVisBehaviorChart.thresholdConfig,
  PxVisBehavior.selectionType,
  PxVisBehaviorChart.webWorkerSynchronization,
  Polymer.AppLocalizeBehavior,
  PxVisBehavior.updateStylesOverride,
  PxVisBehavior.annotationData,
  PxVisBehaviorChart.cursorConfig,
  PxVisBehaviorChart.registerPagnation
];

class PxVisBarChart extends Polymer.mixinBehaviors(behaviours, Polymer.Element) {
  static get is() { return 'px-vis-bar-chart'; }

  static get properties() {
    return {
      /**
      * Specfies what type of bar chart:
      * - `bar`
      * - `horizontal`
      */
      chartType: {
        type: String,
        value: 'bar'
      },

      _stackedChartData: {
        type: Array,
        computed: '_returnStack(chartData.*, _seriesKeys.*)'
      },

      /**
       * Defines where to locate the X-axis.
       * - `bottom`
       * - `top`
       *
       */
      xAxisLocation: {
        type:String,
        value:'bottom'
      },
      /**
       * Defines where to locate the Y-axis.
       * - `left`
       * - `right`
       *
       */
      yAxisLocation: {
        type: String,
        value:'left'
      },

      /**
       * DO NOT CHANGE THIS UNLESS YOU KNOW WHAT YOU ARE DOING
       *
       * Bar charts in nearly all cases should start from 0. If you have a special case and understand the ramifications, change this to false to allow it to use the `min` value from your data
       */
      startFromZero: {
        type: Boolean,
        value: true
      }

    };
  }

  static get observers() {
    return [
      '_setAxisTypes(chartType)',
      '_setXScale(width, margin, xAxisType)',
      '_setYScale(height, margin, yAxisType)',
      '_setDomain(_chartDataHasChanged, x, y, completeSeriesConfig, dataExtents)',
      '_setDomain(chartExtents, dataExtents)',
      '_updateDomain(selectedDomain)',
      '_chartDataChanged(chartData.*)'
    ];
  }

  ready() {
    super.ready();
    this.set('xAxisType', "scaleBand");
    this.set('yAxisType', "linear");
    this.preventWebWorkerSynchronization = true;
    this.set('numberOfLayers', 4);
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _returnStack() {
    if(this.chartData && this._seriesKeys) {
      var stack = Px.d3.stack();

      stack.keys(this._seriesKeys);
      return stack(this.chartData);
    }
  }

  _setAxisTypes(chartType) {
    this.set('xAxisType', "scaleBand");
    this.set('yAxisType', "linear");
  }

  _getXKey() {
    if(this.hasUndefinedArguments(arguments)) {
      return;
    }

    if(this._seriesKeys && this._seriesKeys.length) {
      return this.completeSeriesConfig[this._seriesKeys[0]]['x'];
    } else {
      return '';
    }
  }


}

window.customElements.define(PxVisBarChart.is, PxVisBarChart);