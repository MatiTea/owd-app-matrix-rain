import {ModuleApp} from '@owd-client/core';

export default class MatrixRainModule extends ModuleApp {
  constructor(context) {
    super(context)
  }

  loadStore() {
    return {
      state: {
        color: "136",
        draggableHue: true
      }
    }
  }
}
