const chai = require('chai');
const server = require('../index');
const chaiHttp = require('chai-http');
const User = require('../app/models/user');

chai.use(chaiHttp);
const expect = chai.expect;
describe('Auth tests',function(){
    beforeEach((done)=>{
        User.deleteMany({},done)
    });

    it('Register new user',function(done){
        const data={
            name:'usertester',
            email:'tester@test.com',
            password:'123456'
        }
        
        chai.request(server).post('/auth/register').send(data).end(function(err,res){
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).have.property('user');
            expect(res.body.user).have.property('_id');
            expect(res.body.user).have.property('name');
            expect(res.body.user).have.property('email');
            expect(res.body.user).have.property('createdAt');
            expect(res.body).have.property('token');
            done();
        });
    });
    
    it('Authenticate user',async ()=>{
        const data={
            name:'userteste',
            email:'tester@tester.com',
            password:'123456'
        }
        const user = await User.create(data);
        chai.request(server).post('/auth/authenticate').send({email:'tester@tester.com',password:'123456'}).end(function(err,res){
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).have.property('token');
        });
    });

    it('Authenticate user not registrated',(done)=>{
        
        chai.request(server).post('/auth/authenticate').send({email:'tester@ts.com',password:'123456'}).end(function(err,res){
            expect(res).to.have.status(400);
            expect(res.body).have.property('error');
            done();
        });
    });
});

