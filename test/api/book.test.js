const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);
let token, book_id;
// Book test
describe('/api/books test', () => {
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

  describe('/GET Books', () => {
    it('it should GET all books', (done) => {
      chai.request(server)
        .get('/api/books')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('/POST Book', () => {
    it('it should POST a new book', (done) => {
      const book = {
        name: 'Lorem ipsum',
        category: 'Lorem category',
        publisher: 'Lorem Publisher',
        year: 2020,
        likes: 0,
        author_id: '5f7ddf95f30d5f5b760b7cb2'
      }
      chai.request(server)
        .post('/api/books')
        .send(book)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('category');
          res.body.should.have.property('publisher');
          res.body.should.have.property('year');
          res.body.should.have.property('likes');
          res.body.should.have.property('author_id');
          res.body.should.have.property('created_at');
          book_id = res.body._id;
          done();
        });
    });
  });

  describe('/GET/:book_id', () => {
    it('it should GET a single book by the given id',(done) => {
      chai.request(server)
        .get('/api/books/'+book_id)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('category');
          res.body.should.have.property('publisher');
          res.body.should.have.property('year');
          res.body.should.have.property('likes');
          res.body.should.have.property('author_id');
          res.body.should.have.property('created_at');
          res.body.should.have.property('_id').eql(book_id);
          done();
        });
    });
  });

  describe('/PUT Book', () => {
    it('it should UPDATE single book given by id', (done) => {
      const book = {
        name: 'Lorem ipsum update',
        category: 'Lorem category update',
        publisher: 'Lorem Publisher update',
        likes: 99,
      }
      chai.request(server)
        .put('/api/books/'+book_id)
        .send(book)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql(book.name);
          res.body.should.have.property('category').eql(book.category);
          res.body.should.have.property('publisher').eql(book.publisher);
          res.body.should.have.property('year');
          res.body.should.have.property('likes').eql(book.likes);
          res.body.should.have.property('author_id');
          res.body.should.have.property('created_at');
          res.body.should.have.property('_id').eql(book_id);
          done();
        });
    });
  });

  describe('/DELETE Book', () => {
    it('it should DELETE single book given by id', (done) => {
      chai.request(server)
        .delete('/api/books/'+book_id)
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
