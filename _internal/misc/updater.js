import{triggerEvent,raiseWarning}from'./event-api';function onDataUpdateCancel(a,b){triggerEvent('dataUpdateCancelled',a.sender,b,void 0,b.failurecallback)}function onDataUpdateSuccess(a,b){let c=a.sender,d=c.__state;d.dataReady=void 0,d.dataAvailable=!0,!0===b.silent?c.options.dataSource=b.data:!0!==c.options.safeMode||!0!==d.rendering||c.isActive()?delete d.args:(d.updatePending=b,raiseWarning(c,'23091255','run','::DataHandler~update','Renderer update was postponed due to async loading.')),triggerEvent('dataUpdated',c,b,void 0,b.successcallback)}export{onDataUpdateSuccess,onDataUpdateCancel};