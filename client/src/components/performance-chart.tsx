import { useEffect, useRef } from "react";
import type { DnsResult, DnsServer } from "@shared/schema";

interface PerformanceChartProps {
  results: (DnsResult & { server: DnsServer })[];
}

export function PerformanceChart({ results }: PerformanceChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!chartRef.current || results.length === 0) return;

    // Dynamically import Chart.js to avoid SSR issues
    import('chart.js/auto').then((Chart) => {
      const ctx = chartRef.current!.getContext('2d');
      
      // Destroy existing chart if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Filter and sort resolved results by response time
      const resolvedResults = results
        .filter(result => result.status === 'resolved' && result.responseTime !== null)
        .sort((a, b) => (a.responseTime || 0) - (b.responseTime || 0));

      if (resolvedResults.length === 0) {
        // Show empty state
        const chart = new Chart.default(ctx!, {
          type: 'bar',
          data: {
            labels: ['No Data'],
            datasets: [{
              label: 'Response Time (ms)',
              data: [0],
              backgroundColor: '#e5e7eb',
              borderColor: '#d1d5db',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Response Time (ms)'
                }
              }
            }
          }
        });
        chartInstanceRef.current = chart;
        return;
      }

      // Prepare data for the chart
      const labels = resolvedResults.map(result => 
        `${result.server.location.split(',')[0]} (${result.server.name})`
      );
      
      const data = resolvedResults.map(result => result.responseTime || 0);

      // Create gradient colors based on performance
      const backgroundColors = data.map(time => {
        if (time < 50) return '#22c55e'; // green - excellent
        if (time < 100) return '#84cc16'; // light green - good
        if (time < 200) return '#eab308'; // yellow - fair
        if (time < 500) return '#f59e0b'; // orange - slow
        return '#ef4444'; // red - very slow
      });

      const chart = new Chart.default(ctx!, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Response Time (ms)',
            data,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color + '80'), // Add transparency
            borderWidth: 1,
            borderRadius: 4,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                title: (context) => {
                  const index = context[0].dataIndex;
                  return `${resolvedResults[index].server.location}\n${resolvedResults[index].server.name} (${resolvedResults[index].server.ip})`;
                },
                label: (context) => {
                  const time = context.parsed.y;
                  let performance = 'Unknown';
                  if (time < 50) performance = 'Excellent';
                  else if (time < 100) performance = 'Good';
                  else if (time < 200) performance = 'Fair';
                  else if (time < 500) performance = 'Slow';
                  else performance = 'Very Slow';
                  
                  return [
                    `Response Time: ${time}ms`,
                    `Performance: ${performance}`
                  ];
                }
              }
            }
          },
          scales: {
            x: {
              display: true,
              ticks: {
                maxRotation: 45,
                minRotation: 0,
                font: {
                  size: 10
                }
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Response Time (ms)'
              },
              ticks: {
                callback: function(value) {
                  return value + 'ms';
                }
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          }
        }
      });

      chartInstanceRef.current = chart;
    }).catch((error) => {
      console.error('Failed to load Chart.js:', error);
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [results]);

  return (
    <div className="relative h-64 w-full">
      <canvas ref={chartRef} className="w-full h-full" />
      {results.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md">
          <div className="text-center">
            <div className="text-gray-400 text-lg mb-2">📈</div>
            <p className="text-sm text-gray-500">Performance metrics will appear here after lookup</p>
          </div>
        </div>
      )}
    </div>
  );
}
