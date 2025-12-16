import React from 'react';
import { FieldType, PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';
import { PanelDataErrorView } from '@grafana/runtime';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => ({
  wrapper: css`
    font-family: Open Sans;
    position: relative;
  `,
  svg: css`
    position: absolute;
    top: 0;
    left: 0;
  `,
  textBox: css`
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px;
  `,
});

export const SimplePanel: React.FC<Props> = ({
  options,
  data,
  width,
  height,
  fieldConfig,
  id,
}) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);

  if (data.series.length === 0) {
    return (
      <PanelDataErrorView
        fieldConfig={fieldConfig}
        panelId={id}
        data={data}
        needsStringField
      />
    );
  }

  // --- Time series chart helpers (SVG) ---
  const maxLines = 4;
  const seriesFrames = (data.series ?? []).slice(0, maxLines);

  type Pt = { t: number; v: number };

  const toPoints = (frame: any): Pt[] => {
    const timeField = frame?.fields?.find((f: any) => f.type === FieldType.time);
    const numberField = frame?.fields?.find((f: any) => f.type === FieldType.number);
    if (!timeField || !numberField) return [];

    const tVals = timeField.values;
    const vVals = numberField.values;

    const n = Math.min(tVals.length, vVals.length);
    const pts: Pt[] = [];

    for (let i = 0; i < n; i++) {
      const t = Number(tVals.get(i));
      const v = Number(vVals.get(i));
      if (!Number.isFinite(t) || !Number.isFinite(v)) continue;
      pts.push({ t, v });
    }

    return pts;
  };

  const chartSeries: Pt[][] = seriesFrames.map((f: any) => toPoints(f)).filter((p) => p.length > 1);
  const allPts: Pt[] = chartSeries.flat();

  const tMin = allPts.length ? Math.min(...allPts.map((p) => p.t)) : 0;
  const tMax = allPts.length ? Math.max(...allPts.map((p) => p.t)) : 1;
  const vMin = allPts.length ? Math.min(...allPts.map((p) => p.v)) : 0;
  const vMax = allPts.length ? Math.max(...allPts.map((p) => p.v)) : 1;

  const padL = 44;
  const padR = 12;
  const padT = 12;
  const padB = 28;

  const x = (t: number) => {
    const denom = tMax - tMin || 1;
    return padL + ((t - tMin) / denom) * (width - padL - padR);
  };

  const y = (v: number) => {
    const denom = vMax - vMin || 1;
    return padT + (1 - (v - vMin) / denom) * (height - padT - padB);
  };

  const colors = ['#7EB26D', '#EAB839', '#6ED0E0', '#EF843C'];

  // --- Latest value per series (time series awareness) ---
  type Latest = { name: string; value?: number; time?: number };

  const latestBySeries: Latest[] = seriesFrames.map((frame: any, idx: number) => {
    const timeF = frame?.fields?.find((f: any) => f.type === FieldType.time);
    const numF = frame?.fields?.find((f: any) => f.type === FieldType.number);

    if (!timeF || !numF) {
      return { name: frame?.name || `Series ${idx + 1}` };
    }

    const n = Math.min(timeF.values.length, numF.values.length);
    if (n <= 0) {
      return { name: frame?.name || `Series ${idx + 1}` };
    }

    const last = n - 1;
    const v = Number(numF.values.get(last));
    const t = Number(timeF.values.get(last));

    return {
      name: frame?.name || `Series ${idx + 1}`,
      value: Number.isFinite(v) ? v : undefined,
      time: Number.isFinite(t) ? t : undefined,
    };
  });

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <svg className={styles.svg} width={width} height={height}>
        {chartSeries.length === 0 ? (
          <text x={padL} y={padT + 14} fontSize={12} fill={theme.colors.text.secondary}>
            No time series data found in query result.
          </text>
        ) : (
          <>
            {/* Grid */}
            {Array.from({ length: 5 }).map((_, i) => {
              const yy = padT + (i * (height - padT - padB)) / 4;
              return (
                <line
                  key={`gy-${i}`}
                  x1={padL}
                  x2={width - padR}
                  y1={yy}
                  y2={yy}
                  stroke="rgba(255,255,255,0.08)"
                />
              );
            })}
            {Array.from({ length: 7 }).map((_, i) => {
              const xx = padL + (i * (width - padL - padR)) / 6;
              return (
                <line
                  key={`gx-${i}`}
                  y1={padT}
                  y2={height - padB}
                  x1={xx}
                  x2={xx}
                  stroke="rgba(255,255,255,0.06)"
                />
              );
            })}

            {/* Axes */}
            <line x1={padL} x2={padL} y1={padT} y2={height - padB} stroke="rgba(255,255,255,0.20)" />
            <line
              x1={padL}
              x2={width - padR}
              y1={height - padB}
              y2={height - padB}
              stroke="rgba(255,255,255,0.20)"
            />

            {/* Y min/max labels */}
            <text x={8} y={padT + 12} fontSize={11} fill="rgba(255,255,255,0.65)">
              {vMax.toFixed(2)}
            </text>
            <text x={8} y={height - padB} fontSize={11} fill="rgba(255,255,255,0.65)">
              {vMin.toFixed(2)}
            </text>

            {/* Lines */}
            {chartSeries.map((pts, idx) => {
              const points = pts.map((p) => `${x(p.t)},${y(p.v)}`).join(' ');
              return (
                <polyline
                  key={`s-${idx}`}
                  points={points}
                  fill="none"
                  stroke={colors[idx % colors.length]}
                  strokeWidth={2}
                  opacity={0.95}
                />
              );
            })}
          </>
        )}
      </svg>

      <div className={styles.textBox}>
        {options.showSeriesCount && (
          <div data-testid="simple-panel-series-counter">
            Number of series: {data.series.length}
          </div>
        )}
        {/* Latest value per series */}
        <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.4 }}>
          {latestBySeries.slice(0, 4).map((s, idx) => (
            <div key={`${s.name}-${idx}`}>
              <b>{s.name}:</b> {typeof s.value === 'number' ? s.value : 'N/A'}
              {s.time ? (
                <span style={{ marginLeft: 8, opacity: 0.7 }}>
                  ({new Date(s.time).toLocaleString()})
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 6, fontSize: 12, opacity: 0.85 }}>
          Text option value: {options.text}
        </div>
        {options.showSignature && (
          <div
            style={{
              marginTop: '8px',
              fontWeight: 'bold',
              color: theme.colors.text.primary,
            }}
          >
            {options.signatureText || 'Developed by İlayda Kızılırmak'}
          </div>
        )}
      </div>
    </div>
  );
};