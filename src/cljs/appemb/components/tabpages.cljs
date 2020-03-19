(ns appemb.components.tabpages
  (:require [reagent.core :as r]
            [goog.dom]
            [appemb.components.threedview :as tdv]))

(defn tab-page [children]
  children)

(defn tab-pages-component []
  (let [page-number (r/atom 1)
        did-mount
        (fn [])
        render
        (fn []
          (let [props (r/props (r/current-component))]
            [:div.row
             [:ul.nav.nav-tabs
              [:li {:class (when (= @page-number 1) "active")}
               [:a {:href "#"
                    :on-click (fn [] (reset! page-number 1))}
                "3D Изглед"]]
              [:li {:class (when (= @page-number 2) "active")}
               [:a {:href "#"
                    :on-click (fn [] (reset! page-number 2))}
                "Симулатор на бодове"]]]


             [:div
              [tab-page (case @page-number
                         1 [tdv/threedview-component]
                         2 [:div "PAGE 2"])]]]))]



    (r/create-class
      {:component-did-mount did-mount
       ;; name your component for inclusion in error messages
       :display-name "tab-pages-component"

       ;; note the keyword for this method
       :reagent-render render})))
