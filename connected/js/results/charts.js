// import '../../node_modules/apexcharts/dist/apexcharts.min.js';
import { newElement } from '../utils/dom-utils.js';
import { readResultsData } from './results.js';
import { getOptions } from './utils/results.utils.js';

async function draw({ opt, chartContainer }) {
  const options = getOptions({
    theme: { palette: 'palette7' },
    title: {
      text: 'Vote results',
      floating: false,
      offsetY: 20,
      align: 'center',
      style: { color: '#444', fontSize: '1rem' },
    },
    ...opt,
  });

  let chart = new ApexCharts(chartContainer, options);
  chart.render();
}
export async function drawChart() {
  const resultsData = await readResultsData();
  const options = {
    bar: {
      xaxis: { categories: resultsData.names },
      chart: { type: 'bar' },
      series: resultsData.votes,
      theme: { palette: 'palette7' },
    },
    donut: {
      series: resultsData.votes[0].data,
      chartOptions: { labels: resultsData.names },
      chart: { type: 'donut' },
      theme: { palette: 'palette7' },
    },
  };
  handleBtnTabClick(options);

  await draw({
    opt: options.donut,
    chartContainer: document.querySelector('#chart'),
  });
}

(async () => await drawChart())();

function handleBtnTabClick(options) {
  const btnsTabs = document.querySelectorAll('.btn-tab');

  const chartContainerParent = document.querySelector('.chart-tab-container');
  if (!btnsTabs || !chartContainerParent) return;

  const newChartContainer = () => newElement('div', { id: 'chart' });

  btnsTabs.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const activeTab = document.querySelector('.active-tab');
      activeTab.classList.remove('active-tab');
      e.target.classList.add('active-tab');
      const chartType = e.target.dataset.chart;
      chartContainerParent?.replaceChildren();

      const el = newChartContainer();
      chartContainerParent?.append(el);
      await draw({ opt: options[chartType], chartContainer: el });
    });
  });
}
