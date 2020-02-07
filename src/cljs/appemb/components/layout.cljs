(ns appemb.components.layout
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [reagent.core :as r]
            [goog.dom]
            [goog.dom]
            [cljs-http.client :as http]
            [appemb.reducer :refer [dispatch!]]
            [appemb.components.tabpages :refer [tab-pages-component]]))

(defn layout-component []
  (let [did-mount
        (fn [])

        render
        (fn []
          (let [props (r/props (r/current-component))
                {:keys [name]} props]
            [:div.container-fluid {:style {:height "800px" :background-color "#ffa" :margin "10px"}}
             [:div.row {:style {:height "50px" :background-color "#eff"}}
              [:h4 {:style {:margin-left 20}}
               (str "Интерактивно представяне на готов проект за машинна бродерия")]]
             [:div.row
               [:div.col-lg-10 {:style {:height "750px" :background-color "#dff"}}
                [tab-pages-component]]
               [:div.col-lg-2 {:style {:height "750px" :background-color "#eff"}}
                [:input {:type "text" :id "layouted"}]
                [:button
                  {:on-click
                    (fn []
                      (go
                       (let [res (<! (http/get "/hello"))])))}
                         ; (dispatch! {:type :layout :name
                         ;             (-> js/document
                         ;               (.getElementById "layouted")
                         ;               (.-value))}))))}
                  "Dispatch"]]]]))]







    (r/create-class
      {:component-did-mount did-mount
       ;; name your component for inclusion in error messages
       :display-name "layout-component"

       ;; note the keyword for this method
       :reagent-render render})))
