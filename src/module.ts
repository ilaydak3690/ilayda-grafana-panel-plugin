import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  builder.addBooleanSwitch({
  path: 'autoColorByTheme',
  name: 'Auto color by theme',
  description: 'If enabled, the circle color automatically changes based on Grafana light/dark theme.',
  defaultValue: true,
});
  return builder
    .addTextInput({
      path: 'text',
      name: 'Simple text option',
      description: 'Description of panel option',
      defaultValue: 'Default value of text input option',
    })
    .addBooleanSwitch({
      path: 'showSeriesCount',
      name: 'Show series counter',
      defaultValue: false,
    })
    .addNumberInput({
  path: 'radiusPerSeries',
  name: 'Grow per series',
  description: 'How much the circle radius increases for each query series.',
  defaultValue: 10,
  settings: {
    min: 1,
    max: 100,
    integer: true,
  },
})
.addNumberInput({
  path: 'maxRadius',
  name: 'Max radius (cap)',
  description: 'Upper limit for the circle radius.',
  defaultValue: 350,
  settings: {
    min: 50,
    max: 1000,
    integer: true,
  },
})
    .addRadio({
      path: 'seriesCountSize',
      defaultValue: 'sm',
      name: 'Series counter size',
      settings: {
        options: [
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
        ],
      },
      showIf: (config) => config.showSeriesCount,
    })
    .addNumberInput({
      path: 'circleRadius',
      name: 'Circle radius',
      description: 'Radius of the circle',
      defaultValue: 100,
      settings: {
        min: 10,
        max: 400,
        integer: true,
      },
    })
    .addColorPicker({
      path: 'circleColor',
      name: 'Circle color',
      description: 'Override circle color',
      defaultValue: '',
    })
    .addBooleanSwitch({
      path: 'showSignature',
      name: 'Show signature',
      description: 'Show developer signature under panel',
      defaultValue: true,
    })
    .addTextInput({
      path: 'signatureText',
      name: 'Signature text',
      description: 'Custom signature text',
      defaultValue: 'Developed by İlayda Kızılırmak',
      showIf: (cfg) => Boolean(cfg.showSignature),
    });
});
