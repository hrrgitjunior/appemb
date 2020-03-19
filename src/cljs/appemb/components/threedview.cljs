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
            [:div.row {:style {:height 800 :margin 10}}
              [:div
                    { :ref #(reset! dom-node %)
                      :id "Container_3d"
                      :style
                     {:width "70%"
                      :height "50%"
                      :background-color "transparent"
                      :margin-left "auto"
                      :margin-right "auto"
                      :margin-top 5}}
                [:img {:id "imgRender" :src "crp1.jpg"
                       :style {:display "none"}}]]]))]

    (r/create-class
      { :display-name "threedview-component"
        :component-did-mount did-mount
       ;; note the keyword for this method
        :reagent-render render})))
