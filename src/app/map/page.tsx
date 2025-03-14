'use client';

import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const thumbnail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 确保DOM已加载
    if (!mapRef.current) return;

    // 初始化echarts实例
    const chart = echarts.init(mapRef.current);

    // 注册中国地图数据
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
      .then(response => response.json())
      .then(geoJson => {
        echarts.registerMap('China', geoJson);
        
        // 配置项
        const option = {
          title: {
            text: 'Map',
            left: 'center'
          },
          tooltip: {
            triggerOn: 'click'
          },
          geo: {
            map: 'China',
            roam: true,
            scaleLimit: {
              min: 1.5,
              max: 3
            },
            zoom: 1.8,
            label: {
              show: false,
              fontSize: 8
            },
            itemStyle: {
              areaColor: '#e5e7eb',
              borderColor: '#666',
              borderWidth: 0.5
            },
            emphasis: {
              itemStyle: {
                areaColor: '#b8c5f2'
              },
              label: {
                show: true
              }
            },
            tooltip: {
              trigger: 'item',
              enterable: true,
              position: 'inside',
              formatter: function(param: any) {
                const handleTooltipClick = (name: string) => {
                  console.log(`Clicked on region: ${name}`);
                };
                return `<div style="width: 120px; padding: 8px; background: rgba(255,255,255,0.9); border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" onclick="(${handleTooltipClick.toString()})('${param.name}')">
                  <div style="font-size: 14px; margin-bottom: 4px;">${param.name}</div>
                  <img src="/thumbnails/${param.name}.jpg" style="width: 100%; height: 80px; object-fit: cover; border-radius: 2px;" onerror="this.style.display='none'"/>
                </div>`
              }
            },
          }
        };

        // 使用配置项设置图表
        chart.setOption(option);
      });

    // 清理函数
    return () => {
      chart.dispose();
    };
  }, []);

  return (
      <div 
        ref={mapRef} 
        style={{ 
          width: '100%', 
          height: 'calc(100vh - 100px)',
          marginTop: '16px'
        }} 
      />
  );
}
