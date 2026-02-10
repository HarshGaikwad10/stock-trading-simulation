import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import ReactApexChart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMarketChart } from '@/state/Coin/Action'

const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    key: "Time Series (Daily)",
    label: "1 Day",
    value: 1,
  },
  {
    keyword: "DIGITAL_CURRENCY_WEEKLY",
    key: "Weekly Time Series",
    label: "1 Week",
    value: 7,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY",
    key: "Monthly Time Series",
    label: "1 Month",
    value: 30,
  },
  {
    keyword: "DIGITAL_CURRENCY_Yearl",
    key: "Yearly Time Series",
    label: "1 Year",
    value: 365,
  },
]

const StockChart = ({ coinId }) => {
  const [activeLable, setActiveLable] = useState(timeSeries[0]);
  const dispatch = useDispatch();
  const { auth, coin } = useSelector(store => store);
  const jwt = auth.jwt || localStorage.getItem("jwt");

 const series = useMemo(() => {
  const cleanedData =
    coin.marketChart.data
      ?.filter(
        (point) =>
          Array.isArray(point) &&
          point.length === 2 &&
          Number.isFinite(point[0]) &&
          Number.isFinite(point[1])
      )
      .map(([x, y]) => [Number(x), Number(y)]) || [];

  return [{ data: cleanedData }];
}, [coin.marketChart.data]);
  
  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      zoom: { autoScaleYaxis: true },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        export: {
          csv: {
            filename: "chart-data",
          },
          svg: {
            filename: "chart-data",
          },
          png: {
            filename: "chart-data",
          },
        },
      },
    },
    theme: {
      mode: "dark",
    },

    dataLabels: { enabled: false },

    xaxis: {
      type: "datetime",
      tickAmount: 6,
    },

    colors: ["#758AA2"],

    markers: {
      strokeColor: "#fff",
      size: 0,
    },

    tooltip: { theme: "dark" },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },

    grid: {
      borderColor: "#47535E",
      strokeDashArray: 4,
    },
  }

  useEffect(() => {
    if (!jwt || !coinId) return;

    dispatch(
      fetchMarketChart({
        coinId,
        days: activeLable.value,
        jwt,
      })
    );
  }, [coinId, activeLable.value, jwt]);

  if (coin.marketChart.loading) {
    return (
      <div className="h-[250px] flex items-center justify-center text-gray-400">
        Loading chart...
      </div>
    );
  }

  if (!coin.marketChart.data?.length) {
    return (
      <div className="h-[250px] flex items-center justify-center text-gray-500">
        Chart data unavailable
      </div>
    );
  }
  return (
    <div>
      <div className="flex gap-3 mb-4">
        {timeSeries.map((item) => (
          <Button
            key={item.label}
            onClick={() => setActiveLable(item)}
            className={`rounded-full border px-4 py-2 transition-all
              ${activeLable.label === item.label
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-white/30 hover:bg-white/10"
              }`}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={250}
      />
    </div>
  )
}

export default StockChart
