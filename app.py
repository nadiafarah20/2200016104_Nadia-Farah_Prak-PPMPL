from flask import Flask, jsonify, request # type: ignore

app = Flask(__name__)

items = [
    {
        "id": 1,
        "nama": "nadia",
        "prodi": "sistem informasi",
        "alamat": "jogja"
    },
    {
        "id": 2,
        "nama": "dena",
        "prodi": "farmasi",
        "alamat": "solo"
    },
    {
        "id": 3,
        "nama": "fira",
        "prodi": "gizi",
        "alamat": "semarang"
    },
    {
        "id": 4,
        "nama": "ghina",
        "prodi": "psikolog",
        "alamat": "jogja"
    },
    {
        "id": 5,
        "nama": "rara",
        "prodi": "sastra inggris",
        "alamat": "semarang"
    },
    ]

# Endpoint untuk mendapatkan semua item
@app.route('/api/items', methods=['GET'])
def get_all_items():
    return jsonify(items), 200

# Endpoint untuk mendapatkan item berdasarkan ID
@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = next((item for item in items if item["id"] == item_id), None)
    return (jsonify(item), 200) if item else (jsonify({"error": "Item not found"}), 404)

# Endpoint untuk menambahkan item
@app.route('/api/items', methods=['POST'])
def add_item():
    new_item = request.get_json()
    new_item['id'] = items[-1]['id'] + 1 if items else 1
    items.append(new_item)
    return jsonify(new_item), 201

# Endpoint untuk memperbarui item
@app.route('/api/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    item = next((item for item in items if item["id"] == item_id), None)
    if item:
        data = request.get_json()
        item.update(data)
        return jsonify(item), 200
    return jsonify({"error": "Item not found"}), 404

# Endpoint untuk menghapus item
@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    index = next((i for i, item in enumerate(items) if item["id"] == item_id), None)
    if index is not None:
        items.pop(index)
        return jsonify({"message": "Item deleted"}), 200
    return jsonify({"error": "Item not found"}), 404

if __name__ == '__main__':
    app.run(port=3000)
