class ServiceUnavailable extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 503;
  }
}

module.exports = ServiceUnavailable;
