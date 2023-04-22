
import { createElement } from 'react';
import { render } from 'react-dom';
import {
    Skeleton as InnerSkeleton,
} from '@firefly/auto-editor-skeleton';
import {
  Designer,
  AutoCodePluginManager,
  ILowCodePluginContext,
  PluginPreference,
} from '@firefly/auto-designer';
import { Editor, globalContext } from '@firefly/auto-editor-core';
import getSkeletonCabin from './modules/skeleton-cabin';
import DesignerPlugin from '@firefly/auto-plugin-designer';
import LocatorPlugin from '@firefly/auto-plugin-locator';
import { IconOutline } from './IconOutline';
import { OutlinePane } from './OutlinePane';


const editor = new Editor();
globalContext.register(editor, Editor);
globalContext.register(editor, 'editor');

const designer = new Designer({ editor });
editor.set('designer' as any, designer);

const innerSkeleton = new InnerSkeleton(editor);
const skeletonCabin = getSkeletonCabin(innerSkeleton);
const { Workbench } = skeletonCabin;

const plugins = new AutoCodePluginManager(editor).toProxy();

let engineInited = false;

(async function registerPlugins() {
  const locatorRegistry = (ctx: ILowCodePluginContext) => {
    return {
      init() {
        LocatorPlugin(ctx);
      },
    };
  };
  locatorRegistry.pluginName = '__locator__';
  await plugins.register(locatorRegistry);

  const defaultPanelRegistry = (ctx: ILowCodePluginContext) => {
    return {
      init() {
        innerSkeleton.add({
          area: 'mainArea',
          name: 'designer',
          type: 'Widget',
          content: DesignerPlugin,
        });

        innerSkeleton.add({
          area: 'leftArea',
          name: 'outlinePane',
          type: 'PanelDock',
          content: {
            name: 'outline-pane',
            props: {
              icon: IconOutline,
              description: null,
            },
            content: OutlinePane,
          },
          panelProps: {
            area: 'leftFloatArea',
            keepVisibleWhileDragging: true,
          },
        });
      },
    };
  };
  defaultPanelRegistry.pluginName = '___default_panel___';
  await plugins.register(defaultPanelRegistry);

  const editorInit = (ctx: ILowCodePluginContext) => {
    return {
      name: 'editor-init',
      async init() {
        // 修改面包屑组件的分隔符属性setter
        // const assets = await (
        //   await fetch(
        //     `https://alifd.alicdn.com/npm/@alilc/lowcode-materials/build/lowcode/assets-prod.json`
        //   )
        // ).json();
        // 设置物料描述
        const { project } = ctx;

        // 加载 schema
        project.open();
      },
    };
  };
  editorInit.pluginName = 'editorInit';
  await plugins.register(editorInit);

})();

export async function init(
    container?: HTMLElement | null,
    options?: any,
    pluginPreference?: any,
) {
    if (engineInited) return;
    engineInited = true;

    let engineOptions = options;
    let engineContainer = container || document.createElement('div');
    await plugins.init(pluginPreference as any);
    render(
        createElement(Workbench, {
          skeleton: innerSkeleton,
          className: 'engine-main',
          topAreaItemClassName: 'engine-actionitem',
        }),
        engineContainer,
      );
    console.log('auto engine core init');
}