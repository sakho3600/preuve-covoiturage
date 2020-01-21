'use strict';

var { createMigration } = require('../helpers/createMigration');
var { setup, up, down } = createMigration(['auth/2020012000001_multi_operator'], __dirname);

exports.setup = setup;
exports.up = up;
exports.down = down;
