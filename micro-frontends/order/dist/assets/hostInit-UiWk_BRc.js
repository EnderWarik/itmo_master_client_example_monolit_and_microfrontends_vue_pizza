const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["remoteEntry.js","assets/index.cjs-DfOq2DoA.js","assets/virtualExposes-BoxiMuXw.js","assets/preload-helper-BC7ZYKCr.js","assets/order__mf_v__runtimeInit__mf_v__-CraMCC11.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from './preload-helper-BC7ZYKCr.js';

const remoteEntryPromise = __vitePreload(() => import('../remoteEntry.js'),true              ?__vite__mapDeps([0,1,2,3,4]):void 0);
    // __tla only serves as a hack for vite-plugin-top-level-await.
    Promise.resolve(remoteEntryPromise)
      .then(remoteEntry => {
        return Promise.resolve(remoteEntry.__tla)
          .then(remoteEntry.init).catch(remoteEntry.init)
      });
