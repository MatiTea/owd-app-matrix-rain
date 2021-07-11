import { ModuleApp } from "@owd-client/core/index";
import matrixRainConfig from '~/../config/matrix-rain/config.json'

// window components
import WindowMatrixRain from "./windows/WindowMatrixRain.vue";

export default class MatrixRainModule extends ModuleApp {
  setup() {
    return {
      name: "matrix-rain",
      singleton: true,
      config: matrixRainConfig,
      windows: [
        {
          component: WindowMatrixRain,
          name: "WindowMatrixRain",
          category: "other",
          title: "Enter the Matrix",
          icon: {
            name: "mdi-matrix",
            size: "25px",
            offset: {
              y: -1
            }
          },
          menu: true,
          resizable: false,
          theme: {
            noContentSpacing: true,
          },
          size: {
            width: 380,
            height: 416
          },
          position: {
            x: -1,
            y: 0,
            z: 0
          }
        }
      ]
    }
  }

  setupStore() {
    return {
      state: {
        streamHue: 136,
        speedMultiplier: 0.6,
        draggableHue: false
      }
    }
  }
}
