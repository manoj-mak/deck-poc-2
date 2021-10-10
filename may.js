const deckgl = new deck.DeckGL({
    mapboxApiAccessToken: 'pk.eyJ1IjoibWFub2ptYWsiLCJhIjoiY2t1NDAwZ25tNG1keTJubXBpb3AxM3d5aiJ9.oUxJa5JSJK9T73TRKjWTCA',
    mapStyle: 'mapbox://styles/manojmak/ckufwao305biz18qjndqkm402',
    initialViewState: {
      longitude: 79.711,
      latitude: 17.592,
      zoom: 3.70,
      bearing: 30,
      pitch: 40,
      
      
    },
    controller: true
  });
  //sample data :
  //const data = d3.csv('https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv');

  //complete data :
  //const data = d3.json('https://raw.githubusercontent.com/manoj-mak/deckgl-data-visualization/master/thedata.json');


  //april data:
  //const data = d3.json('https://raw.githubusercontent.com/manoj-mak/deckgl-data-visualization/master/april.json');

  //may data:
  const data = d3.json('https://raw.githubusercontent.com/manoj-mak/deckgl-data-visualization/master/may.json');

  //june data :
  //const data = d3.json('https://raw.githubusercontent.com/manoj-mak/deckgl-data-visualization/master/june.json');

  //july data:
  //const data = d3.json('https://raw.githubusercontent.com/manoj-mak/deckgl-data-visualization/master/july.json');

  //august data:
  //const data = d3.json('https://raw.githubusercontent.com/manoj-mak/deckgl-data-visualization/master/august.json');

  //
  
  const OPTIONS = ['radius',  'upperPercentile'];
  
  const COLOR_RANGE = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
  ];
  
  OPTIONS.forEach(key => {
    document.getElementById(key).oninput = renderLayer;
  });
  
  renderLayer();
  
  function renderLayer () {
    const options = {};
    OPTIONS.forEach(key => {
      const value = +document.getElementById(key).value;
      document.getElementById(key + '-value').innerHTML = value;
      options[key] = value;
    });


    function myFunction() {
      document.getElementById("myDropdown").classList.toggle("show");
    }
    
    

    
  
    const hexagonLayer = new deck.HexagonLayer({
      id: 'heatmap',
      colorRange: COLOR_RANGE,
      data,
      getElevationWeight: d => (d.Volume * 1) ,
      elevationRange: [200, 3000],
      elevationScale: 250,
      extruded: true,
      coverage: 1.00,
      
      //getPosition: d => [Number(d.lng), Number(d.lat)],
      getPosition: d => [Number(d.Longitude),Number(d.Latitude)],
      opacity: 0.7,
      ...options,

      pickable: true,
     /* onHover: ({object, x, y}) => {
        const el = document.getElementById('tooltip');
        if (object) {
          const { Volume, District } = object;
          el.innerHTML = `<h1>${District} : ${Volume}</h1>`
          el.style.display = 'block';
          el.style.opacity = 0.9;
          el.style.left = x + 'px';
          el.style.top = y + 'px';
        } else {
          el.style.opacity = 0.0;
        }
    },
    */



    });
  
    deckgl.setProps({
      layers: [hexagonLayer],
      
      
    });
    

    



  }
  