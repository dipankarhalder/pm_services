/* database msg */
const db = {
  success: 'Database successfully connected on port: 27017.',
  failed: 'Database failed to connect.',
};

/* server msg */
const server = {
  success: 'Server successfully started on port : ',
  somethingWrong: 'Something went wrong, please try again later.',
  internalServerError: 'Internal Server Error.',
  notFound: 'The API url not found.',
};

module.exports = {
  db,
  server,
};
