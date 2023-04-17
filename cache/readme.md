For letting the cache communicate with the pod running the Redis db, the host in the cache(python script) should be the cache service External-IP


Guidelines for deploying Redis Cache:
	//create a redis-deployment, which will have redis-image running inside it
	1. kubectl apply -f redis-deployment.yaml

	//expose the deployment as load-balancer service
	2. kubectl expose deployment/redis-pod --type=LoadBalancer --name=redis-lb-svc
	
	// for exposing the load-balancer service in minikube
	3. minikube tunnel
