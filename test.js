const { describe, it } = require('mocha');
const { expect } = require('chai');

const hostToIp = require('./');

const host = 'github.com';
const domain = 'https://api.github.com';
const opts = { all: true };

describe('host-to-ip', () => {
  describe('resolve host name', () => {
    it('should resolve IPs', () => {
      return hostToIp(host).then(ip => expect(ip).to.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/));
    });

    it('should accept options', () => {
      return hostToIp(host, opts).then(hip => expect(hip).to.deep.include.members([{ 'address': '192.30.253.112', 'family': 4 }, { 'address': '192.30.253.113', 'family': 4 }]));
    });
  });

  describe('resolve domain name', () => {
    it('should resolve IPs', () => {
      return hostToIp(domain).then(ip => expect(ip).to.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/));
    });
    it('should accept options', () => {
      return hostToIp(domain, opts).then(dip => expect(dip).to.deep.include.members([{ 'address': '192.30.253.116', 'family': 4 }, { 'address': '192.30.253.117', 'family': 4 }]));
    });
  });
});
