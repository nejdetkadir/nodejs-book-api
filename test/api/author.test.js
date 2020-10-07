const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);
let token, author_id;
// Author test
describe('/api/authors test', () => {
  before((done) => {
    chai.request(server).
    post('/authenticate').
    send({
      username: 'test_user',
      password: '1593574268'
    }).end((err, res) => {
      token = res.body.token;
      done();
    });
  });

  describe('/GET Authors', () => {
    it('it should GET all authors', (done) => {
      chai.request(server)
        .get('/api/authors')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();

        });
    });
  });

  describe('/POST Author', () => {
    it('it should POST a new author', (done) => {
      const author = {
        name: 'test name',
        surname: 'test surname',
        bio: 'test bio'
      }
      chai.request(server)
        .post('/api/authors')
        .send(author)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('surname');
          res.body.should.have.property('bio');
          res.body.should.have.property('created_at');
          author_id = res.body._id;
          done();
        });
    });
  });

  describe('/GET/:author_id', () => {
    it('it should GET a single author by the given id',(done) => {
      chai.request(server)
        .get('/api/authors/'+author_id)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('/PUT Author', () => {
    it('it should UPDATE single author given by id', (done) => {
      const author = {
        name: 'Lorem test',
        bio: 'Lorem ipsum'
      }
      chai.request(server)
        .put('/api/authors/'+author_id)
        .send(author)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(true);
          done();
        });
    });
  });

  describe('/DELETE Author', () => {
    it('it should DELETE single author given by id', (done) => {
      chai.request(server)
        .delete('/api/authors/'+author_id)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(true);
          done();
        });
    });
  });
});