const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('API Testing', () => {
    it('should return all items', (done) => {
        request(app)
            .get('/api/items')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.at.least(1);
                done();
            });
    });

    it('should create a new item', (done) => {
        const newItem = { name: 'Item 3' };
        request(app)
            .post('/api/items')
            .send(newItem)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('name', 'Item 3'); 
                done();
            });
    });

    it('should update an item by ID', (done) => {
        const updatedItem = { name: 'Updated Item 1' };
        request(app)
            .put('/api/items/1')  // Update item dengan ID 1
            .send(updatedItem)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('id', 1);
                expect(res.body).to.have.property('name', 'Updated Item 1');
                done();
            });
    });

    it('should delete an item by ID', (done) => {
        request(app)
            .delete('/api/items/2')  // Menghapus item dengan ID 2
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message', 'Item deleted successfully');
                done();
            });
    });
});
