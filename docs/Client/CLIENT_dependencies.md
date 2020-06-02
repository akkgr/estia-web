# DEPENDENCIES IN TYPESCRIPT PROJECT

## React-dom

    ReactDOM is a package that provides DOM specific methods that can be used at the top level of a web app to enable an efficient way of managing DOM elements of the web page. ReactDOM provides the developers with an API containing following methods and a few more.

## React-router-dom

    Why use React Router? React Router, and dynamic, client-side routing, allows us to build a single-page web application with navigation without the page refreshing as the user navigates. React Router uses component structure to call components, which display the appropriate information.

## React Bootstrap

    Bootstrap is a framework to help you design websites faster and easier. It includes HTML and CSS based design templates for typography, forms, buttons, tables, navigation, modals, image carousels, etc. ... Here are some additional reasons to use Bootstrap: Bootstrap's responsive CSS adjusts to phones, tablets, and desktops.

## Import full Path etc /components/admin/Buildings.tsx instead of ../../admin/Buildings.tsx

    To do this only need to import in tsconfig.json inside the
     {
    "compilerOptions": {
        "baseUrl": "src"
         }
    }

## @types/react-datepicker , date-fns , popper.js

    The datepicker is tied to a standard form input field. Focus on the input (click, or use the tab key) to open an interactive calendar in a small overlay. Choose a date, click elsewhere on the page (blur the input), or hit the Esc key to close. If a date is chosen, feedback is shown as the input's value.
    Link for informations https://reactdatepicker.com/

## Eslint

    ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.Linting is the process of running a program that analyzes your code for programmatic and stylistic errors. A linting tool, or a linter, marks or flags any potential errors in your code such as syntax errors or incorrectly spelled variable names

## prettier eslint-config-prettier

    Prettier, on the other hand, only checks for formatting errors within your code but it does this job much better than ESLint.

## eslint-plugin-react-hooks

    This ESLint plugin enforces the Rules of Hooks.

## react-icons

    Svg react icons of popular icon packs   

## react-bootstrap-table-next ,react-bootstrap-table2-paginator
    
    Bootstrap Table for React and additional dependency for paginator