export function getOptions(opt = {}) {
  return {
    theme: { palette: 'palette3' },
    chart: {
      width: '100%',
      height: 480,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 900,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 550 },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '90%',
        borderRadius: 5,
        dataLabels: { position: 'center' },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: 5,
      style: { colors: ['#fff'], fontSize: '0.7rem' },
    },

    stroke: { width: 1, curve: 'smooth' },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: true },
      labels: {
        show: true,
        formatter: function (val) {
          return val;
        },
      },
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        show: true,
        formatter: function (val) {
          return val + '%';
        },
      },
    },
    legend: {
      show: true,
      position: 'right',
      verticalAlign: 'top',
      containerMargin: { left: 35, right: 60 },
    },
    grid: {
      row: { colors: ['#a5b5e5', 'transparent'], opacity: 0.08 },
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    responsive: [
      // {
      //   breakpoint: 360,
      //   options: {
      //     plotOptions: { bar: { horizontal: true } },
      //     legend: { position: 'bottom' },
      //     offsetY: 20,
      //     yaxis: { labels: { rotate: 0, size: 10 } },
      //     xaxis: { labels: { rotate: 0 }, title: { text: 'Votes' } },
      //   },
      // },
      {
        breakpoint: 1000,
        options: {
          plotOptions: { bar: { horizontal: false } },
          legend: { position: 'bottom' },
          chart: { height: 360 },
        },
      },
    ],
    ...opt,
  };
}
