(ns appemb.components.tabpages
  (:require [reagent.core :as r]
            [goog.dom]))

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
                "Page1"]]
              [:li {:class (when (= @page-number 2) "active")}
               [:a {:href "#"
                    :on-click (fn [] (reset! page-number 2))}
                "Page2"]]]


             [:div
              [tab-page (case @page-number
                         1 [:div "PAGE 1"]
                         2 [:div "PAGE 2"])]]]))]



    (r/create-class
      {:component-did-mount did-mount
       ;; name your component for inclusion in error messages
       :display-name "tab-pages-component"

       ;; note the keyword for this method
       :reagent-render render})))
