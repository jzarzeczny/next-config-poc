package main

import (
    "encoding/json"
    "net/http"
)

type PingResponse struct {
    Test string `json:"test"`
}

func main() {
    http.HandleFunc("/ping", pingHandler)
    http.HandleFunc("/pong", pongHandler)
    
    // Start the server on port 8080
    if err := http.ListenAndServe(":8080", nil); err != nil {
        panic(err)
    }
}

func pingHandler(w http.ResponseWriter, r *http.Request) {
    // Create a PingResponse object
    response := PingResponse{Test: "This is test data from GO endpoint"}
    
    // Convert the response to JSON
    jsonResponse, err := json.Marshal(response)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    // Set the Content-Type header to indicate JSON
    w.Header().Set("Content-Type", "application/json")
    
    // Write the JSON response to the client
    w.Write(jsonResponse)
}

func pongHandler(w http.ResponseWriter, r *http.Request) {
    // Parse the JSON request body
    var request struct {
        Test string `json:"test"`
    }
    
    decoder := json.NewDecoder(r.Body)
    if err := decoder.Decode(&request); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    
    // You can now use the request object, e.g., request.Test
    
    // Send a response
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("Received POST request with test value: " + request.Test))
}
