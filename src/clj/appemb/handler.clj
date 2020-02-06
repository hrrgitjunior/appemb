(ns appemb.handler
  (:require
   [reitit.ring :as reitit-ring]
   [appemb.middleware :refer [middleware]]
   [hiccup.page :refer [include-js include-css html5]]
   [config.core :refer [env]]
   ;-------
   [compojure.core :refer [defroutes GET  POST ANY]]
   [compojure.handler :refer [site]]
   [compojure.route :as route]
   [clojure.java.io :as io]
   [ring.adapter.jetty :as jetty]
   [ring.middleware.ssl :as ssl]
   ; [environ.core :refer [env]]
   [ring.util.response :as response]
   [ring.middleware.keyword-params :refer [wrap-keyword-params]]
   [ring.middleware.json :as middleware]))


(def mount-target
  [:div#app])
   ; [:h2 "Welcome to app1"]
   ; [:p "please wait while Figwheel is waking up ..."]
   ; [:p "(Check the js console for hints if nothing exciting happens.)"]])

(defn head []
  [:head
   [:meta {:charset "utf-8"}]
   [:meta {:name "viewport"
           :content "width=device-width, initial-scale=1
           "}]
   (include-css (if (env :dev) "/css/site.css" "/css/site.min.css"))])

(defn loading-page []
  (html5
   (head)
   [:body {:class "body-container"}
    mount-target
    (include-js "/js/app.js")]))


(defn index-handler
  [_request]
  {:status 200
   :headers {"Content-Type" "text/html"}
   :body (loading-page)})

; (def app
;   (reitit-ring/ring-handler
;    (reitit-ring/router
;     [["/" {:get {:handler index-handler}}]
;      ["/items"
;       ["" {:get {:handler index-handler}}]
;       ["/:item-id" {:get {:handler index-handler
;                           :parameters {:path {:item-id int?}}}}]]
;      ["/about" {:get {:handler index-handler}}]])
;    (reitit-ring/routes
;     (reitit-ring/create-resource-handler {:path "/" :root "/public"})
;     (reitit-ring/create-default-handler))
;    {:middleware middleware}))


(defroutes app-routes
  ; (GET "/" []
  ;   (as->
  ;     (response/resource-response "index.html"  {:root "public"}) $
  ;     ((fn [x] (println "=== GET / ===") x) $)
  ;     $))
  (GET "/" []
    (as-> index-handler $
      ((fn [x] (println "=== GET / ===") x) $)
      $))

  (route/resources "/")
  (GET "/hello" []
   (response/response {:greeting "Ring Server"}))

  (POST "/design" req
   (response/response
     (let [a 10]
      (println "=== POST DESIGN ===" req)
      {:greeting "Ring Server"}))))




  ; (ANY "*" []
  ;   (route/not-found "<h1>404 Not found</h1>")))

(def app
  (-> app-routes
      wrap-keyword-params
      middleware/wrap-json-params
      middleware/wrap-json-response))

(defn -main [& [port]]
  (println "=========+++====")
  (let [port (Integer. (or port (env :port) 5000))]
    (println port)
    (jetty/run-jetty (site #'app)
                     {:port port :join? false})))
