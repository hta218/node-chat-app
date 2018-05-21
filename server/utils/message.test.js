var expect = require('expect');

var { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    // store res in variable
    var from = "Tuan Anh";
    var text = "Some msg";

    var msg = generateMessage(from, text);

    // assert from match
    // assert text match
    // assert createdAt match
    expect(msg.createdAt).toBeA('number');
    expect(msg).toInclude({from, text});
  });
});