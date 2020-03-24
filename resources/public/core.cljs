(ns reactiveds.core
    (:require [reagent.core :as r]
              [dirac.runtime]
              [cljs.pprint]
              [datascript.core :as d]
              [re-posh.core :as rp]
              ;---
              [reactiveds.dbmemory :as dbm]
              [reactiveds.myschema :refer [schema-tutorial]]
              [re-frame.core :refer [dispatch]]
              [reactiveds.events]))
              ;---
(enable-console-print!)

(println "This text is printed from src/reactiveds/core.cljs. Go ahead and edit it and see reloading in action.")

;; Install dirac runtime for browser REPL
(dirac.runtime/install!)

(defn hello-world []
  (let [conn-render
        (fn []
          (let [current-result
                @(rp/subscribe [:my-sub])]

            [:div
             [:h3 "re-frame introduction"]
             [:button
              {:on-click
               (fn []
                 (rp/dispatch [:multiply 5]))}
              "Multiply by 5"]
             [:div (str "Result: " current-result)]]))]

    (r/create-class {:reagent-render conn-render})))


(defn nav-vertical []
    [:ul
      [:li {:style {:margin-bottom "10px"}}
        [:a { :href "javascript:"
              :on-click
               (fn [e]
                 (dispatch [:app/set-active-panel "simple"]))}
          "SIMPLE CONNECTION"]]

      [:li
        [:a { :href "javascript:"
              :on-click
               (fn [e]
                 (dispatch [:app/set-active-panel "schema"]))}
          "SHEMA"]]])




(defn dashboard []
  (let [active-panel @(rp/subscribe [:active-panel])]
    (println "active-panel" active-panel)
    [:div
      [:div {:id "main-id"
             :style
              {:width "100%"
               :height "600px"}}
       (case active-panel
         "simple" [hello-world]
         "schema" [schema-tutorial]
         ;else
         [:div])]]))


(defn app-render []
  [:div {:style {:width "100%" :height "600px"}}
   [:div {:style {:width "20%" :float "left"}}
    [nav-vertical]]
   [:div {:style {:width "80%" :float "left"}}
    [dashboard]]])


(defn app []
  (r/create-class
    {:component-did-mount
      (fn [this]
        (println "did mount app"))

     :reagent-render app-render}))


(r/render [app] (. js/document (getElementById "app")))


(defn on-js-reload [])
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
