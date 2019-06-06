var mongoose = require('mongoose');
//library that provides assertion logic.
var chai = require('chai');
//extension for making http request to API.
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var should = chai.should();
assert = chai.assert,
    expect = chai.expect;

var models = require('../models/model');
var verifyToken = require('../auth/verifyToken')
var server = require('../app');
var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUVtYWlsSWQiOiJwcml5YW5rYUBnbWFpbC5jb20iLCJpZCI6IjVjYjQxYWU1YzhjMTg0MGU0NDM1NDY5YSIsImlhdCI6MTU1NTMwNzI5OCwiZXhwIjoxNTU1MzkzNjk4fQ.z80roeSm0OJMGwld3emAJxhNt7fPduzdcZLoOivnBKo'

describe('Employee', () => {
    it('should take 500ms', function (done) {
        this.timeout(800)
        setTimeout(done, 500)
    })
    //describe() is used for collection of test features.
    describe('Get Employee', () => {
        //it() statement contains each individual test case or test a single feature.
        it('it should list all the employee /api GET', (done) => {
            //chai-http allows us to easily make a requests to an http endpoint.
            chai.request(server)
                .get('/api')
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    done();
                })
        })
    })
    // test case for Post method.
    describe('Post Employee', () => {
        it('should joi validation failed', (done) => {
            let newEmployee = {
                employeeId: '2',
                employeeName: 'anuu',
                employeeMobileNo: '87540609',
                employeeEmailId: 'anuu@gmail.com',
                projectManagerId: '72',
                comments: "Work ahd been completed",
                password: "anuu"
            }
            chai.request(server)
                .post('/api')
                .set('Authorization', token)
                .send(newEmployee)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
        it('should post the employee /api post', (done) => {
            let newEmployee = {
                employeeId: '2',
                employeeName: 'anuu',
                employeeMobileNo: '8754060925',
                employeeEmailId: 'anuu@gmail.com',
                projectManagerId: '72',
                comments: "Work ahd been completed",
                password: "anuu"
            }
            chai.request(server)
                .post('/api')
                .set('Authorization', token)
                .send(newEmployee)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('employeeId');
                    res.body.should.have.property('employeeName');
                    res.body.should.have.property('employeeMobileNo');
                    done();
                })
        })
        it('should not post the employee /api post', (done) => {
            let newEmployee = {
                employeeId: '20',
                employeeName: 'Ajith',
                employeeMobileNo: '8990065432',
                employeeEmailId: 'Ajithkumar@gmail.com',
                projectManagerId: '35',
                comments: "Work is pending",
                password: "pass"
            }
            chai.request(server)
                .post('/api')
                .set('Authorization', token)
                .send(newEmployee)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })

    })
    // test case for GetById method.
    describe('GetByIdEmployee', () => {
        describe('get by employeeId', () => {
            it('should list the employee /api/id get', (done) => {
                chai.request(server)
                    .get('/api/employee/?employeeId=8')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        done();
                    })
            })
            //test case for failure response of GetById method.
            it('should not list the employee /api/id get', (done) => {
                chai.request(server)
                    .get('/api/employee/?employeeId=90')
                    .set('Authorization', token)
                    .send("The given id is not found.")
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    })
            })
        })
        describe('get by employeeName', () => {
            it('should list the employee /api/id get', (done) => {
                chai.request(server)
                    .get('/api/employee/?employeeName=little')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        done();
                    })
            })
            it('should not list the employee /api/name', (done) => {
                chai.request(server)
                    .get('/api/employee/?employeeName=magic')
                    .set('Authorization', token)
                    .send("The given name is not found.")
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    })
            })
        })
        describe('get by employeeProjectId', () => {
            it('should list the employee /api/projectManagerId get', (done) => {
                chai.request(server)
                    .get('/api/employee/?projectManagerId=66')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        done();
                    })
            })
            it('should not list the employee /api/name', (done) => {
                chai.request(server)
                    .get('/api/employee/?projectManagerId=999')
                    .set('Authorization', token)
                    .send("The given project manager id is not found.")
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    })
            })
        })
    })
    // test case for Put method.
    describe('Put Employee', () => {
        describe('Put EmployeeId', () => {
            it('should not put for joi validation failure', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .put('/api/employee/?employeeId=10')
                            .set('Authorization', token)
                            .send({
                                employeeName: 'priyanka',
                                employeeMobileNo: '9908672',
                                employeeEmailId: 'priyanka',
                                projectManagerId: '55',
                                comments: "Work is in progress",
                                password: "priyanka"
                            })
                            .end((err, res) => {
                                res.should.have.status(404);
                                done();
                            })
                    })
            })
            it('should put by id', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .put('/api/employee/?employeeId=10')
                            .set('Authorization', token)
                            .send({
                                employeeName: 'priyanka',
                                employeeMobileNo: '9908672314',
                                employeeEmailId: 'priyanka@gmail.com',
                                projectManagerId: '55',
                                comments: "Work is in progress yet to done",
                                password: "priyanka"
                            })
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                done();
                            })
                    })
            })
            //test case for failure response of Put method.
            it('should not put by id', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .put('/api/employee/?employeeId=566')
                            .set('Authorization', token)
                            .send({
                                employeeName: 'vinitha',
                                employeeMobileNo: '1234567894',
                                employeeEmailId: 'viji@gmail.com',
                                projectManagerId: '10',
                                comments: "Work is in progress",
                                password: "vijiya"
                            })
                            .end((err, res) => {
                                res.should.have.status(404);
                                done();
                            })
                    })
            })
        })
        describe('Put EmployeeName', () => {
            it('should put by name', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .put('/api/employee/?employeeName=ramyaa')
                            .set('Authorization', token)
                            .send({
                                employeeId: '38',
                                employeeMobileNo: '9123456',
                                employeeEmailId: 'ramyaa@gmail.com',
                                projectManagerId: '64',
                                comments: "Work is in progress",
                                password: "ramyaa"
                            })
                            .end((err, res) => {
                                res.should.have.status(404);
                                done();
                            })
                    })
            })
            it('should put by name', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .put('/api/employee/?employeeName=ramyaa')
                            .set('Authorization', token)
                            .send({
                                employeeId: '38',
                                employeeMobileNo: '9123456789',
                                employeeEmailId: 'ramyaa@gmail.com',
                                projectManagerId: '64',
                                comments: "Work is in progress",
                                password: "ramyaa"
                            })
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                done();
                            })
                    })
            })
            //test case for failure response of Put method.
            it('should not put by name', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .put('/api/employee/?employeeName=mnjig')
                            .set('Authorization', token)
                            .send({
                                employeeId: 17,
                                employeeMobileNo: '8123456789',
                                employeeEmailId: 'nijam@gmail.com',
                                projectManagerId: '75',
                                comments: "Work not completed will done on monday",
                                password: "nijam"
                            })
                            .end((err, res) => {
                                res.should.have.status(404);
                                done();
                            })
                    })
            })
        })
        describe('Put by projectManagerId', () => {
            it('should not put because joi validation failed', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .put('/api/employee/?projectManagerId=44')
                            .set('Authorization', token)
                            .send({
                                employeeId: 19,
                                employeeName: 'vijay',
                                employeeMobileNo: '7123',
                                employeeEmailId: 'vijay',
                                comments: "Work will done on monday",
                                password: "vijay"
                            })
                            .end((err, res) => {
                                res.should.have.status(404);
                                done();
                            })
                    })
            })
            it('should put by project manager id', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .put('/api/employee/?projectManagerId=44')
                            .set('Authorization', token)
                            .send({
                                employeeId: 19,
                                employeeName: 'vijay',
                                employeeMobileNo: '7123456789',
                                employeeEmailId: 'vijay@gmail.com',
                                comments: "Work will done on monday",
                                password: "vijay"
                            })
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                done();
                            })
                    })
            })
            it('should not put by project manager id', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .put('/api/employee/?projectManagerId=130')
                            .set('Authorization', token)
                            .send({
                                employeeId: 19,
                                employeeName: 'vijay',
                                employeeMobileNo: '5123456789',
                                employeeEmailId: 'vijay@gmail.com',
                                comments: "Work will done on monday",
                                password: "vijay"
                            })
                            .end((err, res) => {
                                res.should.have.status(404);
                                done();
                            })
                    })
            })
        })
    })
    // test case for Delete method.
    describe('Delete Product', () => {
        describe('Delete EmployeeId', () => {
            it('should delete by id ', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .delete('/api/employee/?employeeId=26')
                            .set('Authorization', token)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                done();
                            });
                    });
            })
            // test case for failure response of Delete method.
            it('should not delete by id', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .delete('/api/employee/?employeeId=43')
                            .set('Authorization', token)
                            .send("The given id is not found for delete request.")
                            .end((err, res) => {
                                res.should.have.status(404);
                                done();
                            })
                    })
            })
        })
        describe('Delete Employee by name', () => {
            it('should delete by name ', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .delete('/api/employee/?employeeName=nivi')
                            .set('Authorization', token)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                done();
                            });
                    });
            })
            // test case for failure response of Delete method.
            it('should not delete by name', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .delete('/api/employee/?employeeName=xbyt')
                            .set('Authorization', token)
                            .send("The given name is not found for delete request.")
                            .end((err, res) => {
                                res.should.have.status(404);
                                done();
                            })
                    })
            })
        })
        describe('Delete Employee by project manager id', () => {
            it('should delete by project manager id ', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .delete('/api/employee/?projectManagerId=15')
                            .set('Authorization', token)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                done();
                            });
                    });
            })
            // test case for failure response of Delete method.
            it('should not delete by project manager id', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .delete('/api/employee/?projectManagerId=180')
                            .set('Authorization', token)
                            .send("The given id is not found for delete request.")
                            .end((err, res) => {
                                res.should.have.status(404);
                                done();
                            })
                    })
            })

        })
    })
    // test case for register the employee
    describe('register Employee', () => {
        it('should not register because of joi validation failed', (done) => {
            let newEmployee = {
                employeeId: '3',
                employeeName: 'vi',
                employeeMobileNo: '24679',
                employeeEmailId: 'vino@gmail.com',
                projectManagerId: '10',
                comments: "Work completed by today itself",
                password: "vino"
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(newEmployee)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
        it('should register the employee', (done) => {
            let newEmployee = {
                employeeId: '3',
                employeeName: 'vino',
                employeeMobileNo: '2467901098',
                employeeEmailId: 'vino@gmail.com',
                projectManagerId: '10',
                comments: "Work completed by today itself",
                password: "vino"
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(newEmployee)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                })
        })
        it('should not register the employee', (done) => {
            let newEmployee = {
                employeeId: '23',
                employeeName: 'ammuuu',
                employeeMobileNo: '2467901098',
                employeeEmailId: 'ammuuu@gmail.com',
                projectManagerId: '89',
                comments: "Work completed by today itself",
                password: "pass"
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(newEmployee)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
    })
    //test case for login employee.
    describe('Login employee', () => {
        it('should not have proper emailid', (done) => {
            const login = {
                employeeEmailId: "rabiii@gmail.com",
                password: "rabiii"
            }
            chai.request(server)
                .post('/api/auth/login')
                .send('No user found.')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
        it('should login', (done) => {
            const login = {
                employeeEmailId: "priya@gmail.com",
                password: "priya"
            }
            chai.request(server)
                .post('/api/auth/login')
                .set('Content-Type', 'application/json')
                .send(login)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
        it('should have correct password', (done) => {
            const login = {
                employeeEmailId: "priya@gmail.com",
                password: "kkvii"
            }
            chai.request(server)
                .post('/api/auth/login')
                .set('Content-Type', 'application/json')
                .send(login)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                })
        })
    })
})