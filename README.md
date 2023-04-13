# ADS-Project backend service.

To run just the service in your local - 
1. pip install -r requirements.txt
2. uvicorn main:app --reload

To run the service inside a container - 
1. docker build . -t <name> 
2. docker run -p 8000:8000 <name>

To run the service in kubernetes cluster - 
1. kubectl apply -f <your path to app_pods.yaml>
2. kubectl apply -f <your path to app_pods_service.yaml>
3. you should be able to see the service running in both port 8000 and 8001 ( 2 pods ie 2 edge nodes simulation)