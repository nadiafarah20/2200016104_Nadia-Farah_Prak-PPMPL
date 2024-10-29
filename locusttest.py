from locust import HttpUser, task, between # type: ignore
import os

class APITestUser(HttpUser):
    host = os.getenv("http://127.0.0.1:3000")
    wait_time = between(1, 5)  # Waktu jeda antar task (detik)

    @task
    def get_all_items(self):
        self.client.get("/api/items")

    @task
    def get_item(self):
        self.client.get("/api/items/1")

    @task
    def create_item(self):
        self.client.post("/api/items", json={"name": "New Item"})

    @task
    def update_item(self):
        self.client.put("/api/items/1", json={"name": "Updated Item"})

    @task
    def delete_item(self):
        self.client.delete("/api/items/1")
