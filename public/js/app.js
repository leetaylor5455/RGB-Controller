$(function() {

  const max = 'http://192.168.0.82/';
  const test = 'http://192.168.0.79/';

  const ip = max;


    var colorPicker = new iro.ColorPicker("#picker", {
        // Set the size of the color picker
        width: 320,
        // Set the initial color to pure red
        color: "rgb(255, 255, 255)",
        borderWidth: 2,
        margin: 30
      });

      $.get(ip + 'status', function(data) {
        if (data != null) {
          $('#status').text('Online');
          $('#statusIndicator').css('background-color', '#00FF90')
  
          const greenIndex = data.indexOf('g');
          const blueIndex = data.indexOf('b');
  
          const redVal = data.slice(1, greenIndex)
          const greenVal = data.slice(greenIndex + 1, blueIndex);
          const blueVal = data.slice(blueIndex + 1, data.length);
          
          colorPicker.color.rgb = { r: redVal, g: greenVal, b: blueVal }
        }
      });

      colorPicker.on('input:end', function(color) {
        console.log(color.rgb);
        let appendURL = `?r${color.rgb.r}g${color.rgb.g}b${color.rgb.b}&`;

        $.get(ip + appendURL);
      })
});

