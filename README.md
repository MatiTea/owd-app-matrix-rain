# Matrix Rain for OWD Client
> The OWD module to enter the Matrix, made with p5.js

<p>
    <img src="media/demo.png" alt="OWD Matrix Rain module demo" />
</p>

<p>
    <a href="https://github.com/MatiTea/owd-matrix-rain/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" /></a>
    <a href="https://github.com/owdproject/owd-client"><img src="https://img.shields.io/badge/owd-client-3A9CB6" /></a>
    <a href="https://github.com/topics/owd-modules"><img src="https://img.shields.io/badge/owd-modules-888" /></a>
</p>

## Features
- Display a Matrix Digital Rain in your OWD client
- Set the speed of the rain
- Drag horizontally to set the hue of the streams according to your mood

## Quick install
- Move to your client folder, then
  ```
  # Enter modules app directory
  cd src/modules/app/
  
  # Clone this repository
  git clone https://github.com/MatiTea/owd-app-matrix-rain matrix-rain
  
  # Install dependencies using Yarn, or Npm
  yarn add p5
  npm install p5
  ```
- Define this module in `owd-client/client.extensions.ts`
  ```js
  import AboutModule from "@owd-client/core/src/modules/app/about";
  import DebugModule from "@owd-client/core/src/modules/app/debug";
  import MatrixRain from "~/modules/app/matrix-rain/client";

  export default {
    app: {
      modules: [
        AboutModule,
        DebugModule,
        MatrixRain,
      ]
    },
    ...
  ```
- Copy the content of the [client/config](https://github.com/MatiTea/owd-app-matrix-rain/tree/master/client/config) folder into `owd-client/config`

## Configuration
Edit the `config/matrix-rain/config.json` file
- #### Set the rain speed
    Choose a number to increase or decrease the speed multiplier
- #### Set the default streams hue
    Choose a value between 0 and 360 to set the default hue of the streams
- #### Enable/disable the draggableHue function
    Set the value `true` or `false`

## Dependencies
- p5

## Compatibility
- Open Web Desktop client v2.0.0-beta.2

## License
This project is released under the [MIT License](LICENSE)