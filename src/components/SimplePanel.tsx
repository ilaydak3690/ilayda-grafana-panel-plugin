import React from 'react';
import { PanelProps } from '@grafana/data';
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
  const seriesCount = data.series.length;

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

  const circleColor = options.autoColorByTheme
    ? theme.isDark
      ? theme.colors.primary.main
      : theme.colors.primary.light
    : options.circleColor || theme.colors.primary.main;

  const radiusPerSeries = options.radiusPerSeries ?? 15;
  const maxRadius = options.maxRadius ?? 350;
  const baseRadius = options.circleRadius ?? 100;

  const dynamicRadius = Math.min(baseRadius + seriesCount * radiusPerSeries, maxRadius);

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
      <svg
        className={styles.svg}
        width={width}
        height={height}
        viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
      >
        <circle
          data-testid="simple-panel-circle"
          r={dynamicRadius}
          style={{
            fill: circleColor,
          }}
        />
      </svg>

      <div className={styles.textBox}>
        {options.showSeriesCount && (
          <div data-testid="simple-panel-series-counter">
            Number of series: {data.series.length}
          </div>
        )}
        <div
  style={{
    marginTop: '6px',
    fontSize: '12px',
    opacity: 0.8,
  }}
>
  <div>Base radius: {options.circleRadius ?? 100}</div>
  <div>Series count: {seriesCount}</div>
  <div>
    Circle radius (calculated): <b>{dynamicRadius}</b>
  </div>
</div>

        <div>Text option value: {options.text}</div>

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