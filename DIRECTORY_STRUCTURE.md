# Our Directory Structure

This project follows a folder structure that separates concerns and helps to maintain a clear and organized codebase. The structure consists of four main folders:

- `layouts/`: Contains layouts.

- `routes/`: Contains routes

- `components/`: Contains reusable and composable UI elements that can be used throughout the application.

- `pages/`: Contains components that are responsible for managing state and data for other components.

- `assets/`: Contains all assets used in the project.

- `api/`: Contains files used for API calls and data fetching.

## Components

The `components/` folder contains all reusable UI elements, such as buttons, inputs, cards, and modals. Each component is self-contained and can be easily reused throughout the application. Components should be named using PascalCase and have a `.jsx` file extension.

## Pages

The `pages/` folder contains components that are responsible for managing state and data for other components. Containers are often larger and more complex than regular components and can be thought of as the "glue" that ties the application together. Containers should be named using PascalCase and have a `.jsx` file extension.

## Images

The `assets/` folder contains all assets used in the project. Assets should be named using kebab-case and have a file extension that corresponds to the image format.

## APIs

The `api/` folder contains files used for API calls and data fetching. Each file should be responsible for a specific API endpoint and exported as a function that returns a Promise. Services should be named using camelCase and have a `.js` file extension.

## Layouts

Uses `.jsx` file extension and Named using PascalCase.

## Routes

Uses `.jsx` file extension and Named using PascalCase.

## Conclusion

This folder structure helps to keep the codebase organized and maintainable, by separating concerns and grouping related files together. By following this structure, developers can quickly locate and modify the necessary files and keep the codebase consistent and easy to understand.
