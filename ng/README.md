# KD2 Lab 360 Tour

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.0.
To start off with Angular, see [here](https://angular.io/start).

## Development

First install [Node.js](https://nodejs.org/en/) (version 15) on your development machine.
Clone the GitHub project to a local folder.
In your prefered console, navigate to the folder and run `npm i` to install all dependencies.
Then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Folder structure
See https://itnext.io/choosing-the-right-file-structure-for-angular-in-2020-and-beyond-a53a71f7eb05.

## Styling
### Layout
* Flex Layout: https://github.com/angular/flex-layout
* API: https://github.com/angular/flex-layout/wiki/Declarative-API-Overview
* Examples (!): https://tburleson-layouts-demos.firebaseapp.com/#/docs

## Aframe
* Integrated into Angular following https://medium.com/@pitipon/a-frame-with-angular-setup-project-5797b2f2a03b
* Integrate further A-Frame Features: https://rasor.github.io/dependency-management-in-angular-cli-lib-a-frame.html

## Scopes
* Aframe as well as Angular Components use `this`
* `this` within `AFRAME.registerComponent` refers to the Aframe component
* Therefore, `context` is introduced. It points from Aframe components to the Angular component
* Additionally, the `this` context gets lost when calling async methods. Therefore, `self` is used in these cases.

## Icons
* This application uses Font Awesome icons. See the license for details: https://fontawesome.com/license
