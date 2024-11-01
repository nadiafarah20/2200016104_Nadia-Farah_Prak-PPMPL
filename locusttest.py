from locust import HttpUser, task, between

class APITestUser(HttpUser):
    # Pastikan URL host sesuai dan tidak menggunakan getenv jika tidak dibutuhkan
    host = "http://127.0.0.1:3000"  
    wait_time = between(1, 5)  # Waktu tunggu antara task (dalam detik)

    @task
    def get_all_items(self):
        # Tambahkan timeout untuk mencegah kegagalan karena timeout
        self.client.get("/api/items", timeout=10)

    @task
    def get_item(self):
        self.client.get("/api/items/3", timeout=5)

    @task
    def create_item(self):
        # Pastikan format JSON sesuai dengan yang diminta oleh API
        self.client.post("/api/items", json={
            "nama": "New Name", 
            "prodi": "New Prodi", 
            "alamat": "New Alamat"
        }, timeout=10)

    @task
    def update_item(self):
        self.client.put("/api/items/4", json={
            "nama": "Updated Name", 
            "prodi": "Updated Prodi", 
            "alamat": "Updated Alamat"
        }, timeout=10)

    @task
    def delete_item(self):
        self.client.delete("/api/items/12", timeout=10)
