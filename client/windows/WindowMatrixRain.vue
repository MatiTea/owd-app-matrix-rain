<template>
  <Window :window="props.window">
    <div :id="canvasContainerId" />
  </Window>
</template>

<script setup>
import p5 from "p5";
import { ref, computed, defineProps, onMounted, onBeforeUnmount } from "vue";
import Window from "@owd-client/core/src/components/window/app/WindowApp.vue";
import { useStore } from "vuex";

const instance = ref(null);

const props = defineProps({
  window: Object,
});

const canvasContainerId = computed(
  () => `canvas-container-${props.window.uniqueName}`
);

const store = useStore();

/**
 * p5.js documentation
 * https://p5js.org/reference/
 *
 * Based on
 * Matrix Digital Rain in p5.js with Emily Xie https://github.com/emilyxxie/green_rain
 */

function canvasInitialize(p5) {
  let canvas;
  let symbol;
  let symbolSize = 18;
  let streams = [];
  let fadeInterval = 1.4;
  let streamHue = store.state["matrix-rain"].streamHue;
  let speedMultiplier = store.state["matrix-rain"].speedMultiplier;
  let draggableHue = store.state["matrix-rain"].draggableHue;

  p5.setup = () => {
    canvas = p5.createCanvas(378, 378);
    const canvasContainer = document.getElementById(canvasContainerId.value);

    canvas.parent(canvasContainer);

    canvas.mousePressed(() => {
      canvas.focus = true;
    });

    canvas.mouseReleased(() => {
      canvas.focus = false;
    });

    p5.background(0);
    p5.colorMode(p5.HSL);

    // set the streams number and position in the canvas
    let x = 0;
    for (let i = 0; i <= p5.width / symbolSize; i++) {
      let stream = new Stream();
      stream.generateSymbols(x, p5.random(-800, 0));
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
      setStreamHue();
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
        this.value = String.fromCharCode(0x30a0 + p5.round(p5.random(0, 96)));
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
    this.totalSymbols = p5.round(p5.random(5, 18));
    // random stream speed
    this.speed = p5.random(1 * speedMultiplier, 3 * speedMultiplier);

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
          p5.fill(streamHue, 100, 85, symbol.opacity);
        } else {
          p5.fill(streamHue, 100, 50, symbol.opacity);
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
  function setStreamHue() {
    if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT && canvas.focus) {
      streamHue = p5.round(p5.map(p5.mouseX, 0, p5.width, 0, 360));
      return false;
    }
  }
}

onMounted(() => (instance.value = new p5(canvasInitialize)));
onBeforeUnmount(() => instance.value.remove());
</script>