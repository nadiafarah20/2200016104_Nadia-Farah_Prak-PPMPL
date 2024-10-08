const { expect } = require('chai');
const { tambah, kali, kurang, bagi } = require('../math');

describe('Pengujian Kasus Negatif - Fungsi Matematika', function() {

    // Pengujian negatif untuk fungsi tambah
    describe('Pengujian Tambah', function() {
        it('seharusnya mengembalikan error jika string digunakan sebagai input', function() {
            expect(() => tambah('2', 3)).to.throw('Input harus berupa angka');
        });

        it('seharusnya mengembalikan error jika null digunakan sebagai input', function() {
            expect(() => tambah(null, 3)).to.throw('Input harus berupa angka');
        });

        it('seharusnya mengembalikan hasil negatif saat menambahkan -5 + 3', function() {
            expect(tambah(-5, 3)).to.equal(-2);
        });
    });

    // Pengujian negatif untuk fungsi kali
    describe('Pengujian Kali', function() {
        it('seharusnya mengembalikan error jika string digunakan sebagai input', function() {
            expect(() => kali(2, '3')).to.throw('Input harus berupa angka');
        });

        it('seharusnya mengembalikan error jika null digunakan sebagai input', function() {
            expect(() => kali(null, 3)).to.throw('Input harus berupa angka');
        });

        it('seharusnya mengembalikan hasil negatif saat mengalikan -2 * 3', function() {
            expect(kali(-2, 3)).to.equal(-6);
        });
    });

    // Pengujian negatif untuk fungsi kurang
    describe('Pengujian Kurang', function() {
        it('seharusnya mengembalikan hasil negatif saat mengurangkan 2 - 5', function() {
            expect(kurang(2, 5)).to.equal(-3);
        });
    });

    // Pengujian negatif untuk fungsi bagi
    describe('Pengujian Bagi', function() {
        it('seharusnya mengembalikan error saat membagi dengan 0', function() {
            expect(() => bagi(10, 0)).to.throw('Tidak bisa membagi dengan nol');
        });

        it('seharusnya mengembalikan hasil negatif saat membagi -1 / 2', function() {
            expect(bagi(-1, 2)).to.equal(-0.5);
        });
    });
});
