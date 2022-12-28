# Image Processing API

API for resizing and serving images to reduce page load size.

## Installation

1. Clone the repository
 
2. Install the dependencies: 

```
npm install
```

3. Start the development server:

```
npm run dev
```

## Usage

Send a GET request to the `/api/images` route with the following query parameters:

- `filename`: path to image file
- `width`: desired width of the resized image
- `height`: desired height of the resized image
