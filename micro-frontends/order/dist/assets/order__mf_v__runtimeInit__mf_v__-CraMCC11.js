const globalKey = "__mf_init____mf__virtual/order__mf_v__runtimeInit__mf_v__.js__";
    if (!globalThis[globalKey]) {
      let initResolve, initReject;
      const initPromise = new Promise((re, rj) => {
        initResolve = re;
        initReject = rj;
      });
      globalThis[globalKey] = {
        initPromise,
        initResolve,
        initReject
      };
    }
    var order__mf_v__runtimeInit__mf_v__ = globalThis[globalKey];

export { order__mf_v__runtimeInit__mf_v__ as o };
