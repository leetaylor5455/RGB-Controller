$(function() {

  const max = 'http://192.168.0.82/';
  const test = 'http://192.168.0.79/';
  const prod = 'http://192.169.99.192/';

  const ip = prod;
  let isTurnedOn = false;

  function indicateOff() {
    $('#Ellipse_6').css('stroke', '#FF003D');
    $('#Rectangle_2').css('fill', '#FF003D');
    $('#shadowColouring').attr('flood-opacity', '0');
    $('#picker').css({'opacity': '0.5', 'pointer-events': 'none'});
    isTurnedOn = false;
  }

  function indicateOn() {
    $('#Ellipse_6').css('stroke', '#00E27F');
    $('#Rectangle_2').css('fill', '#00E27F');
    $('#shadowColouring').attr('flood-opacity', '0.5');
    $('#picker').css({'opacity': '1', 'pointer-events': 'all'});
    isTurnedOn = true;
  }

  var colorPicker = new iro.ColorPicker("#picker", {
    width: 320,
    color: "#ffffff",
    borderWidth: 2,
    margin: 30
  });

  function checkStatus() {
    $.ajax({
      type: 'GET',
      url: ip + 'status',
      success: function(data) {
        $('#status').text('Online');
        $('#statusIndicator').css('background-color', '#00FF90');
        $('.power-button').css({'opacity': '1', 'pointer-events': 'all'});

        if (data.indexOf('g') <= 0) {
          indicateOff();
        } else {
          indicateOn();
          const greenIndex = data.indexOf('g');
          const blueIndex = data.indexOf('b');

          const redVal = data.slice(1, greenIndex)
          const greenVal = data.slice(greenIndex + 1, blueIndex);
          const blueVal = data.slice(blueIndex + 1, data.length);
          
          colorPicker.color.rgb = { r: redVal, g: greenVal, b: blueVal }
        }        
      },
      error: function() {
        $('#status').text('Offline');
        $('#statusIndicator').css('background-color', '#FF003D');
        $('#picker, .power-button').css({'opacity': '0.5', 'pointer-events': 'none'});
      }
    });
  }

  checkStatus();
  setInterval(checkStatus, 3000);

  
  $('.power-button').on('click', function() {
    console.log(colorPicker)
    if (isTurnedOn) {
      $.ajax({
        type: 'GET', 
        url: ip + 'off',
        success: function() {
          indicateOff();
        }
      });
    } else {
      
      $.ajax({
        type: 'GET', 
        url: ip + 'on',
        success: function() {
          indicateOn();
        }
      });
    }
  });

  colorPicker.on('input:end', function(color) {
    console.log(color.rgb);
    rgb = {
      r: color.rgb.r,
      g: color.rgb.g,
      b: color.rgb.b,
    }
    let appendURL = `?r${color.rgb.r}g${color.rgb.g}b${color.rgb.b}&`;

    $.get(ip + appendURL);
  });
});

