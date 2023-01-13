# Deck.gl, Geoparquet and H3 example

This example shows how to use deck.gl to render a geoparquet file with H3 hexagons.

[Innovation doc](https://docs.google.com/document/d/1URDccLlWyPlpr_o5gCLaj_2G9qxTVIL41MMRGYXO1Vk/edit)

## Use case

* No API provided
* No data transformation needed
* SPA application
* All data managed by the client
* From a unique file (geoparquet)

## The target

Render a map with h3 layers from a geoparquet file containing hexagons with a color scale.

## The data

The data is a geoparquet file containing hexagons with a color scale.

## The solution

* Use deck.gl to render the map
* Use geoparquet to read the file

## Conclusions

* The geoparquet file is very light, it's a good solution to store data and transmit it to the client
* The geoparquet file is very easy to read with geoparquet library
* The geoparquet file is very easy to render with deck.gl using the H3 layer

## Problems pending to solve

* H3 resolution depending on the zoom level
* Filters on the fly
* Limitations in mobile devices, only res 4 worked

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
