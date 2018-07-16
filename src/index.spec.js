import App from './'
describe('my-typescript', () => {
  it('This is test testing for nothing', () => {
    expect(new App().greeting()).to.equal('howdy')
  })
})
