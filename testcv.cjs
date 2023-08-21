var cv = require('opencv.js');
var jpeg = require('jpeg-js');
var fs = require('fs');
 
// Load an image
var jpeg_data = fs.readFileSync("test_tennis.jpg");
var raw_data = jpeg.decode(jpeg_data);
 
// Create a matrix from image. input image expected to be in RGBA format
var src = cv.matFromImageData(raw_data);
cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY); // Convert to grayscale
 
dst = new cv.Mat();
cv.Canny(src, dst, 50, 150);
cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA); // Convert back to RGBA to display
 
// Save the result
raw_data = {
  data: dst.data,
  width: dst.size().width,
  height: dst.size().height
};
var jpeg_data = jpeg.encode(raw_data, 50);
fs.writeFileSync("test_tennis_lines.jpg", jpeg_data.data);