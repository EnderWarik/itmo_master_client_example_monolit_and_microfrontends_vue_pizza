const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/entry-nJILNrky.js","assets/order__loadShare__vue__loadShare__-fXxCTVPO.js","assets/order__mf_v__runtimeInit__mf_v__-CraMCC11.js","assets/entry-D08Bg71-.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from './preload-helper-BC7ZYKCr.js';

const exposesMap = {
    
        "./entry": async () => {
          const importModule = await __vitePreload(() => import('./entry-nJILNrky.js'),true              ?__vite__mapDeps([0,1,2,3]):void 0);
          const exportModule = {};
          Object.assign(exportModule, importModule);
          Object.defineProperty(exportModule, "__esModule", {
            value: true,
            enumerable: false
          });
          return exportModule
        }
      
  };

export { exposesMap as default };
