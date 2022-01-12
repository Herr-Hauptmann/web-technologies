const should = chai.should();

describe('VjezbeAjax', function() {
    beforeEach(function() {
        this.xhr = sinon.useFakeXMLHttpRequest();

        this.requests = [];
        this.xhr.onCreate = function(xhr) {
            this.requests.push(xhr);
        }.bind(this);
    });

    afterEach(function() {
        this.xhr.restore();
    });

    it("GET - Ispravan zahtjev vraca JSON", function(done) {
        let data = { brojVjezbi: 3, brojZadataka: [1,2,3] }
        var dataJson = JSON.stringify(data);
        
        VjezbeAjax.dohvatiPodatke(function(error, result) {
            result.should.deep.equal(data);
            done();
        });
        this.requests[0].respond(200, { 'Content-Type': 'application/json' }, dataJson);
    });

    it('GET - Tijelo zahtjeva', function() {
        var data = { brojVjezbi: 3, brojZadataka: [1,2,3] }
        var dataJson = JSON.stringify(data);

        VjezbeAjax.posaljiPodatke(data, function() {});

        this.requests[0].requestBody.should.equal(dataJson);
    });

    it("POST - Odgovor je primljeni JSON", function(done) {
        var data = { brojVjezbi: 3, brojZadataka: [1,2,3] }
        var dataJson = JSON.stringify(data);

        VjezbeAjax.posaljiPodatke(data, function(err, result) {
            result.should.deep.equal(data);
            done();
        });
        this.requests[0].respond(200, { 'Content-Type': 'application/json' }, dataJson);
    });

    it("POST - Neodgovarajuci broj vjezbi", function(done) {
        var data = { brojVjezbi: 2, brojZadataka: [1,2,3] }
        var response = { status: 'error', data: 'Pogresan parametar brojZadataka' };
        var responseJson = JSON.stringify(response);

        VjezbeAjax.posaljiPodatke(data, function(err, result) {
            should.equal(err, 'Pogresan parametar brojZadataka');
            done();
        });
        this.requests[0].respond(200, {'Content-Type': 'application/json' }, responseJson);
    });
    
    it("POST - Neodgovarajuci broj vjezbi", function(done) {
        var data = { brojVjezbi: -2, brojZadataka: [1,2,3] }
        var response = { status: 'error', data: 'Pogresan parametar brojVjezbi,brojZadataka' };
        var responseJson = JSON.stringify(response);

        VjezbeAjax.posaljiPodatke(data, function(err, result) {
            should.equal(err, 'Pogresan parametar brojVjezbi,brojZadataka');
            done();
        });
        this.requests[0].respond(200, {'Content-Type': 'application/json' }, responseJson);
    });

    it("POST - brojVjezbi izvan opsega", function(done) {
        var data = { brojVjezbi: 16, brojZadataka: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] }
        var response = { status: 'error', data: 'Pogresan parametar brojVjezbi' };
        var responseJson = JSON.stringify(response);

        VjezbeAjax.posaljiPodatke(data, function(err, result) {
            should.equal(err, 'Pogresan parametar brojVjezbi');
            done();
        });
        this.requests[0].respond(200, { 'Content-Type': 'application/json' }, responseJson);
    });
    
    it("POST - jedan od brojevaZadataka neispravan", function(done) {
        var data = { brojVjezbi: 3, brojZadataka: [1, 2, -3] }
        var response = { status: 'error', data: 'Pogresan parametar z2' };
        var responseJson = JSON.stringify(response);

        VjezbeAjax.posaljiPodatke(data, function(err, result) {
            should.equal(err, 'Pogresan parametar z2');
            done();
        });
        this.requests[0].respond(200, { 'Content-Type': 'application/json' }, responseJson);
    });
    
    it("POST - vise brojevaZadataka neispravno", function(done) {
        var data = { brojVjezbi: 3, brojZadataka: [-1, 34, -3] }
        var response = { status: 'error', data: 'Pogresan parametar z0,z1,z2' };
        var responseJson = JSON.stringify(response);

        VjezbeAjax.posaljiPodatke(data, function(err, result) {
            should.equal(err, 'Pogresan parametar z0,z1,z2');
            done();
        });
        this.requests[0].respond(200, { 'Content-Type': 'application/json' }, responseJson);
    });

    it("POST - Callback vraca ispravan brojVjezbi", function(done) {
        var data = { brojVjezbi: 3, brojZadataka: [1,2,3] }
        var dataJson = JSON.stringify(data);

        VjezbeAjax.posaljiPodatke(data, function(err, result) {
            should.equal(result.brojVjezbi, data.brojVjezbi);
            done();
        });
        this.requests[0].respond(200, { 'Content-Type': 'application/json' }, dataJson);
    });
    it("POST - Callback vraca ispravan brojZadataka", function(done) {
        var data = { brojVjezbi: 3, brojZadataka: [1,2,3] }
        var dataJson = JSON.stringify(data);

        VjezbeAjax.posaljiPodatke(data, function(err, result) {
            should.equal(result.brojZadataka.length, data.brojZadataka.length);
            done();
        });
        this.requests[0].respond(200, { 'Content-Type': 'application/json' }, dataJson);
    });
});