<template>
  <Window :window="window">
    <div :id="canvasContainerId" v-click-outside="(canvas.focus = false)" />
  </Window>
</template>

<script>
import p5 from "p5";
import Window from "@owd-client/core/src/components/window/Window";

export default {
  components: { Window },

  props: {
    window: Object,
  },

  data() {
    return {
      instance: null,
      canvas: {
        focus: false,
      },
    };
  },

  computed: {
    /**
     * Get id of the canvas container div
     *
     * @returns {string}
     */
    canvasContainerId() {
      return `canvas-container-${this.window.uniqueName}`;
    },
  },

  methods: {
    /**
     * p5.js documentation
     * https://p5js.org/reference/
     *
     * Based on
     * Matrix Digital Rain in p5.js with Emily Xie https://github.com/emilyxxie/green_rain
     */

    /**
     * Initialize canvas
     *
     * @param p5
     */
    canvasInitialize(p5) {
      const self = this;
      let symbol;
      let symbolSize = 18;
      let streams = [];
      let fadeInterval = 1.4;
      let streamsHue = this.$store.state["matrix-rain"].color;
      let draggableHue = self.$store.state["matrix-rain"].draggableHue;

      p5.setup = () => {
        const canvas = p5.createCanvas(500, 430);
        const canvasContainer = document.getElementById(this.canvasContainerId);

        canvas.parent(canvasContainer);

        canvas.mousePressed(() => {
          self.canvas.focus = true;
        });

        canvas.mouseReleased(() => {
          self.canvas.focus = false;
        });

        p5.background(0);
        p5.colorMode(p5.HSL);

        // set the streams number and position in the canvas
        let x = 0;
        for (let i = 0; i <= p5.width / symbolSize; i++) {
          let stream = new Stream();
          stream.generateSymbols(x, p5.random(-1000, 0));
          streams.push(stream);
          x += symbolSize;
        }

        p5.textSize(symbolSize);
      };

      p5.draw = () => {
        p5.background(0, 180);

        // draw the streams
        streams.forEach(function (stream) {
          stream.render();
        });

        if (draggableHue) {
          setStreamsHue();
        }
      };

      function Symbol(x, y, opacity, speed, first) {
        this.x = x;
        this.y = y;
        this.value;
        this.opacity = opacity;
        this.speed = speed;
        this.switchInterval = p5.round(p5.random(2, 20));
        this.first = first;

        this.setToRandomSymbol = function () {
          // Katakana 96 typeface strings are from Unicode Consortium code chart
          // change type according to an interval
          if (p5.frameCount % this.switchInterval == 0) {
            // generate random numbers to be passed into this function from CharCode to generate a string. The string is then set to this.value
            this.value = String.fromCharCode(
              0x30a0 + p5.round(p5.random(0, 96))
            );
          }
        };

        // increment the y position of the single object according to the speed
        this.rain = function () {
          if (this.y >= p5.height) {
            this.y = 0;
          } else {
            this.y += this.speed;
          }
        };
      }

      function Stream() {
        this.symbols = [];
        // random stream length
        this.totalSymbols = p5.round(p5.random(5, 20));
        // random stream speed
        this.speed = p5.random(2, 6);

        this.generateSymbols = function (x, y) {
          let opacity = 1;
          // 20% chance for the first symbol to be brighter
          let first = p5.round(p5.random(0, 4)) == 1;
          for (let i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(x, y, opacity, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            opacity -= 1 / this.totalSymbols / fadeInterval;
            y -= symbolSize;
            // just the first letter has to be set true
            first = false;
          }
        };

        // display each symbol
        this.render = function () {
          this.symbols.forEach(function (symbol) {
            // set the streams color
            if (symbol.first) {
              p5.fill(streamsHue, 100, 85, symbol.opacity);
            } else {
              p5.fill(streamsHue, 100, 50, symbol.opacity);
            }
            p5.text(symbol.value, symbol.x, symbol.y);
            // make the symbols rain
            symbol.rain();
            // make the symbols change randomly
            symbol.setToRandomSymbol();
          });
        };
      }

      // change the hue of the streams
      function setStreamsHue() {
        if (
          p5.mouseIsPressed &&
          p5.mouseButton === p5.LEFT &&
          self.canvas.focus
        ) {
          streamsHue = p5.round(p5.map(p5.mouseX, 0, p5.width, 0, 360));
          return false;
        }
      }
    },
  },

  /**
   * Vue.js mount event
   */
  mounted() {
    // initialize p5.js instance
    this.instance = new p5(this.canvasInitialize);
  },

  /**
   * Vue.js beforeUnmount event
   */
  beforeUnmount() {
    // destroy p5.js instance
    this.instance.remove();
  },
};
</script>