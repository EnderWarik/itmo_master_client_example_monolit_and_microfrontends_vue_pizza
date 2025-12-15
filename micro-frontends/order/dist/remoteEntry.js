const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/pinia-CKrZD1Z-.js","assets/order__loadShare__vue__loadShare__-fXxCTVPO.js","assets/order__mf_v__runtimeInit__mf_v__-CraMCC11.js"])))=>i.map(i=>d[i]);
import { i as init_1 } from './assets/index.cjs-DfOq2DoA.js';
import exposesMap from './assets/virtualExposes-BoxiMuXw.js';
import { _ as __vitePreload } from './assets/preload-helper-BC7ZYKCr.js';
import { o as order__mf_v__runtimeInit__mf_v__ } from './assets/order__mf_v__runtimeInit__mf_v__-CraMCC11.js';

const importMap = {
      
        "pinia": async () => {
          let pkg = await __vitePreload(() => import('./assets/pinia-CKrZD1Z-.js'),true              ?__vite__mapDeps([0,1,2]):void 0);
            return pkg;
        }
      ,
        "vue": async () => {
          let pkg = await __vitePreload(() => import('./assets/vue.runtime.esm-bundler-9RLT-tG7.js'),true              ?[]:void 0);
            return pkg;
        }
      
    };
      const usedShared = {
      
          "pinia": {
            name: "pinia",
            version: "2.3.1",
            scope: ["default"],
            loaded: false,
            from: "order",
            async get () {
              usedShared["pinia"].loaded = true;
              const {"pinia": pkgDynamicImport} = importMap;
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^2.1.0",
              
            }
          }
        ,
          "vue": {
            name: "vue",
            version: "3.5.25",
            scope: ["default"],
            loaded: false,
            from: "order",
            async get () {
              usedShared["vue"].loaded = true;
              const {"vue": pkgDynamicImport} = importMap;
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^3.3.0",
              
            }
          }
        
    };
      const usedRemotes = [
      ];

const initTokens = {};
  const shareScopeName = "default";
  const mfName = "order";
  async function init(shared = {}, initScope = []) {
    const initRes = init_1({
      name: mfName,
      remotes: usedRemotes,
      shared: usedShared,
      plugins: [],
      shareStrategy: 'version-first'
    });
    // handling circular init calls
    var initToken = initTokens[shareScopeName];
    if (!initToken)
      initToken = initTokens[shareScopeName] = { from: mfName };
    if (initScope.indexOf(initToken) >= 0) return;
    initScope.push(initToken);
    initRes.initShareScopeMap('default', shared);
    try {
      await Promise.all(await initRes.initializeSharing('default', {
        strategy: 'version-first',
        from: "build",
        initScope
      }));
    } catch (e) {
      console.error(e);
    }
    order__mf_v__runtimeInit__mf_v__.initResolve(initRes);
    return initRes
  }

  function getExposes(moduleName) {
    if (!(moduleName in exposesMap)) throw new Error(`Module ${moduleName} does not exist in container.`)
    return (exposesMap[moduleName])().then(res => () => res)
  }

export { getExposes as get, init };
