# Matrix Rain for OWD Client
> The famous falling green code in a window, made with p5.js

<p>
    <a href="https://github.com/MatiTea/owd-matrix-rain/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" /></a>
    <a href="https://github.com/owdproject/owd-client"><img src="https://img.shields.io/badge/owd-client-3A9CB6" /></a>
    <a href="https://github.com/topics/owd-modules"><img src="https://img.shields.io/badge/owd-modules-888" /></a>
</p>

## Features
- Display a Matrix Digital Rain in your OWD client
- Set the speed of the rain
- Choose the hue of the streams according to your mood

## Quick install
- Copy the content of the `client` module folder into `owd-client/src/modules/matrix-rain`
- Copy the content of the `client/config` config folder into `owd-client/config`
- Install each module dependency manually with `npm install <dependency>`
- Add the reference of this module into `owd-client/config/modules.json`

## Configuration
Edit the `config/matrix-rain/config.json` file that you copied during the installation
- #### Set the rain speed
    Choose a number to increase or decrease the speed multiplier
- #### Set the default streams hue
    Choose a value between 0 and 360 to set the default hue of the streams
- #### Enable/disable the draggableHue function
    Set the value `true` or `false`

## Dependencies
- p5

## Compatibility
- Open Web Desktop client v2.0.0-alpha.5

## License
This project is released under the [MIT License](LICENSE)
