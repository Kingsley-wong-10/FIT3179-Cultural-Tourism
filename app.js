// Each chart has a separate JSON specification, as in the Week 9 studio.
// The chart libraries are loaded by index.html from the vendor folder.
var chartViews = {};
var chartsLoaded = 0;

function loadChart(id, specification) {
  vegaEmbed('#' + id, specification, {actions: false, renderer: 'svg'})
    .then(function (result) {
      chartViews[id.slice(-2)] = result.view;
      sizeChart(id, result.view);
      chartsLoaded += 1;
      document.body.dataset.chartsReady = chartsLoaded;
    })
    .catch(function (error) {
      console.error(error);
      document.getElementById(id).innerHTML =
        '<p class="error">This chart could not load. Check that the data, specs and vendor folders were uploaded.</p>';
    });
}

// Standard charts use width: "container" in their specifications.
// The faceted waffle and Vega treemap need their widths set separately.
function sizeChart(id, view) {
  var width = document.getElementById(id).clientWidth;
  if (id === 'chart-10') {
    view.signal('child_width', Math.max(100, (width - 35) / 2));
  }
  if (id === 'chart-11') {
    view.width(width);
  }
  view.resize().runAsync();
}

loadChart('chart-01', 'specs/01.json');
loadChart('chart-02', 'specs/02.json');
loadChart('chart-03', 'specs/03.json');
loadChart('chart-04', 'specs/04.json');
loadChart('chart-05', 'specs/05.json');
loadChart('chart-06', 'specs/06.json');
loadChart('chart-07', 'specs/07.json');
loadChart('chart-08', 'specs/08.json');
loadChart('chart-09', 'specs/09.json');
loadChart('chart-10', 'specs/10.json');
loadChart('chart-11', 'specs/11.json');
loadChart('chart-12', 'specs/12.json');

window.addEventListener('resize', function () {
  Object.keys(chartViews).forEach(function (number) {
    sizeChart('chart-' + number, chartViews[number]);
  });
});
