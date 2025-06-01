import { useEffect, useMemo, useState } from "react";
import { AxisOptions, Chart } from "react-charts";

type DailyVisitors = {
  date: Date;
  visitors: number;
};

type Series = {
  label: string;
  data: DailyVisitors[];
};

const generateDates = (startDate: Date, count: number, stepDays: number) => {
  const dates = [];
  for (let i = 0; i < count; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i * stepDays);
    dates.push(date);
  }
  return dates;
};

const startDate = new Date("2025-04-12");
const dates = generateDates(startDate, 8, 2);

const data: Series[] = [
  {
    label: "Новые клиенты",
    data: dates.map((date, i) => ({
      date,
      visitors: 800 + Math.round(Math.sin(i) * 300),
    })),
  },
  {
    label: "Старые клиенты",
    data: dates.map((date, i) => ({
      date,
      visitors: 400 + Math.round(Math.cos(i) * 200),
    })),
  },
];

interface IReactChartProps {
  onSuccess: () => void
}

export function ReactChart({onSuccess}: IReactChartProps) {
  const [isVisibility, setIsVisibility] = useState(false);
  const primaryAxis = useMemo<AxisOptions<DailyVisitors>>(
    () => ({
      getValue: datum => datum.date,
      scaleType: "time",
    }),
    []
  );

  const secondaryAxes = useMemo<AxisOptions<DailyVisitors>[]>(
    () => [
      {
        getValue: datum => datum.visitors,
        scaleType: "linear",
        min: 0,
        max: 1300,
      },
    ],
    []
  );

  useEffect(() => {
    setTimeout(() => {
      setIsVisibility(!isVisibility)
      onSuccess();
    }, 300);
  }, []);

  return (
    <Chart
      style={{visibility: isVisibility ? 'visible' : 'hidden'}}
      options={{
        data,
        primaryAxis,
        secondaryAxes,
        getSeriesStyle: () => ({
          strokeWidth: 2,
        }),
        tooltip: true,
      }}
    />
  );
}
