let http = require("http");
let fs = require("fs");
let url = require("url");
let chai = require("chai");
let chaiHttp = require("chai-http");
const app = require("../index.js");
const baza = require("../models/index.js");

let should = require("chai").should();
chai.use(chaiHttp);

describe("POST /student", function () {
    before(function (done) {
        sequelize.sync({ force: true }).then((res) => {
            setTimeout(done, 100);
        });
    });

    it("Kreiranje studenta", function (done) {
        let dodavanjeStudenta = { ime: "Tarik", prezime: "Horozovic", index: "12345", grupa: "1" };
        let odgovor = {"status":"Kreiran student!"};
        chai.request(app)
            .post("/student")
            .send(dodavanjeStudenta)
            .end((err, res) => {
                console.log(err);
                console.log(res);
                res.should.have.status(200);
                should.not.exist(err);
                res.text.should.eql(JSON.stringify(odgovor));
                done();
            });
    });

    it("Bezuspjeso kreiranje studenta", function (done) {
        let dodavanjeStudenta = { "ime": "Tarik", "prezime": "Horozovic", "index": "12345", "grupa": "1" };
        let odgovor = { status: "Student sa indexom već postoji!" };
        chai.request(app)
            .post("/student")
            .send(JSON.stringify(dodavanjeStudenta))
            .end((err, res) => {
                res.should.have.status(200);
                should.not.exist(err);
                res.text.should.eql(JSON.stringify(odgovor));
                done();
            });
    });
});

describe("PUT /student/:index", function () {
    it("Promjena grupe", function (done) {
        let grupa = JSON.stringify({ "grupa": "grupa 1" });
        let odgovor = JSON.stringify({ "status": "Promijenjena grupa studentu 12345" });
        chai.request(app)
            .put("/student/12345")
            .send(grupa)
            .end(function (err, res) {
                res.text.should.eql(JSON.stringify(odgovor));
                should.not.exist(err);
                done();
            });
    });

    it("Bezuspjesna promjena grupe", function (done) {
        let grupa = { grupa: "grupa1" };
        let odgovor = { status: "Student sa indexom 123 ne postoji" };
        chai.request(app)
            .post("/student/123")
            .send(grupa)
            .end(function (err, res) {
                res.should.have.status(404);
                should.not.exist(err);
                done();
            });
    });
});

describe("POST /batch/student", function () {
    it("Dodavanje studenta", function (done) {
        let student = "student,studentovic,12345678,g2";
        let odgovor = JSON.stringify({ status: "Dodano 1 studenata!" });
        chai.request(app)
            .post("/batch/student")
            .set("content-type", "text/plain")
            .send(student)
            .end(function (err, res) {
                res.should.have.status(200);
                should.not.exist(err);
                res.text.should.eql(odgovor);
                done();
            });
    });

    it("Dodavanje studenta 2", function (done) {
        let student = "student,studentovic,12345678,g2\r\ntest,testovic,2,gr2";
        let odgovor = { status: "Dodano 1 studenata, a studenti 12345678 već postoje!" };
        chai.request(app)
            .post("/batch/student")
            .set("content-type", "text/plain")
            .send(student)
            .end(function (err, res) {
                res.should.have.status(200);
                should.not.exist(err);
                res.body.should.eql(odgovor);
                done();
            });
    });
});
