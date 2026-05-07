'use client';

import { getCandlestickConfig, getChartConfig, PERIOD_BUTTONS } from "@/constants";
import {
  CandlestickSeries,
  createChart,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";
import { useEffect, useMemo, useRef, useState } from "react";

export function CandlestickChart({
    children,
    data,
    coinId,
    height = 360,
    initialPeriod = 'daily'
}: CandlestickChartProps) {
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartref = useRef<IChartApi  | null>(null);
    const candleSeriesRef = useRef<ISeriesApi<'Candlestick'>| null>(null);

    const [loading, setLoading] = useState(false);
    const [period, setPeriod] = useState(initialPeriod);
    const [ohlcData, setOhclData] = useState<OHLCData[]>(data ?? []);

    const chartData = useMemo(() => (
        ohlcData.map(([time, open, high, low, close]) => ({
            time: Math.floor(time / 1000) as UTCTimestamp,
            open,
            high,
            low,
            close,
        }))
    ), [ohlcData]);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const container = chartContainerRef.current;
        const chart = createChart(container, {
            ...getChartConfig(height, period === 'daily' || period === 'weekly'),
            width: container.clientWidth,
        });
        const series = chart.addSeries(CandlestickSeries, getCandlestickConfig());

        chartref.current = chart;
        candleSeriesRef.current = series;
        series.setData(chartData);
        chart.timeScale().fitContent();

        const resizeObserver = new ResizeObserver(([entry]) => {
            chart.applyOptions({ width: entry.contentRect.width });
            chart.timeScale().fitContent();
        });
        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
            chart.remove();
        };
    }, [height]);

    useEffect(() => {
        candleSeriesRef.current?.setData(chartData);
        chartref.current?.timeScale().fitContent();
    }, [chartData]);

    const fetchOHLCData = async (selectedPeriod: Period) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/coins/${coinId.trim()}/ohlc?period=${selectedPeriod}`);

            if (!response.ok) {
                throw new Error('Unable to load chart data');
            }

            const nextData: OHLCData[] = await response.json();
            setOhclData(nextData);
        } catch (error) {
            console.error('Error fetching OHLC data:', error);
        } finally {
            setLoading(false);
        }
    }

    const handlePeriodChange = (newPeriod: Period) => {
        if (newPeriod === period) return;
        setPeriod(newPeriod); 
        void fetchOHLCData(newPeriod);
    }
    return (
        <div id='candlestick-chart'>
            <div className='chart-header '>
                <div className='flex-1'>{ children }</div>
                <div className="button-group">
                    <span className="text-sm mx-2 font-medium text-purple-100/50">Period:</span>
                    {PERIOD_BUTTONS.map(({value, label}) => (
                        <button key={value} className={period == value ? 'config-button-active' : 'config-button'} onClick={() => handlePeriodChange(value)} disabled={loading}>
                            {label} 
                        </button>
                    ))}
                    
                </div>
            </div>
            <div ref={chartContainerRef} className="chart" style={{ height }} />
        </div>
    )
}
