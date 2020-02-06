(ns appemb.core
  (:require
   [reagent.core :as reagent :refer [atom]]
   [reagent.session :as session]
   [reitit.frontend :as reitit]
   [clerk.core :as clerk]
   [accountant.core :as accountant]))

;; -------------------------
;; Routes

(defn current-page []
  [:div "CURRENT PAGE CONTAINER"])

;; -------------------------
;; Initialize app

(defn mount-root []
  (reagent/render [current-page] (.getElementById js/document "app")))

(defn init! []
  (mount-root))
