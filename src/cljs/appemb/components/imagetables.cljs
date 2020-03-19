(ns appemb.components.imagetables
  (:require [reagent.core :as r]
            [goog.dom]))


(defn imagetables-component []
  (let [
        render
        (fn []
          [:div
           [:div.row
             [:table.table
              [:thead
                [:tr
                  [:th  "Проект"]
                  [:th  "Бодове"]
                  [:th  "Размер"]
                  [:th "Цветове"]]]
              [:tbody
                [:tr
                 [:td
                  [:img.img-fluid.img-thumbnail
                   {:src "crp2.jpg"
                    :style {:width "100px"}}]]
                 [:td "1000"]
                 [:td "100x100"]]]]]])]


    (r/create-class
      { :display-name "imagetables-component"
        :reagent-render render})))
