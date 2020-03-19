(ns appemb.components.layout
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [reagent.core :as r]
            [goog.dom]
            [goog.dom]
            [cljs-http.client :as http]
            [appemb.reducer :refer [dispatch!]]
            [appemb.components.tabpages :refer [tab-pages-component]]
            [appemb.components.imagetables :refer [imagetables-component]]))

(defn layout-component []
  (let [did-mount
        (fn [])

        render
        (fn []
          (let [props (r/props (r/current-component))
                {:keys [name]} props]
            [:div.container-fluid {:style {:height "800px" :background-color "#fff" :margin "10px"}}
             [:div.row {:style {:height "50px" :background-color "#fff"}}
              [:h4 {:style {:margin-left 20}}
               (str "Интерактивно представяне на готов проект за машинна бродерия")]]
             [:div.row
              ;======= LEFT SIDE ========
               [:div.col-lg-4 {:style {:height "750px" :padding-right 50 :background-color "#fff"}}
                [imagetables-component]]

              ;=======RIGTH SIDE =======
              [:div.col-lg-8 {:style {:height "750px" :background-color "#fff"}}
               [tab-pages-component]]]]))]








    (r/create-class
      {:component-did-mount did-mount
       ;; name your component for inclusion in error messages
       :display-name "layout-component"

       ;; note the keyword for this method
       :reagent-render render})))
