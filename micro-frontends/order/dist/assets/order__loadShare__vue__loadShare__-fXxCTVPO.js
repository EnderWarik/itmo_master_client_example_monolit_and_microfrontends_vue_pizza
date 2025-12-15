import { o as order__mf_v__runtimeInit__mf_v__ } from './order__mf_v__runtimeInit__mf_v__-CraMCC11.js';

// dev uses dynamic import to separate chunks
    
    const {initPromise} = order__mf_v__runtimeInit__mf_v__;
    const res = initPromise.then(runtime => runtime.loadShare("vue", {
      customShareInfo: {shareConfig:{
        singleton: true,
        strictVersion: false,
        requiredVersion: "^3.3.0"
      }}
    }));
    const exportModule = await res.then(factory => factory());
    var order__loadShare__vue__loadShare__ = exportModule;

export { order__loadShare__vue__loadShare__ as o };
