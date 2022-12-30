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

For instance, assuming the app is running locally on port 3000:

```
http://localhost:3000/api/images?filename=image.jpg&width=100&height=100
```
This will return a resized version of the `image.jpg` file with a width of 100 pixels and a height of 100 pixels.

## License

The Image Processing API is released under the MIT License. See the [LICENSE](LICENSE) file for more information.
