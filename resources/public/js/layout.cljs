(ns rendemb.reducers.layout)

(defmulti Action
  (fn [state action]
    (:type action)))

(defmethod Action :default [state {:keys [type] :as action-data}]
  (prn "Action of " type " not defined.")
  state)

(defmethod Action :layout [state {:keys [type name] :as action-data}]
  (prn "=== LAYOUT ===" action-data)
  (assoc-in state [:layout :name] name))
  ; state))
