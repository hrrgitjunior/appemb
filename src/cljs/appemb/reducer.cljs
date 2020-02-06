(ns appemb.reducer
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [cljs.core.async :as a]
            [reagent.core :as r]))
            ;[appemb.reducers.layout :refer [Action]]))


; (defmethod Action :layout [state {:keys [type] :as action-data}]
;   (prn "=== Action Layout ===")
;   state)

; (defonce !state (r/atom {}))
; (defonce !actions (a/chan))
;
; (defn dispatch! [action]
;   (a/put! !actions action))
;
; (go-loop []
;   (when-let [a (a/<! !actions)]
;     (swap! !state Action a)
;     (js/console.log @!state)
;     (recur)))
