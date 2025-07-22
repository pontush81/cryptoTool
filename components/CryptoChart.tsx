'use client'

import { useRef, useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface CryptoChartProps {
  symbol: string
  name: string
  data?: number[]
  timestamps?: string[]
  height?: number
}

export default function CryptoChart({ 
  symbol, 
  name, 
  data = [], 
  timestamps = [], 
  height = 400 
}: CryptoChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject>(null)
  const [chartData, setChartData] = useState<number[]>([])
  const [chartTimestamps, setChartTimestamps] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    
    // Generera mock data om ingen riktig data finns - endast på klienten
    if (data.length === 0 || timestamps.length === 0) {
      const basePrice = Math.random() * 50000 + 20000
      const mockData = []
      const mockTimestamps = []
      
      for (let i = 23; i >= 0; i--) {
        const timestamp = new Date()
        timestamp.setHours(timestamp.getHours() - i)
        mockTimestamps.push(timestamp.toISOString())
        
        // Simulera prisfluktuationer
        const variation = (Math.random() - 0.5) * 0.1
        const price = basePrice * (1 + variation)
        mockData.push(Number(price.toFixed(2)))
      }
      
      setChartData(mockData)
      setChartTimestamps(mockTimestamps)
    } else {
      setChartData(data)
      setChartTimestamps(timestamps)
    }
  }, [data, timestamps])

  // Don't render during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-80 bg-gray-100 rounded"></div>
        </div>
      </div>
    )
  }

  // Konvertera data till Highcharts format
  const seriesData = chartTimestamps.map((timestamp, index) => [
    new Date(timestamp).getTime(),
    chartData[index]
  ])

  const options: Highcharts.Options = {
    chart: {
      type: 'line',
      height: height,
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, system-ui, sans-serif'
      }
    },
    title: {
      text: `${name} (${symbol.toUpperCase()}) - 24h`,
      style: {
        color: '#1f2937',
        fontSize: '16px',
        fontWeight: '600'
      }
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Tid'
      },
      gridLineWidth: 0,
      lineColor: '#e5e7eb',
      tickColor: '#e5e7eb',
      labels: {
        style: {
          color: '#6b7280'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Pris (USD)',
        style: {
          color: '#6b7280'
        }
      },
      gridLineColor: '#f3f4f6',
      labels: {
        style: {
          color: '#6b7280'
        },
        formatter: function() {
          return '$' + Number(this.value).toLocaleString()
        }
      }
    },
    tooltip: {
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      shadow: true,
      borderRadius: 8,
      formatter: function() {
        return `
          <b>${name}</b><br/>
          ${Highcharts.dateFormat('%H:%M - %e %b', this.x || 0)}<br/>
          Pris: <b>$${Number(this.y).toLocaleString()}</b>
        `
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      type: 'line',
      name: name,
      data: seriesData,
      color: '#3b82f6',
      lineWidth: 2,
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: true,
            radius: 4,
            fillColor: '#3b82f6',
            lineColor: '#ffffff',
            lineWidth: 2
          }
        }
      },
      states: {
        hover: {
          lineWidth: 3
        }
      }
    }],
    plotOptions: {
      line: {
        animation: {
          duration: 1000
        }
      }
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          chart: {
            height: 300
          },
          title: {
            style: {
              fontSize: '14px'
            }
          }
        }
      }]
    }
  }

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </div>
  )
} 