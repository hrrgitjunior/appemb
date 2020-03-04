(ns appemb.components.threedview
  (:require [reagent.core :as r]
            [goog.dom]))

(defn threedview-component []
  (let [
        dom-node (r/atom nil)

        did-mount
        (fn [this]
          (when @dom-node
            (js/View3D @dom-node)))

        render
        (fn []
          (let []
            (println "=== RENDER 3D ===")
            [:div.row {:style {:height 800}}
              [:div
                    { :ref #(reset! dom-node %)
                      :id "Container_3d"
                      :style
                     {:width "100%"
                      :height "80%"
                      :background-color "transparent"
                      :margin-left 0
                      :margin-top 50}}
                [:img {:id "imgRender" :src "crp1.jpg"
                       :style {:display "none"}}]]

              [:button
                {:on-click
                  (fn []
                    (js/View3D))}
                "Run 3D View"]]))]
    (r/create-class
      { :display-name "threedview-component"
        :component-did-mount did-mount
       ;; note the keyword for this method
        :reagent-render render})))
