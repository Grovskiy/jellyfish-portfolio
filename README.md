# Jellyfish Portfolio

A Vue 3 portfolio site showcasing my frontend development projects.

## Demo

Visit the live portfolio at [https://grovskiy.github.io/jellyfish-portfolio/](https://grovskiy.github.io/jellyfish-portfolio/)

## Features

- Vue 3 with Composition API
- Animated transitions between portfolio items
- Responsive design with Tailwind CSS
- Submodule integration for showcasing work samples

## Project Setup

```sh
# Clone the repository with submodules
git clone --recurse-submodules https://github.com/Grovskiy/jellyfish-portfolio.git

# Navigate to project directory
cd jellyfish-portfolio

# Install dependencies
npm install
```

### Development Server

```sh
npm run dev
```

### Production Build

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Deployment to GitHub Pages

Using GitHub Actions

1. Push your code to the `master` branch of your GitHub repository
2. GitHub Actions will automatically build and deploy your site
3. Your site will be available at `https://yourusername.github.io/jellyfish-portfolio/`

## Configuration

- Modify `vite.config.js` to configure build settings
- Update the `sites` array in `src/utils/sites.js` to add new portfolio items

## Project Structure

- `src/components/` - Vue components
- `src/utils/` - Utility functions and data
- `src/assets/` - Static assets (images, styles)
- `work-sites/` - Submodule with code samples

## Technologies Used

- Vue 3
- Vite
- Tailwind CSS
- SCSS
- GitHub Pages
