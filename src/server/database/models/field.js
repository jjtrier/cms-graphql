import Conn from '../_db';
import Sequelize from 'sequelize';

export const Field = Conn.define('field', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  required: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  dataJSON: {
    type: Sequelize.JSON,
    allowNull: true
  }
}
);
