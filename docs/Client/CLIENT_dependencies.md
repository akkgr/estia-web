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
