import { useEffect, useState } from 'react'

function useDominantColor(imageUrl) {
  // state to store the dominant color
  const [dominantColor, setDominantColor] = useState('')

  useEffect(() => {
    async function getDominantColor() {
      // create an image object
      const image = new Image()
      image.src = imageUrl
      image.crossOrigin = 'Anonymous'

      // wait for the image to load
      image.addEventListener('load', () => {
        // create a canvas object
        const canvas = document.createElement('canvas')

        // get the canvas context
        const context = canvas.getContext('2d')

        // set the width and height of the canvas
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight

        // draw the image on the canvas
        context.drawImage(image, 0, 0)

        // get the image data
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        )

        // get the pixels from the image data
        const pixels = imageData.data

        // set the r, g, b values to 0
        let r = 0,
          g = 0,
          b = 0

        // loop through every pixel and add the red, green and blue values
        for (let i = 0; i < pixels.length; i += 4) {
          r += pixels[i]
          g += pixels[i + 1]
          b += pixels[i + 2]
        }

        // get the average of the red, green and blue values
        r = Math.floor(r / (pixels.length / 4))
        g = Math.floor(g / (pixels.length / 4))
        b = Math.floor(b / (pixels.length / 4))

        // convert the rgb values to hex
        const color = RGBToHex(r, g, b)

        // set the dominant color state
        setDominantColor(color)
      })
    }

    // if the image url is not empty, call the getDominantColor function
    if (imageUrl) {
      getDominantColor()
    }

    // function to convert rgb to hex
    function RGBToHex(r, g, b) {
      // convert the rgb values to hex
      r = r.toString(16)
      g = g.toString(16)
      b = b.toString(16)

      // make sure the hex values are two digits
      if (r.length == 1) r = '0' + r
      if (g.length == 1) g = '0' + g
      if (b.length == 1) b = '0' + b

      // return the hex value
      return `#${r}${g}${b}`
    }
  }, [imageUrl])

  return dominantColor
}

export default useDominantColor
