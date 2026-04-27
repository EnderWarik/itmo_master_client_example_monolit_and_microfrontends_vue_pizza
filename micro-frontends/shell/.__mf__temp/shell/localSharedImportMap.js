
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    import {loadShare} from "@module-federation/runtime";
    const importMap = {
      
        "pinia": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__shell__prebuild__pinia__prebuild__.js");
            return pkg;
        }
      ,
        "vue": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__shell__prebuild__vue__prebuild__.js");
            return pkg;
        }
      
    }
      const usedShared = {
      
          "pinia": {
            name: "pinia",
            version: "2.1.0",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__shell",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"pinia"}' must be provided by host`);
              }
              usedShared["pinia"].loaded = true
              const {"pinia": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "pinia" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
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
            version: "3.3.0",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__shell",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"vue"}' must be provided by host`);
              }
              usedShared["vue"].loaded = true
              const {"vue": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "vue" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^3.3.0",
              
            }
          }
        
    }
      const usedRemotes = [
                {
                  entryGlobalName: "auth",
                  name: "auth",
                  type: "module",
                  entry: "http://localhost:5001/remoteEntry.js",
                  shareScope: "default",
                }
          ,
                {
                  entryGlobalName: "cart",
                  name: "cart",
                  type: "module",
                  entry: "http://localhost:5002/remoteEntry.js",
                  shareScope: "default",
                }
          ,
                {
                  entryGlobalName: "profile",
                  name: "profile",
                  type: "module",
                  entry: "http://localhost:5003/remoteEntry.js",
                  shareScope: "default",
                }
          ,
                {
                  entryGlobalName: "order",
                  name: "order",
                  type: "module",
                  entry: "http://localhost:5005/remoteEntry.js",
                  shareScope: "default",
                }
          ,
                {
                  entryGlobalName: "pizzaBuilder",
                  name: "pizzaBuilder",
                  type: "module",
                  entry: "http://localhost:5004/remoteEntry.js",
                  shareScope: "default",
                }
          
      ]
      export {
        usedShared,
        usedRemotes
      }
      