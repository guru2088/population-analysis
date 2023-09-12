kubectl delete deployment api-deployment -n population-analysis
kubectl delete services api-service -n population-analysis

kubectl apply -f kubs/deployment.yaml -n population-analysis
kubectl apply -f kubs/services.yaml -n population-analysis

